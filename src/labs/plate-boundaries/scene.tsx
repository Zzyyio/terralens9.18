import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { Atmosphere, EarthMesh, Starfield } from "@/components/globe/earth";
import { latLonToVector3 } from "@/lib/geo";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StepCamera } from "@/labs/shared/kit";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

type Kind = "divergent" | "convergent" | "transform";

const KIND: Record<Kind, { color: string; dash: boolean; label: string; style: string }> = {
  divergent: { color: "#3EE0C6", dash: false, label: "Divergent", style: "solid · ridge / rift" },
  convergent: { color: "#FF6A3D", dash: false, label: "Convergent", style: "teeth · trench / collision" },
  transform: { color: "#E8B86D", dash: true, label: "Transform", style: "dashed · slide past" },
};

const BOUNDARIES: { kind: Kind; pts: [number, number][] }[] = [
  { kind: "divergent", pts: [[66, -18], [54, -30], [40, -30], [20, -40], [0, -28], [-20, -24], [-40, -28], [-54, -30]] },
  { kind: "divergent", pts: [[10, -105], [0, -102], [-15, -110], [-30, -112], [-50, -90]] },
  { kind: "divergent", pts: [[12, 38], [3, 36], [-3, 36], [-10, 34], [-18, 32]] },
  { kind: "convergent", pts: [[8, -80], [-5, -78], [-18, -72], [-32, -74], [-45, -76], [-55, -72]] },
  { kind: "convergent", pts: [[50, -130], [46, -126], [42, -125], [38, -123]] },
  { kind: "convergent", pts: [[55, 164], [50, 155], [42, 144], [35, 141], [24, 143], [12, 145]] },
  { kind: "convergent", pts: [[28, 86], [30, 81], [34, 76], [36, 72]] },
  { kind: "convergent", pts: [[22, 92], [10, 96], [-5, 102], [-10, 110], [-8, 118]] },
  { kind: "convergent", pts: [[-15, -175], [-22, -175], [-32, 180], [-38, 175]] },
  { kind: "transform", pts: [[40.5, -124.5], [37.7, -122.4], [35.5, -121], [34.5, -119.8], [32.7, -117]] },
  { kind: "transform", pts: [[41, 28], [40.5, 32], [40, 36], [39.2, 40]] },
  { kind: "transform", pts: [[-42, 172], [-43.5, 170], [-45, 168]] },
];

const HAWAII: { ll: [number, number]; age: number; name: string }[] = [
  { ll: [19.5, -155.5], age: 0, name: "Hawaiʻi" },
  { ll: [20.9, -156.6], age: 1.3, name: "Maui" },
  { ll: [21.5, -158], age: 3, name: "Oʻahu" },
  { ll: [22.1, -159.5], age: 5, name: "Kauaʻi" },
  { ll: [28.2, -177.4], age: 28, name: "Midway" },
  { ll: [32, 172], age: 47, name: "bend" },
  { ll: [45, 170], age: 60, name: "Emperor" },
  { ll: [51, 168], age: 76, name: "Detroit" },
];

const SITES: { id: string; name: string; kind: Kind; lat: number; lon: number; note: string }[] = [
  { id: "iceland", name: "Iceland", kind: "divergent", lat: 64.8, lon: -18, note: "Mid-Atlantic Ridge on land · new crust" },
  { id: "himalaya", name: "Himalaya", kind: "convergent", lat: 28.6, lon: 84, note: "India stacked on Eurasia · collision" },
  { id: "sanandreas", name: "San Andreas", kind: "transform", lat: 36.4, lon: -121.2, note: "Pacific vs N America · slide, few volcanoes" },
  { id: "cascadia", name: "Cascadia", kind: "convergent", lat: 45.2, lon: -125.2, note: "Juan de Fuca diving under N America" },
];

const ARROWS: { lat: number; lon: number; dlat: number; dlon: number; kind: Kind }[] = [
  { lat: 8, lon: -38, dlat: 1, dlon: 14, kind: "divergent" },
  { lat: 8, lon: -12, dlat: 1, dlon: -12, kind: "divergent" },
  { lat: 16, lon: 78, dlat: 14, dlon: 2, kind: "convergent" },
  { lat: 36, lon: -123.5, dlat: 4, dlon: -3.5, kind: "transform" },
  { lat: 44, lon: -128.5, dlat: 0, dlon: 6, kind: "convergent" },
  { lat: -12, lon: -78, dlat: 0, dlon: 8, kind: "convergent" },
];

