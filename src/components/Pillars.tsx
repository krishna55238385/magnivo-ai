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
    desc: "Bring the right buyers in",
    bullets: [
      "ABM (Account-Based Marketing)",
      "Outbound: Email, LinkedIn, Cold Calling (AI)",
      "SEO — organic search authority",
      "AEO — Answer Engine Optimization",
      "GEO — Generative Engine Optimization",
      "Performance Marketing (paid ads)",
      "Demand Generation",
    ],
    icon: Target,
    color: "var(--accent-blue)",
  },
  {
    name: "Engage",
    desc: "Turn attention into conversations",
    bullets: [
      "Personalised Outreach Sequences",
      "Omnichannel Orchestration",
      "Social Listening & Intent Signals",
      "Inbound Content & Thought Leadership",
    ],
    icon: MessageSquare,
    color: "var(--accent-green)",
  },
  {
    name: "Convert",
    desc: "Close deals predictably",
    bullets: [
      "PLG (Product-Led Growth) conversion flows",
      "Meeting booking & deal qualification",
      "Proposal generation & contract automation",
      "Sales Intelligence & pipeline management",
    ],
    icon: TrendingUp,
    color: "var(--brand-charcoal)",
  },
  {
    name: "Retain & Expand",
    desc: "Grow revenue from existing customers",
    bullets: [
      "Lifecycle & Onboarding Sequences",
      "Retention Marketing & Health Scoring",
      "Upsell + Expansion Campaigns",
      "Referral & Viral Growth Loops",
      "Champion Tracking",
    ],
    icon: RefreshCw,
    color: "var(--accent-gold)",
  },
];

export function Pillars() {
  return (
    <section className="container-x py-20 md:py-28">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <div className="label-eyebrow">THE FULL-STACK GROWTH ENGINE</div>
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
