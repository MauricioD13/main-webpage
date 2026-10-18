---
status: accepted
date: 2026-10-17
decision-makers: Mauricio Cuello
---

# Brand logo: favicons, app icons and social thumbnails

## Context and Problem Statement

The owner's official brand logo (TribuOps mark: three stepped arrows rising out of an infinity loop) is provided as `LogoTribu_Ops(N-B).png` (black on white, framed), `LogoTribu_Ops(N-sin).png` (black, transparent) and `LogoTribu_Ops(B-sin).png` (white, transparent). The site still used a placeholder book favicon and social thumbnails screenshotted from the hero. The mark is tall (≈1:2.2) and drawn with thin outlines (~0.6% of its height), which disappear below one pixel at favicon sizes. `LogoTribu_Ops_B-sin_.svg` contains no paths, so raster sources are used.

## Decision Outcome

* `scripts/brand-assets.mjs` (re-runnable, uses sharp) generates from the white logo:
  * `favicon.ico` (16/32/48) and `favicon-32.png`: a **filled silhouette** of the mark (flood fill of everything not reachable from the border), white on a black rounded square, because outlines are illegible at that size.
  * `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`: the line-art on black, with strokes thickened (alpha blur + threshold at source resolution) so they survive downscaling while the gaps between parallel lines stay open.
  * `site.webmanifest`, and trimmed `brand/logo-white.png` / `brand/logo-black.png` (1200px tall) for use on the site.
* `scripts/og-images.mjs` (needs `pnpm dev`) renders the default social thumbnails `og/default-{en,es}.png` (1200×630): white line-art mark on black beside the role badge, the name in the display face and the hero tagline as the italic serif line, using the site's own fonts.
* `Base.astro` links the ICO, the 32px PNG, the Apple touch icon and the manifest; the old `favicon.svg` is removed. Pages with covers keep the cover as their social image.
