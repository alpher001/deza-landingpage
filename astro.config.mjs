// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  // Set to the real .ng domain once it is pointed at Cloudflare.
  // site: "https://example.ng",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ha"],
    routing: { prefixDefaultLocale: false },
  },
});
