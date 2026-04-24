import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Magnivo AI" },
      { name: "description", content: "Enterprise AI services done with you: GTM Operations, Agent Studio, AI Growth, and Magnivo Build." },
      { property: "og:title", content: "Enterprise AI, Done With You." },
      { property: "og:description", content: "Four service lines for deep AI transformation." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Services"
        title="Enterprise AI, Done With You."
        subtitle="Four service lines that take you from blueprint to production-grade AI revenue motion."
      >
        <Link to="/contact" className="btn-primary">Let's Talk <ArrowRight size={14} /></Link>
      </PageHero>

      <section className="container-x py-20 space-y-6">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <FadeIn key={s.name} delay={i * 0.04}>
              <div className="surface-card hover-green p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="h-14 w-14 rounded-md border border-border flex items-center justify-center text-[var(--accent-green)] shrink-0">
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{s.name}</h2>
                      <span className="pill-green">{s.model}</span>
                    </div>
                    <p className="mt-3 text-muted-foreground max-w-2xl">{s.description}</p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="label-eyebrow">What's included</div>
                        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                          {s.included.map((it) => (
                            <li key={it} className="flex gap-2"><span className="text-[var(--accent-green)] mt-1">▸</span>{it}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="label-eyebrow">Client outcome</div>
                        <p className="mt-3 text-foreground/90">{s.outcome}</p>
                        <Link to="/contact" className="btn-ghost mt-5">Talk to us <ArrowRight size={14} /></Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </section>
    </SiteLayout>
  );
}
