# Deza landing page

The public site for Deza, keke napep ride-hailing in Kano. English at `/`, Hausa at `/ha/`.

Built with [Astro](https://astro.build): plain HTML and CSS, a few lines of JavaScript for the waitlist form, and the Inter font (it has the Hausa letters ɓ ɗ ƙ ƴ, which Plus Jakarta Sans does not). First load is about 120 KB.

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
- `src/components/PhoneMock.astro`: the phone in the hero, a concept of the request screen built in HTML.
- `src/components/ArewaPattern.astro`: the gold line pattern, drawn after the Dagin Nuhu knot.
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
- [ ] Phone mock sample values (BUK New Site, ₦600, 3 min) are illustrative.
- [ ] Brand font (Inter is in use; design-system lists it as a candidate).
- [ ] Logo: the "D" mark is a placeholder.
- [ ] Real Kano photography for the hero and driver sections.
- [ ] Social and WhatsApp links for the footer.
