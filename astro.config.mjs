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
  devToolbar: { enabled: false },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  fonts: [
    {
      name: "Literata",
      cssVariable: "--font-literata",
      provider: fontProviders.google(),
      weights: ["200 900"],
      styles: ["normal", "italic"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["Georgia", "serif"],
    },
    {
      name: "Archivo",
      cssVariable: "--font-archivo",
      provider: fontProviders.google(),
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["system-ui", "sans-serif"],
      options: { experimental: { variableAxis: { wdth: [["62", "125"]] } } },
    },
  ],
  integrations: [
    // React is only used to server-render aws-react-icons to static SVG — no client hydration.
    react(),
    mdx(),
    sitemap({
      i18n: { defaultLocale: "en", locales: { en: "en", es: "es" } },
    }),
  ],
  markdown: {
    shikiConfig: { themes: { light: "github-light", dark: "github-dark" }, defaultColor: false },
  },
  vite: { plugins: [tailwindcss()] },
});
