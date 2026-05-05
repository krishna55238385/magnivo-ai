import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Plus,
  Minus,
  X,
  Check,
  Target,
  Zap,
  RefreshCw,
  TrendingUp,
  MessageSquare,
  ChevronDown,
  Rocket,
  Briefcase,
  Store,
  BarChart2,
} from "lucide-react";
import { useState, lazy, Suspense, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { FadeIn } from "@/components/FadeIn";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const HeroVisual = lazy(() =>
  import("@/components/HeroVisual").then((m) => ({ default: m.HeroVisual })),
);
const DataLayerScrollSystem = lazy(() =>
  import("@/components/DataLayerScrollSystem").then((m) => ({ default: m.DataLayerScrollSystem })),
);
const TrustSnapshot = lazy(() =>
  import("@/components/HomeConversionSections").then((m) => ({ default: m.TrustSnapshot })),
);
const AuditBlueprint = lazy(() =>
  import("@/components/HomeConversionSections").then((m) => ({ default: m.AuditBlueprint })),
);
const DemoModal = lazy(() =>
  import("@/components/DemoModal").then((m) => ({ default: m.DemoModal })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Magnivo AI — The AI Brain Behind Your GTM OS" },
      {
        name: "description",
        content:
          "Magnivo runs your entire B2B revenue motion — outreach, pipeline, and retention — through one AI-powered GTM operating system built for B2B teams.",
      },
      { property: "og:title", content: "Magnivo AI — The AI GTM Operating System" },
      {
        property: "og:description",
        content: "52 AI agents. One revenue system. Built for B2B teams scaling to $5M ARR.",
      },
      { property: "og:image", content: "https://magnivo.ai/og-image.png" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://magnivo.ai/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Magnivo AI — The AI GTM Operating System" },
      {
        name: "twitter:description",
        content: "52 AI agents. One revenue system. Built for B2B revenue teams.",
      },
      { name: "twitter:image", content: "https://magnivo.ai/og-image.png" },
      { tagName: "link", rel: "canonical", href: "https://magnivo.ai/" },
    ],
  }),
  component: HomePage,
});

const softwareAppLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Magnivo.ai",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://magnivo.ai",
  description:
    "The AI GTM Operating System for B2B Revenue Teams. Unifies data, intelligence, and autonomous execution into one compounding revenue engine.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free GTM audit available",
  },
});

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ─── Word-by-word blur reveal ──────────────────────────────── */
const wordContainer = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.09, delayChildren: delay },
  }),
};
const wordItem = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease },
  },
};

