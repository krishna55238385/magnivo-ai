import { useEffect, useRef } from "react";
import { motion, useInView, animate, type Variants } from "framer-motion";
import {
  BrainCircuit, Bot, TrendingUp, Zap, Target, SendHorizonal,
  Compass, RefreshCw, Filter, Radio, CheckCircle2, Bell,
  ArrowUpRight, Settings, Search, BarChart2,
} from "lucide-react";

/* ─── Tokens ─────────────────────────────────────────────────── */
const FF      = "'Inter','Helvetica Neue',Arial,system-ui,sans-serif";
const BG      = "#f4f5f9";
const SURFACE = "#ffffff";
const BORDER  = "rgba(0,0,0,0.072)";

const INK  = "#0d1117";
const INK2 = "#4b5563";
const INK3 = "#9ca3af";

const EM     = "#10b981";
const EM_S   = "rgba(16,185,129,0.09)";
const EM_B   = "rgba(16,185,129,0.22)";
const BLUE   = "#3b82f6";
const BLUE_S = "rgba(59,130,246,0.09)";
const BLUE_B = "rgba(59,130,246,0.22)";
const AMBER  = "#f59e0b";
const AMB_S  = "rgba(245,158,11,0.09)";
const AMB_B  = "rgba(245,158,11,0.22)";
const PURP   = "#8b5cf6";
const PURP_S = "rgba(139,92,246,0.09)";
const PURP_B = "rgba(139,92,246,0.22)";
const RED    = "#ef4444";
const TEAL   = "#059669";
const TEAL_S = "rgba(5,150,105,0.09)";

const CARD: React.CSSProperties = {
  background: SURFACE,
  border: `1px solid ${BORDER}`,
  boxShadow:
    "0 0 0 1px rgba(255,255,255,0.7) inset, 0 1px 2px rgba(0,0,0,0.04), 0 6px 16px rgba(0,0,0,0.04), 0 16px 32px rgba(0,0,0,0.03)",
};
const FLAT: React.CSSProperties = {
  background: SURFACE,
  border: `1px solid ${BORDER}`,
};
const INSET: React.CSSProperties = {
  background: "rgba(0,0,0,0.028)",
  border: `1px solid ${BORDER}`,
};

/* ─── Chart math ─────────────────────────────────────────────── */
const CW = 400, CH = 66, CPX = 3;
const YMIN = 0.3, YMAX = 5.0;

function toPt(i: number, n: number, v: number) {
  return {
    x: +(CPX + (i / (n - 1)) * (CW - CPX * 2)).toFixed(1),
    y: +(CH - 3 - ((v - YMIN) / (YMAX - YMIN)) * (CH - 10)).toFixed(1),
  };
}

function spline(pts: { x: number; y: number }[]) {
  return pts.reduce((d, p, i) => {
    if (i === 0) return `M${p.x},${p.y}`;
    const q = pts[i - 1];
    const mx = +((q.x + p.x) / 2).toFixed(1);
    return `${d} C${mx},${q.y} ${mx},${p.y} ${p.x},${p.y}`;
  }, "");
}

const ACT_RAW = [1.2, 1.5, 1.4, 1.8, 2.0, 1.9, 2.3, 2.6, 2.8, 3.2, 3.8, 4.2];
const TGT_RAW = [1.0, 1.3, 1.5, 1.7, 2.0, 2.2, 2.5, 2.8, 3.0, 3.3, 3.7, 4.0];

const APT = ACT_RAW.map((v, i) => toPt(i, ACT_RAW.length, v));
const TPT = TGT_RAW.map((v, i) => toPt(i, TGT_RAW.length, v));

const A_LINE = spline(APT);
const T_LINE = spline(TPT);
const TAIL   = APT[APT.length - 1];
const A_FILL = `${A_LINE} L${TAIL.x},${CH} L${CPX},${CH} Z`;
const T_FILL = `${T_LINE} L${TPT[TPT.length - 1].x},${CH} L${CPX},${CH} Z`;

const FORECAST_X = APT[9].x; // week 10 = forecast zone start
const ANNOT_PT   = APT[6];   // week 7 = Q2 Push annotation

/* ─── Animation variants ─────────────────────────────────────── */
const stg: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.048, delayChildren: 0.03 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 9 },
  show:   { opacity: 1, y: 0, transition: { type: "spring", damping: 28, stiffness: 320 } },
};
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -7 },
  show:   { opacity: 1, x: 0, transition: { type: "spring", damping: 28, stiffness: 320 } },
};
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.28, ease: "easeOut" } },
};

/* ─── Dot grid ───────────────────────────────────────────────── */
function DotGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dg3" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.62" fill="rgba(0,0,0,0.038)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dg3)" />
    </svg>
  );
}

/* ─── Pulse rings ────────────────────────────────────────────── */
function Pulse({ color, size = 5 }: { color: string; size?: number }) {
  return (
    <span
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: size + 4, height: size + 4 }}
    >
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{ background: color, width: size, height: size }}
          animate={{ scale: [1, 3.4], opacity: [0.55, 0] }}
          transition={{ duration: 2.4, delay: i * 0.95, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      <span
        className="relative rounded-full"
        style={{ width: size * 0.52, height: size * 0.52, background: color }}
      />
    </span>
  );
}

