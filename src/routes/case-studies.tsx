import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { ResourceCard } from "@/components/ResourceCard";
import { resources } from "@/lib/site-data";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Magnivo.ai" },
      {
        name: "description",
        content: "Real Magnivo.ai engagements and outcomes.",
      },
      { property: "og:title", content: "Case Studies — Magnivo.ai" },
      { property: "og:description", content: "Real Magnivo.ai engagements and outcomes." },
      { property: "og:image", content: "https://magnivo.ai/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://magnivo.ai/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://magnivo.ai/case-studies" }],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  const caseStudies = resources.filter((r) => r.type === "Case Study");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Case Studies"
        title="Real Engagements, Real Outcomes"
        subtitle="How teams run their GTM motion on Magnivo.ai."
      />

      <section className="container-x pb-6">
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} /> Back to all Resources
        </Link>
      </section>

      <section className="container-x py-10">
        {caseStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((r, i) => (
              <ResourceCard key={r.slug} r={r} delay={i * 0.03} />
            ))}
          </div>
        ) : (
          <div className="surface-card p-10 text-center text-muted-foreground">
            More case studies coming soon.
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
