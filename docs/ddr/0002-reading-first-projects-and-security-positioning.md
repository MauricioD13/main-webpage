---
status: accepted
date: 2026-10-16
decision-makers: Mauricio Cuello
---

# Reading-first project pages, security-led positioning, full Spanish content

## Context and Problem Statement

After the redesign (DDR 0001), review of the site found:

* **Positioning:** most published projects and stories are about cloud engineering, but most of the owner's work has been in cybersecurity. "Cloud & DevOps engineer" under-sold it.
* **Project header:** the cover image rendered at its natural height (the page-scoped `.cover` rule never reached `MonoImage`'s root element), so on a 1440×900 screen the article started 1,730px down, almost two screens.
* **Scrollytelling:** the text column was 408px against an 829px diagram, each step reserved 62% of the viewport for one short paragraph, and inactive steps were faded to 32%, so a reader saw about five lines at a time. The articles are meant to be read.
* **Language:** only one project and one story existed in Spanish; the rest fell back to English.

## Decision Outcome

* **Role:** "Security, cloud and DevOps engineer" / "Ingeniero de seguridad, cloud y DevOps" in the hero badge, hero paragraph and meta description; the security capability moves to the top of the home capabilities grid. The hero title is unchanged.
* **Project header:** the cover is a short strip (`clamp(6rem, 12vw, 11rem)`, via a `:global(.mono.cover)` selector) and hidden on small screens; header padding and outcome figures are tighter; on mobile, meta is two-up and the stack is a comma list instead of pills. Measured first-paragraph position: desktop 1,730 → 876px (now inside the first screen); mobile 1,553 → 879–1,065px.
* **Scrollytelling (reading-first):** text column `minmax(0, 36rem)` (≈612px at 1440) beside the plate (≈625px), plates capped to `100vh − 13rem` so they always fit; steps are `min-height: 42vh` (was 62vh) and the first step is top-aligned; inactive steps stay at 55% opacity and the active one is marked with an amber rule; on mobile the pinned plate band is capped at 28vh with its caption hidden, and steps are 50vh.
* **Authoring:** no new component. Each `<Step>` is one passage; a step can hold several paragraphs, lists or code, so writers control how much text is read per diagram state by how they group content into steps (documented in the README).
* **Spanish:** every published project and story now has a Spanish version, and every plate has Spanish labels in `src/data/diagrams.es.ts` (also used on Spanish project cards via `projectPlatesEs`). Book entries are still owner-pending example drafts and are not translated.
