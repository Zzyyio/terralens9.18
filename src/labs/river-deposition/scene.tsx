import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { PBR, useRockNormal, useSoilNormal } from "@/labs/shared/materials";
import { HeightField, tubeGeometry } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const tint = new THREE.Color();

function channelZ(x: number) {
  return 1.08 * Math.sin(((x + 4.3) / 8.6) * Math.PI);
}

function depH(x: number, z: number) {
  const cz = channelZ(x);
  const d = z - cz;
  const ad = Math.abs(d);
  const inner = d * cz < 0;
  let h = 0.27;
  const dChan = z - (cz + Math.sign(cz || 1) * 0.09);
  h -= 0.17 * Math.exp(-(dChan * dChan) / 0.075);
  if (inner && ad > 0.2 && ad < 1.2) h += 0.1 * Math.exp(-((ad - 0.48) ** 2) / 0.09);
  if (!inner && ad > 0.22 && ad < 0.5) h += 0.035;
  h += 0.12 * Math.exp(-((ad - 0.52) ** 2) / 0.016);
  if (x > 2.55) {
    const u = (x - 2.55) / 2.1;
    const fade = Math.max(0, 1 - u);
    h += 0.11 * fade * Math.exp(-((z + 0.72 * (0.55 + u)) ** 2) / 0.11);
    h += 0.11 * fade * Math.exp(-(z * z) / 0.1);
    h += 0.11 * fade * Math.exp(-((z - 0.72 * (0.55 + u)) ** 2) / 0.11);
    if (x > 3.85) h = Math.min(h, 0.045);
  }
  return Math.max(0.02, h);
}

function depColor(h: number) {
  if (h < 0.12) return tint.set(PBR.water.color);
  if (h < 0.22) return tint.set(PBR.sand.color);
  if (h < 0.32) return tint.set(PBR.crust.color);
  return tint.set(PBR.soil.color);
}

function Model() {
  useLabTick(1 / 12);
  const t = useLabControls((s) => s.t);
  const discharge = useLabControls((s) => s.params.discharge ?? t);
  const q = useQuality();
  const rock = useRockNormal();
  const soil = useSoilNormal();
  const nrm = useMemo(() => new THREE.Vector2(0.45, 0.45), []);
  const qVal = THREE.MathUtils.clamp(discharge, 0, 1);
  const floodY = 0.155 + qVal * 0.2;
  const overbank = floodY > 0.27;
  const water = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 90; i++) {
      const x = -4.4 + (i / 90) * 8.6;
      const z = channelZ(x);
      pts.push([x, depH(x, z) + 0.028, z]);
    }
    return tubeGeometry(pts, 0.04, 90, 8);
  }, []);
  const segs = q.terrain;
  return (
    <group>
      <StudioFloor size={14} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 0]} receiveShadow>
        <circleGeometry args={[9, 48]} />
        <meshStandardMaterial color="#121814" roughness={0.96} normalMap={soil} normalScale={nrm} />
      </mesh>
      <HeightField fn={depH} width={9.6} depth={5.2} segX={segs} segZ={Math.floor(segs * 0.55)} colorFn={depColor} />
      <mesh geometry={water}>
        <meshStandardMaterial
          color={PBR.water.color}
          roughness={PBR.water.roughness}
          metalness={PBR.water.metalness}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.2, floodY, 0.15]}>
        <planeGeometry args={[8.8, 3.6]} />
        <meshStandardMaterial
          color={PBR.water.color}
          roughness={0.08}
          metalness={0.1}
          transparent
          opacity={0.22 + qVal * 0.28}
        />
      </mesh>
      <mesh position={[4.15, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.35, 28]} />
        <meshStandardMaterial color={PBR.water.color} roughness={0.14} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[4.9, 5.15, 40]} />
        <meshStandardMaterial color={PBR.rock.color} roughness={0.9} normalMap={rock} normalScale={nrm} />
      </mesh>
      <Tag pos={[-0.15, 0.72, 0.15]} text="Point bar" tone="sandstone" />
      <Tag pos={[0.55, 0.95, 1.85]} text="Cut bank" tone="fault" />
      <Tag pos={[0.35, 0.78, 1.35]} text="Levée" tone="moss" />
      <Tag pos={[1.4, 0.62, -1.35]} text="Floodplain" tone="moss" />
      <Tag pos={[3.55, 0.55, 0.15]} text="Delta · finger lobes" tone="ice" />
      <Readout pos={[0, 2.55, 0]}>
        Discharge {qVal.toFixed(2)} · flood {floodY.toFixed(2)} · {overbank ? "overbank" : "in-channel"}
      </Readout>
      <StepCamera
        positions={[
          [0.3, 4.4, 7.6],
          [-1.2, 2.4, 4.6],
          [1.2, 2.2, 5.0],
          [3.6, 2.4, 5.4],
        ]}
      />
    </group>
  );
}

export default function RiverDepositionScene() {
  const t = useLabControls((s) => s.t);
  return (
    <LabStudio
      slug="river-deposition"
      title="River deposition"
      camera={{ position: [0.3, 4.4, 7.6], fov: 40 }}
      exaggeration="Vertical exaggeration ×8 · meander, levée, delta"
      liveText={`Meander deposition. Flood stage ${t.toFixed(2)}. Point bar, levée, floodplain, delta.`}
      fallback={
        <GenericFallback
          slug="river-deposition"
          title="River deposition"
          caption="Meander height field: point bar, cut bank, levées, floodplain, delta fingers. Play floods the plain."
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
