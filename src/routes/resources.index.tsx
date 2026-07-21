import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, FileText, Zap, Layout, BarChart3, ListTree } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { resources, RESOURCE_CATEGORIES, type Resource } from "@/lib/site-data";

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

const TYPE_ICONS = {
  Blog: BookOpen,
  Playbook: ListTree,
  Guide: Zap,
  "Case Study": Layout,
  Benchmark: BarChart3,
  Glossary: FileText,
};

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

function ResourceCard({ r, delay }: { r: Resource; delay: number }) {
  const Icon = TYPE_ICONS[r.type] || FileText;
  return (
    <FadeIn delay={delay}>
      <Link
        to="/resources/$slug"
        params={{ slug: r.slug }}
        className="group surface-card hover-blue p-8 block h-full"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="h-10 w-10 rounded-lg border border-border flex items-center justify-center text-[var(--accent-blue)] group-hover:bg-background transition-colors">
            <Icon size={20} />
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60">
            {r.type}
          </span>
        </div>
        <h3 className="text-xl font-bold group-hover:text-[var(--accent-blue)] transition-colors leading-tight">
          {r.title}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{r.description}</p>
        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[var(--accent-blue)]">
          Read {r.type}{" "}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </FadeIn>
  );
}

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

      <nav className="container-x sticky top-16 z-10 py-4 bg-background/95 backdrop-blur border-b border-border/50">
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
