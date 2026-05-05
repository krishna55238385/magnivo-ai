import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { products } from "@/lib/site-data";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — Magnivo.ai" },
      {
        name: "description",
        content:
          "Six AI products built for modern revenue teams: Leadfinder, Reachout, Compass, Orbit, Socialiq, and Agentdesk.",
      },
      { property: "og:title", content: "6 AI Products. One Revenue Ecosystem." },
      { property: "og:description", content: "AI-native tools across the full revenue stack." },
      { property: "og:image", content: "https://magnivo.ai/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://magnivo.ai/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://magnivo.ai/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Products"
        title="6 AI Products. One Revenue Ecosystem."
        subtitle="Every tool a modern revenue team needs — purpose-built, AI-native, and connected by the Magnivo platform."
      />
      <section className="container-x py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <FadeIn key={p.slug} delay={i * 0.04}>
                <div className="surface-card hover-blue p-5 sm:p-8 h-full">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="h-12 w-12 rounded-md border border-border flex items-center justify-center text-[var(--accent-blue)]">
                      <Icon size={22} />
                    </div>
                    <span className="pill-blue">{p.tagline}</span>
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold">{p.name}</h2>
                  <p className="mt-2 text-muted-foreground">{p.description}</p>
                  <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-[var(--accent-green)] mt-1">▸</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <Link to="/products/$slug" params={{ slug: p.slug }} className="btn-ghost">
                      Learn More <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
