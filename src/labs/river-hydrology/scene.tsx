import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { tubeGeometry } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

/** UK highland: nival spring snowmelt bump, winter rain in the wings. */
function ukNival(m: number) {
  const snowmelt = 0.88 * Math.exp(-((m - 4.15) ** 2) / 1.55);
  const winter = 0.2 + 0.16 * Math.cos(((m - 0.4) / 12) * Math.PI * 2);
  return 0.22 + winter + snowmelt;
}

/** Mississippi: broader pluvial / rain-fed continental year. */
function msPluvial(m: number) {
  const rain = 0.58 * Math.exp(-((m - 5.6) ** 2) / 6.8);
  const base = 0.4 + 0.1 * Math.sin(((m - 4.2) / 12) * Math.PI * 2);
  return base + rain;
}

function crest(fn: (m: number) => number, z: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= 48; i++) {
    const m = (i / 48) * 12;
    pts.push([-2.5 + (m / 12) * 5, fn(m) + 0.02, z]);
  }
  return pts;
}

function RegimeRibbon({
  fn,
  z,
  color,
  month,
}: {
  fn: (m: number) => number;
  z: number;
  color: string;
  month: number;
}) {
  const geom = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-2.5, 0.03);
    for (let i = 0; i <= 48; i++) {
      const m = (i / 48) * 12;
      shape.lineTo(-2.5 + (m / 12) * 5, fn(m));
    }
    shape.lineTo(2.5, 0.03);
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, { depth: 0.34, bevelEnabled: false, steps: 1 });
    g.translate(0, 0, -0.17);
    g.computeVertexNormals();
    return g;
  }, [fn]);
  const tube = useMemo(() => tubeGeometry(crest(fn, 0), 0.04, 48, 10), [fn]);
  const h = fn(month);
  return (
    <group position={[0, 0, z]}>
      <mesh geometry={geom} castShadow>
        <meshStandardMaterial color={color} roughness={0.36} metalness={0.08} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={tube}>
        <meshStandardMaterial color={color} roughness={0.22} metalness={0.1} />
      </mesh>
      <mesh position={[-2.5 + (month / 12) * 5, h + 0.09, 0]}>
        <sphereGeometry args={[0.09, 14, 14]} />
        <meshBasicMaterial color="#FF6A3D" />
      </mesh>
    </group>
  );
}

function Model() {
  useLabTick(1 / 14);
  const t = useLabControls((s) => s.t);
  const month = t * 12;
  const mi = Math.min(11, Math.floor(t * 12));
  const q = useQuality();
  const rock = useRockNormal();
  const snowOn = month > 2.2 && month < 5.4;
  return (
    <group>
      <StudioFloor size={12} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[6.5, q.lathe]} />
        <meshStandardMaterial color="#121814" roughness={0.95} normalMap={rock} />
      </mesh>
      {MONTHS.map((lab, i) => (
        <group key={lab} position={[-2.5 + (i / 11) * 5, 0.02, 0]}>
          <mesh>
            <boxGeometry args={[0.018, 0.05, 3.4]} />
            <meshStandardMaterial color="#2a3230" />
          </mesh>
        </group>
      ))}
      <RegimeRibbon fn={ukNival} z={-1.05} color="#3EE0C6" month={month} />
      <RegimeRibbon fn={msPluvial} z={1.05} color="#7FD4FF" month={month} />
      <mesh position={[0, 0.01, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.01, 0.01, 5.2, 8]} />
        <meshStandardMaterial color="#8B9A97" />
      </mesh>
      {snowOn && (
        <mesh position={[-2.5 + (4.15 / 12) * 5, ukNival(4.15) + 0.22, -1.05]} castShadow>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial
            color={PBR.ice.color}
            roughness={PBR.ice.roughness}
            metalness={PBR.ice.metalness}
            transparent
            opacity={0.7}
          />
        </mesh>
      )}
      <Tag pos={[0.1, ukNival(month) + 0.52, -1.05]} text="nival · UK highland" tone="glacier" />
      <Tag pos={[0.1, msPluvial(month) + 0.52, 1.05]} text="pluvial · Mississippi" tone="ice" />
      <Tag pos={[-2.5 + (4.15 / 12) * 5, 1.62, -1.05]} text="snowmelt" tone="ice" />
      <Readout pos={[0, 2.55, 0]}>
        {MONTHS[mi]} · two climates, two years — not one graph for all rivers
      </Readout>
      <StepCamera
        positions={[
          [0.2, 3.4, 7.2],
          [0.2, 2.35, 4.5],
          [2.15, 2.2, 5.3],
          [0.2, 3.4, 7.2],
        ]}
      />
    </group>
  );
}

export default function RiverHydrologyScene() {
  const t = useLabControls((s) => s.t);
  const mi = Math.min(11, Math.floor(t * 12));
  return (
    <LabStudio
      slug="river-hydrology"
      title="River regime"
      camera={{ position: [0.2, 3.4, 7.2], fov: 40 }}
      liveText={`River regime. Month ${MONTHS[mi]}. UK highland nival vs Mississippi pluvial.`}
      fallback={
        <GenericFallback
          slug="river-hydrology"
          title="River regime"
          caption="Two annual 3D traces. Nival snowmelt vs broader pluvial year."
        />
      }
      minDistance={3}
      maxDistance={14}
    >
      <fog attach="fog" args={["#07090C", 12, 24]} />
      <Model />
    </LabStudio>
  );
}
