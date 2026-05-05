import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calendar, Loader2 } from "lucide-react";
import { z } from "zod";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeIn } from "@/components/FadeIn";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Magnivo.ai" },
      {
        name: "description",
        content: "Talk to Magnivo.ai about a demo, partnership, investment, or general inquiry.",
      },
      { property: "og:title", content: "Let's Talk — Magnivo.ai" },
      { property: "og:description", content: "Book a demo or reach the team." },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(200),
  company: z.string().max(150).optional(),
  message: z.string().max(2000).optional(),
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const reasons = [
    { t: "Demo", d: "See the platform and products in action." },
    { t: "Partnership", d: "Build, integrate, or distribute with us." },
    { t: "Investment", d: "Connect with the founders." },
    { t: "General", d: "Anything else — say hi." },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      setErr(parsed.error.errors[0]?.message ?? "Invalid input");
      return;
    }

    setErr(null);
    setSubmitting(true);
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
    <SiteLayout>
      <section className="container-x py-16 md:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
        <FadeIn>
          <div className="label-eyebrow">Contact</div>
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Let's Talk
          </h1>
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-md">
            Tell us what you're trying to build. We'll route you to the right person within one
            business day.
          </p>
          <div className="mt-8 space-y-3">
            {reasons.map((r) => (
              <div key={r.t} className="surface-card p-4 md:p-5 flex items-start gap-4">
                <div className="h-8 w-8 rounded-md border border-border bg-card flex items-center justify-center text-[var(--accent-blue)] text-xs font-semibold shrink-0">
                  {r.t[0]}
                </div>
                <div>
                  <div className="font-semibold">{r.t}</div>
                  <div className="text-sm text-muted-foreground">{r.d}</div>
                </div>
              </div>
            ))}
          </div>
          <a href="#" className="btn-ghost mt-8 inline-flex">
            <Calendar size={14} /> Book directly via Calendly
          </a>
        </FadeIn>

        <FadeIn delay={0.1}>
          <form className="surface-card p-6 md:p-8" onSubmit={handleSubmit}>
            {succeeded ? (
              <div className="py-12 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-[var(--accent-green)]/15 border border-[var(--accent-green)]/40 flex items-center justify-center text-[var(--accent-green)] text-2xl">
                  ✓
                </div>
                <h3 className="mt-5 text-2xl font-bold">Message sent</h3>
                <p className="mt-2 text-muted-foreground">
                  We'll be in touch within one business day.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Field label="Name">
                  <input required name="name" className="cinput" placeholder="Jane Doe" />
                </Field>
                <Field label="Email">
                  <input required type="email" name="email" className="cinput" placeholder="jane@company.com" />
                </Field>
                <Field label="Company">
                  <input name="company" className="cinput" placeholder="Acme Inc." />
                </Field>
                <Field label="Intent">
                  <select name="intent" className="cinput">
                    <option>Demo</option>
                    <option>Partnership</option>
                    <option>Investment</option>
                    <option>General</option>
                  </select>
                </Field>
                <Field label="Message">
                  <textarea
                    rows={5}
                    name="message"
                    className="cinput"
                    placeholder="Tell us a bit about your goals..."
                  />
                </Field>
                {err && <div className="text-sm text-[var(--destructive)]">{err}</div>}
                <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send Message <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </FadeIn>
      </section>

      <style>{`
        .cinput { width:100%; padding:10px 14px; border-radius:8px; background: var(--background); border:1px solid var(--surface-border); color: var(--foreground); font-size:14px; outline:none; transition:border-color .2s; }
        .cinput:focus { border-color: var(--accent-blue); }
      `}</style>
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="label-eyebrow mb-2">{label}</div>
      {children}
    </label>
  );
}
