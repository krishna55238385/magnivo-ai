import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Animated product/service card with:
 * - entrance fade/slide (whileInView)
 * - 3D tilt on mouse move
 * - shimmer sweep on hover
 * - lift + glow handled via parent classes (hover-blue / hover-green)
 */
export function AnimatedCard({
  children,
  delay = 0,
  className = "",
  glow = "blue",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  glow?: "blue" | "green";
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (y - 0.5) * -6;
    const ry = (x - 0.5) * 6;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  const glowColor = glow === "green" ? "var(--accent-green)" : "var(--accent-blue)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`tilt-card relative overflow-hidden h-full ${className}`}
        style={{
          transform: "rotateX(var(--rx,0)) rotateY(var(--ry,0))",
          transformStyle: "preserve-3d",
          transition: "transform 250ms ease",
        }}
      >
        {/* Shimmer sweep */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 hover-shimmer transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, ${glowColor} 18%, transparent), transparent 45%)`,
          }}
          aria-hidden
        />
        <div className="relative h-full" style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>
      </div>

      <style>{`
        .tilt-card:hover .hover-shimmer { opacity: 1; }
      `}</style>
    </motion.div>
  );
}
