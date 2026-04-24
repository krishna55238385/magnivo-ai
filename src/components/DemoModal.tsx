import { useEffect, useState } from "react";
import { ArrowRight, Loader2, X, CalendarCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  useEffect(() => {
    if (!open) {
      setSent(false); setErr(null); setBusy(false);
    }
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(null);
    const { error } = await supabase.from("submissions").insert({
      type: "demo",
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim() || null,
      intent: "Demo",
      message: form.message.trim() || null,
      source: "demo_modal",
    });
    setBusy(false);
    if (error) { setErr(error.message); return; }
    setSent(true);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div className="relative w-full md:max-w-lg bg-card border border-border md:rounded-xl rounded-t-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom md:zoom-in-95">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1" aria-label="Close">
          <X size={18} />
        </button>

        {sent ? (
          <div className="py-10 text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-[var(--accent-green)]/15 border border-[var(--accent-green)]/40 flex items-center justify-center text-[var(--accent-green)]">
              <CalendarCheck size={24} />
            </div>
            <h3 className="mt-5 text-2xl font-bold tracking-tight">Demo requested</h3>
            <p className="mt-2 text-muted-foreground text-sm">We'll reach out within one business day to confirm a time.</p>
            <button onClick={onClose} className="btn-ghost mt-6">Close</button>
          </div>
        ) : (
          <>
            <div className="label-eyebrow text-[var(--accent-blue)]">Book a Demo</div>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">See Magnivo in action</h2>
            <p className="mt-2 text-sm text-muted-foreground">30 minutes. Tailored to your stack and motion.</p>

            <form onSubmit={submit} className="mt-6 space-y-3">
              <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="dinput" />
              <input required type="email" placeholder="Work email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="dinput" />
              <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="dinput" />
              <textarea rows={3} placeholder="What are you trying to solve? (optional)" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="dinput" />
              {err && <div className="text-sm text-[oklch(0.7_0.2_25)]">{err}</div>}
              <button type="submit" disabled={busy} className="btn-primary w-full justify-center">
                {busy ? <><Loader2 size={14} className="animate-spin" /> Submitting…</> : <>Request Demo <ArrowRight size={14} /></>}
              </button>
              <p className="text-[11px] text-muted-foreground text-center">By submitting you agree to be contacted by Magnivo AI.</p>
            </form>
          </>
        )}

        <style>{`
          .dinput { width:100%; padding:10px 14px; border-radius:8px; background: var(--background); border:1px solid var(--surface-border); color: var(--foreground); font-size:14px; outline:none; transition:border-color .2s; }
          .dinput:focus { border-color: var(--accent-blue); }
        `}</style>
      </div>
    </div>
  );
}
