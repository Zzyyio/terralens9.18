import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera, Arrow3, WaterSheet } from "@/labs/shared/kit";
import { PBR, useRockNormal, useSoilNormal } from "@/labs/shared/materials";
import { HeightField, latheGeometry } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const tint = new THREE.Color();
const HEADS = [-4.15, -1.38, 1.38, 4.15] as const;
const STAGES = ["Cave", "Arch", "Stack", "Stump"] as const;

function coastH(x: number, z: number, wave: number) {
  const shore = 0.5 * (1 + Math.tanh(z * 2.4));
  let h = 0.03 + shore * 0.16;
  h += (1 - wave) * 0.13 * Math.exp(-((z - 0.38) ** 2) / 0.048);
  const cliff = 0.5 * (1 + Math.tanh((z - (0.95 + wave * 0.12)) * 9));
  h += cliff * (0.32 + wave * 0.5);
  for (const hx of HEADS) {
    const head = Math.exp(-((x - hx) ** 2) / 0.26) * Math.exp(-((z - 0.12) ** 2) / 0.85);
    h += (0.5 + wave * 0.18) * head * Math.max(0.15, 0.9 - Math.max(0, -z) * 0.45);
  }
  if (z < -0.15) h = Math.min(h, 0.02 + Math.max(0, 0.08 + z * 0.04));
  return Math.max(0.01, h);
}

function coastColor(h: number) {
  if (h < 0.06) return tint.set(PBR.water.color);
  if (h < 0.22) return tint.set(PBR.sand.color);
  if (h < 0.55) return tint.set("#8a6a48");
  return tint.set(PBR.rock.color);
}

function pillar(h: number, r: number, segs: number) {
  return latheGeometry(
    [
      [0.01, h],
      [r * 0.52, h * 0.94],
      [r * 0.68, h * 0.55],
      [r * 0.92, h * 0.12],
      [r, 0],
    ],
    segs,
  );
}

