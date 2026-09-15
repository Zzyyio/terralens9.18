import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StepCamera } from "@/labs/shared/kit";
import { HeightField } from "@/labs/shared/terrain";
import { PBR } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

function landHeight(x: number, z: number): number {
  const u = (x + 6.4) / 12.8;
  const valleyW = 0.18 + u * 1.55;
  const valley = 0.85 * Math.exp(-(z * z) / (valleyW * valleyW * 0.55));
  const hills = (1 - u) * 0.55 * Math.sin(x * 0.7) * Math.sin(z * 1.1);
  const step = u < 0.28 ? Math.max(0, 0.35 - Math.abs(u - 0.18) * 4) : 0;
  const flood = u > 0.72 ? 0.12 : 0;
  return (1 - u) * 1.55 + hills - valley + flood + step;
}

function riverPoint(u: number, cutoff: number) {
  const x = -6.2 + u * 12.6;
  const meander = u > 0.34 && u < 0.78 ? Math.sin(u * 13) * 0.95 * (1 - cutoff * 0.85) : 0;
  const neck = u > 0.5 && u < 0.62 ? Math.sin((u - 0.5) * 38) * 0.5 * (1 - cutoff) : 0;
  const z = meander + neck;
  const y = landHeight(x, z) + 0.025;
  return new THREE.Vector3(x, y, z);
}

function Terrain() {
  const q = useQuality();
  const trueScale = useLabControls((s) => s.trueScale);
  const vScale = trueScale ? 1 / 12 : 1;
  const colorFn = useMemo(
    () => (h: number) => {
      const c = new THREE.Color();
      if (h < 0.22) c.set("#2d4a38");
      else if (h < 0.7) c.set("#7C9A6A");
      else if (h < 1.2) c.set("#8a7a48");
      else c.set("#d8d0c0");
      return c;
    },
    [],
  );
  return (
    <HeightField
      fn={landHeight}
      width={13.2}
      depth={6.2}
      segX={q.terrain}
      segZ={Math.floor(q.terrain / 2)}
      colorFn={colorFn}
      vScale={vScale}
    />
  );
}

function Water() {
  useLabTick(1 / 12);
  const t = useLabControls((s) => s.t);
  const qDischarge = useLabControls((s) => s.params.discharge ?? 0.7);
  const cutoff = Math.min(1, Math.max(0, (t - 0.35) * 2.2));
  const pts = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i <= 140; i++) arr.push(riverPoint(i / 140, cutoff));
    return arr;
  }, [cutoff]);
  const width = 0.028 + qDischarge * 0.055;
  const curve = useMemo(() => new THREE.CatmullRomCurve3(pts), [pts]);
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 140, width, 8, false), [curve, width]);
  return (
    <>
      <mesh geometry={tube}>
        <meshPhysicalMaterial
          color={PBR.water.color}
          roughness={0.08}
          metalness={0.05}
          transmission={0.22}
          thickness={0.35}
          ior={1.333}
          transparent
          opacity={0.88}
        />
      </mesh>
      {qDischarge > 1.05 && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4.4, 0.16, 0]}>
          <planeGeometry args={[4.4, 2.6]} />
          <meshStandardMaterial color="#3EE0C6" transparent opacity={0.22} depthWrite={false} />
        </mesh>
      )}
      {cutoff > 0.75 && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.15, 0.2, 0.9]}>
          <torusGeometry args={[0.44, 0.045, 10, 28, Math.PI * 1.55]} />
          <meshStandardMaterial color={PBR.water.color} roughness={0.14} />
        </mesh>
      )}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[6.5, 0.04, 0]}>
        <circleGeometry args={[1.7, 48]} />
        <meshPhysicalMaterial
          color="#14344a"
          roughness={0.08}
          metalness={0.06}
          transmission={0.2}
          thickness={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
    </>
  );
}

export default function RiversScene() {
  const q = useLabControls((s) => s.params.discharge ?? 0.7);
  return (
    <LabStudio
      slug="rivers"
      title="Rivers from source to mouth"
      camera={{ position: [0, 4.8, 8.4], fov: 40 }}
      exaggeration="Vertical exaggeration ×12 on the long profile. Water is a thin free surface in a valley, not a fat pipe."
      liveText={`River discharge ${q.toFixed(2)} times. Upper V-valley to delta.`}
      fallback={<GenericFallback slug="rivers" title="Rivers" />}
      minDistance={3}
      maxDistance={16}
    >
      <fog attach="fog" args={["#07090C", 12, 26]} />
      <Terrain />
      <Water />
      <Tag pos={[-5.2, 2.35, 0]} text="Upper · V-valley" note="Steep, narrow, vertical erosion. A V, not a glacial U." />
      <Tag pos={[-3.5, 1.7, 0.35]} text="Waterfall / knickpoint" tone="ice" note="A nick in the long profile. Hard rock holds a step." />
      <Tag pos={[0.2, 1.15, 1.15]} text="Meanders" note="Outer bend erodes, inner bend deposits. Play cuts the neck to an oxbow." />
      <Tag pos={[3.5, 0.85, 0]} text="Floodplain / levées" tone="moss" note="High discharge spills. Natural levées are the river’s own banks." />
      <Tag pos={[6.2, 0.7, 0]} text="Delta" tone="sandstone" note="Load dumped where the river meets standing water. UK ‘deltas’ are often estuaries." />
      <Readout pos={[0, 3.3, 0]}>Discharge {q.toFixed(2)}× · play cuts the neck → oxbow</Readout>
      <StepCamera positions={[[0, 4.8, 8.4], [-4.2, 3.2, 5.5], [1.2, 2.8, 6.2], [0, 4.8, 8.4]]} />
    </LabStudio>
  );
}
