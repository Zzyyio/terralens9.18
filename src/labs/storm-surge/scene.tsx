import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera, Arrow3, WaterSheet } from "@/labs/shared/kit";
import { HeightField } from "@/labs/shared/terrain";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const tint = new THREE.Color();

function Model() {
  const wind = useLabControls((s) => s.params.wind ?? 0.4);
  const q = useQuality();
  const rock = useRockNormal();
  const nrm = useMemo(() => new THREE.Vector2(0.5, 0.5), []);
  const pile = 0.08 + wind * 0.55;
  const fn = useMemo(
    () => (x: number, z: number) => {
      const land = 0.5 * (1 + Math.tanh((z - 0.9) * 6));
      return 0.04 + land * 0.55;
    },
    [],
  );
  return (
    <group>
      <StudioFloor size={14} />
      <HeightField
        fn={fn}
        width={9.2}
        depth={6.2}
        segX={q.terrain}
        segZ={Math.floor(q.terrain * 0.5)}
        colorFn={(h) => (h < 0.12 ? tint.set(PBR.sand.color) : tint.set("#7C9A6A"))}
      />
      <group position={[0, 0, -0.9]}>
        <WaterSheet width={9.2} depth={3.6} y={pile * 0.42} opacity={0.74} />
      </group>
      <Arrow3 from={[-0.2, 0.85 + pile, -2.4]} to={[-0.2, 0.55 + pile, 0.35]} color="#E8B86D" radius={0.045} />
      <mesh position={[2.4, 0.42, 1.05]} castShadow>
        <cylinderGeometry args={[0.42, 0.48, 0.22, 16]} />
        <meshStandardMaterial color="#8a6a48" roughness={0.9} normalMap={rock} normalScale={nrm} />
      </mesh>
      <Tag pos={[-0.2, 1.25 + pile, -1.2]} text="Onshore wind" tone="sandstone" note="Wind piles water on a shelf. The seafloor did not slip." />
      <Tag pos={[0, 0.35 + pile, 0.2]} text={`Surge · ${Math.round(pile * 8)} m school`} tone="ice" note="School metres on the pile. Real 1953 and Katrina numbers live in Why." />
      <Tag pos={[2.4, 0.85, 1.05]} text="Shelf coast" tone="moss" note="A wide shelf lets water pile. This is not a tsunami." />
      <Readout pos={[0, 2.55, 0]}>
        Wind {wind.toFixed(2)} · floor did not slip · this is not a tsunami
      </Readout>
      <StepCamera positions={[[0.2, 3.4, 8.2], [-2.2, 2.2, 5.2], [2.6, 2.0, 5.4], [0.2, 3.4, 8.2]]} />
    </group>
  );
}

export default function StormSurgeScene() {
  const wind = useLabControls((s) => s.params.wind ?? 0.4);
  return (
    <LabStudio
      slug="storm-surge"
      title="Storm surge"
      camera={{ position: [0.2, 3.4, 8.2], fov: 40 }}
      exaggeration="School metres on the pile. Real 1953 and Katrina numbers live in the Why panel, cited."
      liveText={`Storm surge. Onshore wind ${wind.toFixed(2)}. Water piles on a shelf. The seafloor did not slip.`}
      fallback={<GenericFallback slug="storm-surge" title="Storm surge" caption="Wind piles water on a shelf. Not a tsunami." />}
    >
      <Model />
    </LabStudio>
  );
}
