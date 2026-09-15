import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { HeightField, latheGeometry, tubeGeometry } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";
import { CurveFlow } from "@/labs/shared/particles";

const EXAG = 8;

function basinH(x: number, y: number) {
  const r = Math.hypot(x * 0.7, y * 0.92);
  const bowl = 0.042 * r * r;
  const rim = 0.125 * Math.exp(-((r - 2.52) ** 2) / 0.16);
  const sourceHill = 0.08 * Math.exp(-((x + 2.28) ** 2 + (y + 0.12) ** 2) / 0.62);
  const mainCh = 0.05 * Math.exp(-(y * y) / (0.15 + Math.max(0.04, x + 2.5) * 0.055));
  const tribN = 0.032 * Math.exp(-((y - 1.08 - x * 0.12) ** 2) / 0.13) * Math.max(0, 1.05 - Math.abs(x + 0.15));
  const tribS = 0.028 * Math.exp(-((y + 1.02 + x * 0.1) ** 2) / 0.12) * Math.max(0, 0.95 - Math.abs(x + 0.35));
  const mouth = Math.max(0, (x - 2.15) * 0.018);
  const sea = x > 2.82 ? -0.035 : 0;
  return (0.035 + bowl + rim + sourceHill - mainCh - tribN - tribS + mouth + sea) * EXAG;
}

function basinColor(h: number) {
  const c = new THREE.Color();
  if (h < 0.2) c.set(PBR.water.color);
  else if (h < 0.55) c.set(PBR.crust.color);
  else if (h < 1.05) c.set(PBR.soil.color);
  else c.set("#d4ccc0");
  return c;
}

function ry(x: number, z: number) {
  return basinH(x, z) + 0.048;
}

function path2(fn: (u: number) => [number, number], n: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const [x, z] = fn(i / n);
    pts.push([x, ry(x, z), z]);
  }
  return pts;
}

function Network() {
  useLabTick(1 / 12);
  const overlay = (useLabControls((s) => s.params.overlay) ?? 1) > 0.5;
  const q = useQuality();
  const rock = useRockNormal();
  const rad = q.particles > 12 ? 10 : 8;

  const main = useMemo(
    () =>
      path2((u) => {
        const x = -2.35 + u * 5.35;
        const z = Math.sin(u * 3.6) * 0.1 * u;
        return [x, z];
      }, 48),
    [],
  );
  const tribA = useMemo(
    () =>
      path2((u) => {
        const x = -0.95 + u * 1.42;
        const z = 1.48 - u * 1.4;
        return [x, z];
      }, 28),
    [],
  );
  const tribB = useMemo(
    () =>
      path2((u) => {
        const x = -1.15 + u * 1.55;
        const z = -1.38 + u * 1.32;
        return [x, z];
      }, 26),
    [],
  );
  const divide = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 72; i++) {
      const a = (i / 72) * Math.PI * 1.72 + 0.28;
      const x = Math.cos(a) * 2.62;
      const z = Math.sin(a) * 2.18;
      pts.push([x, basinH(x, z) + 0.07, z]);
    }
    return pts;
  }, []);

  const mainTube = useMemo(() => tubeGeometry(main, 0.055, 48, rad), [main, rad]);
  const tribATube = useMemo(() => tubeGeometry(tribA, 0.032, 28, rad), [tribA, rad]);
  const tribBTube = useMemo(() => tubeGeometry(tribB, 0.028, 26, rad), [tribB, rad]);
  const divideTube = useMemo(() => tubeGeometry(divide, 0.03, 64, 8), [divide]);
  const spring = useMemo(
    () =>
      latheGeometry(
        [
          [0.02, 0],
          [0.14, 0.03],
          [0.1, 0.1],
          [0.045, 0.16],
        ],
        q.lathe,
      ),
    [q.lathe],
  );
  const mainVec = useMemo(() => main.map((p) => new THREE.Vector3(...p)), [main]);
  const water = { color: PBR.water.color, roughness: PBR.water.roughness, metalness: PBR.water.metalness };

  return (
    <group>
      <mesh geometry={mainTube}>
        <meshStandardMaterial {...water} />
      </mesh>
      <mesh geometry={tribATube}>
        <meshStandardMaterial {...water} />
      </mesh>
      <mesh geometry={tribBTube}>
        <meshStandardMaterial {...water} />
      </mesh>
      {overlay && (
        <mesh geometry={divideTube}>
          <meshStandardMaterial color="#3EE0C6" roughness={0.35} emissive="#3EE0C6" emissiveIntensity={0.2} />
        </mesh>
      )}
      <mesh geometry={spring} position={[-2.32, ry(-2.32, -0.12), -0.12]} castShadow>
        <meshStandardMaterial color={PBR.ice.color} roughness={0.22} metalness={0.04} transparent opacity={0.72} />
      </mesh>
      <mesh position={[3.2, 0.015, 0.12]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 32]} />
        <meshStandardMaterial {...water} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]} receiveShadow>
        <circleGeometry args={[6.2, q.lathe]} />
        <meshStandardMaterial color="#121814" roughness={0.96} normalMap={rock} />
      </mesh>
      <CurveFlow pts={mainVec} color="#7FD4FF" count={10} radius={0.032} />
    </group>
  );
}

export default function DrainageBasinScene() {
  const overlay = (useLabControls((s) => s.params.overlay) ?? 1) > 0.5;
  const q = useQuality();
  const segs = Math.max(48, Math.floor(q.terrain / 2));
  return (
    <LabStudio
      slug="drainage-basin"
      title="Drainage basin"
      camera={{ position: [0.35, 5.4, 7.6], fov: 40 }}
      liveText={`Watershed ${overlay ? "overlay on" : "hidden"}. Source, tributary, confluence, mouth.`}
      exaggeration="Vertical exaggeration ×8 — the rim is the watershed, not a paint fill."
      fallback={
        <GenericFallback slug="drainage-basin" title="Drainage basin" caption="A 3D watershed: rim, source, tributary, confluence, mouth." />
      }
      minDistance={3.4}
      maxDistance={16}
    >
      <fog attach="fog" args={["#07090C", 12, 26]} />
      <StudioFloor size={12} />
      <HeightField fn={basinH} width={8.6} depth={6.4} segX={q.terrain} segZ={segs} colorFn={basinColor} />
      <Network />
      <Tag pos={[-2.32, 1.95, -0.12]} text="source" tone="ice" />
      <Tag pos={[-0.25, 1.22, 1.38]} text="tributary" tone="glacier" />
      <Tag pos={[0.42, 0.92, 0.04]} text="confluence" tone="moss" />
      <Tag pos={[2.88, 0.58, 0.18]} text="mouth" />
      <Tag pos={[0.15, 2.22, -2.08]} text="watershed" tone="sandstone" />
      <Readout pos={[0, 3.45, 0]}>Rain inside the rim is this river · overlay {overlay ? "on" : "off"}</Readout>
      <StepCamera
        positions={[
          [0.35, 5.4, 7.6],
          [-2.5, 3.3, 4.1],
          [0.55, 2.5, 4.9],
          [2.9, 2.7, 5.3],
        ]}
      />
    </LabStudio>
  );
}
