import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { Check, Plus, Minus, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Magnivo.ai" },
      { name: "description", content: "A Growth Engine Built Around Your Goals." },
      { property: "og:title", content: "Pricing — Magnivo.ai" },
      { property: "og:description", content: "Scoped to your GTM stage. No long-term contracts." },
      { property: "og:image", content: "https://magnivo.ai/og-image.png" },
      { property: "og:image:alt", content: "Magnivo.ai Pricing — GTM plans for B2B teams" },
      { property: "og:url", content: "https://magnivo.ai/pricing" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://magnivo.ai/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://magnivo.ai/pricing" }],
  }),
  component: PricingPage,
});

const faqs = [
  {
    q: "How does pricing work?",
    a: "Pricing is scoped based on your GTM stage, target market, and which phases you need. Book a free audit and we'll give you a clear number within 24 hours.",
  },
  {
    q: "Is there a minimum contract length?",
    a: "No long-term contracts for founding clients. We work on a 90-day initial engagement with a 30-day notice period after that.",
  },
  {
    q: "Can I start with one service and expand?",
    a: "Yes. Most clients start with Starter (outbound + SEO) and expand to Growth once they see pipeline moving.",
  },
  {
    q: "Where does your team operate?",
    a: "Magnivo operates as a globally distributed team. We work async-first with structured weekly touchpoints — so your engagement never depends on a single timezone or a single person.",
  },
  {
    q: "Is there a free trial?",
    a: "We offer a free 30-minute GTM audit instead — you see exactly what we'd do for your business before committing anything.",
  },
  {
    q: "How quickly can I get started?",
    a: "Onboarding is completed within 10 business days of signing. Your first agent results in week 2.",
  },
];

function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className="premium-card overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-6 p-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-foreground">{it.q}</span>
              <span className="h-7 w-7 rounded-md border border-border flex items-center justify-center text-muted-foreground shrink-0">
                {isOpen ? <Minus size={14} /> : <Plus size={14} />}
              </span>
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const pricingLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://magnivo.ai/pricing#webpage",
      url: "https://magnivo.ai/pricing",
      name: "Pricing — Magnivo.ai",
      description: "Magnivo.ai pricing scoped to your GTM stage. No long-term contracts. Free 30-minute GTM audit available.",
      isPartOf: { "@id": "https://magnivo.ai/#website" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://magnivo.ai/" },
          { "@type": "ListItem", position: 2, name: "Pricing", item: "https://magnivo.ai/pricing" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://magnivo.ai/pricing#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does Magnivo pricing work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pricing is scoped based on your GTM stage, target market, and which phases you need. Book a free audit and we'll give you a clear number within 24 hours.",
          },
        },
        {
          "@type": "Question",
          name: "Is there a minimum contract length for Magnivo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No long-term contracts for founding clients. Magnivo works on a 90-day initial engagement with a 30-day notice period after that.",
          },
        },
        {
          "@type": "Question",
          name: "Can I start with one Magnivo service and expand?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Most clients start with Starter (outbound + SEO) and expand to Growth once they see pipeline moving.",
          },
        },
        {
          "@type": "Question",
          name: "Is there a free trial for Magnivo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Magnivo offers a free 30-minute GTM audit instead — you see exactly what we'd do for your business before committing anything.",
          },
        },
        {
          "@type": "Question",
          name: "How quickly can I get started with Magnivo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Onboarding is completed within 10 business days of signing. Your first agent results appear in week 2.",
          },
        },
        {
          "@type": "Question",
          name: "Where does the Magnivo team operate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Magnivo operates as a globally distributed team, working async-first with structured weekly touchpoints — so your engagement never depends on a single timezone or a single person.",
          },
        },
      ],
    },
  ],
});

