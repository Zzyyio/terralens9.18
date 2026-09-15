import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { HeightField, tubeGeometry } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const tint = new THREE.Color();

function karstH(x: number, z: number) {
  let h = 0.9;
  const fx = Math.abs(((x + 40) % 0.5) - 0.25);
  const fz = Math.abs(((z + 40) % 0.5) - 0.25);
  if (fx < 0.055) h -= 0.1 * (1 - fx / 0.055);
  if (fz < 0.055) h -= 0.1 * (1 - fz / 0.055);
  const d = Math.hypot(x - 1.12, z - 0.22);
  if (d < 0.78) h -= 0.82 * (1 - d / 0.78);
  return Math.max(0.02, h);
}

function karstColor(h: number) {
  if (h < 0.25) return tint.set("#3a342c");
  if (h < 0.7) return tint.set(PBR.limestone.color);
  return tint.set("#e4dcc8");
}

function Stalactite({ pos, h, segs }: { pos: [number, number, number]; h: number; segs: number }) {
  return (
    <mesh position={pos} rotation={[Math.PI, 0, 0]} castShadow>
      <coneGeometry args={[0.042, h, segs]} />
      <meshStandardMaterial
        color={PBR.limestone.color}
        roughness={PBR.limestone.roughness}
        metalness={PBR.limestone.metalness}
      />
    </mesh>
  );
}

function Cave({ segs, nrm, rock }: { segs: number; nrm: THREE.Vector2; rock: THREE.Texture }) {
  const cones = Math.max(16, Math.floor(segs / 3));
  return (
    <group position={[1.12, -0.12, 0.22]}>
      <mesh rotation={[0, 0.2, 0]}>
        <sphereGeometry args={[0.62, segs, Math.max(16, Math.floor(segs / 2)), 0, Math.PI]} />
        <meshStandardMaterial
          color={PBR.limestone.color}
          roughness={0.78}
          metalness={0.04}
          side={THREE.BackSide}
          normalMap={rock}
          normalScale={nrm}
        />
      </mesh>
      <Stalactite pos={[-0.12, 0.42, 0.05]} h={0.28} segs={cones} />
      <Stalactite pos={[0.08, 0.46, -0.1]} h={0.34} segs={cones} />
      <Stalactite pos={[0.18, 0.4, 0.14]} h={0.22} segs={cones} />
      <Stalactite pos={[-0.22, 0.38, -0.12]} h={0.2} segs={cones} />
      <mesh position={[0.05, -0.28, 0.04]}>
        <coneGeometry args={[0.05, 0.18, cones]} />
        <meshStandardMaterial color={PBR.limestone.color} roughness={0.72} />
      </mesh>
    </group>
  );
}

function Model() {
  const q = useQuality();
  const rock = useRockNormal();
  const nrm = useMemo(() => new THREE.Vector2(0.7, 0.7), []);
  const cut = (useLabControls((s) => s.params.cutaway) ?? 0) > 0.5;
  const segs = q.terrain;
  const swallow = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 18; i++) {
      const u = i / 18;
      const x = -0.4 + u * 1.5;
      const z = -1.35 + u * 1.55;
      pts.push([x, karstH(x, z) + 0.025, z]);
    }
    return tubeGeometry(pts, 0.028, 18, 8);
  }, []);
  return (
    <group>
      <StudioFloor size={12} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[7.5, 48]} />
        <meshStandardMaterial color="#121814" roughness={0.96} />
      </mesh>
      <group position={[0, cut ? 0.08 : 0, cut ? 0.35 : 0]}>
        <HeightField fn={karstH} width={5.6} depth={4.4} segX={segs} segZ={Math.floor(segs * 0.75)} colorFn={karstColor} />
        <mesh geometry={swallow}>
          <meshStandardMaterial
            color={PBR.water.color}
            roughness={PBR.water.roughness}
            metalness={PBR.water.metalness}
          />
        </mesh>
      </group>
      <mesh position={[0, karstH(0, -1.1) + 0.01, -1.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.18, 16]} />
        <meshStandardMaterial
          color={PBR.limestone.color}
          roughness={PBR.limestone.roughness}
          metalness={PBR.limestone.metalness}
          normalMap={rock}
          normalScale={nrm}
        />
      </mesh>
      {cut && <Cave segs={q.lathe} nrm={nrm} rock={rock} />}
      <Tag pos={[-0.85, 1.28, -0.85]} text="Clint" tone="sandstone" />
      <Tag pos={[-0.25, 1.12, -0.25]} text="Gryke" />
      <Tag pos={[1.12, 1.15, 0.22]} text="Doline · swallow hole" tone="fault" />
      {cut && <Tag pos={[1.12, 0.35, 0.85]} text="Cave" tone="ice" />}
      <Readout pos={[0, 2.35, 0]}>
        Carbonation along joints · pavement {cut ? "+ cutaway chamber" : "· toggle cutaway"}
      </Readout>
      <StepCamera
        positions={[
          [0.3, 3.6, 6.8],
          [-0.6, 2.2, 3.8],
          [1.2, 2.4, 4.2],
          [1.3, 1.2, 3.4],
        ]}
      />
    </group>
  );
}

export default function KarstScene() {
  const cut = (useLabControls((s) => s.params.cutaway) ?? 0) > 0.5;
  return (
    <LabStudio
      slug="karst"
      title="Karst"
      camera={{ position: [0.3, 3.6, 6.8], fov: 40 }}
      exaggeration="Vertical exaggeration ×6 · limestone pavement and doline"
      liveText={`Karst pavement. Clints and grykes. Doline. ${cut ? "Cave cutaway open." : "Cave hidden."}`}
      fallback={
        <GenericFallback
          slug="karst"
          title="Karst"
          caption="Limestone pavement: clints, grykes, a conical doline, and a cutaway cave with stalactites."
        />
      }
      minDistance={2.6}
      maxDistance={14}
    >
      <fog attach="fog" args={["#07090C", 10, 22]} />
      <Model />
    </LabStudio>
  );
}