function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={className}
      variants={wordContainer}
      custom={delay}
      initial="hidden"
      animate="visible"
    >
      {text.split(" ").map((word, i) => (
        <motion.span key={i} variants={wordItem} className="inline-block mr-[0.28em] last:mr-0">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ─── Magnetic CTA button ───────────────────────────────────── */
function MagneticButton({
  children,
  className,
  onClick,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 25 });
  const sy = useSpring(y, { stiffness: 350, damping: 25 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = btnRef.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.28);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={btnRef}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
      className={className}
      onClick={onClick}
      {...(rest as object)}
    >
      {children}
    </motion.button>
  );
}

/* ─── Infinite marquee strip ────────────────────────────────── */
function MarqueeStrip({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-container overflow-hidden">
      <motion.div
        className="flex gap-3"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        style={{ width: "max-content" }}
      >
        {doubled.map((pill, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-border/60 bg-white/70 px-5 py-2 text-[12px] font-semibold text-foreground/70 shadow-sm"
          >
            {pill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Staggered card list ───────────────────────────────────── */
function StaggerList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease },
  },
};

function HomePage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: softwareAppLd }} />
      {/* HERO SECTION */}
      <section className="relative overflow-hidden min-h-[calc(100svh-3.5rem)] sm:min-h-[calc(100svh-4rem)] flex items-start sm:items-center pt-10 sm:pt-14 md:pt-20 pb-10 sm:pb-14 md:pb-20">
        <div className="aurora" aria-hidden />
        <div className="absolute inset-0 dot-grid opacity-35" aria-hidden />
        <div className="absolute inset-0 mesh-hero" aria-hidden />
        <div className="noise" aria-hidden />

        {/* Spotlights */}
        <div
          className="absolute -top-44 left-1/2 -translate-x-1/2 w-[min(1100px,150vw)] h-[560px] sm:h-[640px] pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at center top, color-mix(in oklab, var(--accent-blue) 30%, transparent), transparent 62%)",
            filter: "blur(26px)",
          }}
        />
        <div
          className="absolute -bottom-44 -left-32 w-[min(720px,130vw)] h-[440px] sm:h-[520px] pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at left bottom, color-mix(in oklab, var(--accent-green) 25%, transparent), transparent 65%)",
            filter: "blur(34px)",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-blue)]/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-green)]/40 to-transparent" />

        <div className="hidden md:block absolute top-32 left-10 h-2 w-2 rounded-full bg-[var(--accent-blue)] float-y" />
        <div className="hidden md:block absolute top-60 right-16 h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] float-y-delay" />
        <div className="hidden md:block absolute bottom-40 left-1/4 h-1 w-1 rounded-full bg-foreground/60 float-y" />

        <div className="container-x relative w-full">
          {/* Eyebrow */}
          <motion.div
            className="flex justify-center mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-gold)] animate-pulse" />
              The AI GTM Operating System
            </span>
          </motion.div>

          {/* Headline — word-by-word reveal */}
          <h1 className="text-center text-4xl leading-[1.02] sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold mx-auto max-w-6xl">
            <WordReveal text="The AI Brain Behind" className="block text-foreground" delay={0.1} />
            <WordReveal
              text="Your GTM OS."
              className="block mt-1 md:mt-2"
              delay={0.38}
            />
          </h1>
          <style>{`.word-green span{color:#1B3A2D}`}</style>
          <motion.p
            className="mt-6 sm:mt-8 md:mt-9 text-center text-base sm:text-lg md:text-xl text-foreground/75 max-w-3xl mx-auto leading-relaxed px-1 sm:px-2 font-medium"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.72, ease }}
          >
            Magnivo runs your entire revenue motion — signals, outreach, pipeline, and retention —
            through one intelligent system built for B2B growth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-7 sm:mt-9 md:mt-10 flex justify-center flex-wrap gap-4 sm:gap-5 px-1 sm:px-2 items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease }}
          >
            <MagneticButton
              onClick={() => setDemoOpen(true)}
              className="btn-primary w-full sm:w-auto justify-center text-base sm:text-lg px-7 sm:px-9 py-3.5"
              data-cursor-text="Audit"
            >
              Book a Free GTM Audit <ArrowRight size={16} />
            </MagneticButton>
            <a
              href="#ten-day-plan"
              className="btn-text-link w-full sm:w-auto justify-center text-base sm:text-lg"
            >
              See the 10‑Day Plan <ArrowRight size={15} />
            </a>
          </motion.div>

          {/* Trust badges — stagger in */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm text-muted-foreground font-medium"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 1.05 } },
            }}
          >
            {["No pitch", "30-min GTM audit", "Revenue blueprint", "Limited founding spots"].map(
              (item) => (
                <motion.span
                  key={item}
                  variants={{
                    hidden: { opacity: 0, scale: 0.88 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "backOut" } },
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 shadow-sm"
                >
                  <Check size={13} style={{ color: "#1B3A2D" }} />
                  {item}
                </motion.span>
              ),
            )}
          </motion.div>

          <FadeIn delay={0.2} className="mt-8 sm:mt-12 md:mt-16">
            <Suspense fallback={null}>
              <HeroVisual />
            </Suspense>
          </FadeIn>
        </div>
      </section>

      <Suspense fallback={null}>
        {demoOpen ? <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} /> : null}
      </Suspense>

      <Suspense fallback={<div className="py-16" />}>
        <TrustSnapshot onAudit={() => setDemoOpen(true)} />
      </Suspense>

      {/* CREDIBILITY BAR — infinite marquee */}
      <section className="border-y border-border py-8 overflow-hidden relative bg-card/30">
        <div className="text-center text-[10px] font-bold tracking-[0.22em] uppercase text-muted-foreground mb-6">
          Built for modern B2B revenue teams
        </div>
        <MarqueeStrip
          items={[
            "Pipeline Intelligence",
            "Autonomous Outreach",
            "AI Agents",
            "Revenue Attribution",
            "AEO + GEO",
            "RevOps System",
            "Deal Intelligence",
            "Lifecycle Automation",
            "Buying Signal Detection",
            "AI Content Engine",
          ]}
        />
      </section>

      <Suspense fallback={<div className="py-16" />}>
        <AuditBlueprint onAudit={() => setDemoOpen(true)} />
      </Suspense>

      {/* DATA FOUNDATION SECTION (INTERACTIVE) */}
      <Suspense fallback={<div className="py-24" />}>
        <DataLayerScrollSystem />
      </Suspense>

      <div className="container-x">
        <div className="divider-glow" />
      </div>
      {/* THE PROBLEM */}
      <section className="container-x py-12 sm:py-16 md:py-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(800px,130vw)] h-[520px] sm:h-[800px] bg-[var(--accent-blue)]/5 blur-[120px] rounded-full pointer-events-none" />
        <FadeIn>
          <div className="max-w-4xl">
            <div className="label-eyebrow mb-4">THE REALITY</div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold">
              Your GTM stack has{" "}
              <span className="text-gradient block mt-1">12 tools and zero intelligence.</span>
            </h2>
            <div className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed space-y-4">
              <p>
                Most B2B revenue teams are running on a collection of disconnected point solutions —
                a tool for prospecting, a tool for email, a tool for attribution, a tool for
                content. None of them talk to each other. None of them learn.
              </p>
              <p>
                The result? Pipeline that stalls. Campaigns that can't be attributed. Customers who
                churn silently. And a team spending more time managing tools than driving revenue.
              </p>
            </div>
          </div>
        </FadeIn>

        <StaggerList className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch lg:items-center">
          <motion.div variants={staggerItem}>
            <div className="premium-card p-5 md:p-7 h-full bg-card/50 border-border/50">
              <div className="text-xs font-bold tracking-widest text-muted-foreground mb-6">
                BEFORE MAGNIVO
              </div>
              <ul className="space-y-4">
                {[
                  "Manual outreach with no intelligence layer",
                  "Marketing and sales running blind",
                  "6 vendors, 6 contracts, 6 dashboards",
                  "Invisible to AI search engines",
                  "Churn you don't see coming",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <X size={16} className="text-[var(--destructive)]/80 shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <div className="premium-card p-5 sm:p-7 md:p-9 h-full border-[var(--accent-green)]/30 relative z-10 scale-100 lg:scale-105 bg-card">
              <div className="text-xs font-bold tracking-widest text-[var(--accent-green)] mb-6">
                WITH MAGNIVO
              </div>
              <ul className="space-y-5">
                {[
                  "One AI system across every growth function",
                  "Intelligence that compounds with every interaction",
                  "Platform + execution + strategy unified",
                  "Visible on Google AND on AI engines",
                  "Retention signals before churn happens",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-base text-foreground font-medium"
                  >
                    <Check
                      size={20}
                      className="text-[var(--accent-green)] shrink-0 mt-0.5"
                      strokeWidth={3}
                    />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <div className="premium-card p-5 md:p-7 h-full bg-card/50 border-border/50">
              <div className="text-xs font-bold tracking-widest text-[var(--accent-blue)] mb-6">
                WHAT YOU GET
              </div>
              <ul className="space-y-4">
                {[
                  "Predictable pipeline",
                  "Full revenue attribution",
                  "AI that works while your team sleeps",
                  "Answers when buyers ask AI for recommendations",
                  "Revenue that grows systematically",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <ArrowRight size={16} className="text-[var(--accent-blue)] shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </StaggerList>
      </section>

      <div className="container-x">
        <div className="divider-glow" />
      </div>

      {/* WHAT MAGNIVO IS */}
      <section className="container-x py-12 sm:py-16 md:py-24">
        <FadeIn>
          <div className="max-w-3xl">
            <div className="label-eyebrow mb-4">THE AI GROWTH STACK</div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              One system.{" "}
              <span className="text-gradient block mt-1">Three compounding layers.</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              Most companies pick a tool OR hire an agency OR bring in consultants. Magnivo clients
              get all three — unified, integrated, and compounding.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 md:mt-14 space-y-6 md:space-y-8">
          {/* Card 1 */}
          <FadeIn delay={0.05}>
            <div className="premium-card overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-6 md:p-9 border-b md:border-b-0 md:border-r border-border/50">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-black text-muted-foreground/30">01</span>
                    <span className="px-3 py-1 rounded-full border border-[var(--accent-blue)]/30 bg-[var(--accent-blue)]/10 text-xs font-bold tracking-wider text-[var(--accent-blue)]">
                      PLATFORM
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">Growth Intelligence</h3>
                  <div className="mt-2 text-lg font-medium text-[var(--accent-blue)]">
                    See everything. Know what to do next.
                  </div>
                  <p className="mt-6 text-muted-foreground leading-relaxed">
                    The Magnivo platform unifies your entire revenue signal layer — account
                    intelligence, pipeline visibility, buying signals, attribution, and AI-powered
                    recommendations — into one GTM OS that runs continuously and gets smarter every
                    week.
                  </p>
                  <div className="mt-8">
                    <Link to="/platform" className="btn-ghost">
                      Explore Platform <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
                <div className="p-6 md:p-9 bg-card/30 flex flex-col justify-center">
                  <ul className="space-y-5">
                    {[
                      "Live pipeline intelligence",
                      "Account-level buying signals",
                      "Full revenue attribution",
                      "AI-powered next best action",
                      "AEO + GEO visibility tracking",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/90 font-medium">
                        <ArrowRight
                          size={18}
                          className="text-[var(--accent-blue)] shrink-0 mt-0.5"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Card 2 */}
          <FadeIn delay={0.1}>
            <div className="premium-card overflow-hidden border-[var(--accent-green)]/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-6 md:p-9 border-b md:border-b-0 md:border-r border-border/50">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-black text-muted-foreground/30">02</span>
                    <span className="px-3 py-1 rounded-full border border-[var(--accent-green)]/30 bg-[var(--accent-green)]/10 text-xs font-bold tracking-wider text-[var(--accent-green)]">
                      EXECUTION
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">Autonomous Execution</h3>
                  <div className="mt-2 text-lg font-medium text-[var(--accent-green)]">
                    AI that runs your growth motion. 24/7.
                  </div>
                  <p className="mt-6 text-muted-foreground leading-relaxed">
                    We deploy and orchestrate AI agents across your entire revenue motion — finding
                    the right accounts, engaging them across every channel, converting them through
                    intelligent sequences, and retaining them through lifecycle systems. Fully
                    managed. Always running.
                  </p>
                </div>
                <div className="p-6 md:p-9 bg-card/30 flex flex-col justify-center">
                  <ul className="space-y-5">
                    {[
                      "AI-orchestrated outbound (email + LinkedIn)",
                      "ABM campaign execution",
                      "SEO, AEO + GEO optimisation",
                      "Performance marketing management",
                      "Retention + lifecycle automation",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/90 font-medium">
                        <ArrowRight
                          size={18}
                          className="text-[var(--accent-green)] shrink-0 mt-0.5"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Card 3 */}
          <FadeIn delay={0.15}>
            <div className="premium-card overflow-hidden border-[var(--accent-gold)]/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-6 md:p-9 border-b md:border-b-0 md:border-r border-border/50">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-black text-muted-foreground/30">03</span>
                    <span className="px-3 py-1 rounded-full border border-[var(--accent-gold)]/30 bg-[var(--accent-gold)]/10 text-xs font-bold tracking-wider text-[var(--accent-gold)]">
                      CONSULTING
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">Strategic AI Advisory</h3>
                  <div className="mt-2 text-lg font-medium text-[var(--accent-gold)]">
                    The thinking behind the system.
                  </div>
                  <p className="mt-6 text-muted-foreground leading-relaxed">
                    Like McKinsey — but built for AI-era revenue growth. We embed with your
                    leadership team to architect your GTM strategy, build your AI roadmap, identify
                    the growth gaps your current stack can't see, and ensure every major revenue
                    decision is backed by intelligence — not instinct.
                  </p>
                </div>
                <div className="p-6 md:p-9 bg-card/30 flex flex-col justify-center">
                  <ul className="space-y-5">
                    {[
                      "GTM architecture design",
                      "AI growth roadmap",
                      "Revenue gap analysis",
                      "ICP and positioning strategy",
                      "Board and investor-ready growth narratives",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/90 font-medium">
                        <ArrowRight
                          size={18}
                          className="text-[var(--accent-gold)] shrink-0 mt-0.5"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-12 text-center max-w-3xl mx-auto">
            <div className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              The compounding effect kicks in
            </div>
            <div className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              when all three layers run together. That's when revenue stops being linear and starts
              being exponential.
            </div>
          </div>
        </FadeIn>
      </section>

      {/* THE NEW GROWTH REALITY */}
      <section className="border-y border-[var(--accent-green)]/20 py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent-green)_15%,transparent)_0%,transparent_70%)] opacity-50" />
        <div className="container-x relative">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <div className="label-eyebrow mb-6 text-[var(--accent-green)]">
                THE NEW GROWTH REALITY
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                The rules of B2B growth{" "}
                <span className="text-[var(--accent-green)] block mt-2">just changed. Again.</span>
              </h2>
              <div className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed space-y-6 max-w-3xl mx-auto">
                <p>
                  Your buyers research on AI engines before they ever visit your website. Your
                  competitors are deploying autonomous agents while you're still managing sequences
                  manually. And the companies winning in 2026 aren't the ones with the biggest teams
                  — they're the ones with the most intelligent systems.
                </p>
                <p>
                  The question isn't whether AI will transform your GTM. It already has. The
                  question is whether your business is built to compound that advantage — or fall
                  behind it.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left border-y border-[var(--accent-green)]/20 py-8">
                <div className="md:px-6">
                  <div className="text-5xl font-black text-foreground mb-3 tabular-nums">
                    <AnimatedCounter target={70} suffix="%+" />
                  </div>
                  <div className="text-sm text-[var(--accent-green)] font-semibold leading-relaxed">
                    of B2B buyers research on AI engines before contacting a vendor
                  </div>
                  <a
                    href="https://www.gartner.com/en/newsroom/press-releases/2024-03-20-gartner-says-b2b-buying-behavior-has-changed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground/60 mt-3 font-medium hover:text-[var(--accent-green)] transition-colors underline decoration-dotted"
                  >
                    Based on Gartner 2024 B2B research
                  </a>
                </div>
                <div className="md:px-6 md:border-l border-[var(--accent-green)]/20">
                  <div className="text-5xl font-black text-foreground mb-3 tabular-nums">
                    <AnimatedCounter target={3} suffix="x" />
                  </div>
                  <div className="text-sm text-[var(--accent-green)] font-semibold leading-relaxed">
                    more pipeline for companies running autonomous GTM vs manual outreach
                  </div>
                  <a
                    href="https://www.forrester.com/blogs/autonomous-gtm-is-here/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground/60 mt-3 font-medium hover:text-[var(--accent-green)] transition-colors underline decoration-dotted"
                  >
                    Based on Forrester GTM study
                  </a>
                </div>
                <div className="md:px-6 md:border-l border-[var(--accent-green)]/20">
                  <div className="text-5xl font-black text-foreground mb-3 tabular-nums">
                    <AnimatedCounter target={60} suffix="%" />
                  </div>
                  <div className="text-sm text-[var(--accent-green)] font-semibold leading-relaxed">
                    lower CAC for businesses using unified AI growth systems vs point solutions
                  </div>
                  <a
                    href="https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/the-future-of-b2b-sales-is-here"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground/60 mt-3 font-medium hover:text-[var(--accent-green)] transition-colors underline decoration-dotted"
                  >
                    Based on McKinsey stack analysis
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* UNIFIED HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-12 sm:py-16 md:py-24">
        <div className="container-x">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="label-eyebrow mb-4 tracking-[0.2em]">HOW IT WORKS</div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                From first signal{" "}
                <span className="text-[var(--accent-green)] block mt-1">to loyal customer.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Every stage of your revenue motion — covered, connected, and compounding. Here's
                exactly what runs inside Magnivo.
              </p>
            </div>
          </FadeIn>

          <div className="max-w-5xl mx-auto flex flex-col items-center">
            {[
              {
                stageNum: "01",
                stage: "ACQUIRE",
                color: "#06402b",
                icon: Target,
                title: "Find & Engage the Right Accounts",
                body: "Before your competitors even know they exist. Magnivo identifies high-intent accounts, builds your pipeline, and launches coordinated outreach across every channel.",
                cols: [
                  [
                    "ICP Analysis & TAM Mapping",
                    "Account-Based Marketing",
                    "Buying Signal Detection",
                  ],
                  ["Multi-channel Outbound", "AI Content Generation", "Demand Generation"],
                  ["SEO, AEO + GEO", "Performance Marketing", "Social Listening"],
                ],
              },
              {
                stageNum: "02",
                stage: "ENGAGE",
                color: "#c5a059",
                icon: MessageSquare,
                title: "Turn Attention Into Conversations",
                body: "Every reply handled. Every signal acted on. Magnivo manages the full engagement layer — personalised, omnichannel, and always on.",
                cols: [
                  ["Personalised Sequences", "Smart Follow-ups", "Objection Handling"],
                  [
                    "Omnichannel Orchestration",
                    "Social Selling Automation",
                    "Intent Signal Response",
                  ],
                  ["Inbox Management", "Reply Classification", "Meeting Booking"],
                ],
              },
              {
                stageNum: "03",
                stage: "CONVERT",
                color: "#002819",
                icon: TrendingUp,
                title: "Close Deals Predictably",
                body: "No deal goes cold. No proposal sits unanswered. Magnivo manages the full conversion layer — from qualified opportunity to signed contract.",
                cols: [
                  ["AI Deal Scoring", "Automated Proposals", "Contract Intelligence"],
                  ["Pipeline Management", "Meeting Qualification", "Executive Engagement"],
                  ["Revenue Forecasting", "Proposal Follow-up", "CRM Sync"],
                ],
              },
              {
                stageNum: "04",
                stage: "RETAIN & COMPOUND",
                color: "#775a19",
                icon: RefreshCw,
                title: "Grow Revenue From Every Customer",
                body: "The system learns from every interaction — win, loss, signal, response. Results compound. CAC drops. Revenue grows systematically.",
                cols: [
                  ["Health Score Monitoring", "Churn Prevention", "Lifecycle Automation"],
                  ["Expansion Opportunities", "Referral & Viral Systems", "Champion Tracking"],
                  ["Revenue Attribution", "Win/Loss Intelligence", "GTM Strategy Refinement"],
                ],
              },
            ].map((stage, i) => {
              const Icon = stage.icon;
              const isLast = i === 3;
              return (
                <div key={i} className="w-full flex flex-col items-center">
                  <FadeIn delay={i * 0.1} className="w-full">
                    <div
                      className="w-full rounded-lg overflow-hidden transition-all duration-300 group premium-card"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.boxShadow = `0 0 24px -6px ${stage.color}40`)
                      }
                      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = ``)}
                    >
                      <div
                        className="w-full bg-card p-4 sm:p-5 md:p-6 flex flex-col md:flex-row gap-5 md:gap-6"
                        style={{ borderLeft: `4px solid ${stage.color}` }}
                      >
                        {/* Left Side */}
                        <div className="w-full md:w-[40%] flex flex-col items-start">
                          <div className="flex items-center gap-3 mb-6">
                            <span className="text-2xl font-black text-foreground/10">
                              {stage.stageNum}
                            </span>
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-secondary border border-border text-foreground/70">
                              {stage.stage}
                            </span>
                          </div>
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 bg-secondary"
                            style={{ color: stage.color }}
                          >
                            <Icon size={24} />
                          </div>
                          <h3 className="text-2xl font-bold text-foreground mb-3">{stage.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {stage.body}
                          </p>
                        </div>

                        {/* Right Side - Capabilities */}
                        <div className="w-full md:w-[60%] grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-border md:pl-6">
                          {stage.cols.map((col, colIdx) => (
                            <ul key={colIdx} className="space-y-2.5">
                              {col.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-start gap-2">
                                  <span
                                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                                    style={{ backgroundColor: stage.color }}
                                  />
                                  <span className="text-sm text-foreground/70 leading-tight">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ))}
                        </div>
                      </div>
                    </div>
                  </FadeIn>

                  {/* Connector */}
                  {!isLast && (
                    <div className="hidden md:flex flex-col items-center justify-center h-8 w-full my-1">
                      <div className="w-[2px] h-full bg-border relative">
                        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 text-muted-foreground/40">
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* TIMELINE STRIP */}
          <FadeIn delay={0.4}>
            <div className="max-w-5xl mx-auto mt-10 border-t border-border py-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="text-foreground text-sm">
                  <span className="font-bold mr-2">Day 1:</span>
                  <span className="text-muted-foreground">Onboarding + ICP</span>
                </div>
                <div className="text-foreground text-sm md:border-l border-border">
                  <span className="font-bold mr-2">Week 2:</span>
                  <span className="text-muted-foreground">System live</span>
                </div>
                <div className="text-foreground text-sm border-t md:border-t-0 pt-4 md:pt-0 md:border-l border-border">
                  <span className="font-bold mr-2">Week 3:</span>
                  <span className="text-muted-foreground">First results</span>
                </div>
                <div className="text-sm border-t md:border-t-0 pt-4 md:pt-0 md:border-l border-border">
                  <span className="font-semibold text-[var(--accent-blue)] mr-2">Month 3:</span>
                  <span className="text-[var(--accent-blue)] font-semibold">Full compounding</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* BOTTOM STATEMENT */}
          <FadeIn delay={0.5}>
            <div className="mt-12 text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Platform. Execution. Strategy.
              </h3>
              <p className="text-base text-muted-foreground mb-8">
                Three layers running together. That's when revenue stops being linear and starts
                being exponential.
              </p>
              <button
                onClick={() => setDemoOpen(true)}
                className="btn-primary inline-flex items-center justify-center px-9 py-4 text-base"
              >
                Book Free GTM Audit <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container-x">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="label-eyebrow mb-4">WHO IT'S FOR</div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground">
                Built for the teams{" "}
                <span className="block mt-1" style={{ color: "#1B3A2D" }}>
                  driving modern B2B revenue.
                </span>
              </h2>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                We work with B2B companies at $500K–$5M ARR who have a product that works, a market
                that exists, and a GTM motion that isn't keeping up.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Rocket,
                title: "B2B SaaS Founders",
                role: "Founder / CEO",
                body: "Post-PMF. You have product-market fit but your GTM is still manual, inconsistent, and dependent on one or two people.",
                outcome: "Replace your manual GTM with a system that scales without headcount",
              },
              {
                icon: Briefcase,
                title: "Professional Services",
                role: "Managing Partner / Founder",
                body: "You sell expertise but pipeline depends on referrals and relationships. Outbound is inconsistent. Inbound is zero.",
                outcome: "Build a predictable pipeline engine so you can focus on delivery",
              },
              {
                icon: Store,
                title: "B2B Marketplaces",
                role: "CEO / Head of Growth",
                body: "Two-sided markets need coordinated GTM across buyers and sellers simultaneously. Standard tools weren't built for this.",
                outcome: "Orchestrate multi-sided GTM with one intelligent system",
              },
              {
                icon: BarChart2,
                title: "RevOps Teams",
                role: "VP RevOps / Head of RevOps",
                body: "You have the sales motion and the data. What's missing is the intelligence layer that connects them and acts on signals automatically.",
                outcome: "Add the AI intelligence layer on top of your existing sales motion",
              },
              {
                icon: Zap,
                title: "Funded Startups",
                role: "Founder / CEO / CRO",
                body: "Pre-Series B. You just raised and need to show pipeline growth fast. Hiring a VP Sales takes 6 months. Building the system takes 10 days.",
                outcome: "Install the revenue system before you make the first sales hire",
              },
              {
                icon: Target,
                title: "Enterprise Sales Teams",
                role: "VP Sales / Head of Sales",
                body: "You have quota, territory, and a team. What you don't have is an intelligent system finding, prioritising, and engaging the right accounts before your reps touch them.",
                outcome: "Give your sales team an AI system that fills the top of funnel at scale",
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="group h-full bg-card border border-border hover:border-[#1B3A2D]/30 hover:shadow-md transition-all duration-300 rounded-xl p-5 flex flex-col premium-card">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                      style={{ color: "#1B3A2D", background: "rgba(27,58,45,0.08)" }}
                    >
                      <Icon size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{card.title}</h3>
                    <span className="inline-block px-2.5 py-1 rounded-full bg-secondary text-muted-foreground text-xs mb-4 w-fit">
                      {card.role}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                      {card.body}
                    </p>
                    <div className="text-sm font-bold leading-snug" style={{ color: "#1B3A2D" }}>
                      → {card.outcome}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* NOT A FIT qualifier */}
          <FadeIn delay={0.3}>
            <div className="mt-8 max-w-3xl mx-auto bg-secondary border border-border rounded-lg py-5 px-5 sm:px-8 text-center">
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/40 mb-3">
                NOT A FIT IF...
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You're pre-revenue, don't have a defined product, or are looking for a one-time
                campaign. Magnivo is a system — it's built for companies ready to compound growth,
                not just run a campaign.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TRUST */}
      <section className="container-x py-12 sm:py-16 md:py-24">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="label-eyebrow mb-4">WHY MAGNIVO</div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold">Built different.</h2>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              In a market full of point solutions and disconnected agencies — Magnivo is built as a
              system from the ground up.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: "Systems thinking. Not tool thinking.",
              desc: "Every engagement is architected as a unified system — platform, execution, and strategy working together. Not another disconnected vendor.",
            },
            {
              title: "Intelligence that compounds.",
              desc: "Unlike agencies that reset every quarter, Magnivo's system learns from every signal, interaction, and outcome — getting sharper the longer it runs.",
            },
            {
              title: "Outcome-obsessed. Not activity-obsessed.",
              desc: "We don't report on emails sent or impressions served. We report on pipeline created, revenue influenced, and CAC reduced.",
            },
          ].map((point, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className="premium-card p-6 md:p-8 h-full border-t-[3px] border-t-transparent transition-all flex flex-col justify-center text-center"
                onMouseEnter={(e) => (e.currentTarget.style.borderTopColor = "#1B3A2D")}
                onMouseLeave={(e) => (e.currentTarget.style.borderTopColor = "transparent")}
              >
                <h3 className="text-xl font-bold text-foreground mb-4">{point.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{point.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-12 sm:py-16 md:py-24 max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center mb-10">
            <div className="label-eyebrow mb-4">FAQ</div>
            <h2 className="text-3xl sm:text-5xl font-bold">Common questions, answered.</h2>
          </div>
        </FadeIn>
        <FAQ items={faqs} />
      </section>

      {/* BOTTOM CTA */}
      <section className="relative overflow-hidden min-h-[50svh] sm:min-h-[60vh] flex items-center py-12 sm:py-16">
        <div className="aurora" aria-hidden />
        <div className="absolute inset-0 mesh-hero opacity-80" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />

        <div className="container-x relative z-10 text-center w-full">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-[5rem] font-bold leading-[1.06]">
              Stop running GTM.{" "}
              <span className="text-gradient block mt-2">Start compounding it.</span>
            </h2>
            <p className="mt-6 sm:mt-8 text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              One conversation. We map your current revenue system, identify the gaps, and show you
              exactly what Magnivo would build — before you commit to anything.
            </p>
            <div className="mt-10 sm:mt-12 flex justify-center px-1">
              <button
                onClick={() => setDemoOpen(true)}
                className="btn-primary w-full sm:w-auto justify-center px-10 sm:px-14 py-4 text-base sm:text-lg"
              >
                Book Your Free GTM Audit <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
            <p className="mt-8 text-sm font-medium tracking-widest uppercase text-muted-foreground/60">
              No pitch. No pressure. Just clarity.
            </p>
          </FadeIn>
        </div>
      </section>
    </SiteLayout>
  );
}

const faqs = [
  {
    q: "What do I get from the free GTM audit?",
    a: "You get a practical diagnosis of your current revenue motion: where pipeline is leaking, which workflows should be automated first, and what a focused 10-day implementation sprint would look like.",
  },
  {
    q: "Is this just another agency pitch?",
    a: "No. The audit is designed to be useful even if we never work together. We focus on the operating system behind your GTM: data, signals, workflows, agents, reporting, and human ownership.",
  },
  {
    q: "How is Magnivo different from 6sense, Demandbase, or Terminus?",
    a: "Those platforms give you data and signals. Magnivo gives you data, signals, AND the execution layer that acts on them — plus the strategic consulting to make sure you're acting on the right things. It's the difference between intelligence and outcomes.",
  },
  {
    q: "How do you ensure AI agents don't hallucinate or damage our brand?",
    a: "Brand safety is our priority. Our agents run on 'Deterministic AI' architectures — combining LLMs with strict brand guardrails, verified data sources, and human-in-the-loop triggers for high-stakes interactions. Nothing goes out without meeting your pre-defined rules.",
  },
  {
    q: "Is this a platform or a solution?",
    a: "Both — and that's the point. The platform gives your team live intelligence and visibility. The execution layer runs your growth motion using AI agents. The strategy layer ensures the thinking behind it is right. Most clients use all three.",
  },
  {
    q: "What does onboarding look like?",
    a: "We complete onboarding within 10 business days. Day 1 we define your ICP and audit your current GTM. Week 2 your system goes live. Week 3 you see first results.",
  },
  {
    q: "What is AEO and why does it matter now?",
    a: "Answer Engine Optimization ensures your brand appears when buyers ask ChatGPT, Perplexity, or Gemini for recommendations in your category. It's the channel your competitors haven't figured out yet — and where your next customer is already looking.",
  },
  {
    q: "Where does your team operate?",
    a: "Magnivo is a globally distributed team operating async-first with structured weekly touchpoints. Your engagement never depends on a single timezone or a single person.",
  },
  {
    q: "How do you handle trust and data access?",
    a: "We start with the least access needed for the audit, then define permissions before implementation. Agent actions are scoped, reviewed, and tied to measurable workflows instead of running as a black box.",
  },
  {
    q: "What size companies do you work with?",
    a: "We work best with B2B companies between $500K and $5M ARR — post-PMF, with a defined ICP, ready to build a repeatable revenue system.",
  },
];

function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-4">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className="premium-card overflow-hidden bg-card/40 border-border/50">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 sm:gap-6 p-4 sm:p-5 md:p-6 text-left hover:bg-card/40 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="text-lg font-bold text-foreground">{it.q}</span>
              <span className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-muted-foreground shrink-0 bg-background/50">
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-5 md:px-6 pb-5 md:pb-6 text-base text-muted-foreground leading-relaxed">
                  {it.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
