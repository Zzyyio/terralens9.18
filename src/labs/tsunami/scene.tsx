import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { HeightField } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

function MorphWater({
  width,
  depth,
  position,
  plan,
}: {
  width: number;
  depth: number;
  position: [number, number, number];
  plan?: boolean;
}) {
  const q = useQuality();
  const t = useLabControls((s) => s.t);
  const tRef = useRef(t);
  tRef.current = t;
  const geom = useMemo(
    () =>
      new THREE.PlaneGeometry(
        width,
        depth,
        Math.max(28, Math.floor(q.terrain / 4)),
        Math.max(12, Math.floor(q.terrain / 10)),
      ),
    [width, depth, q.terrain],
  );
  const orig = useMemo(() => Float32Array.from(geom.attributes.position.array as Float32Array), [geom]);
  useFrame(() => {
    const pos = geom.attributes.position;
    const u = tRef.current;
    const slip = Math.min(1, u / 0.12);
    for (let i = 0; i < pos.count; i++) {
      const x = orig[i * 3]!;
      const y = orig[i * 3 + 1]!;
      let h = 0;
      if (plan) {
        const travel = -1.7 + u * 3.4;
        const r = Math.hypot(x - travel, y * 0.35);
        const shoal = THREE.MathUtils.smoothstep(0.2, 1.55, x);
        const amp = 0.05 + shoal * 0.42;
        const lambda = 1.9 - shoal * 1.2;
        h = amp * Math.sin((r / lambda) * Math.PI * 2) * Math.exp(-((x - travel) ** 2) / (lambda * 0.9));
      } else {
        const shoal = THREE.MathUtils.smoothstep(0.25, 1.85, x);
        const c = THREE.MathUtils.lerp(4.8, 1.5, shoal);
        const amp = 0.055 + shoal * 0.58;
        const lambda = 2.15 - shoal * 1.4;
        const travel = -2.2 + u * c * 0.7;
        const pulse = Math.exp(-((x - travel) ** 2) / (lambda * 0.65));
        const uplift = Math.exp(-((x + 2.05) ** 2) / 0.2) * slip * 0.18;
        h = uplift + amp * Math.sin(((x - travel) / lambda) * Math.PI * 2) * pulse * Math.min(1, u * 1.7);
      }
      pos.setZ(i, orig[i * 3 + 2]! + h);
    }
    pos.needsUpdate = true;
    geom.computeVertexNormals();
  });
  return (
    <mesh geometry={geom} rotation={[-Math.PI / 2, 0, 0]} position={position}>
      <meshStandardMaterial
        color={PBR.water.color}
        roughness={PBR.water.roughness}
        metalness={PBR.water.metalness}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function Profile() {
  const t = useLabControls((s) => s.t);
  const q = useQuality();
  const nrm = useRockNormal();
  const lift = Math.min(1, t / 0.12) * 0.26;
  const segs = Math.max(12, Math.floor(q.sphere / 6));
  const coastFn = useMemo(
    () => (x: number, y: number) => {
      const shelf = THREE.MathUtils.smoothstep(-0.4, 0.9, x);
      return 0.08 + shelf * (0.85 + Math.sin(y * 2.2) * 0.08);
    },
    [],
  );
  const coastColor = useMemo(() => {
    const c = new THREE.Color(PBR.crust.color);
    return () => c;
  }, []);
  return (
    <group position={[-3.15, 0, 0]}>
      <mesh position={[0.1, -0.12, 0]} receiveShadow>
        <boxGeometry args={[5.1, 0.28, 2.3, segs, 1, segs]} />
        <meshStandardMaterial
          color={PBR.rock.color}
          roughness={PBR.rock.roughness}
          metalness={PBR.rock.metalness}
          normalMap={nrm}
          normalScale={new THREE.Vector2(0.6, 0.6)}
        />
      </mesh>
      <mesh position={[-2.05, -0.02 + lift, 0]} castShadow>
        <boxGeometry args={[1.35, 0.22, 2.15, segs, 1, segs]} />
        <meshStandardMaterial color={PBR.crust.color} roughness={0.88} metalness={0.03} />
      </mesh>
      <MorphWater width={5.0} depth={2.15} position={[0.05, 0.38, 0]} />
      <HeightField
        fn={coastFn}
        width={1.7}
        depth={2.3}
        segX={Math.max(16, Math.floor(q.terrain / 8))}
        segZ={Math.max(12, Math.floor(q.terrain / 10))}
        colorFn={coastColor}
        position={[2.15, 0.02, 0]}
      />
      <Tag pos={[-2.05, 0.85 + lift, 0]} text="Seafloor slip" tone="magma" occlude={false} />
      <Tag pos={[-0.55, 0.95, 0.2]} text="Deep = fast and low" tone="ice" occlude={false} />
      <Tag pos={[1.55, 1.15, 0]} text="Shoaling" tone="glacier" occlude={false} />
    </group>
  );
}

function Plan() {
  const t = useLabControls((s) => s.t);
  const q = useQuality();
  const coastFn = useMemo(
    () => (x: number, y: number) => {
      const shore = THREE.MathUtils.smoothstep(0.35, 1.15, x);
      const bay = Math.exp(-((y - 0.15) ** 2) / 0.55) * 0.18;
      return shore * (0.55 + Math.sin(y * 3.1) * 0.08) - bay * shore;
    },
    [],
  );
  const coastColor = useMemo(() => {
    const wet = new THREE.Color("#5d7a52");
    const dry = new THREE.Color(PBR.sand.color);
    return (h: number) => (h < 0.18 ? wet : dry);
  }, []);
  const inundation = t > 0.72;
  return (
    <group position={[3.05, 0, 0]}>
      <MorphWater width={3.6} depth={2.8} position={[-0.15, 0.12, 0]} plan />
      <HeightField
        fn={coastFn}
        width={1.7}
        depth={2.8}
        segX={Math.max(16, Math.floor(q.terrain / 8))}
        segZ={Math.max(16, Math.floor(q.terrain / 8))}
        colorFn={coastColor}
        position={[1.15, 0.02, 0]}
      />
      {inundation && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.05, 0.22, 0]}>
          <planeGeometry args={[1.15, 1.6]} />
          <meshStandardMaterial color="#7FD4FF" transparent opacity={0.28} depthWrite={false} />
        </mesh>
      )}
      <Tag pos={[-0.9, 0.7, 0]} text="Wave fronts" tone="ice" occlude={false} />
      {inundation && <Tag pos={[1.2, 0.85, 0]} text="Inundation" tone="fault" occlude={false} />}
    </group>
  );
}