function Model() {
  const q = useQuality();
  const rock = useRockNormal();
  const soil = useSoilNormal();
  const nrm = useMemo(() => new THREE.Vector2(0.6, 0.6), []);
  const waveP = useLabControls((s) => s.params.wave);
  const cons = useLabControls((s) => s.params.constructive);
  const stage = Math.round(useLabControls((s) => s.params.stage ?? 1));
  const wave = waveP ?? ((cons ?? 1) > 0.5 ? 0 : 1);
  const fn = useMemo(() => (x: number, y: number) => coastH(x, y, wave), [wave]);
  const segs = q.lathe;
  const stack = useMemo(() => pillar(0.95, 0.22, segs), [segs]);
  const stump = useMemo(() => pillar(0.22, 0.26, segs), [segs]);
  const leg = useMemo(() => pillar(0.62, 0.16, segs), [segs]);
  const till = wave > 0.5;
  const trueScale = useLabControls((s) => s.trueScale);
  const vScale = trueScale ? 1 / 6 : 1;
  return (
    <group>
      <StudioFloor size={14} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[9.5, 48]} />
        <meshStandardMaterial color="#121814" roughness={0.96} normalMap={soil} normalScale={nrm} />
      </mesh>
      <HeightField fn={fn} width={11.2} depth={5.6} segX={q.terrain} segZ={Math.floor(q.terrain * 0.5)} colorFn={coastColor} vScale={vScale} />
      <group position={[0, 0, -1.55]}>
        <WaterSheet width={11} depth={2.4} y={0.016} opacity={0.76} />
      </group>
      <mesh position={[HEADS[0], 0.32, -0.42]}>
        <cylinderGeometry args={[0.16, 0.2, 0.38, Math.max(16, Math.floor(segs / 4))]} />
        <meshStandardMaterial color="#07090C" roughness={0.95} />
      </mesh>
      <group position={[HEADS[1], 0, -0.55]}>
        <mesh geometry={leg} position={[-0.28, 0, 0]} castShadow>
          <meshStandardMaterial {...PBR.rock} normalMap={rock} normalScale={nrm} />
        </mesh>
        <mesh geometry={leg} position={[0.28, 0, 0]} castShadow>
          <meshStandardMaterial {...PBR.rock} normalMap={rock} normalScale={nrm} />
        </mesh>
        <mesh position={[0, 0.68, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <torusGeometry args={[0.3, 0.11, 14, segs, Math.PI]} />
          <meshStandardMaterial {...PBR.rock} normalMap={rock} normalScale={nrm} />
        </mesh>
      </group>
      <mesh geometry={stack} position={[HEADS[2], 0.02, -0.78]} castShadow>
        <meshStandardMaterial {...PBR.rock} normalMap={rock} normalScale={nrm} />
      </mesh>
      <mesh geometry={stump} position={[HEADS[3], 0.02, -0.92]} castShadow>
        <meshStandardMaterial color="#8B9A97" roughness={0.9} metalness={0.04} normalMap={rock} normalScale={nrm} />
      </mesh>
      <Arrow3 from={[-3.5, 0.28, 0.42]} to={[3.6, 0.24, 0.12]} color="#3EE0C6" radius={0.028} />
      <Tag pos={[HEADS[0], 1.25, 0.2]} text="Cave" tone="sandstone" note="Waves excavate a weakness. Same rock as the arch, stack and stump." />
      <Tag pos={[HEADS[1], 1.15, 0.15]} text="Arch" tone="sandstone" note="Two caves meet. The roof is still the headland." />
      <Tag pos={[HEADS[2], 1.25, -0.6]} text="Stack" note="The roof collapsed. A pillar of the same rock stands off the cliff." />
      <Tag pos={[HEADS[3], 0.55, -0.7]} text="Stump" note="The stack has fallen. A stump is the last of the headland." />
      <Tag pos={[0, 0.55, 0.55]} text="Longshore drift" tone="glacier" note="Swash at an angle, backwash down the slope. Sediment walks along the beach." />
      {till && <Tag pos={[2.2, 1.05, 1.15]} text="Till · Holderness" tone="moss" note="Glacial mud-gravel. Soft cliff, southward drift, Spurn Head spit." />}
      <Tag pos={[0, 0.42, -1.7]} text={wave < 0.5 ? "Constructive · berm" : "Destructive · cut cliff"} tone="ice" note={wave < 0.5 ? "Low steepness: swash stronger than backwash. Beach builds." : "Steep storm waves: backwash strips the beach and undercuts the cliff."} />
      <Readout pos={[0, 2.55, 0]}>
        Wave {wave < 0.5 ? "constructive" : "destructive"} · stage {STAGES[Math.min(3, Math.max(0, stage))]} · cave→stump
      </Readout>
      <StepCamera
        positions={[
          [0.2, 3.6, 8.2],
          [HEADS[Math.min(3, Math.max(0, stage))], 2.2, 4.6],
          [0.2, 2.4, 5.2],
          [3.2, 2.6, 5.8],
        ]}
      />
    </group>
  );
}

export default function CoastsScene() {
  const waveP = useLabControls((s) => s.params.wave);
  const cons = useLabControls((s) => s.params.constructive);
  const wave = waveP ?? ((cons ?? 1) > 0.5 ? 0 : 1);
  return (
    <LabStudio
      slug="coasts"
      title="Coasts"
      camera={{ position: [0.2, 3.6, 8.2], fov: 40 }}
      exaggeration="Vertical exaggeration ×6 · headland life and the beach budget"
      liveText={`Coast. ${wave < 0.5 ? "Constructive waves build a berm." : "Destructive waves cut the cliff."} Cave, arch, stack, stump.`}
      fallback={
        <GenericFallback
          slug="coasts"
          title="Coasts"
          caption="Headland stages cave–arch–stack–stump. Constructive berm vs destructive cliff. Longshore drift."
        />
      }
      minDistance={3}
      maxDistance={16}
    >
      <fog attach="fog" args={["#07090C", 12, 26]} />
      <Model />
    </LabStudio>
  );
}
