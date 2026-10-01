// Draws the stylised Kano street map used inside the phone screens and writes
// it to src/generated/kano-map.json (map SVG markup plus the two route paths).
// Run: node scripts/make-map.mjs   (deterministic: same seed, same map)
// The street layout is drawn for the page, not traced from a real map.
import fs from "node:fs";

const W = 400;
const H = 1000;
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const f = (n) => Math.round(n * 10) / 10;

// Catmull-Rom spline through points, sampled into a polyline.
function spline(pts, step = 6) {
  const out = [];
  const p = [pts[0], ...pts, pts[pts.length - 1]];
  for (let i = 1; i < p.length - 2; i++) {
    const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    const len = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
    const n = Math.max(2, Math.ceil(len / step));
    for (let k = 0; k < n; k++) {
      const t = k / n;
      const t2 = t * t;
      const t3 = t2 * t;
      const c = (a, b, c2, d) => 0.5 * (2 * b + (-a + c2) * t + (2 * a - 5 * b + 4 * c2 - d) * t2 + (-a + 3 * b - 3 * c2 + d) * t3);
      out.push([c(p0[0], p1[0], p2[0], p3[0]), c(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

const d = (poly) => "M" + poly.map(([x, y]) => `${f(x)} ${f(y)}`).join("L");

function intersect(a, b) {
  for (let i = 0; i < a.length - 1; i++)
    for (let j = 0; j < b.length - 1; j++) {
      const [p, p2] = [a[i], a[i + 1]];
      const [q, q2] = [b[j], b[j + 1]];
      const r = [p2[0] - p[0], p2[1] - p[1]];
      const s = [q2[0] - q[0], q2[1] - q[1]];
      const den = r[0] * s[1] - r[1] * s[0];
      if (!den) continue;
      const t = ((q[0] - p[0]) * s[1] - (q[1] - p[1]) * s[0]) / den;
      const u = ((q[0] - p[0]) * r[1] - (q[1] - p[1]) * r[0]) / den;
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) return { pt: [p[0] + t * r[0], p[1] + t * r[1]], i, j };
    }
  return null;
}

// Major roads.
const roads = {
  murtala: { name: "Murtala Mohammed Way", pts: spline([[-30, 252], [120, 236], [262, 250], [430, 214]]) },
  ahmadu: { name: "Ahmadu Bello Way", pts: spline([[-30, 566], [140, 588], [282, 562], [430, 592]]) },
  france: { name: "France Road", pts: spline([[96, -30], [112, 200], [92, 420], [120, 640], [102, 1040]]) },
  zoo: { name: "Zoo Road", pts: spline([[150, 1040], [232, 700], [290, 470], [322, 244], [348, -30]]) },
  bompai: { name: "Bompai Road", pts: spline([[292, 462], [362, 420], [430, 372]]) },
};

// Neighbourhoods: each gets its own street grid at its own angle.
const districts = [
  { poly: [[0, 0], [106, 0], [112, 242], [0, 248]], angle: 8, s: 15 },
  { poly: [[106, 0], [400, 0], [400, 226], [112, 242]], angle: -14, s: 17 },
  { poly: [[0, 248], [112, 242], [96, 572], [0, 566]], angle: 4, s: 15 },
  { poly: [[112, 242], [400, 226], [400, 592], [98, 576]], angle: 22, s: 18 },
  { poly: [[0, 566], [98, 576], [112, 1000], [0, 1000]], angle: -6, s: 16 },
  { poly: [[98, 576], [400, 592], [400, 1000], [112, 1000]], angle: 34, s: 17 },
];

let defs = "";
let minor = "";
let secondary = "";
districts.forEach((dist, k) => {
  const id = `dz${k}`;
  defs += `<clipPath id="${id}"><path d="${d(dist.poly)}Z"/></clipPath>`;
  const a = (dist.angle * Math.PI) / 180;
  const [ux, uy] = [Math.cos(a), Math.sin(a)]; // along streets
  const [vx, vy] = [-uy, ux]; // across streets
  const cx = dist.poly.reduce((s, p) => s + p[0], 0) / dist.poly.length;
  const cy = dist.poly.reduce((s, p) => s + p[1], 0) / dist.poly.length;
  const R = 420;
  const rows = [];
  let lines = "";
  let bigs = "";
  for (let o = -R, n = 0; o <= R; o += dist.s * (0.8 + rnd() * 0.45), n++) {
    rows.push(o);
    const wob = (rnd() - 0.5) * 0.06;
    const x1 = cx + vx * o - (ux + wob) * R;
    const y1 = cy + vy * o - (uy - wob) * R;
    const x2 = cx + vx * o + (ux - wob) * R;
    const y2 = cy + vy * o + (uy + wob) * R;
    const seg = `M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`;
    if (n % 5 === 2) bigs += seg;
    else lines += seg;
  }
  // Cross streets: run across a few rows, then stop, like real blocks.
  for (let t = -R; t <= R; t += dist.s * (1.5 + rnd() * 1.3)) {
    let i = Math.floor(rnd() * 3);
    while (i < rows.length - 1) {
      const run = 2 + Math.floor(rnd() * 6);
      const j = Math.min(rows.length - 1, i + run);
      const tt = t + (rnd() - 0.5) * 6;
      const bend = (rnd() - 0.5) * 10;
      lines += `M${f(cx + vx * rows[i] + ux * tt)} ${f(cy + vy * rows[i] + uy * tt)}L${f(cx + vx * rows[j] + ux * (tt + bend))} ${f(cy + vy * rows[j] + uy * (tt + bend))}`;
      i = j + 1 + Math.floor(rnd() * 2);
    }
  }
  minor += `<path clip-path="url(#${id})" d="${lines}"/>`;
  secondary += `<path clip-path="url(#${id})" d="${bigs}"/>`;
});

// Junctions with roundabouts.
const pairs = [["murtala", "france"], ["murtala", "zoo"], ["ahmadu", "france"], ["ahmadu", "zoo"]];
const rounds = pairs.map(([a, b]) => intersect(roads[a].pts, roads[b].pts).pt);

// Green spaces and markets (drawn over the streets).
const parks = [
  { poly: spline([[150, 690], [205, 676], [222, 742], [200, 806], [150, 812], [136, 752], [150, 690]], 8), label: "Kano Zoo", at: [176, 748] },
  { poly: [[300, 360], [352, 350], [358, 392], [306, 402]], label: "", at: null },
  { poly: [[28, 300], [78, 296], [80, 352], [30, 356]], label: "", at: null },
];
const markets = [
  { poly: [[226, 118], [292, 104], [300, 152], [234, 166]], label: "Sabon Gari Market", at: [262, 136] },
  { poly: [[24, 108], [86, 112], [84, 158], [22, 154]], label: "Kantin Kwari", at: [54, 134] },
];

const labelsDistrict = [
  ["FAGGE", 52, 214],
  ["SABON GARI", 210, 60],
  ["BOMPAI", 352, 300],
  ["GWAGWARWA", 196, 352],
  ["TARAUNI", 52, 640],
  ["NASSARAWA GRA", 300, 690],
];

// Routes for the two screens. Built from pieces of the roads so they follow them.
function slice(key, from, to) {
  const p = roads[key].pts;
  return from <= to ? p.slice(from, to + 1) : p.slice(to, from + 1).reverse();
}
function nearest(key, [x, y]) {
  let best = 0;
  let bd = Infinity;
  roads[key].pts.forEach(([px, py], i) => {
    const dd = (px - x) ** 2 + (py - y) ** 2;
    if (dd < bd) [bd, best] = [dd, i];
  });
  return best;
}
const J = (a, b) => intersect(roads[a].pts, roads[b].pts);
// Ride: Sabon Gari Market, along Murtala Mohammed Way, down Zoo Road to the Zoo gate.
const mz = J("murtala", "zoo");
const az = J("ahmadu", "zoo");
const rideStart = [262, 172];
const rideA = nearest("murtala", [262, 250]);
const zooEnd = nearest("zoo", [281, 530]);
const ride = [rideStart, [262, 250], ...slice("murtala", rideA, mz.i).slice(1), mz.pt, ...slice("zoo", mz.j, zooEnd)];
const rideEnd = roads.zoo.pts[zooEnd].map(Math.round);
// The keke on its way to the pickup, along Murtala Mohammed Way from France Road.
const mf0 = J("murtala", "france");
const approach = [mf0.pt, ...slice("murtala", mf0.i + 1, rideA), [262, 250], [262, 182]];
// Delivery: Kantin Kwari, down France Road, along Ahmadu Bello Way into Nassarawa GRA.
const fTop = nearest("france", [110, 152]);
const delStart = [84, 150];
const zb = nearest("zoo", [292, 462]);
const delEnd = roads.bompai.pts[14].map(Math.round);
const delivery = [delStart, roads.france.pts[fTop], ...slice("france", fTop, mf0.j), mf0.pt, ...slice("murtala", mf0.i + 1, mz.i), mz.pt, ...slice("zoo", mz.j, zb), ...roads.bompai.pts.slice(1, 15)];

// Side streets the routes use at each end, drawn so the routes stay on streets.
const connectors = `<path d="M262 172L262 250M84 150L110 152"/>`;

const roadPaths = Object.entries(roads)
  .map(([k, r]) => `<path id="rd-${k}" d="${d(r.pts)}"/>`)
  .join("");

const svg = `<defs>${defs}<pattern id="pk" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#1e2329" opacity=".08"/></pattern></defs>
<rect x="-50" y="-50" width="${W + 100}" height="${H + 100}" fill="#efe9da"/>
<g fill="none" stroke="#fbf8f1" stroke-linecap="round" stroke-width="2.1">${minor}</g>
<g fill="none" stroke="#fffdf8" stroke-linecap="round" stroke-width="4.2">${secondary}${connectors}</g>
<g stroke="#fffdf8" stroke-width="2">${parks.map((p) => `<path d="${d(p.poly)}Z" fill="#e2dccb"/><path d="${d(p.poly)}Z" fill="url(#pk)"/>`).join("")}${markets.map((m) => `<path d="${d(m.poly)}Z" fill="#e6dfcd"/>`).join("")}</g>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
<g stroke="#d9cfb6" stroke-width="12.5">${roadPaths}</g>
<g stroke="#ffe08a" stroke-width="10">${Object.keys(roads).map((k) => `<use href="#rd-${k}"/>`).join("")}</g>
</g>
${rounds.map(([x, y]) => `<circle cx="${f(x)}" cy="${f(y)}" r="11" fill="#ffe08a" stroke="#d9cfb6" stroke-width="1.5"/><circle cx="${f(x)}" cy="${f(y)}" r="5" fill="#e2dccb"/>`).join("")}
<g class="map-labels" font-size="8.5" font-weight="600" fill="#1e2329" fill-opacity=".62" stroke="#fffdf8" stroke-width="2.6" stroke-opacity=".9" paint-order="stroke" letter-spacing=".02em">
${Object.entries(roads)
  .map(([k, r]) => `<text><textPath href="#rd-${k}" startOffset="${{ zoo: "28%", bompai: "62%", france: "4%", murtala: "79%", ahmadu: "11%" }[k]}">${r.name}</textPath></text>`)
  .join("")}
${[...parks, ...markets].filter((p) => p.at).map((p) => `<text x="${p.at[0]}" y="${p.at[1]}" text-anchor="middle" font-size="8">${p.label}</text>`).join("")}
</g>
<g font-size="7.5" font-weight="700" letter-spacing=".16em" fill="#1e2329" fill-opacity=".38" text-anchor="middle">
${labelsDistrict.map(([t, x, y]) => `<text x="${x}" y="${y}">${t}</text>`).join("")}
</g>`;

fs.writeFileSync(
  new URL("../src/generated/kano-map.json", import.meta.url),
  JSON.stringify({ width: W, height: H, svg, ride: d(ride), approach: d(approach), delivery: d(delivery), rideEnds: [rideStart, rideEnd], deliveryEnds: [delStart, delEnd] }),
);
console.log("map written", svg.length, "chars");