function PricingPage() {
  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: pricingLd }} />
      {/* HERO SECTION */}
      <PageHero
        title="A Growth Engine Built Around Your Goals"
        subtitle="Every engagement is scoped to your stage, your market, and your GTM motion. No rigid tiers. No surprise overages. Just outcomes."
      >
        <a href="#cal-link" className="btn-primary">
          Book a Free GTM Audit <ArrowRight size={14} />
        </a>
      </PageHero>

      {/* PLANS SECTION */}
      <section className="container-x py-16 sm:py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Starter */}
          <FadeIn delay={0.05}>
            <div className="premium-card p-6 md:p-8 h-full flex flex-col relative">
              <h3 className="text-xl font-bold text-foreground">Starter</h3>
              <div className="mt-2 text-xs text-[var(--accent-blue)] font-medium">
                For founders who need pipeline now
              </div>
              <p className="mt-4 text-sm font-medium text-foreground border-b border-border pb-4">
                Your AI outbound machine, switched on.
              </p>
              <ul className="mt-6 space-y-3 mb-8 flex-1">
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-blue)] shrink-0" /> ICP definition
                  + lead generation
                </li>
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-blue)] shrink-0" /> AI-orchestrated
                  outbound (email + LinkedIn)
                </li>
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-blue)] shrink-0" /> SEO foundation
                  setup
                </li>
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-blue)] shrink-0" /> AEO/GEO initial
                  optimisation
                </li>
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-blue)] shrink-0" /> Weekly
                  performance reports
                </li>
              </ul>
              <a href="#cal-link" className="btn-ghost w-full justify-center">
                Get Started <ArrowRight size={14} />
              </a>
            </div>
          </FadeIn>

          {/* Growth */}
          <FadeIn delay={0.1}>
            <div className="premium-card p-6 md:p-8 h-full flex flex-col relative border-[var(--accent-green)]/30">
              <div className="absolute top-0 right-6 -translate-y-1/2 px-3 py-1 bg-[var(--accent-green)] text-[var(--brand-charcoal)] text-xs font-bold rounded-full">
                ⭐ Most Popular
              </div>
              <h3 className="text-xl font-bold text-foreground">Growth</h3>
              <div className="mt-2 text-xs text-[var(--accent-green)] font-medium">
                For teams ready for full-stack GTM
              </div>
              <p className="mt-4 text-sm font-medium text-foreground border-b border-border pb-4">
                Outbound + inbound + conversion, unified.
              </p>
              <ul className="mt-6 space-y-3 mb-8 flex-1">
                <li className="flex gap-2 text-sm text-foreground/80 font-medium">
                  Everything in Starter
                </li>
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-green)] shrink-0" /> Inbound
                  marketing + content
                </li>
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-green)] shrink-0" /> Performance
                  marketing (paid)
                </li>
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-green)] shrink-0" /> PLG conversion
                  flows
                </li>
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-green)] shrink-0" /> Meeting
                  booking + deal qualification
                </li>
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-green)] shrink-0" /> Live pipeline
                  dashboard
                </li>
              </ul>
              <a
                href="#cal-link"
                className="btn-primary w-full justify-center bg-[var(--accent-green)] text-[var(--brand-charcoal)] hover:bg-[var(--accent-green)]/90"
              >
                Book a Call <ArrowRight size={14} />
              </a>
            </div>
          </FadeIn>

          {/* Scale */}
          <FadeIn delay={0.15}>
            <div className="premium-card p-6 md:p-8 h-full flex flex-col relative">
              <h3 className="text-xl font-bold text-foreground">Scale</h3>
              <div className="mt-2 text-xs text-[var(--accent-blue)] font-medium">
                For companies replacing their GTM team
              </div>
              <p className="mt-4 text-sm font-medium text-foreground border-b border-border pb-4">
                The complete AI growth engine.
              </p>
              <ul className="mt-6 space-y-3 mb-8 flex-1">
                <li className="flex gap-2 text-sm text-foreground/80 font-medium">
                  Everything in Growth
                </li>
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-blue)] shrink-0" /> Full lifecycle
                  + retention marketing
                </li>
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-blue)] shrink-0" /> Referral +
                  viral growth systems
                </li>
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-blue)] shrink-0" /> ABM campaigns
                </li>
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-blue)] shrink-0" /> Dedicated ops
                  manager
                </li>
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-blue)] shrink-0" /> Monthly
                  business review
                </li>
              </ul>
              <a href="#cal-link" className="btn-ghost w-full justify-center">
                Talk to Us <ArrowRight size={14} />
              </a>
            </div>
          </FadeIn>

          {/* Enterprise */}
          <FadeIn delay={0.2}>
            <div className="premium-card p-6 md:p-8 h-full flex flex-col relative">
              <h3 className="text-xl font-bold text-foreground">Enterprise / Custom</h3>
              <div className="mt-2 text-xs text-[var(--accent-blue)] font-medium">
                For complex GTM motions
              </div>
              <p className="mt-4 text-sm font-medium text-foreground border-b border-border pb-4">
                Custom agent architecture. Built for you.
              </p>
              <ul className="mt-6 space-y-3 mb-8 flex-1">
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-blue)] shrink-0" /> Custom agent
                  build
                </li>
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-blue)] shrink-0" /> White-label
                  delivery
                </li>
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-blue)] shrink-0" /> Multi-market
                  GTM
                </li>
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-blue)] shrink-0" /> Dedicated team
                </li>
                <li className="flex gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-[var(--accent-blue)] shrink-0" /> SLA-backed
                  delivery
                </li>
              </ul>
              <a href="#cal-link" className="btn-ghost w-full justify-center">
                Contact Us <ArrowRight size={14} />
              </a>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-12 text-center text-muted-foreground bg-card/50 border border-border rounded-lg p-5 sm:p-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-5 sm:gap-6">
            <div className="flex-1 text-left sm:text-left">
              Not sure which plan fits? Book a free 30-minute GTM audit. We'll scope it for you. No
              pitch. Just clarity.
            </div>
            <a href="#cal-link" className="btn-primary shrink-0 justify-center">
              Book Free GTM Audit <ArrowRight size={14} />
            </a>
          </div>
        </FadeIn>
      </section>

      {/* WHAT EVERY PLAN INCLUDES SECTION */}
      <section className="container-x py-16 sm:py-20 md:py-24 bg-card/40 border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30" aria-hidden />
        <div className="relative">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold">
                What every plan includes —{" "}
                <span className="text-gradient">no matter where you start</span>
              </h2>
            </div>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={0.05}>
              <div className="premium-card p-6 h-full">
                <div className="h-10 w-10 rounded-md border border-border bg-gradient-to-br from-[var(--accent-blue)]/30 to-transparent flex items-center justify-center text-[var(--accent-blue)] mb-4">
                  <Check size={20} />
                </div>
                <h3 className="text-lg font-bold">Dedicated Ops Manager</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A human expert overseeing your agents, reviewing output quality, and managing your
                  engagement weekly.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="premium-card p-6 h-full">
                <div className="h-10 w-10 rounded-md border border-border bg-gradient-to-br from-[var(--accent-green)]/30 to-transparent flex items-center justify-center text-[var(--accent-green)] mb-4">
                  <Check size={20} />
                </div>
                <h3 className="text-lg font-bold">Live Pipeline Dashboard</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Real-time visibility into every lead, every agent action, and every stage of your
                  pipeline.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="premium-card p-6 h-full">
                <div className="h-10 w-10 rounded-md border border-border bg-gradient-to-br from-[var(--accent-blue)]/30 to-transparent flex items-center justify-center text-[var(--accent-blue)] mb-4">
                  <Check size={20} />
                </div>
                <h3 className="text-lg font-bold">Weekly Performance Reports</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Every Friday: leads added, outreach sent, replies received, meetings booked.
                  Always know what's working.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* COMPARE PLANS TABLE */}
      <section className="container-x py-16 sm:py-20 md:py-24">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Compare plans</h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="p-4 border-b border-border font-bold text-foreground w-1/4">
                    Feature
                  </th>
                  <th className="p-4 border-b border-border font-bold text-foreground">Starter</th>
                  <th className="p-4 border-b border-border font-bold text-[var(--accent-green)]">
                    Growth
                  </th>
                  <th className="p-4 border-b border-border font-bold text-foreground">Scale</th>
                  <th className="p-4 border-b border-border font-bold text-foreground">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-border">
                <tr className="hover:bg-card/50 transition-colors">
                  <td className="p-4 text-foreground/80 font-medium">AI Agents Active</td>
                  <td className="p-4 text-muted-foreground">15</td>
                  <td className="p-4 text-muted-foreground">30</td>
                  <td className="p-4 text-muted-foreground">52</td>
                  <td className="p-4 text-muted-foreground">Custom</td>
                </tr>
                <tr className="hover:bg-card/50 transition-colors">
                  <td className="p-4 text-foreground/80 font-medium">Outbound Channels</td>
                  <td className="p-4 text-muted-foreground">Email + LinkedIn</td>
                  <td className="p-4 text-muted-foreground">+ WhatsApp + Voice</td>
                  <td className="p-4 text-muted-foreground">All channels</td>
                  <td className="p-4 text-muted-foreground">Custom</td>
                </tr>
                <tr className="hover:bg-card/50 transition-colors">
                  <td className="p-4 text-foreground/80 font-medium">SEO + AEO + GEO</td>
                  <td className="p-4 text-muted-foreground">Foundation</td>
                  <td className="p-4 text-muted-foreground">Full</td>
                  <td className="p-4 text-muted-foreground">Full + Advanced</td>
                  <td className="p-4 text-muted-foreground">Custom</td>
                </tr>
                <tr className="hover:bg-card/50 transition-colors">
                  <td className="p-4 text-foreground/80 font-medium">Paid Marketing</td>
                  <td className="p-4 text-muted-foreground">—</td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-green)]" />
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-blue)]" />
                  </td>
                  <td className="p-4 text-muted-foreground">Custom</td>
                </tr>
                <tr className="hover:bg-card/50 transition-colors">
                  <td className="p-4 text-foreground/80 font-medium">PLG Flows</td>
                  <td className="p-4 text-muted-foreground">—</td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-green)]" />
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-blue)]" />
                  </td>
                  <td className="p-4 text-muted-foreground">Custom</td>
                </tr>
                <tr className="hover:bg-card/50 transition-colors">
                  <td className="p-4 text-foreground/80 font-medium">Retention & Lifecycle</td>
                  <td className="p-4 text-muted-foreground">—</td>
                  <td className="p-4 text-muted-foreground">—</td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-blue)]" />
                  </td>
                  <td className="p-4 text-muted-foreground">Custom</td>
                </tr>
                <tr className="hover:bg-card/50 transition-colors">
                  <td className="p-4 text-foreground/80 font-medium">ABM Campaigns</td>
                  <td className="p-4 text-muted-foreground">—</td>
                  <td className="p-4 text-muted-foreground">—</td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-blue)]" />
                  </td>
                  <td className="p-4 text-muted-foreground">Custom</td>
                </tr>
                <tr className="hover:bg-card/50 transition-colors">
                  <td className="p-4 text-foreground/80 font-medium">Dedicated Ops Manager</td>
                  <td className="p-4 text-muted-foreground">—</td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-green)]" />
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-blue)]" />
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-blue)]" />
                  </td>
                </tr>
                <tr className="hover:bg-card/50 transition-colors">
                  <td className="p-4 text-foreground/80 font-medium">Live Dashboard</td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-blue)]" />
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-green)]" />
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-blue)]" />
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-blue)]" />
                  </td>
                </tr>
                <tr className="hover:bg-card/50 transition-colors">
                  <td className="p-4 text-foreground/80 font-medium">Weekly Reports</td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-blue)]" />
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-green)]" />
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-blue)]" />
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-blue)]" />
                  </td>
                </tr>
                <tr className="hover:bg-card/50 transition-colors">
                  <td className="p-4 text-foreground/80 font-medium">Monthly Business Review</td>
                  <td className="p-4 text-muted-foreground">—</td>
                  <td className="p-4 text-muted-foreground">—</td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-blue)]" />
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <Check size={16} className="text-[var(--accent-blue)]" />
                  </td>
                </tr>
                <tr className="hover:bg-card/50 transition-colors">
                  <td className="p-4 text-foreground/80 font-bold border-t border-border/50">
                    Pricing
                  </td>
                  <td className="p-4 border-t border-border/50">
                    <a
                      href="#cal-link"
                      className="text-[var(--accent-blue)] hover:underline text-sm font-medium"
                    >
                      Talk to Us
                    </a>
                  </td>
                  <td className="p-4 border-t border-border/50">
                    <a
                      href="#cal-link"
                      className="text-[var(--accent-green)] hover:underline text-sm font-medium"
                    >
                      Talk to Us
                    </a>
                  </td>
                  <td className="p-4 border-t border-border/50">
                    <a
                      href="#cal-link"
                      className="text-[var(--accent-blue)] hover:underline text-sm font-medium"
                    >
                      Talk to Us
                    </a>
                  </td>
                  <td className="p-4 border-t border-border/50">
                    <a
                      href="#cal-link"
                      className="text-[var(--accent-blue)] hover:underline text-sm font-medium"
                    >
                      Talk to Us
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </FadeIn>
      </section>

      {/* FAQ SECTION */}
      <section className="container-x py-16 sm:py-20 md:py-24">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Got questions? We got answers.</h2>
          </div>
        </FadeIn>
        <div className="max-w-3xl mx-auto">
          <FAQ items={faqs} />
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="relative overflow-hidden">
        <div className="aurora" aria-hidden />
        <div className="absolute inset-0 mesh-hero" aria-hidden />
        <div className="container-x relative py-16 sm:py-20 md:py-28 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold">Still on the fence?</h2>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
              30 minutes with our team will show you exactly what Magnivo would do for your
              business. No pitch. No pressure. Just a clear GTM plan.
            </p>
            <div className="mt-8 flex justify-center">
              <a href="#cal-link" className="btn-primary justify-center">
                Book Your Free GTM Audit <ArrowRight size={14} />
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">No obligation. No credit card.</p>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  );
}
