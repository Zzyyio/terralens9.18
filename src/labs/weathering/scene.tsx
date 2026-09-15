import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { tubeGeometry } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

function FrostBlock({ t }: { t: number }) {
  const q = useQuality();
  const nrm = useRockNormal();
  const gap = t * 0.16;
  const segs = Math.max(12, Math.floor(q.sphere / 6));
  const nrmScale = useMemo(() => new THREE.Vector2(0.8, 0.8), []);
  return (
    <group position={[-2.45, 0.55, 0]}>
      <mesh position={[-0.32 - gap / 2, 0, 0]} castShadow>
        <boxGeometry args={[0.62, 1.15, 1.15, segs, segs, segs]} />
        <meshStandardMaterial
          color={PBR.granite.color}
          roughness={PBR.granite.roughness}
          metalness={PBR.granite.metalness}
          normalMap={nrm}
          normalScale={nrmScale}
        />
      </mesh>
      <mesh position={[0.32 + gap / 2, 0, 0]} castShadow>
        <boxGeometry args={[0.62, 1.15, 1.15, segs, segs, segs]} />
        <meshStandardMaterial
          color={PBR.granite.color}
          roughness={PBR.granite.roughness}
          metalness={PBR.granite.metalness}
          normalMap={nrm}
          normalScale={nrmScale}
        />
      </mesh>
      <mesh position={[0, 0.08, 0]} scale={[1, 0.3 + t * 0.85, 0.92]}>
        <boxGeometry args={[0.08 + gap, 1.05, 1.05]} />
        <meshStandardMaterial
          color={PBR.ice.color}
          roughness={PBR.ice.roughness}
          metalness={PBR.ice.metalness}
          transparent
          opacity={0.55 + t * 0.25}
        />
      </mesh>
      <Tag pos={[0, 0.95, 0]} text="Physical" tone="ice" occlude={false} />
    </group>
  );
}

function KarstBlock({ t }: { t: number }) {
  const q = useQuality();
  const tRef = useRef(t);
  tRef.current = t;
  const geom = useMemo(
    () => new THREE.PlaneGeometry(1.25, 1.25, Math.max(24, q.terrain / 6), Math.max(24, q.terrain / 6)),
    [q.terrain],
  );
  const orig = useMemo(() => Float32Array.from(geom.attributes.position.array as Float32Array), [geom]);
  useFrame(() => {
    const pos = geom.attributes.position;
    const u = tRef.current;
    for (let i = 0; i < pos.count; i++) {
      const x = orig[i * 3]!;
      const y = orig[i * 3 + 1]!;
      const pits = Math.sin(x * 9.4) * Math.sin(y * 8.2);
      const hole = pits > 0.42 ? (pits - 0.42) * u * 1.05 : 0;
      pos.setZ(i, orig[i * 3 + 2]! - hole - u * 0.05 * Math.abs(pits));
    }
    pos.needsUpdate = true;
    geom.computeVertexNormals();
  });
  const segs = Math.max(12, Math.floor(q.sphere / 6));
  return (
    <group position={[0, 0.55, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.25, 1.1, 1.25, segs, 4, segs]} />
        <meshStandardMaterial
          color={PBR.limestone.color}
          roughness={PBR.limestone.roughness}
          metalness={PBR.limestone.metalness}
        />
      </mesh>
      <mesh geometry={geom} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.56, 0]}>
        <meshStandardMaterial
          color={PBR.limestone.color}
          roughness={0.62}
          metalness={0.04}
        />
      </mesh>
      <Tag pos={[0, 1.05, 0]} text="Chemical" tone="sandstone" occlude={false} />
    </group>
  );
}

function RootBlock({ t }: { t: number }) {
  const q = useQuality();
  const nrm = useRockNormal();
  const gap = t * 0.1;
  const segs = Math.max(12, Math.floor(q.sphere / 6));
  const root = useMemo(() => {
    const len = 0.18 + t * 0.82;
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 18; i++) {
      const u = i / 18;
      pts.push([Math.sin(u * 7) * 0.045, 0.72 - u * len, Math.cos(u * 5.5) * 0.03]);
    }
    return tubeGeometry(pts, 0.032, 28, 12);
  }, [t]);
  return (
    <group position={[2.45, 0.55, 0]}>
      <mesh position={[-0.3 - gap / 2, 0, 0]} castShadow>
        <boxGeometry args={[0.58, 1.12, 1.12, segs, segs, segs]} />
        <meshStandardMaterial
          color={PBR.crust.color}
          roughness={0.9}
          metalness={0.03}
          normalMap={nrm}
          normalScale={new THREE.Vector2(0.55, 0.55)}
        />
      </mesh>
      <mesh position={[0.3 + gap / 2, 0, 0]} castShadow>
        <boxGeometry args={[0.58, 1.12, 1.12, segs, segs, segs]} />
        <meshStandardMaterial color={PBR.crust.color} roughness={0.9} metalness={0.03} />
      </mesh>
      <mesh geometry={root}>
        <meshStandardMaterial color="#5a4030" roughness={0.88} metalness={0.02} />
      </mesh>
      <mesh position={[0.02, 0.85, 0]}>
        <sphereGeometry args={[0.16, 16, 14]} />
        <meshStandardMaterial color="#3a5a32" roughness={0.9} />
      </mesh>
      <Tag pos={[0, 1.25, 0]} text="Biological" tone="moss" occlude={false} />
    </group>
  );
}

function Model() {
  useLabTick(1 / 8);
  const t = useLabControls((s) => s.t);
  return (
    <group>
      <StudioFloor size={12} />
      <FrostBlock t={t} />
      <KarstBlock t={t} />
      <RootBlock t={t} />
      <Readout pos={[0, 2.25, 0]}>Three mechanisms side by side — not a ranking</Readout>
      <StepCamera positions={[[0, 2.15, 7.0], [-2.45, 1.35, 3.8], [0, 1.4, 3.8], [2.45, 1.55, 3.9]]} />
    </group>
  );
}

export default function WeatheringScene() {
  return (
    <LabStudio
      slug="weathering"
      title="Weathering"
      camera={{ position: [0, 2.15, 7], fov: 40 }}
      liveText="Physical frost wedging, chemical karst pitting, biological root in a joint. Play advances all three."
      fallback={<GenericFallback slug="weathering" title="Weathering" caption="Frost, carbonation, roots — three agents, not a ranking." />}
      minDistance={2.6}
      maxDistance={14}
      target={[0, 0.55, 0]}
    >
      <Model />
    </LabStudio>
  );
}
