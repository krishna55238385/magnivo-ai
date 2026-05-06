import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, animate, type Variants } from "framer-motion";
import {
  Bell, Search, TrendingUp, Target, Zap, BarChart2,
  RefreshCw, Radio, Filter,
} from "lucide-react";

/* ─── Design tokens ──────────────────────────────────────────── */
const S  = "#ffffff";
const BG = "#f4f5f9";
const BD = "rgba(0,0,0,0.07)";
const INK  = "#0d1117";
const INK2 = "#4b5563";
const INK3 = "#9ca3af";
const EM    = "#10b981";
const EM_S  = "rgba(16,185,129,0.09)";
const BLUE  = "#3b82f6";
const BL_S  = "rgba(59,130,246,0.09)";
const PURP  = "#8b5cf6";
const AMB   = "#f59e0b";
const RED   = "#ef4444";
const FF    = "'Inter','Helvetica Neue',Arial,system-ui,sans-serif";

/* ─── SVG chart math ─────────────────────────────────────────── */
const CW = 340, CH = 72, CPX = 4;
const YMIN = 0.5, YMAX = 5.0;
function toPt(i: number, n: number, v: number) {
  return {
    x: +(CPX + (i / (n - 1)) * (CW - CPX * 2)).toFixed(1),
    y: +(CH - 4 - ((v - YMIN) / (YMAX - YMIN)) * (CH - 12)).toFixed(1),
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
const ACT = [1.2,1.5,1.4,1.8,2.0,1.9,2.3,2.6,2.8,3.2,3.8,4.2];
const TGT = [1.0,1.3,1.5,1.7,2.0,2.2,2.5,2.8,3.0,3.3,3.7,4.0];
const APT = ACT.map((v,i)=>toPt(i,ACT.length,v));
const TPT = TGT.map((v,i)=>toPt(i,TGT.length,v));
const A_LINE = spline(APT);
const T_LINE = spline(TPT);
const TAIL   = APT[APT.length-1];
const A_FILL = `${A_LINE} L${TAIL.x},${CH} L${CPX},${CH} Z`;
const T_FILL = `${T_LINE} L${TPT[TPT.length-1].x},${CH} L${CPX},${CH} Z`;
const FORECAST_X = APT[9].x;

/* ─── Variants ───────────────────────────────────────────────── */
const fade: Variants = {
  hidden: { opacity: 0, y: 6 },
  show:   { opacity: 1, y: 0, transition: { type:"spring", damping:30, stiffness:340 } },
};
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.22, ease:"easeOut" } },
};

/* ─── Tiny sparkline ─────────────────────────────────────────── */
function Spark({ d, color = BLUE, w = 52, h = 20 }: { d:number[]; color?:string; w?:number; h?:number }) {
  const mx = Math.max(...d), mn = Math.min(...d), rng = mx - mn || 1;
  const pts = d.map((v,i)=>`${(i/(d.length-1))*w},${h-((v-mn)/rng)*(h-3)-1}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <defs>
        <linearGradient id={`sg-${color.replace(/[^a-z0-9]/gi,"")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`${pts} ${w},${h} 0,${h}`} fill={`url(#sg-${color.replace(/[^a-z0-9]/gi,"")})`} />
      <polyline points={pts} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* ─── Ring donut ─────────────────────────────────────────────── */
function Ring({ pct, color, size=36, label }: { pct:number; color:string; size?:number; label?:string }) {
  const r=(size-6)/2, circ=2*Math.PI*r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} stroke="rgba(0,0,0,0.06)" strokeWidth="4" fill="none"/>
      <motion.circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth="4" fill="none"
        strokeDasharray={circ} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ*(1-pct/100) }}
        transition={{ duration: 1.2, delay: 0.4, ease:[0.22,1,0.36,1] }}
      />
      {label && (
        <text x={size/2} y={size/2+3.5} textAnchor="middle" fontSize="8" fontWeight="700"
          fill={INK} fontFamily={FF}>{label}</text>
      )}
    </svg>
  );
}

