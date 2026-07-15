import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { Plus, Minus, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Magnivo.ai" },
      {
        name: "description",
        content:
          "Answers to common questions about Magnivo's AI GTM platform — how it works, who it's for, buying signals, outreach, integrations, security, and more.",
      },
      { property: "og:title", content: "FAQ — Magnivo.ai" },
      {
        property: "og:description",
        content: "Everything you need to know about Magnivo's AI GTM platform.",
      },
      { property: "og:image", content: "https://magnivo.ai/og-image.png" },
      { property: "og:image:alt", content: "Magnivo.ai FAQ — AI GTM platform questions answered" },
      { property: "og:url", content: "https://magnivo.ai/faq" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://magnivo.ai/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://magnivo.ai/faq" }],
  }),
  component: FaqPage,
});

type QA = { q: string; a: string };

const platformBasics: QA[] = [
  {
    q: "What is Magnivo?",
    a: "Magnivo is an AI GTM (Go-to-Market) platform that automates the entire sales pipeline — from defining your ideal customer profile (ICP) and discovering leads to identifying buying signals, enriching contacts, personalizing outreach, and managing follow-ups. Instead of juggling multiple tools, Magnivo brings your GTM workflow into one AI-powered platform.",
  },
  {
    q: "Who is Magnivo built for?",
    a: "Magnivo is designed for B2B SaaS companies, startups, sales teams, founders, GTM engineers, SDR and BDR teams, RevOps teams, and agencies managing outbound campaigns. If your business relies on outbound sales or lead generation, Magnivo can help automate repetitive GTM tasks.",
  },
  {
    q: "What problems does Magnivo solve?",
    a: "Magnivo helps eliminate manual prospecting and fragmented workflows by finding companies that match your ICP, detecting buying signals, identifying decision-makers, enriching contact information, generating personalized outreach, automating follow-ups, and syncing with your CRM. This reduces manual effort and helps sales teams focus on closing deals.",
  },
  {
    q: "What is an AI GTM platform?",
    a: "An AI GTM platform uses artificial intelligence to automate go-to-market activities such as market research, lead generation, sales prospecting, outreach, qualification, and pipeline management. It helps businesses identify high-intent prospects faster and execute sales workflows more efficiently.",
  },
  {
    q: "How does Magnivo find potential customers?",
    a: "Magnivo continuously analyzes public company data, buying signals, hiring activity, funding events, leadership changes, technology adoption, and other indicators to identify businesses that are more likely to become customers.",
  },
  {
    q: "What are buying signals?",
    a: "Buying signals are events that indicate a company may be ready to purchase a product or service — funding announcements, leadership hires, job postings, product launches, technology changes, expansion into new markets, or hiring SDRs and sales teams. Magnivo tracks these signals to prioritize high-intent accounts.",
  },
  {
    q: "Does Magnivo generate personalized outreach?",
    a: "Yes. Magnivo creates AI-generated emails and outreach messages based on each prospect's company, industry, recent business events, and buying signals, making communication more relevant and personalized.",
  },
];

const capabilitiesAndFit: QA[] = [
  {
    q: "Can Magnivo replace manual prospecting?",
    a: "Magnivo significantly reduces manual prospecting by automating company discovery, lead research, contact enrichment, signal monitoring, and outreach preparation. Sales teams can spend more time building relationships instead of collecting data.",
  },
  {
    q: "Does Magnivo integrate with existing CRM systems?",
    a: "Yes. Magnivo is designed to integrate with popular CRM platforms so that leads, contacts, and sales activities stay synchronized across your sales workflow.",
  },
  {
    q: "Does Magnivo support multichannel outreach?",
    a: "Yes. Magnivo is built to support outreach across multiple communication channels, helping teams engage prospects wherever they are most responsive.",
  },
  {
    q: "How is Magnivo different from traditional CRM software?",
    a: "Traditional CRMs primarily store customer information and track interactions. Magnivo actively helps sales teams discover new opportunities, identify buying intent, automate research, personalize outreach, and recommend next actions using AI.",
  },
  {
    q: "Is Magnivo suitable for startups?",
    a: "Yes. Magnivo is designed for startups that need to scale outbound sales without hiring large sales teams. It automates repetitive GTM work while allowing founders and small teams to focus on customer conversations.",
  },
  {
    q: "Can agencies use Magnivo?",
    a: "Yes. Agencies can use Magnivo to manage prospecting, outreach, lead qualification, and sales workflows for multiple clients from a single platform.",
  },
];

