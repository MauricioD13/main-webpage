import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fine pointer = mouse/trackpad. Pointer-follow effects are skipped on touch. */
export const finePointer = () => window.matchMedia("(pointer: fine)").matches;

let lenis: Lenis | undefined;

/** Smooth scrolling, wired into ScrollTrigger's update loop. Called once from the base layout. */
export function initSmoothScroll() {
  if (lenis || reducedMotion()) return;
  lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/**
 * Tilts an element toward the cursor. Returns a cleanup function.
 * `strength` is the max rotation in degrees.
 */
export function pointerTilt(el: HTMLElement, strength = 6) {
  if (reducedMotion() || !finePointer()) return () => {};
  const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
  const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
  gsap.set(el, { transformPerspective: 900 });
  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry(px * strength);
    rx(-py * strength);
  };
  const leave = () => {
    rx(0);
    ry(0);
  };
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerleave", leave);
  return () => {
    el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerleave", leave);
  };
}
