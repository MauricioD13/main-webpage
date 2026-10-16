// Dev helper: screenshots a page at several scroll positions.
// usage: node scripts/shoot.mjs <path> <outPrefix> [width] [height] [scrollStepsCsv]
// env: SCHEME=dark|light  REDUCED=1  NOJS=1
import { chromium } from "playwright";

const [path = "/en/", out = "shot", w = "1440", h = "900", steps = "0"] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: +w, height: +h },
  colorScheme: process.env.SCHEME ?? "light",
  reducedMotion: process.env.REDUCED ? "reduce" : "no-preference",
  javaScriptEnabled: !process.env.NOJS,
});
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.goto(`http://localhost:4321${path}`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
for (const y of steps.split(",").map(Number)) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(1300);
  await page.screenshot({ path: `${out}-${y}.png` });
}
const sw = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
console.log(JSON.stringify({ errors, horizontalOverflow: sw, height: await page.evaluate(() => document.body.scrollHeight) }));
await browser.close();
