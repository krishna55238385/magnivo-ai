import { chromium } from "playwright";
import fs from "node:fs/promises";

const url = process.env.DASHBOARD_URL ?? "http://localhost:8080/dashboard-image";
const outPng = process.env.OUT_PNG ?? "public/hero-dashboard.png";
const outWebp = process.env.OUT_WEBP ?? "public/hero-dashboard.webp";

const viewport = { width: 1400, height: 900 };

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });

  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(250);

  await fs.mkdir("public", { recursive: true });

  // Capture a clean crop around the mock (centered in the route).
  const container = page.locator("body");
  await container.screenshot({ path: outPng, type: "png" });

  // Also output WebP for faster marketing usage.
  await container.screenshot({ path: outWebp, type: "webp", quality: 88 });

  await browser.close();
  // eslint-disable-next-line no-console
  console.log(`Wrote ${outPng} and ${outWebp} from ${url}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

