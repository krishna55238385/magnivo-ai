import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeIn } from "@/components/FadeIn";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Magnivo.ai" },
      {
        name: "description",
        content: "Terms governing your use of the Magnivo.ai platform and website.",
      },
    ],
    links: [{ rel: "canonical", href: "https://magnivo.ai/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <section className="container-x py-16 md:py-24 max-w-3xl">
        <FadeIn>
          <div className="label-eyebrow">Legal</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: May 2026</p>

          <div className="mt-10 space-y-8 text-base text-foreground/85 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using magnivo.ai (the "Site") or any services provided by Magnivo.ai
                ("Magnivo", "we", "our"), you agree to be bound by these Terms of Service. If you do
                not agree, do not use the Site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">2. Use of the Site</h2>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Site for any unlawful purpose or in violation of any regulations.</li>
                <li>Attempt to gain unauthorised access to any part of the Site or its systems.</li>
                <li>
                  Scrape, crawl, or otherwise harvest data from the Site without prior written
                  consent.
                </li>
                <li>
                  Transmit any harmful, offensive, or disruptive content via forms or
                  communications.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">3. Intellectual Property</h2>
              <p>
                All content on this Site — including text, graphics, logos, and code — is the
                property of Magnivo.ai or its licensors. You may not reproduce, distribute, or
                create derivative works without express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                4. Services and Engagements
              </h2>
              <p>
                Specific terms governing service engagements, deliverables, payment, and
                confidentiality are set out in individual Statement of Work (SOW) or Service
                Agreements entered into between Magnivo.ai and each client. These Terms of Service
                govern use of the public website only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">5. Disclaimers</h2>
              <p>
                The Site and its content are provided "as is" without warranties of any kind,
                express or implied. We do not warrant that the Site will be error-free or
                uninterrupted. Results described on this Site (pipeline lift, CAC reduction, etc.)
                are illustrative and not guarantees of specific outcomes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">6. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Magnivo.ai shall not be liable for any
                indirect, incidental, special, or consequential damages arising from your use of the
                Site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">7. Third-Party Links</h2>
              <p>
                The Site may contain links to third-party websites. We are not responsible for the
                content or practices of those sites. Links do not imply endorsement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">8. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of the Site
                after changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">9. Governing Law</h2>
              <p>
                These terms are governed by the laws of the jurisdiction in which Magnivo.ai is
                registered. Disputes shall be resolved through good-faith negotiation before any
                legal proceedings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">10. Contact</h2>
              <p>
                Questions? Email{" "}
                <a
                  href="mailto:legal@magnivo.ai"
                  className="underline text-foreground hover:text-[var(--accent-blue)]"
                >
                  legal@magnivo.ai
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
