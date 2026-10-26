// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// Set SITE_URL in the Cloudflare build environment once the custom domain is known.
const site = process.env.SITE_URL ?? "https://tech-histories.pages.dev";

export default defineConfig({
  site,
  trailingSlash: "ignore",
  // The CSS (~8 KB gzipped) was the only render-blocking request; inlined, the first paint
  // needs only the HTML. Most visits read one or two pages, so caching it separately saves little.
  build: { inlineStylesheets: "always" },
  devToolbar: { enabled: false },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  fonts: [
    {
      // Display (condensed via the width axis), UI and body.
      name: "Archivo",
      cssVariable: "--font-archivo",
      provider: fontProviders.google(),
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["system-ui", "sans-serif"],
      options: { experimental: { variableAxis: { wdth: [["62", "125"]] } } },
    },
    {
      // The italic second line of display headlines.
      name: "Instrument Serif",
      cssVariable: "--font-instrument",
      provider: fontProviders.google(),
      weights: [400],
      styles: ["italic"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["Georgia", "serif"],
    },
  ],
  integrations: [
    // React: server-rendered AWS icons, plus client-only React Three Fiber islands.
    react(),
    mdx(),
    sitemap({
      i18n: { defaultLocale: "en", locales: { en: "en", es: "es" } },
      // "/" is a language redirect (noindex) and 404 is not content: keep both out.
      filter: (page) => !/^https?:\/\/[^/]+\/(404\/?)?$/.test(page),
    }),
  ],
  markdown: {
    shikiConfig: { theme: "github-dark", wrap: true },
  },
  vite: { plugins: [tailwindcss()] },
});
