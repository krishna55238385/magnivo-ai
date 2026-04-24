import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeIn } from "@/components/FadeIn";
import { HeroVisual } from "@/components/HeroVisual";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { products, services, personas, platformLayers } from "@/lib/site-data";

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

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="aurora" aria-hidden />
        <div className="absolute inset-0 dot-grid opacity-60" aria-hidden />
        <div className="absolute inset-0 mesh-hero" aria-hidden />
        <div className="noise" aria-hidden />
        <div className="container-x relative pt-24 pb-24 md:pt-36 md:pb-32">
          <FadeIn>
            <div className="flex justify-center">
              <div className="ring-conic">
                <div className="rounded-[11px] bg-card/80 backdrop-blur-md px-3 py-1.5 text-[11px] tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
                  Enterprise AI · GTM · Marketing · Build
                </div>
              </div>
            </div>
            <h1 className="mt-7 text-center text-5xl md:text-7xl font-bold tracking-tight leading-[1.02] mx-auto max-w-4xl">
              The AI Brain Behind <br />
              <span className="text-gradient">Your Entire GTM</span>
            </h1>
            <p className="mt-6 text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Magnivo AI unifies intelligence, automation, and orchestration across every revenue motion — from lead to close to loyalty.
            </p>
            <div className="mt-9 flex justify-center flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Book a Demo <ArrowRight size={14} /></Link>
              <Link to="/platform" className="btn-ghost">Explore Platform</Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <HeroVisual />
          </FadeIn>
        </div>
      </section>

      {/* MARQUEE LOGOS */}
      <section className="border-y border-border bg-card/30 py-8 overflow-hidden">
        <div className="container-x mb-5">
          <div className="label-eyebrow text-center">Trusted by revenue teams across SaaS, fintech, and enterprise</div>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="marquee">
            {[...Array(2)].map((_, k) => (
              <div key={k} className="flex items-center gap-12 px-6">
                {["Northwind", "Lumen Labs", "Vector Health", "Helio", "Quanta", "Stratus", "Forge AI", "Parallax", "Kepler", "Atlas Bio"].map((n) => (
                  <div key={n + k} className="text-muted-foreground/70 text-lg font-semibold tracking-tight whitespace-nowrap">
                    {n}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container-x py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { v: 2.4, suffix: "x", label: "Avg pipeline lift" },
            { v: 38, suffix: "%", label: "Faster ramp time" },
            { v: 12480, suffix: "+", label: "AI workflows / day" },
            { v: 92, suffix: "%", label: "Forecast accuracy" },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.05}>
              <div className="surface-card hover-blue p-6">
                <div className="text-4xl md:text-5xl font-bold tracking-tight text-gradient">
                  <AnimatedCounter to={s.v} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PLATFORM STRIP */}
      <section className="container-x py-10">
        <FadeIn>
          <div className="surface-card p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
               style={{ borderColor: "color-mix(in oklab, var(--accent-blue) 40%, var(--surface-border))" }}>
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--accent-blue)]/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="label-eyebrow text-[var(--accent-blue)]">Magnivo AI Platform</div>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight">The unified intelligence layer.</h2>
              <p className="mt-3 text-muted-foreground max-w-2xl">
                Powering all products and client deployments — data, agents, automation, and orchestration in one.
              </p>
            </div>
            <Link to="/platform" className="btn-ghost shrink-0 relative">Learn More <ArrowRight size={14} /></Link>
          </div>
        </FadeIn>
      </section>

      {/* PRODUCTS */}
      <section className="container-x py-20">
        <FadeIn>
          <div className="label-eyebrow">Products — SaaS</div>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
            7 AI Products Built for Revenue Teams
          </h2>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <FadeIn key={p.slug} delay={i * 0.04}>
                <Link to="/products/$slug" params={{ slug: p.slug }} className="surface-card hover-blue p-6 group block h-full relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--accent-blue)]/0 group-hover:bg-[var(--accent-blue)]/10 blur-2xl transition-colors" />
                  <div className="flex items-center justify-between relative">
                    <div className="h-10 w-10 rounded-md border border-border flex items-center justify-center text-[var(--accent-blue)] group-hover:scale-110 transition-transform">
                      <Icon size={20} />
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="mt-5 font-semibold text-lg relative">{p.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground relative">{p.description}</div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2"><span className="pill-blue">Self-serve SaaS</span><span className="pill-blue">Recurring revenue</span></div>
          <Link to="/products" className="btn-ghost">View All Products <ArrowRight size={14} /></Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-x py-20">
        <FadeIn>
          <div className="label-eyebrow">Services — Enterprise</div>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
            5 Service Lines for Deep AI Transformation
          </h2>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={s.name} delay={i * 0.04}>
                <div className="surface-card hover-green p-7 h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md border border-border flex items-center justify-center text-[var(--accent-green)]">
                        <Icon size={20} />
                      </div>
                      <div className="font-semibold text-lg">{s.name}</div>
                    </div>
                    <span className="pill-green">{s.model}</span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{s.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2"><span className="pill-green">Done-for-you</span><span className="pill-green">Retainer + project</span></div>
          <Link to="/services" className="btn-ghost">Explore Services <ArrowRight size={14} /></Link>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="container-x py-20">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">Built for the Teams Driving Growth</h2>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {personas.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.05}>
              <div className="surface-card hover-blue p-6 h-full">
                <div className="h-8 w-8 rounded-md border border-border bg-gradient-to-br from-[var(--accent-blue)]/30 to-transparent" />
                <div className="mt-5 font-semibold">{p.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{p.hook}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PLATFORM DEEP DIVE */}
      <section className="container-x py-20">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">One Platform. Every Revenue Motion.</h2>
          <p className="mt-5 text-muted-foreground max-w-2xl">
            A layered architecture designed to connect every product and service — your data, your agents, your workflows, and your team in one orchestration plane.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-12 surface-card p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {platformLayers.map((l, i) => (
                <div key={l.name} className="relative">
                  <div className="surface-card p-5 h-full"
                       style={{ borderColor: i % 2 === 0 ? "color-mix(in oklab, var(--accent-blue) 35%, var(--surface-border))" : "color-mix(in oklab, var(--accent-green) 35%, var(--surface-border))" }}>
                    <div className="label-eyebrow" style={{ color: i % 2 === 0 ? "var(--accent-blue)" : "var(--accent-green)" }}>0{i + 1}</div>
                    <div className="mt-2 font-semibold">{l.name}</div>
                    <p className="mt-2 text-xs text-muted-foreground">{l.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* SOCIAL PROOF */}
      <section className="container-x py-20">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Trusted by Forward-Thinking Teams</h2>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { q: "Magnivo replaced three tools and a half-built data pipeline. Our reps finally trust the CRM.", n: "Sarah Chen", t: "VP Sales", c: "Northwind SaaS" },
            { q: "We shipped an AI-native ABM motion in six weeks. Pipeline is up 2.4x quarter over quarter.", n: "Marco Rivera", t: "Head of Growth", c: "Lumen Labs" },
            { q: "The Agent Studio team built workflows we couldn't have scoped, let alone built, on our own.", n: "Priya Anand", t: "CRO", c: "Vector Health" },
          ].map((t) => (
            <FadeIn key={t.n}>
              <div className="surface-card hover-blue p-6 h-full">
                <p className="text-foreground/90 leading-relaxed">"{t.q}"</p>
                <div className="mt-5 text-sm">
                  <div className="font-medium">{t.n}</div>
                  <div className="text-muted-foreground">{t.t}, {t.c}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-20">
        <FadeIn>
          <div className="label-eyebrow">FAQ</div>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">Common questions, answered.</h2>
        </FadeIn>
        <div className="mt-10 max-w-3xl">
          <FAQ items={faqs} />
        </div>
      </section>

      {/* INVESTOR / PARTNER */}
      <section className="border-y border-border bg-card/40">
        <div className="container-x py-20">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
              Building the AI Operating System for Modern GTM
            </h2>
            <p className="mt-5 text-muted-foreground max-w-2xl">
              GTM is the largest software category being rewritten by AI. Magnivo unifies the categories enterprises stitch together today — with traction across SaaS, mid-market, and enterprise.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/investors" className="btn-primary">View Investor Deck <ArrowRight size={14} /></Link>
              <Link to="/contact" className="btn-ghost">Partner With Us</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden">
        <div className="aurora" aria-hidden />
        <div className="absolute inset-0 mesh-hero" aria-hidden />
        <div className="container-x relative py-24 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to Transform Your Revenue Motion?</h2>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto">Join the teams using Magnivo to run AI-native GTM.</p>
            <div className="mt-8 flex justify-center">
              <Link to="/contact" className="btn-primary">Book a Demo <ArrowRight size={14} /></Link>
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
          <div key={it.q} className="surface-card overflow-hidden">
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
