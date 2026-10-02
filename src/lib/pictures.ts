// Shared by Photo.astro and the page head: finds an original in src/assets/
// and turns it into AVIF and WebP files at several widths.
import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

const files = import.meta.glob<{ default: ImageMetadata }>("../assets/**/*.{jpg,jpeg,png,webp}", { eager: true });

// "courier-doorstep" looks in photos/; "posters/hero" names the folder.
export function findAsset(base: string) {
  const dir = base.includes("/") ? base : `photos/${base}`;
  const hit = Object.entries(files).find(([p]) => p.replace(/\.[a-z]+$/, "").endsWith(`/assets/${dir}`));
  return hit?.[1].default;
}

// AVIF for browsers that take it (about half the size of WebP at the same
// look), WebP for the rest. Quality is set high on purpose: no mushy photos.
export async function srcsets(img: ImageMetadata, widths: number[]) {
  const ws = widths.filter((w) => w <= img.width);
  if (!ws.length || ws[ws.length - 1] < img.width) ws.push(img.width);
  const build = (format: "avif" | "webp", quality: number) =>
    Promise.all(ws.map((width) => getImage({ src: img, width, format, quality }))).then((r) =>
      r.map((x, i) => `${x.src} ${ws[i]}w`).join(", "),
    );
  const fallback = await getImage({ src: img, width: ws.find((w) => w >= 960) ?? ws[ws.length - 1], format: "webp", quality: 82 });
  return { avif: await build("avif", 64), webp: await build("webp", 82), src: fallback.src };
}