const INDIA_NOW: [number, number][] = [
  [8, 77], [15, 74], [23, 70], [28, 76], [26, 88], [22, 88], [12, 80],
];
const INDIA_THEN: [number, number][] = [
  [-38, 48], [-30, 44], [-22, 42], [-18, 50], [-22, 60], [-30, 58], [-38, 54],
];

function ll3(lat: number, lon: number, r: number): [number, number, number] {
  const v = latLonToVector3(lat, lon, r);
  return [v.x, v.y, v.z];
}

function lerpLL(a: [number, number], b: [number, number], k: number): [number, number] {
  return [a[0] * (1 - k) + b[0] * k, a[1] * (1 - k) + b[1] * k];
}

function sphericalPatch(pts: [number, number][], r: number) {
  const verts = pts.map(([lat, lon]) => latLonToVector3(lat, lon, r));
  const c = verts.reduce((acc, v) => acc.add(v), new THREE.Vector3()).normalize().multiplyScalar(r);
  const g = new THREE.BufferGeometry();
  const pos: number[] = [];
  const nrm: number[] = [];
  for (let i = 0; i < verts.length; i++) {
    const b = verts[i]!;
    const d = verts[(i + 1) % verts.length]!;
    pos.push(c.x, c.y, c.z, b.x, b.y, b.z, d.x, d.y, d.z);
    nrm.push(c.x, c.y, c.z, b.x, b.y, b.z, d.x, d.y, d.z);
  }
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(nrm, 3));
  return g;
}

function Arrow({ lat, lon, dlat, dlon, color }: { lat: number; lon: number; dlat: number; dlon: number; color: string }) {
  const { pos, quat } = useMemo(() => {
    const a = latLonToVector3(lat, lon, 1.045);
    const b = latLonToVector3(lat + dlat, lon + dlon, 1.045);
    const radial = a.clone().normalize();
    const y = b.clone().sub(a).normalize();
    const x = radial.clone().cross(y).normalize();
    const z = x.clone().cross(y).normalize();
    const m = new THREE.Matrix4().makeBasis(x, y, z);
    return { pos: a, quat: new THREE.Quaternion().setFromRotationMatrix(m) };
  }, [lat, lon, dlat, dlon]);
  return (
    <group position={pos} quaternion={quat}>
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.007, 0.007, 0.08, 12]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <coneGeometry args={[0.016, 0.046, 16]} />
        <meshStandardMaterial color={color} roughness={0.32} metalness={0.15} />
      </mesh>
    </group>
  );
}

function Teeth({ pts, color }: { pts: [number, number][]; color: string }) {
  const items = useMemo(() => {
    const out: { pos: THREE.Vector3; quat: THREE.Quaternion }[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = latLonToVector3(pts[i]![0], pts[i]![1], 1.028);
      const b = latLonToVector3(pts[i + 1]![0], pts[i + 1]![1], 1.028);
      const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(1.028);
      const along = b.clone().sub(a).normalize();
      const radial = mid.clone().normalize();
      const y = new THREE.Vector3().crossVectors(radial, along).normalize();
      const x = along;
      const z = new THREE.Vector3().crossVectors(x, y).normalize();
      out.push({ pos: mid, quat: new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(x, y, z)) });
    }
    return out;
  }, [pts]);
  return (
    <>
      {items.map((it, i) => (
        <mesh key={i} position={it.pos} quaternion={it.quat}>
          <coneGeometry args={[0.014, 0.042, 16]} />
          <meshStandardMaterial color={color} roughness={0.4} metalness={0.08} />
        </mesh>
      ))}
    </>
  );
}

