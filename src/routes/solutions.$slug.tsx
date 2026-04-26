import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeIn } from "@/components/FadeIn";
import { solutions } from "@/lib/site-data";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const solution = solutions.find((s) => s.slug === params.slug);
    if (!solution) throw notFound();
    return { solution };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.solution.name} — Magnivo.ai Solutions` },
          { name: "description", content: loaderData.solution.description },
          { property: "og:title", content: `${loaderData.solution.name} — ${loaderData.solution.model}` },
          { property: "og:description", content: loaderData.solution.description },
        ]
      : [{ title: "Solution — Magnivo.ai" }],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-x py-32 text-center">
        <h1 className="text-4xl font-bold">Solution not found</h1>
        <p className="mt-4 text-muted-foreground">This solution doesn't exist.</p>
        <Link to="/solutions" className="btn-primary mt-8 inline-flex">All Solutions</Link>
      </div>
    </SiteLayout>
  ),
  component: SolutionDetail,
});

function SolutionDetail() {
  const { solution } = Route.useLoaderData();
  const Icon = solution.icon;
  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 dot-grid opacity-60" aria-hidden />
        <div className="absolute inset-0 mesh-hero" aria-hidden />
        <div className="container-x relative py-16 sm:py-20 md:py-32">
          <FadeIn>
            <div className="flex flex-wrap items-center gap-3">
              <div className="h-12 w-12 rounded-md border border-border flex items-center justify-center text-[var(--accent-green)] bg-card">
                <Icon size={22} />
              </div>
              <span className="pill-green">{solution.model}</span>
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold">{solution.name}</h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl">{solution.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Get Started <ArrowRight size={14} /></Link>
              <Link to="/contact" className="btn-ghost">Request Consultation</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="container-x py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20">
          <FadeIn>
            <div className="label-eyebrow text-[var(--accent-green)]">The Engagement</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">What's included in {solution.name}</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              We don't just hand over tools; we build the infrastructure and the teams needed to run an AI-native revenue engine.
            </p>
            <ul className="mt-8 space-y-4">
              {solution.included.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <CheckCircle2 size={18} className="text-[var(--accent-green)] mt-0.5 shrink-0" />
                  <span className="text-foreground/90 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="premium-card p-8 sm:p-10 border border-border/50 bg-secondary/20 h-full flex flex-col justify-center">
              <div className="label-eyebrow">Projected Outcome</div>
              <div className="mt-6 text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                "{solution.outcome}"
              </div>
              <p className="mt-6 text-sm text-muted-foreground italic">
                * Based on average performance lift across our enterprise client base.
              </p>
              <Link to="/contact" className="btn-primary mt-10 w-full justify-center">
                Review Your Use Case <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="container-x py-16 bg-secondary/10 border-y border-border/50">
        <div className="max-w-3xl">
          <FadeIn>
            <div className="label-eyebrow">Strategic Alignment</div>
            <h2 className="mt-3 text-2xl font-bold">Why {solution.name}?</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              In the age of AI, software alone is a commodity. The real value lies in how it's orchestrated within your specific business context. Our {solution.name} solution ensures that your AI agents aren't just running, but are optimized for your unique ICP, product-led motions, and enterprise sales cycles.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="container-x py-16 sm:py-20 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold">Ready to transform your GTM?</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Schedule a session with our solutions architects to map out your AI transition.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">Book Consultation <ArrowRight size={14} /></Link>
            <Link to="/solutions" className="btn-ghost">View All Solutions</Link>
          </div>
        </FadeIn>
      </section>
    </SiteLayout>
  );
}
