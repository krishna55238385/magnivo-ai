import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
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
  ArrowRight,
  TrendingDown,
  ShieldAlert,
  Users,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeIn } from "@/components/FadeIn";
import { resources } from "@/lib/site-data";
import { renderMarkdownLite } from "@/lib/markdown-lite";

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
          { property: "og:type", content: "article" },
          { property: "og:image", content: "https://magnivo.ai/og-image.png" },
          { property: "og:image:alt", content: loaderData.resource.title },
          { property: "og:url", content: `https://magnivo.ai/resources/${loaderData.resource.slug}` },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:image", content: "https://magnivo.ai/og-image.png" },
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

const SCHEMA_TYPE_MAP: Record<string, string> = {
  Blog: "BlogPosting",
  Playbook: "HowTo",
  Guide: "Article",
  "Case Study": "Article",
  Benchmark: "Article",
  Glossary: "DefinedTermSet",
};

function ResourceDetail() {
  const { resource } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);
  const Icon = TYPE_ICONS[resource.type] || FileText;
  const schemaType = SCHEMA_TYPE_MAP[resource.type] ?? "Article";
  const isHiddenCost = resource.slug === "hidden-cost-of-manual-lead-research";
  const datePublished = isHiddenCost ? "2026-07-15" : resource.content ? "2026-07-21" : "2025-04-01";
  const dateModified = isHiddenCost ? "2026-07-15" : resource.content ? "2026-07-21" : "2025-05-01";
  const wordCount = resource.content ? resource.content.trim().split(/\s+/).length : 0;
  const readMinutes = wordCount ? Math.max(1, Math.round(wordCount / 220)) : 8;
  const resourceLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": schemaType,
        "@id": `https://magnivo.ai/resources/${resource.slug}#article`,
        headline: resource.title,
        name: resource.title,
        description: resource.description,
        url: `https://magnivo.ai/resources/${resource.slug}`,
        image: "https://magnivo.ai/og-image.png",
        author: {
          "@type": "Organization",
          "@id": "https://magnivo.ai/#organization",
          name: "Magnivo.ai",
        },
        publisher: { "@id": "https://magnivo.ai/#organization" },
        datePublished: datePublished,
        dateModified: dateModified,
        inLanguage: "en",
        isPartOf: { "@id": "https://magnivo.ai/#website" },
        about: { "@id": "https://magnivo.ai/#software" },
        keywords: "AI GTM, B2B sales automation, revenue intelligence, RevOps, AI agents, AEO, GEO, answer engine optimization",
      },
      {
        "@type": "WebPage",
        url: `https://magnivo.ai/resources/${resource.slug}`,
        name: `${resource.title} — Magnivo.ai`,
        description: resource.description,
        isPartOf: { "@id": "https://magnivo.ai/#website" },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://magnivo.ai/" },
            { "@type": "ListItem", position: 2, name: "Resources", item: "https://magnivo.ai/resources" },
            { "@type": "ListItem", position: 3, name: resource.title, item: `https://magnivo.ai/resources/${resource.slug}` },
          ],
        },
      },
    ],
  });

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: resourceLd }} />
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
                <Clock size={14} /> {isHiddenCost ? "6 min read" : `${readMinutes} min read`}
              </div>
              <div className="flex items-center gap-2">
                Published {isHiddenCost ? "July 15, 2026" : resource.content ? "July 21, 2026" : "April 2025"}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-2 hover:text-foreground transition-colors ml-auto"
              >
                <Share2 size={14} /> {copied ? "Copied!" : "Share"}
              </button>
            </div>
          </header>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <FadeIn delay={0.1}>
              {isHiddenCost ? (
                <HiddenCostBlogContent onAudit={() => window.dispatchEvent(new CustomEvent("open-demo-modal"))} />
              ) : resource.content ? (
                <div className="prose-mockup space-y-6 text-foreground/90 text-lg leading-relaxed">
                  {renderMarkdownLite(resource.content)}
                </div>
              ) : (
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
              )}
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

