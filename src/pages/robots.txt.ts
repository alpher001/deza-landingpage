// Served at /robots.txt. Lets every search engine in and points to the sitemap.
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", site).href}\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
