import { useEffect, useState } from "react";

type CursorState = {
  x: number;
  y: number;
  active: boolean;
  pressed: boolean;
  interactive: boolean;
};

const initialState: CursorState = {
  x: -100,
  y: -100,
  active: false,
  pressed: false,
  interactive: false,
};

export function CustomCursor() {
  const [cursor, setCursor] = useState(initialState);

  useEffect(() => {
    const canUseFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canUseFinePointer || reduceMotion) return;

    const interactiveSelector = [
      "a",
      "button",
      "input",
      "textarea",
      "select",
      "[role='button']",
      "[data-cursor='interactive']",
    ].join(",");

    const updatePosition = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;

      setCursor((current) => ({
        ...current,
        x: event.clientX,
        y: event.clientY,
        active: true,
        interactive: Boolean(target?.closest(interactiveSelector)),
      }));
    };

    const setPressed = () => setCursor((current) => ({ ...current, pressed: true }));
    const clearPressed = () => setCursor((current) => ({ ...current, pressed: false }));
    const hideCursor = () => setCursor((current) => ({ ...current, active: false, pressed: false }));

    window.addEventListener("pointermove", updatePosition);
    window.addEventListener("pointerdown", setPressed);
    window.addEventListener("pointerup", clearPressed);
    window.addEventListener("pointerleave", hideCursor);
    window.addEventListener("blur", hideCursor);

    return () => {
      window.removeEventListener("pointermove", updatePosition);
      window.removeEventListener("pointerdown", setPressed);
      window.removeEventListener("pointerup", clearPressed);
      window.removeEventListener("pointerleave", hideCursor);
      window.removeEventListener("blur", hideCursor);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={[
        "custom-cursor",
        cursor.active ? "custom-cursor--active" : "",
        cursor.interactive ? "custom-cursor--interactive" : "",
        cursor.pressed ? "custom-cursor--pressed" : "",
      ].join(" ")}
      style={{
        "--cursor-x": `${cursor.x}px`,
        "--cursor-y": `${cursor.y}px`,
      } as React.CSSProperties}
    >
      <span className="custom-cursor__halo" />
      <span className="custom-cursor__ring" />
      <span className="custom-cursor__dot" />
    </div>
  );
}
