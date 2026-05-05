import { cn } from "@/lib/utils";

/** Text wordmark: Playfair serif, magnivo + dark green dot + ai (reads as magnivo.ai). */
export function MagnivoLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-serif font-normal tracking-tight text-foreground lowercase",
        className,
      )}
    >
      <span className="leading-none">magnivo</span>
      {/* Round dot replaces the period; sized to match lowercase x-height */}
      <span
        className="mx-[0.11em] inline-block size-[0.32em] min-h-[3px] min-w-[3px] shrink-0 translate-y-[0.06em] rounded-full bg-[#1B3A2D] dark:bg-[#2d5a47]"
        aria-hidden
      />
      <span className="leading-none">ai</span>
    </span>
  );
}
