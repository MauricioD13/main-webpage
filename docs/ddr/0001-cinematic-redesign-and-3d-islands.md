---
status: accepted
date: 2026-10-16
decision-makers: Mauricio Cuello
---

# Cinematic dark-first redesign, "Projects" instead of chapters, and React Three Fiber islands

## Context and Problem Statement

The first version of the site used an editorial "book" metaphor: a blueprint cover on the home page that opened into a table of contents, cyanotype (Prussian blue) plates, serif reading typography, and projects numbered as chapters (I, II, III…).

Feedback on that version:

1. The style did not match what the owner wants. References given for style, layout and use of space (not content): porsche.com/spain, elevenlabs.io, tavus.io, speculo.ai, and the Instagram reels of @alyxianews.
2. The home page did not use the available screen width, and the book metaphor did not read clearly. The home page must instead say what the owner is good at and show the projects.
3. The bookshelf concept is liked, but its style must change.
4. The site should use Astro React islands with React Three Fiber and drei for 3D objects and transitions.

How should the visual system, the home page and the project pages change to meet this, without losing the scroll-driven architecture diagrams, bilingual content and progressive enhancement that already work?

## Decision Drivers

* Match the references' qualities: full-bleed cinematic sections and very large type (Porsche), airy two-column composition and generous space (ElevenLabs), a serif/grotesk pairing with an italic second line (Tavus, Alyxia), stats and statements arranged around a central object (Speculo), monochrome glowing line-art (Alyxia).
* The home page must communicate capabilities and projects first.
* 3D must add meaning (architecture is the subject), not decoration, and must not block reading, SEO or accessibility.
* Keep what works: content collections, EN/ES routing with fallbacks, the scrolly diagram system, static output on Cloudflare.
* Performance: WebGL only where it earns its weight, loaded lazily, with static fallbacks.

## Considered Options

* **Canvas:** dark-first with light breaks / light-first with dark accents / all dark.
* **Project naming:** rename to "Projects" / keep "Chapters" outside the home page.
* **3D scope (any combination):** hero object / 3D bookshelf / 3D transitions between project cards / 3D exploded view of project diagrams.

## Decision Outcome

Chosen with the owner on 2026-10-16:

* **Dark-first with light breaks.** Black for the hero, project showcase and closing call to action; a neutral bone colour for capabilities, reading pages, stories and books.
* **Rename chapters to Projects.** Collection `projects`, URLs `/<lang>/projects/<slug>/`, an `order` field instead of a chapter number, no roman numerals. Each project keeps its scroll-driven diagram story.
* **3D in two places:** an interactive hero object, and an optional 3D exploded view of the architecture diagrams on project pages. The bookshelf is restyled in 2D.

### Visual system

* Palette: `#000000` void, `#161616` raised surface on dark, `#EDEDEA` bone, `#000000` ink on light, `#8A8A86` mist for secondary text, amber `#F2B33E` reserved for live data flow and focus.
* Type: Archivo (variable, width axis) condensed for display and normal width for body/UI; Instrument Serif italic as the consistent second line of display headlines. Literata is removed.
* Layout: full-bleed sections, a 12-column grid with `5vw` gutters, headlines anchored bottom-left in the hero, large rounded media cards (radius 20px) with pill tags on dark sections, faint vertical grid guides on light sections.
* Plates (diagrams and charts) switch from Prussian blue to black with white line-art; amber still marks focus and flow.

### Home page

1. Full-viewport hero: a React Three Fiber "infrastructure constellation" (layered nodes and links with travelling data packets) that turns toward the pointer and spreads apart in depth as the page scrolls; headline and role bottom-left.
2. Capabilities (light): what the owner is good at, each item linked to the projects that prove it.
3. Projects (dark): large cards with each project's architecture as line-art.
4. Stories and current reading (light).
5. Contact call to action (dark).

### 3D implementation

* React islands with `client:only="react"` and a static fallback slot, so no WebGL runs on the server and the page is complete without it.
* `three`, `@react-three/fiber` 9 and `@react-three/drei` 10 (compatible with React 19.3). No post-processing dependency; glow is done with additive blending.
* The 3D diagram view reuses the same `Diagram` data as the SVG plates. Group nesting becomes depth (exploded layers); AWS icons are rendered to SVG on the server and passed to the island as data URIs. It opens on demand from a button on each plate, so its code loads only when asked for.
* `prefers-reduced-motion`: render a still frame (`frameloop="demand"`), no auto-rotation or packet animation.

### Consequences

* Good, because the home page now leads with capabilities and evidence and uses the full viewport width.
* Good, because the 3D work explains architecture (layers, flows) instead of decorating.
* Good, because content, i18n and the scrolly system are reused unchanged in structure.
* Bad, because the JavaScript budget grows; mitigated by islands, lazy loading and on-demand loading of the 3D diagram view.
* Bad, because renaming the collection changes every project URL; acceptable because the site is not yet published.
* Neutral: dark-first with a single accent is close to a common pattern; the accent is kept strictly to data flow and focus to keep it meaningful.

### Confirmation

* `pnpm check` and `pnpm build` pass.
* Screenshots with `scripts/shoot.mjs` at 1440 and 390 px wide, with reduced motion and without JavaScript, show complete content and no horizontal overflow.
* The hero canvas and the 3D diagram view render without console errors in Chromium.

## Pros and Cons of the Options

### Light-first with dark accents

* Good, because reading comfort is highest on light backgrounds.
* Bad, because glowing line-art and 3D lose most of their impact on light.

### All dark

* Good, because it is the closest match to the Alyxia reels.
* Bad, because long project write-ups are harder to read, and there is no contrast between showcase and reading.

### Keep "Chapters"

* Good, because the existing vocabulary and URLs stay.
* Bad, because the book metaphor is what read poorly.

### 3D bookshelf and 3D project-card transitions

* Good, because they add playful moments.
* Bad, because they add weight without explaining anything; not chosen for now.

## More Information

Supersedes the visual direction of the first version (blueprint/cyanotype book). The content rules in `CLAUDE.md` still apply: no invented metrics, no book opinions written on the owner's behalf.
