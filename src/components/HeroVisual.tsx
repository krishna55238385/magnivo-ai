import {
  Search,
  Radio,
  Layers,
  ShieldCheck,
  Bell,
  BrainCircuit,
  TrendingUp,
  Zap,
  Bot,
  Activity,
  Box,
  ChevronRight,
} from "lucide-react";

/* ─── Dark palette ─────────────────────────────────────────── */
const BG = "#0c1110";
const PANEL: React.CSSProperties = {
  background: "rgba(255,255,255,0.055)",
  border: "1px solid rgba(255,255,255,0.10)",
};
const PANEL_SUB: React.CSSProperties = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(255,255,255,0.065)",
};
const BORDER_F = "rgba(255,255,255,0.07)";
const INK = "rgba(255,255,255,0.92)";
const INK_M = "rgba(255,255,255,0.52)";
const INK_F = "rgba(255,255,255,0.30)";
const EM = "#34d399";
const GOLD = "#f0b429";
const BLUE = "#60a5fa";

/* ─── Mini sparkline ────────────────────────────────────────── */
function MiniSparkline({
  data,
  color,
  id,
}: {
  data: number[];
  color: string;
  id: string;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const norm = (v: number) => ((v - min) / (max - min || 1)) * 24;
  const W = 52;
  const step = W / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${24 - norm(v)}`).join(" ");
  const fill = pts + ` ${W},28 0,28`;
  return (
    <svg viewBox={`0 0 ${W} 28`} width={W} height={28} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`sg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={fill} fill={`url(#sg-${id})`} stroke="none" />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Sidebar ───────────────────────────────────────────────── */
const sideItems = [
  { name: "Leadfinder" },
  { name: "Reachout" },
  { name: "Compass" },
  { name: "Orbit" },
  { name: "Intelligence", active: true },
  { name: "Agentdesk" },
];

function Sidebar() {
  return (
    <div
      className="col-span-3 hidden sm:flex flex-col gap-0.5 pr-3"
      style={{ borderRight: `1px solid ${BORDER_F}` }}
    >
      {sideItems.map((item) => (
        <div
          key={item.name}
          className="px-2.5 py-2 rounded-lg text-[10.5px]"
          style={
            item.active
              ? {
                  background: "rgba(52,211,153,0.13)",
                  border: "1px solid rgba(52,211,153,0.26)",
                  color: EM,
                  fontWeight: 600,
                }
              : { border: "1px solid transparent", color: INK_M, fontWeight: 500 }
          }
        >
          {item.name}
        </div>
      ))}
      <div className="mt-auto pt-3 border-t" style={{ borderColor: BORDER_F }}>
        <div
          className="flex items-center gap-1.5 px-2 text-[9px] font-mono"
          style={{ color: INK_F }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ background: EM }}
          />
          6 agents live
        </div>
      </div>
    </div>
  );
}

/* ─── Toolbar ───────────────────────────────────────────────── */
function Toolbar() {
  const tabs = ["Intelligence", "Pipeline", "Agents"];
  return (
    <div
      className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between rounded-xl px-2.5 py-2"
      style={PANEL_SUB}
    >
      <div
        className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 min-w-0 flex-1 max-w-[190px]"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${BORDER_F}`,
        }}
      >
        <Search size={10} style={{ color: INK_F, flexShrink: 0 }} />
        <span className="text-[9px] font-mono truncate" style={{ color: INK_F }}>
          Search accounts, signals…
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {tabs.map((v, i) => (
          <div
            key={v}
            className="rounded-md px-2.5 py-1 text-[9px] font-semibold"
            style={
              i === 0
                ? {
                    background: "rgba(52,211,153,0.14)",
                    color: EM,
                    border: "1px solid rgba(52,211,153,0.28)",
                  }
                : { color: INK_M, border: `1px solid ${BORDER_F}` }
            }
          >
            {v}
          </div>
        ))}
        <div
          className="hidden sm:inline-flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-mono"
          style={{ color: GOLD, border: "1px solid rgba(240,180,41,0.28)" }}
        >
          <Radio size={9} />
          Live
        </div>
        <div
          className="hidden sm:inline-flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-mono"
          style={{ color: INK_M, border: `1px solid ${BORDER_F}` }}
        >
          <Layers size={9} />
          All workspaces
        </div>
        <div
          className="hidden md:inline-flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-mono"
          style={{ color: INK_M, border: `1px solid ${BORDER_F}` }}
        >
          <ShieldCheck size={9} />
          Guardrails
        </div>
      </div>
    </div>
  );
}

