import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera, WaterSheet } from "@/labs/shared/kit";
import { HeightField } from "@/labs/shared/terrain";
import { PBR } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const NAMES = ["Stable continent", "Rift", "Young ocean", "Wide ocean", "Closing · trench", "Collision"] as const;
const tint = new THREE.Color();

function Model() {
  const stage = Math.round(useLabControls((s) => s.params.stage ?? 2));
  const s = Math.min(5, Math.max(0, stage));
  const q = useQuality();
  const gap = s <= 1 ? 0.15 + s * 0.35 : s < 4 ? 0.5 + (s - 1) * 0.7 : Math.max(0.08, 2.6 - (s - 3) * 1.2);
  const ridge = s >= 2 && s <= 4;
  const trench = s >= 4;
  const mountains = s >= 5 ? 1 : 0;
  const leftFn = useMemo(
    () => (x: number, z: number) => {
      const edge = 0.5 * (1 + Math.tanh((-x - 0.2) * 4));
      return 0.12 + edge * (0.55 + 0.08 * Math.sin(z * 1.4)) + mountains * 0.35 * Math.exp(-((x + 0.4) ** 2) / 0.4);
    },
    [mountains],
  );
  const rightFn = useMemo(
    () => (x: number, z: number) => {
      const edge = 0.5 * (1 + Math.tanh((x - 0.2) * 4));
      return 0.12 + edge * (0.55 + 0.08 * Math.sin(z * 1.2)) + mountains * 0.55 * Math.exp(-((x - 0.15) ** 2) / 0.35);
    },
    [mountains],
  );
  const ridgeFn = useMemo(
    () => (x: number, z: number) => 0.08 + 0.22 * Math.exp(-(x * x) / 0.08) + 0.03 * Math.sin(z * 3),
    [],
  );
  return (
    <group>
      <StudioFloor size={12} />
      <mesh position={[0, -0.22, 0]} receiveShadow>
        <cylinderGeometry args={[4.2, 4.4, 0.55, 40, 1]} />
        <meshStandardMaterial color={PBR.mantle.color} roughness={0.93} />
      </mesh>
      {s >= 2 && <WaterSheet width={gap * 2.4 + 1.6} depth={3.2} y={0.16} opacity={0.72} />}
      <group position={[-1.35 - gap * 0.5, 0, 0]}>
        <HeightField
          fn={leftFn}
          width={3.4}
          depth={2.8}
          segX={Math.floor(q.terrain * 0.7)}
          segZ={Math.floor(q.terrain * 0.45)}
          colorFn={(h) => tint.set(h > 0.5 ? "#8a8478" : PBR.crust.color)}
        />
      </group>
      <group position={[1.35 + gap * 0.5, 0, 0]}>
        <HeightField
          fn={rightFn}
          width={3.4}
          depth={2.8}
          segX={Math.floor(q.terrain * 0.7)}
          segZ={Math.floor(q.terrain * 0.45)}
          colorFn={(h) => tint.set(h > 0.5 ? "#8a8478" : PBR.crust.color)}
        />
      </group>
      {ridge && (
        <group position={[0, 0.02, 0]}>
          <HeightField
            fn={ridgeFn}
            width={1.1}
            depth={2.6}
            segX={18}
            segZ={22}
            colorFn={() => tint.set(PBR.basalt.color)}
          />
        </group>
      )}
      {trench && (
        <mesh position={[0.75, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.55, 2.6, 8, 12]} />
          <meshStandardMaterial color="#0a2433" roughness={0.4} />
        </mesh>
      )}
      <Tag pos={[0, 1.55 + mountains * 0.4, 0]} text={NAMES[s]} tone="sandstone" note="Oceans open at rifts and close at trenches. The Wilson cycle is one ocean's life." />
      {ridge && <Tag pos={[0, 0.7, 1.1]} text="Ridge" tone="magma" note="New ocean crust. Magnetic stripes age away from the axis." />}
      {trench && <Tag pos={[0.85, 0.55, 1.1]} text="Trench" tone="ice" note="Old crust is consumed. A closing ocean, not a second rift." />}
      {mountains > 0 && (
        <Tag pos={[0.2, 1.45, 0.7]} text="Caledonides / Appalachians" note="A closed ocean. Collision mountains, not a volcanic arc." />
      )}
      <Readout pos={[0, 2.35, 0]}>
        Stage {s} · {NAMES[s]} · oceans open and close
      </Readout>
      <StepCamera positions={[[0, 2.6, 7.2], [-2.2, 1.6, 5], [2.2, 1.6, 5], [0, 2.6, 7.2]]} />
    </group>
  );
}

export default function WilsonCycleScene() {
  const stage = Math.round(useLabControls((s) => s.params.stage ?? 2));
  return (
    <LabStudio
      slug="wilson-cycle"
      title="Wilson cycle"
      camera={{ position: [0, 2.6, 7.2], fov: 40 }}
      exaggeration="Six clean stages, a strip not a sphere. Real cycles overlap and include terranes."
      liveText={`Wilson cycle stage ${stage}. Rift to collision. Caledonides and Appalachians are a closed ocean.`}
      fallback={<GenericFallback slug="wilson-cycle" title="Wilson cycle" caption="Rift, ocean, trench, collision. Oceans open and close." />}
    >
      <Model />
    </LabStudio>
  );
}
