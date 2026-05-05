import { Header } from "./Header";
import { Footer } from "./Footer";
import { CustomCursor } from "./CustomCursor";
import { ScrollProgress } from "./ScrollProgress";
import { useEffect, useState, lazy, Suspense } from "react";

function SmoothScroll() {
  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    let rafId: number;
    let idleId: number | NodeJS.Timeout;
    let destroyed = false;

    const init = async () => {
      if (destroyed) return;
      const { default: Lenis } = await import("lenis");
      if (destroyed) return;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    };

    if ("requestIdleCallback" in window) {
      idleId = (window as Window & typeof globalThis).requestIdleCallback(init, { timeout: 2000 });
    } else {
      idleId = setTimeout(init, 200);
    }

    return () => {
      destroyed = true;
      if ("cancelIdleCallback" in window) {
        (window as Window & typeof globalThis).cancelIdleCallback(idleId as number);
      } else {
        clearTimeout(idleId as NodeJS.Timeout);
      }
      lenis?.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}

const DemoModal = lazy(() => import("./DemoModal").then((m) => ({ default: m.DemoModal })));

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [auditOpen, setAuditOpen] = useState(false);

  useEffect(() => {
    const openAudit = () => setAuditOpen(true);
    window.addEventListener("open-demo-modal", openAudit);
    return () => window.removeEventListener("open-demo-modal", openAudit);
  }, []);

  return (
    <>
      <ScrollProgress />
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
      <Suspense fallback={null}>
        {auditOpen ? <DemoModal open={auditOpen} onClose={() => setAuditOpen(false)} /> : null}
      </Suspense>
    </>
  );
}
