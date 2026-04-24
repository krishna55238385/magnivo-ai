import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeIn } from "@/components/FadeIn";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Magnivo AI" },
      { name: "description", content: "Talk to Magnivo AI about a demo, partnership, investment, or general inquiry." },
      { property: "og:title", content: "Let's Talk — Magnivo AI" },
      { property: "og:description", content: "Book a demo or reach the team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  const reasons = [
    { t: "Demo", d: "See the platform and products in action." },
    { t: "Partnership", d: "Build, integrate, or distribute with us." },
    { t: "Investment", d: "Connect with the founders." },
    { t: "General", d: "Anything else — say hi." },
  ];

  return (
    <SiteLayout>
      <section className="container-x py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <FadeIn>
          <div className="label-eyebrow">Contact</div>
          <h1 className="mt-5 text-5xl md:text-6xl font-bold tracking-tight">Let's Talk</h1>
          <p className="mt-5 text-muted-foreground text-lg max-w-md">
            Tell us what you're trying to build. We'll route you to the right person within one business day.
          </p>
          <div className="mt-10 space-y-3">
            {reasons.map((r) => (
              <div key={r.t} className="surface-card p-5 flex items-start gap-4">
                <div className="h-8 w-8 rounded-md border border-border bg-card flex items-center justify-center text-[var(--accent-blue)] text-xs font-semibold">{r.t[0]}</div>
                <div>
                  <div className="font-semibold">{r.t}</div>
                  <div className="text-sm text-muted-foreground">{r.d}</div>
                </div>
              </div>
            ))}
          </div>
          <a href="#" className="btn-ghost mt-8 inline-flex"><Calendar size={14} /> Book directly via Calendly</a>
        </FadeIn>

        <FadeIn delay={0.1}>
          <form
            className="surface-card p-7 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {sent ? (
              <div className="py-12 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-[var(--accent-green)]/15 border border-[var(--accent-green)]/40 flex items-center justify-center text-[var(--accent-green)] text-2xl">✓</div>
                <h3 className="mt-5 text-2xl font-bold">Message sent</h3>
                <p className="mt-2 text-muted-foreground">We'll be in touch shortly.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Field label="Name"><input required className="input" placeholder="Jane Doe" /></Field>
                <Field label="Email"><input required type="email" className="input" placeholder="jane@company.com" /></Field>
                <Field label="Company"><input className="input" placeholder="Acme Inc." /></Field>
                <Field label="Intent">
                  <select className="input" defaultValue="">
                    <option value="" disabled>Select reason</option>
                    <option>Demo</option><option>Partnership</option><option>Investment</option><option>General</option>
                  </select>
                </Field>
                <Field label="Message"><textarea rows={5} className="input" placeholder="Tell us a bit about your goals..." /></Field>
                <button type="submit" className="btn-primary w-full justify-center">Send Message <ArrowRight size={14} /></button>
              </div>
            )}
          </form>
        </FadeIn>
      </section>

      <style>{`
        .input { width:100%; padding:10px 14px; border-radius:8px; background: var(--background); border:1px solid var(--surface-border); color: var(--foreground); font-size:14px; outline:none; transition:border-color .2s; }
        .input:focus { border-color: var(--accent-blue); }
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