/* ─── Insights strip ────────────────────────────────────────── */
function InsightsStrip() {
  return (
    <div
      className="flex flex-wrap items-center gap-2 rounded-xl px-3 py-2"
      style={PANEL_SUB}
    >
      <span
        className="text-[9px] font-bold tracking-widest uppercase"
        style={{ color: INK_F }}
      >
        Insights
      </span>
      <span
        className="hidden sm:inline text-[10px]"
        style={{ color: "rgba(255,255,255,0.18)" }}
      >
        •
      </span>
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold"
        style={{
          background: "rgba(240,180,41,0.14)",
          color: GOLD,
          border: "1px solid rgba(240,180,41,0.24)",
        }}
      >
        <Bell size={10} />3 anomalies flagged
      </span>
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold"
        style={{
          background: "rgba(52,211,153,0.12)",
          color: EM,
          border: "1px solid rgba(52,211,153,0.24)",
        }}
      >
        <ShieldCheck size={10} />2 guardrails active
      </span>
      <span
        className="ml-auto hidden sm:inline text-[10px] font-mono"
        style={{ color: INK_F }}
      >
        Updated 12s ago
      </span>
    </div>
  );
}

/* ─── Metric cards ──────────────────────────────────────────── */
const CARDS = [
  {
    id: "pipeline",
    label: "PIPELINE",
    value: "$4.2M",
    delta: "+14%",
    dColor: EM,
    sub: "vs last month",
    spark: [55, 62, 58, 68, 66, 74, 79, 82],
    sColor: EM,
    Icon: TrendingUp,
  },
  {
    id: "winrate",
    label: "WIN RATE",
    value: "32.8%",
    delta: "+5.2%",
    dColor: GOLD,
    sub: "vs last month",
    spark: [26, 28, 27, 30, 29, 31, 32, 33],
    sColor: GOLD,
    Icon: TrendingUp,
  },
  {
    id: "aiactions",
    label: "AI ACTIONS",
    value: "84,592",
    delta: "Active",
    dColor: EM,
    sub: "this week",
    spark: [64, 70, 68, 78, 76, 82, 85, 90],
    sColor: BLUE,
    Icon: Zap,
  },
];

