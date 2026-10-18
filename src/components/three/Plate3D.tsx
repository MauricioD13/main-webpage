// The "Explore in 3D" control on an architecture plate. Hydrated when visible; the
// three.js view itself is only downloaded when the reader opens it.
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Diagram } from "../visual/types";

const Diagram3DCanvas = lazy(() => import("./Diagram3DCanvas"));

interface Props {
  diagram: Diagram;
  icons: Record<string, string>;
  title: string;
  labels: { open: string; close: string; layers: string; help: string; loading: string };
}

export default function Plate3D({ diagram, icons, title, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [explode, setExplode] = useState(0.75);
  const [reduced, setReduced] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      trigger.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button ref={trigger} type="button" className="plate3d-trigger" onClick={() => setOpen(true)} aria-haspopup="dialog">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" />
          <path d="m3 12 9 4.5 9-4.5" />
          <path d="m3 16.5 9 4.5 9-4.5" />
        </svg>
        {labels.open}
      </button>
      {open &&
        createPortal(
          <div className="plate3d-dialog" role="dialog" aria-modal="true" aria-label={`${title}, 3D`}>
            <div className="plate3d-bar">
              <p className="plate3d-title">{title}</p>
              <label className="plate3d-range">
                <span>{labels.layers}</span>
                <input type="range" min={0} max={1} step={0.01} value={explode} onChange={(e) => setExplode(Number(e.target.value))} />
              </label>
              <button ref={closeBtn} type="button" className="plate3d-close" onClick={() => setOpen(false)}>
                {labels.close}
              </button>
            </div>
            <div className="plate3d-stage">
              <Suspense fallback={<p className="plate3d-loading">{labels.loading}…</p>}>
                <Diagram3DCanvas diagram={diagram} icons={icons} explode={explode} reduced={reduced} />
              </Suspense>
            </div>
            <p className="plate3d-help">{labels.help}</p>
          </div>,
          document.body,
        )}
    </>
  );
}
