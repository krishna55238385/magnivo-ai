/**
 * Build-time sitemap generator.
 *
 * Produces public/sitemap.xml with a <lastmod> on every <url> entry.
 * - Dynamic detail pages (products / solutions / resources) are discovered
 *   automatically from src/lib/site-data.ts, so adding a new item there flows
 *   into the sitemap on the next build with no manual edits.
 * - <lastmod> is the last git commit date (YYYY-MM-DD) of each page's source
 *   file(s); if git history is unavailable it falls back to the build date.
 *
 * Run automatically before `vite build` (see package.json build scripts).
 */

import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const BASE = "https://magnivo.ai";
const SITE_DATA = "src/lib/site-data.ts";
const BUILD_DATE = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)

/* ── last-modified date resolution ──────────────────────────── */
// Most recent git commit date across the given source files. Single
// `git log -1` over multiple paths returns the newest touching commit.
function gitLastModified(files) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...files], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

function lastmodFor(files) {
  return gitLastModified(files) || BUILD_DATE;
}

/* ── discover dynamic slugs from site-data.ts ───────────────── */
const siteDataSrc = readFileSync(join(root, SITE_DATA), "utf8");

function slugsFor(arrayName) {
  const start = siteDataSrc.indexOf(`export const ${arrayName}`);
  if (start === -1) return [];
  const next = siteDataSrc.indexOf("export const ", start + 1);
  const block = siteDataSrc.slice(start, next === -1 ? undefined : next);
  return [...block.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

const productSlugs = slugsFor("products");
const solutionSlugs = slugsFor("solutions");
const resourceSlugs = slugsFor("resources");

/* ── url set (order preserved in output) ────────────────────── */
// Each entry: { path, changefreq, priority, sources }
const entries = [];
const add = (path, changefreq, priority, sources) =>
  entries.push({ path, changefreq, priority, sources });

add("/", "weekly", "1.0", ["src/routes/index.tsx"]);
add("/platform", "weekly", "0.9", ["src/routes/platform.tsx"]);
add("/pricing", "monthly", "0.8", ["src/routes/pricing.tsx"]);
add("/contact", "monthly", "0.7", ["src/routes/contact.tsx"]);
add("/investors", "monthly", "0.6", ["src/routes/investors.tsx"]);

add("/products", "weekly", "0.9", ["src/routes/products.index.tsx", SITE_DATA]);
for (const slug of productSlugs)
  add(`/products/${slug}`, "monthly", "0.8", ["src/routes/products.$slug.tsx", SITE_DATA]);

add("/solutions", "weekly", "0.9", ["src/routes/solutions.tsx", SITE_DATA]);
for (const slug of solutionSlugs)
  add(`/solutions/${slug}`, "monthly", "0.8", ["src/routes/solutions.$slug.tsx", SITE_DATA]);

add("/resources", "weekly", "0.8", ["src/routes/resources.index.tsx", SITE_DATA]);
for (const slug of resourceSlugs)
  add(`/resources/${slug}`, "monthly", "0.7", ["src/routes/resources.$slug.tsx", SITE_DATA]);

add("/blog", "weekly", "0.8", ["src/routes/blog.tsx", SITE_DATA]);
add("/playbooks", "weekly", "0.7", ["src/routes/playbooks.tsx", SITE_DATA]);
add("/case-studies", "weekly", "0.7", ["src/routes/case-studies.tsx", SITE_DATA]);

add("/privacy-policy", "yearly", "0.3", ["src/routes/privacy-policy.tsx"]);
add("/terms", "yearly", "0.3", ["src/routes/terms.tsx"]);
add("/data-security", "yearly", "0.4", ["src/routes/data-security.tsx"]);

/* ── render xml ─────────────────────────────────────────────── */
const esc = (s) => s.replace(/&/g, "&amp;");

const urls = entries
  .map(({ path, changefreq, priority, sources }) => {
    const loc = path === "/" ? `${BASE}/` : `${BASE}${path}`;
    const lastmod = lastmodFor(sources);
    return [
      "  <url>",
      `    <loc>${esc(loc)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n");
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(join(root, "public/sitemap.xml"), xml);
console.log(`[sitemap] Wrote ${entries.length} URLs to public/sitemap.xml (build date ${BUILD_DATE})`);
