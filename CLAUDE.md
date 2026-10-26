# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Mauricio Cuello's bilingual (EN/ES) personal site: what he's good at, cloud projects told end to end with scroll-driven architecture diagrams, short stories and book notes. Astro 7 static output, Tailwind CSS 4, MDX, GSAP + ScrollTrigger + Lenis, React Three Fiber + drei islands for 3D, deployed as Cloudflare Workers static assets (`wrangler.jsonc`). Package manager is pnpm. Design decisions are recorded in `docs/ddr/` (start with 0001).

## Commands

```bash
pnpm dev            # dev server on :4321; in Astro 7 it daemonizes — stop with `pnpm astro dev stop`, inspect with `pnpm astro dev status|logs`
pnpm check          # astro check (type + template diagnostics) — the only automated check; there is no test suite or linter
pnpm build          # → dist/ (drafts excluded)
pnpm preview:cf     # build, then serve dist/ with Wrangler on :8787, like production
pnpm deploy         # build + wrangler deploy
node scripts/shoot.mjs <path> <outPrefix> [w] [h] [scrollYs]   # Playwright screenshots of the running dev server; env REDUCED=1, NOJS=1
node scripts/verify.mjs [w] [h]   # crawls every built page (run `pnpm build` first) against `pnpm dev`: status, console errors, overflow, language switch, project article start
node scripts/measure.mjs <path> <outPrefix> [w] [h]   # project page metrics: where the article starts, step text width vs plate width
node scripts/brand-assets.mjs   # favicons, app icons, manifest and public/brand/ logos from the LogoTribu_Ops PNGs at the repo root (DDR 0004)
node scripts/og-images.mjs      # default social thumbnails public/og/default-{en,es}.png with the logo; needs `pnpm dev`
```

Visual verification is done with `scripts/shoot.mjs` (or the Playwright MCP) against `pnpm dev`: check 1440px desktop and 390px mobile, both languages, reduced motion and no-JS, that `horizontalOverflow` is 0 and `errors` is empty. WebGL renders in headless Chromium, so 3D islands can be screenshot too (open the diagram view by clicking its "Explore in 3D" button). `SITE_URL` env sets `site` (canonical URLs, sitemap, RSS); it defaults to a placeholder.

Astro 7 is newer than most training data: confirm APIs with the `astro-docs` MCP (`search_astro_docs`) rather than memory.

## Architecture

### Content and i18n (`src/content.config.ts`, `src/i18n/`)
- Three collections — `projects` (ordered by the `order` field), `stories`, `books` — each stored as `src/content/<collection>/<lang>/<slug>.md(x)`. Entry ids are therefore `"<lang>/<slug>"`; use `entryLang()` / `entrySlug()` from `src/i18n/utils.ts`, never split ids ad hoc.
- The same piece across languages is linked by the `translationKey` frontmatter field; slugs may differ per language.
- `getLocalizedEntries(collection, lang)` returns native entries plus English entries with no translation, flagged `fallback: true`. Fallback entries are **published under every locale** (`/es/projects/<english-slug>/`), shown with an "only in English" badge, and their `<link rel=canonical>` points at the English page (`canonicalPath` prop on `Base.astro`). `getAlternates()` computes hreflang/language-switch targets with the same fallback rule.
- Every route is locale-prefixed (`prefixDefaultLocale: true`) via `src/pages/[lang]/...` with `getStaticPaths`. `src/pages/index.astro` is a client-side redirect to the preferred/saved language (static hosting has no Accept-Language routing). UI strings live in `src/i18n/ui.ts` (both languages must keep the same keys).
- Drafts (`draft: true`) are visible in dev only.

