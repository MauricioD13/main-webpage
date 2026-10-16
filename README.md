# Tech Histories

Personal site of Mauricio Cuello: cloud projects told as book chapters with interactive diagrams, short stories, and a bookshelf of tech and business reading. English and Spanish.

Astro 7 (static) · Tailwind CSS 4 · MDX · GSAP + ScrollTrigger + Lenis · deployed as static assets on Cloudflare Workers.

## Commands

```bash
pnpm install
pnpm dev          # http://localhost:4321 (drafts are visible in dev)
pnpm check        # type and template diagnostics
pnpm build        # → dist/
pnpm preview:cf   # build, then serve dist/ with Wrangler like production
pnpm deploy       # build and deploy to Cloudflare
```

Set `SITE_URL` in the build environment once the domain is known (used for canonical URLs, sitemap, RSS).

## Writing content

Every entry lives at `src/content/<collection>/<lang>/<slug>.md(x)`. The same piece in two languages shares a `translationKey`; the slugs can differ. Anything without a Spanish version is still listed under `/es/`, marked "Solo en inglés", with the English page as canonical.

| Collection | Folder | Notes |
|---|---|---|
| Chapters (projects) | `src/content/chapters/` | `chapter` sets the order and the roman numeral. MDX. |
| Stories (short posts) | `src/content/stories/` | Markdown is enough. |
| Books | `src/content/books/` | `status: reading` shows on the home page nightstand. The four current entries are **examples with `draft: true`**: replace the notes with your own and set `draft: false`. |

Schemas: `src/content.config.ts`. UI strings for both languages: `src/i18n/ui.ts`.

## Interactive plates in a chapter

Diagram data lives in `src/data/diagrams.ts` (Spanish labels in `diagrams.es.ts`). A chapter tells its story with steps that drive the plate:

```mdx
import Scrolly from "@/components/visual/Scrolly.astro";
import Step from "@/components/visual/Step.astro";
import ArchDiagram from "@/components/visual/ArchDiagram.astro";
import { dataPipeline } from "@/data/diagrams";

<Scrolly>
  <ArchDiagram slot="stage" diagram={dataPipeline} title="Odoo to dashboards" plate="Plate 4.1" />

  <Step focus="odoo,lambda">Text for the first beat…</Step>
  <Step show="s3,athena" focus="s3,athena">Revealed and highlighted at this step…</Step>
</Scrolly>
```

- `show`: ids hidden until this step (nodes, groups, or `from-to` edges; an edge appears with both of its nodes).
- `focus`: ids lit in full colour, with traffic animating along the edges between them.
- Several plates can share a stage: give each a `panel="name"` and switch with `<Step panel="name">`.
- Also available: `<Chart type="bar|line" data={[…]} />`, `<StatRow>` + `<StatCounter value={64} suffix="%" label="…" />`, `<Callout>`.
- AWS icon keys are in `src/components/visual/icons.ts`; non-AWS nodes use `glyph: "GH"`.
- Adding a plate to `chapterPlates` shows it as the preview on the table of contents.

Everything is readable without JavaScript and with reduced motion: plates render complete, and the home page book shows as a static spread.

## Dev helper

`node scripts/shoot.mjs /en/ out 1440 900 0,800` screenshots a page at scroll positions (needs `pnpm dev`; env `SCHEME=dark`, `REDUCED=1`, `NOJS=1`).
