import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera, WaterSheet } from "@/labs/shared/kit";
import { HeightField } from "@/labs/shared/terrain";
import { PBR, useSoilNormal } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const tint = new THREE.Color();

function cliffH(x: number, z: number) {
  const shore = 0.5 * (1 + Math.tanh((z + 0.4) * 3.2));
  let h = 0.04 + shore * 0.08;
  const cliff = 0.5 * (1 + Math.tanh((z - 0.35) * 8));
  h += cliff * 1.15;
  h += 0.08 * Math.sin(x * 1.4) * cliff;
  if (z < -0.2) h = 0.03;
  return Math.max(0.02, h);
}

function Model() {
  const rain = useLabControls((s) => s.params.rain ?? 0.15);
  const q = useQuality();
  const soil = useSoilNormal();
  const nrm = useMemo(() => new THREE.Vector2(0.8, 0.8), []);
  const drop = rain * 0.42;
  const shove = rain * 0.55;
  return (
    <group>
      <StudioFloor size={12} />
      <HeightField
        fn={cliffH}
        width={8.2}
        depth={5.4}
        segX={q.terrain}
        segZ={Math.floor(q.terrain * 0.55)}
        colorFn={(h) => (h < 0.08 ? tint.set(PBR.sand.color) : tint.set("#8a6a48"))}
      />
      <group position={[0, 0, -1.55]}>
        <WaterSheet width={8.2} depth={2.4} y={0.03} />
      </group>
      <group position={[0, 0.48 - drop * 0.55, 0.62 + shove * 0.35]} rotation={[rain * 0.42, 0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[1.05, 1.2, 0.55, 18, 1]} />
          <meshStandardMaterial color="#6b5344" roughness={0.95} normalMap={soil} normalScale={nrm} />
        </mesh>
        <mesh position={[0, -0.08, 0.05]} rotation={[0.95, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 1.45, 8]} />
          <meshStandardMaterial color="#e24b4b" />
        </mesh>
      </group>
      <Tag pos={[-0.2, 1.55 - drop, 0.2]} text="Crown" tone="fault" note="The head of the slump drops. Pore pressure is the trigger, not a beach spit." />
      <Tag pos={[0.2, 0.85 - drop * 0.5, 0.15]} text="Shear surface" note="A curved spoon. Rotational slump, not a rock fall." />
      <Tag pos={[0.4, 0.35, 1.15 + shove]} text="Toe" tone="sandstone" note="The toe shoves forward as the crown drops." />
      <Tag pos={[2.2, 1.35, 1.1]} text="Till · Holderness" tone="moss" note="Glacial till cliffs fail this way. Soft clay, not chalk." />
      <Readout pos={[0, 2.45, 0]}>
        Pore pressure {rain.toFixed(2)} · {rain > 0.45 ? "slump rotating" : "cliff holding"}
      </Readout>
      <StepCamera positions={[[0.2, 2.8, 7.2], [-1.4, 1.6, 4.4], [1.6, 1.8, 4.8], [0.2, 2.8, 7.2]]} />
    </group>
  );
}

export default function MassMovementScene() {
  const rain = useLabControls((s) => s.params.rain ?? 0.15);
  return (
    <LabStudio
      slug="mass-movement"
      title="Mass movement"
      camera={{ position: [0.2, 2.8, 7.2], fov: 40 }}
      exaggeration="Vertical exaggeration ×4. One clean spoon-shaped shear. Real cliffs fail in many slices."
      liveText={`Rotational slump. Pore pressure ${rain.toFixed(2)}. Crown drops, toe shoves.`}
      fallback={<GenericFallback slug="mass-movement" title="Mass movement" caption="Till cliff. Rain rotates a slump on a curved shear." />}
    >
      <Model />
    </LabStudio>
  );
}
