import { useMemo } from "react";
import * as THREE from "three";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { HeightField } from "@/labs/shared/terrain";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";

function rockFn(x: number, y: number) {
  const u = (x + 3.4) / 6.8;
  const trough = Math.exp(-((x + 0.2) ** 2) / 0.55) * (0.55 + 0.35 * (y + 2.2) / 5);
  const left = 1.85 * Math.exp(-((x + 1.7) ** 2 + (y + 1.4) ** 2) / 1.15);
  const right = 1.65 * Math.exp(-((x - 1.35) ** 2 + (y + 1.6) ** 2) / 0.95);
  const horn = 0.55 * Math.exp(-((x + 0.15) ** 2 + (y + 1.85) ** 2) / 0.18);
  const floor = 0.12 + 0.04 * Math.sin(x * 2.2) * Math.cos(y * 1.4);
  return Math.max(0.04, left + right + horn + floor - trough * 1.15) * (0.85 + 0.08 * (1 - u));
}

/** Ice as a thick tongue sitting in the U-trough — not a white sticker. */
function IceTongue({ advance }: { advance: number }) {
  const trueScale = useLabControls((s) => s.trueScale);
  const v = trueScale ? 1 / 5 : 1;
  const len = 1.35 + advance * 2.7;
  const thick = (0.34 + advance * 0.52) * v;
  const width = 0.92 + advance * 0.12;
  return (
    <group position={[-0.18, 0.18 + thick * 0.22, -0.55 + advance * 0.95]}>
      <mesh scale={[width, thick, len]} rotation={[0.16, 0, 0]} castShadow>
        <sphereGeometry args={[0.58, 48, 32]} />
        <meshPhysicalMaterial
          color={PBR.ice.color}
          roughness={0.12}
          metalness={0.04}
          transmission={0.44}
          thickness={1.25}
          ior={1.31}
          transparent
          opacity={0.88}
        />
      </mesh>
    </group>
  );
}

function Model() {
  useLabTick(1 / 14);
  const t = useLabControls((s) => s.t);
  const q = useQuality();
  const nrm = useRockNormal();
  const advance = 0.15 + t * 0.85;
  const trueScale = useLabControls((s) => s.trueScale);
  const vScale = trueScale ? 1 / 6 : 1;
  const colorFn = useMemo(
    () => (h: number) => {
      const c = new THREE.Color();
      if (h > 1.55) c.set("#F4EFE6");
      else if (h > 0.9) c.set("#8a8478");
      else c.set(PBR.rock.color);
      return c;
    },
    [],
  );
  return (
    <group>
      <StudioFloor size={12} />
      <HeightField
        fn={rockFn}
        width={7.2}
        depth={6.4}
        segX={q.terrain}
        segZ={q.terrain}
        colorFn={colorFn}
        position={[0, 0, 0]}
        vScale={vScale}
      />
      <IceTongue advance={advance} />
      <mesh position={[-0.2, 0.16, 2.35]} rotation={[0.05, 0.1, 0]}>
        <boxGeometry args={[1.7, 0.22, 0.38]} />
        <meshStandardMaterial color="#7C9A6A" roughness={0.92} normalMap={nrm} />
      </mesh>
      <mesh position={[1.55, 0.18, 1.55]} rotation={[0, 0.55, 0]} scale={[1.15, 0.35, 0.55]}>
        <sphereGeometry args={[0.55, 24, 16]} />
        <meshStandardMaterial color="#C4A574" roughness={0.9} />
      </mesh>
      <Tag pos={[-1.7, 1.55, -0.4]} text="Cirque" tone="ice" note="The armchair the ice sat in. A steep-walled bowl, often with a tarn." />
      <Tag pos={[-0.1, 2.15, -1.6]} text="Horn" note="Three cirques back-to-back leave a pyramidal peak." />
      <Tag pos={[0.9, 1.85, -1.1]} text="Arête" tone="sandstone" note="Two cirques back-to-back leave a knife ridge." />
      <Tag pos={[-0.2, 0.55, 0.9]} text="U-trough" tone="moss" note="Ice cut a wide floor and steep walls. Yosemite is this, not a river canyon." />
      <Tag pos={[-0.2, 0.45, 2.4]} text="Terminal moraine" tone="moss" note="Advance scrapes. Retreat dumps the load as a ridge of till." />
      <Tag pos={[1.55, 0.7, 1.55]} text="Drumlin" tone="sandstone" note="A streamlined hill of till. The blunt end faces up-ice." />
      <Readout pos={[0, 2.55, 0]}>
        Ice has thickness. Play advance / retreat · Lake District / Yosemite
      </Readout>
      <StepCamera
        positions={[
          [3.2, 3.4, 6.4],
          [0.4, 1.6, 4.2],
          [-2.4, 2.8, 3.4],
          [3.2, 3.4, 6.4],
        ]}
      />
    </group>
  );
}

export default function GlaciersScene() {
  return (
    <LabStudio
      slug="glaciers"
      title="Glaciers"
      camera={{ position: [3.2, 3.4, 6.4], fov: 40 }}
      exaggeration="Vertical exaggeration ×6. Ice has thickness; it is not a white sticker."
      liveText="Cirque, arête, horn, U-trough, moraine. Ice advances and retreats as a thick flow."
      fallback={
        <GenericFallback
          slug="glaciers"
          title="Glaciers"
          caption="Cirque, horn, arête, U-trough, moraine. Ice is a thick river of ice."
        />
      }
    >
      <Model />
    </LabStudio>
  );
}
