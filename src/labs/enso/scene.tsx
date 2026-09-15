import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera, Arrow3 } from "@/labs/shared/kit";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { HeightField } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";
import { CurveFlow } from "@/labs/shared/particles";

function troughFn(nino: number) {
  return (x: number, y: number) => {
    const west = 0.72 * Math.exp(-((x + 2.65) ** 2) / 0.22);
    const east = 0.95 * Math.exp(-((x - 2.7) ** 2) / 0.28) * (y < 0.55 ? 1 : 0.35);
    const ocean = -0.22 + 0.03 * Math.sin(x * 1.8) * Math.cos(y * 2.4);
    const pool = 0.08 * Math.exp(-((x - nino * 1.55) ** 2 + y * y) / 1.1);
    return Math.max(ocean + pool, west + east);
  };
}

function troughColor(nino: number) {
  return (h: number) => {
    const c = new THREE.Color();
    if (h < -0.05) c.set(nino > 0.25 ? "#c45a32" : PBR.water.color);
    else if (h < 0.2) c.set(nino < -0.25 ? "#1a3a58" : "#2a628c");
    else c.set(PBR.crust.color);
    return c;
  };
}

function phaseOf(nino: number) {
  if (nino > 0.28) return "El Niño";
  if (nino < -0.28) return "La Niña";
  return "Walker · neutral";
}

function Model() {
  useLabTick(1 / 10);
  const t = useLabControls((s) => s.t);
  const nino = useLabControls((s) => s.params.nino ?? s.params.enso ?? t * 2 - 1);
  const q = useQuality();
  const rock = useRockNormal();
  const fn = useMemo(() => troughFn(nino), [nino]);
  const colorFn = useMemo(() => troughColor(nino), [nino]);
  const segs = Math.max(40, Math.floor(q.terrain / 3));
  const sph = Math.max(12, Math.floor(q.sphere / 3));
  const poolX = THREE.MathUtils.lerp(-1.55, 1.45, (nino + 1) / 2);
  const ninoOn = nino > 0.25;
  const riseX = ninoOn ? 1.15 : -1.45;
  const sinkX = ninoOn ? -1.35 : 1.55;
  const loop = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const n = 40;
    for (let i = 0; i <= n; i++) {
      const u = (i / n) * Math.PI * 2;
      const x = (riseX + sinkX) * 0.5 + Math.cos(u) * (ninoOn ? -1.35 : 1.5);
      const y = 0.35 + (Math.sin(u) * 0.5 + 0.5) * 1.15;
      pts.push(new THREE.Vector3(x, y, 0.05));
    }
    return pts;
  }, [riseX, sinkX, ninoOn]);

  return (
    <group>
      <StudioFloor size={12} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.35, 0]} receiveShadow>
        <circleGeometry args={[7, q.lathe]} />
        <meshStandardMaterial color="#121814" roughness={0.96} normalMap={rock} />
      </mesh>
      <HeightField fn={fn} width={6.6} depth={3.4} segX={segs} segZ={Math.floor(segs * 0.55)} colorFn={colorFn} />
      <mesh position={[-2.65, 0.42, 0.15]} castShadow>
        <boxGeometry args={[0.55, 0.7, 1.4]} />
        <meshStandardMaterial color={PBR.crust.color} roughness={0.88} />
      </mesh>
      <mesh position={[2.7, 0.55, -0.15]} castShadow>
        <boxGeometry args={[0.5, 0.95, 1.6]} />
        <meshStandardMaterial color={PBR.soil.color} roughness={0.9} />
      </mesh>
      <mesh position={[poolX, 0.22, 0]} castShadow>
        <sphereGeometry args={[0.28 + Math.abs(nino) * 0.06, sph, sph]} />
        <meshStandardMaterial
          color="#FF6A3D"
          roughness={0.28}
          metalness={0.08}
          emissive="#FF6A3D"
          emissiveIntensity={0.35}
        />
      </mesh>
      <Arrow3 from={[riseX, 0.18, 0.08]} to={[riseX, 1.42, 0.08]} color="#FF6A3D" radius={0.032} />
      <Arrow3 from={[riseX, 1.42, 0.08]} to={[sinkX, 1.42, 0.08]} color="#7FD4FF" radius={0.028} />
      <Arrow3 from={[sinkX, 1.42, 0.08]} to={[sinkX, 0.18, 0.08]} color="#8B9A97" radius={0.032} />
      <Arrow3 from={[sinkX, 0.22, 0.08]} to={[riseX, 0.22, 0.08]} color="#3EE0C6" radius={0.028} />
      <CurveFlow pts={loop} color={ninoOn ? "#FF6A3D" : "#7FD4FF"} count={10} radius={0.03} />
      <Tag pos={[poolX, 0.72, 0.15]} text="warm pool" tone="magma" />
      <Tag pos={[0, 1.72, 0.1]} text="Walker" tone="glacier" />
      <Tag pos={[1.7, 0.85, 0.4]} text="El Niño" tone="magma" />
      <Tag pos={[-1.7, 0.85, 0.4]} text="La Niña" tone="ice" />
      <Tag pos={[-2.65, 1.05, 0.15]} text="west Pacific" tone="moss" />
      <Tag pos={[2.7, 1.2, -0.15]} text="east Pacific" tone="sandstone" />
      <Readout pos={[0, 2.55, 0]}>
        {phaseOf(nino)} · a Pacific state, not a personality · we do not promise UK snow
      </Readout>
      <StepCamera
        positions={[
          [0.15, 2.6, 6.6],
          [-2.4, 1.8, 4.6],
          [2.3, 1.7, 4.8],
          [0.15, 2.6, 6.6],
        ]}
      />
    </group>
  );
}

export default function EnsoScene() {
  const nino = useLabControls((s) => s.params.nino ?? s.params.enso ?? 0);
  return (
    <LabStudio
      slug="enso"
      title="ENSO and the Walker cell"
      camera={{ position: [0.15, 2.6, 6.6], fov: 40 }}
      liveText={`${phaseOf(nino)}. Warm pool slides east in El Niño. We do not promise UK snow.`}
      exaggeration="Schematic equatorial Pacific — not a forecast of UK snow."
      fallback={
        <GenericFallback
          slug="enso"
          title="ENSO"
          caption="Walker cell and warm pool. El Niño is not a personality. No UK snow promise."
        />
      }
      minDistance={3}
      maxDistance={14}
    >
      <fog attach="fog" args={["#07090C", 12, 24]} />
      <Model />
    </LabStudio>
  );
}
