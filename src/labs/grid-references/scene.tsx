import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Arrow3, Readout, StepCamera, StudioFloor, Tag } from "@/labs/shared/kit";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const SIZE = 6;
const KM = SIZE / 10;

function gridLines(origin: [number, number], extent: number, n: number, y: number) {
  const pts: THREE.Vector3[] = [];
  const [ox, oz] = origin;
  for (let i = 0; i <= n; i++) {
    const u = ox + (i / n) * extent;
    pts.push(new THREE.Vector3(u, y, oz), new THREE.Vector3(u, y, oz + extent));
    const v = oz + (i / n) * extent;
    pts.push(new THREE.Vector3(ox, y, v), new THREE.Vector3(ox + extent, y, v));
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
}

function House({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <mesh position={[0, 0.055, 0]} castShadow>
        <boxGeometry args={[0.09, 0.07, 0.08, 6, 4, 6]} />
        <meshStandardMaterial color="#d8c4a8" roughness={0.86} metalness={0.04} />
      </mesh>
      <mesh position={[0, 0.11, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[0.078, 0.07, 16]} />
        <meshStandardMaterial color={PBR.granite.color} roughness={0.7} metalness={0.05} />
      </mesh>
    </group>
  );
}

function Tile() {
  useLabTick(1 / 22);
  const t = useLabControls((s) => s.t);
  const playing = useLabControls((s) => s.playing);
  const eParam = useLabControls((s) => s.params.easting ?? 246);
  const nParam = useLabControls((s) => s.params.northing ?? 513);
  const e = Math.round(playing ? t * 999 : eParam);
  const n = Math.round(playing ? ((t * 2.15) % 1) * 999 : nParam);
  const q = useQuality();
  const nrm = useRockNormal();
  const kmE = Math.floor(e / 100);
  const kmN = Math.floor(n / 100);
  const mE = Math.floor((e % 100) / 10);
  const mN = Math.floor((n % 100) / 10);
  const x0 = -SIZE / 2;
  const z0 = SIZE / 2;
  const sqX = x0 + kmE * KM;
  const sqZ = z0 - (kmN + 1) * KM;
  const tileX = sqX + (mE + 0.5) * (KM / 10);
  const tileZ = sqZ + (1 - (mN + 0.5) / 10) * KM;
  const kmGrid = useMemo(() => gridLines([x0, -SIZE / 2], SIZE, 10, 0.018), [x0]);
  const inner = useMemo(() => gridLines([sqX, sqZ], KM, 10, 0.03), [sqX, sqZ]);
  const segs = Math.max(10, Math.floor(q.terrain / 16));
  const land = useMemo(() => {
    const g = new THREE.PlaneGeometry(SIZE, SIZE, segs, segs);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setZ(i, (Math.sin(pos.getX(i) * 0.7) + Math.cos(pos.getY(i) * 0.9)) * 0.04);
    }
    g.computeVertexNormals();
    return g;
  }, [segs]);
  const six = `${String(e).padStart(3, "0")}${String(n).padStart(3, "0")}`;
  const four = `${String(kmE).padStart(2, "0")}${String(kmN).padStart(2, "0")}`;
  return (
    <group rotation={[-0.52, 0.38, 0.04]} position={[0, 0.35, 0]}>
      <mesh geometry={land} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <meshStandardMaterial
          color="#3d4a3a"
          roughness={0.92}
          metalness={0.02}
          normalMap={nrm}
          normalScale={new THREE.Vector2(0.45, 0.45)}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0]} receiveShadow>
        <planeGeometry args={[SIZE, SIZE, q.terrain > 120 ? 20 : 12, q.terrain > 120 ? 20 : 12]} />
        <meshStandardMaterial color="#cfc6b0" roughness={0.9} metalness={0.02} transparent opacity={0.88} />
      </mesh>
      <lineSegments geometry={kmGrid}>
        <lineBasicMaterial color="#2a6b8a" />
      </lineSegments>
      <lineSegments geometry={inner} key={`${kmE}-${kmN}`}>
        <lineBasicMaterial color="#3EE0C6" />
      </lineSegments>
      <mesh position={[sqX + KM / 2, 0.012, sqZ + KM / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[KM * 0.98, KM * 0.98]} />
        <meshStandardMaterial color="#3EE0C6" transparent opacity={0.16} roughness={0.7} />
      </mesh>
      <mesh position={[tileX, 0.028, tileZ]} castShadow>
        <boxGeometry args={[KM / 10, 0.03, KM / 10, 6, 2, 6]} />
        <meshStandardMaterial color="#E8B86D" roughness={0.55} metalness={0.08} emissive="#E8B86D" emissiveIntensity={0.18} />
      </mesh>
      <House pos={[tileX, 0.04, tileZ]} />
      <Arrow3 from={[x0 - 0.15, 0.08, z0 - 0.15]} to={[x0 + 1.6, 0.08, z0 - 0.15]} color="#E8B86D" radius={0.028} />
      <Arrow3 from={[x0 - 0.15, 0.08, z0 - 0.15]} to={[x0 - 0.15, 0.08, z0 - 1.7]} color="#3EE0C6" radius={0.028} />
      <Tag pos={[x0 + 1.5, 0.28, z0 - 0.15]} text="Easting first" tone="sandstone" occlude={false} />
      <Tag pos={[x0 - 0.15, 0.32, z0 - 1.65]} text="Northing second" tone="glacier" occlude={false} />
      <Tag pos={[tileX, 0.28, tileZ]} text="100 m" tone="moss" occlude={false} />
      <Readout pos={[0, 2.15, 0]}>
        Six-figure {six} · 1 km square {four} · the 100 m tile is a square, not a pin · along the corridor, up the stairs
      </Readout>
    </group>
  );
}

function Stage() {
  return (
    <>
      <StudioFloor size={12} />
      <Tile />
      <StepCamera
        positions={[
          [0.2, 5.6, 6.2],
          [-2.4, 3.2, 4.8],
          [2.8, 3.6, 3.4],
          [0.6, 2.4, 3.2],
        ]}
      />
    </>
  );
}

export default function GridReferencesScene() {
  const e = Math.round(useLabControls((s) => s.params.easting ?? 246));
  const n = Math.round(useLabControls((s) => s.params.northing ?? 513));
  const six = `${String(e).padStart(3, "0")}${String(n).padStart(3, "0")}`;
  return (
    <LabStudio
      slug="grid-references"
      title="Grid references"
      camera={{ position: [0.2, 5.6, 6.2], fov: 40 }}
      liveText={`OS six-figure ${six}. Eastings then northings. A six-figure reference is a 100 metre square, not a pin.`}
      fallback={
        <GenericFallback
          slug="grid-references"
          title="Grid references"
          caption="Eastings then northings. Four-figure is 1 km. Six-figure is a 100 m square, not a lamp-post."
        />
      }
      minDistance={2.4}
      maxDistance={14}
      target={[0, 0.2, 0]}
    >
      <Stage />
    </LabStudio>
  );
}
