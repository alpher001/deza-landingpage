# Deza landing page

The public site for Deza, keke napep ride-hailing in Kano. English at `/`, Hausa at `/ha/`.

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
- `src/components/ScreenUI.astro`: the app screen drawn over the phone in `phone-in-hand.webp`; it follows the "How it works" steps.
- `src/components/Logo.astro`: Almustafa's mark and wordmark from `public/brand/`.
- `src/components/StoreBadges.astro`: official App Store and Google Play badges from `public/badges/`.
- `src/styles/global.css`: colours and spacing, copied from `deza-monorepo/packages/ui-kit`.

## Deploy (Cloudflare)

1. Cloudflare dashboard, Workers & Pages, Create, connect this GitHub repo.
2. Build command `npm run build`, output folder `dist`.
3. Add the custom domain once the .ng domain's nameservers point to Cloudflare.

## Waitlist

The form posts JSON (`phone`, `area`, `role`, `lang`) to the URL in `PUBLIC_WAITLIST_URL`. While that is unset the form says sign-ups open soon and saves nothing. Storage is decided later.

## To confirm before launch

- [ ] Hausa copy checked by a native speaker (it is a first draft).
- [ ] Claims: riders are checked before driving, trip sharing, cash or transfer, Hausa support.
- [ ] Phone screen sample values (BUK New Site, ₦600, Musa, KN 482 KY) are illustrative.
- [ ] Brand fonts (Unbounded and Inter) approved.
- [ ] Link the store badges to the real listings; replace `google-play.png` with a sharper copy from play.google.com/intl/en/badges.
- [ ] Set `site` in `astro.config.mjs` to the real domain so the WhatsApp link preview (`public/og.jpg`) works.
- [ ] Social and WhatsApp links for the footer.
