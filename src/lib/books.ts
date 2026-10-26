import { getCollection, type CollectionEntry } from "astro:content";
import { defaultLang } from "../i18n/ui";
import { entryLang } from "../i18n/utils";

/** Shelf order on /books. */
export const bookCategories = ["tech", "business", "literature"] as const satisfies readonly CollectionEntry<"books">["data"]["category"][];

const palette = ["#1c3f73", "#2f5d50", "#7a3b2e", "#4a4f6a", "#6b5a2a", "#3b2f55"];

/**
 * Cloth colour of each book, keyed by translationKey, so its spine and cover look the same in
 * every language and view. The English entry's `spine` wins over a translation's; books with
 * no `spine` get a palette colour picked from the key.
 */
export async function getBookColors() {
  const all = await getCollection("books");
  const colors = new Map<string, string>();
  const english = all.filter((e) => entryLang(e.id) === defaultLang);
  for (const { data } of [...english, ...all])
    if (data.spine && !colors.has(data.translationKey)) colors.set(data.translationKey, data.spine);
  return (translationKey: string) => {
    let hash = 0;
    for (const c of translationKey) hash = (hash * 31 + c.charCodeAt(0)) >>> 0;
    return colors.get(translationKey) ?? palette[hash % palette.length];
  };
}
