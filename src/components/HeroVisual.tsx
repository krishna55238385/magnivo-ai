import {
  BrainCircuit,
  Bot,
  TrendingUp,
  Activity,
  Box,
  Zap,
  Search,
  Layers,
  Radio,
  ListOrdered,
  Bell,
  ShieldCheck,
} from "lucide-react";

const cardStyle = {
  background: "rgba(255,255,255,0.94)",
  border: "1px solid var(--border-soft)",
  boxShadow: "var(--shadow-soft)",
} as const;
const subtleCard = {
  background: "rgba(255,255,255,0.72)",
  border: "1px solid var(--border-faint)",
} as const;
const ink = "rgba(26,26,26,0.86)";
const inkMuted = "rgba(26,26,26,0.55)";
const inkFaint = "rgba(26,26,26,0.35)";
const accent = "var(--accent-blue)";
const accent2 = "var(--accent-green)";

function HeroToolbar() {
  const views = ["Intelligence", "Pipeline", "Agents"];
  return (
    <div
      className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between rounded-xl px-2.5 py-2 pointer-events-none"
      style={subtleCard}
    >
      <div
        className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 min-w-0 flex-1 max-w-md"
        style={{ background: "rgba(26,26,26,0.03)", border: "1px solid rgba(26,26,26,0.08)" }}
      >
        <Search size={11} className="shrink-0" style={{ color: inkMuted }} />
        <span className="text-[9px] font-mono truncate" style={{ color: inkFaint }}>
          Search accounts, signals, playbooks…
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {views.map((v, i) => (
          <div
            key={v}
            className="rounded-md px-2 py-1 text-[9px] font-semibold"
            style={
              i === 0
                ? { background: "rgba(27,58,45,0.10)", color: "var(--accent-blue)", border: "1px solid rgba(27,58,45,0.22)" }
                : { color: inkMuted, border: "1px solid rgba(26,26,26,0.10)" }
            }
          >
            {v}
          </div>
        ))}
        <div
          className="hidden sm:inline-flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-mono"
          style={{ color: "var(--accent-green)", border: "1px solid rgba(196,146,42,0.25)" }}
        >
          <Radio size={9} className="shrink-0" />
          Live
        </div>
        <div
          className="hidden sm:inline-flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-mono"
          style={{ color: inkMuted, border: "1px solid rgba(26,26,26,0.10)" }}
        >
          <Layers size={9} className="shrink-0 opacity-70" />
          All workspaces
        </div>
        <div
          className="hidden md:inline-flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-mono"
          style={{ color: inkMuted, border: "1px solid rgba(26,26,26,0.10)" }}
        >
          <ShieldCheck size={9} className="shrink-0 opacity-70" />
          Guardrails
        </div>
      </div>
    </div>
  );
}

function PipelineStrip() {
  const stages = [
    { label: "Intent", count: 42 },
    { label: "Engaged", count: 28 },
    { label: "Meeting", count: 12 },
    { label: "Proposal", count: 6 },
    { label: "Closed", count: 3 },
  ];
  return (
    <div
      className="flex flex-wrap items-stretch gap-1.5 rounded-xl px-2.5 py-2 pointer-events-none"
      style={subtleCard}
    >
      <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase shrink-0 mr-1" style={{ color: inkFaint }}>
        Pipeline
      </div>
      {stages.map((s, i) => (
        <div key={s.label} className="flex items-center gap-2 min-w-0">
          {i > 0 && (
            <span className="text-[10px] hidden sm:inline" style={{ color: "rgba(26,26,26,0.20)" }}>
              →
            </span>
          )}
          <div
            className="rounded-lg px-2.5 py-1 flex items-center gap-2"
            style={{ background: "rgba(26,26,26,0.03)", border: "1px solid rgba(26,26,26,0.08)" }}
          >
            <span className="text-[10px] font-medium whitespace-nowrap" style={{ color: inkMuted }}>
              {s.label}
            </span>
            <span className="text-[11px] font-bold tabular-nums" style={{ color: i >= stages.length - 1 ? accent : accent2 }}>
              {s.count}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function InsightsStrip() {
  const items = [
    { label: "3 anomalies flagged", tone: "rgba(27,58,45,0.10)", color: "var(--accent-blue)", icon: Bell },
    { label: "2 guardrails active", tone: "rgba(196,146,42,0.18)", color: "var(--accent-green)", icon: ShieldCheck },
  ] as const;
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl px-2.5 py-2 pointer-events-none" style={subtleCard}>
      <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: inkFaint }}>
        Insights
      </span>
      <span className="mx-1 hidden sm:inline text-[10px]" style={{ color: "rgba(26,26,26,0.22)" }}>
        •
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <span
              key={it.label}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold"
              style={{ background: it.tone, color: it.color, border: "1px solid rgba(26,26,26,0.08)" }}
            >
              <Icon size={11} className="opacity-80" />
              {it.label}
            </span>
          );
        })}
      </div>
      <span className="ml-auto hidden sm:inline text-[10px] font-mono" style={{ color: inkMuted }}>
        Updated 12s ago
      </span>
    </div>
  );
}

