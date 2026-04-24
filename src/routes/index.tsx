import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeIn } from "@/components/FadeIn";
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
        <div className="absolute inset-0 dot-grid opacity-70" aria-hidden />
        <div className="absolute inset-0 mesh-hero" aria-hidden />
        <div className="container-x relative pt-24 pb-28 md:pt-36 md:pb-40">
          <FadeIn>
            <div className="label-eyebrow">Enterprise AI · GTM · Marketing · Build</div>
            <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight leading-[1.02] max-w-4xl">
              The AI Brain Behind <br />
              <span className="bg-gradient-to-br from-[var(--accent-blue)] via-foreground to-[var(--accent-green)] bg-clip-text text-transparent">
                Your Entire GTM
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Magnivo AI unifies intelligence, automation, and orchestration across every revenue motion — from lead to close to loyalty.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Book a Demo <ArrowRight size={14} /></Link>
              <Link to="/platform" className="btn-ghost">Explore Platform</Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-20 surface-card p-2 max-w-5xl mx-auto">
              <div className="rounded-md border border-border bg-background/60 p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {platformLayers.map((l) => (
                  <div key={l.name} className="p-4 rounded-md border border-border bg-card/60">
                    <div className="label-eyebrow text-[var(--accent-blue)]">Layer</div>
                    <div className="mt-2 font-semibold">{l.name}</div>
                    <div className="mt-1.5 text-xs text-muted-foreground line-clamp-3">{l.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PLATFORM STRIP */}
      <section className="container-x py-16">
        <FadeIn>
          <div className="surface-card p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
               style={{ borderColor: "color-mix(in oklab, var(--accent-blue) 40%, var(--surface-border))" }}>
            <div>
              <div className="label-eyebrow text-[var(--accent-blue)]">Magnivo AI Platform</div>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight">The unified intelligence layer.</h2>
              <p className="mt-3 text-muted-foreground max-w-2xl">
                Powering all products and client deployments — data, agents, automation, and orchestration in one.
              </p>
            </div>
            <Link to="/platform" className="btn-ghost shrink-0">Learn More <ArrowRight size={14} /></Link>
          </div>
        </FadeIn>
      </section>

      {/* PRODUCTS */}
      <section className="container-x py-20">
        <FadeIn>
          <div className="label-eyebrow">Products — SaaS</div>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
            6 AI Products Built for Revenue Teams
          </h2>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <FadeIn key={p.slug} delay={i * 0.05}>
                <Link to="/products/$slug" params={{ slug: p.slug }} className="surface-card hover-blue p-6 group block h-full">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-md border border-border flex items-center justify-center text-[var(--accent-blue)]">
                      <Icon size={20} />
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="mt-5 font-semibold text-lg">{p.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{p.description}</div>
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
            4 Service Lines for Deep AI Transformation
          </h2>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={s.name} delay={i * 0.05}>
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
        <div className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-14 rounded-md border border-border bg-card flex items-center justify-center text-muted-foreground/60 text-xs tracking-widest">
              LOGO {i + 1}
            </div>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { q: "Magnivo replaced three tools and a half-built data pipeline. Our reps finally trust the CRM.", n: "Sarah Chen", t: "VP Sales", c: "Northwind SaaS" },
            { q: "We shipped an AI-native ABM motion in six weeks. Pipeline is up 2.4x quarter over quarter.", n: "Marco Rivera", t: "Head of Growth", c: "Lumen Labs" },
            { q: "The Agent Studio team built workflows we couldn't have scoped, let alone built, on our own.", n: "Priya Anand", t: "CRO", c: "Vector Health" },
          ].map((t) => (
            <FadeIn key={t.n}>
              <div className="surface-card p-6 h-full">
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