function Boundary({ kind, pts }: { kind: Kind; pts: [number, number][] }) {
  const spec = KIND[kind];
  const points = useMemo(() => pts.map(([lat, lon]) => latLonToVector3(lat, lon, 1.018)), [pts]);
  return (
    <>
      <Line
        points={points}
        color={spec.color}
        lineWidth={kind === "divergent" ? 2.2 : 1.8}
        dashed={spec.dash}
        dashSize={0.045}
        gapSize={0.028}
      />
      {kind === "convergent" && <Teeth pts={pts} color={spec.color} />}
    </>
  );
}

function SitePin({
  site,
  selected,
  onPick,
}: {
  site: (typeof SITES)[number];
  selected: boolean;
  onPick: () => void;
}) {
  const q = useQuality();
  const p = useMemo(() => latLonToVector3(site.lat, site.lon, 1.04), [site.lat, site.lon]);
  const color = KIND[site.kind].color;
  return (
    <group position={p}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onPick();
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[selected ? 0.038 : 0.026, q.sphere, q.sphere]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={selected ? 0.85 : 0.35}
          roughness={0.3}
        />
      </mesh>
      {selected && (
        <mesh>
          <ringGeometry args={[0.045, 0.06, 28]} />
          <meshBasicMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

function GlobeRig({ lat, lon, children }: { lat: number | null; lon: number | null; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const qTo = useMemo(() => new THREE.Quaternion(), []);
  const toward = useMemo(() => new THREE.Vector3(0, 0.14, 1).normalize(), []);
  const site = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    if (!ref.current) return;
    if (lat == null || lon == null) qTo.identity();
    else {
      const v = latLonToVector3(lat, lon, 1);
      site.copy(v).normalize();
      qTo.setFromUnitVectors(site, toward);
    }
    ref.current.quaternion.slerp(qTo, 0.055);
  });
  return <group ref={ref}>{children}</group>;
}

function Model() {
  const age = useLabControls((s) => s.params.ageMa ?? 0);
  const hotspot = (useLabControls((s) => s.params.hotspot) ?? 0) > 0.5;
  const q = useQuality();
  const [picked, setPicked] = useState<string | null>(null);
  const sun = useMemo(() => new THREE.Vector3(3.2, 0.45, 2.1), []);
  const k = Math.min(1, age / 200);
  const site = SITES.find((s) => s.id === picked) ?? null;
  const indiaPts = useMemo(
    () => INDIA_NOW.map((p, i) => lerpLL(p, INDIA_THEN[i]!, k)),
    [k],
  );
  const indiaGeom = useMemo(() => sphericalPatch(indiaPts, 1.012), [indiaPts]);
  const indiaOutline = useMemo(() => indiaPts.map(([lat, lon]) => latLonToVector3(lat, lon, 1.016)), [indiaPts]);

  return (
    <>
      <Starfield />
      <GlobeRig lat={site?.lat ?? null} lon={site?.lon ?? null}>
        <EarthMesh sunDirection={sun} />
        <Atmosphere />
        {BOUNDARIES.map((b, i) => (
          <Boundary key={i} kind={b.kind} pts={b.pts} />
        ))}
        {ARROWS.map((a, i) => (
          <Arrow key={i} lat={a.lat} lon={a.lon} dlat={a.dlat} dlon={a.dlon} color={KIND[a.kind].color} />
        ))}
        {SITES.map((s) => (
          <SitePin key={s.id} site={s} selected={picked === s.id} onPick={() => setPicked(picked === s.id ? null : s.id)} />
        ))}
        {k > 0.04 && (
          <>
            <mesh geometry={indiaGeom}>
              <meshStandardMaterial
                color="#FF6A3D"
                transparent
                opacity={0.15 + k * 0.45}
                roughness={0.7}
                side={THREE.DoubleSide}
              />
            </mesh>
            <Line points={indiaOutline} color="#FF6A3D" lineWidth={1.4} dashed dashSize={0.03} gapSize={0.02} />
          </>
        )}
        {hotspot &&
          HAWAII.map((h, i) => {
            const p = latLonToVector3(h.ll[0], h.ll[1], 1.032);
            return (
              <mesh key={h.name} position={p}>
                <sphereGeometry args={[i === 0 ? 0.028 : 0.014, q.sphere, q.sphere]} />
                <meshStandardMaterial
                  color={i === 0 ? "#FF6A3D" : "#E8B86D"}
                  emissive={i === 0 ? "#FF6A3D" : "#000"}
                  emissiveIntensity={i === 0 ? 0.55 : 0}
                  roughness={0.4}
                />
              </mesh>
            );
          })}
        {hotspot && (
          <Line
            points={HAWAII.map((h) => latLonToVector3(h.ll[0], h.ll[1], 1.03))}
            color="#E8B86D"
            lineWidth={1.1}
            dashed
            dashSize={0.03}
            gapSize={0.02}
          />
        )}
        {SITES.map((s) => (
          <Tag
            key={`t-${s.id}`}
            pos={ll3(s.lat, s.lon, 1.2)}
            text={s.name}
            tone={s.kind === "divergent" ? "glacier" : s.kind === "convergent" ? "magma" : "sandstone"}
            occlude={false}
            note={s.note}
          />
        ))}
        {hotspot && (
          <Tag pos={ll3(20, -155, 1.22)} text="Hawaii chain · older NW" tone="magma" occlude={false} note="Hotspot stays. The plate moves. Islands age northwest. Not a subduction arc." />
        )}
        {k > 0.15 && (
          <Tag pos={ll3(indiaPts[3]![0], indiaPts[3]![1], 1.18)} text="India walks north" tone="magma" occlude={false} note="Continent–continent convergence. The Himalaya are the crumple, not a volcanic arc." />
        )}
      </GlobeRig>
      <group position={[2.05, 0.55, 0.4]}>
        <Line points={[new THREE.Vector3(0, 0.42, 0), new THREE.Vector3(0.42, 0.42, 0)]} color="#3EE0C6" lineWidth={2} />
        <Tag pos={[0.72, 0.42, 0]} text="Divergent · solid" tone="glacier" occlude={false} note="Plates pull apart. Ridge or rift. New crust." />
        <Line points={[new THREE.Vector3(0, 0.18, 0), new THREE.Vector3(0.42, 0.18, 0)]} color="#FF6A3D" lineWidth={2} />
        <Tag pos={[0.78, 0.18, 0]} text="Convergent · teeth" tone="magma" occlude={false} note="Plates meet. Trench, island arc, or collision mountains." />
        <Line
          points={[new THREE.Vector3(0, -0.06, 0), new THREE.Vector3(0.42, -0.06, 0)]}
          color="#E8B86D"
          lineWidth={2}
          dashed
          dashSize={0.05}
          gapSize={0.03}
        />
        <Tag pos={[0.78, -0.06, 0]} text="Transform · dashed" tone="sandstone" occlude={false} note="Plates slide past. San Andreas is this, not a volcanic arc." />
      </group>
      <Readout pos={[0, -1.55, 0]}>
        {site ? `${site.name} · ${site.note}` : age < 2 ? "Present day · click Iceland / Himalaya / San Andreas / Cascadia" : `Pangaea reconstruction · ${age.toFixed(0)} Ma · Atlantic not yet open`}
      </Readout>
      <StepCamera positions={[[0, 0.45, 3.2], [0.2, 0.7, 2.7], [0, 0.35, 3.4], [0, 0.45, 3.2]]} />
    </>
  );
}

export default function PlatesScene() {
  const age = useLabControls((s) => s.params.ageMa ?? 0);
  const hotspot = (useLabControls((s) => s.params.hotspot) ?? 0) > 0.5;
  const live =
    age > 8
      ? `Plate boundaries at ${age.toFixed(0)} Ma. Pangaea still packing; India has not yet hit Asia.`
      : hotspot
        ? "Hawaii hotspot chain: the plume stays, the Pacific plate slides northwest."
        : "Three boundary types: solid divergent, teeth convergent, dashed transform.";
  return (
    <LabStudio
      slug="plate-boundaries"
      title="Plate boundaries"
      camera={{ position: [0, 0.45, 3.2], fov: 40 }}
      liveText={live}
      fallback={<GenericFallback slug="plate-boundaries" title="Plate boundaries" caption={live} />}
      minDistance={2.1}
      maxDistance={6}
      target={[0, 0, 0]}
    >
      <Model />
    </LabStudio>
  );
}
