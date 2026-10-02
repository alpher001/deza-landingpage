// After the build: drop the full-size originals Astro copies next to the
// sized AVIF/WebP files. No page links to them, so visitors never load them;
// this only keeps the upload small.
import fs from "node:fs";
import path from "node:path";

const dist = new URL("../dist/", import.meta.url).pathname;
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const files = walk(dist);
const text = files.filter((f) => /\.(html|css|js|xml|txt|webmanifest)$/.test(f)).map((f) => fs.readFileSync(f, "utf8")).join("\n");
let freed = 0;
for (const f of files.filter((f) => f.includes("/_astro/") && /\.(png|jpe?g)$/.test(f))) {
  if (text.includes(path.basename(f))) continue;
  freed += fs.statSync(f).size;
  fs.rmSync(f);
}
console.log(`prune: removed ${(freed / 1e6).toFixed(1)} MB of unused originals`);