const gettingStartedAndTrust: QA[] = [
  {
    q: "How quickly can I get started?",
    a: "Most teams can begin using Magnivo after onboarding by defining their Ideal Customer Profile, connecting their existing tools, and launching their first AI-assisted GTM workflow.",
  },
  {
    q: "Is my data secure?",
    a: "Magnivo is designed with security and privacy in mind. Customer data is handled using industry-standard security practices, and access controls help protect sensitive business information.",
  },
  {
    q: "Does Magnivo use AI agents?",
    a: "Yes. Magnivo uses specialized AI agents to perform tasks such as market research, lead discovery, contact enrichment, outreach generation, workflow automation, and sales intelligence, working together to support your GTM process.",
  },
  {
    q: "Can Magnivo help improve outbound sales performance?",
    a: "Yes. By automating research, identifying higher-intent prospects, and generating personalized outreach, Magnivo helps sales teams increase efficiency, improve response rates, and spend more time on qualified opportunities.",
  },
  {
    q: "Do I need technical knowledge to use Magnivo?",
    a: "No. Magnivo is designed for business users, founders, and sales teams. You don't need coding or AI expertise to create and run GTM workflows.",
  },
  {
    q: "Can I request a demo?",
    a: "Yes. You can book a personalized demo to see how Magnivo fits your sales process, explore AI workflows, and learn how it can automate your GTM operations.",
  },
];

const gtmConcepts: QA[] = [
  {
    q: "What is the difference between a CRM and an AI GTM platform?",
    a: "A CRM is a system of record — it stores contacts, logs activity, and tracks deals after the fact. An AI GTM platform is a system of action: it finds who to target, detects when they're ready to buy, and executes outreach automatically. Most teams use both, with the AI GTM platform feeding a clean, enriched pipeline into the CRM.",
  },
  {
    q: "What is signal-based selling?",
    a: "Signal-based selling means prioritizing outreach to accounts showing real-time indicators of intent or need — funding, hiring, leadership changes, or technology adoption — instead of contacting a static list. It focuses effort on prospects most likely to convert right now. Magnivo automates signal detection so reps only work warm accounts.",
  },
  {
    q: "What is GTM engineering?",
    a: "GTM engineering is the practice of building and maintaining automated, data-driven systems for go-to-market execution — connecting data sources, AI models, and outreach tools into a single operating pipeline, similar to how engineers build software systems. Magnivo packages this discipline into a ready-to-use platform, so teams don't need to build it themselves.",
  },
  {
    q: "How do AI sales agents work?",
    a: "AI sales agents are autonomous workflows that perform specific GTM tasks — researching companies, enriching contacts, drafting outreach, or scheduling follow-ups — using AI models combined with live data. They run continuously in the background and hand off qualified conversations to human reps. Magnivo's agents are purpose-built for each stage of the pipeline, from discovery to follow-up.",
  },
  {
    q: "How can AI automate outbound sales?",
    a: "AI can automate outbound sales by identifying target accounts, enriching contact data, writing personalized messages, sequencing follow-ups, and adjusting outreach based on engagement — all without manual research. This lets a small team run outbound at a volume that would otherwise require a much larger SDR bench. Magnivo runs this entire loop end to end.",
  },
  {
    q: "How do I identify companies that are ready to buy?",
    a: "Look for buying signals — funding rounds, new leadership hires, job postings for relevant roles, expansion announcements, or technology changes — that indicate a company has budget, urgency, or a trigger event. Combining several signals is more reliable than any single one. Magnivo monitors these signals continuously and surfaces the accounts most worth prioritizing.",
  },
  {
    q: "What is intent data in B2B sales?",
    a: "Intent data is information that shows a company or buyer is actively researching or showing interest in a category of product — from public signals (hiring, funding, tech adoption) to behavioral signals (content engagement, search activity). It helps sales teams prioritize prospects who are further along in their buying journey. Magnivo layers intent data with firmographic fit to rank accounts by true readiness.",
  },
  {
    q: "How do I build an AI-powered sales pipeline?",
    a: "Start by defining your ICP, then connect data sources for account discovery, signal monitoring, and contact enrichment, and layer in AI-generated outreach and follow-up automation — all synced back to your CRM. The goal is a closed loop where sourcing, outreach, and CRM data reinforce each other. Magnivo provides this as a single connected platform instead of stitching together separate tools.",
  },
  {
    q: "Can AI replace SDRs?",
    a: "AI can automate the repetitive, research-heavy parts of an SDR's job — prospecting, enrichment, drafting outreach, and follow-ups — but human judgment still matters for complex conversations and relationship-building. Most teams use AI to multiply what each SDR can cover, not to eliminate the role entirely. Magnivo is built to augment sales teams so they spend time on conversations, not data collection.",
  },
  {
    q: "How do I automate lead generation with AI?",
    a: "Automating lead generation with AI means using models and data pipelines to continuously find companies matching your ICP, enrich them with contact and firmographic data, and score them by buying signals — without manual list-building. The output should feed directly into outreach and your CRM. Magnivo runs this whole process automatically, so new qualified leads arrive without manual sourcing.",
  },
];

