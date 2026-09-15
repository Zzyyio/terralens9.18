import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera, Arrow3 } from "@/labs/shared/kit";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";
import { CurveFlow } from "@/labs/shared/particles";

function Store({
  pos,
  size,
  color,
  box,
  roughness = 0.7,
  metalness = 0.04,
  normalMap,
}: {
  pos: [number, number, number];
  size: number;
  color: string;
  box?: boolean;
  roughness?: number;
  metalness?: number;
  normalMap?: THREE.Texture;
}) {
  const q = useQuality();
  const segs = Math.max(16, Math.floor(q.sphere / 2));
  return (
    <mesh position={pos} castShadow>
      {box ? (
        <dodecahedronGeometry args={[size * 0.72, 0]} />
      ) : (
        <sphereGeometry args={[size * 0.62, segs, segs]} />
      )}
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} normalMap={normalMap} />
    </mesh>
  );
}

function Model() {
  useLabTick(1 / 10);
  const t = useLabControls((s) => s.t);
  const tap = useLabControls((s) => s.params.fossil ?? t);
  const q = useQuality();
  const rock = useRockNormal();
  const atmo = 0.72 + tap * 0.38;
  const fossil = Math.max(0.28, 0.55 - tap * 0.22);
  const thick = 0.07 + tap * 0.06;
  const tapPath = useMemo(
    () => [new THREE.Vector3(0.12, 0.38, -0.2), new THREE.Vector3(0.06, 1.05, -0.05), new THREE.Vector3(0, 1.72, 0)],
    [],
  );
  const fastPath = useMemo(
    () => [new THREE.Vector3(-1.85, 0.9, 0.22), new THREE.Vector3(-0.9, 1.4, 0.1), new THREE.Vector3(0, 1.72, 0)],
    [],
  );

  return (
    <group>
      <StudioFloor size={12} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[7, q.lathe]} />
        <meshStandardMaterial color="#121814" roughness={0.96} normalMap={rock} />
      </mesh>
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[atmo * 0.72 + 0.18, Math.floor(q.sphere / 2), Math.floor(q.sphere / 3)]} />
        <meshStandardMaterial
          color="#7FD4FF"
          transparent
          opacity={0.08}
          roughness={0.2}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <Store pos={[0, 1.85, 0]} size={atmo} color="#7FD4FF" roughness={0.22} metalness={0.04} />
      <Store pos={[-1.85, 0.55, 0.25]} size={0.7} color={PBR.crust.color} roughness={PBR.crust.roughness} />
      <Store
        pos={[1.95, 0.42, 0.2]}
        size={1.05}
        color={PBR.water.color}
        roughness={PBR.water.roughness}
        metalness={PBR.water.metalness}
      />
      <Store
        pos={[0.1, -0.42, -0.35]}
        size={1.55}
        color={PBR.rock.color}
        box
        roughness={PBR.rock.roughness}
        metalness={PBR.rock.metalness}
        normalMap={rock}
      />
      <Store pos={[-1.55, -0.28, 0.7]} size={fossil} color={PBR.basalt.color} box roughness={0.9} metalness={0.08} />
      <Arrow3 from={[-1.85, 1.05, 0.2]} to={[-0.45, 1.55, 0.05]} color="#7C9A6A" radius={0.018} />
      <Arrow3 from={[-0.4, 1.62, 0.08]} to={[-1.7, 1.12, 0.22]} color="#8B9A97" radius={0.016} />
      <Arrow3 from={[0.55, 1.55, 0.08]} to={[1.55, 0.95, 0.15]} color="#3EE0C6" radius={0.02} />
      <Arrow3 from={[1.5, 1.02, 0.12]} to={[0.5, 1.58, 0.06]} color="#7FD4FF" radius={0.018} />
      <Arrow3 from={[-1.55, 0.15, 0.35]} to={[-0.35, -0.05, -0.15]} color="#8B9A97" radius={0.014} />
      <Arrow3 from={[0.15, 0.35, -0.2]} to={[0.05, 1.35, 0]} color="#FF6A3D" radius={thick} />
      <CurveFlow pts={tapPath} color="#FF6A3D" count={Math.round(5 + tap * 10)} radius={0.035} />
      <CurveFlow pts={fastPath} color="#7C9A6A" count={6} radius={0.022} />
      <Tag pos={[0, 2.45, 0]} text="atmosphere" tone="ice" />
      <Tag pos={[-1.85, 1.15, 0.25]} text="biosphere" tone="moss" />
      <Tag pos={[1.95, 1.15, 0.2]} text="ocean" tone="glacier" />
      <Tag pos={[0.1, 0.55, -0.35]} text="sediment / rock · slow, huge" tone="sandstone" />
      <Tag pos={[-1.55, 0.22, 0.7]} text="fossil fuel · slow" />
      <Tag pos={[-1.15, 1.45, 0.15]} text="fast" tone="moss" />
      <Tag pos={[0.85, 0.15, -0.55]} text="slow" tone="sandstone" />
      <Tag pos={[0.55, 1.05, 0.15]} text="anthropogenic" tone="magma" />
      <Readout pos={[0, 3.05, 0]}>
        Fossil tap {Math.round(tap * 100)}% · thick arrow is humans moving slow rock carbon into the air
      </Readout>
      <StepCamera
        positions={[
          [0.2, 2.4, 7.2],
          [-2.2, 1.6, 5.2],
          [2.1, 1.5, 5.4],
          [0.2, 2.4, 7.2],
        ]}
      />
    </group>
  );
}

export default function CarbonCycleScene() {
  const tap = useLabControls((s) => s.params.fossil ?? 0.2);
  return (
    <LabStudio
      slug="carbon-cycle"
      title="Carbon cycle"
      camera={{ position: [0.2, 2.4, 7.2], fov: 40 }}
      liveText={`Carbon cycle. Fossil-fuel tap ${Math.round(tap * 100)}%. Fast thin arrows; thick anthropogenic flux.`}
      fallback={
        <GenericFallback
          slug="carbon-cycle"
          title="Carbon cycle"
          caption="Stores as volumes. The fossil tap is a thick arrow from slow rock to air."
        />
      }
      minDistance={3.2}
      maxDistance={14}
    >
      <fog attach="fog" args={["#07090C", 12, 26]} />
      <Model />
    </LabStudio>
  );
}
