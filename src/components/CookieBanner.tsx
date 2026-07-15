import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";

const STORAGE_KEY = "magnivo_cookie_consent_v1";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decided: boolean;
  ts: number;
};

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function writeConsent(c: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  } catch {
    /* privacy mode / SSR */
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing?.decided) {
      const t = setTimeout(() => setVisible(true), 1400);
      return () => clearTimeout(t);
    }
  }, []);

  const save = (consent: Consent) => {
    writeConsent(consent);
    setVisible(false);
  };

  const acceptAll = () =>
    save({ necessary: true, analytics: true, marketing: true, decided: true, ts: Date.now() });

  const rejectAll = () =>
    save({ necessary: true, analytics: false, marketing: false, decided: true, ts: Date.now() });

  const savePrefs = () =>
    save({ necessary: true, analytics, marketing, decided: true, ts: Date.now() });

  const categories = [
    {
      key: "necessary" as const,
      label: "Strictly Necessary",
      desc: "Essential for the site to function. Cannot be disabled.",
      checked: true,
      locked: true,
    },
    {
      key: "analytics" as const,
      label: "Analytics",
      desc: "Help us understand how visitors interact with the site (e.g. page views, session duration).",
      checked: analytics,
      locked: false,
    },
    {
      key: "marketing" as const,
      label: "Marketing",
      desc: "Used to serve relevant ads and track campaign performance across channels.",
      checked: marketing,
      locked: false,
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[9998] sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-[420px]"
          role="dialog"
          aria-label="Cookie preferences"
          aria-live="polite"
        >
          <div
            className="rounded-2xl border border-border bg-background/96 backdrop-blur-xl overflow-hidden"
            style={{
              boxShadow:
                "0 20px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08), 0 0 0 1px rgba(26,26,26,0.05) inset",
            }}
          >
            {/* ── Header ── */}
            <div className="px-5 pt-5 pb-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background: "rgba(27,58,45,0.10)",
                    border: "1px solid rgba(27,58,45,0.18)",
                  }}
                >
                  <Cookie size={15} style={{ color: "var(--brand-emerald)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-foreground leading-snug">
                    We use cookies
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">
                    We use cookies to personalise content, analyse traffic, and improve your
                    experience. See our{" "}
                    <Link
                      to="/privacy-policy"
                      className="underline underline-offset-2 text-foreground/70 hover:text-foreground transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
                <button
                  onClick={rejectAll}
                  aria-label="Reject all and close"
                  className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/6 transition-colors"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* ── Expanded preferences ── */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className="px-5 py-4 space-y-3.5 border-t border-border/60"
                  >
                    {categories.map((cat) => (
                      <div key={cat.key} className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-semibold text-foreground">
                            {cat.label}
                            {cat.locked && (
                              <span
                                className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                                style={{
                                  background: "rgba(27,58,45,0.10)",
                                  color: "var(--brand-emerald)",
                                }}
                              >
                                Always on
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                            {cat.desc}
                          </div>
                        </div>

                        {/* Toggle */}
                        <button
                          role="switch"
                          aria-checked={cat.checked}
                          disabled={cat.locked}
                          onClick={() => {
                            if (cat.key === "analytics") setAnalytics((v) => !v);
                            if (cat.key === "marketing") setMarketing((v) => !v);
                          }}
                          className="shrink-0 relative mt-0.5 transition-opacity"
                          style={{
                            width: 36,
                            height: 20,
                            borderRadius: 10,
                            background: cat.checked
                              ? "var(--brand-emerald)"
                              : "rgba(26,26,26,0.18)",
                            opacity: cat.locked ? 0.5 : 1,
                            cursor: cat.locked ? "not-allowed" : "pointer",
                            border: "none",
                            padding: 0,
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              top: 2,
                              left: 2,
                              width: 16,
                              height: 16,
                              borderRadius: "50%",
                              background: "#fff",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
                              transition: "transform 0.2s ease",
                              transform: cat.checked ? "translateX(16px)" : "translateX(0)",
                              display: "block",
                            }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Actions ── */}
            <div className="px-5 pb-5 flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center gap-1 text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronDown
                  size={13}
                  style={{
                    transition: "transform 0.2s ease",
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
                {expanded ? "Hide options" : "Manage preferences"}
              </button>

              <div className="ml-auto flex items-center gap-2">
                {expanded ? (
                  <button
                    onClick={savePrefs}
                    className="text-[12px] font-semibold px-3.5 py-2 rounded-lg transition-colors"
                    style={{
                      background: "rgba(27,58,45,0.10)",
                      color: "var(--brand-emerald)",
                      border: "1px solid rgba(27,58,45,0.18)",
                    }}
                  >
                    Save preferences
                  </button>
                ) : (
                  <button
                    onClick={rejectAll}
                    className="text-[12px] font-semibold px-3.5 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                    style={{ border: "1px solid rgba(26,26,26,0.12)" }}
                  >
                    Reject all
                  </button>
                )}
                <button
                  onClick={acceptAll}
                  className="btn-primary text-[12px] px-3.5 py-2"
                >
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
