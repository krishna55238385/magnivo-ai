import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ListTree, Layout, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { ResourceCard } from "@/components/ResourceCard";
import { resources, RESOURCE_CATEGORIES } from "@/lib/site-data";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Resources — Magnivo.ai" },
      {
        name: "description",
        content: "Insights, playbooks, and guides on AI-native GTM and autonomous revenue agents.",
      },
      { property: "og:title", content: "Resources — Magnivo.ai" },
      { property: "og:description", content: "Insights, playbooks, and guides on AI-native GTM." },
      { property: "og:image", content: "https://magnivo.ai/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://magnivo.ai/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://magnivo.ai/resources" }],
  }),
  component: ResourcesPage,
});

const FALLBACK_CATEGORY = "More Resources";

const CATEGORY_SHORT_LABEL: Record<string, string> = {
  "AI GTM Operating System": "GTM OS",
  "Find: Prospecting & Signals": "Find",
  "Understand: Account Intelligence": "Understand",
  "Reach: Outreach & Timing": "Reach",
  "Sales Motion: Engage & Close": "Sales Motion",
  "Case Studies": "Case Studies",
  [FALLBACK_CATEGORY]: "More",
};

const CATEGORY_DESCRIPTION: Record<string, string> = {
  "AI GTM Operating System": "The foundational reads on what an AI-native GTM system is and why it replaces the tool-stack model.",
  "Find: Prospecting & Signals": "ICP definition, lead scoring, buying signals, and TAM — the mechanics of finding the right accounts.",
  "Understand: Account Intelligence": "Account research, stakeholder mapping, competitive intel, and market sizing before you reach out.",
  "Reach: Outreach & Timing": "Personalization, send timing, deliverability, and the mechanics of outbound that actually lands.",
  "Sales Motion: Engage & Close": "Objection handling, reply speed, qualification, proposals, and forecasting — the motion after first contact.",
  "Case Studies": "Real engagements and outcomes.",
  [FALLBACK_CATEGORY]: "Additional reading.",
};

function slugifyCategory(category: string) {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const TYPE_PAGES = [
  { to: "/blog" as const, icon: BookOpen, label: "Blog", desc: "All posts, by publish date." },
  { to: "/playbooks" as const, icon: ListTree, label: "Playbooks & Guides", desc: "Step-by-step frameworks." },
  { to: "/case-studies" as const, icon: Layout, label: "Case Studies", desc: "Real engagements & outcomes." },
];

function ResourcesPage() {
  const categories = [...RESOURCE_CATEGORIES, FALLBACK_CATEGORY];
  const grouped = categories
    .map((category) => ({
      category,
      items: resources.filter((r) => (r.category ?? FALLBACK_CATEGORY) === category),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Library"
        title="Revenue Intelligence & AI Strategy"
        subtitle="The blueprints, benchmarks, and best practices for the AI-native GTM era."
      />

      <section className="container-x pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TYPE_PAGES.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="group surface-card hover-blue p-6 flex items-center gap-4"
            >
              <div className="h-11 w-11 rounded-lg border border-border flex items-center justify-center text-[var(--accent-blue)] shrink-0 group-hover:bg-background transition-colors">
                <t.icon size={20} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-foreground group-hover:text-[var(--accent-blue)] transition-colors">
                  {t.label}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.desc}</div>
              </div>
              <ArrowRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      <nav className="container-x sticky top-16 z-10 py-4 mt-8 bg-background/95 backdrop-blur border-b border-t border-border/50">
        <div className="flex flex-wrap gap-2">
          {grouped.map((g) => (
            <a
              key={g.category}
              href={`#${slugifyCategory(g.category)}`}
              className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-[var(--accent-blue)]/50 transition-colors"
            >
              {CATEGORY_SHORT_LABEL[g.category] ?? g.category}
            </a>
          ))}
        </div>
      </nav>

      {grouped.map((g, gi) => (
        <section key={g.category} id={slugifyCategory(g.category)} className="container-x py-16 scroll-mt-32">
          <FadeIn>
            <div className="label-eyebrow">{`Category ${gi + 1} of ${grouped.length}`}</div>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">{g.category}</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              {CATEGORY_DESCRIPTION[g.category] ?? ""}
            </p>
          </FadeIn>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {g.items.map((r, i) => (
              <ResourceCard key={r.slug} r={r} delay={i * 0.04} />
            ))}
          </div>
        </section>
      ))}

      <section className="container-x py-16">
        <div className="surface-card p-8 md:p-12 border border-border/50 bg-secondary/20 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl font-bold">Subscribe to GTM Weekly</h2>
            <p className="mt-2 text-muted-foreground">
              Get the latest AI GTM playbooks and benchmark data delivered to your inbox every
              Tuesday.
            </p>
          </div>
          <div className="flex w-full md:w-auto gap-3">
            <input
              type="email"
              placeholder="name@company.com"
              className="flex-1 md:w-64 h-11 bg-background border border-border rounded-md px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue)]"
            />
            <button className="btn-primary h-11">Subscribe</button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
