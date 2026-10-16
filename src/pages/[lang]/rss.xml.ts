import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { langs, type Lang } from "../../i18n/ui";
import { entrySlug, getLocalizedEntries, localePath, useTranslations } from "../../i18n/utils";

export const getStaticPaths = () => langs.map((lang) => ({ params: { lang } }));

export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang;
  const t = useTranslations(lang);
  const chapters = (await getLocalizedEntries("chapters", lang)).filter((i) => !i.fallback);
  const stories = (await getLocalizedEntries("stories", lang)).filter((i) => !i.fallback);
  const books = (await getLocalizedEntries("books", lang)).filter((i) => !i.fallback);
  const items = [
    ...chapters.map(({ entry }) => ({ title: entry.data.title, description: entry.data.summary, pubDate: entry.data.date, link: localePath(lang, `chapters/${entrySlug(entry.id)}`) })),
    ...stories.map(({ entry }) => ({ title: entry.data.title, description: entry.data.description, pubDate: entry.data.date, link: localePath(lang, `stories/${entrySlug(entry.id)}`) })),
    ...books.map(({ entry }) => ({ title: entry.data.title, description: entry.data.takeaways[0] ?? entry.data.book.title, pubDate: entry.data.date, link: localePath(lang, `books/${entrySlug(entry.id)}`) })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: t("site.title"),
    description: t("site.description"),
    site: context.site!,
    items,
    customData: `<language>${lang}</language>`,
  });
}
