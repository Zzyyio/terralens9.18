import { useMemo } from "react";
import * as THREE from "three";
import { Atmosphere, EarthMesh, Graticule, Starfield } from "@/components/globe/earth";
import { latLonToVector3 } from "@/lib/geo";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Readout, StepCamera, StudioFloor, Tag } from "@/labs/shared/kit";
import { PBR } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const SUN = new THREE.Vector3(3, 0.5, 1.8);

function ll(lat: number, lon: number, r: number): [number, number, number] {
  const v = latLonToVector3(lat, lon, r);
  return [v.x, v.y, v.z];
}

function modeOf(proj: number | undefined, morph: number | undefined, step: number) {
  if (proj !== undefined && !Number.isNaN(proj)) return THREE.MathUtils.clamp(Math.round(proj), 0, 2);
  if (morph !== undefined && morph > 0.04) return morph < 0.38 ? 0 : morph < 0.7 ? 1 : 2;
  return THREE.MathUtils.clamp(step, 0, 2);
}

function extrude(pts: [number, number][], depth: number) {
  const s = new THREE.Shape();
  s.moveTo(pts[0]![0], pts[0]![1]);
  for (let i = 1; i < pts.length; i++) s.lineTo(pts[i]![0], pts[i]![1]);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false });
  g.computeVertexNormals();
  return g;
}

const AFRICA: [number, number][] = [
  [0.02, 0.72], [0.28, 0.55], [0.38, 0.18], [0.32, -0.22], [0.18, -0.62],
  [0.02, -0.7], [-0.18, -0.48], [-0.28, -0.08], [-0.22, 0.32], [-0.08, 0.62],
];
const GREENLAND_MERC: [number, number][] = [
  [-1.35, 1.15], [-0.15, 1.05], [0.05, 1.85], [-0.45, 2.35], [-1.45, 2.15], [-1.55, 1.45],
];

