import { Header } from "./Header";
import { Footer } from "./Footer";
import { CustomCursor } from "./CustomCursor";
import { DemoModal } from "./DemoModal";
import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [auditOpen, setAuditOpen] = useState(false);

  useEffect(() => {
    const openAudit = () => setAuditOpen(true);
    window.addEventListener("open-demo-modal", openAudit);
    return () => window.removeEventListener("open-demo-modal", openAudit);
  }, []);

  return (
    <>
      <SmoothScroll />
      <div className="relative overflow-x-clip">
        <CustomCursor />
        <Header />
        <main className="pt-14 pb-20 sm:pt-16 sm:pb-0">{children}</main>
        <Footer />
      </div>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/88 px-4 py-3 backdrop-blur-md sm:hidden">
        <button onClick={() => setAuditOpen(true)} className="btn-primary w-full justify-center">
          Book Free GTM Audit
        </button>
      </div>
      <DemoModal open={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  );
}
