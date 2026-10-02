// The 3D gold Deza mark (see Mark3D.astro). three.js is imported by name so
// the bundle carries only the parts this uses.
//
// Why the old mark looked like it was flipping: the outline was extruded in
// SVG coordinates (y down) and then mirrored with scale(1, -1, 1). A mirror
// reverses every triangle's winding, so the faces that point at the camera
// were culled and the inside of the far walls drew instead. The piece was
// rendered inside out, which reads as the front and side swapping places as
// it turns. Here the outline is flipped point by point before extruding, so
// the solid is built the right way round.
import {
  Color,
  ExtrudeGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  NeutralToneMapping,
  PMREMGenerator,
  PerspectiveCamera,
  PlaneGeometry,
  SRGBColorSpace,
  Scene,
  Shape,
  WebGLRenderer,
} from "three";
import { toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const DEG = Math.PI / 180;

/** One closed SVG outline (M L H V C Z, absolute or relative) as a Shape,
 * with y flipped to point up. */
function toShape(d: string) {
  const shape = new Shape();
  const tokens = d.match(/[a-z]|[-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi) ?? [];
  let i = 0;
  let cmd = "";
  let x = 0;
  let y = 0;
  let moves = 0;
  const num = () => Number(tokens[i++]);
  while (i < tokens.length) {
    if (/[a-z]/i.test(tokens[i])) cmd = tokens[i++];
    const ox = cmd === cmd.toLowerCase() ? x : 0;
    const oy = cmd === cmd.toLowerCase() ? y : 0;
    switch (cmd.toUpperCase()) {
      case "M":
        if (moves++) throw new Error("mark3d: the mark must be one outline");
        x = ox + num();
        y = oy + num();
        shape.moveTo(x, -y);
        cmd = cmd === "m" ? "l" : "L";
        break;
      case "L":
        x = ox + num();
        y = oy + num();
        shape.lineTo(x, -y);
        break;
      case "H":
        x = ox + num();
        shape.lineTo(x, -y);
        break;
      case "V":
        y = oy + num();
        shape.lineTo(x, -y);
        break;
      case "C": {
        const ax = ox + num();
        const ay = oy + num();
        const bx = ox + num();
        const by = oy + num();
        x = ox + num();
        y = oy + num();
        shape.bezierCurveTo(ax, -ay, bx, -by, x, -y);
        break;
      }
      case "Z":
        shape.closePath();
        cmd = "";
        break;
      default:
        throw new Error(`mark3d: unsupported path command "${cmd}"`);
    }
  }
  return shape;
}

/** A soft studio baked once into the reflections. Neutral white light only:
 * the gold colour comes from the metal. Directions are azimuth (0 = toward
 * the camera, negative = left) and elevation, in degrees. A flat face
 * turned by yaw reflects az = 2 * yaw, so at rest (yaw -22, pitch 8) it
 * mirrors about az -44, el -16, inside the key. As the piece turns in from
 * the side, the strip and then the key's edge cross the face once. */
function studio(renderer: WebGLRenderer) {
  const room = new Scene();
  room.background = new Color().setScalar(0.2);
  const parts: { dispose(): void }[] = [];
  const box = (w: number, h: number, power: number, az: number, el: number) => {
    const g = new PlaneGeometry(w, h);
    const m = new MeshBasicMaterial({ color: new Color().setScalar(power) });
    const panel = new Mesh(g, m);
    const r = 10;
    panel.position.set(r * Math.sin(az * DEG) * Math.cos(el * DEG), r * Math.sin(el * DEG), r * Math.cos(az * DEG) * Math.cos(el * DEG));
    panel.lookAt(0, 0, 0);
    room.add(panel);
    parts.push(g, m);
  };
  // Key, front left, in bands that dim toward the floor: the face reads as a
  // soft fall of light from top to bottom, and tilting moves it.
  [1.75, 1.4, 1.04, 0.72, 0.48].forEach((p, i) => box(7.6, 1.85, p, -38, 6 - i * 10.5));
  box(8, 9, 0.8, 16, -10); // softer fill to the right: the key's edge drifts over the face
  box(1.3, 18, 4.5, -76, 0); // strip just past the key's edge: the sheen as it turns in
  box(16, 6, 2.1, 0, 56); // overhead: the top bevels catch it
  box(2, 16, 2.6, 118, 6); // rim behind right: the round edge
  box(20, 8, 0.09, 0, -62); // dark floor, so the lower edges keep their shape
  const pmrem = new PMREMGenerator(renderer);
  const env = pmrem.fromScene(room, 0.02).texture;
  pmrem.dispose();
  parts.forEach((p) => p.dispose());
  return env;
}

export interface Pose {
  yaw: number; // degrees, 0 = facing the camera
  pitch: number; // degrees, positive = seen a little from above
  scale: number;
}

/** Renderer, scene and camera for one mark. Knows nothing about motion. */
export function stage(host: HTMLElement) {
  const [, , vw, vh] = host.dataset.view!.split(/[\s,]+/).map(Number);

  const depth = 20;
  const bevel = 6;
  const geo = new ExtrudeGeometry(toShape(host.dataset.d!), {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: 5,
    bevelOffset: -2.5, // half in, half out: the silhouette stays on the flat mark's line
    bevelSegments: 8,
    curveSegments: 18,
  });
  geo.center();
  // Smooth across the rounded bevel and the curves, crisp at real corners.
  toCreasedNormals(geo, 44 * DEG);
  // The two faces are flat planes: one normal each, so no shading drifts
  // across their long triangles. ExtrudeGeometry puts them in group 0.
  const normal = geo.attributes.normal;
  const caps = geo.groups[0];
  for (let k = caps.start; k < caps.start + caps.count; k++) normal.setXYZ(k, 0, 0, normal.getZ(k) < 0 ? -1 : 1);

  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.toneMapping = NeutralToneMapping; // keeps the brand gold true
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  scene.environment = studio(renderer);

  const gold = new MeshStandardMaterial({ color: 0xffc629, metalness: 1, roughness: 0.24 });
  const mesh = new Mesh(geo, gold);
  scene.add(mesh);

  // A long lens keeps the piece from distorting. The canvas overhangs the
  // host (see Mark3D.astro) so the piece can turn without clipping; the
  // camera stands where the front face, seen square on, fills the host
  // exactly like the flat mark does.
  const fov = 22;
  const front = depth / 2 + bevel;
  const camera = new PerspectiveCamera(fov, vw / vh);

  const canvas = renderer.domElement;
  host.append(canvas);

  let pose: Pose = { yaw: 0, pitch: 0, scale: 1 };
  const draw = (p: Pose = pose) => {
    pose = p;
    // Turn first, then tilt about the screen's horizontal axis.
    mesh.rotation.set(p.pitch * DEG, p.yaw * DEG, 0, "XYZ");
    mesh.scale.setScalar(p.scale);
    renderer.render(scene, camera);
  };

  const fit = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h || !host.clientHeight) return;
    renderer.setSize(w, h, false);
    const dist = front + (vh * (h / host.clientHeight)) / (2 * Math.tan((fov / 2) * DEG));
    camera.position.z = dist;
    camera.near = dist / 2;
    camera.far = dist * 2;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    draw(); // setSize clears the canvas: never leave a blank frame
  };
  fit();

  const dispose = () => {
    geo.dispose();
    gold.dispose();
    scene.environment?.dispose();
    renderer.dispose();
    canvas.remove();
  };

  return { canvas, fit, draw, dispose };
}

