import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[9999] origin-left pointer-events-none"
      style={{
        height: "2px",
        scaleX,
        background:
          "linear-gradient(90deg, var(--brand-emerald) 0%, var(--accent-gold) 55%, var(--brand-emerald) 100%)",
      }}
    />
  );
}
