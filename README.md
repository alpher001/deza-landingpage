# Deza landing page

The public site for Deza, a Kano mobility company: keke napep rides first, package delivery by dispatch rider next. English at `/`, Hausa at `/ha/`.

Built with [Astro](https://astro.build): plain HTML and CSS, a small script for the scroll effects and the waitlist form, Unbounded for headlines and Inter for text (both have the Hausa letters ɓ ɗ ƙ ƴ).

## Run it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

Node 22.12 or newer.

## Where things are

- `src/i18n.ts`: every word on the page, English and Hausa side by side. Edit copy here.
- `src/components/Page.astro`: the page layout and styles.
- `src/components/Photo.astro` and `src/lib/pictures.ts`: photos. Full-quality originals live in `src/assets/` (`photos/`, `cutouts/`, `posters/`); the build turns each into AVIF and WebP at several widths, and each screen downloads only the size it needs. `scripts/prune.mjs` then drops the unused originals from `dist/`. Prompts are in the project's `visuals/` folder.
- `src/components/ScreenUI.astro`: the Deza app screens (ride booking in three steps, and package tracking), styled after the rider app in the monorepo and drawn over a Kano street map.
- `scripts/make-map.mjs`: draws that street map into `src/generated/kano-map.json`. Run `node scripts/make-map.mjs` after changing roads or routes. The streets are drawn for the page, not traced from a real map.
- `src/components/Cruise.astro`: the keke and courier that drive across the page, from `src/assets/cutouts/keke.png` and `courier.png` (transparent, facing right).
- Videos (no sound, each cut to loop on itself):
  - `public/video/hero-av1.mp4` (1080p AV1, 1.0 MB), `hero-1080.mp4` (H.264 for devices without AV1) and `hero.mp4` (720p H.264 for those phones). Cut from the original 10 s clip: 0 to 2.35 s and 5.4 to 10 s, joined by dissolves where the keke and courier hold the same spot. The 2.4 to 5.4 s stretch is dropped because of AI glitches (the wall melts, a second courier appears, the courier passes through the keke). Still: `src/assets/posters/hero.png`.
  - `public/video/city-av1.mp4` and `city.mp4`: the rooftop clip behind the sign-up section, 2.4 to 8.3 s of the second original, dipping through ink at the loop point (a dissolve doubled the vehicles because the camera is moving). Still: `src/assets/posters/city.png`.
  - The page paints with the stills; videos start downloading only after the page has loaded and when near the screen, and never with reduced motion or data saver on.
- Fonts: `public/fonts/inter.woff2` and `unbounded.woff2`, cut from the Google Fonts variable originals to the letters the site uses (English, Hausa ɓ ɗ ƙ ƴ, ₦) and weights 400 to 800, with fontTools `varLib.instancer` and `pyftsubset`. Add a letter the site starts using to the subset list and rebuild them.
- `public/map.svg`: the Kano street map, written by `scripts/make-map.mjs`, kept out of the HTML so it caches.
- `public/_headers`: Cloudflare cache rules.
- `src/components/Logo.astro`: Almustafa's mark and wordmark from `public/brand/`.
- `src/components/StoreBadges.astro`: official App Store and Google Play badges from `public/badges/`.
- `src/styles/global.css`: colours and spacing, copied from `deza-monorepo/packages/ui-kit`.
- `src/layouts/Base.astro`: page head: title, description, canonical and hreflang links, share previews, and structured data (organisation, the two services in Kano, and the questions).
- `src/pages/robots.txt.ts` and `src/pages/sitemap.xml.ts`: become `/robots.txt` and `/sitemap.xml` when the site is built. They take the address from `site` in `astro.config.mjs`.
- `public/`: files served as they are: photos, badges, logo, favicon and app icons, `og.jpg` (the WhatsApp/Twitter preview) and `site.webmanifest`.

## Deploy (Cloudflare)

1. Cloudflare dashboard, Workers & Pages, Create, connect this GitHub repo.
2. Build command `npm run build`, output folder `dist`.
3. Add the custom domain once the .ng domain's nameservers point to Cloudflare.

## Waitlist

The form posts JSON (`phone`, `area`, `role`, `lang`) to the URL in `PUBLIC_WAITLIST_URL`. While that is unset the form says sign-ups open soon and saves nothing. Storage is decided later.

## To confirm before launch

- [ ] Hausa copy checked by a native speaker (revised 2026-10-01, still not reviewed by one).
- [ ] Claims: riders are checked before driving, trip sharing, cash or transfer, Hausa support.
- [ ] Phone screen sample values are illustrative: Amina, Sabon Gari Market to Zoo Road, ₦600, Musa Ibrahim, KN 482 KY; package from Kantin Kwari to Bompai, Aminu, KN 117 DZ, code 4827.
- [ ] Delivery claims: delivery code at handover, what can be sent, pickups for shops.
- [ ] Deza Wallet: keep the one-line mention ("one Deza balance") or remove it.
- [ ] Brand fonts (Unbounded and Inter) approved.
- [ ] Link the store badges to the real listings; replace `google-play.png` with a sharper copy from play.google.com/intl/en/badges.
- [ ] `site` in `astro.config.mjs` is set to `https://deza.ng` as a placeholder. Change it to the real domain (or set `SITE_URL` in Cloudflare) so canonical links, the sitemap and share previews point to the right place.
- [ ] After launch: add the site to Google Search Console and submit `/sitemap.xml`, and create a Google Business Profile for Deza in Kano.
- [ ] Social and WhatsApp links for the footer.
