import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Magnivo.ai — The AI GTM Operating System for B2B Revenue Teams" },
      {
        name: "description",
        content:
          "Magnivo turns scattered tools, data, and manual outreach into one autonomous system for pipeline, conversion, and retention. Built for B2B revenue teams.",
      },
      { name: "author", content: "Magnivo.ai" },
      {
        tagName: "script",
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Magnivo.ai",
          url: "https://magnivo.ai",
          logo: "https://magnivo.ai/logo.png",
          description: "The AI GTM Operating System for B2B Revenue Teams",
          sameAs: [],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            url: "https://magnivo.ai/contact",
          },
        }),
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Magnivo.ai — The AI GTM Operating System for B2B Revenue Teams" },
      { name: "twitter:title", content: "Magnivo.ai — The AI GTM Operating System for B2B Revenue Teams" },
      {
        property: "og:description",
        content:
          "One autonomous system for pipeline, conversion, and retention. Built for B2B revenue teams at $500K–$5M ARR.",
      },
      {
        name: "twitter:description",
        content:
          "One autonomous system for pipeline, conversion, and retention. Built for B2B revenue teams at $500K–$5M ARR.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          onLoad={(e) => { (e.target as HTMLLinkElement).rel = "stylesheet"; }}
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
            rel="stylesheet"
          />
        </noscript>
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%231B3A2D'/%3E%3Ctext x='50%25' y='54%25' text-anchor='middle' dominant-baseline='middle' font-family='Georgia,serif' font-weight='700' font-size='20' fill='%23F5F2EC'%3EM%3C/text%3E%3C/svg%3E"
        />
        <HeadContent />
      </head>
      <body className="bg-background text-foreground">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
