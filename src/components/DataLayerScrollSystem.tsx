import { useState } from "react";
import { Database, ScanSearch, Network, Radar } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

const LAYERS = [
  {
    num: "01",
    id: "ground-truth",
    label: "Ground Truth",
    icon: Database,
    color: "#06402b",
    title: "Your Ground Truth Layer",
    subtitle: "The only data source your business actually owns.",
    body: "Before intelligence. Before automation. We unify the raw signals your business is already generating — but not using. CRM, website, product — all in one place.",
    bullets: [
      "Website behavior — visits, pages, conversions",
      "CRM data — leads, pipeline, revenue",
      "Product usage and engagement signals",
    ],
  },
  {
    num: "02",
    id: "hidden-demand",
    label: "Hidden Demand",
    icon: ScanSearch,
    color: "#c5a059",
    title: "Your Hidden Demand Layer",
    subtitle: "Most of your buyers never fill a form.",
    body: "We identify them anyway — before your competitors do. Anonymous web traffic gets resolved into named accounts with full buying context and intent scoring.",
    bullets: [
      "Identify companies visiting your website",
      "Map anonymous traffic to named accounts",
      "Reveal hidden pipeline before it goes cold",
    ],
  },
  {
    num: "03",
    id: "engagement",
    label: "Engagement",
    icon: Network,
    color: "#002819",
    title: "Your Engagement Layer",
    subtitle: "Every campaign, click, and interaction is a signal.",
    body: "We unify them into one system so you stop guessing which activity drives pipeline and start knowing — across every channel, in real time.",
    bullets: [
      "Paid ads — LinkedIn, Google, Meta",
      "Email and outbound engagement data",
      "Content, event, and campaign interactions",
    ],
  },
  {
    num: "04",
    id: "in-market",
    label: "In-Market Signals",
    icon: Radar,
    color: "#775a19",
    title: "Your In-Market Signal Layer",
    subtitle: "Not all activity matters.",
    body: "We isolate real buying intent from noise — identifying which accounts are actively researching, comparing, and ready to buy right now, before they reach out.",
    bullets: [
      "High-value page visits — pricing, product, demo",
      "Repeat engagement and research patterns",
      "Competitor comparison behavior",
    ],
  },
];

function GroundTruthViz() {
  const rows = [
    {
      source: "HubSpot CRM",
      type: "Pipeline",
      records: "2,847",
      status: "synced",
      dot: "bg-[var(--brand-emerald)]",
    },
    {
      source: "Website Analytics",
      type: "Visits",
      records: "18,492",
      status: "live",
      dot: "bg-[var(--accent-gold)]",
    },
    {
      source: "Product Database",
      type: "Usage",
      records: "4,219",
      status: "synced",
      dot: "bg-[var(--brand-charcoal)]",
    },
    {
      source: "Outbound Sequences",
      type: "Emails",
      records: "891",
      status: "live",
      dot: "bg-[var(--accent-gold-soft)]",
    },
  ];
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest mb-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-emerald)] animate-pulse" />
        UNIFIED DATA LAYER — LIVE
      </div>
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex items-center gap-3 bg-secondary/30 border border-border/50 rounded-lg px-4 py-3 hover:bg-secondary/50 transition-colors"
        >
          <span className={`w-2 h-2 rounded-full shrink-0 ${row.dot}`} />
          <span className="text-sm text-foreground font-semibold flex-1">{row.source}</span>
          <span className="text-[11px] text-muted-foreground/60 font-mono">{row.records}</span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${row.status === "live" ? "text-[var(--brand-emerald)] bg-[var(--brand-emerald)]/5 border-[var(--brand-emerald)]/20" : "text-[var(--accent-gold)] bg-[var(--accent-gold)]/10 border-[var(--accent-gold)]/25"}`}
          >
            {row.status}
          </span>
        </div>
      ))}
      <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Last sync: <span className="text-foreground/70 font-medium">2 min ago</span>
        </span>
        <span className="text-[var(--accent-blue)] font-bold">26,449 records unified</span>
      </div>
    </div>
  );
}

function HiddenDemandViz() {
  const accounts = [
    {
      name: "Stripe",
      initials: "ST",
      pages: 14,
      score: 98,
      label: "HOT",
      cls: "text-[var(--destructive)] bg-[var(--destructive)]/5 border-[var(--destructive)]/20",
    },
    {
      name: "Shopify",
      initials: "SH",
      pages: 9,
      score: 84,
      label: "WARM",
      cls: "text-[var(--accent-gold)] bg-[var(--accent-gold)]/10 border-[var(--accent-gold)]/25",
    },
    {
      name: "Notion",
      initials: "NO",
      pages: 6,
      score: 71,
      label: "WARM",
      cls: "text-[var(--accent-gold)] bg-[var(--accent-gold)]/10 border-[var(--accent-gold)]/25",
    },
    {
      name: "Figma",
      initials: "FG",
      pages: 3,
      score: 52,
      label: "COOL",
      cls: "text-[var(--brand-emerald)] bg-[var(--brand-emerald)]/5 border-[var(--brand-emerald)]/20",
    },
  ];
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest mb-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-gold)] animate-pulse" />
        ACCOUNT RESOLUTION — ACTIVE
      </div>
      {accounts.map((acc, i) => (
        <div
          key={i}
          className="flex items-center gap-3 bg-secondary/30 border border-border/50 rounded-lg px-4 py-3 hover:bg-secondary/50 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-[10px] text-foreground/70 font-bold shrink-0">
            {acc.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-foreground font-bold">{acc.name}</div>
            <div className="text-[11px] text-muted-foreground/70">{acc.pages} pages visited</div>
          </div>
          <div className="text-right mr-2">
            <div className="text-lg font-black text-foreground leading-none">{acc.score}</div>
            <div className="text-[9px] text-muted-foreground/40 mt-0.5">score</div>
          </div>
          <span
            className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${acc.cls}`}
          >
            {acc.label}
          </span>
        </div>
      ))}
      <div className="mt-auto pt-4 border-t border-border text-xs text-muted-foreground">
        <span className="text-[var(--brand-emerald)] font-bold">+43 new accounts</span> identified
        this week
      </div>
    </div>
  );
}

