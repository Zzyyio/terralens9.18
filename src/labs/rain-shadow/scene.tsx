import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera, Arrow3 } from "@/labs/shared/kit";
import { HeightField } from "@/labs/shared/terrain";
import { PBR } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const tint = new THREE.Color();

function Model() {
  const ridge = useLabControls((s) => s.params.ridge ?? 0.7);
  const wind = useLabControls((s) => s.params.wind ?? 0.7);
  const q = useQuality();
  const hMax = 0.55 + ridge * 1.7;
  const fn = useMemo(
    () => (x: number, z: number) => {
      const r = Math.exp(-(x * x) / 0.85);
      return 0.08 + r * hMax + 0.04 * Math.sin(z * 1.2) * r;
    },
    [hMax],
  );
  const rainN = Math.round(4 + wind * ridge * 10);
  return (
    <group>
      <StudioFloor size={14} />
      <HeightField
        fn={fn}
        width={9.2}
        depth={6.4}
        segX={q.terrain}
        segZ={Math.floor(q.terrain * 0.6)}
        colorFn={(h) => (h > hMax * 0.7 ? tint.set("#d8d0c0") : h > 0.35 ? tint.set("#7C9A6A") : tint.set("#c4a574"))}
      />
      <Arrow3 from={[-4.2, 1.1, 0]} to={[-1.1, 0.55 + hMax, 0]} color="#7FD4FF" radius={0.04} />
      <Arrow3 from={[1.1, 0.55 + hMax, 0]} to={[4.0, 0.7, 0]} color="#E8B86D" radius={0.04} />
      {Array.from({ length: rainN }, (_, i) => (
        <mesh key={i} position={[-1.7 - (i % 4) * 0.22, 0.9 + hMax * 0.35 - Math.floor(i / 4) * 0.28, -1.4 + (i % 5) * 0.55]}>
          <sphereGeometry args={[0.045, 10, 8]} />
          <meshStandardMaterial color="#7FD4FF" roughness={0.2} />
        </mesh>
      ))}
      <mesh position={[-2.4, 1.15 + hMax * 0.4, 0]}>
        <sphereGeometry args={[0.55 + wind * 0.25, 16, 12]} />
        <meshStandardMaterial color="#e8eef2" transparent opacity={0.35} depthWrite={false} />
      </mesh>
      <Tag pos={[-2.6, 1.6 + hMax * 0.3, 0]} text="Windward · rain" tone="ice" />
      <Tag pos={[2.6, 1.15, 0]} text="Lee · rain shadow" tone="sandstone" />
      <Tag pos={[0, hMax + 0.45, 0]} text="Barrier" />
      <Readout pos={[0, hMax + 1.15, 0]}>
        Ridge {ridge.toFixed(2)} · wind {wind.toFixed(2)} · air already dropped its water
      </Readout>
      <StepCamera positions={[[0, 3.2, 9], [-3.2, 2.2, 6], [3.2, 2.0, 6], [0, 3.2, 9]]} />
    </group>
  );
}

export default function RainShadowScene() {
  return (
    <LabStudio
      slug="rain-shadow"
      title="Rain shadow"
      camera={{ position: [0, 3.2, 9], fov: 40 }}
      exaggeration="One ridge, one wind. Real Lake District weather also has fronts."
      liveText="Moist air rises, rains, descends dry. The mountain is a barrier, not a cloud factory."
      fallback={<GenericFallback slug="rain-shadow" title="Rain shadow" caption="Windward rain, leeward dry. Orographic lift." />}
    >
      <Model />
    </LabStudio>
  );
}
