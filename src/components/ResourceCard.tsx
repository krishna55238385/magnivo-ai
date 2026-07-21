import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, FileText, Zap, Layout, BarChart3, ListTree } from "lucide-react";
import type { Resource } from "@/lib/site-data";
import { FadeIn } from "@/components/FadeIn";

const TYPE_ICONS = {
  Blog: BookOpen,
  Playbook: ListTree,
  Guide: Zap,
  "Case Study": Layout,
  Benchmark: BarChart3,
  Glossary: FileText,
};

export function ResourceCard({ r, delay = 0 }: { r: Resource; delay?: number }) {
  const Icon = TYPE_ICONS[r.type] || FileText;
  return (
    <FadeIn delay={delay}>
      <Link
        to="/resources/$slug"
        params={{ slug: r.slug }}
        className="group surface-card hover-blue p-8 block h-full"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="h-10 w-10 rounded-lg border border-border flex items-center justify-center text-[var(--accent-blue)] group-hover:bg-background transition-colors">
            <Icon size={20} />
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60">
            {r.type}
          </span>
        </div>
        <h3 className="text-xl font-bold group-hover:text-[var(--accent-blue)] transition-colors leading-tight">
          {r.title}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{r.description}</p>
        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[var(--accent-blue)]">
          Read {r.type}{" "}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </FadeIn>
  );
}