/* ─── Animated counter ───────────────────────────────────────── */
function Num({
  value, prefix = "", suffix = "", dec = 0, delay = 0.3,
}: {
  value: number; prefix?: string; suffix?: string; dec?: number; delay?: number;
}) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = animate(0, value, {
      duration: 1.3, delay, ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        if (ref.current)
          ref.current.textContent =
            `${prefix}${dec > 0 ? v.toFixed(dec) : Math.round(v).toLocaleString()}${suffix}`;
      },
    });
    return ctrl.stop;
  }, [inView, value, prefix, suffix, dec, delay]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

/* ─── Animated bar ───────────────────────────────────────────── */
function Bar({ pct, color, delay }: { pct: number; color: string; delay: number }) {
  return (
    <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.07)" }}>
      <motion.div
        className="h-1 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: color }}
      />
    </div>
  );
}

/* ─── Mini sparkline ─────────────────────────────────────────── */
function MiniSpark({ data, color, id }: { data: number[]; color: string; id: string }) {
  const W = 48, H = 22;
  const lo = Math.min(...data), hi = Math.max(...data);
  const pts = data.map((v, i) => ({
    x: +(i / (data.length - 1) * W).toFixed(1),
    y: +(H - 2 - ((v - lo) / (hi - lo || 1)) * (H - 5)).toFixed(1),
  }));
  const line = spline(pts);
  const last = pts[pts.length - 1];
  const fill = `${line} L${last.x},${H} L0,${H} Z`;
  const gid  = `msp-${id}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.24" />
          <stop offset="100%" stopColor={color} stopOpacity="0"    />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#${gid})`} />
      <path d={line} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx={last.x} cy={last.y} r="2" fill="#fff" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}

