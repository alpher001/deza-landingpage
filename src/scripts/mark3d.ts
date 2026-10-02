// The 3D gold Deza mark (see Mark3D.astro). Named imports keep the bundle to
// the parts of three.js this uses.
import {
  ACESFilmicToneMapping,
  DirectionalLight,
  ExtrudeGeometry,
  Mesh,
  MeshPhysicalMaterial,
  PMREMGenerator,
  PerspectiveCamera,
  SRGBColorSpace,
  Scene,
  WebGLRenderer,
} from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export function mount(host: HTMLElement) {

  const [, , vw, vh] = host.dataset.view!.split(" ").map(Number);
  const data = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${host.dataset.view}"><path d="${host.dataset.d}" fill-rule="evenodd"/></svg>`);
  const shapes = data.paths.flatMap((p) => SVGLoader.createShapes(p));
  const geo = new ExtrudeGeometry(shapes, {
    depth: 26,
    bevelEnabled: true,
    bevelThickness: 5,
    bevelSize: 3,
    bevelSegments: 6,
    curveSegments: 24,
  });
  geo.center();
  geo.scale(1, -1, 1); // SVG y points down
  geo.computeVertexNormals();

  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.outputColorSpace = SRGBColorSpace;
  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const gold = new MeshPhysicalMaterial({
    color: 0xffc629,
    metalness: 1,
    roughness: 0.26,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2,
  });
  const mesh = new Mesh(geo, gold);
  mesh.scale.setScalar(1 / Math.max(vw, vh));
  scene.add(mesh);
  const key = new DirectionalLight(0xffffff, 2.2);
  key.position.set(2, 3, 4);
  scene.add(key);

  const camera = new PerspectiveCamera(30, 1, 0.1, 10);
  camera.position.set(0, 0, 2.3);

  const canvas = renderer.domElement;
  host.append(canvas);
  const fit = () => {
    const r = host.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
  };
  fit();
  addEventListener("resize", fit);

  let tx = 0;
  let ty = 0;
  addEventListener(
    "pointermove",
    (ev) => {
      tx = (ev.clientX / innerWidth - 0.5) * 0.5;
      ty = (ev.clientY / innerHeight - 0.5) * 0.35;
    },
    { passive: true },
  );

  let on = true;
  new IntersectionObserver(([x]) => (on = x.isIntersecting)).observe(host);
  const t0 = performance.now();
  const loop = (now: number) => {
    requestAnimationFrame(loop);
    if (!on) return;
    const r = host.getBoundingClientRect();
    // One half turn while it crosses the screen, plus a slow sway.
    const scroll = 1 - (r.top + r.height / 2) / innerHeight;
    const sway = Math.sin((now - t0) / 1600) * 0.12;
    mesh.rotation.y += (scroll * Math.PI - 0.6 + sway + tx - mesh.rotation.y) * 0.08;
    mesh.rotation.x += (ty - mesh.rotation.x) * 0.08;
    renderer.render(scene, camera);
  };
  requestAnimationFrame(loop);
}
