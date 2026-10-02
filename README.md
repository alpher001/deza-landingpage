# Deza landing page

The public site for Deza, a Kano mobility company: keke napep rides first, parcel delivery next. English at `/`, Hausa at `/ha/`.

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
- `src/components/Photo.astro`: photo slots. Files live in `public/images/` (WebP); originals and prompts are in the project's `visuals/` folder.
- `src/components/ScreenUI.astro`: the Deza app screens (ride booking in three steps, and parcel tracking), styled after the rider app in the monorepo and drawn over a Kano street map.
- `scripts/make-map.mjs`: draws that street map into `src/generated/kano-map.json`. Run `node scripts/make-map.mjs` after changing roads or routes. The streets are drawn for the page, not traced from a real map.
- `src/components/Cruise.astro`: the keke and courier that drive across the page. It appears once `public/images/cutouts/keke.webp` and `courier.webp` (transparent, facing right) exist.
- Hero video: `public/video/hero.mp4` (720p, 2 MB, no sound) with `public/images/hero-still.webp` as its poster. On phones the headline sits above the full video frame so the keke and courier stay in view. Without the video file the hero falls back to the keke and courier photos.
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
- [ ] Phone screen sample values are illustrative: Amina, Sabon Gari Market to Zoo Road, ₦600, Musa Ibrahim, KN 482 KY; parcel from Kantin Kwari to Bompai, Aminu, KN 117 DZ, code 4827.
- [ ] Delivery claims: delivery code at handover, what can be sent, pickups for shops.
- [ ] Deza Wallet: keep the one-line mention ("one Deza balance") or remove it.
- [ ] Brand fonts (Unbounded and Inter) approved.
- [ ] Link the store badges to the real listings; replace `google-play.png` with a sharper copy from play.google.com/intl/en/badges.
- [ ] `site` in `astro.config.mjs` is set to `https://deza.ng` as a placeholder. Change it to the real domain (or set `SITE_URL` in Cloudflare) so canonical links, the sitemap and share previews point to the right place.
- [ ] After launch: add the site to Google Search Console and submit `/sitemap.xml`, and create a Google Business Profile for Deza in Kano.
- [ ] Social and WhatsApp links for the footer.
