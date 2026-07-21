import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { ResourceCard } from "@/components/ResourceCard";
import { resources } from "@/lib/site-data";

export const Route = createFileRoute("/playbooks")({
  head: () => ({
    meta: [
      { title: "Playbooks & Guides — Magnivo.ai" },
      {
        name: "description",
        content: "Step-by-step frameworks for running an AI-native GTM motion — playbooks and guides from Magnivo.ai.",
      },
      { property: "og:title", content: "Playbooks & Guides — Magnivo.ai" },
      { property: "og:description", content: "Step-by-step frameworks for running an AI-native GTM motion." },
      { property: "og:image", content: "https://magnivo.ai/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://magnivo.ai/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://magnivo.ai/playbooks" }],
  }),
  component: PlaybooksPage,
});

function PlaybooksPage() {
  const playbooks = resources.filter((r) => r.type === "Playbook");
  const guides = resources.filter((r) => r.type === "Guide");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Playbooks & Guides"
        title="Frameworks, Not Just Opinions"
        subtitle="The step-by-step mechanics behind an AI-native GTM operating system."
      />

      <section className="container-x pb-6">
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} /> Back to all Resources
        </Link>
      </section>

      {playbooks.length > 0 && (
        <section className="container-x py-10">
          <div className="label-eyebrow">Playbooks</div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playbooks.map((r, i) => (
              <ResourceCard key={r.slug} r={r} delay={i * 0.03} />
            ))}
          </div>
        </section>
      )}

      {guides.length > 0 && (
        <section className="container-x py-10">
          <div className="label-eyebrow">Guides</div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((r, i) => (
              <ResourceCard key={r.slug} r={r} delay={i * 0.03} />
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
