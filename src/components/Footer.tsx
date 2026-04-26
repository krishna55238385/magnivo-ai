import { Link } from "@tanstack/react-router";
import { products } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-border mt-16 sm:mt-24">
      <div className="container-x py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-8">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2.5 font-bold text-foreground">
            <img src="/logo.png" alt="Magnivo.ai Logo" className="h-7 w-7 object-contain" />
            <span className="text-base tracking-tight">
              Magnivo<span className="text-[var(--accent-blue)]">.ai</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-4 max-w-xs">
            The Revenue Brain for Modern B2B.
          </p>
          <div className="mt-6 flex flex-col gap-2 text-sm">
          </div>
        </div>

        <FooterCol title="Products">
          {products.slice(0, 5).map((p) => (
            <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }}>{p.name}</Link>
          ))}
          <Link to="/products">All Products</Link>
        </FooterCol>

        <FooterCol title="Solutions">
          <Link to="/solutions">GTM Operations</Link>
          <Link to="/solutions">Agent Studio</Link>
          <Link to="/solutions">AI Growth</Link>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))} className="text-left text-[var(--accent-blue)] hover:underline">Free GTM Audit</button>
        </FooterCol>

        <FooterCol title="Resources">
          <a href="#">Case Studies</a>
          <a href="#">GTM Playbook</a>
          <a href="#">AI Benchmarks</a>
          <a href="#">Blog</a>
        </FooterCol>

        <FooterCol title="Company">
          <Link to="/platform">Platform</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/investors">Investors</Link>
          <Link to="/contact">Contact</Link>
        </FooterCol>

        <FooterCol title="Legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Data Security</a>
        </FooterCol>
      </div>
      <div className="border-t border-border">
        <div className="container-x pt-6 pb-0 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© 2026 Magnivo.ai. All rights reserved.</div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-5">
            <a href="https://linkedin.com/in/founder-profile" target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
            <a href="https://wa.me/message/xyz" target="_blank" rel="noreferrer" className="hover:text-foreground">WhatsApp</a>
            <a href="https://twitter.com/magnivoai" target="_blank" rel="noreferrer" className="hover:text-foreground">Twitter</a>
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
