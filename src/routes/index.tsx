import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plus, Minus, X, Check, Target, Zap, RefreshCw, TrendingUp, MessageSquare, ChevronDown, Rocket, Briefcase, Store, BarChart2, Database, ScanSearch, Network, Radar } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeIn } from "@/components/FadeIn";
import { HeroVisual } from "@/components/HeroVisual";
import { DemoModal } from "@/components/DemoModal";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <SiteLayout>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden min-h-[calc(100svh-3.5rem)] sm:min-h-[calc(100svh-4rem)] flex items-start sm:items-center pt-10 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20">
        <div className="aurora" aria-hidden />
        <div className="absolute inset-0 dot-grid opacity-60" aria-hidden />
        <div className="absolute inset-0 mesh-hero" aria-hidden />
        <div className="noise" aria-hidden />

        {/* Spotlights */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[min(1100px,150vw)] h-[520px] sm:h-[600px] pointer-events-none" aria-hidden style={{ background: "radial-gradient(ellipse at center top, color-mix(in oklab, var(--accent-blue) 35%, transparent), transparent 60%)", filter: "blur(20px)" }} />
        <div className="absolute -bottom-40 -left-32 w-[min(700px,130vw)] h-[420px] sm:h-[500px] pointer-events-none" aria-hidden style={{ background: "radial-gradient(ellipse at left bottom, color-mix(in oklab, var(--accent-green) 25%, transparent), transparent 65%)", filter: "blur(28px)" }} />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-blue)]/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-green)]/40 to-transparent" />

        <div className="hidden md:block absolute top-32 left-10 h-2 w-2 rounded-full bg-[var(--accent-blue)] shadow-[0_0_24px_4px_var(--accent-blue)] float-y" />
        <div className="hidden md:block absolute top-60 right-16 h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] shadow-[0_0_20px_4px_var(--accent-green)] float-y-delay" />
        <div className="hidden md:block absolute bottom-40 left-1/4 h-1 w-1 rounded-full bg-foreground/60 shadow-[0_0_12px_2px_color-mix(in_oklab,var(--foreground)_40%,transparent)] float-y" />

        <div className="container-x relative w-full">
          <FadeIn>
            <div className="flex justify-center mb-5 sm:mb-7">
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                AI GROWTH STACK
              </div>
            </div>

            <h1 className="text-center text-5xl leading-[1.06] sm:text-6xl md:text-8xl lg:text-[7rem] font-bold mx-auto max-w-5xl">
              <span className="block text-foreground">Your Revenue.</span>
              <span className="text-gradient block mt-1 md:mt-2">On Autopilot.</span>
            </h1>

            <p className="mt-6 sm:mt-8 md:mt-10 text-center text-base sm:text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed px-1 sm:px-2 font-medium">
              Magnivo unifies growth intelligence, autonomous AI execution, and strategic consulting — into one system that compounds your revenue, continuously.
            </p>

            <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center flex-wrap gap-3 sm:gap-4 px-1 sm:px-2">
              <button onClick={() => setDemoOpen(true)} className="btn-primary w-full sm:w-auto justify-center text-base sm:text-lg min-h-12 sm:h-14 px-5 sm:px-8 bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue)]/90 border-transparent shadow-[0_0_30px_-5px_color-mix(in_oklab,var(--accent-blue)_50%,transparent)]">
                Book a Strategy Call <ArrowRight size={16} />
              </button>
              <Link to="/platform" className="btn-ghost w-full sm:w-auto justify-center text-base sm:text-lg min-h-12 sm:h-14 px-5 sm:px-8 border border-border/50 bg-card/30">
                Explore Platform
              </Link>
            </div>

            <div className="mt-8 text-center text-sm text-muted-foreground font-medium">
              Currently onboarding founding clients — limited spots available.
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-10 sm:mt-16 md:mt-24">
            <HeroVisual />
          </FadeIn>
        </div>
      </section>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* CREDIBILITY BAR */}
      <section className="bg-card/40 border-y border-border py-8 overflow-hidden relative">
        <div className="text-center text-[10px] font-bold tracking-[0.1em] uppercase text-muted-foreground mb-6">
          Built for the revenue stack of modern B2B
        </div>
        <div className="flex w-full overflow-hidden">
          <div className="marquee flex gap-6 md:gap-12 whitespace-nowrap items-center px-4 w-max">
            {[
              "GTM Orchestration", "AI Agents", "Pipeline Intelligence",
              "Autonomous Outreach", "Account-Based Marketing", "AEO + GEO Optimisation",
              "Revenue Attribution", "Demand Generation", "AI Agent Orchestration",
              "Lifecycle & Retention", "GTM OS", "Revenue Intelligence",
              "Strategic AI Consulting", "Growth Intelligence",
              "GTM Orchestration", "AI Agents", "Pipeline Intelligence",
              "Autonomous Outreach", "Account-Based Marketing", "AEO + GEO Optimisation",
              "Revenue Attribution", "Demand Generation", "AI Agent Orchestration",
              "Lifecycle & Retention", "GTM OS", "Revenue Intelligence",
              "Strategic AI Consulting", "Growth Intelligence"
            ].map((pill, i) => (
              <div key={i} className="inline-flex items-center px-4 py-2 rounded-full border border-border bg-card/80 text-sm font-medium text-foreground/90 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] mr-3" />
                {pill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DATA FOUNDATION SECTION */}
      <section className="container-x py-16 sm:py-20 md:py-32 relative">
        <div className="absolute top-0 right-0 w-[min(600px,120vw)] h-[420px] sm:h-[600px] bg-[var(--accent-blue)]/5 blur-[120px] rounded-full pointer-events-none" />
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="label-eyebrow mb-4">THE DATA LAYER</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              It starts with your data. <span className="text-muted-foreground block mt-2">Not dashboards.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
              Before intelligence. Before automation. We unify the raw signals your business is already generating — but not using.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {/* Card 1 */}
          <FadeIn delay={0.05} className="h-full">
            <div className="premium-card p-6 md:p-8 h-full bg-card/40 border-border/50 flex flex-col group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-white/20 transition-all duration-300">
              <div className="mb-6 flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/70 border border-white/10 group-hover:border-white/20 transition-colors">
                  <Database size={20} />
                </div>
                <div className="text-[10px] font-bold tracking-widest text-muted-foreground/50">LAYER 01</div>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">Your Ground Truth Layer</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                Everything begins with your internal data — the only source of truth your business actually owns.
              </p>
              <ul className="space-y-3 mt-auto pt-6 border-t border-border/50">
                {[
                  "Website behavior (visits, pages, conversions)",
                  "CRM data (leads, pipeline, revenue)",
                  "Product usage and engagement"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-foreground/80">
                    <div className="w-1 h-1 rounded-full bg-white/40 mt-1.5 shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Card 2 */}
          <FadeIn delay={0.1} className="h-full">
            <div className="premium-card p-6 md:p-8 h-full bg-card/40 border-border/50 flex flex-col group hover:-translate-y-1 hover:shadow-[0_8px_30px_color-mix(in_oklab,var(--accent-blue)_10%,transparent)] hover:border-[var(--accent-blue)]/40 transition-all duration-300 relative">
              {/* Connector line from prev card (desktop only) */}
              <div className="hidden lg:block absolute top-1/2 -left-6 w-6 border-t border-dashed border-border/50" />
              <div className="mb-6 flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-blue)]/5 flex items-center justify-center text-[var(--accent-blue)] border border-[var(--accent-blue)]/10 group-hover:border-[var(--accent-blue)]/30 transition-colors">
                  <ScanSearch size={20} />
                </div>
                <div className="text-[10px] font-bold tracking-widest text-[var(--accent-blue)]/40">LAYER 02</div>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">Your Hidden Demand Layer</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                Most of your buyers never fill a form. We identify them anyway — before your competitors do.
              </p>
              <ul className="space-y-3 mt-auto pt-6 border-t border-border/50">
                {[
                  "Identify companies visiting your website",
                  "Map anonymous traffic to accounts",
                  "Reveal hidden pipeline"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-foreground/80">
                    <div className="w-1 h-1 rounded-full bg-[var(--accent-blue)]/50 mt-1.5 shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Card 3 */}
          <FadeIn delay={0.15} className="h-full">
            <div className="premium-card p-6 md:p-8 h-full bg-card/40 border-border/50 flex flex-col group hover:-translate-y-1 hover:shadow-[0_8px_30px_color-mix(in_oklab,oklch(0.72_0.18_300)_10%,transparent)] hover:border-[oklch(0.72_0.18_300)]/40 transition-all duration-300 relative">
              {/* Connector line from prev card (desktop only) */}
              <div className="hidden lg:block absolute top-1/2 -left-6 w-6 border-t border-dashed border-border/50" />
              <div className="mb-6 flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-[oklch(0.72_0.18_300)]/5 flex items-center justify-center text-[oklch(0.72_0.18_300)] border border-[oklch(0.72_0.18_300)]/10 group-hover:border-[oklch(0.72_0.18_300)]/30 transition-colors">
                  <Network size={20} />
                </div>
                <div className="text-[10px] font-bold tracking-widest text-[oklch(0.72_0.18_300)]/40">LAYER 03</div>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">Your Engagement Layer</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                Every campaign, click, and interaction is a signal. We unify them into one system.
              </p>
              <ul className="space-y-3 mt-auto pt-6 border-t border-border/50">
                {[
                  "Paid ads (LinkedIn, Google)",
                  "Email and outbound engagement",
                  "Campaign interactions"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-foreground/80">
                    <div className="w-1 h-1 rounded-full bg-[oklch(0.72_0.18_300)]/50 mt-1.5 shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Card 4 */}
          <FadeIn delay={0.2} className="h-full">
            <div className="premium-card p-6 md:p-8 h-full bg-card/40 border-border/50 flex flex-col group hover:-translate-y-1 hover:shadow-[0_8px_30px_color-mix(in_oklab,var(--accent-green)_10%,transparent)] hover:border-[var(--accent-green)]/40 transition-all duration-300 relative">
              {/* Connector line from prev card (desktop only) */}
              <div className="hidden lg:block absolute top-1/2 -left-6 w-6 border-t border-dashed border-border/50" />
              <div className="mb-6 flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-green)]/5 flex items-center justify-center text-[var(--accent-green)] border border-[var(--accent-green)]/10 group-hover:border-[var(--accent-green)]/30 transition-colors">
                  <Radar size={20} />
                </div>
                <div className="text-[10px] font-bold tracking-widest text-[var(--accent-green)]/40">LAYER 04</div>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">Your In-Market Signal Layer</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                Not all activity matters. We isolate real buying intent — when it actually counts.
              </p>
              <ul className="space-y-3 mt-auto pt-6 border-t border-border/50">
                {[
                  "High-value page visits (pricing, product)",
                  "Repeat engagement patterns",
                  "Competitor research behavior"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-foreground/80">
                    <div className="w-1 h-1 rounded-full bg-[var(--accent-green)]/50 mt-1.5 shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        {/* FLOW CONNECTOR */}
        <FadeIn delay={0.25}>
          <div className="flex flex-col items-center mt-12 mb-8 relative z-10 text-center">
            <div className="w-px h-12 bg-gradient-to-b from-border to-transparent mb-4" />
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground/60 max-w-xl mx-auto">
              These layers don't operate in isolation. Together, they form your revenue signal engine.
            </div>
            <div className="w-px h-12 bg-gradient-to-t from-border to-transparent mt-4" />
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="text-center relative z-10">
            <p className="text-base md:text-lg font-medium text-foreground/90">
              We don't create data. We turn fragmented signals into a system your revenue can run on.
            </p>
          </div>
        </FadeIn>
      </section>

      <div className="container-x"><div className="divider-glow" /></div>
      {/* THE PROBLEM */}
      <section className="container-x py-16 sm:py-20 md:py-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(800px,130vw)] h-[520px] sm:h-[800px] bg-[var(--accent-blue)]/5 blur-[120px] rounded-full pointer-events-none" />
        <FadeIn>
          <div className="max-w-4xl">
            <div className="label-eyebrow mb-4">THE REALITY</div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold">
              Your GTM stack has <span className="text-gradient block mt-1">12 tools and zero intelligence.</span>
            </h2>
            <div className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed space-y-4">
              <p>
                Most B2B revenue teams are running on a collection of disconnected point solutions — a tool for prospecting, a tool for email, a tool for attribution, a tool for content. None of them talk to each other. None of them learn.
              </p>
              <p>
                The result? Pipeline that stalls. Campaigns that can't be attributed. Customers who churn silently. And a team spending more time managing tools than driving revenue.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="mt-12 md:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch lg:items-center">
          <FadeIn delay={0.05}>
            <div className="premium-card p-6 md:p-8 h-full bg-card/50 border-border/50">
              <div className="text-xs font-bold tracking-widest text-muted-foreground mb-6">BEFORE MAGNIVO</div>
              <ul className="space-y-4">
                {[
                  "Manual outreach with no intelligence layer",
                  "Marketing and sales running blind",
                  "6 vendors, 6 contracts, 6 dashboards",
                  "Invisible to AI search engines",
                  "Churn you don't see coming"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <X size={16} className="text-red-500/80 shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="premium-card p-6 sm:p-8 md:p-10 h-full border-[var(--accent-green)]/30 shadow-[0_0_40px_-10px_color-mix(in_oklab,var(--accent-green)_20%,transparent)] relative z-10 scale-100 lg:scale-105 bg-card">
              <div className="text-xs font-bold tracking-widest text-[var(--accent-green)] mb-6">WITH MAGNIVO</div>
              <ul className="space-y-5">
                {[
                  "One AI system across every growth function",
                  "Intelligence that compounds with every interaction",
                  "Platform + execution + strategy unified",
                  "Visible on Google AND on AI engines",
                  "Retention signals before churn happens"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-foreground font-medium">
                    <Check size={20} className="text-[var(--accent-green)] shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="premium-card p-6 md:p-8 h-full bg-card/50 border-border/50">
              <div className="text-xs font-bold tracking-widest text-[var(--accent-blue)] mb-6">WHAT YOU GET</div>
              <ul className="space-y-4">
                {[
                  "Predictable pipeline",
                  "Full revenue attribution",
                  "AI that works while your team sleeps",
                  "Answers when buyers ask AI for recommendations",
                  "Revenue that grows systematically"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <ArrowRight size={16} className="text-[var(--accent-blue)] shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="container-x"><div className="divider-glow" /></div>

      {/* WHAT MAGNIVO IS */}
      <section className="container-x py-20 md:py-32">
        <FadeIn>
          <div className="max-w-3xl">
            <div className="label-eyebrow mb-4">THE AI GROWTH STACK</div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              One system. <span className="text-gradient block mt-1">Three compounding layers.</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              Most companies pick a tool OR hire an agency OR bring in consultants. Magnivo clients get all three — unified, integrated, and compounding.
            </p>
          </div>
        </FadeIn>

        <div className="mt-16 md:mt-24 space-y-8 md:space-y-12">
          {/* Card 1 */}
          <FadeIn delay={0.05}>
            <div className="premium-card overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border/50">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-black text-muted-foreground/30">01</span>
                    <span className="px-3 py-1 rounded-full border border-[var(--accent-blue)]/30 bg-[var(--accent-blue)]/10 text-xs font-bold tracking-wider text-[var(--accent-blue)]">PLATFORM</span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">Growth Intelligence</h3>
                  <div className="mt-2 text-lg font-medium text-[var(--accent-blue)]">See everything. Know what to do next.</div>
                  <p className="mt-6 text-muted-foreground leading-relaxed">
                    The Magnivo platform unifies your entire revenue signal layer — account intelligence, pipeline visibility, buying signals, attribution, and AI-powered recommendations — into one GTM OS that runs continuously and gets smarter every week.
                  </p>
                  <div className="mt-8">
                    <Link to="/platform" className="btn-ghost">Explore Platform <ArrowRight size={14} /></Link>
                  </div>
                </div>
                <div className="p-8 md:p-12 bg-card/30 flex flex-col justify-center">
                  <ul className="space-y-5">
                    {[
                      "Live pipeline intelligence",
                      "Account-level buying signals",
                      "Full revenue attribution",
                      "AI-powered next best action",
                      "AEO + GEO visibility tracking"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/90 font-medium">
                        <ArrowRight size={18} className="text-[var(--accent-blue)] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Card 2 */}
          <FadeIn delay={0.1}>
            <div className="premium-card overflow-hidden border-[var(--accent-green)]/20 shadow-[0_0_30px_-10px_color-mix(in_oklab,var(--accent-green)_10%,transparent)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border/50">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-black text-muted-foreground/30">02</span>
                    <span className="px-3 py-1 rounded-full border border-[var(--accent-green)]/30 bg-[var(--accent-green)]/10 text-xs font-bold tracking-wider text-[var(--accent-green)]">SERVICE</span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">Autonomous Execution</h3>
                  <div className="mt-2 text-lg font-medium text-[var(--accent-green)]">AI that runs your growth motion. 24/7.</div>
                  <p className="mt-6 text-muted-foreground leading-relaxed">
                    We deploy and orchestrate AI agents across your entire revenue motion — finding the right accounts, engaging them across every channel, converting them through intelligent sequences, and retaining them through lifecycle systems. Fully managed. Always running.
                  </p>

                </div>
                <div className="p-8 md:p-12 bg-card/30 flex flex-col justify-center">
                  <ul className="space-y-5">
                    {[
                      "AI-orchestrated outbound (email + LinkedIn)",
                      "ABM campaign execution",
                      "SEO, AEO + GEO optimisation",
                      "Performance marketing management",
                      "Retention + lifecycle automation"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/90 font-medium">
                        <ArrowRight size={18} className="text-[var(--accent-green)] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Card 3 */}
          <FadeIn delay={0.15}>
            <div className="premium-card overflow-hidden border-[oklch(0.72_0.18_300)]/20 shadow-[0_0_30px_-10px_color-mix(in_oklab,oklch(0.72_0.18_300)_10%,transparent)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border/50">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-black text-muted-foreground/30">03</span>
                    <span className="px-3 py-1 rounded-full border border-[oklch(0.72_0.18_300)]/30 bg-[oklch(0.72_0.18_300)]/10 text-xs font-bold tracking-wider text-[oklch(0.72_0.18_300)]">CONSULTING</span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">Strategic AI Advisory</h3>
                  <div className="mt-2 text-lg font-medium text-[oklch(0.72_0.18_300)]">The thinking behind the system.</div>
                  <p className="mt-6 text-muted-foreground leading-relaxed">
                    Like McKinsey — but built for AI-era revenue growth. We embed with your leadership team to architect your GTM strategy, build your AI roadmap, identify the growth gaps your current stack can't see, and ensure every major revenue decision is backed by intelligence — not instinct.
                  </p>

                </div>
                <div className="p-8 md:p-12 bg-card/30 flex flex-col justify-center">
                  <ul className="space-y-5">
                    {[
                      "GTM architecture design",
                      "AI growth roadmap",
                      "Revenue gap analysis",
                      "ICP and positioning strategy",
                      "Board and investor-ready growth narratives"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/90 font-medium">
                        <ArrowRight size={18} className="text-[oklch(0.72_0.18_300)] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
           <div className="mt-20 text-center max-w-3xl mx-auto">
             <div className="text-2xl md:text-3xl font-bold text-foreground mb-3">The compounding effect kicks in</div>
             <div className="text-lg md:text-xl text-muted-foreground leading-relaxed">when all three layers run together. That's when revenue stops being linear and starts being exponential.</div>
           </div>
        </FadeIn>
      </section>

      {/* THE NEW GROWTH REALITY */}
      <section className="bg-[#051114] border-y border-[var(--accent-green)]/20 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent-green)_15%,transparent)_0%,transparent_70%)] opacity-50" />
        <div className="container-x relative">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <div className="label-eyebrow mb-6 text-[var(--accent-green)]">THE NEW GROWTH REALITY</div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
                The rules of B2B growth <span className="text-[var(--accent-green)] block mt-2">just changed. Again.</span>
              </h2>
              <div className="mt-8 text-lg md:text-xl text-white/70 leading-relaxed space-y-6 max-w-3xl mx-auto">
                <p>
                  Your buyers research on AI engines before they ever visit your website. Your competitors are deploying autonomous agents while you're still managing sequences manually. And the companies winning in 2026 aren't the ones with the biggest teams — they're the ones with the most intelligent systems.
                </p>
                <p>
                  The question isn't whether AI will transform your GTM. It already has. The question is whether your business is built to compound that advantage — or fall behind it.
                </p>
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-y border-[var(--accent-green)]/20 py-10">
                <div className="md:px-6">
                  <div className="text-5xl font-black text-white mb-3">70%+</div>
                  <div className="text-sm text-[var(--accent-green)]/80 font-medium leading-relaxed">of B2B buyers research on AI engines before contacting a vendor</div>
                  <div className="text-xs text-white/40 mt-3 font-medium">Based on Gartner 2024 B2B buyer research</div>
                </div>
                <div className="md:px-6 md:border-l border-[var(--accent-green)]/20">
                  <div className="text-5xl font-black text-white mb-3">3x</div>
                  <div className="text-sm text-[var(--accent-green)]/80 font-medium leading-relaxed">more pipeline for companies running autonomous GTM vs manual outreach</div>
                  <div className="text-xs text-white/40 mt-3 font-medium">Based on Forrester autonomous GTM benchmark study</div>
                </div>
                <div className="md:px-6 md:border-l border-[var(--accent-green)]/20">
                  <div className="text-5xl font-black text-white mb-3">60%</div>
                  <div className="text-sm text-[var(--accent-green)]/80 font-medium leading-relaxed">lower CAC for businesses using unified AI growth systems vs point solutions</div>
                  <div className="text-xs text-white/40 mt-3 font-medium">Based on McKinsey unified MarTech stack analysis</div>
                </div>
              </div>


            </div>
          </FadeIn>
        </div>
      </section>

      {/* UNIFIED HOW IT WORKS SECTION */}
      <section id="how-it-works" className="container-x py-20 md:py-32">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="label-eyebrow mb-4 tracking-[0.2em]">HOW IT WORKS</div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              From first signal <span className="text-[var(--accent-green)] block mt-1">to loyal customer.</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Every stage of your revenue motion — covered, connected, and compounding. Here's exactly what runs inside Magnivo.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-5xl mx-auto flex flex-col items-center">
          {[
            {
              stageNum: "01",
              stage: "ACQUIRE",
              color: "#2DD4BF",
              icon: Target,
              title: "Find & Engage the Right Accounts",
              body: "Before your competitors even know they exist. Magnivo identifies high-intent accounts, builds your pipeline, and launches coordinated outreach across every channel.",
              cols: [
                ["ICP Analysis & TAM Mapping", "Account-Based Marketing", "Buying Signal Detection"],
                ["Multi-channel Outbound", "AI Content Generation", "Demand Generation"],
                ["SEO, AEO + GEO", "Performance Marketing", "Social Listening"]
              ]
            },
            {
              stageNum: "02",
              stage: "ENGAGE",
              color: "#4ADE80",
              icon: MessageSquare,
              title: "Turn Attention Into Conversations",
              body: "Every reply handled. Every signal acted on. Magnivo manages the full engagement layer — personalised, omnichannel, and always on.",
              cols: [
                ["Personalised Sequences", "Smart Follow-ups", "Objection Handling"],
                ["Omnichannel Orchestration", "Social Selling Automation", "Intent Signal Response"],
                ["Inbox Management", "Reply Classification", "Meeting Booking"]
              ]
            },
            {
              stageNum: "03",
              stage: "CONVERT",
              color: "#A78BFA",
              icon: TrendingUp,
              title: "Close Deals Predictably",
              body: "No deal goes cold. No proposal sits unanswered. Magnivo manages the full conversion layer — from qualified opportunity to signed contract.",
              cols: [
                ["AI Deal Scoring", "Automated Proposals", "Contract Intelligence"],
                ["Pipeline Management", "Meeting Qualification", "Executive Engagement"],
                ["Revenue Forecasting", "Proposal Follow-up", "CRM Sync"]
              ]
            },
            {
              stageNum: "04",
              stage: "RETAIN & COMPOUND",
              color: "#F59E0B",
              icon: RefreshCw,
              title: "Grow Revenue From Every Customer",
              body: "The system learns from every interaction — win, loss, signal, response. Results compound. CAC drops. Revenue grows systematically.",
              cols: [
                ["Health Score Monitoring", "Churn Prevention", "Lifecycle Automation"],
                ["Expansion Opportunities", "Referral & Viral Systems", "Champion Tracking"],
                ["Revenue Attribution", "Win/Loss Intelligence", "GTM Strategy Refinement"]
              ]
            }
          ].map((stage, i) => {
            const Icon = stage.icon;
            const isLast = i === 3;
            return (
              <div key={i} className="w-full flex flex-col items-center">
                <FadeIn delay={i * 0.1} className="w-full">
                  <div
                    className="w-full rounded-2xl overflow-hidden transition-all duration-300 group"
                    style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.08)` }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 0 1px ${stage.color}, 0 0 24px -6px ${stage.color}`}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 0 1px rgba(255,255,255,0.08)`}
                  >
                    <div
                    className="w-full bg-white/5 p-5 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8"
                      style={{ borderLeft: `4px solid ${stage.color}` }}
                    >
                    {/* Left Side */}
                    <div className="w-full md:w-[40%] flex flex-col items-start">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl font-black text-white/20">{stage.stageNum}</span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/5 border border-white/10 text-white/80">
                          {stage.stage}
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 bg-white/5" style={{ color: stage.color }}>
                        <Icon size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{stage.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {stage.body}
                      </p>
                    </div>

                    {/* Right Side - Capabilities */}
                    <div className="w-full md:w-[60%] grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-8">
                      {stage.cols.map((col, colIdx) => (
                        <ul key={colIdx} className="space-y-4">
                          {col.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: stage.color }} />
                              <span className="text-sm text-white/70 leading-tight">{item}</span>
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                    </div>
                  </div>
                </FadeIn>

                {/* Connector */}
                {!isLast && (
                  <div className="hidden md:flex flex-col items-center justify-center h-12 w-full my-2">
                    <div className="w-[2px] h-full bg-white/20 relative">
                      <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 text-white/40">
                         <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* TIMELINE STRIP */}
        <FadeIn delay={0.4}>
          <div className="max-w-5xl mx-auto mt-16 border-t border-white/10 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="text-white text-sm">
                <span className="font-bold mr-2">Day 1:</span>
                <span className="text-white/70">Onboarding + ICP</span>
              </div>
              <div className="text-white text-sm md:border-l border-white/10">
                <span className="font-bold mr-2">Week 2:</span>
                <span className="text-white/70">System live</span>
              </div>
              <div className="text-white text-sm border-t md:border-t-0 pt-4 md:pt-0 md:border-l border-white/10">
                <span className="font-bold mr-2">Week 3:</span>
                <span className="text-white/70">First results</span>
              </div>
              <div className="text-sm border-t md:border-t-0 pt-4 md:pt-0 md:border-l border-white/10">
                <span className="font-semibold text-[#2DD4BF] mr-2">Month 3:</span>
                <span className="text-[#2DD4BF] font-semibold">Full compounding</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* BOTTOM STATEMENT */}
        <FadeIn delay={0.5}>
          <div className="mt-20 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-2">Platform. Service. Strategy.</h3>
            <p className="text-base text-white/60 mb-8">
              Three layers running together. That's when revenue stops being linear and starts being exponential.
            </p>
            <a href="https://cal.com/magnivo" target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center justify-center bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue)]/90 h-14 px-8 text-lg border-transparent shadow-[0_0_30px_-5px_color-mix(in_oklab,var(--accent-blue)_50%,transparent)]">
              Book a Strategy Call <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </FadeIn>
      </section>

      <div className="container-x"><div className="divider-glow" /></div>

      {/* WHO IT'S FOR */}
      <section className="container-x py-20 md:py-32">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="label-eyebrow mb-4">WHO IT'S FOR</div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white">
              Built for the teams <span className="text-[#2DD4BF] block mt-1">driving modern B2B revenue.</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We work with B2B companies at $500K–$5M ARR who have a product that works, a market that exists, and a GTM motion that isn't keeping up.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Rocket,
              title: "B2B SaaS Founders",
              role: "Founder / CEO",
              body: "Post-PMF. You have product-market fit but your GTM is still manual, inconsistent, and dependent on one or two people.",
              outcome: "Replace your manual GTM with a system that scales without headcount"
            },
            {
              icon: Briefcase,
              title: "Professional Services",
              role: "Managing Partner / Founder",
              body: "You sell expertise but pipeline depends on referrals and relationships. Outbound is inconsistent. Inbound is zero.",
              outcome: "Build a predictable pipeline engine so you can focus on delivery"
            },
            {
              icon: Store,
              title: "B2B Marketplaces",
              role: "CEO / Head of Growth",
              body: "Two-sided markets need coordinated GTM across buyers and sellers simultaneously. Standard tools weren't built for this.",
              outcome: "Orchestrate multi-sided GTM with one intelligent system"
            },
            {
              icon: BarChart2,
              title: "RevOps Teams",
              role: "VP RevOps / Head of RevOps",
              body: "You have the sales motion and the data. What's missing is the intelligence layer that connects them and acts on signals automatically.",
              outcome: "Add the AI intelligence layer on top of your existing sales motion"
            },
            {
              icon: Zap,
              title: "Funded Startups",
              role: "Founder / CEO / CRO",
              body: "Pre-Series B. You just raised and need to show pipeline growth fast. Hiring a VP Sales takes 6 months. Building the system takes 10 days.",
              outcome: "Install the revenue system before you make the first sales hire"
            },
            {
              icon: Target,
              title: "Enterprise Sales Teams",
              role: "VP Sales / Head of Sales",
              body: "You have quota, territory, and a team. What you don't have is an intelligent system finding, prioritising, and engaging the right accounts before your reps touch them.",
              outcome: "Give your sales team an AI system that fills the top of funnel at scale"
            }
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="group h-full bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/8 transition-all duration-300 rounded-xl p-6 flex flex-col">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 text-[#2DD4BF]/80 bg-[#2DD4BF]/10">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-white/10 text-white/60 text-xs mb-4 w-fit">
                    {card.role}
                  </span>
                  <p className="text-sm text-white/70 leading-relaxed flex-1 mb-5">{card.body}</p>
                  <div className="text-sm text-[#2DD4BF] font-medium leading-snug">
                    → {card.outcome}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* NOT A FIT qualifier */}
        <FadeIn delay={0.3}>
          <div className="mt-12 max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-xl py-6 px-5 sm:px-8 text-center">
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-3">NOT A FIT IF...</div>
            <p className="text-sm text-white/70 leading-relaxed">
              You're pre-revenue, don't have a defined product, or are looking for a one-time campaign. Magnivo is a system — it's built for companies ready to compound growth, not just run a campaign.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* TRUST */}
      <section className="container-x py-20 md:py-32">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="label-eyebrow mb-4">WHY MAGNIVO</div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold">
              Built different.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              In a market full of point solutions and disconnected agencies — Magnivo is built as a system from the ground up.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Systems thinking. Not tool thinking.",
              desc: "Every engagement is architected as a unified system — platform, execution, and strategy working together. Not another disconnected vendor."
            },
            {
              title: "Intelligence that compounds.",
              desc: "Unlike agencies that reset every quarter, Magnivo's system learns from every signal, interaction, and outcome — getting sharper the longer it runs."
            },
            {
              title: "Outcome-obsessed. Not activity-obsessed.",
              desc: "We don't report on emails sent or impressions served. We report on pipeline created, revenue influenced, and CAC reduced."
            }
          ].map((point, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="premium-card p-8 md:p-10 h-full border-t-[3px] border-t-transparent hover:border-t-[var(--accent-blue)] transition-all flex flex-col justify-center text-center">
                <h3 className="text-xl font-bold text-foreground mb-4">{point.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{point.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-20 md:py-32 max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="label-eyebrow mb-4">FAQ</div>
            <h2 className="text-3xl sm:text-5xl font-bold">
              Common questions, answered.
            </h2>
          </div>
        </FadeIn>
        <FAQ items={faqs} />
      </section>

      {/* BOTTOM CTA */}
      <section className="relative overflow-hidden min-h-[70svh] sm:min-h-[80vh] flex items-center py-16 sm:py-20">
        <div className="aurora" aria-hidden />
        <div className="absolute inset-0 mesh-hero opacity-80" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />

        <div className="container-x relative z-10 text-center w-full">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-bold leading-[1.06]">
              Stop running GTM. <span className="text-gradient block mt-2">Start compounding it.</span>
            </h2>
            <p className="mt-6 sm:mt-8 text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              One conversation. We map your current revenue system, identify the gaps, and show you exactly what Magnivo would build — before you commit to anything.
            </p>
            <div className="mt-10 sm:mt-12 flex justify-center flex-wrap gap-3 sm:gap-4">
              <button onClick={() => setDemoOpen(true)} className="btn-primary w-full sm:w-auto justify-center min-h-12 sm:h-14 px-5 sm:px-8 text-base sm:text-lg">
                Book a Strategy Call <ArrowRight size={16} />
              </button>
              <Link to="/platform" className="btn-ghost w-full sm:w-auto justify-center min-h-12 sm:h-14 px-5 sm:px-8 text-base sm:text-lg">
                Explore the Platform
              </Link>
            </div>
            <p className="mt-8 text-sm font-medium tracking-widest uppercase text-muted-foreground/60">
              No pitch. No pressure. Just clarity.
            </p>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  );
}

const faqs = [
  {
    q: "How is Magnivo different from 6sense, Demandbase, or Terminus?",
    a: "Those platforms give you data and signals. Magnivo gives you data, signals, AND the execution layer that acts on them — plus the strategic consulting to make sure you're acting on the right things. It's the difference between intelligence and outcomes.",
  },
  {
    q: "Is this a platform or a service?",
    a: "Both — and that's the point. The platform gives your team live intelligence and visibility. The service layer executes your growth motion using AI agents. The consulting layer ensures the strategy behind it is right. Most clients use all three.",
  },
  {
    q: "What does onboarding look like?",
    a: "We complete onboarding within 10 business days. Day 1 we define your ICP and audit your current GTM. Week 2 your system goes live. Week 3 you see first results.",
  },
  {
    q: "What is AEO and why does it matter now?",
    a: "Answer Engine Optimization ensures your brand appears when buyers ask ChatGPT, Perplexity, or Gemini for recommendations in your category. It's the channel your competitors haven't figured out yet — and where your next customer is already looking.",
  },
  {
    q: "Where does your team operate?",
    a: "Magnivo is a globally distributed team operating async-first with structured weekly touchpoints. Your engagement never depends on a single timezone or a single person.",
  },
  {
    q: "What size companies do you work with?",
    a: "We work best with B2B companies between $500K and $5M ARR — post-PMF, with a defined ICP, ready to build a repeatable revenue system.",
  },
];

function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-4">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className="premium-card overflow-hidden bg-card/40 border-border/50">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 sm:gap-6 p-5 sm:p-6 md:p-8 text-left hover:bg-card/40 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="text-lg font-bold text-foreground">{it.q}</span>
              <span className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-muted-foreground shrink-0 bg-background/50">
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-6 md:px-8 pb-6 md:pb-8 text-base text-muted-foreground leading-relaxed">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