### Plates: diagrams, charts and scrollytelling (`src/components/visual/`)
- `ArchDiagram` renders a `Diagram` (nodes/edges/groups in viewBox units, node x/y = icon centre) as an SVG "plate" using `aws-react-icons`, which React renders to static SVG at build time — React is never hydrated. Icon keys are the registry in `icons.ts`; non-AWS nodes use `glyph`. Edges are trimmed so they clear icons and the labels below them; orthogonal routes use `via` waypoints. Spanish labels are passed as an `i18n` override map keyed by element id (edges keyed `"from-to"`).
- Diagram data lives in `src/data/diagrams.ts` (not in MDX) so project cards can show each project's main plate as line-art via `projectPlates`, keyed by `translationKey`. Spanish overrides go in `src/data/diagrams.es.ts`.
- Interactive plates carry an "Explore in 3D" button (`src/components/three/Plate3D.tsx`, `client:visible`). It receives the same translated `Diagram` plus AWS icons pre-rendered on the server as SVG data URIs, and lazy-loads `Diagram3DCanvas.tsx` only when opened: group nesting depth becomes height (exploded layers). Labels in 3D are canvas textures, not drei `<Html>` (which raised React 19 unmount errors when the dialog closed).
- `Scrolly` (stage slot + `Step` children) drives plates through DOM events on the plate element: `plate:active` when a panel becomes visible and `plate:state` with `PlateState { hidden, focus, step }` (`types.ts`). An id listed in any step's `show` stays hidden until that step; ids never listed are always visible; an edge is hidden while either endpoint is hidden. `Chart` treats `focus` as data labels. Multiple plates share one stage via `panel` names.
- Progressive enhancement is a hard requirement: without JS (or with reduced motion) plates render complete and Scrolly panels stack; JS adds the `is-live` / `is-staged` classes that enable hiding, pinning and cross-fades.

### 3D islands (`src/components/three/`)
- React Three Fiber components are used only as `client:only="react"` (hero) or lazily inside an island (diagram view), always with a static fallback; WebGL never runs on the server. `HeroScene.tsx` stops rendering when off screen and renders a still frame under reduced motion.
- three + R3F + drei make up the largest chunk (~240 KB gzipped); keep 3D code out of components that load on every page.

## Visual style

The owner approved this style (DDR 0001); keep new pages and components inside it. References were porsche.com (full-bleed cinematic sections, huge type, rounded media cards), elevenlabs.io (airy two-column composition, column guides), tavus.io and the @alyxianews reels (grotesk + italic serif pairing, glowing monochrome line-art), speculo.ai (stats around a central object).

### Tokens (`src/styles/global.css`)
- Palette: `--void #000` (dark sections), `--raised #161616` (cards on dark), `--bone #EDEDEA` (light sections), muted greys for secondary text, and amber `--signal #F2B33E` used **only** for live data flow, focus rings, active states and hover accents. Don't introduce other accent colours.
- Dark-first with light breaks: every section declares `theme-dark` or `theme-light`, which resolve `--bg`, `--fg`, `--muted`, `--line`, `--surface` (Tailwind: `bg-bg`, `text-fg`, `text-muted`, `border-line`, `bg-surface`). Components read these and never assume which theme they sit in. Showcase sections (hero, projects, contact, page headers, bookshelf) are dark; reading and service sections (capabilities, story and project bodies, book notes) are light. There is no global day/night toggle.
- Layout: full-bleed sections with content in `.wrap` (max 1680px, `--gutter: 5vw` side padding). Section rhythm is generous (`py-24 lg:py-36` on home sections). Two-column section headers: headline spanning 2 of 3 columns, lede bottom-aligned in the third (`grid lg:grid-cols-3`). Light sections may add `.guides` (faint column lines, desktop only).
- Radius: `--radius-card: 20px` for media cards and plates; pills and buttons are fully rounded.

### Type
- Archivo variable (width axis) for everything; Instrument Serif italic only as a headline's second line. Both come from Astro's Fonts API (`astro.config.mjs`).
- Display: `.display` = Archivo at `wdth 74`, weight 480, tracking `-0.035em`, line-height 0.92. Headlines are built with `Headline.astro` (`lead` = condensed statement, optional `tail` = `.display-serif` italic line, `size` = clamp). Use the two-line pattern consistently for section and page titles, not for accenting single words.
- Body 17px / 1.6; `.lede` for intro paragraphs (muted, clamp 1.05–1.3rem); `.label` for small metadata (sentence case, never all caps).

### Components and patterns
- Buttons: `.btn` + `.btn-primary` (solid `--fg`, turns amber on hover) or `.btn-ghost` (outline). Tags: `.pill`.
- Project cards (`ProjectCard.astro`): rounded `--raised` card; media area shows the project's plate as monochrome line-art (`interactive={false}`, icons grayscale until hover), else a `MonoImage` cover; pill tags, condensed title, muted subtitle, round arrow button. The first card in `ProjectGrid` is the wide feature (21:9 on desktop).
- Photos use `MonoImage.astro` (grayscale until hover). Plates are black line-art (`.plate`) in any section, with white strokes and labels; long-form text uses `.prose-site`, and plate styles must out-rank Tailwind Typography's.
- Pages whose first section is a full-bleed dark hero pass `overlayHeader` to `Base.astro`, so the header floats transparently over it and turns near-black once scrolled.
- Copy: plain, sentence case, no em-dash label constructions or middle-dot meta strings; numbers only from real sources (see Content rules).
- Tone: describe, don't sell. The site lets the projects and their stories speak for the engineer; copy states what was done, with what and why. No marketing claims, superlatives or pitches ("built to survive anything", "tell me what you're running"), no promises of results.

