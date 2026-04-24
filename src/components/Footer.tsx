import { Link } from "@tanstack/react-router";
import { products } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="container-x py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card">
              <span className="text-[13px] font-bold bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-green)] bg-clip-text text-transparent">M</span>
            </span>
            <span>Magnivo AI</span>
          </div>
          <p className="text-sm text-muted-foreground mt-4 max-w-xs">
            The AI operating system for modern GTM — intelligence, automation, and orchestration in one.
          </p>
        </div>

        <FooterCol title="Products">
          {products.map((p) => (
            <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }}>{p.name}</Link>
          ))}
          <Link to="/products">All Products</Link>
        </FooterCol>

        <FooterCol title="Services">
          <Link to="/services">GTM Operations</Link>
          <Link to="/services">Agent Studio</Link>
          <Link to="/services">AI Growth</Link>
          <Link to="/services">Magnivo Build</Link>
        </FooterCol>

        <FooterCol title="Company">
          <Link to="/about">About</Link>
          <Link to="/platform">Platform</Link>
          <Link to="/investors">Investors</Link>
          <Link to="/contact">Contact</Link>
        </FooterCol>
      </div>
      <div className="border-t border-border">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Magnivo AI. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">LinkedIn</a>
            <a href="#" className="hover:text-foreground">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="label-eyebrow mb-4">{title}</div>
      <div className="flex flex-col gap-2 text-sm text-muted-foreground [&_a]:hover:text-foreground [&_a]:transition">
        {children}
      </div>
    </div>
  );
}