function MetricCards() {
  return (
    <div className="grid grid-cols-1 min-[520px]:grid-cols-3 gap-2.5">
      {CARDS.map((c) => {
        const DIcon = c.Icon;
        return (
          <div
            key={c.label}
            className="rounded-xl p-3.5 flex flex-col justify-between gap-3"
            style={PANEL}
          >
            <div className="flex items-center justify-between gap-1">
              <span
                className="text-[9px] font-bold tracking-widest uppercase"
                style={{ color: INK_F }}
              >
                {c.label}
              </span>
              <span
                className="inline-flex items-center gap-0.5 text-[9.5px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0"
                style={{
                  background: `${c.dColor}1c`,
                  color: c.dColor,
                  border: `1px solid ${c.dColor}38`,
                }}
              >
                <DIcon size={9} />
                {c.delta}
              </span>
            </div>
            <div className="flex items-end justify-between gap-2">
              <div>
                <div
                  className="text-[22px] font-bold tabular-nums leading-tight"
                  style={{ color: INK, fontVariantNumeric: "tabular-nums" }}
                >
                  {c.value}
                </div>
                <div
                  className="text-[10px] font-mono mt-0.5"
                  style={{ color: INK_M }}
                >
                  {c.sub}
                </div>
              </div>
              <div style={{ opacity: 0.85 }}>
                <MiniSparkline data={c.spark} color={c.sColor} id={c.id} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Pipeline strip ────────────────────────────────────────── */
const STAGES = [
  { label: "Intent", count: 42, pct: 100 },
  { label: "Engaged", count: 28, pct: 67 },
  { label: "Meeting", count: 12, pct: 29 },
  { label: "Proposal", count: 6, pct: 14 },
  { label: "Closed", count: 3, pct: 7 },
];

function PipelineStrip() {
  return (
    <div
      className="flex flex-wrap items-center gap-1.5 rounded-xl px-3 py-2"
      style={PANEL_SUB}
    >
      <div
        className="text-[9px] font-bold tracking-widest uppercase shrink-0 mr-1"
        style={{ color: INK_F }}
      >
        Pipeline
      </div>
      {STAGES.map((s, i) => (
        <div key={s.label} className="flex items-center gap-1.5 min-w-0">
          {i > 0 && (
            <ChevronRight
              size={10}
              className="hidden sm:block shrink-0"
              style={{ color: INK_F }}
            />
          )}
          <div
            className="rounded-lg px-2.5 py-1.5 flex flex-col gap-0.5 min-w-[52px]"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${BORDER_F}`,
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className="text-[9px] font-medium whitespace-nowrap"
                style={{ color: INK_M }}
              >
                {s.label}
              </span>
              <span
                className="text-[11px] font-bold tabular-nums"
                style={{
                  color: i === STAGES.length - 1 ? EM : INK,
                }}
              >
                {s.count}
              </span>
            </div>
            <div
              className="w-full h-0.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="h-0.5 rounded-full"
                style={{
                  width: `${s.pct}%`,
                  background:
                    i === 0
                      ? "rgba(255,255,255,0.30)"
                      : i === STAGES.length - 1
                        ? EM
                        : `rgba(52,211,153,${0.3 + i * 0.12})`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Deal risk chart ───────────────────────────────────────── */
const CHART_PATH =
  "M0,78 C14,76 28,80 44,76 C58,72 70,84 86,80 C100,76 114,62 130,60 C144,58 156,66 172,64 C186,62 200,50 216,48 C230,46 244,52 258,50 C272,48 284,34 300,32 C314,30 328,36 344,34 C358,32 372,20 388,18 C393,17 397,17 400,18";

const CHART_DOTS = [
  { x: 130, y: 60, val: "42%" },
  { x: 216, y: 48, val: "35%" },
  { x: 300, y: 32, val: "28%" },
  { x: 388, y: 18, val: "15%" },
];

function DealRiskChart() {
  return (
    <div className="rounded-xl p-4 sm:p-5 relative overflow-hidden h-full" style={PANEL}>
      <style>{`
        @keyframes dash-draw {
          from { stroke-dashoffset: 900; }
          to   { stroke-dashoffset: 0; }
        }
        .chart-line {
          stroke-dasharray: 900;
          stroke-dashoffset: 0;
          animation: dash-draw 2.2s cubic-bezier(0.22,1,0.36,1) 0.6s both;
        }
      `}</style>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 85% 15%, rgba(240,180,41,0.10), transparent 55%)",
        }}
      />

      <div className="flex flex-col min-[420px]:flex-row min-[420px]:items-center justify-between gap-2 text-xs mb-5 relative z-10">
        <div className="flex items-center gap-2 font-bold" style={{ color: INK }}>
          <BrainCircuit size={14} style={{ color: EM }} />
          Intelligence — deal risk
        </div>
        <div className="flex items-center gap-3">
          <span
            className="flex items-center gap-1 text-[10px] font-mono"
            style={{ color: INK_F }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ background: GOLD }}
            />
            Risk index
          </span>
          <span className="font-medium" style={{ color: INK_M }}>
            last 7 days
          </span>
        </div>
      </div>

      <div className="relative w-full h-20 md:h-24 mt-1">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="border-t w-full"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
            />
          ))}
        </div>

        <svg
          viewBox="0 0 400 100"
          className="w-full h-full overflow-visible relative z-10"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chartFillDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={GOLD} stopOpacity="0.22" />
              <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={CHART_PATH + " L400,100 L0,100 Z"}
            fill="url(#chartFillDark)"
          />
          <path
            d={CHART_PATH}
            fill="none"
            stroke={GOLD}
            strokeWidth="2"
            strokeLinecap="round"
            className="chart-line"
          />
          {CHART_DOTS.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="6" fill={GOLD} fillOpacity="0.14" />
              <circle
                cx={p.x}
                cy={p.y}
                r="2.5"
                fill={BG}
                stroke={GOLD}
                strokeWidth="1.8"
              />
              <text
                x={p.x}
                y={p.y - 10}
                fontSize="9"
                fill={INK_M}
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
  );
}

/* ─── Accounts queue ────────────────────────────────────────── */
const ACCOUNTS = [
  { name: "Acme Corp", tag: "High intent", score: 94, hot: true },
  { name: "TechFlow Inc", tag: "DM active", score: 87, hot: true },
  { name: "Nordex", tag: "Content eng.", score: 72, hot: false },
  { name: "Vertex AI", tag: "Job posting", score: 61, hot: false },
];

function AccountsQueuePanel() {
  return (
    <div className="rounded-xl p-3 flex flex-col min-h-0 h-full" style={PANEL}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="text-[11px] font-bold" style={{ color: INK }}>
            Hot account queue
          </div>
          <div className="text-[10px] font-mono mt-0.5" style={{ color: INK_F }}>
            247 tracked · sync 2m ago
          </div>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-md"
            style={{ background: "rgba(52,211,153,0.14)", color: EM }}
          >
            Filter
          </span>
          <span
            className="hidden sm:inline text-[9px] font-bold px-2 py-0.5 rounded-md"
            style={{ background: "rgba(255,255,255,0.05)", color: INK_M }}
          >
            Export
          </span>
        </div>
      </div>

      <div
        className="grid grid-cols-12 gap-1.5 px-1 pb-1.5 border-b mb-1.5"
        style={{ borderColor: BORDER_F }}
      >
        {["Account", "Signal", "Score"].map((h, i) => (
          <div
            key={h}
            className={`text-[9px] font-bold uppercase tracking-wider ${i === 0 ? "col-span-5" : i === 1 ? "col-span-4" : "col-span-3"}`}
            style={{ color: INK_F }}
          >
            {h}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1 flex-1 min-h-0">
        {ACCOUNTS.map((r, i) => (
          <div
            key={r.name}
            className="grid grid-cols-12 gap-1.5 items-center px-1.5 py-1.5 rounded-lg"
            style={
              i === 0
                ? {
                    background: "rgba(52,211,153,0.08)",
                    border: "1px solid rgba(52,211,153,0.20)",
                  }
                : {
                    background: "rgba(255,255,255,0.025)",
                    border: `1px solid ${BORDER_F}`,
                  }
            }
          >
            <div className="col-span-5 flex items-center gap-1.5 min-w-0">
              <div
                className="w-5 h-5 rounded text-[9px] font-black flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,255,255,0.08)", color: INK_M }}
              >
                {r.name[0]}
              </div>
              <span
                className="text-[10px] font-medium truncate"
                style={{ color: INK }}
              >
                {r.name}
              </span>
            </div>
            <div className="col-span-4 min-w-0">
              <span
                className="inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded-full truncate max-w-full"
                style={
                  r.hot
                    ? { background: "rgba(240,180,41,0.18)", color: GOLD }
                    : {
                        background: "rgba(255,255,255,0.05)",
                        color: INK_M,
                      }
                }
              >
                {r.tag}
              </span>
            </div>
            <div className="col-span-3 flex items-center gap-1">
              <div
                className="flex-1 h-1 rounded-full min-w-0"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${r.score}%`,
                    background:
                      r.score > 85
                        ? `linear-gradient(90deg, ${EM}, rgba(52,211,153,0.55))`
                        : r.score > 70
                          ? `linear-gradient(90deg, ${GOLD}, rgba(240,180,41,0.55))`
                          : "rgba(255,255,255,0.22)",
                  }}
                />
              </div>
              <span
                className="text-[9px] font-bold tabular-nums w-5 shrink-0"
                style={{ color: INK_M }}
              >
                {r.score}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-2 pt-2 flex flex-wrap items-center gap-2 border-t text-[9px] font-mono"
        style={{ borderColor: BORDER_F, color: INK_F }}
      >
        <span className="inline-flex items-center gap-1">
          <span
            className="h-1 w-1 rounded-full animate-pulse"
            style={{ background: EM }}
          />
          Outbound agent
        </span>
        <span className="hidden sm:inline-flex items-center gap-1">
          <span
            className="h-1 w-1 rounded-full animate-pulse"
            style={{ background: GOLD }}
          />
          Enrichment
        </span>
        <span className="ml-auto">Next sync 58s</span>
      </div>
    </div>
  );
}

/* ─── Sub-cards row ─────────────────────────────────────────── */
function SubCards() {
  return (
    <div className="hidden md:grid grid-cols-3 gap-2.5">
      {/* Forecast accuracy */}
      <div className="rounded-xl p-4 relative overflow-hidden" style={PANEL}>
        <div
          className="flex items-center gap-2 text-xs font-bold mb-3"
          style={{ color: INK }}
        >
          <TrendingUp size={13} style={{ color: EM }} />
          Forecast accuracy
          <span className="ml-auto font-bold" style={{ color: EM }}>
            94.2%
          </span>
        </div>
        <div
          className="w-full rounded-full h-1.5 mb-2"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="h-1.5 rounded-full"
            style={{
              width: "94%",
              background: `linear-gradient(90deg, ${EM}, #60efb0)`,
            }}
          />
        </div>
        <div
          className="flex justify-between text-[10px] font-mono"
          style={{ color: INK_F }}
        >
          <span>$2.4M predicted</span>
          <span>$2.5M actual</span>
        </div>
      </div>

      {/* Agents online */}
      <div className="rounded-xl p-4" style={PANEL}>
        <div
          className="flex items-center gap-2 text-xs font-bold mb-3"
          style={{ color: INK }}
        >
          <Bot size={13} style={{ color: BLUE }} />
          Agents online
          <span className="ml-auto font-bold" style={{ color: BLUE }}>
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
                background: `rgba(96,165,250,${0.25 + h * 0.045})`,
                animationDelay: `${i * 80}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Intent signals */}
      <div className="rounded-xl p-4" style={PANEL}>
        <div
          className="flex items-center gap-2 text-xs font-bold mb-3"
          style={{ color: INK }}
        >
          <Activity size={13} style={{ color: GOLD }} />
          Intent signals
          <span className="ml-auto font-bold" style={{ color: GOLD }}>
            HIGH
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            { company: "Acme Corp", dot: "#ef4444" },
            { company: "GlobalTech", dot: EM },
            { company: "Nexus", dot: GOLD },
          ].map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-[10px] font-mono rounded px-2 py-1"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${BORDER_F}`,
              }}
            >
              <span style={{ color: INK_M }}>{s.company}</span>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: s.dot }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Live execution log ────────────────────────────────────── */
const LIVE_LOGS = [
  {
    agent: "Reachout-Alpha",
    action: "Drafted email to VP Sales at Stripe",
    time: "Just now",
  },
  {
    agent: "Leadfinder-Omega",
    action: "Found 43 high-intent fintech accounts",
    time: "1m ago",
  },
  {
    agent: "Orbit-Sync",
    action: "Updated CRM for 12 closed-won deals",
    time: "3m ago",
  },
  {
    agent: "Reachout-Beta",
    action: "2 meetings booked from dormant leads",
    time: "8m ago",
  },
];

function ExecutionLog() {
  return (
    <div
      className="rounded-xl p-4 relative overflow-hidden"
      style={PANEL_SUB}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-8 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${BG}f0, transparent)`,
        }}
      />
      <div
        className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase mb-3"
        style={{ color: INK_F }}
      >
        <Box size={11} />
        Live execution log
      </div>
      <div className="space-y-2">
        {LIVE_LOGS.map((log, i) => (
          <div
            key={i}
            className="flex gap-3 text-[10px] font-mono items-start"
            style={{ opacity: 1 - i * 0.18 }}
          >
            <span
              className="whitespace-nowrap w-12 shrink-0"
              style={{ color: INK_F }}
            >
              {log.time}
            </span>
            <span
              className="hidden sm:inline font-bold whitespace-nowrap w-[6.5rem] shrink-0"
              style={{ color: EM }}
            >
              [{log.agent}]
            </span>
            <span
              className="truncate min-w-0"
              style={{ color: INK_M }}
            >
              {log.action}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main export ───────────────────────────────────────────── */
export function HeroVisual() {
  return (
    <div
      className="relative mx-auto mt-8 sm:mt-10 md:mt-12 max-w-3xl float-dashboard pointer-events-none origin-top scale-[0.84] sm:scale-[0.88] md:scale-[0.9]"
      aria-hidden
    >
      {/* Outer ambient glow */}
      <div
        className="absolute -inset-8 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(52,211,153,0.16), transparent 68%)",
          filter: "blur(32px)",
        }}
      />

      {/* Dashboard shell */}
      <div
        className="relative rounded-2xl overflow-hidden max-h-[600px]"
        style={{
          background: BG,
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow:
            "0 36px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset",
        }}
      >
        {/* Top inner gradient */}
        <div
          className="absolute inset-x-0 top-0 h-44 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(52,211,153,0.07) 0%, transparent 100%)",
          }}
        />

        <div className="p-3 sm:p-3.5 md:p-4 relative">
          {/* Window chrome */}
          <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4 px-1">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "#ff5f57" }}
            />
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "#febc2e" }}
            />
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "#28c840" }}
            />
            <div
              className="ml-3 sm:ml-4 min-w-0 flex-1 truncate text-[10px] sm:text-[11px] font-medium font-mono"
              style={{ color: INK_M }}
            >
              magnivo.ai / intelligence
            </div>
            <div
              className="ml-auto hidden min-[420px]:flex items-center gap-2 text-[10px] font-mono"
              style={{ color: EM }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ background: EM }}
              />
              SYSTEM_ONLINE
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-12 gap-2.5 sm:gap-3.5">
            <Sidebar />

            <div className="col-span-12 sm:col-span-9 flex flex-col gap-2.5 sm:gap-3">
              <Toolbar />
              <InsightsStrip />
              <MetricCards />
              <PipelineStrip />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
                <div className="md:col-span-7 min-w-0">
                  <DealRiskChart />
                </div>
                <div className="md:col-span-5 min-w-0">
                  <AccountsQueuePanel />
                </div>
              </div>

              <SubCards />

              <div className="hidden md:block max-h-[100px] overflow-hidden relative">
                <ExecutionLog />
              </div>

              {/* Mobile footer */}
              <div className="md:hidden rounded-xl px-3 py-2" style={PANEL_SUB}>
                <div
                  className="flex items-center justify-between gap-2 text-[10px] font-mono"
                  style={{ color: INK_M }}
                >
                  <span className="inline-flex items-center gap-1">
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ background: EM }}
                    />{" "}
                    Agents: 24/24
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ background: GOLD }}
                    />{" "}
                    Forecast: 94%
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ background: BLUE }}
                    />{" "}
                    Queue: 4
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
