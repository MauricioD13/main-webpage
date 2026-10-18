import { getCollection, type CollectionEntry } from "astro:content";
import { defaultLang, langs, ui, type Lang, type UiKey } from "./ui";

export function isLang(value: string | undefined): value is Lang {
  return !!value && (langs as string[]).includes(value);
}

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split("/");
  return isLang(first) ? first : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UiKey) => ui[lang][key] ?? ui[defaultLang][key];
}

/** Builds "/<lang>/<path>/" — every route in this site is locale-prefixed. */
export function localePath(lang: Lang, path = "") {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${lang}/${clean}/` : `/${lang}/`;
}

export function formatDate(date: Date, lang: Lang, opts?: Intl.DateTimeFormatOptions) {
  return date.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    ...opts,
    timeZone: "UTC",
  });
}

type Localized = "projects" | "stories" | "books";

export const entryLang = (id: string) => id.split("/")[0] as Lang;
export const entrySlug = (id: string) => id.split("/").slice(1).join("/");

/**
 * Entries to show for `lang`: native ones plus default-language entries that
 * have no translation yet (flagged with `fallback: true`).
 */
export async function getLocalizedEntries<C extends Localized>(collection: C, lang: Lang) {
  const all = (await getCollection(collection, ({ data }) => import.meta.env.DEV || !data.draft)) as CollectionEntry<C>[];
  const native = all.filter((e) => entryLang(e.id) === lang);
  const keys = new Set(native.map((e) => e.data.translationKey));
  const fallbacks =
    lang === defaultLang
      ? []
      : all.filter((e) => entryLang(e.id) === defaultLang && !keys.has(e.data.translationKey));
  return [
    ...native.map((entry) => ({ entry, fallback: false })),
    ...fallbacks.map((entry) => ({ entry, fallback: true })),
  ];
}

/** For each locale, the URL of this entry's counterpart (or the section index). */
export async function getAlternates<C extends Localized>(
  collection: C,
  section: string,
  translationKey: string,
) {
  const all = (await getCollection(collection)) as CollectionEntry<C>[];
  return Object.fromEntries(
    langs.map((l) => {
      const find = (lang: Lang) =>
        all.find((e) => entryLang(e.id) === lang && e.data.translationKey === translationKey);
      // Untranslated entries are still published under every locale (as fallbacks).
      const match = find(l) ?? find(defaultLang);
      const slug = match ? entrySlug(match.id) : undefined;
      return [l, slug ? localePath(l, `${section}/${slug}`) : localePath(l, section)];
    }),
  ) as Record<Lang, string>;
}

export function readingMinutes(body = "") {
  const words = body.replace(/<[^>]+>|import .*|```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