/* ─── Signal strength dots ───────────────────────────────────── */
function SignalDots({ level, color }: { level: number; color: string }) {
  return (
    <div className="flex items-end gap-[2px]">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-[3px] rounded-sm"
          style={{
            height: 4 + i * 1.5,
            background: i <= level ? color : "rgba(0,0,0,0.1)",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Win-rate arc ───────────────────────────────────────────── */
function WinArc({ pct, color }: { pct: number; color: string }) {
  const r = 21;
  const C = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 50 50" width={50} height={50}>
      {/* Shadow track */}
      <circle cx="25" cy="25" r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="4.5" />
      {/* Arc */}
      <motion.circle
        cx="25" cy="25" r={r}
        fill="none" stroke={color} strokeWidth="4.5" strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={C}
        animate={{ strokeDashoffset: C * (1 - pct / 100) }}
        transition={{ duration: 1.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transform: "rotate(-90deg)", transformOrigin: "25px 25px" }}
      />
      {/* Center label */}
      <text
        x="25" y="28" textAnchor="middle"
        fontSize="9" fontWeight="700" fill={INK}
        fontFamily="'Inter',system-ui,sans-serif"
      >
        {pct}%
      </text>
    </svg>
  );
}

/* ─── Top nav (chrome + tabs) ────────────────────────────────── */
const TABS = ["Overview", "Pipeline", "Intelligence", "Agents", "Reports"];

function TopNav() {
  return (
    <div
      className="flex items-center gap-0 border-b relative z-10 shrink-0"
      style={{ background: SURFACE, borderColor: BORDER, height: 34 }}
    >
      {/* Traffic lights */}
      <div className="flex items-center gap-[5px] px-3">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
      </div>

      {/* URL pill */}
      <div
        className="hidden sm:flex items-center gap-1 px-2 py-[3px] rounded text-[8px] font-medium tracking-tight mr-3"
        style={{ background: "rgba(0,0,0,0.04)", color: INK3, border: `1px solid ${BORDER}` }}
      >
        magnivo.ai / intelligence
      </div>

      {/* Tabs */}
      <div className="flex h-full">
        {TABS.map((tab, i) => (
          <div
            key={tab}
            className="relative flex items-center px-3 h-full text-[8.5px] font-semibold cursor-default select-none"
            style={{ color: i === 2 ? INK : INK3 }}
          >
            {tab}
            {i === 2 && (
              <div
                className="absolute bottom-0 left-2.5 right-2.5 h-[2px] rounded-t-full"
                style={{ background: EM }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-1.5 pr-3">
        {/* Search */}
        <div
          className="w-[22px] h-[22px] rounded-md flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.04)", border: `1px solid ${BORDER}` }}
        >
          <Search size={9} style={{ color: INK3 }} />
        </div>
        {/* Bell + badge */}
        <div className="relative">
          <div
            className="w-[22px] h-[22px] rounded-md flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.04)", border: `1px solid ${BORDER}` }}
          >
            <Bell size={9} style={{ color: INK3 }} />
          </div>
          <div
            className="absolute -top-[2px] -right-[2px] w-[7px] h-[7px] rounded-full border-[1.5px] border-white"
            style={{ background: RED }}
          />
        </div>
        {/* Avatar */}
        <div
          className="w-[22px] h-[22px] rounded-full text-[8px] font-black text-white flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}
        >K</div>
      </div>
    </div>
  );
}

/* ─── Sidebar ─────────────────────────────────────────────────── */
const NAV: Array<{
  section: string;
  items: Array<{ name: string; icon: React.ElementType; badge?: string; active?: boolean }>;
}> = [
  {
    section: "WORKSPACE",
    items: [
      { name: "Overview",      icon: BarChart2,    },
      { name: "Intelligence",  icon: BrainCircuit, active: true },
      { name: "Pipeline",      icon: TrendingUp,   },
    ],
  },
  {
    section: "MODULES",
    items: [
      { name: "Leadfinder",    icon: Target,        badge: "12" },
      { name: "Reachout",      icon: SendHorizonal, badge: "3"  },
      { name: "Compass",       icon: Compass,       },
      { name: "Orbit",         icon: RefreshCw,     },
      { name: "Agentdesk",     icon: Bot,           },
    ],
  },
];

function Sidebar() {
  return (
    <motion.div
      variants={stg}
      initial="hidden"
      animate="show"
      className="col-span-3 hidden sm:flex flex-col"
      style={{ background: SURFACE, borderRight: `1px solid ${BORDER}` }}
    >
      {/* Logo row */}
      <motion.div
        variants={fadeLeft}
        className="flex items-center gap-1.5 px-3 py-2 border-b"
        style={{ borderColor: BORDER }}
      >
        <div
          className="w-[18px] h-[18px] rounded-md flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${EM}, #059669)`,
            boxShadow: `0 2px 6px ${EM}55`,
          }}
        >
          <span className="text-[7.5px] font-black text-white">M</span>
        </div>
        <span className="text-[9.5px] font-bold tracking-tight" style={{ color: INK }}>magnivo</span>
        <span
          className="ml-auto text-[6.5px] font-bold px-1.5 py-[2px] rounded-sm tracking-wide"
          style={{ background: EM_S, color: EM, border: `1px solid ${EM_B}` }}
        >PRO</span>
      </motion.div>

      {/* Nav sections */}
      <div className="flex-1 min-h-0 px-2 py-2 flex flex-col gap-3 overflow-hidden">
        {NAV.map(({ section, items }) => (
          <div key={section}>
            <div
              className="px-2 mb-1 text-[7px] font-bold tracking-[0.12em] uppercase"
              style={{ color: INK3 }}
            >
              {section}
            </div>
            <div className="flex flex-col gap-[2px]">
              {items.map(({ name, icon: Icon, badge, active }) => (
                <motion.div
                  key={name}
                  variants={fadeLeft}
                  whileHover={
                    !active
                      ? { x: 2, color: INK2, transition: { duration: 0.12 } }
                      : undefined
                  }
                  className="flex items-center gap-2 px-2 py-[5px] rounded-md text-[9px] cursor-default relative"
                  style={
                    active
                      ? {
                          background:
                            "linear-gradient(90deg,rgba(16,185,129,0.13) 0%,rgba(16,185,129,0.03) 100%)",
                          color: EM,
                          fontWeight: 600,
                          border: `1px solid ${EM_B}`,
                        }
                      : { color: INK3, fontWeight: 500 }
                  }
                >
                  {active && (
                    <div
                      className="absolute left-0 top-[5px] bottom-[5px] w-[2px] rounded-full"
                      style={{ background: EM }}
                    />
                  )}
                  <Icon size={10} strokeWidth={active ? 2.4 : 1.9} />
                  <span className="flex-1 truncate">{name}</span>
                  {badge && (
                    <span
                      className="text-[7px] font-bold px-[5px] py-[2px] rounded-sm"
                      style={{ background: AMB_S, color: AMBER }}
                    >
                      {badge}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        variants={fadeIn}
        className="border-t px-3 py-2.5 flex flex-col gap-2"
        style={{ borderColor: BORDER }}
      >
        <div className="flex items-center gap-1.5 text-[8px] font-mono" style={{ color: INK3 }}>
          <Pulse color={EM} size={5} />
          6 agents · online
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-[18px] h-[18px] rounded-full text-[7px] font-black text-white flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}
          >K</div>
          <div className="flex-1 min-w-0">
            <div className="text-[8.5px] font-semibold truncate" style={{ color: INK2 }}>Krishna S.</div>
            <div className="text-[7px] font-mono" style={{ color: INK3 }}>Admin · Workspace</div>
          </div>
          <Settings size={9} style={{ color: INK3 }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Section header ─────────────────────────────────────────── */
function SectionHeader() {
  return (
    <motion.div variants={fadeIn} className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <BrainCircuit size={11} style={{ color: EM }} />
        <span className="text-[10.5px] font-bold" style={{ color: INK }}>Intelligence</span>
        <span className="text-[8px]" style={{ color: INK3 }}>/</span>
        <span className="text-[8.5px]" style={{ color: INK3 }}>Overview</span>
        <span
          className="text-[7.5px] font-bold px-1.5 py-[2px] rounded-full"
          style={{ background: EM_S, color: EM, border: `1px solid ${EM_B}` }}
        >
          Live
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <motion.div
          whileTap={{ scale: 0.93 }}
          className="hidden sm:flex items-center gap-1 text-[7.5px] font-mono px-2 py-[4px] rounded-md cursor-default"
          style={{ background: "rgba(0,0,0,0.038)", color: INK3, border: `1px solid ${BORDER}` }}
        >
          <Filter size={7} /> Last 30d
        </motion.div>
        <div
          className="flex items-center gap-1 text-[7.5px] font-mono px-2 py-[4px] rounded-md"
          style={{ color: AMBER, border: `1px solid ${AMB_B}` }}
        >
          <Radio size={7} /> Live
        </div>
        <span className="hidden md:block text-[7.5px] font-mono" style={{ color: INK3 }}>
          sync 12s ago
        </span>
      </div>
    </motion.div>
  );
}

/* ─── KPI cards ──────────────────────────────────────────────── */
const KPIS = [
  {
    id: "pipe", label: "Pipeline", value: 4.2, prefix: "$", suffix: "M", dec: 1,
    delta: "+14%", dColor: EM, dBg: EM_S, rgb: "16,185,129", Icon: TrendingUp,
    spark: [2.1, 2.4, 2.3, 2.8, 3.1, 3.0, 3.7, 4.2],
  },
  {
    id: "win", label: "Win Rate", value: 32.8, prefix: "", suffix: "%", dec: 1,
    delta: "+5.2pp", dColor: BLUE, dBg: BLUE_S, rgb: "59,130,246", Icon: TrendingUp,
    spark: [28, 29, 28, 30, 31, 31, 32, 33],
  },
  {
    id: "mtg", label: "Meetings", value: 47, prefix: "", suffix: "", dec: 0,
    delta: "+8 wk", dColor: PURP, dBg: PURP_S, rgb: "139,92,246", Icon: CheckCircle2,
    spark: [32, 38, 35, 41, 43, 40, 45, 47],
  },
  {
    id: "resp", label: "Resp. Rate", value: 68.4, prefix: "", suffix: "%", dec: 1,
    delta: "+12%", dColor: AMBER, dBg: AMB_S, rgb: "245,158,11", Icon: ArrowUpRight,
    spark: [55, 58, 61, 59, 63, 65, 67, 68],
  },
  {
    id: "sigs", label: "AI Signals", value: 2100, prefix: "", suffix: "", dec: 0,
    delta: "Today", dColor: BLUE, dBg: BLUE_S, rgb: "59,130,246", Icon: Zap,
    spark: [1200, 1450, 1380, 1620, 1800, 1750, 1950, 2100],
  },
];

function KPICards() {
  return (
    <motion.div variants={stg} className="grid grid-cols-5 gap-2">
      {KPIS.map(({ id, label, value, prefix, suffix, dec, delta, dColor, dBg, rgb, Icon, spark }, i) => (
        <motion.div
          key={id}
          variants={fadeUp}
          whileHover={{
            y: -5,
            boxShadow: `0 8px 28px rgba(${rgb},0.15), 0 0 0 1px rgba(${rgb},0.12), 0 0 0 1px rgba(255,255,255,0.7) inset`,
            transition: { duration: 0.18 },
          }}
          className="rounded-xl p-2.5 relative overflow-hidden cursor-default"
          style={CARD}
        >
          {/* Radial corner glow */}
          <div
            className="absolute -top-5 -right-5 w-16 h-16 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle,rgba(${rgb},0.2),transparent 70%)` }}
          />
          {/* Top edge accent line */}
          <div
            className="absolute inset-x-0 top-0 h-[1.5px] pointer-events-none"
            style={{
              background: `linear-gradient(90deg,transparent 0%,rgba(${rgb},0.35) 50%,transparent 100%)`,
            }}
          />

          <div className="text-[7.5px] font-bold uppercase tracking-[0.1em] mb-1.5" style={{ color: INK3 }}>
            {label}
          </div>

          <div className="flex items-end justify-between gap-1">
            <div>
              <div
                className="text-[17px] font-bold tabular-nums leading-none mb-1.5"
                style={{ color: INK, fontVariantNumeric: "tabular-nums" }}
              >
                <Num value={value} prefix={prefix} suffix={suffix} dec={dec} delay={0.2 + i * 0.055} />
              </div>
              <span
                className="inline-flex items-center gap-[3px] text-[7.5px] font-bold px-1.5 py-[2px] rounded-full"
                style={{ background: dBg, color: dColor }}
              >
                <Icon size={7} strokeWidth={2.5} />
                {delta}
              </span>
            </div>
            <div className="opacity-90 shrink-0 pb-0.5">
              <MiniSpark data={spark} color={dColor} id={id} />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Pipeline chart ──────────────────────────────────────────── */
const X_LABELS = ["W1", "", "", "W4", "", "", "W7", "", "", "W10", "", "W12"];

function PipelineChart() {
  return (
    <motion.div variants={fadeUp} className="rounded-xl p-3.5 relative overflow-hidden" style={CARD}>
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-32 h-20 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 95% 5%,rgba(16,185,129,0.08),transparent 65%)",
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold" style={{ color: INK }}>Revenue Pipeline</span>
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 text-[7.5px] font-mono" style={{ color: INK3 }}>
              <span className="inline-block w-5 h-[1.5px] rounded" style={{ background: EM }} />
              Actual
            </span>
            <span className="flex items-center gap-1.5 text-[7.5px] font-mono" style={{ color: INK3 }}>
              <span
                className="inline-block w-5 h-[1.5px]"
                style={{
                  background: `repeating-linear-gradient(90deg,${BLUE} 0,${BLUE} 3px,transparent 3px,transparent 5px)`,
                }}
              />
              Target
            </span>
            <span className="flex items-center gap-1.5 text-[7.5px] font-mono" style={{ color: INK3 }}>
              <span
                className="inline-block w-5 h-[1.5px]"
                style={{
                  background:
                    "repeating-linear-gradient(90deg,rgba(0,0,0,0.18) 0,rgba(0,0,0,0.18) 2px,transparent 2px,transparent 4px)",
                }}
              />
              Forecast
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-bold tabular-nums" style={{ color: INK }}>
            <Num value={4.2} prefix="$" suffix="M" dec={1} delay={0.6} />
          </span>
          <span
            className="text-[7.5px] font-bold px-1.5 py-[2px] rounded-full"
            style={{ background: EM_S, color: EM }}
          >
            +14%
          </span>
        </div>
      </div>

      {/* Chart area */}
      <div className="flex gap-2">
        {/* Y-axis labels */}
        <div
          className="flex flex-col justify-between text-[7px] font-mono py-0.5 pr-1 shrink-0"
          style={{ color: INK3, height: CH }}
        >
          <span>$5M</span>
          <span>$3M</span>
          <span>$1M</span>
        </div>

        <div className="flex-1 min-w-0">
          <svg
            viewBox={`0 0 ${CW} ${CH}`}
            className="w-full"
            preserveAspectRatio="none"
            style={{ height: CH }}
          >
            <defs>
              <linearGradient id="gA3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={EM}   stopOpacity="0.2" />
                <stop offset="100%" stopColor={EM}   stopOpacity="0"   />
              </linearGradient>
              <linearGradient id="gT3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={BLUE} stopOpacity="0.09" />
                <stop offset="100%" stopColor={BLUE} stopOpacity="0"    />
              </linearGradient>
              {/* Forecast diagonal stripe */}
              <pattern
                id="fc-stripe"
                x="0" y="0" width="5" height="5"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="5" stroke="rgba(0,0,0,0.055)" strokeWidth="2" />
              </pattern>
            </defs>

            {/* Horizontal grid lines */}
            {[0.1, 0.42, 0.74].map((r, i) => (
              <line
                key={i}
                x1={CPX} y1={r * CH} x2={CW - CPX} y2={r * CH}
                stroke="rgba(0,0,0,0.048)" strokeWidth="0.7"
              />
            ))}
            {/* Baseline */}
            <line
              x1={CPX} y1={CH - 0.5} x2={CW - CPX} y2={CH - 0.5}
              stroke="rgba(0,0,0,0.08)" strokeWidth="0.8"
            />

            {/* Forecast zone */}
            <rect
              x={FORECAST_X} y={0}
              width={CW - FORECAST_X - CPX} height={CH}
              fill="url(#fc-stripe)"
            />

            {/* Target fill + line */}
            <motion.path
              d={T_FILL} fill="url(#gT3)"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.55 }}
            />
            <motion.path
              d={T_LINE}
              stroke={BLUE} strokeWidth="1.2" fill="none" strokeDasharray="4 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2.0, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Actual fill + line */}
            <motion.path
              d={A_FILL} fill="url(#gA3)"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.55 }}
            />
            <motion.path
              d={A_LINE}
              stroke={EM} strokeWidth="1.9" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Q2 Push annotation */}
            <motion.g
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.65, duration: 0.4 }}
            >
              <rect
                x={ANNOT_PT.x - 20} y={ANNOT_PT.y - 22}
                width={42} height={13} rx="3"
                fill={SURFACE} stroke={EM_B} strokeWidth="0.8"
              />
              <text
                x={ANNOT_PT.x + 1} y={ANNOT_PT.y - 12}
                fontSize="6.5" fill={EM} textAnchor="middle"
                fontFamily="'Inter',system-ui,sans-serif" fontWeight="600"
              >
                Q2 Push ↑
              </text>
              <line
                x1={ANNOT_PT.x} y1={ANNOT_PT.y - 9}
                x2={ANNOT_PT.x} y2={ANNOT_PT.y - 1.5}
                stroke={EM} strokeWidth="0.8" strokeDasharray="1.5 1.5"
              />
            </motion.g>

            {/* "Now" dashed vertical */}
            <motion.line
              x1={TAIL.x} y1={0} x2={TAIL.x} y2={CH}
              stroke={EM} strokeWidth="0.8" strokeDasharray="2 2.5"
              initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
              transition={{ delay: 2.35 }}
            />

            {/* End dot + "Now" label */}
            <motion.circle
              cx={TAIL.x} cy={TAIL.y} r="3"
              fill="#fff" stroke={EM} strokeWidth="2"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 2.42, type: "spring", stiffness: 500, damping: 18 }}
            />
            <motion.text
              x={TAIL.x + 4} y={TAIL.y - 5}
              fontSize="6.5" fill={EM}
              fontFamily="'Inter',system-ui,sans-serif" fontWeight="600"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 2.55 }}
            >
              Now
            </motion.text>
          </svg>

          {/* X-axis labels */}
          <div className="flex justify-between mt-[3px]">
            {X_LABELS.map((l, i) => (
              <span key={i} className="text-[6.5px] font-medium tabular-nums" style={{ color: l ? INK3 : "transparent" }}>
                {l || "."}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Funnel panel ───────────────────────────────────────────── */
const FUNNEL_DATA = [
  { label: "Intent",   count: 156, pct: 100, color: BLUE,  conv: "–"   },
  { label: "Engaged",  count: 89,  pct: 57,  color: PURP,  conv: "57%" },
  { label: "Meeting",  count: 42,  pct: 27,  color: AMBER, conv: "47%" },
  { label: "Proposal", count: 18,  pct: 12,  color: EM,    conv: "43%" },
  { label: "Closed",   count: 7,   pct: 4.5, color: TEAL,  conv: "39%" },
];

function FunnelPanel() {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-xl p-3.5 h-full flex flex-col"
      style={CARD}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold" style={{ color: INK }}>Pipeline Funnel</span>
        <span className="text-[7.5px] font-mono" style={{ color: INK3 }}>312 leads</span>
      </div>

      {/* Bars */}
      <div className="flex flex-col gap-2 flex-1">
        {FUNNEL_DATA.map(({ label, count, pct, color, conv }, i) => (
          <div key={label}>
            <div className="flex items-center justify-between mb-[3px]">
              <span className="text-[8px] font-medium" style={{ color: INK2 }}>{label}</span>
              <div className="flex items-center gap-2">
                <span className="text-[7px] font-mono" style={{ color: INK3 }}>{conv}</span>
                <span className="text-[8.5px] font-bold tabular-nums" style={{ color: INK }}>{count}</span>
              </div>
            </div>
            <div
              className="relative h-[10px] rounded-md overflow-hidden"
              style={{ background: "rgba(0,0,0,0.05)" }}
            >
              <motion.div
                className="h-full rounded-md"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.9, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: `linear-gradient(90deg,${color},${color}99)`,
                }}
              />
              {/* Shine overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg,rgba(255,255,255,0.2) 0%,transparent 60%)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Win arc + stats */}
      <div
        className="mt-3 pt-3 border-t flex items-center gap-3"
        style={{ borderColor: BORDER }}
      >
        <div className="flex flex-col items-center gap-[3px] shrink-0">
          <WinArc pct={32.8} color={BLUE} />
          <span className="text-[7px] font-medium" style={{ color: INK3 }}>Win Rate</span>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <div>
            <div className="text-[7px] font-mono uppercase tracking-wider mb-[2px]" style={{ color: INK3 }}>
              Conv. Rate
            </div>
            <div className="text-[13px] font-bold leading-none" style={{ color: INK }}>4.5%</div>
          </div>
          <div>
            <div className="text-[7px] font-mono uppercase tracking-wider mb-[2px]" style={{ color: INK3 }}>
              Avg. Cycle
            </div>
            <div className="text-[13px] font-bold leading-none" style={{ color: INK }}>24d</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Stage map ──────────────────────────────────────────────── */
const STAGE_MAP: Record<string, { color: string; bg: string }> = {
  Intent:   { color: BLUE,  bg: BLUE_S  },
  Engaged:  { color: PURP,  bg: PURP_S  },
  Meeting:  { color: AMBER, bg: AMB_S   },
  Proposal: { color: EM,    bg: EM_S    },
  Closed:   { color: TEAL,  bg: TEAL_S  },
};

/* ─── Accounts table ──────────────────────────────────────────── */
const ACCOUNTS = [
  { name: "Acme Corp",    stage: "Meeting",  score: 94, sig: 5, last: "3m",  trend: true,  aColor: EM    },
  { name: "TechFlow Inc", stage: "Intent",   score: 87, sig: 4, last: "12m", trend: true,  aColor: BLUE  },
  { name: "Nordex",       stage: "Engaged",  score: 72, sig: 3, last: "1h",  trend: true,  aColor: PURP  },
  { name: "Vertex AI",    stage: "Proposal", score: 61, sig: 2, last: "3h",  trend: false, aColor: AMBER },
  { name: "Meridian",     stage: "Intent",   score: 55, sig: 2, last: "6h",  trend: false, aColor: INK3  },
];

function AccountsTable() {
  return (
    <motion.div variants={fadeUp} className="rounded-xl overflow-hidden flex flex-col" style={FLAT}>
      {/* Head */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ borderColor: BORDER }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold" style={{ color: INK }}>Hot accounts</span>
          <span
            className="text-[7px] font-bold px-1.5 py-[2px] rounded-full"
            style={{ background: AMB_S, color: AMBER }}
          >
            247 tracked
          </span>
        </div>
        <motion.div
          whileTap={{ scale: 0.92 }}
          className="text-[7.5px] font-bold px-2 py-[3px] rounded-md cursor-default"
          style={{ background: EM_S, color: EM }}
        >
          Filter
        </motion.div>
      </div>

      {/* Col headers */}
      <div
        className="grid gap-1 px-3 py-[6px] border-b text-[7px] font-bold uppercase tracking-wider"
        style={{
          gridTemplateColumns: "1fr 56px 54px 38px 16px",
          borderColor: BORDER,
          color: INK3,
          background: "rgba(0,0,0,0.015)",
        }}
      >
        <span>Account</span>
        <span>Stage</span>
        <span>IQ Score</span>
        <span>Signal</span>
        <span />
      </div>

      {/* Rows */}
      <motion.div variants={stg} initial="hidden" animate="show" className="flex-1">
        {ACCOUNTS.map(({ name, stage, score, sig, last, trend, aColor }, i) => {
          const s = STAGE_MAP[stage];
          const barColor = score > 85 ? EM : score > 70 ? AMBER : INK3;
          return (
            <motion.div
              key={name}
              variants={fadeIn}
              whileHover={{
                backgroundColor: "rgba(0,0,0,0.013)",
                x: 1,
                transition: { duration: 0.12 },
              }}
              className="grid gap-1 items-center px-3 py-[7px] border-b last:border-0 cursor-default"
              style={{ gridTemplateColumns: "1fr 56px 54px 38px 16px", borderColor: BORDER }}
            >
              {/* Account */}
              <div className="flex items-center gap-1.5 min-w-0">
                <div
                  className="rounded text-[7px] font-black text-white flex items-center justify-center shrink-0"
                  style={{ width: 17, height: 17, background: aColor + "d0" }}
                >
                  {name[0]}
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] font-semibold truncate" style={{ color: INK }}>{name}</div>
                  <div className="text-[7px] font-mono" style={{ color: INK3 }}>{last} ago</div>
                </div>
              </div>

              {/* Stage */}
              <div>
                <span
                  className="text-[7px] font-semibold px-1.5 py-[3px] rounded-full whitespace-nowrap"
                  style={{ background: s.bg, color: s.color }}
                >
                  {stage}
                </span>
              </div>

              {/* IQ Score */}
              <div className="flex items-center gap-1">
                <Bar pct={score} color={barColor} delay={0.55 + i * 0.08} />
                <span
                  className="text-[8px] font-bold tabular-nums shrink-0 w-4 text-right"
                  style={{ color: INK2 }}
                >
                  {score}
                </span>
              </div>

              {/* Signal */}
              <div>
                <SignalDots
                  level={sig}
                  color={sig >= 4 ? EM : sig >= 3 ? AMBER : INK3}
                />
              </div>

              {/* Trend */}
              <div className="text-[10px] font-bold" style={{ color: trend ? EM : RED }}>
                {trend ? "↑" : "↓"}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-3 py-[6px] border-t"
        style={{ borderColor: BORDER, background: "rgba(0,0,0,0.012)" }}
      >
        <div className="flex items-center gap-1.5">
          <Pulse color={EM} size={4} />
          <span className="text-[7.5px] font-mono" style={{ color: INK3 }}>Outbound agent running</span>
        </div>
        <span className="text-[7px] font-mono" style={{ color: INK3 }}>Next sync 42s</span>
      </div>
    </motion.div>
  );
}

/* ─── Agent feed ──────────────────────────────────────────────── */
type StatusKey = "done" | "running" | "queued";
const STATUS_MAP: Record<StatusKey, { label: string; color: string; bg: string }> = {
  done:    { label: "DONE",    color: EM,    bg: EM_S  },
  running: { label: "RUNNING", color: AMBER, bg: AMB_S },
  queued:  { label: "QUEUED",  color: INK3,  bg: "rgba(0,0,0,0.05)" },
};

const FEED = [
  { Icon: SendHorizonal, agent: "Reachout-α",   action: "Email → VP Sales · Stripe",    time: "now", color: EM,    status: "running" as StatusKey, result: "Sent · 2.3s"  },
  { Icon: Target,        agent: "Leadfinder-ω", action: "43 accounts scored · fintech", time: "2m",  color: BLUE,  status: "done"    as StatusKey, result: "43 found"     },
  { Icon: RefreshCw,     agent: "Orbit-sync",   action: "CRM updated · 12 records",     time: "5m",  color: PURP,  status: "done"    as StatusKey, result: "12 synced"    },
  { Icon: BrainCircuit,  agent: "Intelligence", action: "Risk flagged · Acme Corp",     time: "9m",  color: AMBER, status: "done"    as StatusKey, result: "Alert sent"   },
  { Icon: CheckCircle2,  agent: "Reachout-β",   action: "2 meetings booked · dormant",  time: "14m", color: EM,    status: "done"    as StatusKey, result: "2 meetings"   },
  { Icon: Bot,           agent: "Agentdesk",    action: "3 sequences ready to launch",  time: "—",   color: INK3,  status: "queued"  as StatusKey, result: "Pending"      },
];

function AgentFeed() {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-xl overflow-hidden flex flex-col"
      style={FLAT}
    >
      {/* Head */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ borderColor: BORDER }}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold" style={{ color: INK }}>Agent log</span>
          <Pulse color={EM} size={5} />
        </div>
        <span
          className="text-[7px] font-bold px-1.5 py-[2px] rounded-full"
          style={{ background: BLUE_S, color: BLUE }}
        >
          6 active
        </span>
      </div>

      {/* Items */}
      <motion.div variants={stg} initial="hidden" animate="show" className="flex-1 flex flex-col">
        {FEED.map(({ Icon, agent, action, time, color, status, result }, i) => {
          const st = STATUS_MAP[status];
          return (
            <motion.div
              key={i}
              variants={fadeIn}
              whileHover={{
                backgroundColor: "rgba(0,0,0,0.013)",
                transition: { duration: 0.12 },
              }}
              className="flex gap-2 items-start px-3 py-2 border-b last:border-0 cursor-default"
              style={{ borderColor: BORDER, opacity: 1 - i * 0.11 }}
            >
              {/* Icon chip */}
              <div
                className="rounded-md flex items-center justify-center shrink-0 mt-[1px]"
                style={{ width: 16, height: 16, background: color + "1c" }}
              >
                <Icon size={8} style={{ color }} />
              </div>

              <div className="flex-1 min-w-0">
                {/* Agent + time */}
                <div className="flex items-baseline justify-between gap-1 mb-[2px]">
                  <span className="text-[8.5px] font-bold" style={{ color }}>{agent}</span>
                  <span className="text-[7px] font-mono shrink-0" style={{ color: INK3 }}>{time}</span>
                </div>
                {/* Action */}
                <div className="text-[7.5px] font-mono truncate mb-[3px]" style={{ color: INK2 }}>
                  {action}
                </div>
                {/* Result + status */}
                <div className="flex items-center justify-between">
                  <span className="text-[7px] font-mono" style={{ color: INK3 }}>{result}</span>
                  <span
                    className="text-[6.5px] font-bold px-1.5 py-[2px] rounded-full"
                    style={{ background: st.bg, color: st.color }}
                  >
                    {st.label}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-3 py-[6px] border-t"
        style={{ borderColor: BORDER, background: "rgba(0,0,0,0.012)" }}
      >
        <span className="text-[7px] font-mono" style={{ color: INK3 }}>
          84,592 actions this week
        </span>
        <Zap size={9} style={{ color: AMBER }} />
      </div>
    </motion.div>
  );
}

/* ─── Hero visual ─────────────────────────────────────────────── */
export function HeroVisual({ interactive = false }: { interactive?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "relative mx-auto mt-8 sm:mt-10 md:mt-12",
        "max-w-3xl float-dashboard origin-top",
        "scale-[0.84] sm:scale-[0.88] md:scale-[0.9]",
        interactive ? "" : "pointer-events-none",
      ].join(" ")}
      aria-hidden
    >
      {/* Ambient glow */}
      <div
        className="absolute -inset-8 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%,rgba(16,185,129,0.08),transparent 68%)",
          filter: "blur(32px)",
        }}
      />

      {/* Shell */}
      <div
        className="relative rounded-2xl overflow-hidden flex flex-col"
        style={{
          fontFamily: FF,
          background: BG,
          border: "1px solid rgba(0,0,0,0.09)",
          boxShadow: [
            "0 2px 4px rgba(0,0,0,0.04)",
            "0 12px 40px rgba(0,0,0,0.09)",
            "0 32px 80px rgba(0,0,0,0.07)",
            "0 0 0 1px rgba(255,255,255,0.76) inset",
          ].join(", "),
          maxHeight: 660,
        }}
      >
        <DotGrid />

        {/* Top green tint */}
        <div
          className="absolute inset-x-0 top-0 h-24 pointer-events-none z-0"
          style={{
            background:
              "linear-gradient(180deg,rgba(16,185,129,0.028) 0%,transparent 100%)",
          }}
        />

        {/* Top nav */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <TopNav />
        </motion.div>

        {/* Main grid */}
        <motion.div
          variants={stg}
          initial="hidden"
          animate="show"
          className="grid grid-cols-12 flex-1 min-h-0 relative z-10"
        >
          <Sidebar />

          {/* Content */}
          <div className="col-span-9 p-3 flex flex-col gap-2.5 min-h-0">
            <SectionHeader />
            <KPICards />

            {/* Chart + funnel row */}
            <motion.div variants={stg} className="grid grid-cols-12 gap-2.5">
              <div className="col-span-7"><PipelineChart /></div>
              <div className="col-span-5"><FunnelPanel /></div>
            </motion.div>

            {/* Accounts + feed row */}
            <motion.div variants={stg} className="grid grid-cols-12 gap-2.5">
              <div className="col-span-7"><AccountsTable /></div>
              <div className="col-span-5"><AgentFeed /></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom fade-out */}
        <div
          className="absolute inset-x-0 bottom-0 h-12 pointer-events-none z-20"
          style={{
            background: `linear-gradient(to top,${BG}f8,transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}
