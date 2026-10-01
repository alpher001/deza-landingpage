# Deza landing page: agent notes

- Colours come from `deza-monorepo/packages/ui-kit/colors.ts`: ink `#1E2329`, paper `#FAF6EC`, gold `#FFC629`. Never add a hue or change a hex without Almustafa's approval. Gold is for buttons and highlights, never text on paper.
- All copy lives in `src/i18n.ts`, English and Hausa together. Change both languages in the same commit.
- Keep the page light: no UI frameworks, no client-side JS beyond the form, first load under 1 MB.
- Avoid template tells: gradients, glass cards, invented stats or testimonials, emoji.
- This repo is separate from the app monorepo on purpose. Do not import from or change `deza-monorepo`.
