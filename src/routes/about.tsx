import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Magnivo AI" },
      { name: "description", content: "Magnivo AI is building the AI operating system for modern GTM — the team, story, and values behind the platform." },
      { property: "og:title", content: "About Magnivo AI" },
      { property: "og:description", content: "The team and mission behind the AI brain for GTM." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const values = [
    { t: "Outcomes over outputs", d: "We measure ourselves on the revenue we move, not the work we ship." },
    { t: "Build with rigor", d: "AI-native does not mean shortcut. We engineer for reliability and trust." },
    { t: "Customer in the room", d: "Every roadmap decision starts and ends with a real customer problem." },
    { t: "Compound learning", d: "Our models, playbooks, and team get sharper with every engagement." },
  ];
  const team = ["Founder & CEO", "Co-Founder, CTO", "Head of AI", "Head of GTM", "Design Lead", "Engineering Lead"];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="About"
        title="We're building the AI brain for revenue teams."
        subtitle="Magnivo exists because the modern GTM stack is broken. Twenty tools, no shared intelligence, and humans stitching it together. We think AI changes that — and we're building the operating system to prove it."
      />

      <section className="container-x py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        <FadeIn>
          <div className="surface-card p-8 h-full">
            <div className="label-eyebrow text-[var(--accent-blue)]">Our Story</div>
            <h2 className="mt-3 text-2xl font-bold">From operators, for operators.</h2>
            <p className="mt-4 text-muted-foreground">
              Magnivo was founded by GTM operators and AI engineers who'd lived through the pain of fragmented stacks. We started with a single AI agent for outbound — and watched it replace work across an entire pipeline.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.05}>
          <div className="surface-card p-8 h-full">
            <div className="label-eyebrow text-[var(--accent-green)]">Why We Built This</div>
            <h2 className="mt-3 text-2xl font-bold">GTM is the next OS-level shift.</h2>
            <p className="mt-4 text-muted-foreground">
              The category isn't a better CRM or a smarter sequencer. It's the underlying intelligence layer connecting every revenue motion. That's what Magnivo is.
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="container-x py-12">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Team</h2>
        </FadeIn>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {team.map((t, i) => (
            <FadeIn key={t} delay={i * 0.04}>
              <div className="surface-card p-5 text-center">
                <div className="h-16 w-16 rounded-full mx-auto bg-gradient-to-br from-[var(--accent-blue)]/40 to-[var(--accent-green)]/30 border border-border" />
                <div className="mt-4 text-sm font-medium">Team Member</div>
                <div className="text-xs text-muted-foreground mt-1">{t}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="container-x py-20">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Values</h2>
        </FadeIn>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v, i) => (
            <FadeIn key={v.t} delay={i * 0.04}>
              <div className="surface-card hover-blue p-6 h-full">
                <div className="font-semibold">{v.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="container-x py-16">
        <div className="surface-card p-10 text-center">
          <h2 className="text-3xl font-bold">Want to build with us?</h2>
          <p className="mt-3 text-muted-foreground">We're hiring across engineering, AI, and GTM.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/contact" className="btn-primary">Join us <ArrowRight size={14} /></Link>
            <Link to="/contact" className="btn-ghost">Work with us</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
