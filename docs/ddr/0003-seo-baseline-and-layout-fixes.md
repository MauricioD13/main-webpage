---
status: accepted
date: 2026-10-17
decision-makers: Mauricio Cuello
---

# SEO baseline before publishing, grid and Spanish hero alignment

## Context and Problem Statement

* The capabilities grid on the home page drew its column guides from the section background, so lines ran behind the section headline, the first column's text sat on the left line while the others were inset, and lines extended past the grid.
* The Spanish hero's italic line ("hecha para aguantar.") was wider than the title column at the shared font size, so the Spanish title wrapped into four ragged lines while the English one had three.
* A pre-publish SEO audit of the production build found: no robots.txt; the language-redirect page `/` in the sitemap (with a duplicated `hreflang="en"`) and marked `noindex` while also carrying a canonical; the 404 page carrying canonical and hreflang tags; no social preview image or Twitter card on any page; no structured data; home and several project descriptions over 160 characters and two titles over 60; no visible author on articles; desktop home CLS of 0.137 caused by the display fonts arriving after first paint (only Archivo was preloaded).

## Decision Outcome

* **Capabilities grid:** the lines are the grid's own cell borders (outer frame + one rule between cells), every cell has the same `1.6rem` horizontal padding, nothing behind the headline. `.guides` elsewhere now draws only the outer frame of a light section, never interior lines.
* **Hero title:** sized with `min(clamp(3.2rem, 10.5vw, 11.5rem), 100cqi / fitEm)` against its own column (`container-type: inline-size`), where `fitEm` estimates the italic line's width (narrow glyphs 0.21em, others 0.46em, calibrated on measured EN/ES lines). English sizes are unchanged at 1440/1280/1100/768/390px; Spanish becomes two whole lines at every width.
* **SEO baseline:**
  * `robots.txt` generated from `SITE_URL`, with the sitemap URL; sitemap excludes `/` and `/404`.
  * `Base.astro` gains `noindex` (404), `ogImage` and `jsonLd` props; every page has `og:image` (project/story covers as 1200×630 JPG, otherwise `/og/default-{lang}.png` rendered from the hero), `og:site_name`, `og:locale:alternate` and a `summary_large_image` Twitter card.
  * JSON-LD from `src/lib/seo.ts`: Person + WebSite on home pages, `TechArticle` for projects and `BlogPosting` for stories, all authored by the same Person `@id`.
  * Titles drop the " | Mauricio Cuello" suffix when it would exceed 60 characters; site, stories and project descriptions trimmed to ≤160 characters; visible "By Mauricio Cuello" bylines on projects and stories.
  * The root redirect page keeps its canonical to `/en/` without `noindex`.
  * Instrument Serif is preloaded alongside Archivo: desktop home CLS 0.137 → 0.036 in lab. Mobile CLS on a heavily throttled connection is 0.10–0.15 (font swap of the condensed headline); left for field data after launch.
* **Spanish book notes:** translations of the four book entries added under `src/content/books/es/`, still `draft: true` like their English originals.
