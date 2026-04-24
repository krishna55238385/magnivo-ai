import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { products, services } from "@/lib/site-data";

type MenuKey = "products" | "services" | "resources" | null;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? "backdrop-blur-md bg-background/80 border-b border-border" : "bg-transparent"
      }`}
      onMouseLeave={() => setOpen(null)}
    >
      <div className="container-x flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-foreground" onClick={() => setMobileOpen(false)}>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card">
            <span className="text-[13px] font-bold tracking-tight bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-green)] bg-clip-text text-transparent">M</span>
          </span>
          <span className="text-[15px]">Magnivo AI</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm text-muted-foreground">
          <NavTrigger label="Products" active={open === "products"} onEnter={() => setOpen("products")} />
          <NavTrigger label="Services" active={open === "services"} onEnter={() => setOpen("services")} />
          <NavLink to="/platform" onEnter={() => setOpen(null)}>Platform</NavLink>
          <NavLink to="/about" onEnter={() => setOpen(null)}>About</NavLink>
          <NavTrigger label="Resources" active={open === "resources"} onEnter={() => setOpen("resources")} />
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/contact" className="btn-primary">Book a Demo <ArrowRight size={14} /></Link>
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
            {open === "products" && <ProductsMega />}
            {open === "services" && <ServicesMega />}
            {open === "resources" && <ResourcesMega />}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background overflow-y-auto" style={{ maxHeight: "calc(100vh - 64px)" }}>
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
                        <span className="block text-xs text-muted-foreground truncate">{p.tagline}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </MobileAccordion>
            <MobileAccordion title="Services">
              <div className="grid grid-cols-1 gap-1 pt-2">
                {services.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Link
                      key={s.name}
                      to="/services"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 py-2.5 px-2 rounded-md hover:bg-card"
                    >
                      <span className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-[var(--accent-green)] shrink-0">
                        <Icon size={15} />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-foreground font-medium">{s.name}</span>
                        <span className="block text-xs text-muted-foreground truncate">{s.description}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </MobileAccordion>
            <Link to="/platform" onClick={() => setMobileOpen(false)} className="py-3 px-2 text-foreground border-b border-border">Platform</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="py-3 px-2 text-foreground border-b border-border">About</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="btn-primary justify-center mt-4">Book a Demo <ArrowRight size={14} /></Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavTrigger({ label, active, onEnter }: { label: string; active: boolean; onEnter: () => void }) {
  return (
    <button
      onMouseEnter={onEnter}
      onClick={onEnter}
      className={`flex items-center gap-1 px-3 py-2 rounded-md hover:text-foreground transition ${active ? "text-foreground" : ""}`}
    >
      {label} <ChevronDown size={14} className={`transition-transform ${active ? "rotate-180" : ""}`} />
    </button>
  );
}

function NavLink({ to, children, onEnter }: { to: string; children: React.ReactNode; onEnter: () => void }) {
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

function ProductsMega() {
  return (
    <div>
      <div className="label-eyebrow mb-4">SaaS Products — 7 AI Products</div>
      <div className="grid grid-cols-3 gap-3">
        {products.map((p) => {
          const Icon = p.icon;
          return (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="surface-card hover-blue p-4 group"
            >
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-md border border-border flex items-center justify-center text-[var(--accent-blue)]">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{p.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{p.tagline}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ServicesMega() {
  return (
    <div>
      <div className="label-eyebrow mb-4">Enterprise Service Lines</div>
      <div className="grid grid-cols-2 gap-3">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.name} to="/services" className="surface-card hover-green p-5">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-md border border-border flex items-center justify-center text-[var(--accent-green)]">
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-foreground">{s.name}</div>
                    <span className="pill-green">{s.model}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">{s.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ResourcesMega() {
  const cols: { title: string; items: string[] }[] = [
    { title: "LEARN", items: ["Blog", "Playbooks", "Templates", "Guides"] },
    { title: "PLAYBOOKS", items: ["GTM Playbook", "AI Sales Agents", "ABM Guide"] },
    { title: "ANALYZE", items: ["Case Studies", "AI GTM Benchmarks", "Glossary"] },
    { title: "CONNECT", items: ["Partner Program", "Investor Deck", "Talk to Us"] },
  ];
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8 grid grid-cols-4 gap-6">
        {cols.map((c) => (
          <div key={c.title}>
            <div className="label-eyebrow mb-3">{c.title}</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.items.map((i) => (
                <li key={i}><a className="hover:text-foreground transition" href="#">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="col-span-4 grid grid-cols-1 gap-3">
        <FeatureCard label="GUIDE" title="The 2025 AI GTM Playbook" />
        <FeatureCard label="CASE STUDY" title="How a Series B SaaS doubled pipeline with AI agents" />
      </div>
    </div>
  );
}

function FeatureCard({ label, title }: { label: string; title: string }) {
  return (
    <a href="#" className="surface-card hover-blue p-4 flex gap-3 items-center">
      <div className="h-12 w-16 rounded-md bg-gradient-to-br from-[var(--accent-blue)]/30 to-[var(--accent-green)]/20 border border-border" />
      <div>
        <div className="label-eyebrow">{label}</div>
        <div className="text-sm font-medium text-foreground mt-1 leading-snug">{title}</div>
      </div>
    </a>
  );
}

function MobileAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [o, setO] = useState(false);
  return (
    <div className="border-b border-border">
      <button onClick={() => setO((v) => !v)} className="w-full flex items-center justify-between py-3 px-2 text-foreground font-medium">
        {title} <ChevronDown size={16} className={`transition-transform ${o ? "rotate-180" : ""}`} />
      </button>
      <div className="grid transition-all duration-300" style={{ gridTemplateRows: o ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <div className="pb-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
