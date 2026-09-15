import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { HeightField } from "@/labs/shared/terrain";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { GenericFallback } from "@/labs/shared/fallback";
import { useQuality } from "@/labs/shared/perf";

const tint = new THREE.Color();

function Model() {
  const table0 = useLabControls((s) => s.params.table ?? 0.55);
  const pump = useLabControls((s) => s.params.pump ?? 0);
  const confined = (useLabControls((s) => s.params.confined) ?? 0) > 0.5;
  const rock = useRockNormal();
  const q = useQuality();
  const nrm = useMemo(() => new THREE.Vector2(0.6, 0.6), []);
  const table = Math.max(0.12, table0 - pump * 0.28);
  const cone = pump * 0.35;
  const host = useMemo(
    () => (x: number, z: number) => {
      const hill = 0.18 * Math.exp(-(x * x) / 8);
      return 0.35 + hill + 0.04 * Math.sin(x * 0.8) * Math.cos(z * 1.1);
    },
    [],
  );
  return (
    <group>
      <StudioFloor size={10} />
      <HeightField
        fn={host}
        width={6.4}
        depth={3.4}
        segX={q.terrain}
        segZ={Math.floor(q.terrain * 0.45)}
        colorFn={(h) => tint.set(h > 0.48 ? "#7C9A6A" : "#c4a574")}
        position={[0, 0, 0]}
      />
      <mesh position={[0, table * 0.85, 0.02]}>
        <cylinderGeometry args={[2.05, 2.15, Math.max(0.08, table * 1.1), 32, 1]} />
        <meshPhysicalMaterial
          color={PBR.water.color}
          roughness={0.08}
          transmission={0.28}
          thickness={0.6}
          transparent
          opacity={0.48}
          depthWrite={false}
        />
      </mesh>
      {confined && (
        <mesh position={[0, 1.12, 0.02]} rotation={[-0.04, 0, 0]}>
          <cylinderGeometry args={[2.2, 2.25, 0.1, 28, 1]} />
          <meshStandardMaterial color="#5c564c" roughness={0.9} normalMap={rock} normalScale={nrm} />
        </mesh>
      )}
      <mesh position={[0.85, 0.95, 0.15]}>
        <cylinderGeometry args={[0.055, 0.055, 1.85, 16]} />
        <meshStandardMaterial color="#8B9A97" metalness={0.45} roughness={0.38} />
      </mesh>
      <mesh position={[0.85, table * 0.7 - cone, 0.15]}>
        <coneGeometry args={[0.55 + pump * 0.4, 0.1 + cone, 20]} />
        <meshPhysicalMaterial color="#1a4a6e" transparent opacity={0.55} roughness={0.12} />
      </mesh>
      <mesh position={[1.95, table * 1.05, 0.7]} rotation={[0.45, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.04, 0.55, 10]} />
        <meshPhysicalMaterial color="#7FD4FF" roughness={0.1} transmission={0.4} transparent opacity={0.8} />
      </mesh>
      <Tag pos={[-1.6, table * 1.35 + 0.2, 0.6]} text="Water table" tone="ice" note="The free surface in the pores. Not an underground lake." />
      <Tag pos={[0.85, 1.95, 0.4]} text="Well" note="A well mines a store and draws a cone of depression." />
      <Tag pos={[2.15, table * 1.2, 1.0]} text="Spring" tone="glacier" note="Where the table meets the slope, water leaves as a spring." />
      {confined && <Tag pos={[0, 1.4, 0.7]} text="Aquitard lid" tone="sandstone" note="A low-permeability lid. Confined water is still in pores." />}
      <Readout pos={[0, 2.45, 0]}>
        Table {table.toFixed(2)} · pump {pump.toFixed(2)} · pores, not a cave lake
      </Readout>
      <StepCamera positions={[[2.8, 1.4, 5.2], [0.8, 1.6, 3.4], [2.2, 0.6, 3.8], [2.8, 1.4, 5.2]]} />
    </group>
  );
}

export default function GroundwaterScene() {
  return (
    <LabStudio
      slug="groundwater"
      title="Groundwater"
      camera={{ position: [2.8, 1.4, 5.2], fov: 40 }}
      exaggeration="A glass-tank cutaway. Real Chalk is fractures plus matrix. Real Ogallala is sediment."
      liveText="Water table in the pores. A well mines a store and draws a cone of depression."
      fallback={<GenericFallback slug="groundwater" title="Groundwater" caption="Water table, well, cone of depression. Pores, not a lake." />}
      target={[0, 0.6, 0]}
    >
      <Model />
    </LabStudio>
  );
}
