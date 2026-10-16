import { langs } from "../i18n/ui";

/** getStaticPaths for pages that exist once per locale. */
export const localeStaticPaths = () => langs.map((lang) => ({ params: { lang } }));
