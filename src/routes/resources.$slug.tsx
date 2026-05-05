import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Clock,
  Share2,
  BookOpen,
  FileText,
  Zap,
  Layout,
  BarChart3,
  ListTree,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeIn } from "@/components/FadeIn";
import { resources } from "@/lib/site-data";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const resource = resources.find((r) => r.slug === params.slug);
    if (!resource) throw notFound();
    return { resource };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.resource.title} — Magnivo.ai` },
          { name: "description", content: loaderData.resource.description },
          { property: "og:title", content: loaderData.resource.title },
          { property: "og:description", content: loaderData.resource.description },
        ]
      : [{ title: "Resource — Magnivo.ai" }],
    links: loaderData
      ? [{ rel: "canonical", href: `https://magnivo.ai/resources/${loaderData.resource.slug}` }]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-x py-32 text-center">
        <h1 className="text-4xl font-bold">Resource not found</h1>
        <p className="mt-4 text-muted-foreground">This resource doesn't exist.</p>
        <Link to="/resources" className="btn-primary mt-8 inline-flex">
          Back to Resources
        </Link>
      </div>
    </SiteLayout>
  ),
  component: ResourceDetail,
});

const TYPE_ICONS = {
  Blog: BookOpen,
  Playbook: ListTree,
  Guide: Zap,
  "Case Study": Layout,
  Benchmark: BarChart3,
  Glossary: FileText,
};

function ResourceDetail() {
  const { resource } = Route.useLoaderData();
  const Icon = TYPE_ICONS[resource.type] || FileText;

  return (
    <SiteLayout>
      <article className="container-x py-16 sm:py-24">
        <FadeIn>
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
            to Resources
          </Link>

          <header className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-[var(--accent-blue)]">
                <Icon size={16} />
              </span>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">
                {resource.type}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              {resource.title}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
              {resource.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-y border-border/50 py-6">
              <div className="flex items-center gap-2">
                <Clock size={14} /> 8 min read
              </div>
              <div className="flex items-center gap-2">Published April 2025</div>
              <button className="flex items-center gap-2 hover:text-foreground transition-colors ml-auto">
                <Share2 size={14} /> Share
              </button>
            </div>
          </header>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <FadeIn delay={0.1}>
              <div className="prose-mockup space-y-8 text-foreground/90 text-lg leading-relaxed">
                <p>
                  The landscape of B2B revenue is shifting from human-first to AI-native. In this{" "}
                  {resource.type.toLowerCase()}, we explore the fundamental changes required to
                  scale a modern GTM motion using autonomous agents.
                </p>

                <h2 className="text-2xl font-bold text-foreground pt-4">The Shift to Autonomy</h2>
                <p>
                  Traditional GTM stacks were built for human operators. CRM, outreach tools, and
                  marketing automation systems were essentially "dumb" databases that required
                  manual data entry and execution. Magnivo.ai flips this model.
                </p>
                <p>
                  Our research shows that teams who transition to an "Agent-First" architecture see
                  a 40% reduction in customer acquisition costs while maintaining higher data
                  integrity.
                </p>

                <div className="bg-secondary/30 border border-border rounded-lg p-8 my-10">
                  <h3 className="text-xl font-bold mb-4">Key Takeaways</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <span className="text-[var(--accent-blue)] font-bold">01</span>
                      <span>Agents should own the data hygiene layer of your CRM.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[var(--accent-blue)] font-bold">02</span>
                      <span>
                        Outreach personalization can be automated without losing the human touch.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[var(--accent-blue)] font-bold">03</span>
                      <span>
                        Attribution is solved when the agent that starts the lead is the same one
                        that tracks the deal.
                      </span>
                    </li>
                  </ul>
                </div>

                <p>
                  As we move deeper into 2025, the competitive advantage will lie not in who has the
                  largest sales team, but who has the most efficient agent swarm.
                </p>
              </div>
            </FadeIn>
          </div>

          <aside className="lg:col-span-4">
            <FadeIn delay={0.2}>
              <div className="sticky top-24 space-y-8">
                <div className="premium-card p-6 border border-border bg-card">
                  <h3 className="font-bold mb-4">Related Solutions</h3>
                  <div className="space-y-4">
                    <Link
                      to="/solutions"
                      className="block p-3 rounded-lg hover:bg-secondary/50 border border-transparent hover:border-border transition-all"
                    >
                      <div className="text-sm font-semibold">GTM Operations</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Scale your AI motion.
                      </div>
                    </Link>
                    <Link
                      to="/solutions"
                      className="block p-3 rounded-lg hover:bg-secondary/50 border border-transparent hover:border-border transition-all"
                    >
                      <div className="text-sm font-semibold">Agent Studio</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Custom agents built for you.
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="premium-card p-6 border border-border/50 bg-secondary/10">
                  <h3 className="font-bold mb-4">Get the Full Report</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Download the PDF version of this guide including exclusive data tables.
                  </p>
                  <button className="btn-primary w-full justify-center">Download PDF</button>
                </div>
              </div>
            </FadeIn>
          </aside>
        </div>
      </article>
    </SiteLayout>
  );
}
