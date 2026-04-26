import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { solutions } from "@/lib/site-data";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — Magnivo.ai" },
      { name: "description", content: "Enterprise AI solutions done with you: GTM Operations, Agent Studio, AI Growth, and Magnivo Build." },
      { property: "og:title", content: "Enterprise AI Solutions, Done With You." },
      { property: "og:description", content: "Five strategic solution lines for deep AI transformation." },
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Solutions"
        title="Enterprise AI, Done With You."
        subtitle="Strategic solution lines that take you from blueprint to production-grade AI revenue motion."
      >
        <Link to="/contact" className="btn-primary">Let's Talk <ArrowRight size={14} /></Link>
      </PageHero>

      <section className="container-x py-20 space-y-6">
        {solutions.map((s, i) => {
          const Icon = s.icon;
          return (
            <FadeIn key={s.slug} delay={i * 0.04}>
              <Link 
                to="/solutions/$slug" 
                params={{ slug: s.slug }}
                className="block surface-card hover-green p-8 md:p-10 group transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="h-14 w-14 rounded-md border border-border flex items-center justify-center text-[var(--accent-green)] shrink-0 group-hover:bg-background transition-colors">
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-[var(--accent-green)] transition-colors">{s.name}</h2>
                      <span className="pill-green">{s.model}</span>
                    </div>
                    <p className="mt-3 text-muted-foreground max-w-2xl">{s.description}</p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="label-eyebrow">What's included</div>
                        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                          {s.included.slice(0, 3).map((it) => (
                            <li key={it} className="flex gap-2"><span className="text-[var(--accent-green)] mt-1">▸</span>{it}</li>
                          ))}
                          {s.included.length > 3 && <li className="text-[var(--accent-green)] font-medium">And more...</li>}
                        </ul>
                      </div>
                      <div className="flex flex-col justify-between">
                        <div>
                          <div className="label-eyebrow">Client outcome</div>
                          <p className="mt-3 text-foreground/90 leading-snug">{s.outcome}</p>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[var(--accent-green)]">
                          View Solution Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          );
        })}
      </section>

    </SiteLayout>
  );
}
