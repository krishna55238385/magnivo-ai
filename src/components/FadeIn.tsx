import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  "aria-label"?: string;
};

export function FadeIn({ children, delay = 0, y = 24, className, style, ...rest }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y, filter: "blur(4px)" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
