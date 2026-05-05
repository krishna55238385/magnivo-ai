import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface Props {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({ target, prefix = "", suffix = "", duration = 1.8 }: Props) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-40px 0px" });

  useEffect(() => {
    if (!inView || !nodeRef.current) return;
    const node = nodeRef.current;
    const ctrl = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      onUpdate(v) {
        node.textContent = prefix + Math.round(v) + suffix;
      },
    });
    return () => ctrl.stop();
  }, [inView, target, prefix, suffix, duration]);

  return (
    <span ref={nodeRef}>
      {prefix}0{suffix}
    </span>
  );
}
