// schema.org JSON-LD builders. Every page links back to one Person (the author) by @id.
import type { Lang } from "../i18n/ui";
import { localePath, useTranslations } from "../i18n/utils";

const SAME_AS = ["https://www.linkedin.com/in/mauricio-cuello-/", "https://github.com/MauricioD13"];

export const personId = (site: URL) => new URL("/#person", site).href;

export function personLd(site: URL, lang: Lang) {
  const t = useTranslations(lang);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(site),
    name: t("site.title"),
    jobTitle: t("site.role"),
    url: new URL(localePath(lang), site).href,
    sameAs: SAME_AS,
    knowsAbout: ["Cloud security", "AWS", "DevOps", "Terraform", "Infrastructure as code", "CI/CD", "Containers", "FinOps"],
  };
}

export function websiteLd(site: URL, lang: Lang) {
  const t = useTranslations(lang);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("site.title"),
    url: new URL(localePath(lang), site).href,
    inLanguage: lang,
    author: { "@id": personId(site) },
  };
}

export function articleLd(opts: {
  site: URL;
  url: URL;
  lang: Lang;
  type: "BlogPosting" | "TechArticle";
  headline: string;
  description: string;
  datePublished: Date;
  image?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type,
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished.toISOString(),
    inLanguage: opts.lang,
    mainEntityOfPage: opts.url.href,
    author: { "@type": "Person", "@id": personId(opts.site), name: "Mauricio Cuello", url: new URL(localePath(opts.lang), opts.site).href },
    ...(opts.image ? { image: new URL(opts.image, opts.site).href } : {}),
    ...(opts.keywords?.length ? { keywords: opts.keywords.join(", ") } : {}),
  };
}
