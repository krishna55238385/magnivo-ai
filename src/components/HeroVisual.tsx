import { Activity, BrainCircuit, Bot, TrendingUp, Zap } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative mx-auto mt-16 max-w-5xl">
      {/* Floating chips */}
      <div className="hidden md:flex absolute -top-6 -left-2 z-10 float-y">
        <div className="ring-conic">
          <div className="flex items-center gap-2 rounded-[11px] bg-card/90 backdrop-blur-md px-3 py-2 text-xs">
            <Activity size={14} className="text-[var(--accent-green)]" />
            <span className="text-foreground">Pipeline +38%</span>
            <span className="text-muted-foreground">this week</span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex absolute -top-2 right-0 z-10 float-y-delay">
        <div className="ring-conic">
          <div className="flex items-center gap-2 rounded-[11px] bg-card/90 backdrop-blur-md px-3 py-2 text-xs">
            <Bot size={14} className="text-[var(--accent-blue)]" />
            <span className="text-foreground">Agent shipped</span>
            <span className="text-muted-foreground">2m ago</span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex absolute -bottom-4 left-10 z-10 float-y-delay">
        <div className="ring-conic">
          <div className="flex items-center gap-2 rounded-[11px] bg-card/90 backdrop-blur-md px-3 py-2 text-xs">
            <Zap size={14} className="text-[var(--accent-blue)]" />
            <span className="text-foreground">12,480</span>
            <span className="text-muted-foreground">workflows / day</span>
          </div>
        </div>
      </div>

      {/* Main "dashboard" surface */}
      <div className="surface-card p-2 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="rounded-md border border-border bg-background/70 backdrop-blur-sm p-5 md:p-6 relative">
          {/* Window dots */}
          <div className="flex items-center gap-1.5 mb-5">
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.55_0.2_25)]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.16_85)]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-green)]/60" />
            <div className="ml-3 text-[11px] text-muted-foreground tracking-wide">magnivo.ai / orchestration</div>
          </div>

          <div className="grid grid-cols-12 gap-3">
            {/* Sidebar */}
            <div className="col-span-3 hidden md:flex flex-col gap-2 text-xs">
              {["Leadfinder", "Reachout", "Compass", "Orbit", "Intelligence", "Agentdesk"].map((n, i) => (
                <div
                  key={n}
                  className={`px-3 py-2 rounded-md border transition ${
                    i === 4
                      ? "border-[color-mix(in_oklab,var(--accent-blue)_50%,var(--surface-border))] bg-[color-mix(in_oklab,var(--accent-blue)_10%,transparent)] text-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {n}
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="col-span-12 md:col-span-9 space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <Stat label="Pipeline" value="$4.82M" trend="+38%" tone="green" />
                <Stat label="Win rate" value="34.6%" trend="+6.1pt" tone="blue" />
                <Stat label="AI actions" value="12.4k" trend="today" tone="green" />
              </div>

              <div className="rounded-md border border-border p-4">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-foreground">
                    <BrainCircuit size={14} className="text-[var(--accent-blue)]" />
                    Intelligence — deal risk
                  </div>
                  <span className="text-muted-foreground">last 7 days</span>
                </div>
                {/* Sparkline */}
                <svg viewBox="0 0 300 70" className="mt-3 w-full h-16">
                  <defs>
                    <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,55 L25,48 L50,52 L75,40 L100,42 L125,30 L150,34 L175,22 L200,26 L225,18 L250,22 L275,12 L300,16 L300,70 L0,70 Z"
                    fill="url(#sg)"
                  />
                  <path
                    d="M0,55 L25,48 L50,52 L75,40 L100,42 L125,30 L150,34 L175,22 L200,26 L225,18 L250,22 L275,12 L300,16"
                    fill="none"
                    stroke="var(--accent-blue)"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md border border-border p-3 text-xs">
                  <div className="flex items-center gap-2 text-foreground">
                    <TrendingUp size={13} className="text-[var(--accent-green)]" />
                    Forecast accuracy
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight">92.3%</div>
                  <div className="text-muted-foreground mt-1">+4.2 vs last quarter</div>
                </div>
                <div className="rounded-md border border-border p-3 text-xs">
                  <div className="flex items-center gap-2 text-foreground">
                    <Bot size={13} className="text-[var(--accent-blue)]" />
                    Agents online
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight">28</div>
                  <div className="text-muted-foreground mt-1">across 6 workflows</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, trend, tone }: { label: string; value: string; trend: string; tone: "blue" | "green" }) {
  const color = tone === "blue" ? "var(--accent-blue)" : "var(--accent-green)";
  return (
    <div className="rounded-md border border-border p-3">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-2 text-xl md:text-2xl font-semibold tracking-tight">{value}</div>
      <div className="text-[11px] mt-1" style={{ color }}>
        {trend}
      </div>
    </div>
  );
}
