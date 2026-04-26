import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  ClipboardCheck,
  Handshake,
  LineChart,
  ScanSearch,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { FadeIn } from "./FadeIn";

export function TrustSnapshot({ onAudit }: { onAudit: () => void }) {
  const proof = [
    { value: "10 days", label: "to launch the first GTM system", icon: Clock3 },
    { value: "52 agents", label: "across prospecting, content, CRM, and ops", icon: Zap },
    { value: "Human-led", label: "strategy, QA, and weekly optimization", icon: Handshake },
    { value: "No lock-in", label: "start with a focused 90-day operating sprint", icon: ShieldCheck },
  ];

  return (
    <section className="container-x relative -mt-4 sm:-mt-8 z-10">
      <div className="premium-card overflow-hidden border-border/60 bg-card/80 shadow-[0_24px_80px_-44px_color-mix(in_oklab,var(--accent-blue)_50%,transparent)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr]">
          <div className="border-b lg:border-b-0 lg:border-r border-border/60 p-5 sm:p-7">
            <div className="label-eyebrow text-[var(--accent-green)]">Trust starts with clarity</div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-foreground">
              Know what we would build before you commit.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              The free audit gives you a practical GTM diagnosis, not a generic sales call. We map your current pipeline motion, identify gaps, and show the highest-leverage system to install first.
            </p>
            <button onClick={onAudit} className="btn-primary mt-6 w-full sm:w-auto justify-center">
              Get Free GTM Audit <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {proof.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.value} className="border-b sm:border-r border-border/50 p-5 sm:p-6 last:border-b-0 even:sm:border-r-0">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background/60 text-[var(--accent-blue)]">
                    <Icon size={19} />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{item.value}</div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AuditBlueprint({ onAudit }: { onAudit: () => void }) {
  const steps = [
    {
      title: "Audit your current GTM motion",
      body: "We review ICP, website conversion paths, CRM hygiene, outbound motion, content footprint, and existing tools.",
      icon: ClipboardCheck,
    },
    {
      title: "Find the revenue leaks",
      body: "You get a clear view of where pipeline is being lost: anonymous demand, slow follow-up, weak routing, poor attribution, or low-intent lists.",
      icon: ScanSearch,
    },
    {
      title: "Design the first operating sprint",
      body: "We recommend the smallest system that can create measurable lift in 10 days, with owners, workflows, and reporting included.",
      icon: LineChart,
    },
  ];

  return (
    <section id="ten-day-plan" className="container-x py-12 sm:py-16 md:py-20">
      <FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="label-eyebrow text-[var(--accent-blue)]">The 10-day plan</div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold leading-tight">
              From scattered GTM to one operating system.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Visitors convert when they trust the process. So we make the first step concrete, low-risk, and easy to understand.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button onClick={onAudit} className="btn-primary justify-center">
                Book Free Audit <ArrowRight size={14} />
              </button>
              <Link to="/pricing" className="btn-ghost justify-center">
                View Engagements
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <FadeIn key={step.title} delay={index * 0.06}>
                  <div className="surface-card p-4 sm:p-5 flex gap-4 hover-blue">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background/70 text-[var(--accent-green)]">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-[0.16em] uppercase text-muted-foreground">
                        Step 0{index + 1}
                      </div>
                      <h3 className="mt-2 text-lg sm:text-xl font-bold text-foreground">{step.title}</h3>
                      <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}

            <FadeIn delay={0.22}>
              <div className="rounded-xl border border-[var(--accent-green)]/30 bg-[var(--accent-green)]/10 p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-green)] text-background">
                    <BadgeCheck size={21} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">What you leave with</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      A GTM gap map, priority use cases, first sprint recommendation, and a clear next-step proposal if there is a fit.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