const faqSections: { title: string; items: QA[] }[] = [
  { title: "Platform Basics", items: platformBasics },
  { title: "Capabilities & Fit", items: capabilitiesAndFit },
  { title: "Getting Started & Trust", items: gettingStartedAndTrust },
  { title: "AI GTM Concepts", items: gtmConcepts },
];

const allFaqs = faqSections.flatMap((s) => s.items);

function FAQAccordion({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(null);
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
              <h3 className="font-medium text-foreground">{it.q}</h3>
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

const faqLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://magnivo.ai/faq#webpage",
      url: "https://magnivo.ai/faq",
      name: "FAQ — Magnivo.ai",
      description:
        "Answers to common questions about Magnivo's AI GTM platform — how it works, who it's for, buying signals, outreach, integrations, security, and more.",
      isPartOf: { "@id": "https://magnivo.ai/#website" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://magnivo.ai/" },
          { "@type": "ListItem", position: 2, name: "FAQ", item: "https://magnivo.ai/faq" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://magnivo.ai/faq#faq",
      mainEntity: allFaqs.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    },
  ],
});

function FaqPage() {
  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
      <PageHero
        eyebrow="FAQ"
        title="Everything you need to know about Magnivo"
        subtitle="Answers to the questions we hear most from founders, sales teams, and RevOps leaders evaluating an AI GTM platform."
      >
        <a href="#cal-link" className="btn-primary">
          Book a Free GTM Audit <ArrowRight size={14} />
        </a>
      </PageHero>

      <section className="container-x py-16 sm:py-20 md:py-24">
        <div className="max-w-3xl mx-auto space-y-16">
          {faqSections.map((section) => (
            <FadeIn key={section.title}>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                {section.title}
              </h2>
              <FAQAccordion items={section.items} />
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="max-w-3xl mx-auto mt-16 premium-card p-8 text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">Still have questions?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Book a free 30-minute GTM audit and we'll walk through exactly how Magnivo fits your
              sales process.
            </p>
            <a href="#cal-link" className="btn-primary">
              Book a Free GTM Audit <ArrowRight size={14} />
            </a>
          </div>
        </FadeIn>
      </section>
    </SiteLayout>
  );
}
