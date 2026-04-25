import { Target, MessageSquare, TrendingUp, RefreshCw, Check } from "lucide-react";
import { FadeIn } from "./FadeIn";

type Pillar = {
  name: string;
  desc: string;
  bullets: string[];
  icon: typeof Target;
  color: string; // CSS color expression
};

const pillars: Pillar[] = [
  {
    name: "Acquire",
    desc: "Market Intelligence, Outbound Campaigns & Content Engine.",
    bullets: ["ICP Analysis & TAM Mapping", "Multi-channel Outbound", "AI Content Generation"],
    icon: Target,
    color: "var(--accent-blue)",
  },
  {
    name: "Engage",
    desc: "Multi-channel Engagement & Personalized Outreach.",
    bullets: ["Personalized Sequences", "Social Selling Automation", "Smart Follow-ups"],
    icon: MessageSquare,
    color: "var(--accent-green)",
  },
  {
    name: "Convert",
    desc: "Pipeline Management, Deal Qualification & Proposals.",
    bullets: ["AI Deal Scoring", "Automated Proposals", "Contract Intelligence"],
    icon: TrendingUp,
    color: "oklch(0.72 0.18 300)", // violet
  },
  {
    name: "Retain & Expand",
    desc: "Customer Success, Nurture Queues & Expansion.",
    bullets: ["Health Score Monitoring", "Expansion Opportunities", "Churn Prevention"],
    icon: RefreshCw,
    color: "oklch(0.78 0.16 70)", // amber
  },
];

export function Pillars() {
  return (
    <section className="container-x py-20 md:py-28">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <div className="label-eyebrow">Four Pillars</div>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Four Pillars of <span className="text-gradient">GTM Excellence</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg">
            A complete operating system covering every stage of your go-to-market motion.
          </p>
        </div>
      </FadeIn>

      <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <FadeIn key={p.name} delay={i * 0.06}>
              <div className="premium-card p-6 md:p-7 h-full group transition-transform duration-300 hover:-translate-y-1">
                <div
                  className="h-11 w-11 rounded-lg flex items-center justify-center"
                  style={{
                    background: `color-mix(in oklab, ${p.color} 14%, transparent)`,
                    border: `1px solid color-mix(in oklab, ${p.color} 40%, transparent)`,
                    color: p.color,
                  }}
                >
                  <Icon size={20} />
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                <ul className="mt-5 space-y-2.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <span
                        className="h-4 w-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          background: `color-mix(in oklab, ${p.color} 18%, transparent)`,
                          color: p.color,
                        }}
                      >
                        <Check size={10} strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