function Land({
  pts,
  color,
  depth,
  position,
  rotation,
  scale = 1,
}: {
  pts: [number, number][];
  color: string;
  depth: number;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const geom = useMemo(() => extrude(pts, depth), [pts, depth]);
  return (
    <mesh geometry={geom} position={position} rotation={rotation} scale={scale} castShadow>
      <meshStandardMaterial color={color} roughness={0.82} metalness={0.04} />
    </mesh>
  );
}

function GlobeView() {
  return (
    <group>
      <Starfield />
      <EarthMesh sunDirection={SUN} />
      <Atmosphere />
      <Graticule radius={1.012} />
      <mesh position={ll(8, 22, 1.04)}>
        <sphereGeometry args={[0.16, 24, 20]} />
        <meshStandardMaterial color={PBR.crust.color} roughness={0.88} metalness={0.03} transparent opacity={0.55} />
      </mesh>
      <mesh position={ll(72, -42, 1.03)}>
        <sphereGeometry args={[0.055, 20, 16]} />
        <meshStandardMaterial color={PBR.ice.color} roughness={0.28} metalness={0.04} transparent opacity={0.7} />
      </mesh>
      <Tag pos={ll(8, 22, 1.28)} text="Africa" tone="moss" occlude={false} />
      <Tag pos={ll(72, -42, 1.22)} text="Greenland" tone="ice" occlude={false} />
    </group>
  );
}

function Gores() {
  const q = useQuality();
  const strips = useMemo(() => {
    const out: THREE.BufferGeometry[] = [];
    const segs = Math.max(24, Math.floor(q.terrain / 6));
    for (let i = 0; i < 8; i++) {
      const g = new THREE.PlaneGeometry(0.82, 2.55, 4, segs);
      const pos = g.attributes.position;
      const col = new Float32Array(pos.count * 3);
      const lon0 = -180 + i * 45 + 22.5;
      for (let v = 0; v < pos.count; v++) {
        const y = pos.getY(v);
        const lat = (y / 1.275) * 90;
        const half = Math.max(0.08, Math.cos(THREE.MathUtils.degToRad(lat)) * 0.4);
        pos.setX(v, pos.getX(v) * 2 * half);
        pos.setZ(v, (1 - Math.abs(y) / 1.28) * 0.08);
        const lon = lon0 + pos.getX(v) * 40;
        const africa = lon > -10 && lon < 50 && lat > -35 && lat < 35;
        const green = lon > -60 && lon < -15 && lat > 58;
        const c = new THREE.Color(africa ? PBR.crust.color : green ? PBR.ice.color : PBR.water.color);
        col[v * 3] = c.r;
        col[v * 3 + 1] = c.g;
        col[v * 3 + 2] = c.b;
      }
      g.setAttribute("color", new THREE.BufferAttribute(col, 3));
      g.computeVertexNormals();
      out.push(g);
    }
    return out;
  }, [q.terrain]);
  return (
    <group position={[0, 0.2, 0]} rotation={[-0.18, 0, 0]}>
      {strips.map((g, i) => (
        <mesh key={i} geometry={g} position={[(i - 3.5) * 0.92, 0, 0]} castShadow>
          <meshStandardMaterial vertexColors roughness={0.78} metalness={0.04} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <Tag pos={[(4 / 8 - 3.5) * 0.92, 0.15, 0.2]} text="Africa" tone="moss" occlude={false} />
      <Tag pos={[(-42 + 180) / 45 * 0.92 - 3.5 * 0.92, 1.05, 0.2]} text="Greenland" tone="ice" occlude={false} />
    </group>
  );
}

function Mercator() {
  const q = useQuality();
  const grid = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let lon = -180; lon <= 180; lon += 30) {
      const x = (lon / 180) * 3.4;
      pts.push(new THREE.Vector3(x, 0.02, -2.2), new THREE.Vector3(x, 0.02, 2.4));
    }
    for (let lat = -75; lat <= 80; lat += 15) {
      const z = Math.log(Math.tan(Math.PI / 4 + THREE.MathUtils.degToRad(THREE.MathUtils.clamp(lat, -85, 85)) / 2));
      const zz = (z / 2.4) * 1.35;
      pts.push(new THREE.Vector3(-3.4, 0.02, zz), new THREE.Vector3(3.4, 0.02, zz));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);
  const segs = Math.max(12, Math.floor(q.terrain / 12));
  return (
    <group rotation={[-0.42, 0.2, 0]} position={[0, 0.15, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[7.2, 5.2, segs, segs]} />
        <meshStandardMaterial color={PBR.water.color} roughness={0.28} metalness={0.08} />
      </mesh>
      <lineSegments geometry={grid}>
        <lineBasicMaterial color="#8B9A97" transparent opacity={0.45} />
      </lineSegments>
      <Land pts={AFRICA} color={PBR.crust.color} depth={0.05} position={[0.55, 0.03, 0.05]} rotation={[-Math.PI / 2, 0, 0]} scale={1.15} />
      <Land pts={GREENLAND_MERC} color={PBR.ice.color} depth={0.05} position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <Tag pos={[0.7, 0.35, 0.1]} text="Africa" tone="moss" occlude={false} />
      <Tag pos={[-0.7, 0.55, -1.7]} text="Greenland" tone="ice" occlude={false} />
    </group>
  );
}

function Stage() {
  const step = useLabControls((s) => s.step);
  const proj = useLabControls((s) => s.params.proj);
  const morph = useLabControls((s) => s.params.morph);
  const mode = modeOf(proj, morph, step);
  const label = mode === 0 ? "Globe · no projection" : mode === 1 ? "Orange-peel gores · tears at the cuts" : "Mercator-like flatten · Greenland balloons";
  return (
    <>
      {mode !== 0 && <StudioFloor size={14} />}
      {mode === 0 && <GlobeView />}
      {mode === 1 && <Gores />}
      {mode === 2 && <Mercator />}
      <Readout pos={[0, mode === 0 ? 1.55 : 2.35, 0]}>
        {label} · every flat map lies somewhere · Greenland vs Africa is the giveaway
      </Readout>
      <StepCamera
        positions={[
          [0, 0.4, 3.4],
          [0, 2.1, 6.4],
          [0, 4.2, 6.8],
          [3.2, 2.4, 5.2],
        ]}
      />
    </>
  );
}

export default function MapProjectionsScene() {
  const step = useLabControls((s) => s.step);
  const mode = modeOf(useLabControls((s) => s.params.proj), useLabControls((s) => s.params.morph), step);
  const names = ["globe", "gores", "Mercator"];
  return (
    <LabStudio
      slug="map-projections"
      title="Map projections"
      camera={{ position: [0, 0.4, 3.4], fov: 42 }}
      liveText={`Projection view: ${names[mode]}. Peel an orange and the skin tears. Greenland is the size lie.`}
      fallback={
        <GenericFallback
          slug="map-projections"
          title="Map projections"
          caption="Globe, orange-peel gores, then Mercator. Greenland is not the size of Africa."
        />
      }
      minDistance={2}
      maxDistance={12}
    >
      <Stage />
    </LabStudio>
  );
}
