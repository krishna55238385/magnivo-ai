import { BrainCircuit, Bot, TrendingUp, Activity, Box, Zap } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative mx-auto mt-8 sm:mt-12 md:mt-16 max-w-5xl float-dashboard">
      <div
        className="rounded-2xl border border-slate-200/60 bg-white/80 p-2 relative overflow-hidden group shadow-[0_32px_80px_-20px_rgba(0,0,0,0.12)]"
      >
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        {/* Soft top gradient */}
        <div
          className="absolute inset-x-0 top-0 h-40 pointer-events-none opacity-40 transition-opacity duration-500 group-hover:opacity-60"
          style={{ background: "linear-gradient(180deg, color-mix(in oklab, var(--accent-blue) 10%, transparent), transparent)" }}
        />

        {/* Glow effect that follows mouse - simulated by static radial gradient for now */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--accent-blue)]/10 blur-[100px] rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[var(--accent-green)]/5 blur-[100px] rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-110" />

        <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 md:p-5 relative shadow-xl overflow-hidden">
          {/* subtle inner border highlight */}
          <div className="absolute inset-0 border border-slate-100 rounded-xl pointer-events-none" />

          {/* Window dots */}
          <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6 px-1">
            <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#27c93f]" />
            <div className="ml-1 sm:ml-4 min-w-0 flex-1 truncate text-[10px] sm:text-xs text-slate-400 font-medium font-mono">magnivo.ai / orchestration</div>
            <div className="ml-auto hidden min-[420px]:flex items-center gap-2 text-[10px] font-mono text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
              SYSTEM_ONLINE
            </div>
          </div>

          <div className="grid grid-cols-12 gap-3 sm:gap-5">
            {/* Sidebar */}
            <div className="col-span-3 hidden md:flex flex-col gap-2">
              {[
                { name: "Leadfinder", active: false },
                { name: "Reachout", active: false },
                { name: "Compass", active: false },
                { name: "Orbit", active: false },
                { name: "Intelligence", active: true },
                { name: "Agentdesk", active: false }
              ].map((item, i) => (
                <div
                  key={item.name}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    item.active
                      ? "border border-[var(--accent-blue)]/20 bg-gradient-to-r from-[var(--accent-blue)]/5 to-transparent text-slate-900 shadow-[inset_2px_0_0_var(--accent-blue)]"
                      : "border border-transparent text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="col-span-12 md:col-span-9 space-y-5">
              <div className="grid grid-cols-1 min-[520px]:grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 sm:p-5 flex flex-col justify-center relative overflow-hidden group/metric">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-green)]/5 to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-500" />
                  <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1 relative z-10">PIPELINE</div>
                  <div className="flex items-baseline gap-2 mb-1 relative z-10">
                    <span className="text-2xl sm:text-3xl font-bold text-slate-900">$4.2M</span>
                    <span className="text-xs font-medium text-[var(--accent-green)] flex items-center">
                      <TrendingUp size={12} className="mr-0.5" /> +14%
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 relative z-10 font-medium">vs last month</div>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 sm:p-5 flex flex-col justify-center relative overflow-hidden group/metric">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-blue)]/5 to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-500" />
                  <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1 relative z-10">WIN RATE</div>
                  <div className="flex items-baseline gap-2 mb-1 relative z-10">
                    <span className="text-2xl sm:text-3xl font-bold text-slate-900">32.8%</span>
                    <span className="text-xs font-medium text-[var(--accent-blue)] flex items-center">
                      <TrendingUp size={12} className="mr-0.5" /> +5.2%
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 relative z-10 font-medium">vs last month</div>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 sm:p-5 flex flex-col justify-center relative overflow-hidden group/metric">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-green)]/5 to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-500" />
                  <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1 relative z-10">AI ACTIONS</div>
                  <div className="flex items-baseline gap-2 mb-1 relative z-10">
                    <span className="text-2xl sm:text-3xl font-bold text-slate-900">84,592</span>
                    <span className="text-xs font-medium text-[var(--accent-green)] flex items-center">
                      <Zap size={12} className="mr-0.5" /> Active
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 relative z-10 font-medium">this week</div>
                </div>
              </div>

              {/* Line Chart Section */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 sm:p-5 relative overflow-hidden group/chart">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-blue)]/[0.02] to-transparent pointer-events-none" />
                <div className="flex flex-col min-[420px]:flex-row min-[420px]:items-center justify-between gap-2 text-xs mb-6 relative z-10">
                  <div className="flex items-center gap-2.5 text-slate-900 font-bold">
                    <BrainCircuit size={15} className="text-[var(--accent-blue)]" />
                    Intelligence — deal risk
                  </div>
                  <span className="text-slate-400 font-medium">last 7 days</span>
                </div>

                {/* Advanced SVG Chart */}
                <div className="relative w-full h-20 md:h-26 mt-2">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                    <div className="border-t border-dashed border-slate-200 w-full"></div>
                    <div className="border-t border-dashed border-slate-200 w-full"></div>
                    <div className="border-t border-dashed border-slate-200 w-full"></div>
                    <div className="border-t border-slate-200 w-full"></div>
                  </div>

                  <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible relative z-10" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="var(--accent-blue)" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Area fill */}
                    <path
                      d="M0,80 L40,75 L80,85 L120,65 L160,70 L200,50 L240,55 L280,35 L320,40 L360,20 L400,25 L400,100 L0,100 Z"
                      fill="url(#chartGradient)"
                      className="transition-all duration-1000 ease-in-out"
                    />

                    {/* Line */}
                    <path
                      d="M0,80 L40,75 L80,85 L120,65 L160,70 L200,50 L240,55 L280,35 L320,40 L360,20 L400,25"
                      fill="none"
                      stroke="var(--accent-blue)"
                      strokeWidth="2.5"
                    />

                    {/* Data Points */}
                    {[
                      {x: 120, y: 65, val: "42%"}, {x: 200, y: 50, val: "35%"}, {x: 280, y: 35, val: "28%"}, {x: 360, y: 20, val: "15%"}
                    ].map((p, i) => (
                      <g key={i} className="transition-transform duration-300 hover:scale-150 origin-center" style={{ transformOrigin: `${p.x}px ${p.y}px` }}>
                        <circle cx={p.x} cy={p.y} r="6" fill="var(--accent-blue)" fillOpacity="0.1" />
                        <circle cx={p.x} cy={p.y} r="3" fill="#ffffff" stroke="var(--accent-blue)" strokeWidth="1.5" />
                        <text x={p.x} y={p.y - 12} fontSize="10" fill="currentColor" className="text-slate-400 font-mono" textAnchor="middle">{p.val}</text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 min-[520px]:grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 sm:p-5 relative overflow-hidden group/card">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-green)]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-center gap-2.5 text-xs font-bold text-slate-900 relative z-10">
                    <TrendingUp size={15} className="text-[var(--accent-green)]" />
                    Forecast accuracy
                    <span className="ml-auto text-sm font-bold text-[var(--accent-green)]">94.2%</span>
                  </div>

                  <div className="mt-5 mb-2 w-full relative z-10">
                    <div className="flex justify-between text-[10px] text-slate-400 mb-1.5 font-mono">
                      <span>PREDICTED</span>
                      <span>ACTUAL</span>
                    </div>
                    <div className="w-full bg-slate-200/50 rounded-full h-2 mb-3">
                      <div className="bg-gradient-to-r from-[var(--accent-green)]/40 to-[var(--accent-green)] h-2 rounded-full relative" style={{ width: '94%' }}>
                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/60 rounded-r-full shadow-[0_0_10px_var(--accent-green)]"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                      <span>$2.4M</span>
                      <span>$2.5M</span>
                    </div>
                  </div>

                  {/* Subtle decorative graph */}
                  <svg className="absolute bottom-0 right-0 w-32 h-16 opacity-20 pointer-events-none translate-y-4 translate-x-4">
                    <path d="M0,60 C20,50 30,20 50,30 C70,40 80,10 100,5" fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 sm:p-5 relative overflow-hidden group/card">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-blue)]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-center gap-2.5 text-xs font-bold text-slate-900 relative z-10">
                    <Bot size={15} className="text-[var(--accent-blue)]" />
                    Agents online
                    <span className="ml-auto text-sm font-bold text-[var(--accent-blue)]">24 / 24</span>
                  </div>

                  <div className="mt-4 h-12 w-full flex items-end gap-1.5 relative z-10">
                    {[3, 5, 2, 8, 4, 7, 5, 9, 6, 4, 7, 8].map((h, i) => (
                      <div key={i} className="flex-1 rounded-sm bg-[var(--accent-blue)]/20 animate-pulse relative group/bar hover:bg-[var(--accent-blue)]/40 transition-colors" style={{ height: `${h * 10}%`, animationDelay: `${i * 100}ms` }}>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white border border-slate-200 text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none text-slate-900 font-mono shadow-sm">
                          {h * 12}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Subtle active indicators */}
                  <div className="absolute top-5 right-5 flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-blue)]/40 animate-pulse" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-blue)]/40 animate-pulse" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-blue)]/40 animate-pulse" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>

                {/* Intent Signals Card */}
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 sm:p-5 relative overflow-hidden group/card">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-green)]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-center gap-2.5 text-xs font-bold text-slate-900 relative z-10">
                    <Activity size={15} className="text-[var(--accent-green)]" />
                    Intent signals
                    <span className="ml-auto text-sm font-bold text-[var(--accent-green)]">High</span>
                  </div>

                  <div className="mt-5 flex flex-col gap-2 relative z-10">
                    {[
                      { company: "Acme Corp", score: 98, time: "2m ago", color: "bg-[#ff5f56]" },
                      { company: "GlobalTech", score: 85, time: "12m ago", color: "bg-[#ffbd2e]" },
                      { company: "Nexus", score: 74, time: "1h ago", color: "bg-[#27c93f]" },
                    ].map((signal, i) => (
                      <div key={i} className="flex items-center justify-between text-[10px] font-mono bg-white rounded px-2 py-1.5 border border-slate-100 group-hover/card:border-slate-200 transition-colors shadow-sm">
                        <span className="text-slate-700 font-bold truncate w-20">{signal.company}</span>
                        <div className="flex items-center gap-1.5">
                          <span className={`h-1.5 w-1.5 rounded-full ${signal.color}`} />
                          <span className="text-slate-400 font-medium">{signal.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Execution Log */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent pointer-events-none opacity-40" />
                <div className="flex items-center gap-2.5 text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-3 relative z-10">
                  <Box size={12} className="text-slate-400/60" /> LIVE EXECUTION LOG
                </div>
                <div className="space-y-2 h-[72px] overflow-hidden relative z-10">
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-50/80 to-transparent z-10 pointer-events-none" />
                  {[
                    { agent: "Reachout-Alpha", action: "Drafted hyper-personalised email to VP Sales at Stripe", time: "Just now" },
                    { agent: "Leadfinder-Omega", action: "Identified 43 new high-intent accounts in fintech", time: "1m ago" },
                    { agent: "Orbit-Sync", action: "Updated CRM records for 12 closed-won opportunities", time: "3m ago" },
                    { agent: "Reachout-Beta", action: "Followed up with 14 dormant leads, 2 meetings booked", time: "8m ago" }
                  ].map((log, i) => (
                    <div key={i} className="flex gap-2 sm:gap-3 text-[10px] font-mono items-start opacity-70 hover:opacity-100 transition-opacity">
                      <span className="text-slate-400 whitespace-nowrap w-12">{log.time}</span>
                      <span className="text-[var(--accent-blue)] hidden sm:inline font-bold whitespace-nowrap w-32">[{log.agent}]</span>
                      <span className="text-slate-600 truncate">{log.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
