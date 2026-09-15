import { useMemo } from "react";
import * as THREE from "three";
import { EarthMesh, Atmosphere } from "@/components/globe/earth";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera, Arrow3 } from "@/labs/shared/kit";
import { PBR } from "@/labs/shared/materials";
import { tubeGeometry } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";
import { CurveFlow } from "@/labs/shared/particles";
import { latLonToVector3 } from "@/lib/geo";

function ring(y: number, rx: number, rz: number, n: number, tilt = 0): [number, number, number][] {
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2 + tilt;
    pts.push([Math.cos(a) * rx, y + Math.sin(a * 2) * 0.05, Math.sin(a) * rz]);
  }
  return pts;
}

function Swatch({ pos, color, label }: { pos: [number, number, number]; color: string; label: string }) {
  return (
    <group position={pos}>
      <mesh>
        <boxGeometry args={[0.22, 0.22, 0.22]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.06} />
      </mesh>
      <Tag pos={[0, 0.28, 0]} text={label} occlude={false} />
    </group>
  );
}

function Conveyor() {
  useLabTick(1 / 28);
  const q = useQuality();
  const rad = q.particles > 12 ? 10 : 8;
  const surface = useMemo(() => ring(0.62, 2.22, 1.15, 56, 0.15), []);
  const deep = useMemo(() => ring(-0.58, 2.05, 1.02, 56, 0.15), []);
  const sink: [number, number, number][] = useMemo(
    () => [
      [0.15, 0.68, -1.12],
      [0.12, 0.22, -1.08],
      [0.08, -0.18, -1.02],
      [0.02, -0.58, -0.95],
    ],
    [],
  );
  const upwell: [number, number, number][] = useMemo(
    () => [
      [-0.15, -0.58, 0.98],
      [-0.12, -0.15, 1.02],
      [-0.08, 0.28, 1.08],
      [-0.04, 0.64, 1.12],
    ],
    [],
  );
  const surfaceTube = useMemo(() => tubeGeometry(surface, 0.055, 56, rad), [surface, rad]);
  const deepTube = useMemo(() => tubeGeometry(deep, 0.07, 56, rad), [deep, rad]);
  const sinkTube = useMemo(() => tubeGeometry(sink, 0.08, 24, rad), [sink, rad]);
  const upTube = useMemo(() => tubeGeometry(upwell, 0.06, 24, rad), [upwell, rad]);
  const surfaceVec = useMemo(() => surface.map((p) => new THREE.Vector3(...p)), [surface]);
  const deepVec = useMemo(() => deep.map((p) => new THREE.Vector3(...p)), [deep]);
  const sun = useMemo(() => new THREE.Vector3(2.4, 0.5, 1.6), []);
  const nadw = useMemo(() => latLonToVector3(62, -30, 1.04), []);

  return (
    <group>
      <group scale={0.72}>
        <EarthMesh sunDirection={sun} />
        <Atmosphere />
        <mesh position={nadw}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color="#102438" />
        </mesh>
      </group>
      <mesh geometry={surfaceTube}>
        <meshStandardMaterial color="#4a8aaa" roughness={0.32} metalness={0.08} />
      </mesh>
      <mesh geometry={deepTube}>
        <meshStandardMaterial color="#0d2438" roughness={0.45} metalness={0.06} />
      </mesh>
      <mesh geometry={sinkTube}>
        <meshStandardMaterial color="#102438" roughness={0.4} metalness={0.05} />
      </mesh>
      <mesh geometry={upTube}>
        <meshStandardMaterial color="#2a628c" roughness={0.35} metalness={0.07} />
      </mesh>
      <Arrow3 from={[0.15, 0.82, -1.12]} to={[0.04, -0.62, -0.95]} color="#14344a" radius={0.055} />
      <Arrow3 from={[-0.15, -0.62, 0.98]} to={[-0.04, 0.78, 1.14]} color="#3EE0C6" radius={0.04} />
      <CurveFlow pts={surfaceVec} color="#E8B86D" count={8} radius={0.03} />
      <CurveFlow pts={deepVec} color="#7FD4FF" count={8} radius={0.028} />
    </group>
  );
}

export default function ThermohalineScene() {
  const q = useQuality();
  return (
    <LabStudio
      slug="thermohaline"
      title="Thermohaline conveyor"
      camera={{ position: [0.2, 1.7, 6.4], fov: 40 }}
      liveText="Schematic conveyor. Cold salty NADW sinks in the North Atlantic. Centuries, not a day."
      exaggeration="Schematic — density colour, not a pipe you can visit."
      fallback={
        <GenericFallback
          slug="thermohaline"
          title="Thermohaline"
          caption="Schematic: cold salty water sinks, deep return, Indo-Pacific upwell. Centuries."
        />
      }
      minDistance={3}
      maxDistance={14}
    >
      <fog attach="fog" args={["#07090C", 14, 28]} />
      <StudioFloor size={12} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[7, q.lathe]} />
        <meshStandardMaterial color="#0e1412" roughness={0.96} />
      </mesh>
      <Conveyor />
      <Swatch pos={[-3.15, 0.22, 1.6]} color="#4a8aaa" label="warm / light" />
      <Swatch pos={[-2.7, 0.22, 1.6]} color="#0d2438" label="cold-saline" />
      <Tag pos={[0.2, 1.15, -1.35]} text="NADW sink · cold-saline" tone="ice" />
      <Tag pos={[-0.1, 1.05, 1.4]} text="Indo-Pacific upwell" tone="glacier" />
      <Tag pos={[2.15, -0.35, 0.2]} text="deep return" tone="ice" />
      <Tag pos={[0, 1.85, 0]} text="centuries, not a day" tone="sandstone" />
      <Readout pos={[0, 2.45, 0]}>
        Schematic · density (cold-saline darker) · NADW dives, then a slow global return
      </Readout>
      <StepCamera
        positions={[
          [0.2, 1.7, 6.4],
          [1.6, 0.9, 4.4],
          [-1.4, 1.2, 4.6],
          [0.2, 1.7, 6.4],
        ]}
      />
      <mesh visible={false}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshStandardMaterial color={PBR.water.color} />
      </mesh>
    </LabStudio>
  );
}
