// Generates the favicons, app icons and web manifest from the brand logo PNGs at the repo
// root. Re-run after changing the logo:  node scripts/brand-assets.mjs
//
// Small icons (≤48px) use a filled silhouette of the mark, because the outline strokes
// (~0.6% of the logo height) vanish below one pixel. Larger icons use the line-art.
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";

const WHITE = "LogoTribu_Ops(B-sin).png"; // white strokes on transparent
const OUT = "public";
const BG = { r: 0, g: 0, b: 0, alpha: 1 };
mkdirSync(`${OUT}/brand`, { recursive: true });

// Trimmed white line-art, also published for use on the site (e.g. the header).
const lineArt = await sharp(WHITE).trim({ threshold: 10 }).png().toBuffer();
await sharp(lineArt).resize({ height: 1200 }).png().toFile(`${OUT}/brand/logo-white.png`);
await sharp(lineArt).resize({ height: 1200 }).negate({ alpha: false }).png().toFile(`${OUT}/brand/logo-black.png`);

/** Filled silhouette: everything not reachable from the border through transparent pixels. */
async function silhouette(height) {
  const work = 600; // flood fill on a mid-size mask, then scale down
  const { data, info } = await sharp(lineArt).resize({ height: work }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const ink = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) ink[i] = data[i * 4 + 3] > 40 ? 1 : 0;
  const outside = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, x + (h - 1) * w);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const i = stack.pop();
    if (outside[i] || ink[i]) continue;
    outside[i] = 1;
    const x = i % w;
    if (x > 0) stack.push(i - 1);
    if (x < w - 1) stack.push(i + 1);
    if (i >= w) stack.push(i - w);
    if (i < w * (h - 1)) stack.push(i + w);
  }
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    rgba[i * 4] = rgba[i * 4 + 1] = rgba[i * 4 + 2] = 255;
    rgba[i * 4 + 3] = outside[i] ? 0 : 255;
  }
  return sharp(rgba, { raw: { width: w, height: h, channels: 4 } }).resize({ height }).png().toBuffer();
}

/**
 * Line-art with strokes thickened by `factor` (alpha blurred, then re-thresholded at the
 * source resolution) so they survive downscaling; the gaps between parallel lines stay open.
 */
async function thickLineArt(height, factor) {
  if (factor <= 1) return sharp(lineArt).resize({ height }).png().toBuffer();
  const { data, info } = await sharp(lineArt).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const alpha = await sharp(data, { raw: info }).extractChannel(3).blur(8 * factor).threshold(18).raw().toBuffer();
  return sharp({ create: { width: info.width, height: info.height, channels: 3, background: "#fff" } })
    .joinChannel(alpha, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toBuffer()
    .then((b) => sharp(b).resize({ height }).png().toBuffer());
}

/** Square icon: black background, the mark centred at `fill` of the height. */
async function icon(size, { mark, fill, radius = 0, thicken = 1 }) {
  const h = Math.round(size * fill);
  const glyph = mark === "silhouette" ? await silhouette(h) : await thickLineArt(h, thicken);
  const base = sharp({ create: { width: size, height: size, channels: 4, background: BG } }).composite([{ input: glyph, gravity: "centre" }]);
  let png = await base.png().toBuffer();
  if (radius) {
    const mask = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#fff"/></svg>`);
    png = await sharp(png).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  }
  return png;
}

const small = {};
for (const s of [16, 32, 48]) small[s] = await icon(s, { mark: "silhouette", fill: 0.88, radius: Math.round(s * 0.2) });
writeFileSync(`${OUT}/favicon-32.png`, small[32]);

// favicon.ico with embedded PNGs (16, 32, 48).
const entries = [16, 32, 48].map((s) => ({ s, data: small[s] }));
const header = Buffer.alloc(6 + 16 * entries.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(entries.length, 4);
let offset = header.length;
entries.forEach(({ s, data }, i) => {
  const o = 6 + i * 16;
  header.writeUInt8(s, o);
  header.writeUInt8(s, o + 1);
  header.writeUInt16LE(1, o + 4);
  header.writeUInt16LE(32, o + 6);
  header.writeUInt32LE(data.length, o + 8);
  header.writeUInt32LE(offset, o + 12);
  offset += data.length;
});
writeFileSync(`${OUT}/favicon.ico`, Buffer.concat([header, ...entries.map((e) => e.data)]));

// Home-screen and PWA icons: line-art with breathing room (maskable-safe at 512).
writeFileSync(`${OUT}/apple-touch-icon.png`, await icon(180, { mark: "line", fill: 0.8, thicken: 2.2 }));
writeFileSync(`${OUT}/icon-192.png`, await icon(192, { mark: "line", fill: 0.8, thicken: 2.2 }));
writeFileSync(`${OUT}/icon-512.png`, await icon(512, { mark: "line", fill: 0.7, thicken: 1.3 }));

writeFileSync(
  `${OUT}/site.webmanifest`,
  JSON.stringify(
    {
      name: "Mauricio Cuello",
      short_name: "M. Cuello",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
      ],
      theme_color: "#000000",
      background_color: "#000000",
      display: "browser",
    },
    null,
    2,
  ) + "\n",
);
console.log("Brand assets written to public/");
