import { useEffect, useState, useRef } from "react";

/**
 * Magnivo Glow Companion
 * A subtle, premium light effect that follows the system cursor.
 * Doesn't hide the original cursor, but enhances the "feel" of the UI.
 */
export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [accent, setAccent] = useState<"blue" | "green">("blue");
  
  const posRef = useRef({ x: -200, y: -200 });
  const targetRef = useRef({ x: -200, y: -200 });
  const requestRef = useRef<number>();

  useEffect(() => {
    const canUseFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canUseFinePointer) return;

    const onMove = (e: PointerEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!active) setActive(true);
      
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest("a, button, [role='button'], input, select");
      setHovering(isInteractive);
      
      // Smart color detection based on context or explicit data attribute
      if (target.closest("[class*='green']") || target.closest("[style*='green']")) {
        setAccent("green");
      } else {
        setAccent("blue");
      }
    };

    const onLeave = () => setActive(false);
    
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    const animate = () => {
      const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;
      
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.08);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.08);

      const glow = document.getElementById("magnivo-cursor-glow");
      if (glow) {
        glow.style.transform = `translate3d(calc(${posRef.current.x}px - 50%), calc(${posRef.current.y}px - 50%), 0)`;
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [active]);

  return (
    <div
      id="magnivo-cursor-glow"
      aria-hidden
      className={`fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none z-[9999] transition-opacity duration-700 ease-out
        ${active ? "opacity-100" : "opacity-0"}
      `}
      style={{
        background: `radial-gradient(circle, color-mix(in oklab, var(--accent-${accent}) 25%, transparent) 0%, transparent 80%)`,
        opacity: hovering ? 1 : 0.6,
      }}
    />
  );
}
