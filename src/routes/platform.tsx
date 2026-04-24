import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { platformLayers } from "@/lib/site-data";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "Platform — Magnivo AI" },
      { name: "description", content: "The intelligence layer that connects data, agents, automation, and orchestration across every revenue motion." },
      { property: "og:title", content: "The Magnivo AI Platform" },
      { property: "og:description", content: "Data, agents, automation, and orchestration — unified." },
    ],
  }),
  component: PlatformPage,
});

function PlatformPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Platform"
        title="The Intelligence Layer That Connects Everything"
        subtitle="Magnivo's platform unifies your data, agents, automations, and orchestration into a single operating layer for GTM."
      >
        <Link to="/contact" className="btn-primary">Book a Demo <ArrowRight size={14} /></Link>
        <Link to="/products" className="btn-ghost">See Products</Link>
      </PageHero>

      <section className="container-x py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platformLayers.map((l, i) => (
            <FadeIn key={l.name} delay={i * 0.05}>
              <div className="surface-card hover-blue p-7 h-full">
                <div className="label-eyebrow text-[var(--accent-blue)]">Layer 0{i + 1}</div>
                <h3 className="mt-3 text-2xl font-semibold">{l.name}</h3>
                <p className="mt-3 text-muted-foreground">{l.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="container-x py-20">
        <FadeIn>
          <div className="surface-card p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">See Magnivo in motion</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">A 30-minute walkthrough of the platform powering revenue teams.</p>
            <div className="mt-7 flex justify-center"><Link to="/contact" className="btn-primary">Book a Demo <ArrowRight size={14} /></Link></div>
          </div>
        </FadeIn>
      </section>
    </SiteLayout>
  );
}
