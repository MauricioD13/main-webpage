// Renders the default social thumbnails (public/og/default-{lang}.png, 1200×630) with the
// brand logo and the site's own fonts. Needs `pnpm dev` running.  node scripts/og-images.mjs
import { chromium } from "playwright";

const copy = {
  en: { role: "Security, cloud and DevOps engineer", tail: "Cloud infrastructure, built to hold." },
  es: { role: "Ingeniero de seguridad, cloud y DevOps", tail: "Infraestructura cloud, hecha para aguantar." },
};
const browser = await chromium.launch();
for (const [lang, c] of Object.entries(copy)) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  // Load a real page so Astro's font faces are available, then replace the body.
  await page.goto(`http://localhost:4321/${lang}/`, { waitUntil: "networkidle" });
  await page.evaluate(({ role, tail }) => {
    document.body.innerHTML = `
      <div class="og theme-dark">
        <img src="/brand/logo-white.png" alt="" class="og-logo" />
        <div class="og-text">
          <p class="pill og-pill"><span class="og-dot"></span>${role}</p>
          <p class="display og-name">Mauricio Cuello</p>
          <p class="display-serif og-tail">${tail.replace(", ", ",<br>")}</p>
        </div>
      </div>`;
    const style = document.createElement("style");
    style.textContent = `
      html, body { margin: 0; background: #000; }
      .og { width: 1200px; height: 630px; display: flex; align-items: center; gap: 72px; padding: 0 96px; box-sizing: border-box;
            background: radial-gradient(60% 80% at 22% 50%, rgb(255 255 255 / .08), transparent 70%), #000; }
      .og-logo { height: 470px; width: auto; flex: none; }
      .og-text { display: flex; flex-direction: column; gap: 26px; }
      .og-pill { --line: rgb(255 255 255 / .28); font-size: 22px; padding: 8px 18px; align-self: flex-start; margin: 0; }
      .og-dot { width: 10px; height: 10px; border-radius: 50%; background: #f2b33e; box-shadow: 0 0 12px #f2b33e; }
      .og-name { font-size: 112px; margin: 0; color: #f4f4f2; }
      .og-tail { font-size: 54px; margin: 0; color: #c9c9c5; max-width: 620px; }`;
    document.head.append(style);
  }, c);
  await page.waitForFunction(() => document.fonts.ready.then(() => [...document.images].every((i) => i.complete)));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `public/og/default-${lang}.png` });
  await page.close();
}
await browser.close();
console.log("Wrote public/og/default-{en,es}.png");
