import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, X } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";

export const Route = createFileRoute("/investors")({
  head: () => ({
    meta: [
      { title: "Investors — Magnivo AI" },
      { name: "description", content: "Magnivo AI is building the AI operating system for modern GTM. Market opportunity, traction, and vision for partners and investors." },
      { property: "og:title", content: "Building the AI Operating System for Modern GTM" },
      { property: "og:description", content: "Investor brief: market, platform, traction, and vision." },
    ],
  }),
  component: InvestorsPage,
});

function InvestorsPage() {
  const [open, setOpen] = useState(false);
  const stats = [
    { v: "120+", l: "Enterprise customers" },
    { v: "3.2x", l: "Avg pipeline lift" },
    { v: "$28M", l: "ARR run-rate" },
    { v: "92%", l: "Net revenue retention" },
  ];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Investors"
        title="Building the AI Operating System for Modern GTM"
        subtitle="GTM is a $200B+ software category being rewritten by AI. Magnivo is positioned at the intelligence layer — the connective tissue between every revenue tool, team, and motion."
      >
        <button onClick={() => setOpen(true)} className="btn-primary">Request Investor Deck <ArrowRight size={14} /></button>
        <Link to="/contact" className="btn-ghost">Talk to the founders</Link>
      </PageHero>

      <section className="container-x py-20">
        <FadeIn>
          <div className="label-eyebrow">Market Opportunity</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight max-w-3xl">A category-defining wedge into a $200B market.</h2>
        </FadeIn>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { l: "TAM", v: "$210B", d: "Global GTM software & services" },
            { l: "SAM", v: "$48B", d: "AI-native GTM tooling for mid-market & enterprise" },
            { l: "SOM", v: "$3.2B", d: "Initial wedge: AI agents + RevOps platform" },
          ].map((m, i) => (
            <FadeIn key={m.l} delay={i * 0.05}>
              <div className="surface-card hover-blue p-7 h-full">
                <div className="label-eyebrow text-[var(--accent-blue)]">{m.l}</div>
                <div className="mt-3 text-5xl font-bold tracking-tight">{m.v}</div>
                <div className="mt-2 text-sm text-muted-foreground">{m.d}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="container-x py-12">
        <FadeIn>
          <div className="surface-card p-10">
            <div className="label-eyebrow text-[var(--accent-green)]">Platform Advantage</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight max-w-3xl">A unified intelligence layer is a moat point-tools can't reach.</h2>
            <p className="mt-5 text-muted-foreground max-w-3xl">
              Every customer engagement compounds shared data, agents, and orchestration logic — improving every product simultaneously. Competitors must rebuild the stack to catch up.
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="container-x py-20">
        <FadeIn>
          <div className="label-eyebrow">Traction</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Numbers that compound.</h2>
        </FadeIn>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <FadeIn key={s.l} delay={i * 0.04}>
              <div className="surface-card p-7 h-full">
                <div className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-green)] bg-clip-text text-transparent">{s.v}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="container-x py-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <FadeIn>
          <div className="surface-card p-8 h-full">
            <div className="label-eyebrow">Team</div>
            <h3 className="mt-3 text-2xl font-bold">Operators who've built this before.</h3>
            <p className="mt-4 text-muted-foreground">Veterans from leading SaaS, AI, and enterprise GTM companies — combining deep AI research with hands-on revenue operating experience.</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.05}>
          <div className="surface-card p-8 h-full">
            <div className="label-eyebrow">Vision</div>
            <h3 className="mt-3 text-2xl font-bold">The AI brain for every GTM team on Earth.</h3>
            <p className="mt-4 text-muted-foreground">Within five years, no high-growth company will run revenue without an AI orchestration layer. Magnivo is building it.</p>
          </div>
        </FadeIn>
      </section>

      <section className="container-x py-20 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Want the full deck?</h2>
          <button onClick={() => setOpen(true)} className="btn-primary mt-6">Request Investor Deck <ArrowRight size={14} /></button>
        </FadeIn>
      </section>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="surface-card p-7 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Request the deck</h3>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Drop your email and we'll send the latest investor brief within 24 hours.</p>
            <form
              className="mt-5 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks — we'll be in touch.");
                setOpen(false);
              }}
            >
              <input required type="text" placeholder="Full name" className="w-full px-4 py-2.5 rounded-md bg-background border border-border focus:outline-none focus:border-[var(--accent-blue)]" />
              <input required type="email" placeholder="Work email" className="w-full px-4 py-2.5 rounded-md bg-background border border-border focus:outline-none focus:border-[var(--accent-blue)]" />
              <input type="text" placeholder="Firm" className="w-full px-4 py-2.5 rounded-md bg-background border border-border focus:outline-none focus:border-[var(--accent-blue)]" />
              <button type="submit" className="btn-primary w-full justify-center">Send Request</button>
            </form>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