const accountRows = [
  { name: "Acme Corp", tag: "High intent", score: 94, hot: true },
  { name: "TechFlow Inc", tag: "DM active", score: 87, hot: true },
  { name: "Nordex", tag: "Content engaged", score: 72, hot: false },
  { name: "Vertex AI", tag: "Job posting", score: 61, hot: false },
];

function AccountsQueuePanel() {
  return (
    <div className="rounded-xl p-3 flex flex-col min-h-0 pointer-events-none" style={cardStyle}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="text-xs font-bold" style={{ color: ink }}>
            Hot account queue
          </div>
          <div className="text-[10px] font-mono mt-0.5" style={{ color: inkMuted }}>
            247 tracked · sync 2m ago
          </div>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-md" style={{ background: "rgba(27,58,45,0.10)", color: accent }}>
            Filter
          </span>
          <span className="hidden sm:inline text-[9px] font-bold px-2 py-0.5 rounded-md" style={{ background: "rgba(26,26,26,0.03)", color: inkMuted }}>
            Export
          </span>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-1.5 px-1 pb-1.5 border-b mb-1.5" style={{ borderColor: "rgba(26,26,26,0.10)" }}>
        {["Account", "Signal", "Score"].map((h, i) => (
          <div
            key={h}
            className={`text-[9px] font-bold uppercase tracking-wider ${i === 0 ? "col-span-5" : i === 1 ? "col-span-4" : "col-span-3"}`}
            style={{ color: inkFaint }}
          >
            {h}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 flex-1 min-h-0">
        {accountRows.map((r, i) => (
          <div
            key={r.name}
            className="grid grid-cols-12 gap-1.5 items-center px-1.5 py-1.5 rounded-lg"
            style={
              i === 0
                ? { background: "rgba(27,58,45,0.08)", border: "1px solid rgba(27,58,45,0.18)" }
                : { background: "rgba(26,26,26,0.02)", border: "1px solid rgba(26,26,26,0.07)" }
            }
          >
            <div className="col-span-5 flex items-center gap-1.5 min-w-0">
              <div
                className="w-5 h-5 rounded text-[9px] font-black flex items-center justify-center shrink-0"
                style={{ background: "rgba(26,26,26,0.06)", color: inkMuted }}
              >
                {r.name[0]}
              </div>
              <span className="text-[10px] font-medium truncate" style={{ color: ink }}>
                {r.name}
              </span>
            </div>
            <div className="col-span-4 min-w-0">
              <span
                className="inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded-full truncate max-w-full"
                style={
                  r.hot
                    ? { background: "rgba(196,146,42,0.20)", color: "var(--accent-green)" }
                    : { background: "rgba(26,26,26,0.04)", color: inkMuted }
                }
              >
                {r.tag}
              </span>
            </div>
            <div className="col-span-3 flex items-center gap-1">
              <div className="flex-1 h-1 rounded-full min-w-0" style={{ background: "rgba(26,26,26,0.10)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${r.score}%`,
                    background:
                      r.score > 85
                        ? "var(--accent-blue)"
                        : r.score > 70
                          ? "var(--accent-green)"
                          : "rgba(26,26,26,0.25)",
                  }}
                />
              </div>
              <span className="text-[9px] font-bold tabular-nums w-5 shrink-0" style={{ color: inkMuted }}>
                {r.score}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 pt-2 flex flex-wrap items-center gap-2 border-t text-[9px] font-mono" style={{ borderColor: "rgba(26,26,26,0.08)", color: inkMuted }}>
        <span className="inline-flex items-center gap-1">
          <span className="h-1 w-1 rounded-full animate-pulse" style={{ background: "var(--accent-blue)" }} />
          Outbound agent
        </span>
        <span className="hidden sm:inline-flex items-center gap-1">
          <span className="h-1 w-1 rounded-full animate-pulse" style={{ background: "var(--accent-green)" }} />
          Enrichment
        </span>
        <span className="ml-auto">Next sync 58s</span>
      </div>
    </div>
  );
}

const liveLogs = [
  { agent: "Reachout-Alpha", action: "Drafted hyper-personalised email to VP Sales at Stripe", time: "Just now" },
  { agent: "Leadfinder-Omega", action: "Identified 43 new high-intent accounts in fintech", time: "1m ago" },
  { agent: "Orbit-Sync", action: "Updated CRM records for 12 closed-won opportunities", time: "3m ago" },
  { agent: "Reachout-Beta", action: "Followed up with 14 dormant leads, 2 meetings booked", time: "8m ago" },
  { agent: "Compass-Prime", action: "Reranked 112 accounts by composite intent + fit score", time: "12m ago" },
];

const queuedActions = [
  { id: "Q-1842", task: "Sequence: enterprise fintech — wave 4", eta: "00:12" },
  { id: "Q-1841", task: "CRM hygiene — duplicate merge batch", eta: "00:18" },
  { id: "Q-1840", task: "Slack digest to #rev-leadership", eta: "00:24" },
  { id: "Q-1839", task: "Refresh technographic on Nordex + 6 siblings", eta: "00:31" },
];

function ExecutionAndQueueSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pointer-events-none">
      <div className="rounded-xl p-4 relative overflow-hidden" style={subtleCard}>
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: inkFaint }}>
          <Box size={11} />
          Live execution log
        </div>
        <div className="space-y-2 max-h-[140px] overflow-hidden relative">
          <div className="absolute inset-x-0 bottom-0 h-10 z-10" style={{ background: "linear-gradient(to top, rgba(245,242,236,1), rgba(245,242,236,0))" }} />
          {liveLogs.map((log, i) => (
            <div key={i} className="flex gap-2 sm:gap-3 text-[10px] font-mono items-start" style={{ opacity: 1 - i * 0.14 }}>
              <span className="whitespace-nowrap w-12 shrink-0" style={{ color: inkFaint }}>
                {log.time}
              </span>
              <span className="hidden sm:inline font-bold whitespace-nowrap w-[6.5rem] shrink-0" style={{ color: accent }}>
                [{log.agent}]
              </span>
              <span className="truncate min-w-0" style={{ color: inkMuted }}>
                {log.action}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl p-4 relative overflow-hidden" style={subtleCard}>
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: inkFaint }}>
          <ListOrdered size={11} />
          Queued actions
        </div>
        <div className="space-y-2">
          {queuedActions.map((q, i) => (
            <div
              key={q.id}
              className="flex items-start gap-2 text-[10px] font-mono rounded-lg px-2 py-1.5"
              style={{ background: "rgba(26,26,26,0.02)", border: "1px solid rgba(26,26,26,0.08)" }}
            >
              <span className="shrink-0 font-bold" style={{ color: accent }}>
                {q.id}
              </span>
              <span className="flex-1 min-w-0 truncate" style={{ color: inkMuted }}>
                {q.task}
              </span>
              <span className="shrink-0 tabular-nums" style={{ color: inkFaint }}>
                {q.eta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div
      className="relative mx-auto mt-8 sm:mt-10 md:mt-12 max-w-3xl float-dashboard pointer-events-none origin-top scale-[0.84] sm:scale-[0.88] md:scale-[0.9]"
      aria-hidden
    >
      {/* Outer glow wrapper */}
      <div
        className="absolute -inset-4 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--accent-blue) 28%, transparent), transparent 72%)",
          filter: "blur(26px)",
        }}
      />

      {/* Dark dashboard card */}
      <div
        className="relative rounded-2xl overflow-hidden max-h-[560px]"
        style={{
          background: "rgba(255,255,255,0.85)",
          border: "1px solid rgba(26,26,26,0.12)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.14)",
        }}
      >
        {/* Inner top gradient */}
        <div
          className="absolute inset-x-0 top-0 h-48 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--accent-green) 14%, transparent) 0%, transparent 100%)",
          }}
        />

        <div className="p-3 sm:p-3.5 md:p-4 relative">
          {/* Window chrome bar */}
          <div
            className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4 px-1"
            style={{ color: inkMuted }}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(26,26,26,0.12)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "color-mix(in oklab, var(--accent-green) 75%, #fff)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "color-mix(in oklab, var(--accent-blue) 78%, #fff)" }} />
            <div
              className="ml-1 sm:ml-4 min-w-0 flex-1 truncate text-[10px] sm:text-xs font-medium font-mono"
            >
              magnivo.ai / intelligence
            </div>
            <div className="ml-auto hidden min-[420px]:flex items-center gap-2 text-[10px] font-mono" style={{ color: accent }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: accent }} />
              SYSTEM_ONLINE
            </div>
          </div>

          <div className="grid grid-cols-12 gap-2.5 sm:gap-3.5">
            {/* Sidebar */}
            <div className="col-span-3 hidden sm:flex flex-col gap-1.5" style={{ borderRight: "1px solid rgba(26,26,26,0.10)", paddingRight: 10 }}>
              {[
                { name: "Leadfinder", active: false },
                { name: "Reachout", active: false },
                { name: "Compass", active: false },
                { name: "Orbit", active: false },
                { name: "Intelligence", active: true },
                { name: "Agentdesk", active: false },
              ].map((item) => (
                <div
                  key={item.name}
                  className="px-2.5 py-2 rounded-lg text-[11px] font-medium transition-all duration-200"
                  style={
                    item.active
                      ? {
                          background: "rgba(27,58,45,0.10)",
                          border: "1px solid rgba(27,58,45,0.18)",
                          color: "var(--accent-blue)",
                        }
                      : {
                          border: "1px solid transparent",
                          color: inkMuted,
                        }
                  }
                >
                  {item.name}
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="col-span-12 sm:col-span-9 flex flex-col gap-2.5 sm:gap-3.5">
              <HeroToolbar />
              <InsightsStrip />

              {/* Metric cards row */}
              <div className="grid grid-cols-1 min-[520px]:grid-cols-3 gap-2.5">
                <div className="rounded-xl p-4 sm:p-5 flex flex-col justify-center" style={cardStyle}>
                  <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: inkFaint }}>
                    PIPELINE
                  </div>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span
                      className="text-[20px] sm:text-[28px] font-bold tabular-nums whitespace-nowrap"
                      style={{ color: ink, fontVariantNumeric: "tabular-nums" }}
                    >
                      $4.2M
                    </span>
                    <span className="text-xs font-semibold flex items-center" style={{ color: accent }}>
                      <TrendingUp size={12} className="mr-0.5" /> +14%
                    </span>
                  </div>
                  <div className="text-xs font-medium" style={{ color: inkMuted }}>
                    vs last month
                  </div>
                </div>

                <div className="rounded-xl p-4 sm:p-5 flex flex-col justify-center" style={cardStyle}>
                  <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: inkFaint }}>
                    WIN RATE
                  </div>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span
                      className="text-[20px] sm:text-[28px] font-bold tabular-nums whitespace-nowrap"
                      style={{ color: ink, fontVariantNumeric: "tabular-nums" }}
                    >
                      32.8%
                    </span>
                    <span className="text-xs font-semibold flex items-center" style={{ color: accent2 }}>
                      <TrendingUp size={12} className="mr-0.5" /> +5.2%
                    </span>
                  </div>
                  <div className="text-xs font-medium" style={{ color: inkMuted }}>
                    vs last month
                  </div>
                </div>

                <div className="rounded-xl p-4 sm:p-5 flex flex-col justify-center" style={cardStyle}>
                  <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: inkFaint }}>
                    AI ACTIONS
                  </div>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span
                      className="text-[20px] sm:text-[28px] font-bold tabular-nums whitespace-nowrap"
                      style={{ color: ink, fontVariantNumeric: "tabular-nums" }}
                    >
                      84,592
                    </span>
                    <span className="text-xs font-semibold flex items-center" style={{ color: accent }}>
                      <Zap size={12} className="mr-0.5" /> Active
                    </span>
                  </div>
                  <div className="text-xs font-medium" style={{ color: inkMuted }}>
                    this week
                  </div>
                </div>
              </div>

              <PipelineStrip />

              {/* Chart + accounts: stack on small screens, split md+ */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
                <div className="md:col-span-7 space-y-2.5 min-w-0">
                  <div className="rounded-xl p-4 sm:p-5 relative overflow-hidden" style={cardStyle}>
                    <div className="flex flex-col min-[420px]:flex-row min-[420px]:items-center justify-between gap-2 text-xs mb-4">
                      <div className="flex items-center gap-2.5 font-bold" style={{ color: ink }}>
                        <BrainCircuit size={15} style={{ color: accent2 }} />
                        Intelligence — deal risk
                      </div>
                      <span className="font-medium" style={{ color: inkMuted }}>
                        last 7 days
                      </span>
                    </div>

                    <div className="relative w-full h-20 md:h-24 mt-1">
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                        {[0, 1, 2, 3].map((i) => (
                          <div key={i} className="border-t w-full" style={{ borderColor: "rgba(26,26,26,0.10)" }} />
                        ))}
                      </div>
                      <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible relative z-10" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="heroDarkChartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,80 L40,75 L80,85 L120,65 L160,70 L200,50 L240,55 L280,35 L320,40 L360,20 L400,25 L400,100 L0,100 Z"
                          fill="url(#heroDarkChartGrad)"
                        />
                        <path
                          d="M0,80 L40,75 L80,85 L120,65 L160,70 L200,50 L240,55 L280,35 L320,40 L360,20 L400,25"
                          fill="none"
                          stroke="var(--accent-green)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        {[
                          { x: 120, y: 65, val: "42%" },
                          { x: 200, y: 50, val: "35%" },
                          { x: 280, y: 35, val: "28%" },
                          { x: 360, y: 20, val: "15%" },
                        ].map((p, i) => (
                          <g key={i}>
                            <circle cx={p.x} cy={p.y} r="5" fill="var(--accent-green)" fillOpacity="0.16" />
                            <circle cx={p.x} cy={p.y} r="2.5" fill="rgba(255,255,255,0.92)" stroke="var(--accent-green)" strokeWidth="1.5" />
                            <text
                              x={p.x}
                              y={p.y - 10}
                              fontSize="9"
                              fill={inkMuted}
                              textAnchor="middle"
                              fontFamily="monospace"
                            >
                              {p.val}
                            </text>
                          </g>
                        ))}
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 min-w-0">
                  <AccountsQueuePanel />
                </div>
              </div>

              {/* Sub-cards row (md+ only to keep hero compact) */}
              <div className="hidden md:grid grid-cols-3 gap-2.5">
                <div className="rounded-xl p-4 sm:p-5 relative overflow-hidden" style={cardStyle}>
                  <div className="flex items-center gap-2 text-xs font-bold mb-3" style={{ color: ink }}>
                    <TrendingUp size={13} style={{ color: accent2 }} />
                    Forecast accuracy
                    <span className="ml-auto font-bold" style={{ color: accent }}>
                      94.2%
                    </span>
                  </div>
                  <div className="w-full rounded-full h-1.5 mb-2" style={{ background: "rgba(26,26,26,0.10)" }}>
                    <div className="h-1.5 rounded-full" style={{ width: "94%", background: "linear-gradient(90deg, var(--accent-blue), var(--accent-green))" }} />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono" style={{ color: inkMuted }}>
                    <span>$2.4M predicted</span>
                    <span>$2.5M actual</span>
                  </div>
                </div>

                <div className="rounded-xl p-4 sm:p-5" style={cardStyle}>
                  <div className="flex items-center gap-2 text-xs font-bold mb-3" style={{ color: ink }}>
                    <Bot size={13} style={{ color: accent }} />
                    Agents online
                    <span className="ml-auto font-bold" style={{ color: accent }}>
                      24/24
                    </span>
                  </div>
                  <div className="h-10 flex items-end gap-1">
                    {[3, 5, 2, 8, 4, 7, 5, 9, 6, 4, 7, 8].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm animate-pulse"
                        style={{
                          height: `${h * 10}%`,
                          background: "color-mix(in oklab, var(--accent-blue) 60%, transparent)",
                          animationDelay: `${i * 80}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-xl p-4 sm:p-5" style={cardStyle}>
                  <div className="flex items-center gap-2 text-xs font-bold mb-3" style={{ color: ink }}>
                    <Activity size={13} style={{ color: accent2 }} />
                    Intent signals
                    <span className="ml-auto font-bold" style={{ color: accent2 }}>
                      HIGH
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { company: "Acme Corp", dot: "#ef4444" },
                      { company: "GlobalTech", dot: "var(--accent-green)" },
                      { company: "Nexus", dot: "var(--accent-blue)" },
                    ].map((s, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-[10px] font-mono rounded px-2 py-1"
                        style={{ background: "rgba(26,26,26,0.02)", border: "1px solid rgba(26,26,26,0.06)" }}
                      >
                        <span style={{ color: inkMuted }}>{s.company}</span>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.dot }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Execution layer (md+ only) */}
              <div className="hidden md:block max-h-[150px] overflow-hidden relative">
                <div
                  className="absolute inset-x-0 bottom-0 h-10 z-20"
                  style={{ background: "linear-gradient(to top, rgba(245,242,236,1), rgba(245,242,236,0))" }}
                />
                <ExecutionAndQueueSection />
              </div>

              {/* Compact footer strip for small screens (keeps complexity without adding height) */}
              <div className="md:hidden rounded-xl px-3 py-2 pointer-events-none" style={subtleCard}>
                <div className="flex items-center justify-between gap-2 text-[10px] font-mono" style={{ color: inkMuted }}>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full" style={{ background: accent }} /> Agents: 24/24
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full" style={{ background: accent2 }} /> Forecast: 94%
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full" style={{ background: accent }} /> Queue: 4
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
