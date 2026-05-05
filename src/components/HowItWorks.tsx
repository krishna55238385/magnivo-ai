import { Plug, Cpu, BarChart3 } from "lucide-react";
import { FadeIn } from "./FadeIn";

const steps = [
  {
    n: 1,
    title: "Connect Your Stack & Define Your ICP",
    desc: "We audit your current GTM, map your ideal customer, and identify the exact gaps costing you pipeline.",
    icon: Plug,
  },
  {
    n: 2,
    title: "52 AI Agents Activate",
    desc: "Your full-stack growth engine goes live — outbound, content, SEO, AEO, PLG, retention — all orchestrated, all automated, all monitored.",
    icon: Cpu,
  },
  {
    n: 3,
    title: "Pipeline Grows. You Focus on Closing.",
    desc: "You get weekly reports, a live dashboard, and a growth partner who treats your revenue like their own.",
    icon: BarChart3,
  },
];

export function HowItWorks() {
  return (
    <section className="container-x py-20 md:py-28">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <div className="label-eyebrow">How It Works</div>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Live in <span className="text-gradient">three simple steps</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg">
            From connection to compounding revenue — orchestrated by AI agents that work while you
            sleep.
          </p>
        </div>
      </FadeIn>

      <div className="mt-14 md:mt-20 relative">
        {/* Connector line — desktop horizontal */}
        <div
          className="hidden md:block absolute top-9 left-[12%] right-[12%] step-line"
          aria-hidden
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={s.n} delay={i * 0.1} className="text-center">
                <div className="relative inline-flex">
                  {/* Connector line — mobile vertical (between cards) */}
                  {i > 0 && (
                    <div
                      className="md:hidden absolute -top-10 left-1/2 -translate-x-1/2 w-px h-10 step-line"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent, color-mix(in oklab, var(--accent-blue) 50%, transparent), color-mix(in oklab, var(--accent-green) 40%, transparent), transparent)",
                      }}
                      aria-hidden
                    />
                  )}
                  <div className="ring-conic">
                    <div className="rounded-[11px] bg-card h-[72px] w-[72px] flex items-center justify-center text-[var(--accent-blue)]">
                      <Icon size={28} />
                    </div>
                  </div>
                  <span className="absolute -top-2 -right-2 h-6 min-w-6 px-1.5 rounded-full bg-[var(--accent-blue)] text-white text-[11px] font-bold flex items-center justify-center pulse-soft">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-6 text-xl md:text-2xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  {s.desc}
                </p>
              </FadeIn>
            );
          })}
        </div>
      </div>

      <FadeIn delay={0.3}>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent-blue)]/30 bg-[var(--accent-blue)]/10 text-sm font-medium text-[var(--accent-blue)]">
            From onboarding to first results: 10 business days.
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
