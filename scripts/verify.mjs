// Dev helper: crawls every page from the sitemap-equivalent list in dist/ against the dev
// server and reports console errors, horizontal overflow, broken language switches and,
// on project pages, where the article starts.  usage: node scripts/verify.mjs [w] [h]
import { chromium } from "playwright";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const [w = "1440", h = "900"] = process.argv.slice(2);
const pages = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === "index.html") pages.push("/" + p.slice(5, -10));
  }
})("dist/en");
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === "index.html") pages.push("/" + p.slice(5, -10));
  }
})("dist/es");

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: +w, height: +h } });
const problems = [];
const rows = [];
for (const path of pages.sort()) {
  const p = await ctx.newPage();
  const errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  const res = await p.goto(`http://localhost:4321${path}`, { waitUntil: "networkidle" });
  const info = await p.evaluate(() => {
    const other = [...document.querySelectorAll("a[hreflang]")].find((a) => a.getAttribute("aria-current") !== "true");
    const firstP = document.querySelector(".project-body > p");
    return {
      overflow: document.documentElement.scrollWidth - innerWidth,
      switchTo: other?.getAttribute("href"),
      articleStart: firstP ? Math.round(firstP.getBoundingClientRect().top + scrollY) : null,
      fallbackBadges: document.body.innerText.match(/Solo en inglés|Only in English/g)?.length ?? 0,
    };
  });
  let switchOk = true;
  if (info.switchTo) {
    const r = await ctx.request.get(`http://localhost:4321${info.switchTo}`);
    switchOk = r.ok();
  }
  rows.push({ path, status: res.status(), ...info, switchOk, errors: errors.length });
  if (res.status() !== 200 || errors.length || info.overflow > 0 || !switchOk) problems.push({ path, errors, ...info, switchOk });
  await p.close();
}
await b.close();
for (const r of rows) console.log(`${r.status} ${r.path.padEnd(58)} overflow=${r.overflow} switch=${r.switchOk ? "ok" : "BROKEN"} errors=${r.errors}${r.articleStart != null ? ` articleStart=${r.articleStart}` : ""}${r.fallbackBadges ? ` fallbacks=${r.fallbackBadges}` : ""}`);
console.log(problems.length ? `\nPROBLEMS:\n${JSON.stringify(problems, null, 1)}` : `\nAll ${rows.length} pages clean.`);