function EngagementViz() {
  const channels = [
    { name: "Cold Email", value: 82, color: "bg-[var(--brand-charcoal)]" },
    { name: "Content / SEO", value: 91, color: "bg-[var(--brand-emerald)]" },
    { name: "LinkedIn Ads", value: 68, color: "bg-[var(--accent-gold)]" },
    { name: "Google Ads", value: 45, color: "bg-[var(--accent-gold-soft)]" },
  ];
  const feed = [
    { event: "VP Eng at Acme opened email x3", time: "1m" },
    { event: "3 LinkedIn clicks on Platform post", time: "5m" },
    { event: "Nexus Corp viewed /pricing x4 today", time: "12m" },
  ];
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-charcoal)] animate-pulse" />
        CHANNEL SIGNALS — UNIFIED
      </div>
      <div className="space-y-3">
        {channels.map((ch, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[11px] text-muted-foreground font-medium w-28 shrink-0">
              {ch.name}
            </span>
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${ch.color} transition-all duration-700`}
                style={{ width: `${ch.value}%` }}
              />
            </div>
            <span className="text-xs font-bold text-muted-foreground/70 w-8 text-right">
              {ch.value}%
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-3 space-y-2">
        <div className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest mb-2">
          LIVE SIGNAL FEED
        </div>
        {feed.map((item, i) => (
          <div
            key={i}
            className="flex gap-3 text-[11px] bg-secondary/40 rounded-lg px-3 py-2 border border-border/30"
          >
            <span className="text-muted-foreground/50 shrink-0 w-6">{item.time}</span>
            <span className="text-foreground/70 font-medium">{item.event}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InMarketViz() {
  const signals = [
    {
      company: "Acme Corp",
      action: "Visited /pricing 6×",
      urgency: 98,
      tag: "BUY NOW",
      tagCls: "text-[var(--destructive)] bg-[var(--destructive)]/5 border-[var(--destructive)]/20",
    },
    {
      company: "NovaTech",
      action: "Compared vs competitor",
      urgency: 87,
      tag: "EVALUATE",
      tagCls: "text-[var(--accent-gold)] bg-[var(--accent-gold)]/10 border-[var(--accent-gold)]/25",
    },
    {
      company: "CloudBase",
      action: "Repeat /demo visits",
      urgency: 74,
      tag: "CONSIDER",
      tagCls:
        "text-[var(--brand-emerald)] bg-[var(--brand-emerald)]/5 border-[var(--brand-emerald)]/20",
    },
  ];
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest mb-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-gold)] animate-pulse" />
        INTENT SIGNALS — HIGH CONFIDENCE
      </div>
      {signals.map((s, i) => (
        <div
          key={i}
          className="bg-secondary/30 border border-border/50 rounded-lg p-4 hover:bg-secondary/50 transition-colors shadow-sm"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="text-sm font-bold text-foreground">{s.company}</div>
              <div className="text-[11px] text-muted-foreground/60 mt-0.5 font-medium">
                {s.action}
              </div>
            </div>
            <span
              className={`text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border whitespace-nowrap ${s.tagCls}`}
            >
              {s.tag}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--accent-gold)] transition-all duration-700"
                style={{ width: `${s.urgency}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[var(--accent-gold)] w-8 text-right">
              {s.urgency}
            </span>
          </div>
        </div>
      ))}
      <div className="mt-auto pt-4 border-t border-border text-xs text-muted-foreground">
        <span className="text-[var(--accent-gold)] font-bold">3 accounts</span> in active buying
        window
      </div>
    </div>
  );
}

