import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

const ORDERED_RE = /^(\d+)\.\s+(.*)$/;

/**
 * Minimal markdown-lite renderer for resource/blog content.
 * Supports: ## h2, blank-line-separated paragraphs, "- " / "- [ ] " bullet
 * lists, "1. " ordered lists, "> " blockquotes, and inline **bold**.
 */
export function renderMarkdownLite(content: string): ReactNode {
  const lines = content.trim().split("\n");
  const blocks: ReactNode[] = [];
  let bulletBuffer: string[] = [];
  let orderedBuffer: string[] = [];

  const flushBullets = () => {
    if (bulletBuffer.length === 0) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="space-y-3 my-6 list-none pl-0">
        {bulletBuffer.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-[var(--accent-blue)] font-bold mt-1">—</span>
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>,
    );
    bulletBuffer = [];
  };

  const flushOrdered = () => {
    if (orderedBuffer.length === 0) return;
    blocks.push(
      <ol key={`ol-${blocks.length}`} className="space-y-3 my-6 list-none pl-0 counter-reset-none">
        {orderedBuffer.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-[var(--accent-blue)] font-bold mt-1">{i + 1}.</span>
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ol>,
    );
    orderedBuffer = [];
  };

  const flushAll = () => {
    flushBullets();
    flushOrdered();
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushAll();
      continue;
    }
    const ordered = line.match(ORDERED_RE);
    if (line.startsWith("## ")) {
      flushAll();
      blocks.push(
        <h2 key={blocks.length} className="text-2xl sm:text-3xl font-bold text-foreground pt-4">
          {renderInline(line.slice(3))}
        </h2>,
      );
    } else if (line.startsWith("- [ ] ")) {
      flushOrdered();
      bulletBuffer.push(line.slice(6));
    } else if (line.startsWith("- ")) {
      flushOrdered();
      bulletBuffer.push(line.slice(2));
    } else if (ordered) {
      flushBullets();
      orderedBuffer.push(ordered[2]);
    } else if (line.startsWith("> ")) {
      flushAll();
      blocks.push(
        <p
          key={blocks.length}
          className="text-xl text-foreground font-medium leading-relaxed border-l-2 border-[var(--accent-blue)] pl-4 italic"
        >
          {renderInline(line.slice(2))}
        </p>,
      );
    } else {
      flushAll();
      blocks.push(<p key={blocks.length}>{renderInline(line)}</p>);
    }
  }
  flushAll();

  return <>{blocks}</>;
}
