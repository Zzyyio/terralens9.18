import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { HeightField } from "@/labs/shared/terrain";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const tint = new THREE.Color();

function Model() {
  const cycles = useLabControls((s) => s.params.cycles ?? 0.45);
  const q = useQuality();
  const rock = useRockNormal();
  const nrm = useMemo(() => new THREE.Vector2(0.7, 0.7), []);
  const wedge = 0.08 + cycles * 0.45;
  const fn = useMemo(
    () => (x: number, z: number) => {
      const poly = 0.04 * Math.cos(x * 2.2) * Math.cos(z * 2.2);
      return 0.22 + poly * cycles;
    },
    [cycles],
  );
  const stones = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2;
      const r = 1.15 + (i % 3) * 0.08;
      pts.push([Math.cos(a) * r, 0.28 + cycles * 0.08, Math.sin(a) * r]);
    }
    return pts;
  }, [cycles]);
  return (
    <group>
      <StudioFloor size={12} />
      <HeightField
        fn={fn}
        width={6.4}
        depth={6.4}
        segX={q.terrain}
        segZ={q.terrain}
        colorFn={() => tint.set("#8a8478")}
      />
      <mesh position={[0, 0.05, 0]} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[0.18, wedge, 2.8]} />
        <meshPhysicalMaterial
          color={PBR.ice.color}
          roughness={0.18}
          transmission={0.4}
          thickness={0.7}
          transparent
          opacity={0.85}
        />
      </mesh>
      {stones.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <dodecahedronGeometry args={[0.09 + (i % 3) * 0.03, 0]} />
          <meshStandardMaterial color="#5c564c" roughness={0.92} normalMap={rock} normalScale={nrm} />
        </mesh>
      ))}
      <mesh position={[2.1, 0.18, -1.4]}>
        <sphereGeometry args={[0.55, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#6a6560" roughness={0.9} />
      </mesh>
      <Tag pos={[0, 0.55 + wedge, 0]} text="Ice wedge" tone="ice" />
      <Tag pos={[1.3, 0.7, 0.2]} text="Patterned ground" tone="sandstone" />
      <Tag pos={[2.1, 0.85, -1.4]} text="Nivation hollow" />
      <Readout pos={[0, 2.15, 0]}>
        Freeze–thaw {cycles.toFixed(2)} · ice is in the ground, and it has thickness
      </Readout>
      <StepCamera positions={[[0.4, 3.4, 6.8], [-1.2, 1.6, 4], [2.2, 1.8, 4.4], [0.4, 3.4, 6.8]]} />
    </group>
  );
}

export default function PeriglacialScene() {
  return (
    <LabStudio
      slug="periglacial"
      title="Periglacial landforms"
      camera={{ position: [0.4, 3.4, 6.8], fov: 40 }}
      exaggeration="Wedge thickness exaggerated. Real polygons take centuries. Not a U-trough."
      liveText="Freeze–thaw. Ice wedges and patterned ground. Cold without a glacier."
      fallback={<GenericFallback slug="periglacial" title="Periglacial" caption="Ice wedges and polygons. Not a glacier’s U-trough." />}
    >
      <Model />
    </LabStudio>
  );
}
