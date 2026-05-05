import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, FileText, Zap, Layout, BarChart3, ListTree } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { resources } from "@/lib/site-data";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Resources — Magnivo.ai" },
      { name: "description", content: "Insights, playbooks, and guides on AI-native GTM and autonomous revenue agents." },
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

function ResourcesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Library"
        title="Revenue Intelligence & AI Strategy"
        subtitle="The blueprints, benchmarks, and best practices for the AI-native GTM era."
      />

      <section className="container-x py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((r, i) => {
            const Icon = TYPE_ICONS[r.type] || FileText;
            return (
              <FadeIn key={r.slug} delay={i * 0.05}>
                <Link
                  to="/resources/$slug"
                  params={{ slug: r.slug }}
                  className="group surface-card hover-blue p-8 block h-full"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-10 w-10 rounded-lg border border-border flex items-center justify-center text-[var(--accent-blue)] group-hover:bg-background transition-colors">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60">{r.type}</span>
                  </div>
                  <h2 className="text-2xl font-bold group-hover:text-[var(--accent-blue)] transition-colors leading-tight">
                    {r.title}
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {r.description}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[var(--accent-blue)]">
                    Read {r.type} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="container-x py-16">
        <div className="surface-card p-8 md:p-12 border border-border/50 bg-secondary/20 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl font-bold">Subscribe to GTM Weekly</h2>
            <p className="mt-2 text-muted-foreground">Get the latest AI GTM playbooks and benchmark data delivered to your inbox every Tuesday.</p>
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
