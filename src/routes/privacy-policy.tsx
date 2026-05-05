import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeIn } from "@/components/FadeIn";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Magnivo.ai" },
      {
        name: "description",
        content: "How Magnivo.ai collects, uses, and protects your personal information.",
      },
    ],
    links: [{ rel: "canonical", href: "https://magnivo.ai/privacy-policy" }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <SiteLayout>
      <section className="container-x py-16 md:py-24 max-w-3xl">
        <FadeIn>
          <div className="label-eyebrow">Legal</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: May 2026</p>

          <div className="mt-10 prose-like space-y-8 text-base text-foreground/85 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">1. Who We Are</h2>
              <p>
                Magnivo.ai ("Magnivo", "we", "our", "us") is an AI GTM platform operated by Open
                Claw. We help B2B revenue teams build and run autonomous go-to-market systems. Our
                registered business address is available on request via{" "}
                <a
                  href="/contact"
                  className="underline text-foreground hover:text-[var(--accent-blue)]"
                >
                  contact
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">2. Information We Collect</h2>
              <p className="mb-3">We collect information in the following ways:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Contact form submissions</strong> — name, email address, company name, and
                  message content when you fill out a form on our site.
                </li>
                <li>
                  <strong>Usage data</strong> — pages visited, time on site, and browser/device
                  information collected via analytics tools.
                </li>
                <li>
                  <strong>Communications</strong> — any information you share when you email us or
                  book a call.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To respond to your inquiries and schedule calls or demos.</li>
                <li>
                  To send relevant product updates and resources (you can unsubscribe at any time).
                </li>
                <li>To improve our website and marketing based on aggregate usage patterns.</li>
                <li>To comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">4. Data Sharing</h2>
              <p>
                We do not sell your personal data. We share data only with service providers that
                help us operate (e.g., Formspree for form processing). All service providers are
                contractually bound to protect your data and may not use it for their own purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">5. Cookies</h2>
              <p>
                We use essential cookies required for site functionality. We may use analytics
                cookies to understand traffic patterns. You can disable cookies in your browser
                settings; doing so will not affect your ability to use the site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">6. Data Retention</h2>
              <p>
                Contact form submissions are retained for up to 24 months. You may request deletion
                at any time by contacting us at{" "}
                <a
                  href="mailto:privacy@magnivo.ai"
                  className="underline text-foreground hover:text-[var(--accent-blue)]"
                >
                  privacy@magnivo.ai
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">7. Your Rights</h2>
              <p>
                Depending on your jurisdiction (including GDPR and CCPA), you may have the right to
                access, correct, delete, or restrict processing of your personal data. To exercise
                any of these rights, email{" "}
                <a
                  href="mailto:privacy@magnivo.ai"
                  className="underline text-foreground hover:text-[var(--accent-blue)]"
                >
                  privacy@magnivo.ai
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">8. Security</h2>
              <p>
                We implement industry-standard security practices including HTTPS, limited data
                access, and secure third-party processors. No method of transmission over the
                internet is 100% secure; we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this policy periodically. Material changes will be communicated via
                email to subscribers or via a notice on this page with an updated "Last updated"
                date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">10. Contact</h2>
              <p>
                Questions about this policy? Email{" "}
                <a
                  href="mailto:privacy@magnivo.ai"
                  className="underline text-foreground hover:text-[var(--accent-blue)]"
                >
                  privacy@magnivo.ai
                </a>{" "}
                or use our{" "}
                <a
                  href="/contact"
                  className="underline text-foreground hover:text-[var(--accent-blue)]"
                >
                  contact form
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