// Motion. Calm and bounded: the piece arrives from 62 degrees to one side,
// then sways within about 15 degrees of rest. The back never shows and
// nothing spins.
const REST_YAW = -22; // shows the depth of the round edge
const REST_PITCH = 8;
const START_YAW = -62; // the entrance comes in from the side...
const START_PITCH = 14; // ...a little from above...
const START_SCALE = 0.9; // ...and from a touch further away

/** How far the entrance still has to go, 1 at the start, 0 at rest. A damped
 * spring that sets off already moving: the piece pulls in (most of the way
 * in under a second), brakes, gives about a degree past rest and settles. */
function arrive(t: number) {
  if (t <= 0) return 1;
  const w = 2; // natural frequency, rad/s
  const z = 0.8; // damping ratio
  const v = 0.85; // starting speed toward rest, in units of w
  const wd = w * Math.sqrt(1 - z * z);
  return Math.exp(-z * w * t) * (Math.cos(wd * t) + (((z - v) * w) / wd) * Math.sin(wd * t));
}

const clamp = (x: number, a = -1, b = 1) => Math.min(b, Math.max(a, x));
const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

export function mount(host: HTMLElement) {
  const s = stage(host);
  const { canvas } = s;
  canvas.style.opacity = "0";

  // "live" hides the flat mark. Off screen it can go now, and the piece will
  // turn in from the side. If the flat mark is already being looked at, the
  // piece starts square on, exactly over it, so the hand-over is invisible
  // and the flat mark simply comes alive.
  let rect = host.getBoundingClientRect();
  const offScreen = rect.top > innerHeight || rect.bottom < 0;
  const from: Pose = offScreen ? { yaw: START_YAW, pitch: START_PITCH, scale: START_SCALE } : { yaw: 0, pitch: 0, scale: 1 };
  const fade = 0.35; // seconds for the piece to fade in
  const hold = offScreen ? 0 : fade; // over the flat mark, fade in fully before moving
  let flatGone = false;
  const hideFlat = () => {
    if (flatGone) return;
    flatGone = true;
    host.classList.add("live");
  };
  if (offScreen) hideFlat();

  // Compile the shaders and draw the first pose now, so the entrance starts
  // on a ready frame.
  s.draw(from);

  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  let aimX = 0; // where the pointer is, -1..1 around the mark
  let aimY = 0;
  let px = 0; // the same, eased
  let py = 0;
  const onPointer = (ev: PointerEvent) => {
    if (ev.pointerType !== "mouse") return;
    aimX = clamp((ev.clientX - (rect.left + rect.width / 2)) / (innerWidth / 2));
    aimY = clamp((ev.clientY - (rect.top + rect.height / 2)) / (innerHeight / 2));
  };
  const onLeave = () => {
    aimX = 0;
    aimY = 0;
  };

  let clock = 0; // seconds of on-screen time, so a hidden tab never skips the entrance
  let start = -1; // clock time the entrance began
  let tilt = 0; // eased scroll tilt
  let last = 0;
  let raf = 0;
  let visible = false;
  let shown = "0";

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = last ? Math.min((now - last) / 1000, 1 / 20) : 0;
    last = now;
    clock += dt;
    rect = host.getBoundingClientRect();

    // The entrance plays once, when the mark is well inside the screen.
    if (start < 0 && rect.top < innerHeight * 0.88 && rect.bottom > 0) start = clock;
    const t = start < 0 ? 0 : clock - start;
    if (start >= 0 && t >= hold) hideFlat();
    const m = t - hold; // motion time
    const away = start < 0 ? 1 : arrive(m);

    // Idle sway, faded in as the entrance settles: two slow, unrelated
    // periods, so it never reads as a loop.
    const sway = smooth(0.6, 3.2, m);
    const swayYaw = 7 * Math.sin((m / 9.5) * 2 * Math.PI) * sway;
    const swayPitch = 2 * Math.sin((m / 13.7) * 2 * Math.PI + 0.9) * sway;

    // Scroll: seen a little more from above while low on the screen, more
    // level as it rises, so the light slides down the face as you read on.
    const mid = clamp((rect.top + rect.height / 2) / innerHeight - 0.5);
    tilt = dt ? tilt + (mid * 10 - tilt) * (1 - Math.exp(-dt * 8)) : mid * 10;

    // Pointer, eased, on desktop only: the face leans toward it.
    const k = 1 - Math.exp(-dt * 3);
    px += (aimX - px) * k;
    py += (aimY - py) * k;

    // Scroll and pointer join in as the piece arrives.
    const here = 1 - clamp(away, 0, 1);
    s.draw({
      yaw: REST_YAW + (from.yaw - REST_YAW) * away + swayYaw + px * 8 * here,
      pitch: REST_PITCH + (from.pitch - REST_PITCH) * away + swayPitch + (tilt + py * 6) * here,
      scale: 1 + (from.scale - 1) * away,
    });
    const opacity = start < 0 ? "0" : smooth(0, fade, t).toFixed(3);
    if (opacity !== shown) canvas.style.opacity = shown = opacity;
  };

  const run = (on: boolean) => {
    if (on === visible) return;
    visible = on;
    if (on) {
      last = 0;
      raf = requestAnimationFrame(frame);
      if (finePointer) {
        addEventListener("pointermove", onPointer, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
      }
    } else {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    }
  };

  // Render only while the mark (with its overhang) is on screen.
  const io = new IntersectionObserver(([e]) => run(e.isIntersecting), { rootMargin: "60px 0px" });
  io.observe(host);
  const ro = new ResizeObserver(() => s.fit());
  ro.observe(canvas);

  // Motion turned off while the page is open, or the GPU dropped the
  // context: stop, and the flat mark shows again.
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let stopped = false;
  const stop = () => {
    if (stopped) return;
    stopped = true;
    run(false);
    io.disconnect();
    ro.disconnect();
    reduce.removeEventListener("change", onReduce);
    host.classList.remove("live");
    s.dispose();
  };
  const onReduce = () => reduce.matches && stop();
  reduce.addEventListener("change", onReduce);
  canvas.addEventListener("webglcontextlost", stop);
}