function Model() {
  useLabTick(1 / 8);
  return (
    <group>
      <StudioFloor size={14} />
      <Profile />
      <Plan />
      <Readout pos={[0, 2.55, 0]}>Profile left · plan right · the wave races, then stands up</Readout>
      <StepCamera positions={[[0, 3.4, 8.2], [-3.1, 1.7, 5.1], [3.2, 4.6, 4.2], [2.6, 1.9, 4.8]]} />
    </group>
  );
}

export default function TsunamiScene() {
  const t = useLabControls((s) => s.t);
  const stage = t < 0.12 ? "slip" : t < 0.72 ? "race" : "inundation";
  return (
    <LabStudio
      slug="tsunami"
      title="Tsunami"
      camera={{ position: [0, 3.4, 8.2], fov: 40 }}
      liveText={`Tsunami ${stage}. Deep water is fast and low. Nearshore the wave stands up.`}
      exaggeration="Vertical exaggeration ×20. A real deep-water tsunami is centimetres high."
      fallback={<GenericFallback slug="tsunami" title="Tsunami" caption="Slip lifts the column. Deep: fast and low. Coast: tall." />}
      minDistance={3}
      maxDistance={16}
      target={[0, 0.4, 0]}
    >
      <Model />
    </LabStudio>
  );
}
