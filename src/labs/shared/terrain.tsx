import { useMemo } from "react";
import * as THREE from "three";
import { useRockNormal } from "./materials";

export function heightGeometry(
  fn: (x: number, y: number) => number,
  opts: { width: number; depth: number; segX: number; segZ: number; colorFn?: (h: number) => THREE.Color; vScale?: number },
): THREE.BufferGeometry {
  const g = new THREE.PlaneGeometry(opts.width, opts.depth, opts.segX, opts.segZ);
  const pos = g.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const c = new THREE.Color();
  const v = opts.vScale ?? 1;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const h = fn(x, y) * v;
    pos.setZ(i, h);
    if (opts.colorFn) {
      opts.colorFn(h / Math.max(0.001, v)).toArray(colors, i * 3);
    } else {
      c.set("#7C9A6A");
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
  }
  g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  g.computeVertexNormals();
  return g;
}

export function HeightField({
  fn,
  width,
  depth,
  segX,
  segZ,
  colorFn,
  position = [0, 0, 0],
  receiveShadow = true,
  vScale = 1,
}: {
  fn: (x: number, y: number) => number;
  width: number;
  depth: number;
  segX: number;
  segZ: number;
  colorFn?: (h: number) => THREE.Color;
  position?: [number, number, number];
  receiveShadow?: boolean;
  vScale?: number;
}) {
  const geom = useMemo(
    () => heightGeometry(fn, { width, depth, segX, segZ, colorFn, vScale }),
    [fn, width, depth, segX, segZ, colorFn, vScale],
  );
  const nrm = useRockNormal();
  const nrmScale = useMemo(() => new THREE.Vector2(0.55, 0.55), []);
  return (
    <mesh
      geometry={geom}
      rotation={[-Math.PI / 2, 0, 0]}
      position={position}
      receiveShadow={receiveShadow}
      castShadow
    >
      <meshStandardMaterial
        vertexColors
        roughness={0.86}
        metalness={0.03}
        normalMap={nrm}
        normalScale={nrmScale}
      />
    </mesh>
  );
}

/** Lathe a 2D profile (x=radius, y=height) into a solid of revolution. */
export function latheGeometry(profile: [number, number][], segments: number): THREE.LatheGeometry {
  const pts = profile.map(([x, y]) => new THREE.Vector2(Math.max(0.001, x), y));
  const g = new THREE.LatheGeometry(pts, segments);
  g.computeVertexNormals();
  return g;
}

/**
 * Viscosity 0 = shield (Mauna Loa), 0.5 = strato (Fuji), 1 = steep plug.
 * Crater is always present. Fissure is a separate mesh.
 */
export function volcanoProfile(visc: number): [number, number][] {
  const t = THREE.MathUtils.clamp(visc, 0, 1);
  const rBase = THREE.MathUtils.lerp(2.6, 1.05, t);
  const h = THREE.MathUtils.lerp(0.72, 2.35, t);
  const craterR = THREE.MathUtils.lerp(0.22, 0.18, t);
  const craterD = THREE.MathUtils.lerp(0.06, 0.18, t);
  const shoulder = THREE.MathUtils.lerp(0.55, 0.22, t);
  return [
    [0.001, h - craterD],
    [craterR * 0.4, h - craterD * 0.7],
    [craterR, h],
    [rBase * shoulder, h * 0.55],
    [rBase * 0.82, h * 0.18],
    [rBase, 0.02],
    [rBase * 1.08, 0],
  ];
}

export function useVolcanoGeometry(visc: number, segments: number) {
  return useMemo(() => latheGeometry(volcanoProfile(visc), segments), [visc, segments]);
}

export function tubeGeometry(
  pts: [number, number, number][],
  radius: number,
  tubular = 64,
  radial = 10,
): THREE.TubeGeometry {
  const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)));
  const g = new THREE.TubeGeometry(curve, tubular, radius, radial, false);
  g.computeVertexNormals();
  return g;
}
