import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Check, X, Database, BrainCircuit, Zap,
  Target, RefreshCw, Search, Cpu, Briefcase, Rocket, BarChart2,
  Globe, TrendingUp, Activity, Bell, Shield, Sparkles, Plus, Minus,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { DemoModal } from "@/components/DemoModal";
import { FadeIn } from "@/components/FadeIn";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "The GTM Operating System — Magnivo.ai" },
      { name: "description", content: "One platform that unifies data, intelligence, and autonomous execution into a compounding B2B revenue engine. Used by B2B founders scaling to Series B." },
    ],
  }),
  component: PlatformPage,
});

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setP(total > 0 ? el.scrollTop / total : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return p;
}

function CountUp({
  to, prefix = "", suffix = "", decimals = 0, duration = 1800,
}: { to: number; prefix?: string; suffix?: string; decimals?: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let t0: number | null = null;
        const tick = (now: number) => {
          if (!t0) t0 = now;
          const progress = Math.min((now - t0) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setVal(parseFloat((ease * to).toFixed(decimals)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration, decimals]);
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}

// ─── Page Shell ───────────────────────────────────────────────────────────────

function PlatformPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const open = () => setDemoOpen(true);
  const scrollY = useScrollY();
  const progress = useScrollProgress();
  const ctaRef = useRef<HTMLElement>(null);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setCtaVisible(e.isIntersecting), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const showFloat = scrollY > 500 && !ctaVisible;

  return (
    <SiteLayout>
      {/* Scroll progress bar */}
      <div className="fixed top-0 inset-x-0 h-[2px] z-[60] bg-transparent">
        <div
          className="h-full transition-none"
          style={{ width: `${progress * 100}%`, background: "linear-gradient(90deg, var(--accent-blue), var(--accent-green))" }}
        />
      </div>

      {/* Floating CTA — desktop only */}
      <div className={`hidden lg:flex fixed bottom-8 right-8 z-50 transition-all duration-300 ${showFloat ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        <button
          onClick={open}
          className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[var(--accent-blue)] text-white text-sm font-semibold shadow-[0_8px_32px_-4px_color-mix(in_oklab,var(--accent-blue)_60%,transparent)] hover:brightness-110 transition-all"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Book Free GTM Audit
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="bg-background text-foreground overflow-x-clip">
        <HeroSection onAudit={open} />
        <TrustBar />
        <TickerBar />
        <ProblemSection onAudit={open} />
        <LayerSection />
        <BentoSection />
        <PipelineSection />
        <TestimonialsSection />
        <MetricsSection onAudit={open} />
        <CaseStudySection />
        <IntegrationsSection />
        <CompareSection />
        <PersonasSection />
        <FaqSection />
        <CtaSection onAudit={open} ctaRef={ctaRef} />
      </div>
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </SiteLayout>
  );
}

// ─── 1. HERO ─────────────────────────────────────────────────────────────────

function DashboardUI() {
  const rows = [
    { name: "Acme Corp",    score: 94, tag: "High Intent",           hot: true  },
    { name: "TechFlow Inc", score: 87, tag: "Decision Maker Active", hot: true  },
    { name: "Nordex",       score: 72, tag: "Content Engaged",       hot: false },
    { name: "Vertex AI",    score: 61, tag: "Job Posting Signal",    hot: false },
  ];

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_12px_56px_-16px_rgba(0,0,0,0.1),0_4px_16px_-4px_rgba(0,0,0,0.06)]">
      {/* Chrome */}
      <div className="flex items-center gap-3 px-3 sm:px-4 py-2.5 border-b border-slate-100 bg-slate-50">
        <div className="flex gap-1.5 shrink-0">
          {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
            <div key={i} style={{ background: c }} className="w-2.5 h-2.5 rounded-full opacity-50" />
          ))}
        </div>
        <div className="flex-1 flex justify-center min-w-0">
          <div className="bg-white border border-slate-200 rounded-md px-2 sm:px-3 py-1 text-[10px] sm:text-[11px] text-slate-400 font-mono flex items-center gap-2 max-w-full overflow-hidden">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse shrink-0" />
            <span className="truncate">app.magnivo.ai / accounts</span>
          </div>
        </div>
      </div>

      {/* App body */}
      <div className="flex" style={{ height: 320 }}>
        {/* Sidebar — hidden on mobile */}
        <div className="hidden sm:flex w-36 lg:w-40 shrink-0 border-r border-slate-100 bg-slate-50/80 flex-col p-3 gap-0.5">
          <div className="px-2 py-1 text-[9px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-1">Workspace</div>
          {[
            { label: "Dashboard", active: false },
            { label: "Accounts",  active: true  },
            { label: "Pipeline",  active: false },
            { label: "AI Agents", active: false },
            { label: "Analytics", active: false },
          ].map((item) => (
            <div key={item.label} className={`px-2.5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 cursor-default ${item.active ? "bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]" : "text-slate-400"}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${item.active ? "bg-[var(--accent-blue)]" : "bg-slate-200"}`} />
              {item.label}
            </div>
          ))}
          <div className="mt-auto pt-3 border-t border-slate-100">
            <div className="px-2.5 py-2 rounded-lg bg-[var(--accent-green)]/10 text-[var(--accent-green)] text-xs font-semibold flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
              4 Agents Live
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="px-3 sm:px-4 py-2.5 border-b border-slate-100 flex items-center justify-between bg-white">
            <div>
              <div className="text-sm font-semibold text-slate-800">Account Intelligence</div>
              <div className="text-[11px] text-slate-400 mt-0.5">247 tracked · synced 2m ago</div>
            </div>
            <div className="flex gap-2">
              <div className="px-2.5 py-1 rounded-md bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] text-xs font-semibold">Filter</div>
              <div className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-400 text-xs hidden sm:block">Export</div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-2 px-3 sm:px-4 py-2 border-b border-slate-50">
            {["Company", "Signal", "Score", ""].map((h, i) => (
              <div key={i} className={`text-[10px] font-bold uppercase tracking-wider text-slate-400 ${i === 0 ? "col-span-4" : i === 1 ? "col-span-5" : i === 2 ? "col-span-2" : "col-span-1"}`}>{h}</div>
            ))}
          </div>

          <div className="flex-1 p-2 space-y-1 overflow-hidden">
            {rows.map((r, i) => (
              <div key={r.name} className={`grid grid-cols-12 gap-2 items-center px-2.5 py-2 rounded-lg ${i === 0 ? "bg-[var(--accent-blue)]/6 border border-[var(--accent-blue)]/15" : "bg-slate-50/80 border border-slate-100"}`}>
                <div className="col-span-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500 shrink-0">{r.name[0]}</div>
                  <span className="text-xs font-medium text-slate-700 truncate">{r.name}</span>
                </div>
                <div className="col-span-5">
                  <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${r.hot ? "bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]" : "bg-slate-100 text-slate-400"}`}>{r.tag}</span>
                </div>
                <div className="col-span-2 flex items-center gap-1.5">
                  <div className="flex-1 h-1 rounded-full bg-slate-200">
                    <div className="h-full rounded-full" style={{ width: `${r.score}%`, background: r.score > 85 ? "var(--accent-green)" : r.score > 70 ? "var(--accent-blue)" : "#cbd5e1" }} />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold w-5 shrink-0">{r.score}</span>
                </div>
                <div className="col-span-1">
                  {i === 0 && <div className="px-1.5 py-1 rounded bg-[var(--accent-blue)] text-white text-[9px] font-bold text-center">→</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="px-3 sm:px-4 py-2 border-t border-slate-100 bg-slate-50/60 flex items-center gap-3 overflow-hidden">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] animate-pulse" />
              Outbound agent active
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-slate-400 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
              Content agent running
            </div>
            <div className="ml-auto text-[10px] text-slate-300 shrink-0">Sync in 58s</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection({ onAudit }: { onAudit: () => void }) {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Subtle mesh */}
      <div className="absolute inset-0 dot-grid opacity-[0.035]" aria-hidden />
      <div className="absolute -top-40 -left-20 w-[700px] h-[600px] rounded-full opacity-[0.12] blur-[120px] pointer-events-none" style={{ background: "radial-gradient(circle, var(--accent-blue), transparent 70%)" }} />
      <div className="absolute top-20 right-0 w-[500px] h-[400px] rounded-full opacity-[0.08] blur-[100px] pointer-events-none" style={{ background: "radial-gradient(circle, var(--accent-green), transparent 70%)" }} />

      <div className="container-x relative py-16 sm:py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <FadeIn>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-blue)]/20 bg-[var(--accent-blue)]/6 px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] uppercase text-[var(--accent-blue)] mb-7">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] animate-pulse" />
                The Magnivo Platform
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tighter leading-[0.92] text-foreground">
                The GTM<br />
                <span className="text-gradient">Operating System.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mt-6 text-base sm:text-lg text-foreground/55 leading-relaxed max-w-lg">
                One platform that unifies your revenue stack — data, intelligence, and autonomous execution — into a single compounding growth engine. Built for B2B teams serious about scale.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button onClick={onAudit} className="btn-primary w-full sm:w-auto justify-center px-7 py-3.5 text-sm">
                  Get Your Free Blueprint <ArrowRight size={15} />
                </button>
                <a href="#platform-layers" className="btn-ghost w-full sm:w-auto justify-center px-7 py-3.5 text-sm">
                  See How It Works
                </a>
              </div>
              <p className="mt-3 text-xs text-foreground/35">No pitch. No commitment. Just clarity on your GTM gaps.</p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-6 sm:gap-8 border-t border-border pt-7">
                {[
                  { val: "3.4x", label: "Pipeline Lift" },
                  { val: "60%",  label: "Lower CAC"     },
                  { val: "10d",  label: "Time to Live"  },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-black text-foreground">{s.val}</div>
                    <div className="text-[11px] text-foreground/40 mt-0.5 uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right: Dashboard */}
          <FadeIn delay={0.12} y={24}>
            {/* Mobile stat cards */}
            <div className="sm:hidden grid grid-cols-2 gap-3">
              {[
                { val: "247", label: "Accounts tracked", c: "var(--accent-blue)"   },
                { val: "94",  label: "Top intent score",  c: "var(--accent-green)"  },
                { val: "4",   label: "Agents running",    c: "oklch(0.60 0.18 300)" },
                { val: "2m",  label: "Last data sync",    c: "var(--accent-blue)"   },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-slate-200 bg-white shadow-sm p-4">
                  <div className="text-2xl font-black mb-1" style={{ color: s.c }}>{s.val}</div>
                  <div className="text-[11px] text-foreground/40 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
            {/* Full dashboard on sm+ */}
            <div className="hidden sm:block">
              <DashboardUI />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── 2. TRUST BAR ────────────────────────────────────────────────────────────

function TrustBar() {
  return (
    <div className="bg-slate-50 border-y border-slate-100 py-5 px-4">
      <div className="container-x">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-400 shrink-0">Trusted by founders at</p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2">
            {["Meridian SaaS", "Stackline", "Orbita Growth", "Hexade", "Forta Labs"].map((co) => (
              <span key={co} className="text-sm font-semibold text-slate-400">{co}</span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1l1.236 2.506L10 3.9l-2 1.95.472 2.748L6 7.25 3.528 8.598 4 5.85 2 3.9l2.764-.394L6 1z" fill="#f59e0b" />
              </svg>
            ))}
            <span className="text-[11px] text-slate-400 ml-1">5.0 avg satisfaction</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. TICKER ────────────────────────────────────────────────────────────────

function TickerBar() {
  const pills = [
    "Account Intelligence", "Intent Signals", "Pipeline Automation", "AI Outbound",
    "CRM Hygiene", "Buying Signals", "Revenue Attribution", "AEO + GEO",
    "Agent Orchestration", "Churn Prevention", "Multi-touch Attribution", "Lead Scoring",
  ];
  const doubled = [...pills, ...pills];
  return (
    <div className="bg-white border-b border-slate-100 py-3.5 overflow-hidden">
      <div className="flex w-max" style={{ animation: "ticker-scroll 40s linear infinite" }}>
        {doubled.map((p, i) => (
          <div key={i} className="flex items-center gap-3 px-4 shrink-0">
            <div className="w-1 h-1 rounded-full bg-[var(--accent-blue)]/40" />
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap">{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 4. PROBLEM ───────────────────────────────────────────────────────────────

function ProblemSection({ onAudit }: { onAudit: () => void }) {
  return (
    <section className="py-20 sm:py-24 md:py-32 bg-background border-b border-border">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          <FadeIn>
            <div className="label-eyebrow mb-4">THE PROBLEM</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.0]">
              Your tools don't talk.<br />
              <span className="text-gradient">Your pipeline suffers.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-foreground/60 leading-relaxed">
              The average B2B revenue team runs 12+ tools. None of them share intelligence. Your team becomes the middleware — manually copying data, chasing signals, and guessing at priority. That's not a tools problem. It's a systems problem.
            </p>
            <div className="mt-8 space-y-3.5">
              {[
                "Outreach fires blind — no account intelligence layer",
                "Intent signals sit in one tool, action happens in another",
                "CRM data is stale the moment it's entered",
                "Pipeline forecasting is a gut-feel exercise",
                "Churn happens because no one saw the signals",
              ].map((pain, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <X size={11} className="text-red-500" />
                  </div>
                  <span className="text-sm text-foreground/65 leading-relaxed">{pain}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <button onClick={onAudit} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-blue)] hover:gap-3 transition-all">
                See what a unified system looks like <ArrowRight size={14} />
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative rounded-2xl border border-border bg-slate-50/70 p-7 sm:p-8 overflow-hidden shadow-sm">
              <div className="absolute inset-0 dot-grid opacity-[0.05]" />
              <div className="relative">
                <div className="text-[10px] font-bold tracking-widest uppercase text-foreground/30 mb-5">A typical B2B tech stack</div>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { name: "HubSpot",    cat: "CRM"         },
                    { name: "Apollo",     cat: "Prospecting" },
                    { name: "6sense",     cat: "Intent"      },
                    { name: "Outreach",   cat: "Sequences"   },
                    { name: "Clay",       cat: "Enrichment"  },
                    { name: "Salesforce", cat: "CRM"         },
                    { name: "Clearbit",   cat: "Data"        },
                    { name: "Marketo",    cat: "Marketing"   },
                    { name: "Gong",       cat: "Calls"       },
                  ].map((t, i) => (
                    <div key={i} className="px-3 py-2.5 rounded-xl border border-red-100 bg-white shadow-sm text-center">
                      <div className="text-xs font-semibold text-foreground/70">{t.name}</div>
                      <div className="text-[10px] text-foreground/35 mt-0.5">{t.cat}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center gap-3 py-3 rounded-xl border border-red-100 bg-red-50/70">
                  <X size={13} className="text-red-500/80" />
                  <span className="text-xs font-semibold text-red-600/70">9 tools. Zero shared intelligence.</span>
                </div>
                <div className="mt-4 p-3.5 rounded-xl border border-[var(--accent-green)]/30 bg-[var(--accent-green)]/5">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center text-background text-[11px] font-black">M</div>
                    <span className="text-xs font-bold text-foreground">Magnivo replaces this with one system</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Data", "Intelligence", "Execution", "Attribution"].map((t) => (
                      <span key={t} className="text-[10px] bg-[var(--accent-green)]/15 text-[var(--accent-green)] font-semibold px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── 5. THREE LAYERS (Tabs) ───────────────────────────────────────────────────

const LAYERS = [
  {
    id: "data", num: "01", label: "Ground Truth", color: "var(--accent-blue)", icon: Database,
    headline: "Every revenue signal. One clean graph.",
    body: "We unify your CRM, intent data, web activity, and enrichment sources into a single live customer graph. No more fragmented views. One truth that every decision is built on.",
    features: ["CRM sync & automated hygiene", "Buying intent signal ingestion", "Web visitor identification", "Contact & account enrichment", "Multi-source attribution", "Firmographic data layer"],
    visual: (
      <div className="space-y-2.5">
        {[{ src: "HubSpot CRM", pct: 100, c: "var(--accent-blue)" }, { src: "6sense Intent", pct: 92, c: "var(--accent-green)" }, { src: "Clearbit", pct: 88, c: "var(--accent-blue)" }, { src: "Web Events", pct: 76, c: "oklch(0.60 0.18 300)" }].map((s) => (
          <div key={s.src} className="flex items-center gap-3">
            <div className="text-xs text-foreground/50 w-28 shrink-0 truncate">{s.src}</div>
            <div className="flex-1 h-1.5 rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.c }} /></div>
            <div className="text-[10px] text-foreground/40 w-6 text-right">{s.pct}%</div>
          </div>
        ))}
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <span className="text-xs text-foreground/40">Sources unified</span>
          <span className="text-sm font-black text-foreground">4 / 4 ✓</span>
        </div>
      </div>
    ),
  },
  {
    id: "intel", num: "02", label: "Intelligence", color: "var(--accent-green)", icon: BrainCircuit,
    headline: "The AI that decides what happens next.",
    body: "Our models score every account, predict the optimal time to reach out, map buying committees, and surface the single next best action — for every account, in real-time, automatically.",
    features: ["AI-powered account fit scoring", "Buying timing prediction", "Next best action engine", "Buying committee mapping", "Churn risk early warning", "Opportunity prioritisation"],
    visual: (
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-1"><span className="text-xs text-foreground/50">Acme Corp</span><span className="text-xs font-black text-[var(--accent-green)]">Score 94 ↑</span></div>
        <div className="p-3.5 rounded-xl border border-[var(--accent-green)]/25 bg-[var(--accent-green)]/6">
          <div className="text-[10px] text-[var(--accent-green)] font-bold uppercase tracking-wider mb-2">Next Best Action</div>
          <div className="text-sm text-foreground font-medium leading-snug">Trigger outbound sequence — pricing page visited 3× this week by VP Sales</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[{ label: "Fit Score", val: "94" }, { label: "Intent Level", val: "High" }, { label: "Stage", val: "Evaluate" }, { label: "Confidence", val: "97%" }].map((m) => (
            <div key={m.label} className="bg-slate-50 border border-slate-100 rounded-lg p-2.5">
              <div className="text-[10px] text-foreground/35 uppercase tracking-wider">{m.label}</div>
              <div className="text-sm font-bold text-foreground mt-0.5">{m.val}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "exec", num: "03", label: "Execution", color: "oklch(0.52 0.20 300)", icon: Cpu,
    headline: "Agents that act. 24/7. Autonomously.",
    body: "A fleet of AI agents that execute your entire growth motion — outbound sequences, LinkedIn engagement, SEO content, pipeline management, and retention workflows. Always on, never tired.",
    features: ["Outbound email sequencing agents", "LinkedIn engagement automation", "SEO + AEO content agents", "Pipeline management agents", "Retention & lifecycle automation", "CRM data hygiene agents"],
    visual: (
      <div className="space-y-2">
        {[{ name: "Outbound Agent", status: "Sending", msgs: "14 sent today", active: true }, { name: "LinkedIn Agent", status: "Engaging", msgs: "8 connections", active: true }, { name: "SEO Agent", status: "Writing", msgs: "3 drafts ready", active: true }, { name: "RevOps Agent", status: "Syncing", msgs: "CRM updated", active: true }, { name: "Retention Agent", status: "Watching", msgs: "2 at-risk flagged", active: false }].map((a) => (
          <div key={a.name} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
            <div className="flex items-center gap-2.5">
              <div className={`w-1.5 h-1.5 rounded-full ${a.active ? "bg-[var(--accent-green)] animate-pulse" : "bg-slate-300"}`} />
              <div>
                <div className="text-xs text-foreground/70">{a.name}</div>
                <div className="text-[10px] text-foreground/35">{a.msgs}</div>
              </div>
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${a.active ? "bg-[var(--accent-green)]/10 text-[var(--accent-green)]" : "bg-slate-100 text-slate-400"}`}>{a.status}</span>
          </div>
        ))}
      </div>
    ),
  },
] as const;

function LayerSection() {
  const [active, setActive] = useState(0);
  const layer = LAYERS[active];
  const Icon = layer.icon;

  return (
    <section id="platform-layers" className="py-20 sm:py-24 md:py-32 bg-slate-50 border-b border-border">
      <div className="container-x">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="label-eyebrow mb-4">SYSTEM ARCHITECTURE</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Three layers. <span className="text-gradient">One system.</span>
            </h2>
            <p className="mt-4 text-foreground/50 text-base sm:text-lg leading-relaxed">Most platforms give you one layer. Magnivo gives you all three — wired together, learning continuously.</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="flex flex-col sm:flex-row justify-center gap-2 mb-10">
            {LAYERS.map((l, i) => {
              const LIcon = l.icon;
              return (
                <button key={l.id} onClick={() => setActive(i)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl border text-sm font-semibold transition-all ${active === i ? "border-[var(--accent-blue)]/30 bg-white text-foreground shadow-sm" : "border-border bg-white/60 text-foreground/50 hover:text-foreground/70 hover:bg-white"}`}>
                  <LIcon size={16} style={{ color: active === i ? l.color : undefined }} />
                  <span className="text-[11px] font-black tracking-widest uppercase opacity-40 mr-1">{l.num}</span>
                  {l.label}
                </button>
              );
            })}
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl border border-border bg-white overflow-hidden shadow-sm">
            <div className="p-7 sm:p-10 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl border border-border bg-slate-50 flex items-center justify-center" style={{ color: layer.color }}>
                  <Icon size={20} />
                </div>
                <div className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: layer.color }}>Layer {layer.num}</div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">{layer.headline}</h3>
              <p className="text-foreground/55 leading-relaxed mb-8 text-sm sm:text-base">{layer.body}</p>
              <ul className="space-y-3">
                {layer.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground/65">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: layer.color }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t lg:border-t-0 lg:border-l border-border p-7 sm:p-10 md:p-12 flex flex-col justify-center bg-slate-50/60">
              <div className="text-[10px] font-bold tracking-widest uppercase text-foreground/30 mb-5">{layer.label} · Live View</div>
              {layer.visual}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 6. BENTO ────────────────────────────────────────────────────────────────

const BENTO = [
  { span: "lg:col-span-2", icon: Activity, color: "var(--accent-blue)", label: "Intelligence", title: "Revenue Intelligence Dashboard", desc: "A live command center. Know what's happening, what's at risk, and what to do next — for every account, in real-time.", visual: (<div className="mt-4 grid grid-cols-3 gap-2">{[{ l: "Pipeline", v: "$2.4M" }, { l: "At-Risk", v: "12" }, { l: "Hot Accts", v: "34" }].map((m) => (<div key={m.l} className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center"><div className="text-lg font-black text-foreground">{m.v}</div><div className="text-[10px] text-foreground/40 mt-0.5">{m.l}</div></div>))}</div>) },
  { span: "lg:col-span-1", icon: Bell, color: "oklch(0.52 0.20 300)", label: "Signals", title: "Buying Signal Alerts", desc: "Get notified the moment a target account shows real purchase intent — before competitors act.", visual: (<div className="mt-4 space-y-2">{[{ co: "Acme Corp", signal: "Pricing page · 4× visits" }, { co: "TechFlow", signal: "Decision maker active" }, { co: "Nordex Group", signal: "Competitor searched" }].map((a) => (<div key={a.co} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100"><div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.52_0.20_300)] mt-1.5 shrink-0 animate-pulse" /><div><div className="text-xs font-bold text-foreground">{a.co}</div><div className="text-[10px] text-foreground/50">{a.signal}</div></div></div>))}</div>) },
  { span: "lg:col-span-1", icon: Shield, color: "var(--accent-green)", label: "CRM", title: "Automated CRM Hygiene", desc: "Agents keep your CRM clean, enriched, and accurate — without manual effort.", visual: (<div className="mt-4 space-y-2">{[{ label: "Contacts enriched", val: "1,247" }, { label: "Dupes removed", val: "89" }, { label: "Stale records", val: "0" }].map((r) => (<div key={r.label} className="flex items-center justify-between py-2 border-b border-border last:border-0"><span className="text-xs text-foreground/60">{r.label}</span><span className="text-xs font-bold text-[var(--accent-green)]">{r.val}</span></div>))}</div>) },
  { span: "lg:col-span-1", icon: Sparkles, color: "var(--accent-blue)", label: "AI Agents", title: "Always-on Agent Fleet", desc: "Specialized agents executing outbound, content, RevOps, and retention — 24/7 without supervision.", visual: (<div className="mt-4 space-y-2">{["Outbound", "LinkedIn", "SEO", "RevOps"].map((a) => (<div key={a} className="flex items-center gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] animate-pulse" /><span className="text-xs text-foreground/70 flex-1">{a} Agent</span><span className="text-[10px] bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] font-semibold px-2 py-0.5 rounded-full">Live</span></div>))}</div>) },
  { span: "lg:col-span-2", icon: TrendingUp, color: "var(--accent-green)", label: "Attribution", title: "Full Revenue Attribution", desc: "Connect every touchpoint to every outcome. Know exactly what's driving pipeline — and double down on what works.", visual: (<div className="mt-4"><div className="flex items-end gap-2 h-14">{[30, 45, 60, 52, 70, 85, 78, 92, 88, 100].map((h, i) => (<div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: `color-mix(in oklab, var(--accent-green) ${50 + h / 3}%, var(--accent-blue) ${100 - h / 3}%)`, opacity: 0.55 + i * 0.04 }} />))}</div><div className="flex justify-between mt-2 text-[10px] text-foreground/30"><span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span></div></div>) },
] as const;

function BentoSection() {
  return (
    <section className="py-20 sm:py-24 md:py-32 bg-white border-b border-border">
      <div className="container-x">
        <FadeIn>
          <div className="max-w-xl mb-12">
            <div className="label-eyebrow mb-4">PLATFORM CAPABILITIES</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Everything you need.<br /><span className="text-gradient">Nothing you don't.</span>
            </h2>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BENTO.map((cell, i) => {
            const CIcon = cell.icon;
            return (
              <FadeIn key={i} delay={i * 0.06} className={cell.span}>
                <div className="premium-card p-6 sm:p-7 bg-card border-border/60 h-full flex flex-col group hover:shadow-lg transition-all duration-300"
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 32px -8px color-mix(in oklab, ${cell.color} 30%, transparent)`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ""; }}
                >
                  <div className="h-10 w-10 rounded-xl border border-border bg-slate-50 flex items-center justify-center mb-4" style={{ color: cell.color }}>
                    <CIcon size={20} />
                  </div>
                  <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: cell.color }}>{cell.label}</div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 text-foreground">{cell.title}</h3>
                  <p className="text-sm text-foreground/55 leading-relaxed flex-1">{cell.desc}</p>
                  {cell.visual}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── 7. PIPELINE ─────────────────────────────────────────────────────────────

const STEPS = [
  { n: "01", icon: Database, title: "Capture",  color: "var(--accent-blue)",        desc: "Every signal unified into one enriched layer.", tags: ["CRM sync", "Intent", "Web"] },
  { n: "02", icon: Search,   title: "Identify", color: "var(--accent-green)",        desc: "AI scores accounts for fit, intent, and timing.", tags: ["ICP scoring", "Signals", "Mapping"] },
  { n: "03", icon: Zap,      title: "Activate", color: "oklch(0.52 0.20 300)",       desc: "Autonomous agents launch coordinated outreach.", tags: ["Email", "LinkedIn", "Multi-ch"] },
  { n: "04", icon: Target,   title: "Convert",  color: "var(--accent-blue)",         desc: "Accelerate pipeline and manage qualification.", tags: ["Deal scoring", "Meetings", "Pipeline"] },
  { n: "05", icon: RefreshCw,title: "Retain",   color: "var(--accent-green)",        desc: "Monitor health and automate lifecycle plays.", tags: ["Health score", "Expansion", "Churn ops"] },
] as const;

function PipelineSection() {
  return (
    <section className="py-20 sm:py-24 md:py-32 bg-slate-50/60 border-b border-border">
      <div className="container-x">
        <FadeIn>
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="label-eyebrow mb-4">THE JOURNEY</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Signal to Customer.<br /><span className="text-gradient">Fully automated.</span>
            </h2>
            <p className="mt-5 text-foreground/55 text-base sm:text-lg leading-relaxed">A closed-loop engine. Every retained customer feeds the next acquisition cycle.</p>
          </div>
        </FadeIn>

        <div className="relative">
          <div className="hidden md:block absolute top-[52px] left-[calc(10%+24px)] right-[calc(10%+24px)] h-px border-t border-dashed border-border" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 relative">
            {STEPS.map((step, i) => {
              const SIcon = step.icon;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="flex flex-col items-center text-center">
                    <div className="relative z-10 w-[52px] h-[52px] rounded-full border-2 bg-white shadow-sm flex items-center justify-center mb-4" style={{ borderColor: step.color + "40" }}>
                      <SIcon size={20} style={{ color: step.color }} />
                    </div>
                    <div className="text-[10px] font-black tracking-widest text-foreground/25 mb-2">{step.n}</div>
                    <h3 className="text-base font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-foreground/55 leading-relaxed mb-3">{step.desc}</p>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {step.tags.map((t) => (<span key={t} className="text-[10px] bg-white border border-border rounded-full px-2 py-0.5 text-foreground/50 font-medium">{t}</span>))}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.45}>
            <div className="mt-10 rounded-2xl border border-[var(--accent-blue)]/20 bg-[var(--accent-blue)]/5 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="label-eyebrow mb-2 text-[var(--accent-blue)]/60">THE COMPOUNDING LOOP</div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">Step 05 feeds back into Step 01.</h3>
                <p className="text-foreground/55 mt-2 max-w-lg text-sm leading-relaxed">Every retained customer becomes a new signal. Every closed deal teaches the scoring model. Revenue becomes systematic, not linear.</p>
              </div>
              <div className="flex gap-6 shrink-0">
                {[{ v: "3.4x", l: "Pipeline" }, { v: "60%", l: "Lower CAC" }].map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="text-3xl font-black text-[var(--accent-blue)]">{s.v}</div>
                    <div className="text-xs text-foreground/40 uppercase tracking-widest mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── 8. TESTIMONIALS ─────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote: "We replaced three vendors, cut tooling cost by 40%, and had our first AI-sourced meeting booked within 11 days. The system just works — and keeps getting smarter.",
    name: "James Whitfield", role: "CEO", company: "Meridian SaaS",
    initials: "JW", color: "var(--accent-blue)", metric: "$890K pipeline in 60 days",
  },
  {
    quote: "I've run RevOps at four companies. Magnivo is the first platform that actually connected our signals to our outreach without me building the middleware myself. It's what modern RevOps should look like.",
    name: "Sarah Chen", role: "VP RevOps", company: "Stackline",
    initials: "SC", color: "var(--accent-green)", metric: "4 tools replaced. One system.",
  },
  {
    quote: "Our CAC dropped 52% in Q1. Not because we changed our ICP — because the system finally knew which accounts to prioritise and when to hit them. We've never moved this fast.",
    name: "Marcus Okafor", role: "Founder & CEO", company: "Orbita Growth",
    initials: "MO", color: "oklch(0.52 0.20 300)", metric: "52% CAC reduction, Q1",
  },
];

function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-24 md:py-32 bg-white border-b border-border">
      <div className="container-x">
        <FadeIn>
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="label-eyebrow mb-4">WHAT CLIENTS SAY</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
              Don't take our word for it.
            </h2>
            <p className="mt-4 text-foreground/50 text-base sm:text-lg">Real results from B2B teams who made the switch.</p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="rounded-2xl border border-border bg-slate-50/60 p-7 flex flex-col h-full hover:border-[var(--accent-blue)]/30 hover:shadow-md transition-all">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1l1.236 2.506L10 3.9l-2 1.95.472 2.748L6 7.25 3.528 8.598 4 5.85 2 3.9l2.764-.394L6 1z" fill="#f59e0b" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed flex-1 mb-7 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 mb-5 pt-5 border-t border-border">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0" style={{ background: `color-mix(in oklab, ${t.color} 80%, transparent)` }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{t.name}</div>
                    <div className="text-xs text-foreground/45">{t.role} · {t.company}</div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border" style={{ background: `color-mix(in oklab, ${t.color} 8%, transparent)`, color: t.color, borderColor: `color-mix(in oklab, ${t.color} 25%, transparent)` }}>
                  <Check size={11} strokeWidth={3} />
                  {t.metric}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 9. METRICS (animated) ────────────────────────────────────────────────────

function MetricsSection({ onAudit }: { onAudit: () => void }) {
  const stats = [
    { prefix: "", to: 3.4, suffix: "x",  decimals: 1, label: "Pipeline Lift",     desc: "Avg lift vs prior manual outreach motion",   c: "var(--accent-blue)"   },
    { prefix: "", to: 60,  suffix: "%",  decimals: 0, label: "CAC Reduction",     desc: "Lower cost per acquired customer in 90 days", c: "var(--accent-green)"  },
    { prefix: "", to: 10,  suffix: "d",  decimals: 0, label: "Time to Live",      desc: "From kick-off to fully operational system",   c: "oklch(0.52 0.20 300)" },
    { prefix: "$", to: 4.2, suffix: "M", decimals: 1, label: "Avg Pipeline Added", desc: "Revenue influenced in the first 6 months",   c: "var(--accent-blue)"   },
  ];

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-slate-50 border-b border-border">
      <div className="container-x">
        <FadeIn>
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="label-eyebrow mb-4">PROVEN OUTCOMES</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
              Outcomes, <span className="text-gradient">not promises.</span>
            </h2>
            <p className="mt-5 text-foreground/50 text-base sm:text-lg leading-relaxed">We don't report on emails sent or impressions served. We report on pipeline created, revenue influenced, and CAC reduced.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="rounded-2xl border border-border bg-white p-6 sm:p-7 text-center hover:shadow-md transition-all">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2" style={{ color: s.c }}>
                  <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-foreground/35 mb-2">{s.label}</div>
                <div className="text-[11px] text-foreground/40 leading-relaxed hidden sm:block">{s.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.35}>
          <div className="text-center">
            <button onClick={onAudit} className="btn-primary px-8 py-3.5 text-sm sm:text-base w-full sm:w-auto justify-center">
              See What's Possible for Your Business <ArrowRight size={15} />
            </button>
            <p className="mt-3 text-xs text-foreground/35 uppercase tracking-widest">No pitch · 30-min audit · Clear blueprint</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 10. CASE STUDY ──────────────────────────────────────────────────────────

function CaseStudySection() {
  return (
    <section className="py-20 sm:py-24 md:py-32 bg-background border-b border-border">
      <div className="container-x">
        <FadeIn>
          <div className="max-w-xl mb-12">
            <div className="label-eyebrow mb-4">CLIENT RESULT</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
              From manual chaos<br /><span className="text-gradient">to $1.4M pipeline.</span>
            </h2>
            <p className="mt-5 text-foreground/60 text-base sm:text-lg leading-relaxed">A Series A B2B SaaS ($2M ARR) replaced their manual SDR-led outbound with Magnivo. Here's what changed in 90 days.</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Before */}
              <div className="p-7 sm:p-10 bg-red-50/40 border-b md:border-b-0 md:border-r border-border">
                <div className="text-[10px] font-bold tracking-widest uppercase text-red-500/70 mb-6">Before Magnivo</div>
                <div className="space-y-4">
                  {[
                    { label: "Outbound motion",    val: "2 manual SDRs"      },
                    { label: "Pipeline cycle",      val: "45-day avg"         },
                    { label: "CAC",                 val: "$180,000"           },
                    { label: "Pipeline visibility", val: "Spreadsheets + gut" },
                    { label: "Intent data",         val: "Not actionable"     },
                    { label: "Team time on ops",    val: "~60% of week"       },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center justify-between py-2.5 border-b border-red-100/70 last:border-0">
                      <span className="text-sm text-foreground/60">{r.label}</span>
                      <span className="text-sm font-semibold text-red-600/80 flex items-center gap-1.5"><X size={13} />{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* After */}
              <div className="p-7 sm:p-10 bg-[var(--accent-green)]/5">
                <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--accent-green)] mb-6">After Magnivo (90 days)</div>
                <div className="space-y-4">
                  {[
                    { label: "Outbound motion",    val: "4 AI agents, 24/7"  },
                    { label: "Pipeline cycle",      val: "12-day avg"         },
                    { label: "CAC",                 val: "$72,000 (−60%)"     },
                    { label: "Pipeline visibility", val: "Live · fully scored" },
                    { label: "Intent data",         val: "Auto-activated"     },
                    { label: "Team time on ops",    val: "~10% of week"       },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center justify-between py-2.5 border-b border-[var(--accent-green)]/10 last:border-0">
                      <span className="text-sm text-foreground/60">{r.label}</span>
                      <span className="text-sm font-semibold text-[var(--accent-green)] flex items-center gap-1.5"><Check size={13} strokeWidth={3} />{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline strip */}
            <div className="border-t border-border bg-slate-50/60 px-7 sm:px-10 py-5">
              <div className="flex items-center gap-0 overflow-x-auto pb-1">
                {[
                  { day: "Day 1",  event: "Kick-off + ICP audit"      },
                  { day: "Day 7",  event: "System live"               },
                  { day: "Day 12", event: "First AI-sourced meeting"  },
                  { day: "Day 30", event: "$280K pipeline"            },
                  { day: "Day 90", event: "$1.4M pipeline · 60% ↓CAC" },
                ].map((t, i, arr) => (
                  <div key={i} className="flex items-center shrink-0">
                    <div className="text-center px-4 first:pl-0">
                      <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider mb-1">{t.day}</div>
                      <div className="text-xs font-semibold text-foreground/70 whitespace-nowrap">{t.event}</div>
                    </div>
                    {i < arr.length - 1 && <div className="w-8 sm:w-12 h-px bg-border mx-1 shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 11. INTEGRATIONS ────────────────────────────────────────────────────────

const INTEGRATIONS = [
  { name: "HubSpot", cat: "CRM" }, { name: "Salesforce", cat: "CRM" }, { name: "Apollo", cat: "Prospecting" },
  { name: "Clay", cat: "Enrichment" }, { name: "Clearbit", cat: "Data" }, { name: "6sense", cat: "Intent" },
  { name: "Bombora", cat: "Intent" }, { name: "Outreach", cat: "Sequences" }, { name: "Salesloft", cat: "Sequences" },
  { name: "LinkedIn", cat: "Social" }, { name: "Google Ads", cat: "Paid" }, { name: "Meta Ads", cat: "Paid" },
  { name: "Slack", cat: "Alerts" }, { name: "Webflow", cat: "Web" }, { name: "Stripe", cat: "Revenue" }, { name: "Mixpanel", cat: "Analytics" },
];

function IntegrationsSection() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-border">
      <div className="container-x">
        <FadeIn>
          <div className="text-center mb-10">
            <div className="label-eyebrow mb-3">INTEGRATIONS</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Connects with your entire stack.</h2>
            <p className="mt-4 text-foreground/55 max-w-lg mx-auto text-sm sm:text-base">Native integrations across CRM, intent, sequencing, paid, and analytics — all unified into one intelligence layer.</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto">
            {INTEGRATIONS.map((t, i) => (
              <div key={i} className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border bg-slate-50 text-xs sm:text-sm font-medium text-foreground/65 hover:border-[var(--accent-blue)]/35 hover:bg-[var(--accent-blue)]/5 hover:text-foreground transition-all cursor-default">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)]/50 shrink-0" />
                {t.name}
                <span className="text-[10px] text-foreground/30 font-normal hidden sm:inline">{t.cat}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 12. COMPARISON ──────────────────────────────────────────────────────────

const COMPARE_ROWS = [
  { dim: "Data layer",   bad: "Fragmented silos",      good: "Unified single truth"        },
  { dim: "Intelligence", bad: "Static filters",         good: "Predictive AI models"        },
  { dim: "Execution",    bad: "Manual workflows",       good: "Autonomous agents"           },
  { dim: "Setup time",   bad: "Months per tool",        good: "10 days to live"             },
  { dim: "Learning",     bad: "Resets every campaign",  good: "Compounds over time"         },
  { dim: "Attribution",  bad: "Last-click only",        good: "Full multi-touch"            },
  { dim: "Scale",        bad: "Hire to scale",          good: "Systems scale automatically" },
  { dim: "Support",      bad: "Vendor support desk",    good: "Embedded AI + human team"    },
];

function CompareSection() {
  return (
    <section className="py-20 sm:py-24 md:py-32 bg-slate-50/60 border-b border-border">
      <div className="container-x">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="label-eyebrow mb-4">COMPARISON</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">System vs. Tools.</h2>
            <p className="mt-4 text-foreground/55 max-w-md mx-auto text-base sm:text-lg">Point solutions create complexity. Magnivo creates clarity.</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
            <table className="w-full text-left min-w-[480px]">
              <thead>
                <tr className="border-b border-border bg-slate-50">
                  <th className="px-5 sm:px-7 py-4 text-sm font-bold text-foreground/40 w-1/3">Dimension</th>
                  <th className="px-5 sm:px-7 py-4 text-sm font-bold text-foreground/35">Point Tools</th>
                  <th className="px-5 sm:px-7 py-4 text-sm font-black text-[var(--accent-blue)] bg-[var(--accent-blue)]/5">Magnivo OS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPARE_ROWS.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 sm:px-7 py-3.5 text-sm font-semibold text-foreground/60">{r.dim}</td>
                    <td className="px-5 sm:px-7 py-3.5 text-sm text-foreground/35">{r.bad}</td>
                    <td className="px-5 sm:px-7 py-3.5 text-sm font-semibold text-[var(--accent-blue)] bg-[var(--accent-blue)]/5">
                      <span className="flex items-center gap-2"><Check size={13} className="shrink-0" />{r.good}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 13. PERSONAS ────────────────────────────────────────────────────────────

const PERSONAS = [
  { icon: Rocket,    title: "SaaS Founders",         role: "Founder / CEO",    desc: "Post-PMF. GTM is still manual and dependent on one or two people.", outcome: "Replace manual GTM with a system that scales without headcount" },
  { icon: BarChart2, title: "RevOps Leaders",         role: "VP RevOps",        desc: "The data exists. What's missing is the intelligence layer that acts on it.", outcome: "Add AI intelligence on top of your existing sales motion" },
  { icon: Briefcase, title: "Service Firms",          role: "Managing Partner", desc: "Pipeline depends on referrals. Outbound is inconsistent. Inbound is near zero.", outcome: "Build a predictable pipeline engine so you can focus on delivery" },
  { icon: Zap,       title: "Funded Startups",        role: "CEO / CRO",        desc: "You just raised and need pipeline fast. Hiring a VP Sales takes months.", outcome: "Install the revenue system before you make the first sales hire" },
  { icon: Target,    title: "Enterprise Sales Teams", role: "VP Sales",         desc: "You have quota and a team. What's missing is the intelligence layer before reps touch accounts.", outcome: "Give reps an AI system that fills top of funnel at scale" },
  { icon: Globe,     title: "B2B Marketplaces",       role: "Head of Growth",   desc: "Two-sided markets need coordinated GTM. Standard tools weren't built for this.", outcome: "Orchestrate multi-sided GTM with one unified system" },
] as const;

function PersonasSection() {
  return (
    <section className="py-20 sm:py-24 md:py-32 bg-background border-b border-border">
      <div className="container-x">
        <FadeIn>
          <div className="max-w-xl mb-12">
            <div className="label-eyebrow mb-4">WHO IT'S FOR</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-[0.95]">
              Built for <span className="text-gradient">growth architects.</span>
            </h2>
            <p className="mt-5 text-foreground/50 text-base sm:text-lg leading-relaxed">B2B companies at $500K–$5M ARR with a product that works, a market that exists, and a GTM motion that isn't keeping up.</p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PERSONAS.map((p, i) => {
            const PIcon = p.icon;
            return (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="p-5 sm:p-6 rounded-2xl border border-border bg-white flex flex-col h-full hover:border-[var(--accent-blue)]/30 hover:shadow-md transition-all">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                    <PIcon size={18} className="text-foreground/50" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-1">{p.title}</h3>
                  <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-foreground/35 bg-slate-50 border border-border px-2.5 py-1 rounded-full mb-4 w-fit">{p.role}</span>
                  <p className="text-sm text-foreground/50 leading-relaxed flex-1 mb-4">{p.desc}</p>
                  <div className="flex items-start gap-1.5 text-sm text-[var(--accent-blue)] font-semibold">
                    <ArrowRight size={14} className="shrink-0 mt-0.5" />
                    {p.outcome}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
        <FadeIn delay={0.4}>
          <div className="mt-8 max-w-2xl mx-auto text-center bg-slate-50 border border-border rounded-xl py-5 px-5 sm:px-6">
            <div className="text-[10px] font-bold tracking-widest uppercase text-foreground/30 mb-2">NOT A FIT IF...</div>
            <p className="text-sm text-foreground/45 leading-relaxed">You're pre-revenue, without a defined product, or looking for a one-time campaign. Magnivo is a system — built to compound growth, not run a sprint.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 14. FAQ ─────────────────────────────────────────────────────────────────

const FAQS = [
  { q: "Is Magnivo software, a service, or both?", a: "Both — and that's intentional. The platform gives your team live revenue intelligence and visibility. The service layer executes your growth motion using AI agents. The consulting layer ensures the strategy is right. Most clients use all three together." },
  { q: "How is Magnivo different from Apollo, 6sense, or Outreach?", a: "Those tools are excellent at one thing. Apollo finds contacts. 6sense gives signals. Outreach sends emails. Magnivo connects all three into one system that acts on intelligence automatically — without your team playing middleware between them. It's the difference between having tools and having a system." },
  { q: "How long until we see results?", a: "Most clients book their first AI-sourced meeting within 2 weeks of going live. Pipeline builds materially over 60–90 days as the system learns your ICP and optimises outreach timing. You will see activity and signals in week one." },
  { q: "Do we need a technical team to implement this?", a: "No. We handle the full implementation. Day 1 we audit and define your ICP. Week 2 the system goes live. Your team needs to be available for 2–3 hours in week one — that's it. We've designed this to require zero internal engineering." },
  { q: "What happens if we don't see results?", a: "We don't hide behind contracts. If you're not seeing pipeline movement in the first 30 days, we dig in together and fix it. We have a clear escalation process and a dedicated success team. We've never lost a client to 'it didn't work.'" },
  { q: "How do you handle our data and security?", a: "All data is encrypted in transit and at rest. We operate with the least access needed — agents are scoped, auditable, and tied to specific workflows. We sign MSAs and data processing agreements with every client before any system access is granted." },
  { q: "What size company is this built for?", a: "Ideal fit is B2B companies at $500K–$10M ARR. You need to have found product-market fit, have a defined ICP, and be willing to invest in a system rather than just a campaign. If you're pre-revenue, we're probably not the right fit yet." },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 sm:py-24 md:py-32 bg-slate-50 border-b border-border">
      <div className="container-x max-w-3xl">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="label-eyebrow mb-4">FAQ</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Common questions, answered.</h2>
            <p className="mt-4 text-foreground/55 text-base sm:text-lg">Everything you need to know before booking your audit.</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="rounded-xl border border-border bg-white overflow-hidden hover:border-[var(--accent-blue)]/25 transition-colors">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-semibold text-foreground leading-snug">{faq.q}</span>
                    <span className="h-7 w-7 rounded-md border border-border flex items-center justify-center text-foreground/40 shrink-0 bg-slate-50">
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                  <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-foreground/55 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 15. CTA ─────────────────────────────────────────────────────────────────

function CtaSection({ onAudit, ctaRef }: { onAudit: () => void; ctaRef: React.Ref<HTMLElement> }) {
  return (
    <section ref={ctaRef} className="relative bg-white overflow-hidden py-20 sm:py-28 md:py-36">
      {/* Subtle gradient mesh */}
      <div className="absolute inset-0 dot-grid opacity-[0.04]" aria-hidden />
      <div className="absolute -top-32 left-1/4 w-[800px] h-[600px] rounded-full opacity-[0.10] blur-[140px] pointer-events-none" style={{ background: "radial-gradient(circle, var(--accent-blue), transparent 70%)" }} />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[500px] rounded-full opacity-[0.07] blur-[120px] pointer-events-none" style={{ background: "radial-gradient(circle, var(--accent-green), transparent 70%)" }} />
      <div className="absolute inset-x-0 top-0 h-px bg-border" />

      <div className="container-x relative z-10 text-center">
        <FadeIn>
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-blue)]/25 bg-[var(--accent-blue)]/8 px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase text-[var(--accent-blue)] mb-7">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] animate-pulse" />
            ⚡ 3 founding client slots available this quarter
          </div>

          <div className="label-eyebrow mb-4">READY TO START?</div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6.5rem] font-bold tracking-tighter leading-[0.9] mb-7 text-foreground">
            Install the<br />
            <span className="text-gradient">Revenue OS.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/50 max-w-lg mx-auto mb-9 leading-relaxed px-2 sm:px-0">
            One conversation. We map your revenue system, identify the gaps, and show you exactly what Magnivo would build — before you commit to anything.
          </p>

          {/* Risk reversal strip */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mb-8">
            {[
              { icon: Check, text: "No pitch" },
              { icon: Check, text: "No commitment" },
              { icon: Check, text: "30-minute audit" },
              { icon: Check, text: "Clear GTM blueprint" },
            ].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-xs text-foreground/40 font-medium">
                <t.icon size={12} className="text-[var(--accent-green)]" />
                {t.text}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center px-4 sm:px-0">
            <button
              onClick={onAudit}
              className="btn-primary px-8 py-4 text-base sm:text-lg w-full sm:w-auto justify-center shadow-[0_4px_32px_-8px_color-mix(in_oklab,var(--accent-blue)_60%,transparent)]"
            >
              Book Your Free GTM Audit <ArrowRight size={17} />
            </button>
            <Link
              to="/pricing"
              className="btn-ghost px-8 py-4 text-base sm:text-lg w-full sm:w-auto justify-center"
            >
              View Pricing
            </Link>
          </div>

          {/* Final trust strip */}
          <div className="mt-10 pt-8 border-t border-border flex flex-wrap justify-center gap-6">
            {[
              { val: "3.4x",   label: "avg pipeline lift"  },
              { val: "10 days",label: "to go live"         },
              { val: "60%",    label: "avg CAC reduction"  },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-black text-foreground">{s.val}</div>
                <div className="text-[11px] text-foreground/35 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
