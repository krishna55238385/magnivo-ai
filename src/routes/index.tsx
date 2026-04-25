import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plus, Minus, Sparkles, PlayCircle, CircleDot } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeIn } from "@/components/FadeIn";
import { HeroVisual } from "@/components/HeroVisual";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { DemoModal } from "@/components/DemoModal";
import { Pillars } from "@/components/Pillars";
import { HowItWorks } from "@/components/HowItWorks";
import { products, services, personas } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Magnivo AI — The AI Brain Behind Your Entire GTM" },
      { name: "description", content: "Enterprise AI for GTM, marketing, products and build. Unify intelligence, automation, and orchestration across every revenue motion." },
      { property: "og:title", content: "Magnivo AI — The AI Brain Behind Your Entire GTM" },
      { property: "og:description", content: "Enterprise AI for GTM, marketing, products and build." },
    ],
  }),
  component: HomePage,
});

const tickerEvents = [
  "agent.dispatch(\"forecast\")",
  "+12 leads enriched",
  "deal-risk: low",
  "compass.sync ✓ HubSpot",
  "intelligence.score 92.3%",
  "reachout.sequence shipped",
  "orbit.account intent ↑",
  "agentdesk.deploy ok",
];

function HomePage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="aurora" aria-hidden />
        <div className="absolute inset-0 dot-grid opacity-60" aria-hidden />
        <div className="absolute inset-0 mesh-hero" aria-hidden />
        <div className="noise" aria-hidden />

        {/* Top spotlight */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at center top, color-mix(in oklab, var(--accent-blue) 35%, transparent), transparent 60%)",
            filter: "blur(20px)",
          }}
        />
        {/* Bottom-left green spotlight (added) */}
        <div
          className="absolute -bottom-40 -left-32 w-[700px] h-[500px] pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at left bottom, color-mix(in oklab, var(--accent-green) 25%, transparent), transparent 65%)",
            filter: "blur(28px)",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-blue)]/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-green)]/40 to-transparent" />

        {/* Floating dots */}
        <div className="hidden md:block absolute top-32 left-10 h-2 w-2 rounded-full bg-[var(--accent-blue)] shadow-[0_0_24px_4px_var(--accent-blue)] float-y" />
        <div className="hidden md:block absolute top-60 right-16 h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] shadow-[0_0_20px_4px_var(--accent-green)] float-y-delay" />
        <div className="hidden md:block absolute bottom-40 left-1/4 h-1 w-1 rounded-full bg-foreground/60 shadow-[0_0_12px_2px_color-mix(in_oklab,var(--foreground)_40%,transparent)] float-y" />

        <div className="container-x relative pt-20 pb-20 sm:pt-28 md:pt-36 md:pb-28">
          <FadeIn>
            <div className="flex justify-center">
              <div className="ring-conic">
                <div className="rounded-[11px] bg-card/80 backdrop-blur-md px-3 py-1.5 text-[10px] sm:text-[11px] tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
                  <span className="hidden sm:inline">Enterprise AI · GTM · Marketing · Build</span>
                  <span className="sm:hidden">Enterprise AI · GTM</span>
                </div>
              </div>
            </div>

            <h1 className="font-display mt-7 text-center text-[2.6rem] leading-[1.02] sm:text-5xl md:text-7xl lg:text-[5.75rem] tracking-tight mx-auto max-w-5xl">
              <span className="block">The AI Brain Behind</span>
              <span className="text-gradient block mt-1 md:mt-2 italic" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}>Your Entire GTM</span>
            </h1>

            <p className="mt-6 sm:mt-7 text-center text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
              Magnivo AI unifies intelligence, automation, and orchestration across every revenue motion — from lead to close to loyalty.
            </p>

            <div className="mt-8 sm:mt-9 flex justify-center flex-wrap gap-3 px-2">
              <button onClick={() => setDemoOpen(true)} className="btn-primary w-full sm:w-auto justify-center">
                Book a Demo <ArrowRight size={14} />
              </button>
              <Link to="/platform" className="btn-ghost w-full sm:w-auto justify-center">
                <PlayCircle size={14} /> Explore Platform
              </Link>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Sparkles size={12} className="text-[var(--accent-blue)]" />
              No credit card. Live in &lt;30 minutes.
            </div>

            {/* Live ticker */}
            <div className="mt-8 max-w-3xl mx-auto">
              <div className="relative h-9 overflow-hidden rounded-full border border-border bg-card/60 backdrop-blur-md">
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                <div className="ticker h-full items-center px-6">
                  {[...tickerEvents, ...tickerEvents].map((t, i) => (
                    <span key={i} className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground whitespace-nowrap">
                      <CircleDot size={10} className="text-[var(--accent-green)]" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <HeroVisual />
          </FadeIn>
        </div>
      </section>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* STATS */}
      <section className="container-x py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { v: 2.4, suffix: "x", label: "Avg pipeline lift" },
            { v: 38, suffix: "%", label: "Faster ramp time" },
            { v: 12480, suffix: "+", label: "AI workflows / day" },
            { v: 92, suffix: "%", label: "Forecast accuracy" },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.05}>
              <div className="premium-card p-5 md:p-6">
                <div className="font-display text-3xl md:text-5xl tracking-tight text-gradient">
                  <AnimatedCounter to={s.v} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-xs md:text-sm text-muted-foreground">{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="container-x"><div className="divider-glow" /></div>

      {/* FOUR PILLARS */}
      <Pillars />

      <div className="container-x"><div className="divider-glow" /></div>

      {/* HOW IT WORKS */}
      <HowItWorks />

      <div className="container-x"><div className="divider-glow" /></div>

      {/* PLATFORM TEASER (compact) */}
      <section className="container-x py-16 md:py-20">
        <FadeIn>
          <div className="premium-card p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--accent-blue)]/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="label-eyebrow text-[var(--accent-blue)]">Magnivo AI Platform</div>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight">The unified intelligence layer.</h2>
              <p className="mt-3 text-muted-foreground max-w-2xl text-sm md:text-base">
                Data, agents, automation, and orchestration in one — the foundation powering every product and engagement.
              </p>
            </div>
            <Link to="/platform" className="btn-ghost shrink-0 relative">See the Platform <ArrowRight size={14} /></Link>
          </div>
        </FadeIn>
      </section>

      {/* PRODUCTS + SERVICES TEASER (compact, no full grids) */}
      <section className="container-x py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          {/* Products teaser */}
          <FadeIn>
            <div className="premium-card p-7 md:p-9 h-full flex flex-col">
              <div className="flex items-center justify-between gap-3">
                <span className="pill-blue">SaaS</span>
                <span className="text-xs text-muted-foreground">{products.length} products</span>
              </div>
              <h3 className="mt-5 text-2xl md:text-3xl font-bold tracking-tight">
                Built for revenue teams
              </h3>
              <p className="mt-3 text-muted-foreground text-sm md:text-base">
                Self-serve, AI-native products spanning the full funnel — from lead intelligence to AI-orchestrated CRM.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {products.map((p) => (
                  <span key={p.slug} className="text-xs px-2.5 py-1.5 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-[color-mix(in_oklab,var(--accent-blue)_50%,var(--surface-border))] transition cursor-default">
                    {p.name}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-7">
                <Link to="/products" className="btn-ghost">View Products <ArrowRight size={14} /></Link>
              </div>
            </div>
          </FadeIn>

          {/* Services teaser */}
          <FadeIn delay={0.08}>
            <div className="premium-card p-7 md:p-9 h-full flex flex-col">
              <div className="flex items-center justify-between gap-3">
                <span className="pill-green">Enterprise</span>
                <span className="text-xs text-muted-foreground">{services.length} service lines</span>
              </div>
              <h3 className="mt-5 text-2xl md:text-3xl font-bold tracking-tight">
                Done with you, end to end
              </h3>
              <p className="mt-3 text-muted-foreground text-sm md:text-base">
                Deep AI transformation engagements — from blueprint to production agents to ongoing optimization.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {services.map((s) => (
                  <span key={s.name} className="text-xs px-2.5 py-1.5 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-[color-mix(in_oklab,var(--accent-green)_50%,var(--surface-border))] transition cursor-default">
                    {s.name}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-7">
                <Link to="/services" className="btn-ghost">Explore Services <ArrowRight size={14} /></Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="container-x"><div className="divider-glow" /></div>

      {/* WHO IT'S FOR */}
      <section className="container-x py-20 md:py-24">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <div className="label-eyebrow">Who It's For</div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Built for the teams <span className="text-gradient">driving growth</span>
            </h2>
          </div>
        </FadeIn>
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {personas.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.05}>
              <div className="premium-card p-6 h-full">
                <div className="h-8 w-8 rounded-md border border-border bg-gradient-to-br from-[var(--accent-blue)]/30 to-transparent" />
                <div className="mt-5 font-semibold">{p.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{p.hook}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-x py-20 md:py-24">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <div className="label-eyebrow">Customer Stories</div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Trusted by <span className="text-gradient">forward-thinking teams</span>
            </h2>
          </div>
        </FadeIn>
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { q: "Magnivo replaced three tools and a half-built data pipeline. Our reps finally trust the CRM.", n: "Sarah Chen", t: "VP Sales", c: "Northwind SaaS" },
            { q: "We shipped an AI-native ABM motion in six weeks. Pipeline is up 2.4x quarter over quarter.", n: "Marco Rivera", t: "Head of Growth", c: "Lumen Labs" },
            { q: "The Agent Studio team built workflows we couldn't have scoped, let alone built, on our own.", n: "Priya Anand", t: "CRO", c: "Vector Health" },
          ].map((t) => (
            <FadeIn key={t.n}>
              <div className="premium-card p-6 md:p-7 h-full">
                <div className="text-[var(--accent-blue)] text-3xl leading-none">"</div>
                <p className="mt-2 text-foreground/90 leading-relaxed">{t.q}</p>
                <div className="mt-6 pt-5 border-t border-border text-sm">
                  <div className="font-medium">{t.n}</div>
                  <div className="text-muted-foreground">{t.t}, {t.c}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-20 md:py-24">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <div className="label-eyebrow">FAQ</div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Common questions, <span className="text-gradient">answered</span>
            </h2>
          </div>
        </FadeIn>
        <div className="mt-12 max-w-3xl mx-auto">
          <FAQ items={faqs} />
        </div>
      </section>

      {/* INVESTOR / PARTNER */}
      <section className="border-y border-border bg-card/40 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30" aria-hidden />
        <div className="container-x py-20 relative">
          <FadeIn>
            <div className="max-w-3xl">
              <div className="label-eyebrow text-[var(--accent-blue)]">For Investors & Partners</div>
              <h2 className="mt-4 font-display text-3xl md:text-5xl tracking-tight">
                Building the AI Operating System <span className="text-gradient">for Modern GTM</span>
              </h2>
              <p className="mt-5 text-muted-foreground max-w-2xl">
                GTM is the largest software category being rewritten by AI. Magnivo unifies what enterprises stitch together today — with traction across SaaS, mid-market, and enterprise.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/investors" className="btn-primary">View Investor Deck <ArrowRight size={14} /></Link>
                <Link to="/contact" className="btn-ghost">Partner With Us</Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden">
        <div className="aurora" aria-hidden />
        <div className="absolute inset-0 mesh-hero" aria-hidden />
        <div className="container-x relative py-24 md:py-28 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight">
              Ready to transform your <span className="text-gradient">revenue motion?</span>
            </h2>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto">Join the teams using Magnivo to run AI-native GTM.</p>
            <div className="mt-8 flex justify-center">
              <button onClick={() => setDemoOpen(true)} className="btn-primary">Book a Demo <ArrowRight size={14} /></button>
            </div>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  );
}

const faqs = [
  {
    q: "How is Magnivo different from a CRM or sales engagement tool?",
    a: "Magnivo is an AI-native platform — products like Compass and Reachout sit on a shared intelligence and agent layer, so data, signals, and actions stay in sync across the full revenue motion.",
  },
  {
    q: "Can we adopt one product without buying the whole platform?",
    a: "Yes. Every product is self-serve and works standalone. The deeper the platform adoption, the more compounding the intelligence becomes.",
  },
  {
    q: "How fast can enterprise services go live?",
    a: "Most engagements have a working blueprint in 2 weeks and production agents inside 6–8 weeks, depending on the scope of GTM Operations or Agent Studio.",
  },
  {
    q: "How is data security handled?",
    a: "Role-based access, isolated tenant storage, audit trails, and observability on every agent action. SOC2-aligned controls across the platform.",
  },
];

function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className="premium-card overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-6 p-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-foreground">{it.q}</span>
              <span className="h-7 w-7 rounded-md border border-border flex items-center justify-center text-muted-foreground shrink-0">
                {isOpen ? <Minus size={14} /> : <Plus size={14} />}
              </span>
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