function HiddenCostBlogContent({ onAudit }: { onAudit: () => void }) {
  return (
    <div className="space-y-10 text-foreground/90 text-lg leading-relaxed">
      {/* Introduction */}
      <section className="space-y-6">
        <p className="text-xl text-foreground font-medium leading-relaxed border-l-2 border-[var(--accent-blue)] pl-4 italic">
          Somewhere right now, a talented rep is opening their fifth browser tab of the morning—LinkedIn to check if a contact still works there, a company site to guess an email pattern, a news search to see if anything happened worth mentioning, and a spreadsheet to log all of it. They haven’t sold anything yet. They may not sell anything today.
        </p>
        <p>
          That’s not a bad morning. That’s the job, at most B2B companies running on a stack of disconnected tools. Salesforce’s <em>State of Sales</em> research (a survey of 7,775 sales professionals) found that reps spend just <strong>28% of their week actually selling</strong>—the rest disappears into admin, data entry, and manual research. The same report found sales teams run an average of <strong>10 tools to close a deal</strong>, with <strong>66% of reps</strong> saying they’re overwhelmed by the number of tools they have to juggle.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10 font-sans">
          <div className="surface-card p-6 rounded-lg text-center border border-border/50 bg-secondary/10 hover:border-[var(--accent-blue)]/50 transition-colors">
            <div className="text-5xl font-extrabold text-[var(--accent-blue)] font-mono">28%</div>
            <div className="text-xs text-muted-foreground mt-2 uppercase tracking-wider font-semibold">Active Selling</div>
            <p className="text-sm text-muted-foreground/80 mt-2">All that reps spend of their week actually selling to prospects.</p>
          </div>
          <div className="surface-card p-6 rounded-lg text-center border border-border/50 bg-secondary/10 hover:border-[var(--accent-blue)]/50 transition-colors">
            <div className="text-5xl font-extrabold text-[var(--accent-blue)] font-mono">10</div>
            <div className="text-xs text-muted-foreground mt-2 uppercase tracking-wider font-semibold">GTM Tools</div>
            <p className="text-sm text-muted-foreground/80 mt-2">Average number of disconnected platforms run to close a single deal.</p>
          </div>
          <div className="surface-card p-6 rounded-lg text-center border border-border/50 bg-secondary/10 hover:border-[var(--accent-blue)]/50 transition-colors">
            <div className="text-5xl font-extrabold text-[var(--accent-blue)] font-mono">66%</div>
            <div className="text-xs text-muted-foreground mt-2 uppercase tracking-wider font-semibold">Reps Overwhelmed</div>
            <p className="text-sm text-muted-foreground/80 mt-2">Report feeling completely buried under daily tool sprawl.</p>
          </div>
        </div>

        <div className="bg-secondary/35 border border-border/50 rounded-lg p-6 my-6">
          <div className="font-bold text-[var(--accent-blue)] uppercase tracking-wider text-xs mb-2 flex items-center gap-2">
            <Sparkles size={14} /> Key Takeaway
          </div>
          <p className="text-foreground font-semibold leading-relaxed m-0">
            The cost of manual GTM work isn’t just hours lost—it’s pipeline that never gets built, signals that arrive too late to matter, and good reps who quietly burn out doing detective work instead of selling.
          </p>
        </div>

        <p>
          This is the old way. Magnivo AI is the newer, less exhausting one—and the rest of this piece walks through exactly why, and exactly how.
        </p>
      </section>

      {/* Real Cost Breakdown */}
      <section className="space-y-6 pt-6">
        <h2 className="text-3xl font-bold text-foreground tracking-tight border-b border-border/40 pb-2">The Real Cost Breakdown</h2>
        <p>
          To understand why manual research is a silent pipeline killer, we need to look at the numbers. It isn't just a minor productivity tax—it's a multi-layer leak across time, opportunity, quality, and human resources.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 font-sans">
          {/* Card A */}
          <div className="surface-card p-6 rounded-lg border border-border bg-card hover:border-[var(--accent-blue)]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-lg bg-[var(--accent-blue)]/10 flex items-center justify-center text-[var(--accent-blue)]">
                  <Clock size={18} />
                </div>
                <h3 className="text-xl font-bold m-0">A. Time Costs</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Prospecting research alone consumes 9% of a rep’s week on average—<strong>11% for B2B reps specifically</strong>, according to SPOTIO’s 2026 sales statistics report, before a single outreach message goes out. Multiply that across a 10-person team at a fully loaded $60/hour rate, and you’re looking at tens of thousands of dollars a year spent just finding and checking accounts manually before anyone gets a “yes.”
              </p>
            </div>
          </div>

          {/* Card B */}
          <div className="surface-card p-6 rounded-lg border border-border bg-card hover:border-[var(--accent-blue)]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-lg bg-[var(--accent-blue)]/10 flex items-center justify-center text-[var(--accent-blue)]">
                  <TrendingDown size={18} />
                </div>
                <h3 className="text-xl font-bold m-0">B. Opportunity Costs</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every hour spent verifying a contact is an hour not spent talking to a buyer. Delayed outreach means delayed pipeline. A delayed pipeline means, eventually, an uncomfortable board meeting when targets are missed.
              </p>
            </div>
          </div>

          {/* Card C */}
          <div className="surface-card p-6 rounded-lg border border-border bg-card hover:border-[var(--accent-blue)]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-lg bg-[var(--accent-blue)]/10 flex items-center justify-center text-[var(--accent-blue)]">
                  <ShieldAlert size={18} />
                </div>
                <h3 className="text-xl font-bold m-0">C. Quality Costs</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Manual research is inconsistent by design: one rep checks three signals, another checks zero and wings it. That inconsistency shows up as bad targeting: outreach sent to the wrong stakeholder, missing that a company just had a funding round or a leadership shake-up that should’ve changed the entire pitch.
              </p>
            </div>
          </div>

          {/* Card D */}
          <div className="surface-card p-6 rounded-lg border border-border bg-card hover:border-[var(--accent-blue)]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-lg bg-[var(--accent-blue)]/10 flex items-center justify-center text-[var(--accent-blue)]">
                  <Users size={18} />
                </div>
                <h3 className="text-xl font-bold m-0">D. Human Costs</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nobody joined a sales team to become a part-time LinkedIn detective. Reps who spend their week toggling between tools and manually qualifying leads burn out. The best ones leave first, because they have options. That’s a recruiting cost hiding inside a “productivity” problem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Getting Worse */}
      <section className="space-y-6 pt-6">
        <h2 className="text-3xl font-bold text-foreground tracking-tight border-b border-border/40 pb-2">Why This Problem Is Getting Worse (Not Better)</h2>
        <ul className="space-y-4 list-none pl-0">
          <li className="flex gap-4">
            <span className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary/80 border border-border text-xs font-mono font-bold flex items-center justify-center text-foreground mt-1">1</span>
            <div>
              <strong>More accounts, same headcount.</strong> GTM teams are expected to cover broader territory and hit higher quotas without proportionally more people.
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary/80 border border-border text-xs font-mono font-bold flex items-center justify-center text-foreground mt-1 flex-shrink-0">2</span>
            <div>
              <strong>More signals to track.</strong> Funding, layoffs, leadership changes, and product launches are all buying triggers now. Nobody can manually watch all of that, for every account, every single day.
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary/80 border border-border text-xs font-mono font-bold flex items-center justify-center text-foreground mt-1 flex-shrink-0">3</span>
            <div>
              <strong>Buyers show up already informed.</strong> By the time a prospect replies, they’ve already researched you—increasingly on AI engines like ChatGPT, Perplexity, and Gemini, not just Google. If you’re not visible there, you’re invisible at the exact moment it matters.
              <div className="mt-3 p-4 rounded-lg bg-[var(--accent-blue)]/5 border border-[var(--accent-blue)]/25 text-sm font-semibold font-sans">
                💡 Magnivo AI builds specifically for this shift, optimizing for AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) alongside traditional SEO.
              </div>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary/80 border border-border text-xs font-mono font-bold flex items-center justify-center text-foreground mt-1 flex-shrink-0">4</span>
            <div>
              <strong>Legacy CRMs are filing cabinets, not scouts.</strong> A CRM stores what you already found. It doesn’t go out and find anything for you.
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary/80 border border-border text-xs font-mono font-bold flex items-center justify-center text-foreground mt-1 flex-shrink-0">5</span>
            <div>
              <strong>Tool sprawl masquerades as progress.</strong> Salesforce’s own research found reps run an average of 10 tools to close a deal. Buying a ninth tool to fix what the first eight couldn’t isn’t a system—it’s a very expensive game of whack-a-mole.
            </div>
          </li>
        </ul>
      </section>

      {/* Mid-article CTA */}
      <section className="my-12 font-sans">
        <div className="relative overflow-hidden rounded-xl border border-[var(--accent-blue)]/30 bg-gradient-to-r from-secondary/50 to-background p-8 md:p-10 shadow-2xl backdrop-blur-md">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 rounded-full bg-[var(--accent-blue)]/10 blur-2xl"></div>
          <div className="relative z-10 max-w-xl">
            <h3 className="text-2xl font-bold tracking-tight text-foreground m-0">Tired of the Tuesday Morning Tool Sprawl?</h3>
            <p className="mt-3 text-muted-foreground text-base leading-relaxed">
              If any of this sounds like your Tuesday morning, see how Magnivo AI replaces the tool sprawl with one system before you read another paragraph. Get a diagnostic GTM audit of your stack.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button onClick={onAudit} className="btn-primary inline-flex items-center gap-2 cursor-pointer">
                Book Your Free GTM Audit <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The Magnivo System Approach */}
      <section className="space-y-6 pt-6">
        <h2 className="text-3xl font-bold text-foreground tracking-tight border-b border-border/40 pb-2">The Magnivo System Approach</h2>
        <p>
          Here’s the uncomfortable truth most GTM stacks won’t tell you: <strong>you don’t have a tool problem, you have a system problem</strong>. A tool for prospecting, a tool for email, a tool for calling, and a tool for reporting doesn’t add up to a strategy; it adds up to a CFO asking why there are nine invoices for “engagement.”
        </p>
        <p>
          Magnivo AI was built as the opposite of that: a <strong>unified AI GTM Operating System</strong> where platform, execution, and strategy compound instead of collide. Instead of stitching together point solutions, Magnivo AI runs the parts of the revenue motion that used to require a rep’s Tuesday morning:
        </p>

        {/* Feature Comparison */}
        <div className="space-y-4 my-8 font-sans">
          <div className="border border-border/40 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 bg-secondary/40 border-b border-border/40 text-sm font-bold p-4 uppercase tracking-wider text-muted-foreground">
              <div className="md:col-span-4">Capability</div>
              <div className="md:col-span-4 mt-2 md:mt-0">The Old Way (Manual)</div>
              <div className="md:col-span-4 mt-2 md:mt-0 text-[var(--accent-blue)]">The Magnivo Way (Unified AI)</div>
            </div>
            
            <div className="divide-y divide-border/40 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 p-4 gap-2 md:gap-0">
                <div className="md:col-span-4 font-bold text-foreground">Lead Discovery & Enrichment</div>
                <div className="md:col-span-4 text-muted-foreground/80 pr-4">Rep types list from LinkedIn, guesses pattern, logs to spreadsheet.</div>
                <div className="md:col-span-4 text-foreground font-medium flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[var(--accent-blue)] mt-0.5 flex-shrink-0" />
                  <span>Enriches accounts automatically against ICP criteria.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 p-4 gap-2 md:gap-0">
                <div className="md:col-span-4 font-bold text-foreground">Buying Signal Detection</div>
                <div className="md:col-span-4 text-muted-foreground/80 pr-4">Reps manually browse news and job boards checking accounts tab-by-tab.</div>
                <div className="md:col-span-4 text-foreground font-medium flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[var(--accent-blue)] mt-0.5 flex-shrink-0" />
                  <span>Auto-flags funding, leadership changes, product launches.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 p-4 gap-2 md:gap-0">
                <div className="md:col-span-4 font-bold text-foreground">Email Verification</div>
                <div className="md:col-span-4 text-muted-foreground/80 pr-4">Guessing patterns, risk hitting spam traps or high bounce rates.</div>
                <div className="md:col-span-4 text-foreground font-medium flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[var(--accent-blue)] mt-0.5 flex-shrink-0" />
                  <span>Marks every contact Verified (deliverable) or Pattern (inferred).</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 p-4 gap-2 md:gap-0">
                <div className="md:col-span-4 font-bold text-foreground">Automatic Lead Scoring</div>
                <div className="md:col-span-4 text-muted-foreground/80 pr-4">Flat static scoring or no scoring, burying hot opportunities.</div>
                <div className="md:col-span-4 text-foreground font-medium flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[var(--accent-blue)] mt-0.5 flex-shrink-0" />
                  <span>Surfaces the hottest, signal-rich accounts instantly first.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 p-4 gap-2 md:gap-0">
                <div className="md:col-span-4 font-bold text-foreground">Auto-Promotion to CRM</div>
                <div className="md:col-span-4 text-muted-foreground/80 pr-4">Reps decide what is worth import, keying data fields manually.</div>
                <div className="md:col-span-4 text-foreground font-medium flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[var(--accent-blue)] mt-0.5 flex-shrink-0" />
                  <span>Pushes qualified leads directly to CRM when they clear the bar.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 p-4 gap-2 md:gap-0">
                <div className="md:col-span-4 font-bold text-foreground">Stakeholder Mapping</div>
                <div className="md:col-span-4 text-muted-foreground/80 pr-4">Reps guess buying committee contacts individually, ignoring others.</div>
                <div className="md:col-span-4 text-foreground font-medium flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[var(--accent-blue)] mt-0.5 flex-shrink-0" />
                  <span>Builds buying committee maps and enriches missing profiles.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="italic text-muted-foreground border-l-4 border-border pl-4">
          None of this replaces a rep’s judgment on the call. It replaces the hours they used to spend just earning the right to make that call.
        </p>

        <p>
          <strong>The 10-day hook:</strong> Magnivo AI doesn’t ask you to rip out your stack and start over. Most teams have their first unified GTM system running—leads flowing, signals firing, hot accounts auto-promoted—<strong>within 10 days</strong>.
        </p>
      </section>

      {/* What This Looks Like in Practice */}
      <section className="space-y-6 pt-6">
        <h2 className="text-3xl font-bold text-foreground tracking-tight border-b border-border/40 pb-2">What This Looks Like in Practice</h2>
        <p>
          The mechanism is simple, even if the old way made it feel complicated: work that used to require a rep opening five tools and manually cross-checking each account now happens before the lead ever reaches them, inside Magnivo AI.
        </p>

        {/* Before / After visual block */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8 font-sans">
          <div className="p-6 rounded-lg border border-red-500/25 bg-red-950/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-2 -mr-2 text-red-500/10 font-bold text-7xl select-none font-mono">OLD</div>
            <div className="text-xs uppercase font-bold tracking-wider text-red-400 mb-2">The Old Queue</div>
            <div className="text-lg font-bold text-foreground mb-4">"50 unverified accounts, good luck"</div>
            <p className="text-sm text-muted-foreground leading-relaxed m-0">
              Reps begin the day with list verification, guessing contact info, hunting down trigger signals, and keying data. More admin, less selling.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-[var(--accent-blue)]/35 bg-[var(--accent-blue)]/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-2 -mr-2 text-[var(--accent-blue)]/15 font-bold text-7xl select-none font-mono">NEW</div>
            <div className="text-xs uppercase font-bold tracking-wider text-[var(--accent-blue)] mb-2">The Magnivo Queue</div>
            <div className="text-lg font-bold text-foreground mb-4">"12 verified, signal-qualified accounts, ranked by ready"</div>
            <p className="text-sm text-muted-foreground leading-relaxed m-0">
              Reps start their day directly talking to high-intent leads that already cleared verification and trigger scoring automatically. More selling, zero admin.
            </p>
          </div>
        </div>

        <p>
          Their queue shifts from “50 unverified accounts, good luck” to “12 verified, signal-qualified accounts, ranked by how ready they are.” That’s the difference between starting the day with research and starting the day with selling.
        </p>

        <p className="text-sm text-muted-foreground/60 italic">
          (We’re deliberately not attaching specific client numbers here until we have real, verifiable results ready to publish. We’d rather under-claim than round up—and ask us for a live walkthrough instead.)
        </p>
      </section>

      {/* Three Things Worth Remembering */}
      <section className="space-y-6 pt-6">
        <h2 className="text-3xl font-bold text-foreground tracking-tight border-b border-border/40 pb-2">Three Things Worth Remembering</h2>
        <div className="grid grid-cols-1 gap-4 font-sans">
          <div className="flex gap-4 p-4 rounded-lg bg-secondary/20 border border-border/40">
            <span className="text-xl font-bold text-[var(--accent-blue)] font-mono">01</span>
            <p className="text-sm text-muted-foreground m-0">
              <strong>Manual GTM research isn’t a minor tax</strong>—it’s often a third or more of a rep’s week, and it’s why reps start their day already behind.
            </p>
          </div>
          <div className="flex gap-4 p-4 rounded-lg bg-secondary/20 border border-border/40">
            <span className="text-xl font-bold text-[var(--accent-blue)] font-mono">02</span>
            <p className="text-sm text-muted-foreground m-0">
              <strong>The cost compounds beyond time</strong> into missed signals, inconsistent targeting, and reps who leave because the job turned into admin work.
            </p>
          </div>
          <div className="flex gap-4 p-4 rounded-lg bg-secondary/20 border border-border/40">
            <span className="text-xl font-bold text-[var(--accent-blue)] font-mono">03</span>
            <p className="text-sm text-muted-foreground m-0">
              <strong>A unified system beats another point solution</strong>. Automation doesn’t replace the rep—it replaces the research step, handing them a shorter, better-qualified list instead of a longer, colder one.
            </p>
          </div>
        </div>
        <p className="mt-4">
          If your team’s mornings look like five browser tabs and zero conversations, that’s not a discipline problem, it’s a system problem.
        </p>
      </section>

      {/* Final CTAs - Ready to see it for yourself */}
      <section className="pt-8 border-t border-border/40 font-sans">
        <div className="premium-card p-8 border border-border bg-card/65 rounded-xl space-y-6">
          <h3 className="text-2xl font-bold text-foreground m-0">Ready to see it for yourself?</h3>
          <p className="text-muted-foreground leading-relaxed text-base m-0">
            Discover how Magnivo AI can help you eliminate manual prospecting research, optimize for AEO/GEO signals, and unlock active selling hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button onClick={onAudit} className="btn-primary justify-center px-6 py-3 font-semibold text-base cursor-pointer">
              Get Your Free GTM Audit
            </button>
            <Link to="/platform" className="btn-secondary justify-center px-6 py-3 font-semibold text-base border border-border hover:bg-secondary/50 text-center">
              Explore the Platform
            </Link>
            <button onClick={onAudit} className="btn-secondary justify-center px-6 py-3 font-semibold text-base border border-border hover:bg-secondary/50 text-center cursor-pointer">
              Book a Walkthrough
            </button>
          </div>
          <p className="text-xs text-muted-foreground/60 m-0">
            * The GTM audit is a practical, 30-minute diagnosis of your GTM motion and data/signal pipelines. No purchase required.
          </p>
        </div>
      </section>
    </div>
  );
}
