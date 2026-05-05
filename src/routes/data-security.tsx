import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeIn } from "@/components/FadeIn";
import { Shield, Lock, Server, Eye } from "lucide-react";

export const Route = createFileRoute("/data-security")({
  head: () => ({
    meta: [
      { title: "Data Security — Magnivo.ai" },
      {
        name: "description",
        content:
          "How Magnivo.ai keeps your business data secure — infrastructure, access controls, and compliance.",
      },
    ],
    links: [{ rel: "canonical", href: "https://magnivo.ai/data-security" }],
  }),
  component: DataSecurityPage,
});

const pillars = [
  {
    icon: Lock,
    title: "Encryption in Transit and at Rest",
    body: "All data transmitted to and from Magnivo.ai is encrypted via TLS 1.2+. Data at rest is encrypted using AES-256.",
  },
  {
    icon: Server,
    title: "Infrastructure",
    body: "Our infrastructure runs on Vercel's edge network and uses industry-standard cloud providers with SOC 2 Type II certification.",
  },
  {
    icon: Shield,
    title: "Access Controls",
    body: "Access to client data is limited to authorised personnel on a strict need-to-know basis. All internal access is logged and reviewed.",
  },
  {
    icon: Eye,
    title: "Third-Party Processors",
    body: "We carefully vet all sub-processors. Current processors include Vercel (hosting) and Formspree (form submissions). We do not sell data to any third party.",
  },
];

function DataSecurityPage() {
  return (
    <SiteLayout>
      <section className="container-x py-16 md:py-24">
        <FadeIn>
          <div className="label-eyebrow">Legal</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">
            Data Security
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl">
            We take the security of your business data seriously. Here's exactly how we protect it.
          </p>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <FadeIn key={p.title}>
                <div className="surface-card p-6 md:p-7 h-full">
                  <div
                    className="h-10 w-10 rounded-lg flex items-center justify-center mb-4 text-[var(--accent-blue)]"
                    style={{ background: "rgba(27,58,45,0.08)" }}
                  >
                    <Icon size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-foreground mb-2">{p.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn>
          <div className="mt-12 max-w-3xl space-y-8 text-base text-foreground/85 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">Vulnerability Disclosure</h2>
              <p>
                If you discover a security vulnerability, please report it responsibly to{" "}
                <a
                  href="mailto:security@magnivo.ai"
                  className="underline hover:text-[var(--accent-blue)]"
                >
                  security@magnivo.ai
                </a>
                . We will acknowledge receipt within 48 hours and work with you on a resolution
                timeline.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                Data Retention and Deletion
              </h2>
              <p>
                Client engagement data is retained for the duration of the service agreement plus 12
                months, unless a shorter period is requested in writing. You may request deletion of
                your data at any time by contacting{" "}
                <a
                  href="mailto:privacy@magnivo.ai"
                  className="underline hover:text-[var(--accent-blue)]"
                >
                  privacy@magnivo.ai
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">Incident Response</h2>
              <p>
                In the event of a data breach affecting your information, we will notify you within
                72 hours of becoming aware, in accordance with applicable data protection
                regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">Questions</h2>
              <p>
                For any security or data handling questions, contact{" "}
                <a
                  href="mailto:security@magnivo.ai"
                  className="underline hover:text-[var(--accent-blue)]"
                >
                  security@magnivo.ai
                </a>
                .
              </p>
            </section>
          </div>
        </FadeIn>
      </section>
    </SiteLayout>
  );
}
