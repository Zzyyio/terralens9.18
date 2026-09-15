import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera, Arrow3 } from "@/labs/shared/kit";
import { PBR, useSoilNormal } from "@/labs/shared/materials";
import { HeightField, latheGeometry } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const tint = new THREE.Color();

function yardangH(x: number, z: number) {
  let h = 0.05;
  for (let i = -2; i <= 2; i++) {
    const zc = i * 0.58;
    const ridge = Math.exp(-((z - zc) ** 2) / 0.032);
    const elongate = Math.exp(-(x * x) / 2.6);
    const taper = 0.38 + 0.62 * (0.5 + 0.5 * Math.tanh(-x * 1.15));
    h += 0.44 * ridge * elongate * taper;
  }
  return h;
}

function barchanH(x: number, z: number) {
  const stoss = Math.exp(-((x + 0.18) ** 2) / 0.26) * Math.exp(-(z * z) / 0.4);
  const slip = x > 0.02 ? Math.max(0, 1 - x * 2.35) : 1;
  const hornL = Math.exp(-((x - 0.58) ** 2) / 0.16) * Math.exp(-((z - 0.6) ** 2) / 0.065);
  const hornR = Math.exp(-((x - 0.58) ** 2) / 0.16) * Math.exp(-((z + 0.6) ** 2) / 0.065);
  return 0.02 + 0.54 * stoss * Math.max(0, slip) + 0.2 * (hornL + hornR);
}

function sandColor(h: number) {
  if (h < 0.08) return tint.set("#b39262");
  if (h < 0.28) return tint.set(PBR.sand.color);
  return tint.set("#e0c48a");
}

function SandMat({ nrm, soil }: { nrm: THREE.Vector2; soil: THREE.Texture }) {
  return (
    <meshStandardMaterial
      color={PBR.sand.color}
      roughness={PBR.sand.roughness}
      metalness={PBR.sand.metalness}
      normalMap={soil}
      normalScale={nrm}
    />
  );
}

function Model() {
  useLabTick(1 / 16);
  const t = useLabControls((s) => s.t);
  const q = useQuality();
  const soil = useSoilNormal();
  const nrm = useMemo(() => new THREE.Vector2(0.85, 0.85), []);
  const segs = Math.max(48, Math.floor(q.terrain * 0.55));
  const migrate = t * 1.35;
  const nabkha = useMemo(
    () =>
      latheGeometry(
        [
          [0.01, 0.22],
          [0.18, 0.16],
          [0.42, 0.06],
          [0.7, 0],
        ],
        q.lathe,
      ),
    [q.lathe],
  );
  return (
    <group>
      <StudioFloor size={13} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 0]} receiveShadow>
        <circleGeometry args={[8.5, 48]} />
        <SandMat nrm={nrm} soil={soil} />
      </mesh>
      <HeightField
        fn={yardangH}
        width={4.6}
        depth={3.6}
        segX={segs}
        segZ={Math.floor(segs * 0.75)}
        colorFn={sandColor}
        position={[-2.35, 0, 0]}
      />
      <HeightField
        fn={barchanH}
        width={2.5}
        depth={2.2}
        segX={segs}
        segZ={segs}
        colorFn={sandColor}
        position={[1.55 + migrate, 0, 0.55]}
      />
      <HeightField
        fn={barchanH}
        width={2.2}
        depth={1.95}
        segX={Math.floor(segs * 0.85)}
        segZ={Math.floor(segs * 0.85)}
        colorFn={sandColor}
        position={[2.05 + migrate * 0.85, 0, -0.85]}
      />
      <mesh geometry={nabkha} position={[0.15, 0, 1.55]} castShadow>
        <SandMat nrm={nrm} soil={soil} />
      </mesh>
      <Arrow3 from={[-3.4, 0.85, 0]} to={[3.3, 0.85, 0]} color="#E8B86D" radius={0.03} />
      <Tag pos={[-2.35, 1.15, -1.15]} text="Yardang · carved" tone="sandstone" />
      <Tag pos={[1.55 + migrate, 0.95, 0.55]} text="Barchan · built" tone="sandstone" />
      <Tag pos={[2.15 + migrate, 0.55, 1.05]} text="Horns downwind" tone="moss" />
      <Readout pos={[0, 2.35, 0]}>Wind → · yardangs erode parallel to it · barchans migrate, horns downwind</Readout>
      <StepCamera
        positions={[
          [0.2, 3.4, 7.2],
          [-2.4, 2.2, 4.6],
          [1.8 + migrate, 2.0, 4.4],
          [0.2, 3.4, 7.2],
        ]}
      />
    </group>
  );
}

export default function AeolianScene() {
  const t = useLabControls((s) => s.t);
  return (
    <LabStudio
      slug="aeolian"
      title="Wind landforms"
      camera={{ position: [0.2, 3.4, 7.2], fov: 40 }}
      exaggeration="Vertical exaggeration ×8 · carved yardangs, built barchans"
      liveText={`Aeolian. Wind to +x. Barchans migrating ${t.toFixed(2)}. Horns point downwind.`}
      fallback={
        <GenericFallback
          slug="aeolian"
          title="Wind landforms"
          caption="Yardangs are wind-carved ridges. Barchans are built crescents with horns downwind."
        />
      }
      minDistance={2.8}
      maxDistance={14}
    >
      <fog attach="fog" args={["#07090C", 11, 24]} />
      <Model />
    </LabStudio>
  );
}
