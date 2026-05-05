import { useState, useEffect } from "react";
import { ArrowRight, Loader2, X, CalendarCheck } from "lucide-react";

export function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setSucceeded(false);
      setErr(null);
      setSubmitting(false);
    }
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);
    try {
      const res = await fetch("https://formspree.io/f/mzdorjpv", {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSucceeded(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setErr(data?.errors?.[0]?.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setErr("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      />
      <div className="relative w-full md:max-w-lg bg-card border border-border md:rounded-lg rounded-t-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom md:zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {succeeded ? (
          <div className="py-10 text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-[var(--accent-green)]/15 border border-[var(--accent-green)]/40 flex items-center justify-center text-[var(--accent-green)]">
              <CalendarCheck size={24} />
            </div>
            <h3 className="mt-5 text-2xl font-bold tracking-tight">Audit requested</h3>
            <p className="mt-2 text-muted-foreground text-sm">
              We'll reach out within one business day with the next step.
            </p>
            <button onClick={onClose} className="btn-ghost mt-6">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="label-eyebrow text-[var(--accent-blue)]">Free GTM Audit</div>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">
              Find the fastest path to pipeline
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              30 minutes. We review your motion and send a practical GTM gap map.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <input required name="name" placeholder="Name" className="dinput" />
              <input required type="email" name="email" placeholder="Work email" className="dinput" />
              <input name="company" placeholder="Company" className="dinput" />
              <textarea
                rows={3}
                name="message"
                placeholder="What are you trying to improve? Pipeline, outbound, inbound, CRM, retention..."
                className="dinput"
              />
              {err && <div className="text-sm text-[var(--destructive)]">{err}</div>}
              <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
                {submitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    Request Free Audit <ArrowRight size={14} />
                  </>
                )}
              </button>
              <p className="text-[11px] text-muted-foreground text-center">
                No pitch. No pressure. By submitting, you agree to be contacted by Magnivo.ai.
              </p>
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
