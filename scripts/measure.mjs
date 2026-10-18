// Dev helper: layout metrics for a project page (where reading starts, scrolly text vs stage).
// usage: node scripts/measure.mjs <path> <outPrefix> [w] [h]
import { chromium } from "playwright";

const [path, out, w = "1440", h = "900"] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +h } });
const errors = [];
p.on("pageerror", (e) => errors.push(e.message));
p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await p.goto(`http://localhost:4321${path}`, { waitUntil: "networkidle" });
await p.waitForTimeout(800);
const m = await p.evaluate(() => {
  const r = (el) => el && el.getBoundingClientRect();
  const firstP = document.querySelector(".project-body p");
  const step = document.querySelector("[data-step]");
  const body = step?.querySelector(".step-body");
  const stage = document.querySelector(".scrolly-stage .plate");
  const lh = body ? parseFloat(getComputedStyle(body).lineHeight) : 0;
  return {
    viewport: innerHeight,
    articleStartsAt: Math.round(r(firstP)?.top + scrollY),
    stepTextWidth: Math.round(r(body)?.width ?? 0),
    stageWidth: Math.round(r(stage)?.width ?? 0),
    stepMinHeight: step ? getComputedStyle(step).minHeight : null,
    linesInFirstStep: body ? Math.round(r(body).height / lh) : 0,
    stepFontSize: body ? getComputedStyle(body).fontSize : null,
  };
});
// Screenshot with the first step active.
const first = p.locator("[data-step]").first();
await first.scrollIntoViewIfNeeded();
await p.evaluate(() => scrollBy(0, -innerHeight * 0.2));
await p.waitForTimeout(1500);
await p.screenshot({ path: `${out}-step.png` });
await p.evaluate(() => scrollTo(0, 0));
await p.waitForTimeout(600);
await p.screenshot({ path: `${out}-top.png` });
console.log(JSON.stringify({ ...m, errors }));
await b.close();
