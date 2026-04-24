import { FadeIn } from "./FadeIn";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 dot-grid opacity-60" aria-hidden />
      <div className="absolute inset-0 mesh-hero" aria-hidden />
      <div className="container-x relative py-24 md:py-32">
        <FadeIn>
          {eyebrow && <div className="label-eyebrow mb-5">{eyebrow}</div>}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground max-w-4xl leading-[1.05]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">{subtitle}</p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </FadeIn>
      </div>
    </section>
  );
}
