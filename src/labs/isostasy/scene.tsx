import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera, IceVolume, WaterSheet, CrustalRaft } from "@/labs/shared/kit";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { GenericFallback } from "@/labs/shared/fallback";

function Model() {
  const ice = useLabControls((s) => s.params.ice ?? 0.55);
  const trueScale = useLabControls((s) => s.trueScale);
  const rock = useRockNormal();
  const nrm = useMemo(() => new THREE.Vector2(0.5, 0.5), []);
  const sink = trueScale ? ice * 0.12 : ice * 0.55;
  const iceH = trueScale ? ice * 0.18 : ice * 0.9;
  return (
    <group>
      <StudioFloor size={10} />
      <mesh position={[0, -0.28, 0]} receiveShadow>
        <cylinderGeometry args={[3.15, 3.25, 1.15, 48, 1]} />
        <meshStandardMaterial
          color={PBR.mantle.color}
          roughness={0.93}
          metalness={0.06}
          normalMap={rock}
          normalScale={nrm}
        />
      </mesh>
      <CrustalRaft size={[3.4, 0.62, 1.6]} position={[0, 0.42 - sink, 0]} />
      {ice > 0.04 && (
        <IceVolume size={[2.15, Math.max(0.08, iceH), 1.55]} position={[0, 0.74 - sink + iceH * 0.5, 0]} />
      )}
      <WaterSheet width={6.4} depth={6.4} y={0.55} opacity={0.55} />
      <Tag
        pos={[0, 1.15 - sink + iceH, 0]}
        text={ice > 0.2 ? "Ice load" : "Unloaded"}
        tone="ice"
        note="Ice is a load. Load down, unload up. Real rebound is millimetres a year."
      />
      <Tag
        pos={[0, 0.5 - sink, 1.4]}
        text="Crustal raft"
        tone="moss"
        note="Continental crust floats on solid mantle that creeps. Not a magma ocean."
      />
      <Tag
        pos={[0, -0.15, 1.7]}
        text="Mantle · solid, creeps"
        tone="sandstone"
        note="Solid rock. Isostasy is a slow viscous balance, not a flood myth."
      />
      <Readout pos={[0, 2.35, 0]}>
        Ice load {ice.toFixed(2)} · {ice > 0.5 ? "depressed" : "rebounds"} · millimetres a year in life
      </Readout>
      <StepCamera positions={[[2.6, 1.8, 5.4], [0.2, 1.2, 4.2], [2.4, 0.4, 4], [2.6, 1.8, 5.4]]} />
    </group>
  );
}

export default function IsostasyScene() {
  return (
    <LabStudio
      slug="isostasy"
      title="Isostasy"
      camera={{ position: [2.6, 1.8, 5.4], fov: 40 }}
      exaggeration="Teaching sink. True scale is millimetres a year. Mantle is solid rock that creeps."
      liveText="Crust floats. Ice is a load. Load down, unload up. Scotland and Hudson Bay."
      fallback={<GenericFallback slug="isostasy" title="Isostasy" caption="Ice load sinks the crust. Unload, it rebounds." />}
      target={[0, 0.4, 0]}
    >
      <Model />
    </LabStudio>
  );
}