/* ─── Animated counter ───────────────────────────────────────── */
function Num({ value, prefix="", suffix="", dec=0 }: { value:number; prefix?:string; suffix?:string; dec?:number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once:true });
  useEffect(()=>{
    if (!inView || !ref.current) return;
    const ctrl = animate(0, value, {
      duration: 1.4, ease:[0.22,1,0.36,1],
      onUpdate: v => { if (ref.current) ref.current.textContent = `${prefix}${v.toFixed(dec)}${suffix}`; },
    });
    return ()=>ctrl.stop();
  }, [inView, value, prefix, suffix, dec]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

/* ─── Pill ───────────────────────────────────────────────────── */
function Pill({ label, c="blue" }: { label:string; c?:"blue"|"green"|"amber"|"red"|"purple"|"muted" }) {
  const s: Record<string,string> = {
    blue:`background:${BL_S};color:${BLUE}`,green:`background:${EM_S};color:${EM}`,
    amber:"background:rgba(245,158,11,0.1);color:#d97706",red:"background:rgba(239,68,68,0.1);color:#dc2626",
    purple:"background:rgba(139,92,246,0.1);color:#7c3aed",muted:"background:rgba(0,0,0,0.05);color:#6b7280",
  };
  return (
    <span style={{ display:"inline-block", fontSize:8, fontWeight:700, padding:"2px 6px", borderRadius:99, ...(Object.fromEntries(s[c].split(";").map(p=>p.split(":").map(s=>s.trim())).filter(p=>p.length===2).map(([k,v])=>[k==="background"?"background":k,v]))) }}>
      {label}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VIEW: Revenue
═══════════════════════════════════════════════════════════════ */
function ViewRevenue() {
  const kpis = [
    { label:"Pipeline",  value:4.2,  prefix:"$", suffix:"M", dec:1, delta:"+14%",  color:EM,   spark:[2.1,2.4,2.3,2.8,3.1,3.7,4.2] },
    { label:"Win Rate",  value:32.8, prefix:"",  suffix:"%", dec:1, delta:"+5pp",  color:BLUE, spark:[28,29,30,31,31,32,33] },
    { label:"Meetings",  value:47,   prefix:"",  suffix:"",  dec:0, delta:"+8 wk", color:PURP, spark:[32,35,38,40,43,45,47] },
    { label:"IQ Score",  value:91,   prefix:"",  suffix:"",  dec:0, delta:"Live",  color:AMB,  spark:[74,78,80,82,85,88,91] },
  ];
  const funnel = [
    { label:"Signals",   n:2100, w:100 },
    { label:"Qualified", n:420,  w:20  },
    { label:"Engaged",   n:168,  w:8   },
    { label:"Meetings",  n:47,   w:2.2 },
    { label:"Closed",    n:14,   w:0.7 },
  ];
  const xlabels = ["W1","","W3","","W5","","W7","","W9","","W11",""];
  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden" }}>
      {/* KPI row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", borderBottom:`1px solid ${BD}` }}>
        {kpis.map((k,i) => (
          <div key={k.label} style={{ padding:"8px 10px", borderRight: i<3?`1px solid ${BD}`:"none" }}>
            <div style={{ fontSize:8, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:INK3, marginBottom:3 }}>{k.label}</div>
            <div style={{ fontSize:17, fontWeight:900, color:INK, lineHeight:1 }}>
              <Num value={k.value} prefix={k.prefix} suffix={k.suffix} dec={k.dec} />
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:3 }}>
              <span style={{ fontSize:8, fontWeight:700, color:k.color }}>{k.delta}</span>
              <Spark d={k.spark} color={k.color} w={38} h={14} />
            </div>
          </div>
        ))}
      </div>

      {/* Chart + funnel */}
      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
        {/* Pipeline chart */}
        <div style={{ flex:1, minWidth:0, padding:"8px 10px", borderRight:`1px solid ${BD}` }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
            <span style={{ fontSize:8.5, fontWeight:700, color:INK2 }}>Pipeline vs Target</span>
            <div style={{ display:"flex", gap:8 }}>
              {[{c:EM,l:"Actual"},{c:BLUE,l:"Target"}].map(x=>(
                <div key={x.l} style={{ display:"flex", alignItems:"center", gap:3 }}>
                  <div style={{ width:16, height:2, borderRadius:2, background:x.c }} />
                  <span style={{ fontSize:7.5, color:INK3 }}>{x.l}</span>
                </div>
              ))}
            </div>
          </div>
          <svg width="100%" height={CH} viewBox={`0 0 ${CW} ${CH}`} preserveAspectRatio="none" style={{ display:"block" }}>
            <defs>
              <linearGradient id="hd-ag" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={EM} stopOpacity="0.18" />
                <stop offset="100%" stopColor={EM} stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="hd-tg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={BLUE} stopOpacity="0.1" />
                <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
              </linearGradient>
              <pattern id="hd-stripe" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="5" stroke={AMB} strokeWidth="1" strokeOpacity="0.12" />
              </pattern>
            </defs>
            {/* Forecast zone */}
            <rect x={FORECAST_X} y={0} width={CW-FORECAST_X} height={CH} fill="url(#hd-stripe)" />
            {/* Fills */}
            <motion.path d={T_FILL} fill="url(#hd-tg)" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}} />
            <motion.path d={A_FILL} fill="url(#hd-ag)" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}} />
            {/* Lines */}
            <motion.path d={T_LINE} stroke={BLUE} strokeWidth="1.2" fill="none" strokeDasharray="3 3"
              initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:1.4,delay:0.3,ease:[0.22,1,0.36,1]}} />
            <motion.path d={A_LINE} stroke={EM} strokeWidth="1.8" fill="none"
              initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:1.6,delay:0.2,ease:[0.22,1,0.36,1]}} />
            {/* Forecast label */}
            <motion.text x={FORECAST_X+4} y={10} fontSize="6" fill={AMB} fontWeight="600" fontFamily={FF}
              initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.8}}>Forecast →</motion.text>
            {/* Now dot */}
            <motion.circle cx={TAIL.x} cy={TAIL.y} r="3" fill={S} stroke={EM} strokeWidth="2"
              initial={{scale:0}} animate={{scale:1}} transition={{delay:1.6,type:"spring",stiffness:500,damping:20}} />
          </svg>
          {/* X axis */}
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:2 }}>
            {xlabels.map((l,i)=>(
              <span key={i} style={{ fontSize:6.5, color:l?INK3:"transparent", fontWeight:500 }}>{l||"."}</span>
            ))}
          </div>
        </div>

        {/* Funnel */}
        <div style={{ width:120, flexShrink:0, padding:"8px 10px", display:"flex", flexDirection:"column", gap:4 }}>
          <div style={{ fontSize:8, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:INK3, marginBottom:2 }}>Funnel</div>
          {funnel.map((f,i)=>(
            <div key={f.label}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:2 }}>
                <span style={{ fontSize:8, color:INK2 }}>{f.label}</span>
                <span style={{ fontSize:8, fontWeight:700, color:INK }}>{f.n.toLocaleString()}</span>
              </div>
              <div style={{ height:4, borderRadius:4, background:"rgba(0,0,0,0.06)" }}>
                <motion.div style={{ height:"100%", borderRadius:4, background:BLUE, opacity:1-i*0.12 }}
                  initial={{ width:0 }} animate={{ width:`${f.w}%` }}
                  transition={{ duration:1, delay:0.4+i*0.08, ease:[0.22,1,0.36,1] }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VIEW: Accounts
═══════════════════════════════════════════════════════════════ */
function ViewAccounts() {
  const [sel, setSel] = useState<number|null>(null);
  const [filter, setFilter] = useState(false);
  const all = [
    { name:"Acme Corp",     domain:"acme.com",      icp:97, intent:94, stage:"Ready",   fit:"green" as const, signals:["Hiring VP Sales","Series B raised","Competitor evaluated"] },
    { name:"TechFlow Inc",  domain:"techflow.io",   icp:89, intent:87, stage:"Warm",    fit:"green" as const, signals:["DM active on LinkedIn","3 page visits this week"] },
    { name:"Nordex Group",  domain:"nordex.co",     icp:74, intent:70, stage:"Monitor", fit:"blue" as const,  signals:["Content engaged","Blog subscriber"] },
    { name:"Vertex AI Co",  domain:"vertexai.co",   icp:61, intent:55, stage:"Cold",    fit:"muted" as const, signals:["Job posting only"] },
    { name:"Hexade Labs",   domain:"hexade.io",     icp:82, intent:79, stage:"Warm",    fit:"green" as const, signals:["Pricing page visited","CRO engaged"] },
  ];
  const rows = filter ? all.filter(a=>a.icp>=80) : all;
  const pillColors: Record<string,string> = { Ready:EM, Warm:BLUE, Monitor:AMB, Cold:INK3 };
  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden" }}>
      {/* Toolbar */}
      <div style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 10px", borderBottom:`1px solid ${BD}`, background:"rgba(0,0,0,0.015)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:4, padding:"3px 8px", borderRadius:6, border:`1px solid ${BD}`, background:S, flex:1, maxWidth:160, fontSize:8.5, color:INK3 }}>
          <Search size={8} /> Search accounts…
        </div>
        <button onClick={()=>setFilter(f=>!f)} style={{ padding:"3px 8px", borderRadius:6, border:"none", cursor:"pointer", fontSize:8, fontWeight:700,
          background: filter ? BLUE : BL_S, color: filter ? S : BLUE, transition:"all 0.15s" }}>
          ICP ≥ 80 {filter ? "✓" : ""}
        </button>
        <span style={{ marginLeft:"auto", fontSize:8, color:INK3 }}>{rows.length} accounts</span>
      </div>
      {/* Header */}
      <div style={{ display:"grid", gridTemplateColumns:"2fr 60px 60px 60px 1fr", gap:6, padding:"4px 10px", borderBottom:`1px solid rgba(0,0,0,0.04)`, background:"rgba(0,0,0,0.012)" }}>
        {["Account","ICP","Intent","Stage","Signals"].map(h=>(
          <div key={h} style={{ fontSize:7.5, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:INK3 }}>{h}</div>
        ))}
      </div>
      {/* Rows */}
      <div style={{ flex:1, overflow:"hidden", padding:"4px 6px", display:"flex", flexDirection:"column", gap:2 }}>
        {rows.map((a,i)=>{
          const isS = sel===i;
          return (
            <motion.button key={a.name} onClick={()=>setSel(isS?null:i)} layout
              style={{ display:"grid", gridTemplateColumns:"2fr 60px 60px 60px 1fr", gap:6, alignItems:"center",
                padding:"5px 6px", borderRadius:7, border:`1px solid ${isS?"rgba(16,185,129,0.25)":BD}`,
                background: isS ? EM_S : "rgba(255,255,255,0.8)", cursor:"pointer", textAlign:"left", width:"100%" }}
              whileHover={{ background: isS ? EM_S : "rgba(0,0,0,0.022)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ width:22, height:22, borderRadius:6, background: isS?"rgba(16,185,129,0.15)":"rgba(0,0,0,0.06)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:900,
                  color: isS ? EM : INK3, flexShrink:0 }}>{a.name[0]}</div>
                <div>
                  <div style={{ fontSize:9.5, fontWeight:600, color:INK, lineHeight:1 }}>{a.name}</div>
                  <div style={{ fontSize:7.5, color:INK3 }}>{a.domain}</div>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:3 }}>
                <Ring pct={a.icp} color={a.icp>85?EM:a.icp>70?BLUE:INK3} size={22} />
                <span style={{ fontSize:8, fontWeight:700, color:INK2 }}>{a.icp}</span>
              </div>
              <div>
                <div style={{ height:3, borderRadius:3, background:"rgba(0,0,0,0.06)", marginBottom:1 }}>
                  <motion.div style={{ height:"100%", borderRadius:3, background:a.intent>85?EM:a.intent>70?BLUE:INK3 }}
                    initial={{width:0}} animate={{width:`${a.intent}%`}} transition={{duration:0.8,delay:0.1*i}} />
                </div>
                <span style={{ fontSize:7.5, color:INK3 }}>{a.intent}</span>
              </div>
              <div>
                <span style={{ fontSize:8, fontWeight:700, padding:"2px 5px", borderRadius:99,
                  background:`${pillColors[a.stage]}18`, color:pillColors[a.stage] }}>{a.stage}</span>
              </div>
              <div style={{ overflow:"hidden" }}>
                {isS ? (
                  <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
                    {a.signals.map((s,si)=><span key={si} style={{ fontSize:7.5, color:INK2 }}>· {s}</span>)}
                  </div>
                ) : (
                  <span style={{ fontSize:8, color:BLUE, fontWeight:600, opacity:0.6 }}>{a.signals.length} signals →</span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VIEW: Outreach
═══════════════════════════════════════════════════════════════ */
function ViewOutreach() {
  const [selSeq, setSelSeq] = useState(0);
  const seqs = [
    { name:"Cold Outbound — SaaS Founders", active:48, replied:12, booked:5, rate:25,
      steps:[{n:"D1",l:"Email",done:true},{n:"D3",l:"LinkedIn",done:true},{n:"D7",l:"Email",done:false},{n:"D12",l:"Bump",done:false}],
      spark:[8,10,12,14,18,22,25], status:"live" as const },
    { name:"Re-Engage — Stalled Deals",     active:22, replied:8,  booked:3, rate:36,
      steps:[{n:"D1",l:"Email",done:true},{n:"D5",l:"Phone",done:true},{n:"D10",l:"Email",done:false}],
      spark:[20,25,28,30,32,34,36], status:"live" as const },
    { name:"Champion Follow-up",            active:15, replied:9,  booked:6, rate:60,
      steps:[{n:"D1",l:"Email",done:true},{n:"D4",l:"LinkedIn",done:true},{n:"D8",l:"Gift",done:true}],
      spark:[40,45,50,52,55,58,60], status:"paused" as const },
  ];
  const s = seqs[selSeq];
  return (
    <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
      {/* Sequence list */}
      <div style={{ width:148, flexShrink:0, borderRight:`1px solid ${BD}`, display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"6px 8px 4px", fontSize:7.5, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:INK3, borderBottom:`1px solid ${BD}` }}>Sequences</div>
        {seqs.map((sq,i)=>(
          <button key={i} onClick={()=>setSelSeq(i)}
            style={{ textAlign:"left", padding:"7px 8px", borderBottom:`1px solid rgba(0,0,0,0.04)`, cursor:"pointer", border:"none",
              background: selSeq===i ? BL_S : "transparent", borderLeft: selSeq===i ? `2px solid ${BLUE}` : "2px solid transparent",
              transition:"all 0.15s" }}>
            <div style={{ fontSize:9, fontWeight:600, color:INK, lineHeight:1.3, marginBottom:2 }}>{sq.name}</div>
            <div style={{ display:"flex", alignItems:"center", gap:4 }}>
              <div style={{ width:5, height:5, borderRadius:"50%", background: sq.status==="live" ? EM : AMB, flexShrink:0 }} />
              <span style={{ fontSize:7.5, color:INK3 }}>{sq.active} active · {sq.rate}% reply</span>
            </div>
          </button>
        ))}
      </div>
      {/* Sequence detail */}
      <div style={{ flex:1, minWidth:0, padding:"8px 10px", display:"flex", flexDirection:"column", gap:8 }}>
        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6 }}>
          {[{l:"Active",v:s.active,c:INK},{l:"Replied",v:s.replied,c:BLUE},{l:"Booked",v:s.booked,c:EM}].map(m=>(
            <div key={m.l} style={{ padding:"6px 8px", borderRadius:7, border:`1px solid ${BD}`, background:"rgba(0,0,0,0.015)" }}>
              <div style={{ fontSize:7.5, color:INK3, marginBottom:1 }}>{m.l}</div>
              <div style={{ fontSize:16, fontWeight:900, color:m.c }}>{m.v}</div>
            </div>
          ))}
        </div>
        {/* Step flow */}
        <div>
          <div style={{ fontSize:7.5, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:INK3, marginBottom:5 }}>Step Flow</div>
          <div style={{ display:"flex", alignItems:"center", gap:2 }}>
            {s.steps.map((step,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", flex:1, minWidth:0 }}>
                <div style={{ flex:1, minWidth:0, padding:"5px 6px", borderRadius:7, textAlign:"center",
                  border:`1px solid ${step.done ? EM : BD}`,
                  background: step.done ? EM_S : "rgba(0,0,0,0.015)", cursor:"default" }}>
                  <div style={{ fontSize:8, fontWeight:700, color:step.done?EM:INK3 }}>{step.n}</div>
                  <div style={{ fontSize:7.5, color:step.done?EM:INK2 }}>{step.l}</div>
                  {step.done && <div style={{ fontSize:6, color:EM, marginTop:1 }}>✓ Sent</div>}
                </div>
                {i<s.steps.length-1 && <div style={{ fontSize:9, color:INK3, padding:"0 2px", flexShrink:0 }}>→</div>}
              </div>
            ))}
          </div>
        </div>
        {/* Reply trend */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:"auto" }}>
          <span style={{ fontSize:8, color:INK3 }}>Reply rate trend</span>
          <Spark d={s.spark} color={BLUE} w={80} h={20} />
          <span style={{ fontSize:9, fontWeight:700, color:BLUE }}>↑ {s.rate}%</span>
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:3 }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:EM, animation:"pulse 2s infinite" }} />
            <span style={{ fontSize:7.5, color:INK3 }}>AI sending</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VIEW: Agents
═══════════════════════════════════════════════════════════════ */
function ViewAgents() {
  const [expanded, setExpanded] = useState<number|null>(0);
  const agents = [
    { name:"Outbound Agent",  icon:"🚀", status:"LIVE",   tasks:12, pct:97, color:EM,   log:["Sent 4 emails → Acme Corp","LinkedIn DM → TechFlow CRO","2 follow-ups scheduled"] },
    { name:"Content Agent",   icon:"✍️",  status:"LIVE",   tasks:3,  pct:83, color:BLUE, log:["Drafting LinkedIn post — AI GTM","Email copy v3 ready for review"] },
    { name:"Signal Agent",    icon:"📡",  status:"LIVE",   tasks:247,pct:100,color:PURP, log:["High-intent flag: Acme Corp","Job posting: Nordex Head of Sales","TechFlow pricing page × 3"] },
    { name:"Analyst Agent",   icon:"📊",  status:"DONE",   tasks:8,  pct:100,color:INK3, log:["Weekly revenue report generated","Win/loss analysis complete"] },
    { name:"CRM Sync Agent",  icon:"🔄",  status:"QUEUED", tasks:0,  pct:0,  color:AMB,  log:["Waiting for Outbound Agent output"] },
  ];
  const statusStyle: Record<string,{bg:string,color:string}> = {
    LIVE:  { bg:EM_S, color:EM }, DONE: { bg:"rgba(0,0,0,0.05)", color:INK3 }, QUEUED: { bg:"rgba(245,158,11,0.1)", color:AMB },
  };
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", gap:4, padding:"6px 8px", overflow:"hidden" }}>
      {agents.map((a,i)=>{
        const isEx = expanded===i;
        return (
          <motion.button key={a.name} onClick={()=>setExpanded(isEx?null:i)} layout
            style={{ textAlign:"left", border:`1px solid ${isEx?BD:"rgba(0,0,0,0.04)"}`,
              borderRadius:8, background: isEx ? S : "rgba(0,0,0,0.02)", cursor:"pointer",
              overflow:"hidden", boxShadow: isEx ? "0 1px 4px rgba(0,0,0,0.06)" : "none", transition:"all 0.18s" }}
            whileHover={{ background: isEx ? S : "rgba(0,0,0,0.03)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 10px" }}>
              <span style={{ fontSize:13, lineHeight:1, flexShrink:0 }}>{a.icon}</span>
              <span style={{ fontSize:9.5, fontWeight:600, color:INK, flex:1 }}>{a.name}</span>
              <span style={{ fontSize:7, fontWeight:700, padding:"2px 6px", borderRadius:99,
                background:statusStyle[a.status].bg, color:statusStyle[a.status].color }}>{a.status}</span>
              {a.status==="LIVE" && (
                <div style={{ display:"flex", alignItems:"center", gap:3 }}>
                  <div style={{ width:4, height:4, borderRadius:"50%", background:a.color }} />
                  <span style={{ fontSize:7.5, fontWeight:700, color:a.color }}>{a.tasks}</span>
                </div>
              )}
              {/* Health bar */}
              <div style={{ width:40, height:3, borderRadius:3, background:"rgba(0,0,0,0.08)", flexShrink:0 }}>
                <div style={{ height:"100%", borderRadius:3, background:a.color, width:`${a.pct}%`, transition:"width 0.5s" }} />
              </div>
              <span style={{ fontSize:7.5, color:INK3, width:18, flexShrink:0 }}>{a.pct}%</span>
            </div>
            <AnimatePresence>
              {isEx && (
                <motion.div key="log" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.2}}
                  style={{ borderTop:`1px solid rgba(0,0,0,0.05)`, padding:"5px 10px 7px", overflow:"hidden" }}>
                  {a.log.map((l,li)=>(
                    <div key={li} style={{ display:"flex", alignItems:"center", gap:5, padding:"2px 0" }}>
                      <div style={{ width:4, height:4, borderRadius:"50%", background:a.color, flexShrink:0, opacity:0.7 }} />
                      <span style={{ fontSize:8, color:INK2 }}>{l}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VIEW: Intelligence
═══════════════════════════════════════════════════════════════ */
function ViewIntelligence() {
  const [active, setActive] = useState(0);
  const [sortBy, setSortBy] = useState<"score"|"risk">("score");
  const calls = [
    { name:"Acme Corp — Discovery",  date:"Today 2:30pm", score:82, risk:"Low", riskC:EM,
      summary:"Strong pain fit around pipeline velocity. Budget confirmed $200K. Next: send proposal by Friday.",
      topics:[{l:"Budget: $200K",c:"green"},{l:"Timeline: Q3",c:"blue"},{l:"Champion: CRO",c:"blue"},{l:"Competitor reviewed",c:"amber"}] },
    { name:"TechFlow — Demo Call",   date:"Yesterday",    score:67, risk:"Med", riskC:AMB,
      summary:"Technical questions around agent governance. Security review needed. Stakeholder alignment required before next step.",
      topics:[{l:"Concern: Data",c:"amber"},{l:"Need: Security doc",c:"amber"},{l:"Stakeholder: VP Eng",c:"muted"}] },
    { name:"Nordex — Follow-up",     date:"Mon",          score:45, risk:"High",riskC:RED,
      summary:"Cold response. Decision pushed to Q4. Competitor evaluation underway. Champion may have gone cold.",
      topics:[{l:"Competitor: active",c:"red"},{l:"Timeline: Q4",c:"muted"},{l:"Champion: cold",c:"red"}] },
  ];
  const sorted = [...calls].sort((a,b) => sortBy==="score" ? b.score-a.score : (a.risk==="High"?0:a.risk==="Med"?1:2)-(b.risk==="High"?0:b.risk==="Med"?1:2));
  const c = calls[active];
  return (
    <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
      {/* Call list */}
      <div style={{ width:148, flexShrink:0, borderRight:`1px solid ${BD}`, display:"flex", flexDirection:"column" }}>
        <div style={{ display:"flex", alignItems:"center", gap:4, padding:"5px 8px", borderBottom:`1px solid ${BD}` }}>
          <span style={{ fontSize:7.5, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:INK3, flex:1 }}>Calls</span>
          <button onClick={()=>setSortBy(s=>s==="score"?"risk":"score")}
            style={{ fontSize:7, color:BLUE, fontWeight:700, cursor:"pointer", border:"none", background:"none", padding:0 }}>
            Sort: {sortBy}
          </button>
        </div>
        {sorted.map((c2,i)=>(
          <button key={i} onClick={()=>setActive(calls.indexOf(c2))}
            style={{ textAlign:"left", padding:"7px 8px", borderBottom:`1px solid rgba(0,0,0,0.04)`, cursor:"pointer", border:"none",
              background: calls.indexOf(c2)===active ? BL_S : "transparent",
              borderLeft: calls.indexOf(c2)===active ? `2px solid ${BLUE}` : "2px solid transparent", transition:"all 0.15s" }}>
            <div style={{ fontSize:9, fontWeight:600, color:INK, lineHeight:1.3, marginBottom:2 }}>{c2.name}</div>
            <div style={{ display:"flex", alignItems:"center", gap:4 }}>
              <span style={{ fontSize:7, fontWeight:700, padding:"1px 4px", borderRadius:99, background:`${c2.riskC}18`, color:c2.riskC }}>{c2.risk}</span>
              <span style={{ fontSize:7.5, color:INK3 }}>Score: {c2.score}</span>
            </div>
          </button>
        ))}
      </div>
      {/* Detail */}
      <div style={{ flex:1, minWidth:0, padding:"8px 10px", display:"flex", flexDirection:"column", gap:6, overflow:"hidden" }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
          <span style={{ fontSize:10, fontWeight:700, color:INK, flex:1 }}>{c.name}</span>
          <span style={{ fontSize:7.5, color:INK3 }}>{c.date}</span>
          <span style={{ fontSize:7.5, fontWeight:700, padding:"2px 6px", borderRadius:99, background:`${c.riskC}18`, color:c.riskC }}>Risk: {c.risk}</span>
          <span style={{ fontSize:7.5, fontWeight:700, padding:"2px 6px", borderRadius:99, background:BL_S, color:BLUE }}>Score: {c.score}</span>
        </div>
        <div style={{ fontSize:9, color:INK2, lineHeight:1.6, background:"rgba(0,0,0,0.02)", borderRadius:7, padding:"7px 9px", border:`1px solid ${BD}` }}>{c.summary}</div>
        <div style={{ fontSize:7.5, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:INK3 }}>Key Topics</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
          {c.topics.map((t,i)=><Pill key={i} label={t.l} c={t.c as any} />)}
        </div>
        {/* Sentiment */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:"auto" }}>
          <span style={{ fontSize:8, color:INK3 }}>Sentiment</span>
          <div style={{ flex:1, height:4, borderRadius:4, background:"rgba(0,0,0,0.06)" }}>
            <motion.div style={{ height:"100%", borderRadius:4,
              background: c.score>70?EM:c.score>50?BLUE:RED }}
              initial={{width:0}} animate={{width:`${c.score}%`}} transition={{duration:0.9,ease:[0.22,1,0.36,1]}} />
          </div>
          <span style={{ fontSize:9, fontWeight:700, color:INK2 }}>{c.score}%</span>
        </div>
        <div style={{ display:"flex", gap:6 }}>
          <button style={{ flex:1, padding:"5px", borderRadius:7, border:`1px solid ${BD}`, background:"rgba(0,0,0,0.02)", fontSize:8, fontWeight:600, color:INK2, cursor:"pointer" }}>View Transcript</button>
          <button style={{ flex:1, padding:"5px", borderRadius:7, border:"none", background:BLUE, fontSize:8, fontWeight:700, color:S, cursor:"pointer" }}>Next Step →</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VIEW: Reports
═══════════════════════════════════════════════════════════════ */
function ViewReports() {
  const [period, setPeriod] = useState<"7d"|"30d"|"90d">("30d");
  const channels = [
    { name:"Outbound Email", pct:42, val:"$1.76M", color:BLUE,  spark:[28,32,35,38,40,41,42] },
    { name:"LinkedIn",       pct:28, val:"$1.18M", color:PURP,  spark:[18,20,22,24,25,27,28] },
    { name:"Content / SEO",  pct:18, val:"$756K",  color:EM,    spark:[10,11,13,14,15,17,18] },
    { name:"Paid",           pct:12, val:"$504K",  color:AMB,   spark:[8,9,9,10,11,11,12]   },
  ];
  const winLoss = [{ l:"Won",pct:33,c:EM},{l:"Lost",pct:47,c:RED},{l:"Stalled",pct:20,c:AMB}];
  return (
    <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
      {/* Attribution */}
      <div style={{ flex:1, minWidth:0, padding:"8px 10px", borderRight:`1px solid ${BD}`, display:"flex", flexDirection:"column", gap:6 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ fontSize:8, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:INK3, flex:1 }}>Attribution</span>
          <div style={{ display:"flex", gap:2 }}>
            {(["7d","30d","90d"] as const).map(p=>(
              <button key={p} onClick={()=>setPeriod(p)}
                style={{ padding:"2px 7px", borderRadius:6, border:"none", cursor:"pointer", fontSize:8, fontWeight:700,
                  background: period===p ? BLUE : "transparent", color: period===p ? S : INK3, transition:"all 0.15s" }}>{p}</button>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
          {channels.map(ch=>(
            <div key={ch.name}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:2 }}>
                <span style={{ fontSize:9, color:INK2 }}>{ch.name}</span>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <Spark d={ch.spark} color={ch.color} w={36} h={14} />
                  <span style={{ fontSize:9, fontWeight:700, color:ch.color }}>{ch.val}</span>
                </div>
              </div>
              <div style={{ height:5, borderRadius:4, background:"rgba(0,0,0,0.06)" }}>
                <motion.div style={{ height:"100%", borderRadius:4, background:ch.color }}
                  initial={{width:0}} animate={{width:`${ch.pct}%`}} transition={{duration:1,delay:0.1,ease:[0.22,1,0.36,1]}} />
              </div>
              <span style={{ fontSize:7.5, color:INK3 }}>{ch.pct}% of pipeline</span>
            </div>
          ))}
        </div>
      </div>
      {/* Win/Loss */}
      <div style={{ width:120, flexShrink:0, padding:"8px 10px", display:"flex", flexDirection:"column", gap:8 }}>
        <span style={{ fontSize:8, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:INK3 }}>Win/Loss</span>
        <div style={{ display:"flex", justifyContent:"center" }}>
          <Ring pct={33} color={EM} size={52} label="33%" />
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
          {winLoss.map(w=>(
            <div key={w.l}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:2 }}>
                <span style={{ fontSize:8, color:INK2 }}>{w.l}</span>
                <span style={{ fontSize:8, fontWeight:700, color:w.c }}>{w.pct}%</span>
              </div>
              <div style={{ height:3, borderRadius:3, background:"rgba(0,0,0,0.06)" }}>
                <motion.div style={{ height:"100%", borderRadius:3, background:w.c }}
                  initial={{width:0}} animate={{width:`${w.pct}%`}} transition={{duration:0.9,ease:[0.22,1,0.36,1]}} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LIVE FEED (right panel)
═══════════════════════════════════════════════════════════════ */
const FEED_EVENTS = [
  { type:"Agent",  msg:"Email sent → Acme Corp CRO",          color:BLUE, ago:"1m"  },
  { type:"Signal", msg:"High-intent: TechFlow visiting pricing",color:EM,  ago:"3m"  },
  { type:"Deal",   msg:"Stripe Ent. moved → Proposal",         color:AMB, ago:"7m"  },
  { type:"Agent",  msg:"LinkedIn DM sent → Nordex VP Sales",   color:BLUE,ago:"12m" },
  { type:"Signal", msg:"Job posting: Head of Revenue @ Hexade", color:EM, ago:"18m" },
  { type:"Agent",  msg:"CRM updated — 3 fields auto-logged",   color:PURP,ago:"24m" },
  { type:"Deal",   msg:"Acme Corp — meeting confirmed Fri 3pm", color:EM, ago:"31m" },
  { type:"Signal", msg:"Content engaged: Linear Inc (3 visits)",color:AMB,ago:"40m" },
];

function LiveFeed({ compact = false }: { compact?: boolean }) {
  const [items, setItems] = useState(FEED_EVENTS.slice(0, 6));
  useEffect(() => {
    const id = setInterval(() => {
      setItems(prev => {
        const next = { ...FEED_EVENTS[Math.floor(Math.random()*FEED_EVENTS.length)], ago:"just now" };
        return [next, ...prev.slice(0,5)];
      });
    }, 3800);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
      <div style={{ padding: compact?"5px 8px":"6px 10px", borderBottom:`1px solid ${BD}`,
        display:"flex", alignItems:"center", gap:4 }}>
        <div style={{ width:5, height:5, borderRadius:"50%", background:EM, animation:"pulse 2s infinite" }} />
        <span style={{ fontSize:8, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:INK3 }}>Live</span>
      </div>
      <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column", gap:0 }}>
        <AnimatePresence initial={false}>
          {items.map((ev, i) => (
            <motion.div key={`${ev.msg}-${i}`}
              initial={{ opacity:0, y:-8, height:0 }} animate={{ opacity:1, y:0, height:"auto" }} exit={{ opacity:0, height:0 }}
              transition={{ duration:0.28 }}
              style={{ padding:"5px 8px", borderBottom:`1px solid rgba(0,0,0,0.03)`, display:"flex", gap:5, alignItems:"flex-start", overflow:"hidden" }}>
              <div style={{ width:5, height:5, borderRadius:"50%", background:ev.color, marginTop:3, flexShrink:0 }} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:7.5, fontWeight:700, color:ev.color, marginBottom:1 }}>{ev.type}</div>
                <div style={{ fontSize:8, color:INK2, lineHeight:1.3 }}>{ev.msg}</div>
              </div>
              <span style={{ fontSize:7, color:INK3, flexShrink:0 }}>{ev.ago}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SIDEBAR NAV
═══════════════════════════════════════════════════════════════ */
type Tab = "Revenue"|"Accounts"|"Outreach"|"Agents"|"Intelligence"|"Reports";
const TABS: Tab[] = ["Revenue","Accounts","Outreach","Agents","Intelligence","Reports"];
const TAB_ICONS: Record<Tab, React.ReactNode> = {
  Revenue: <TrendingUp size={10}/>, Accounts: <Target size={10}/>, Outreach: <Zap size={10}/>,
  Agents: <RefreshCw size={10}/>, Intelligence: <Radio size={10}/>, Reports: <BarChart2 size={10}/>,
};
const TAB_URL: Record<Tab,string> = {
  Revenue:"revenue", Accounts:"accounts", Outreach:"outreach", Agents:"agents", Intelligence:"intelligence", Reports:"reports",
};

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════ */
export function HomeDashboard() {
  const [tab, setTab] = useState<Tab>("Revenue");
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  const views: Record<Tab, React.ReactNode> = {
    Revenue: <ViewRevenue />,
    Accounts: <ViewAccounts />,
    Outreach: <ViewOutreach />,
    Agents: <ViewAgents />,
    Intelligence: <ViewIntelligence />,
    Reports: <ViewReports />,
  };

  return (
    <motion.div ref={containerRef}
      initial={{ opacity:0, scale:0.97, y:14 }}
      animate={inView ? { opacity:1, scale:1, y:0 } : {}}
      transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
      className="relative mx-auto mt-8 sm:mt-12 md:mt-16 max-w-4xl scale-[0.82] sm:scale-[0.88] md:scale-[0.92] origin-top pointer-events-auto"
      aria-hidden
      style={{ fontFamily: FF }}
    >
      {/* Ambient glow */}
      <div className="absolute -inset-10 rounded-3xl pointer-events-none"
        style={{ background:"radial-gradient(ellipse at 50% 50%,rgba(59,130,246,0.07),rgba(16,185,129,0.05),transparent 68%)", filter:"blur(40px)" }} />

      {/* Shell — matches platform DashboardUI */}
      <div className="w-full rounded-xl border border-border bg-white overflow-hidden select-none"
        style={{ boxShadow:"0 2px 4px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.06),0 24px 48px rgba(0,0,0,0.06)" }}>

        {/* Chrome bar */}
        <div className="flex items-center gap-3 px-3 py-2 border-b border-border/50 bg-secondary">
          <div className="flex gap-1.5 shrink-0">
            {["#ff5f57","#febc2e","#28c840"].map((c,i)=>(
              <div key={i} style={{ background:c }} className="w-2.5 h-2.5 rounded-full" />
            ))}
          </div>
          <div className="flex-1 flex justify-center min-w-0">
            <div className="bg-white border border-border/60 rounded px-2 py-0.5 text-[9px] text-muted-foreground font-medium flex items-center gap-1.5 max-w-[220px] overflow-hidden transition-all duration-200">
              <div className="w-1 h-1 rounded-full bg-[var(--accent-green)] animate-pulse shrink-0" />
              <span className="truncate">app.magnivo.ai/{TAB_URL[tab]}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <div className="w-4 h-4 rounded flex items-center justify-center bg-border/30 cursor-pointer hover:bg-border/60 transition-colors">
              <Bell size={8} className="text-muted-foreground" />
            </div>
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-black text-white"
              style={{ background:"linear-gradient(135deg,#667eea,#764ba2)" }}>K</div>
          </div>
        </div>

        {/* Tab strip */}
        <div className="flex border-b border-border/50 bg-secondary/30 overflow-x-auto">
          {TABS.map(t=>{
            const active = tab===t;
            return (
              <button key={t} onClick={()=>setTab(t)}
                className={`relative flex-shrink-0 flex items-center gap-1.5 px-3 py-2 text-[9.5px] font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap
                  ${active ? "text-foreground bg-white border-b-2 border-[var(--accent-blue)]" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"}`}>
                <span className={active ? "text-[var(--accent-blue)]" : ""}>{TAB_ICONS[t]}</span>
                {t}
              </button>
            );
          })}
        </div>

        {/* View body */}
        <div className="flex" style={{ height:272 }}>

          {/* Sidebar */}
          <div className="hidden sm:flex w-32 shrink-0 border-r border-border/30 bg-secondary/50 flex-col p-2 gap-0.5">
            <div className="px-1.5 py-1 text-[7.5px] font-bold tracking-[0.18em] text-muted-foreground uppercase mb-0.5">Modules</div>
            {TABS.map(t=>{
              const active = tab===t;
              return (
                <button key={t} onClick={()=>setTab(t)}
                  className={`w-full text-left px-2 py-1.5 rounded-md text-[9px] font-medium flex items-center gap-1.5 transition-all duration-150 cursor-pointer
                    ${active ? "bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]" : "text-muted-foreground hover:bg-border/30 hover:text-foreground"}`}>
                  <span className={active ? "text-[var(--accent-blue)]" : ""}>{TAB_ICONS[t]}</span>
                  {t}
                </button>
              );
            })}
            <div className="mt-auto pt-2 border-t border-border/30">
              <div className="px-2 py-1.5 rounded-md bg-[var(--accent-green)]/10 text-[var(--accent-green)] text-[8.5px] font-semibold flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-[var(--accent-green)] animate-pulse shrink-0" />
                4 Agents Live
              </div>
            </div>
          </div>

          {/* Content pane */}
          <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div key={tab}
                initial={{ opacity:0, y:5 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-5 }}
                transition={{ duration:0.18, ease:"easeOut" }}
                style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden" }}>
                {views[tab]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Live feed */}
          <div className="hidden md:block w-36 shrink-0 border-l border-border/30 overflow-hidden bg-secondary/20">
            <LiveFeed />
          </div>
        </div>

        {/* Status bar */}
        <div className="px-3 py-1.5 border-t border-border/40 bg-secondary/60 flex items-center gap-3 overflow-hidden">
          <div className="flex items-center gap-1 text-[8.5px] text-muted-foreground shrink-0">
            <div className="w-1 h-1 rounded-full bg-[var(--accent-blue)] animate-pulse" />Outbound running
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[8.5px] text-muted-foreground shrink-0">
            <div className="w-1 h-1 rounded-full bg-[var(--accent-green)] animate-pulse" />Content drafting
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[8.5px] text-muted-foreground shrink-0">
            <div className="w-1 h-1 rounded-full bg-purple-400 animate-pulse" />247 accounts watched
          </div>
          <div className="ml-auto text-[8.5px] text-muted-foreground/50 shrink-0">Sync in 58s</div>
        </div>
      </div>
    </motion.div>
  );
}
