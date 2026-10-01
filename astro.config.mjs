// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  // The live address. Canonical links, the sitemap, robots.txt and share
  // previews are all built from it. Change it here if the domain differs.
  site: process.env.SITE_URL ?? "https://deza.ng",
  trailingSlash: "ignore",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ha"],
    routing: { prefixDefaultLocale: false },
  },
});
