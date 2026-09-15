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

function erosionH(x: number, z: number, lip: number) {
  const up = 0.5 * (1 + Math.tanh((lip - x) * 5.8));
  const bed = 0.16 + 1.42 * up;
  const vW = THREE.MathUtils.lerp(0.2, 1.25, THREE.MathUtils.smoothstep(lip - 0.2, lip + 2.6, x));
  const cut = (0.2 + 0.58 * up) * Math.exp(-(z * z) / (vW * vW * 0.5));
  const gorge = Math.exp(-((x - (lip + 0.85)) ** 2) / 0.7) * (1 - up);
  const hills = 0.1 * (1 - Math.min(1, Math.abs(x) / 6)) * Math.cos(z * 2.4);
  const pothole = 0.06 * Math.exp(-((x - (lip + 1.6)) ** 2) / 0.08) * Math.exp(-(z * z) / 0.04);
  return Math.max(0.02, bed - cut - 0.18 * gorge * Math.exp(-(z * z) / 0.32) + Math.abs(hills) - pothole);
}

function elevColor(h: number) {
  if (h < 0.22) return tint.set(PBR.soil.color);
  if (h < 0.55) return tint.set(PBR.crust.color);
  if (h < 1.05) return tint.set(PBR.rock.color);
  return tint.set(PBR.granite.color);
}

function WaterMat() {
  return (
    <meshStandardMaterial
      color={PBR.water.color}
      roughness={PBR.water.roughness}
      metalness={PBR.water.metalness}
    />
  );
}

function Model() {
  useLabTick(1 / 14);
  const t = useLabControls((s) => s.t);
  const q = useQuality();
  const rock = useRockNormal();
  const soil = useSoilNormal();
  const nrm = useMemo(() => new THREE.Vector2(0.5, 0.5), []);
  const lip = 1.9 - t * 4.6;
  const fn = useMemo(() => (x: number, y: number) => erosionH(x, y, lip), [lip]);
  const water = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 88; i++) {
      const x = -5.5 + (i / 88) * 11;
      pts.push([x, erosionH(x, 0, lip) + 0.03, 0]);
    }
    return tubeGeometry(pts, 0.038, 88, 8);
  }, [lip]);
  const fall = useMemo(() => {
    const y0 = erosionH(lip - 0.05, 0, lip) + 0.02;
    const y1 = erosionH(lip + 0.22, 0, lip) + 0.02;
    return tubeGeometry(
      [
        [lip - 0.08, y0, 0],
        [lip, (y0 + y1) * 0.5, 0],
        [lip + 0.22, y1, 0],
      ],
      0.032,
      16,
      8,
    );
  }, [lip]);
  const segs = q.terrain;
  const lipY = erosionH(lip, 0, lip);
  const poolY = erosionH(lip + 0.35, 0, lip);
  const knickY = lipY + 0.55;
  const drop = Math.max(0.2, erosionH(lip - 0.15, 0, lip) - erosionH(lip + 0.15, 0, lip));
  return (
    <group>
      <StudioFloor size={14} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 0]} receiveShadow>
        <circleGeometry args={[9, 48]} />
        <meshStandardMaterial color="#121814" roughness={0.96} normalMap={soil} normalScale={nrm} />
      </mesh>
      <HeightField fn={fn} width={11.4} depth={4.6} segX={segs} segZ={Math.floor(segs * 0.45)} colorFn={elevColor} />
      <mesh geometry={water}>
        <WaterMat />
      </mesh>
      <mesh geometry={fall}>
        <WaterMat />
      </mesh>
      <mesh position={[lip, lipY * 0.45, 0]} castShadow>
        <boxGeometry args={[0.08, drop, 0.55]} />
        <meshStandardMaterial color={PBR.rock.color} roughness={0.88} normalMap={rock} normalScale={nrm} />
      </mesh>
      <mesh position={[lip + 0.38, poolY + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.22, 20]} />
        <meshStandardMaterial
          color={PBR.water.color}
          roughness={0.08}
          metalness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh position={[lip + 1.6, erosionH(lip + 1.6, 0, lip) + 0.04, 0]}>
        <sphereGeometry args={[0.07, 12, 10]} />
        <meshStandardMaterial color={PBR.granite.color} roughness={0.7} metalness={0.06} />
      </mesh>
      <Tag pos={[lip, knickY, 0.55]} text="Knickpoint · fall lip" tone="ice" />
      <Tag pos={[-3.6, 1.85, 0.15]} text="Incision · V-valley" />
      <Tag pos={[lip + 0.9, 0.95, 0.45]} text="Gorge" tone="sandstone" />
      <Tag pos={[2.6, 0.72, 1.05]} text="Lateral erosion" tone="sandstone" />
      <Readout pos={[0, 2.85, 0]}>
        Lip x={lip.toFixed(2)} · play retreats the fall upstream · gorge is the scar · ×12
      </Readout>
      <StepCamera
        positions={[
          [0.2, 4.6, 8.2],
          [-3.4, 3.2, 5.4],
          [lip, 2.6, 5.8],
          [2.8, 2.4, 5.6],
        ]}
      />
    </group>
  );
}

export default function RiverErosionScene() {
  const t = useLabControls((s) => s.t);
  return (
    <LabStudio
      slug="river-erosion"
      title="River erosion"
      camera={{ position: [0.2, 4.6, 8.2], fov: 40 }}
      exaggeration="Vertical exaggeration ×12 on the long profile"
      liveText={`Knickpoint retreating upstream. t=${t.toFixed(2)}. V-valley incision, then lateral widening.`}
      fallback={
        <GenericFallback
          slug="river-erosion"
          title="River erosion"
          caption="Long-profile height field: waterfall knickpoint walks upstream, V-valley then lateral erosion."
        />
      }
      minDistance={3.2}
      maxDistance={16}
    >
      <fog attach="fog" args={["#07090C", 12, 26]} />
      <Model />
    </LabStudio>
  );
}