## Motion and animation

Principles: one orchestrated entrance per page (the home hero); everything else is motion that answers the reader (scroll position, pointer, hover, click). No generic fade-up-on-scroll for sections or cards. Every animation has a reduced-motion path and the page must be complete without JavaScript.

### Plumbing
- `src/scripts/motion.ts` is the single entry for GSAP + ScrollTrigger + Lenis and exports `reducedMotion()`, `finePointer()` and `pointerTilt(el, degrees)`. Component `<script>`s import from it; check `reducedMotion()` before starting any GSAP tween.
- Lenis smooth scroll (`lerp 0.12`) is started once in `Base.astro`, driven by `gsap.ticker` with `lagSmoothing(0)`, and calls `ScrollTrigger.update` on scroll. It is skipped under reduced motion.
- Page navigation uses native cross-document view transitions (`@view-transition { navigation: auto }`), **not** `<ClientRouter />`, so component scripts run on every page load with no `astro:page-load` re-initialisation. Keep it that way unless you also rework script init.
- Reduced motion: a global CSS rule zeroes animation and transition durations, JS skips GSAP, and R3F canvases switch to `frameloop="demand"` (still frame).
- Astro renders component scripts inline at the component's position, so a CSS `+` sibling selector after a component with a script will not match; use `~`.

### Catalogue (how each one is built)
- **Hero entrance** (`HomeHero.astro`): `gsap.from("[data-hero-in]", { yPercent: 40, opacity: 0, duration: 1.1, ease: "power3.out", stagger: 0.12 })`. The interaction hint is `hidden` by default and only revealed by JS when motion is allowed.
- **Hero constellation** (`three/HeroScene.tsx`, R3F): a deterministic graph (seeded PRNG) of three layers (edge, compute, data) with links to the two nearest nodes below. All animation happens in `useFrame` by mutating typed-array buffers (`needsUpdate`), never React state. Rotation damps toward the pointer (`THREE.MathUtils.damp`, λ 3) plus an idle `sin` sway; scroll progress (`scrollY / innerHeight`) multiplies layer heights by `1 + 1.6p` and turns the group. Packets ride downward edges (one in five amber). Glow comes from additive-blended point sprites drawn on a canvas radial gradient, with no post-processing. drei `Line` draws the layer frames; `PerformanceMonitor` + `AdaptiveDpr` manage resolution. An `IntersectionObserver` sets `frameloop="never"` once the hero is off screen.
- **Scrollytelling** (`visual/Scrolly.astro` + `Step.astro`): one ScrollTrigger per step (`start: "top 65%"`, `end: "bottom 65%"`, `onToggle`) activates the step and dispatches `plate:state`. The visual changes are CSS: element opacity (0.45s), icon `filter` from grayscale to colour for focus, an amber halo stroke, and flowing data on focused edges via a dashed `.d-edge-flow` path animated with a `stroke-dashoffset` keyframe. Panels on one stage cross-fade with opacity/visibility.
- **Scrollytelling layout is reading-first (DDR 0002):** text column `minmax(0, 36rem)` beside the plate; plates capped at `100vh − 13rem`; the stage is a sticky 100vh column pinned at the top (desktop) or a 28vh sticky band (mobile, caption hidden). Steps are `min-height: 42vh` (50vh mobile), the first step is top-aligned, inactive steps stay at 0.55 opacity and the active one gets an amber left rule. Authors control how much is read per diagram state by how much they put inside each `<Step>` (several paragraphs are fine).
- **Plate draw-in** (standalone `ArchDiagram`): a paused GSAP timeline played once at `top 75%`: groups fade in, nodes rise 8px with a stagger, then edge lines draw via `strokeDasharray/strokeDashoffset` set from `getTotalLength()`.
- **Charts** (`visual/Chart.astro`): the line draws with `strokeDashoffset` (1.4s, `power2.inOut`) and the area fades in; bars grow with `scaleY` from the baseline. Pointer and touch readout snaps to the nearest point by mapping the cursor through `svg.getScreenCTM().inverse()`.
- **Counters** (`StatCounter.astro`): tween a plain object from 0 to the value (1.6s, `power2.out`) once at `top 85%`, writing `textContent` on update.
- **Pointer tilt** (`pointerTilt`): `gsap.quickTo` on `rotationX/Y` (0.6s, `power3`) with `transformPerspective: 900`; only for fine pointers with motion allowed. Used on Scrolly stages at 2.5°.
- **Header** (`Header.astro`): a ScrollTrigger from 80px toggles `.is-scrolled` (transparent → near-black, 0.4s CSS). On pages with `[data-reading]`, an amber progress bar scales with `scaleX(progress)`.
- **Hover states (CSS only)**: project card media `scale(1.04)` over 1.2s `cubic-bezier(0.2, 0.7, 0.2, 1)`, line-art icons go from grayscale to colour, and the arrow turns amber and shifts 4px; `MonoImage` goes from grayscale to colour (0.7s); buttons swap background (0.25s).
- **Service band** (`ServiceMarquee.astro`): the list is rendered twice and translated `-50%` by a 60s linear CSS keyframe; it pauses on hover, and the edges fade with a `mask-image` gradient.
- **Bookshelf** (`pages/[lang]/books/index.astro`): spines lift with `translateY(-18px) rotateX(-6deg)` and return to full saturation (CSS, 0.45s). Clicking pulls the book out: the detail card is cloned from a `<template>`, then GSAP brings the cover in from `rotationY: -70, y: -40` (0.6s, `power3.out`) and fades the text from `x: 16`. The first book opens on load without scrolling the page (`scrollIntoView` only for trusted clicks).
- **3D diagram view** (`three/Diagram3DCanvas.tsx`): `OrbitControls` with damping 0.08, slow `autoRotate` (0.35) and a polar-angle clamp (0.12π–0.4π) so the view never tips edge-on. The "pull layers apart" slider sets the layer gap (`0.02 + explode × 1.15`), and node positions are recomputed with `useMemo`. Amber packets are one `instancedMesh` moved along each edge with `lerpVectors` in `useFrame`.

