import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { ResourceCard } from "@/components/ResourceCard";
import { resources } from "@/lib/site-data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Magnivo.ai" },
      {
        name: "description",
        content: "AI-native GTM strategy, sales motion, and revenue intelligence — every Magnivo blog post in one place.",
      },
      { property: "og:title", content: "Blog — Magnivo.ai" },
      { property: "og:description", content: "AI-native GTM strategy and revenue intelligence, in one place." },
      { property: "og:image", content: "https://magnivo.ai/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://magnivo.ai/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://magnivo.ai/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const posts = resources.filter((r) => r.type === "Blog");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Blog"
        title="AI GTM Strategy, Written Plainly"
        subtitle="Signal timing, ICP definition, sales motion, and outbound mechanics — no fluff, no unverified claims."
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((r, i) => (
            <ResourceCard key={r.slug} r={r} delay={i * 0.03} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
