import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, SceneToggles, SceneBtn } from "@/labs/shared/kit";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { Starfield } from "@/components/globe/earth";
import { GenericFallback } from "@/labs/shared/fallback";

/** True radii as fraction of 6371 km. Teaching crust is ×4 continental thickness. */
const TRUE_CRUST_INNER = 1 - 35 / 6371; // ≈ 0.9945
const TEACH_CRUST_INNER = 0.978;

function layersFor(trueScale: boolean) {
  const crustInner = trueScale ? TRUE_CRUST_INNER : TEACH_CRUST_INNER;
  return [
    {
      id: "crust" as const,
      name: "Crust",
      r: 1,
      inner: crustInner,
      note: trueScale
        ? "0–35 km continental crust. A film on a 6371 km radius."
        : "0–35 km continental · drawn ×4 here so the film can be seen.",
    },
    { id: "mantle" as const, name: "Mantle", r: crustInner, inner: 0.547, note: "Solid rock that creeps. Not a magma ocean." },
    { id: "outer" as const, name: "Outer core", r: 0.547, inner: 0.191, note: "Liquid Fe–Ni. S-waves die. The magnetic field lives here." },
    { id: "inner" as const, name: "Inner core", r: 0.191, inner: 0, note: "Solid Fe–Ni under immense pressure." },
  ];
}

function Shell({
  id,
  outer,
  inner,
  plane,
  offset,
}: {
  id: "crust" | "mantle" | "outer" | "inner";
  outer: number;
  inner: number;
  plane: THREE.Plane;
  offset: number;
}) {
  const q = useQuality();
  const slice = useLabControls((s) => s.slice);
  const nrm = useRockNormal();
  const nrmScale = useMemo(() => new THREE.Vector2(0.85, 0.85), []);
  const clip = slice > 0.02 ? [plane] : [];
  const spin = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (id === "outer" && spin.current) spin.current.rotation.y += Math.min(d, 0.1) * 0.12;
  });

  const matProps =
    id === "crust"
      ? { color: PBR.crust.color, roughness: 0.9, metalness: 0.02, normalMap: nrm, normalScale: nrmScale, emissive: "#000000", emissiveIntensity: 0 }
      : id === "mantle"
        ? { color: PBR.mantle.color, roughness: 0.94, metalness: 0.05, normalMap: nrm, normalScale: nrmScale, emissive: "#000000", emissiveIntensity: 0 }
        : id === "outer"
          ? { color: PBR.outerCore.color, roughness: 0.16, metalness: 0.82, emissive: "#a56a28", emissiveIntensity: 0.22 }
          : { color: PBR.innerCore.color, roughness: 0.12, metalness: 0.9, emissive: "#c9a66a", emissiveIntensity: 0.08 };

  return (
    <group ref={spin} position={[-offset, 0, 0]}>
      <mesh>
        <sphereGeometry args={[outer, q.sphere, q.sphere]} />
        <meshStandardMaterial {...matProps} side={THREE.DoubleSide} clippingPlanes={clip} />
      </mesh>
      {inner > 0.02 && (
        <mesh>
          <sphereGeometry args={[inner, q.sphere, q.sphere]} />
          <meshStandardMaterial {...matProps} side={THREE.BackSide} clippingPlanes={clip} />
        </mesh>
      )}
    </group>
  );
}

function Waves() {
  const t = useRef(0);
  const pMat = useMemo(() => new THREE.LineBasicMaterial({ color: 0x7fd4ff }), []);
  const sMat = useMemo(() => new THREE.LineBasicMaterial({ color: 0xe24b4b }), []);
  const pGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(80 * 3), 3));
    return g;
  }, []);
  const sGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(80 * 3), 3));
    return g;
  }, []);
  const pLine = useMemo(() => new THREE.Line(pGeo, pMat), [pGeo, pMat]);
  const sLine = useMemo(() => new THREE.Line(sGeo, sMat), [sGeo, sMat]);
  useFrame((_, raw) => {
    t.current += Math.min(raw, 0.1) * 0.28;
    const u = t.current % 1;
    write(pGeo.attributes.position as THREE.BufferAttribute, u, true);
    write(sGeo.attributes.position as THREE.BufferAttribute, u, false);
    pGeo.attributes.position.needsUpdate = true;
    sGeo.attributes.position.needsUpdate = true;
  });
  return (
    <>
      <primitive object={pLine} />
      <primitive object={sLine} />
    </>
  );
}

function write(attr: THREE.BufferAttribute, u: number, pwave: boolean) {
  const n = attr.count;
  for (let i = 0; i < n; i++) {
    const f = i / (n - 1);
    const ang = f * Math.PI * 0.95 * Math.min(1, u * 1.12);
    const core = ang > 0.92;
    let r = 1.02;
    if (!pwave && core) {
      const tt = Math.min(1, (ang - 0.92) / 0.5);
      attr.setXYZ(i, Math.sin(0.92) * 0.547 * (1 - tt * 0.02), Math.cos(0.92) * 0.547 - tt * 0.28, 0);
      continue;
    }
    if (pwave && core) {
      r = 0.2 + 0.82 * Math.abs(Math.cos((ang - 0.92) * 1.35));
    }
    attr.setXYZ(i, Math.sin(ang) * r, Math.cos(ang) * r, 0);
  }
  attr.needsUpdate = true;
}

function Interior() {
  const explode = useLabControls((s) => s.explode);
  const slice = useLabControls((s) => s.slice);
  const waves = useLabControls((s) => s.params.waves ?? 0);
  const playing = useLabControls((s) => s.playing);
  const trueScale = useLabControls((s) => s.trueScale);
  const layers = layersFor(trueScale);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(1, 0, 0), 0), []);
  plane.constant = (slice - 0.5) * 2.2;
  const offsets = [explode * 0.55, explode * 0.28, explode * 0.12, 0];
  return (
    <>
      <Starfield />
      {layers.map((l, i) => (
        <Shell key={l.id} id={l.id} outer={l.r} inner={l.inner} plane={plane} offset={offsets[i]!} />
      ))}
      {layers.map((l, i) => (
        <Tag
          key={l.id}
          pos={[-(l.r + offsets[i]! + 0.15), 0.95 - i * 0.55, 0.1]}
          text={l.name}
          tone={i === 2 ? "sandstone" : i === 0 ? "moss" : "chalk"}
          occlude={false}
          note={l.note}
        />
      ))}
      {(waves > 0.5 || playing) && <Waves />}
      <Readout pos={[0, -1.55, 0]}>
        <span className="text-ice">P</span> through liquid · <span className="text-fault">S</span> dies at outer core · {trueScale ? "true scale" : "crust ×4"}
      </Readout>
    </>
  );
}

export default function InteriorScene() {
  const setParam = useLabControls((s) => s.setParam);
  const waves = useLabControls((s) => s.params.waves ?? 0);
  return (
    <>
      <LabStudio
        slug="earth-interior"
        title="Earth interior"
        camera={{ position: [2.6, 1.1, 3.5], fov: 40 }}
        exaggeration="Crust drawn ×4 true thickness. Mantle is solid rock, not a magma ocean."
        liveText="Cut Earth. Crust a thin shell. S-waves stop at the liquid outer core."
        fallback={<GenericFallback slug="earth-interior" title="Earth interior" />}
        lights
      >
        <Interior />
      </LabStudio>
      <SceneToggles>
        <SceneBtn active={waves > 0.5} onClick={() => setParam("waves", waves > 0.5 ? 0 : 1)}>
          P / S waves {waves > 0.5 ? "on" : "off"}
        </SceneBtn>
      </SceneToggles>
    </>
  );
}
