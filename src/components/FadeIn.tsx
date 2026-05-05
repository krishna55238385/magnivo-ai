import { useEffect, useRef, useState } from "react";

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  "aria-label"?: string;
};

export function FadeIn({ children, delay = 0, y = 16, className, style, ...rest }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-60px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
