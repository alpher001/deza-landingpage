// Served at /sitemap.xml. Lists both language versions and links them to each
// other, so Google shows Hausa searchers the Hausa page.
import type { APIRoute } from "astro";

const pages = ["/", "/ha/"];

export const GET: APIRoute = ({ site }) => {
  const url = (p: string) => new URL(p, site).href;
  const alternates = `<xhtml:link rel="alternate" hreflang="en" href="${url("/")}"/><xhtml:link rel="alternate" hreflang="ha" href="${url("/ha/")}"/><xhtml:link rel="alternate" hreflang="x-default" href="${url("/")}"/>`;
  const today = new Date().toISOString().slice(0, 10);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map((p) => `  <url><loc>${url(p)}</loc><lastmod>${today}</lastmod>${alternates}</url>`).join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8" } });
};