## SEO (DDR 0003)
- Every page goes through `Base.astro`: canonical + reciprocal hreflang (+ `x-default` → English) come from `alternates`; pass `noindex` for non-content pages (404) to drop canonical/hreflang. Titles drop the brand suffix past 60 characters; keep descriptions (project `summary`, story `description`, UI strings) at 150–160 characters.
- Social images: pass `ogImage` (covers are resized to 1200×630 JPG with `getImage`); otherwise `/og/default-{lang}.png`, rendered by `scripts/og-images.mjs` with the brand logo. Regenerate them if the role or tagline changes.
- Structured data comes from `src/lib/seo.ts` (`personLd`, `websiteLd`, `articleLd`), passed as `jsonLd`; articles reference the single Person `@id`.
- `robots.txt` is generated by `src/pages/robots.txt.ts`; the sitemap integration filters out `/` and `/404`. Run the audit after content changes: build, then check titles/descriptions/hreflang/links (see DDR 0003 for the checklist).

## Analytics (DDR 0006)
- PostHog loads from `src/components/posthog.astro` (in `Base.astro`) in cookieless mode, configured by `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST` (`.env` locally, Cloudflare build variables in production). Don't add cookies, storage or identification without a consent banner.
- Custom events are captured in component scripts through `window.posthog?.capture(...)`, so pages work when PostHog is missing or blocked. Current events: `project_opened`, `story_opened`, `book_preview_opened`, `book_filter_selected`, `language_changed`, `contact_outbound_clicked`.

## Content rules
- Stats, chart values and capability claims (`src/data/capabilities.ts`, each linked to proving projects) must come from the author's own material (the original case studies came from `../base`); don't invent metrics. Chart captions say what the data is (e.g. "indexed, not in dollars").
- Book categories (`tech`, `business`, `literature`) are the shelves on `/books`, ordered by `bookCategories` in `src/lib/books.ts`. A book's colour comes from `getBookColors()`, one per `translationKey` with the English `spine` winning, so spines and covers match in both languages (DDR 0007).
- Book entries are the author's opinions. The current entries are examples with `draft: true`; don't publish or fill in opinions on the author's behalf.


## Development rules
- Every major change require a DDR (Design) file with the documentation, based on the template at the root folder ./docs and the DDR shall be in ./docs/ddr 
- When it's a minor change only fill the Section "Context and Problem Statement" and "Decision Outcome" in it's own file
- For fixes the git commit comment it's enough
