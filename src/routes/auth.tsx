import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Magnivo Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user && isAdmin) navigate({ to: "/admin" });
  }, [user, isAdmin, loading, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(null); setInfo(null);
    try {
      if (mode === "signup") {
        const redirectUrl = `${window.location.origin}/admin`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectUrl },
        });
        if (error) throw error;
        setInfo("Account created. If email confirmation is enabled, check your inbox. Ask an existing admin to grant you the admin role.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="aurora" aria-hidden />
      <div className="absolute inset-0 dot-grid opacity-50" aria-hidden />
      <div className="relative w-full max-w-md surface-card p-7 md:p-9">
        <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Back to site</Link>
        <div className="mt-5 flex items-center gap-3">
          <div className="h-10 w-10 rounded-md border border-border flex items-center justify-center text-[var(--accent-blue)]"><Lock size={18} /></div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Magnivo Admin</h1>
            <p className="text-sm text-muted-foreground">{mode === "signin" ? "Sign in to access the admin panel" : "Create an admin account"}</p>
          </div>
        </div>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block">
            <div className="label-eyebrow mb-2">Email</div>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" placeholder="you@magnivo.ai" />
          </label>
          <label className="block">
            <div className="label-eyebrow mb-2">Password</div>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" placeholder="••••••••" />
          </label>
          {err && <div className="text-sm text-[oklch(0.7_0.2_25)]">{err}</div>}
          {info && <div className="text-sm text-[var(--accent-green)]">{info}</div>}
          <button disabled={busy} className="btn-primary w-full justify-center">
            {busy ? "Please wait..." : mode === "signin" ? "Sign in" : "Sign up"} <ArrowRight size={14} />
          </button>
        </form>

        <button
          onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setErr(null); setInfo(null); }}
          className="mt-5 text-sm text-muted-foreground hover:text-foreground w-full text-center"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>

        {user && !isAdmin && (
          <div className="mt-6 p-4 rounded-md border border-border bg-card text-sm text-muted-foreground">
            You're signed in but don't have admin access yet. Ask an existing admin to grant you the <span className="text-foreground font-medium">admin</span> role for user id <span className="text-foreground font-mono text-xs">{user.id}</span>.
          </div>
        )}
      </div>

      <style>{`
        .auth-input { width:100%; padding:10px 14px; border-radius:8px; background: var(--background); border:1px solid var(--surface-border); color: var(--foreground); font-size:14px; outline:none; transition:border-color .2s; }
        .auth-input:focus { border-color: var(--accent-blue); }
      `}</style>
    </div>
  );
}
