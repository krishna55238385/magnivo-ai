import { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Rocket,
  Zap,
  Share2,
  MessageSquare,
  BookOpen,
  FileText,
  Layout,
  BarChart3,
  ListTree,
} from "lucide-react";
import { products, solutions, resources } from "@/lib/site-data";
import { MagnivoLogo } from "./MagnivoLogo";

type MenuKey = "products" | "solutions" | "resources" | null;

const RESOURCE_ICONS = {
  Blog: BookOpen,
  Playbook: ListTree,
  Guide: Zap,
  "Case Study": Layout,
  Benchmark: BarChart3,
  Glossary: FileText,
};

const DemoModal = lazy(() => import("./DemoModal").then((m) => ({ default: m.DemoModal })));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "backdrop-blur-md bg-background/80 border-b border-border"
          : "bg-transparent"
      }`}
      onMouseLeave={() => setOpen(null)}
    >
      <div className="container-x flex h-14 sm:h-16 items-center justify-between">
        <Link
          to="/"
          className="flex shrink-0 items-center"
          onClick={() => setMobileOpen(false)}
          aria-label="Magnivo.ai home"
        >
          <MagnivoLogo className="text-lg sm:text-xl" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm text-muted-foreground">
          <NavLink to="/platform" onEnter={() => setOpen(null)}>
            Platform
          </NavLink>
          <NavTrigger
            label="Solutions"
            active={open === "solutions"}
            onEnter={() => setOpen("solutions")}
          />
          <NavTrigger
            label="Products"
            active={open === "products"}
            onEnter={() => setOpen("products")}
          />
          <NavLink to="/pricing" onEnter={() => setOpen(null)}>
            Pricing
          </NavLink>
          <NavTrigger
            label="Resources"
            active={open === "resources"}
            onEnter={() => setOpen("resources")}
          />
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/platform" className="btn-ghost text-sm py-2 px-4">
            Explore Platform
          </Link>
          <button
            onClick={() => setDemoOpen(true)}
            className="btn-primary text-sm"
            data-cursor-text="Audit"
          >
            Free GTM Audit <ArrowRight size={14} />
          </button>
        </div>

        <button
          className="lg:hidden text-foreground p-2 -mr-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mega menus (desktop) */}
      {open && (
        <div className="hidden lg:block border-t border-border bg-background/95 backdrop-blur-md">
          <div className="container-x py-8">
            {open === "products" && <ProductsMega setOpen={setOpen} />}
            {open === "solutions" && <SolutionsMega setOpen={setOpen} />}
            {open === "resources" && <ResourcesMega setOpen={setOpen} />}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t border-border bg-background overflow-y-auto"
          style={{ maxHeight: "calc(100svh - 56px)" }}
        >
          <div className="container-x py-4 flex flex-col gap-1 text-sm pb-8">
            <MobileAccordion title="Products">
              <div className="grid grid-cols-1 gap-1 pt-2">
                {products.map((p) => {
                  const Icon = p.icon;
                  return (
                    <Link
                      key={p.slug}
                      to="/products/$slug"
                      params={{ slug: p.slug }}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 py-2.5 px-2 rounded-md hover:bg-card"
                    >
                      <span className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-[var(--accent-blue)] shrink-0">
                        <Icon size={15} />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-foreground font-medium">{p.name}</span>
                        <span className="block text-xs text-muted-foreground truncate">
                          {p.tagline}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </MobileAccordion>
            <MobileAccordion title="Solutions">
              <div className="grid grid-cols-1 gap-1 pt-2">
                {solutions.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Link
                      key={s.slug}
                      to="/solutions/$slug"
                      params={{ slug: s.slug }}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 py-2.5 px-2 rounded-md hover:bg-card"
                    >
                      <span className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-[var(--accent-green)] shrink-0">
                        <Icon size={15} />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-foreground font-medium">{s.name}</span>
                        <span className="block text-xs text-muted-foreground truncate">
                          {s.description}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </MobileAccordion>
            <MobileAccordion title="Resources">
              <div className="grid grid-cols-1 gap-1 pt-2">
                {resources.slice(0, 4).map((r) => {
                  const Icon = RESOURCE_ICONS[r.type] || BookOpen;
                  return (
                    <Link
                      key={r.slug}
                      to="/resources/$slug"
                      params={{ slug: r.slug }}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 py-2.5 px-2 rounded-md hover:bg-card"
                    >
                      <span className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-[var(--accent-blue)] shrink-0">
                        <Icon size={15} />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-foreground font-medium">{r.title}</span>
                        <span className="block text-xs text-muted-foreground truncate">
                          {r.type}
                        </span>
                      </span>
                    </Link>
                  );
                })}
                <Link
                  to="/resources"
                  onClick={() => setMobileOpen(false)}
                  className="text-[var(--accent-blue)] font-semibold mt-2 px-2"
                >
                  View all resources →
                </Link>
              </div>
            </MobileAccordion>
            <Link
              to="/pricing"
              onClick={() => setMobileOpen(false)}
              className="py-3 px-2 text-foreground border-b border-border font-medium"
            >
              Pricing
            </Link>
            <Link
              to="/platform"
              onClick={() => setMobileOpen(false)}
              className="py-3 px-2 text-foreground border-b border-border font-medium"
            >
              Platform
            </Link>
            <div className="flex flex-col gap-2 mt-4">
              <Link
                to="/platform"
                onClick={() => setMobileOpen(false)}
                className="btn-ghost justify-center text-sm"
              >
                Explore Platform
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setDemoOpen(true);
                }}
                className="btn-primary justify-center text-sm"
              >
                Free GTM Audit <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
      <Suspense fallback={null}>
        {demoOpen ? <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} /> : null}
      </Suspense>
    </header>
  );
}

function NavTrigger({
  label,
  active,
  onEnter,
}: {
  label: string;
  active: boolean;
  onEnter: () => void;
}) {
  return (
    <button
      onMouseEnter={onEnter}
      onClick={onEnter}
      className={`flex items-center gap-1 px-3 py-2 rounded-md hover:text-foreground transition ${active ? "text-foreground" : ""}`}
    >
      {label}{" "}
      <ChevronDown size={14} className={`transition-transform ${active ? "rotate-180" : ""}`} />
    </button>
  );
}

function NavLink({
  to,
  children,
  onEnter,
}: {
  to: string;
  children: React.ReactNode;
  onEnter: () => void;
}) {
  return (
    <Link
      to={to}
      onMouseEnter={onEnter}
      className="px-3 py-2 rounded-md hover:text-foreground transition"
      activeProps={{ className: "px-3 py-2 rounded-md text-foreground" }}
    >
      {children}
    </Link>
  );
}

function ProductsMega({ setOpen }: { setOpen: (v: MenuKey) => void }) {
  const featured = products[0]; // Leadfinder as featured
  const others = products.slice(1);

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Featured Column */}
      <div className="col-span-5 border-r border-border/50 pr-8">
        <div className="label-eyebrow mb-6 text-[var(--accent-blue)]">Featured Product</div>
        <Link
          to="/products/$slug"
          params={{ slug: featured.slug }}
          onClick={() => setOpen(null)}
          className="group block premium-card p-6 border border-border hover:border-[var(--accent-blue)]/50 transition-all"
        >
          <div className="h-12 w-12 rounded-lg bg-[var(--accent-blue)]/10 flex items-center justify-center text-[var(--accent-blue)] mb-6 group-hover:scale-110 transition-transform">
            <featured.icon size={24} />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">{featured.name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {featured.description}
          </p>
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent-blue)]">
            Explore {featured.name}{" "}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
        <div className="mt-8 p-6 rounded-lg bg-secondary/30 border border-border/50">
          <div className="text-sm font-bold text-foreground mb-1">Magnivo Platform</div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Unify your entire revenue stack into one intelligent GTM operating system.
          </p>
          <Link
            to="/platform"
            onClick={() => setOpen(null)}
            className="inline-block mt-3 text-xs font-semibold text-[var(--accent-blue)] hover:underline"
          >
            View Platform →
          </Link>
        </div>
      </div>

      {/* Grid Column */}
      <div className="col-span-7">
        <div className="label-eyebrow mb-6">Autonomous Revenue Agents</div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          {others.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                onClick={() => setOpen(null)}
                className="group flex items-start gap-4 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg border border-border flex items-center justify-center text-[var(--accent-blue)] shrink-0 group-hover:bg-background transition-colors">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-foreground leading-none group-hover:text-[var(--accent-blue)] transition-colors">
                    {p.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1.5 leading-snug">
                    {p.tagline}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-10 pt-6 border-t border-border/50 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Ready to see the full potential?</div>
          <Link
            to="/pricing"
            onClick={() => setOpen(null)}
            className="text-sm font-semibold text-foreground hover:text-[var(--accent-blue)] transition-colors"
          >
            View Pricing & Plans →
          </Link>
        </div>
      </div>
    </div>
  );
}

function SolutionsMega({ setOpen }: { setOpen: (v: MenuKey) => void }) {
  const featured = solutions[0]; // GTM Operations as featured
  const others = solutions.slice(1);

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Featured Column */}
      <div className="col-span-5 border-r border-border/50 pr-8">
        <div className="label-eyebrow mb-6 text-[var(--accent-green)]">Featured Solution</div>
        <Link
          to="/solutions/$slug"
          params={{ slug: featured.slug }}
          onClick={() => setOpen(null)}
          className="group block premium-card p-6 border border-border hover:border-[var(--accent-green)]/50 transition-all"
        >
          <div className="h-12 w-12 rounded-lg bg-[var(--accent-green)]/10 flex items-center justify-center text-[var(--accent-green)] mb-6 group-hover:scale-110 transition-transform">
            <featured.icon size={24} />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">{featured.name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {featured.description}
          </p>
          <div className="pill-green mb-6">{featured.model}</div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent-green)]">
            Learn about {featured.name}{" "}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
        <div className="mt-8 flex items-center gap-4 p-5 rounded-lg bg-[var(--accent-green)]/5 border border-[var(--accent-green)]/20">
          <div className="h-10 w-10 rounded-full bg-[var(--accent-green)]/10 flex items-center justify-center text-[var(--accent-green)] shrink-0">
            <Rocket size={20} />
          </div>
          <div>
            <div className="text-sm font-bold text-foreground">Free GTM Audit</div>
            <div className="text-xs text-muted-foreground">
              Get a custom blueprint for your AI transition.
            </div>
          </div>
        </div>
      </div>

      {/* Grid Column */}
      <div className="col-span-7">
        <div className="label-eyebrow mb-6">Enterprise Execution</div>
        <div className="grid grid-cols-1 gap-4">
          {others.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                to="/solutions/$slug"
                params={{ slug: s.slug }}
                onClick={() => setOpen(null)}
                className="group flex items-center gap-5 p-4 rounded-lg border border-transparent hover:border-border hover:bg-secondary/30 transition-all"
              >
                <div className="h-12 w-12 rounded-lg border border-border flex items-center justify-center text-[var(--accent-green)] shrink-0 group-hover:bg-background transition-colors">
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-[16px] font-semibold text-foreground group-hover:text-[var(--accent-green)] transition-colors">
                      {s.name}
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60">
                      {s.model}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 leading-snug">
                    {s.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-4 text-right">
          <Link
            to="/solutions"
            onClick={() => setOpen(null)}
            className="text-sm font-semibold text-foreground hover:text-[var(--accent-green)] transition-colors"
          >
            View all solutions →
          </Link>
        </div>
      </div>
    </div>
  );
}

function ResourcesMega({ setOpen }: { setOpen: (v: MenuKey) => void }) {
  const featured = resources[0];

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Featured Resources */}
      <div className="col-span-4 border-r border-border/50 pr-8 space-y-4">
        <div className="label-eyebrow mb-6 text-[var(--accent-blue)]">Featured Resource</div>
        <Link
          to="/resources/$slug"
          params={{ slug: featured.slug }}
          onClick={() => setOpen(null)}
          className="group block p-5 rounded-lg bg-card border border-border hover:border-[var(--accent-blue)]/50 transition-all"
        >
          <div className="aspect-video rounded-lg bg-gradient-to-br from-[var(--accent-blue)]/20 to-[var(--accent-green)]/10 border border-border mb-4 overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-[var(--accent-blue)] opacity-40 group-hover:scale-110 transition-transform">
              <Zap size={40} />
            </div>
          </div>
          <div className="text-[10px] font-bold text-[var(--accent-blue)] tracking-[0.2em] uppercase mb-2">
            {featured.type}
          </div>
          <div className="text-[15px] font-bold text-foreground leading-tight group-hover:text-[var(--accent-blue)] transition-colors">
            {featured.title}
          </div>
          <div className="text-xs text-muted-foreground mt-2 leading-relaxed">
            {featured.description}
          </div>
        </Link>
        <Link
          to="/resources/$slug"
          params={{ slug: resources[1].slug }}
          onClick={() => setOpen(null)}
          className="group block p-4 rounded-lg hover:bg-secondary/50 transition-colors"
        >
          <div className="text-[10px] font-bold text-[var(--accent-green)] tracking-[0.2em] uppercase mb-1">
            {resources[1].type}
          </div>
          <div className="text-sm font-semibold text-foreground group-hover:text-[var(--accent-green)] transition-colors">
            {resources[1].title}
          </div>
        </Link>
      </div>

      {/* Resource Lists */}
      <div className="col-span-8">
        <div className="grid grid-cols-2 gap-12">
          <div>
            <div className="label-eyebrow mb-6">Latest Insights</div>
            <ul className="space-y-6">
              {resources.slice(2, 5).map((r) => (
                <li key={r.slug}>
                  <Link
                    to="/resources/$slug"
                    params={{ slug: r.slug }}
                    onClick={() => setOpen(null)}
                    className="group block"
                  >
                    <div className="text-[15px] font-semibold text-foreground group-hover:text-[var(--accent-blue)] transition-colors">
                      {r.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{r.description}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="label-eyebrow mb-6">Company</div>
            <ul className="space-y-6">
              <li>
                <Link to="/investors" onClick={() => setOpen(null)} className="group block">
                  <div className="text-[15px] font-semibold text-foreground group-hover:text-[var(--accent-blue)] transition-colors">
                    Investors
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Join our journey.</div>
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  onClick={() => setOpen(null)}
                  className="text-[var(--accent-blue)] font-bold"
                >
                  View all resources →
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 grid grid-cols-2 gap-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
              <Share2 size={18} />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">Partner Program</div>
              <div className="text-xs text-muted-foreground">Build on top of Magnivo.ai.</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
              <MessageSquare size={18} />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">Talk to Us</div>
              <div className="text-xs text-muted-foreground">Get your questions answered.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [o, setO] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setO((v) => !v)}
        className="w-full flex items-center justify-between py-3 px-2 text-foreground font-medium"
      >
        {title}{" "}
        <ChevronDown size={16} className={`transition-transform ${o ? "rotate-180" : ""}`} />
      </button>
      <div
        className="grid transition-all duration-300"
        style={{ gridTemplateRows: o ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pb-3">{children}</div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  label,
  title,
  href = "/resources",
}: {
  label: string;
  title: string;
  href?: string;
}) {
  return (
    <a href={href} className="surface-card hover-blue p-4 flex gap-3 items-center">
      <div className="h-12 w-16 rounded-md bg-gradient-to-br from-[var(--accent-blue)]/30 to-[var(--accent-green)]/20 border border-border" />
      <div>
        <div className="label-eyebrow">{label}</div>
        <div className="text-sm font-medium text-foreground mt-1 leading-snug">{title}</div>
      </div>
    </a>
  );
}