const VIZ = [<GroundTruthViz />, <HiddenDemandViz />, <EngagementViz />, <InMarketViz />];

export function DataLayerScrollSystem() {
  const [active, setActive] = useState(0);
  const layer = LAYERS[active];
  const Icon = layer.icon;

  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden border-y border-border">
      <div className="absolute inset-0 dot-grid opacity-[0.4] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-72 bg-gradient-to-b from-[var(--accent-blue)]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="container-x">
        {/* Header */}
        <FadeIn>
          <div className="max-w-3xl mb-10">
            <div className="label-eyebrow mb-4">THE DATA LAYER</div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              It starts with your data.
              <span className="text-muted-foreground block">Not dashboards.</span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-xl">
              Before intelligence. Before automation. We unify the raw signals your business is
              already generating — but not using.
            </p>
          </div>
        </FadeIn>

        {/* Tab selector */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-7">
            {LAYERS.map((l, i) => {
              const TabIcon = l.icon;
              const isActive = active === i;
              return (
                <button
                  key={l.id}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "border-border shadow-sm"
                      : "border-border/60 text-muted-foreground/60 bg-secondary/20 hover:border-border hover:text-muted-foreground"
                  }`}
                  style={
                    isActive
                      ? { borderColor: `${l.color}60`, color: l.color, background: `${l.color}08` }
                      : {}
                  }
                >
                  <span className="text-[10px] font-black opacity-30">{l.num}</span>
                  <TabIcon size={13} />
                  <span>{l.label}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Content panel */}
        <FadeIn delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            {/* Left: description */}
            <div
              className="rounded-lg border p-6 sm:p-8 flex flex-col transition-all duration-500 bg-card premium-card"
              style={{
                borderColor: `${layer.color}40`,
                background: `linear-gradient(145deg, ${layer.color}05 0%, transparent 60%)`,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${layer.color}10`, border: `1px solid ${layer.color}25` }}
                >
                  <Icon size={20} style={{ color: layer.color }} />
                </div>
                <span
                  className="text-[10px] font-black tracking-[0.18em] uppercase"
                  style={{ color: `${layer.color}80` }}
                >
                  LAYER {layer.num}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 leading-tight">
                {layer.title}
              </h3>
              <p className="text-sm font-bold mb-4" style={{ color: layer.color }}>
                {layer.subtitle}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm mb-8">{layer.body}</p>
              <ul className="space-y-3 mt-auto">
                {layer.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-muted-foreground/80 font-medium"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: layer.color }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: visualization */}
            <div
              className="rounded-lg border p-6 sm:p-8 bg-secondary/35 transition-all duration-500 min-h-[340px]"
              style={{ borderColor: `${layer.color}15` }}
            >
              {VIZ[active]}
            </div>
          </div>
        </FadeIn>

        {/* Bottom statement */}
        <FadeIn delay={0.2}>
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              We don't create data. We turn fragmented signals into a system your revenue can run
              on.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
