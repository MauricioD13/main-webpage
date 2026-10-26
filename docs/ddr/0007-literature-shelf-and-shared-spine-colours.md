---
status: accepted
date: 2026-10-24
decision-makers: Mauricio Cuello
---

# Literature shelf and one spine colour per book

## Context and Problem Statement

The bookshelf only had tech and business shelves, and the owner is adding fiction (Dune Messiah). Book colours also differed between languages and views: The Phoenix Project had a different `spine` in its English and Spanish entries, and books without a `spine` took a palette colour by position, which changed with the language (each shelf holds a different set of books) and even between the spine and the pulled-out cover on the same page. The book page and the home nightstand drew covers with no colour at all.

## Decision Outcome

* New book category `literature` ("Literature" / "Literatura"), shown as a third shelf on `/books`. Shelf order lives in `bookCategories` (`src/lib/books.ts`); the schema enum in `src/content.config.ts` must list the same values. Shelves and filter buttons are only rendered for categories that have books in that language.
* A book's colour is resolved once per `translationKey` by `getBookColors()` (`src/lib/books.ts`) and used by the shelf spines, the pulled-out cover, the book page and the home nightstand. The English entry's `spine` wins over a translation's; books with no `spine` get a palette colour picked from a hash of the key, so it is the same in every language. Translations still carry the same `spine` value so each file reads correctly on its own.
