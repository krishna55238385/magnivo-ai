import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

import { FadeIn } from "@/components/FadeIn";
import { products } from "@/lib/site-data";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Magnivo AI` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — ${loaderData.product.tagline}` },
          { property: "og:description", content: loaderData.product.description },
        ]
      : [{ title: "Product — Magnivo AI" }],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-x py-32 text-center">
        <h1 className="text-4xl font-bold">Product not found</h1>
        <p className="mt-4 text-muted-foreground">This product doesn't exist.</p>
        <Link to="/products" className="btn-primary mt-8 inline-flex">All Products</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="container-x py-32 text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
      </div>
    </SiteLayout>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const Icon = product.icon;
  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 dot-grid opacity-60" aria-hidden />
        <div className="absolute inset-0 mesh-hero" aria-hidden />
        <div className="container-x relative py-24 md:py-32">
          <FadeIn>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-md border border-border flex items-center justify-center text-[var(--accent-blue)] bg-card">
                <Icon size={22} />
              </div>
              <span className="pill-blue">{product.tagline}</span>
            </div>
            <h1 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight">{product.name}</h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{product.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Start Free <ArrowRight size={14} /></Link>
              <Link to="/contact" className="btn-ghost">Book Demo</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="container-x py-20">
        <FadeIn>
          <div className="label-eyebrow">Capabilities</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">What {product.name} does</h2>
        </FadeIn>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {product.features.map((f: string, i: number) => (
            <FadeIn key={f} delay={i * 0.05}>
              <div className="surface-card hover-blue p-6 h-full">
                <div className="label-eyebrow text-[var(--accent-blue)]">Feature 0{i + 1}</div>
                <p className="mt-3 text-foreground/90">{f}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="container-x py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FadeIn>
            <div className="surface-card p-7 h-full">
              <div className="label-eyebrow">Use Case</div>
              <h3 className="mt-3 text-xl font-semibold">Built for fast-moving revenue teams</h3>
              <p className="mt-3 text-muted-foreground">
                {product.name} plugs into your existing motion and starts producing measurable lift in days — not quarters.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="surface-card p-7 h-full">
              <div className="label-eyebrow">Integrations</div>
              <h3 className="mt-3 text-xl font-semibold">Works with your stack</h3>
              <p className="mt-3 text-muted-foreground">
                Salesforce, HubSpot, Snowflake, Slack, LinkedIn, Gmail, and 100+ more — plus a full API for custom workflows.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="container-x py-20">
        <FadeIn>
          <div className="surface-card p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">See {product.name} in action</h2>
            <p className="mt-4 text-muted-foreground">A 20-minute personalized walkthrough.</p>
            <div className="mt-7 flex justify-center gap-3">
              <Link to="/contact" className="btn-primary">Book Demo <ArrowRight size={14} /></Link>
              <Link to="/products" className="btn-ghost">All Products</Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </SiteLayout>
  );
}
