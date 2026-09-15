import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { PBR, useRockNormal, useSoilNormal } from "@/labs/shared/materials";
import { HeightField, tubeGeometry } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const tint = new THREE.Color();

function capH(x: number, z: number, t: number) {
  let h = 1.08 + 0.07 * Math.sin(x * 0.65) * Math.cos(z * 0.5);
  h -= 0.5 * Math.exp(-((z + 1.32) ** 2) / 0.2);
  const headZ = 0.62 - t * 2.05;
  const pirateProf = z > headZ ? 1 : Math.exp(-((z - headZ) ** 2) / 0.16);
  h -= (0.38 + t * 0.42) * Math.exp(-(x * x) / 0.15) * pirateProf;
  if (t > 0.52) {
    h -= 0.22 * (t - 0.52) * Math.exp(-(x * x) / 0.18) * Math.exp(-((z + 1.32) ** 2) / 0.18);
  }
  return Math.max(0.04, h);
}

function capColor(h: number) {
  if (h < 0.28) return tint.set(PBR.soil.color);
  if (h < 0.7) return tint.set(PBR.crust.color);
  if (h < 1.0) return tint.set(PBR.rock.color);
  return tint.set(PBR.granite.color);
}

function samplePath(pts: [number, number, number][], t: number, r = 0.038) {
  const lifted: [number, number, number][] = pts.map(([x, , z]) => [x, capH(x, z, t) + 0.03, z]);
  return tubeGeometry(lifted, r, Math.max(24, lifted.length), 8);
}

function WaterMat({ color = PBR.water.color }: { color?: string }) {
  return <meshStandardMaterial color={color} roughness={0.12} metalness={0.08} />;
}

function Model() {
  useLabTick(1 / 12);
  const t = useLabControls((s) => s.t);
  const q = useQuality();
  const rock = useRockNormal();
  const soil = useSoilNormal();
  const nrm = useMemo(() => new THREE.Vector2(0.5, 0.5), []);
  const captured = t > 0.52;
  const fn = useMemo(() => (x: number, y: number) => capH(x, y, t), [t]);
  const pirate = useMemo(() => {
    const headZ = 0.62 - t * 2.05;
    const pts: [number, number, number][] = [];
    const z0 = captured ? -1.32 : headZ + 0.12;
    for (let i = 0; i <= 36; i++) pts.push([0, 0, z0 + (i / 36) * (2.45 - z0)]);
    return samplePath(pts, t, 0.042);
  }, [t, captured]);
  const highEast = useMemo(() => {
    const pts: [number, number, number][] = [];
    const x1 = captured ? 0 : -3.15;
    for (let i = 0; i <= 36; i++) pts.push([3.15 - (i / 36) * (3.15 - x1), 0, -1.32]);
    return samplePath(pts, t, captured ? 0.04 : 0.036);
  }, [t, captured]);
  const beheaded = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 24; i++) pts.push([-0.55 - (i / 24) * 2.6, 0, -1.32]);
    return samplePath(pts, t, 0.028);
  }, [t]);
  const colY = capH(-0.7, -1.32, t);
  return (
    <group>
      <StudioFloor size={13} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 0]} receiveShadow>
        <circleGeometry args={[8.5, 48]} />
        <meshStandardMaterial color="#121814" roughness={0.96} normalMap={soil} normalScale={nrm} />
      </mesh>
      <HeightField
        fn={fn}
        width={8.4}
        depth={6.4}
        segX={q.terrain}
        segZ={Math.floor(q.terrain * 0.7)}
        colorFn={capColor}
      />
      <mesh geometry={pirate}>
        <WaterMat />
      </mesh>
      <mesh geometry={highEast}>
        <WaterMat />
      </mesh>
      {captured && (
        <mesh geometry={beheaded}>
          <WaterMat color="#6a7a78" />
        </mesh>
      )}
      <mesh position={[0, capH(0, -1.32, t) + 0.02, -1.32]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.16, 16]} />
        <meshStandardMaterial color={PBR.rock.color} roughness={0.88} normalMap={rock} normalScale={nrm} />
      </mesh>
      {captured && (
        <mesh position={[-0.7, colY + 0.03, -1.32]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.12, 0.22, 20]} />
          <meshStandardMaterial color={PBR.sand.color} roughness={0.92} />
        </mesh>
      )}
      {captured && <Tag pos={[0.05, capH(0, -1.32, t) + 0.55, -1.32]} text="Elbow of capture" tone="magma" />}
      {captured && <Tag pos={[-0.85, colY + 0.5, -1.32]} text="Wind gap" tone="sandstone" />}
      {captured && <Tag pos={[-2.4, capH(-2.4, -1.32, t) + 0.48, -1.32]} text="Beheaded stream" />}
      <Tag pos={[0, capH(0, 1.6, t) + 0.45, 1.6]} text="Pirate · lower level" tone="ice" />
      <Tag pos={[2.2, capH(2.2, -1.32, t) + 0.45, -1.32]} text="Higher stream" tone="moss" />
      <Readout pos={[0, 2.7, 0]}>{captured ? "Captured — water turns at the elbow" : "Headward erosion… pirate cutting back"}</Readout>
      <StepCamera
        positions={[
          [0.2, 5.2, 7.4],
          [0.1, 2.8, 4.2],
          [0.2, 2.6, 2.2],
          [-2.2, 2.8, 4.8],
        ]}
      />
    </group>
  );
}

export default function RiverCaptureScene() {
  const t = useLabControls((s) => s.t);
  return (
    <LabStudio
      slug="river-capture"
      title="River capture"
      camera={{ position: [0.2, 5.2, 7.4], fov: 40 }}
      exaggeration="Vertical exaggeration ×10 · two valleys, one steal"
      liveText={`River capture ${t > 0.52 ? "complete" : "in progress"}. Elbow, wind gap, beheaded stream.`}
      fallback={
        <GenericFallback
          slug="river-capture"
          title="River capture"
          caption="Two valleys. The lower pirate cuts back, captures, leaves an elbow, wind gap and beheaded stream."
        />
      }
      minDistance={3.2}
      maxDistance={16}
    >
      <fog attach="fog" args={["#07090C", 12, 26]} />
      <Model />
    </LabStudio>
  );
}
