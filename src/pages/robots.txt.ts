import type { APIContext } from "astro";

// Generated so the sitemap URL follows SITE_URL.
export function GET({ site }: APIContext) {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site)}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
