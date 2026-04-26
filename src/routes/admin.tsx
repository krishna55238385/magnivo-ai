import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Inbox, Mail, Building2, MessageSquare, Filter, LogOut, RefreshCw, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Magnivo.ai" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type Submission = {
  id: string;
  type: "demo" | "contact";
  name: string;
  email: string;
  company: string | null;
  intent: string | null;
  message: string | null;
  source: string | null;
  status: "new" | "in_progress" | "closed";
  created_at: string;
};

function AdminPage() {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const [items, setItems] = useState<Submission[]>([]);
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState<"all" | "demo" | "contact">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "in_progress" | "closed">("all");
  const [active, setActive] = useState<Submission | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  async function load() {
    setBusy(true);
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setItems(data as Submission[]);
    setBusy(false);
  }

  async function setStatus(id: string, status: Submission["status"]) {
    const { error } = await supabase.from("submissions").update({ status }).eq("id", id);
    if (!error) {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
      if (active?.id === id) setActive({ ...active, status });
    }
  }

  const filtered = useMemo(() => {
    return items.filter((i) =>
      (filter === "all" || i.type === filter) &&
      (statusFilter === "all" || i.status === statusFilter),
    );
  }, [items, filter, statusFilter]);

  const stats = useMemo(() => ({
    total: items.length,
    demo: items.filter((i) => i.type === "demo").length,
    contact: items.filter((i) => i.type === "contact").length,
    open: items.filter((i) => i.status !== "closed").length,
  }), [items]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="surface-card p-8 max-w-md text-center">
          <ShieldCheck size={28} className="mx-auto text-[var(--accent-blue)]" />
          <h2 className="mt-4 text-xl font-bold">Admin access required</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account doesn't have the admin role. Ask an existing admin to grant access for user id:
          </p>
          <code className="mt-3 block text-xs font-mono break-all p-2 rounded bg-card border border-border">{user.id}</code>
          <div className="mt-5 flex gap-2 justify-center">
            <button onClick={() => signOut()} className="btn-ghost">Sign out</button>
            <Link to="/" className="btn-primary">Go home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Topbar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container-x h-14 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card">
              <span className="text-[13px] font-bold tracking-tight bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-green)] bg-clip-text text-transparent">M</span>
            </span>
            <span className="text-sm">Magnivo Admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={load} className="btn-ghost text-xs px-3 py-2" aria-label="Refresh">
              <RefreshCw size={14} className={busy ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button onClick={() => signOut()} className="btn-ghost text-xs px-3 py-2">
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container-x py-8 md:py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <StatCard icon={<Inbox size={16} />} label="Total" value={stats.total} />
          <StatCard icon={<Mail size={16} />} label="Demo requests" value={stats.demo} accent="blue" />
          <StatCard icon={<MessageSquare size={16} />} label="Contact" value={stats.contact} accent="green" />
          <StatCard icon={<Filter size={16} />} label="Open" value={stats.open} accent="blue" />
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          <SegBtn active={filter === "all"} onClick={() => setFilter("all")}>All types</SegBtn>
          <SegBtn active={filter === "demo"} onClick={() => setFilter("demo")}>Demo</SegBtn>
          <SegBtn active={filter === "contact"} onClick={() => setFilter("contact")}>Contact</SegBtn>
          <span className="mx-2 text-border">|</span>
          <SegBtn active={statusFilter === "all"} onClick={() => setStatusFilter("all")}>All status</SegBtn>
          <SegBtn active={statusFilter === "new"} onClick={() => setStatusFilter("new")}>New</SegBtn>
          <SegBtn active={statusFilter === "in_progress"} onClick={() => setStatusFilter("in_progress")}>In progress</SegBtn>
          <SegBtn active={statusFilter === "closed"} onClick={() => setStatusFilter("closed")}>Closed</SegBtn>
        </div>

        {/* List */}
        <div className="mt-6 surface-card overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground text-sm">
              {busy ? "Loading submissions…" : "No submissions yet."}
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {filtered.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => setActive(s)}
                    className="w-full text-left p-4 md:p-5 hover:bg-card/50 transition-colors flex flex-col md:flex-row md:items-center gap-3"
                  >
                    <div className="flex items-center gap-3 md:w-64 shrink-0">
                      <span className={s.type === "demo" ? "pill-blue" : "pill-green"}>{s.type}</span>
                      <StatusDot status={s.status} />
                      <span className="text-xs text-muted-foreground">
                        {new Date(s.created_at).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">{s.name} <span className="text-muted-foreground font-normal">— {s.email}</span></div>
                      {s.company && <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5"><Building2 size={11} /> {s.company}{s.intent ? ` · ${s.intent}` : ""}</div>}
                      {s.message && <div className="mt-1.5 text-sm text-muted-foreground line-clamp-1">{s.message}</div>}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      {/* Detail drawer */}
      {active && (
        <div className="fixed inset-0 z-40" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setActive(null)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-lg bg-card border-l border-border p-6 overflow-y-auto animate-in slide-in-from-right">
            <div className="flex items-center justify-between">
              <span className={active.type === "demo" ? "pill-blue" : "pill-green"}>{active.type}</span>
              <button onClick={() => setActive(null)} className="text-muted-foreground hover:text-foreground text-sm">Close</button>
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight">{active.name}</h2>
            <a href={`mailto:${active.email}`} className="text-sm text-[var(--accent-blue)] hover:underline">{active.email}</a>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <Field label="Company" value={active.company} />
              <Field label="Intent" value={active.intent} />
              <Field label="Source" value={active.source} />
              <Field label="Submitted" value={new Date(active.created_at).toLocaleString()} />
            </div>

            {active.message && (
              <div className="mt-6">
                <div className="label-eyebrow mb-2">Message</div>
                <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">{active.message}</p>
              </div>
            )}

            <div className="mt-8">
              <div className="label-eyebrow mb-2">Status</div>
              <div className="flex gap-2 flex-wrap">
                {(["new", "in_progress", "closed"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatus(active.id, st)}
                    className={`px-3 py-1.5 rounded-md border text-xs transition ${
                      active.status === st
                        ? "border-[var(--accent-blue)] bg-[color-mix(in_oklab,var(--accent-blue)_15%,transparent)] text-foreground"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {st.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: number; accent?: "blue" | "green" }) {
  const color = accent === "green" ? "var(--accent-green)" : accent === "blue" ? "var(--accent-blue)" : "var(--muted-foreground)";
  return (
    <div className="surface-card p-4 md:p-5">
      <div className="flex items-center gap-2 text-xs text-muted-foreground"><span style={{ color }}>{icon}</span>{label}</div>
      <div className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">{value}</div>
    </div>
  );
}

function SegBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md border text-xs transition ${
        active ? "border-[var(--accent-blue)] bg-[color-mix(in_oklab,var(--accent-blue)_15%,transparent)] text-foreground" : "border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function StatusDot({ status }: { status: Submission["status"] }) {
  const map = { new: "var(--accent-blue)", in_progress: "oklch(0.78 0.16 85)", closed: "var(--muted-foreground)" } as const;
  return <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full" style={{ background: map[status] }} />{status.replace("_", " ")}</span>;
}

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <div className="label-eyebrow mb-1">{label}</div>
      <div className="text-sm text-foreground/90">{value || <span className="text-muted-foreground">—</span>}</div>
    </div>
  );
}
