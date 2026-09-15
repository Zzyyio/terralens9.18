import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StepCamera } from "@/labs/shared/kit";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";
import { EarthMesh, Atmosphere, Starfield } from "@/components/globe/earth";
import { MoonMesh, SunMesh } from "@/components/globe/moon";
import { useLabControls } from "@/lib/store/lab-controls";

function Model() {
  const zoom = useLabControls((s) => s.params.zoom) ?? 0;
  const q = useQuality();
  const camT = useRef(new THREE.Vector3(0, 1.2, 4.2));
  const look = useMemo(
    () => [
      new THREE.Vector3(0, 1.15, 4.4),
      new THREE.Vector3(0, 3.4, 9.5),
      new THREE.Vector3(0, 8, 22),
    ],
    [],
  );
  useFrame(({ camera }) => {
    const i = THREE.MathUtils.clamp(zoom, 0, 2);
    const a = Math.floor(i);
    const b = Math.min(2, a + 1);
    const f = i - a;
    camT.current.lerpVectors(look[a]!, look[b]!, f);
    camera.position.lerp(camT.current, 0.06);
  });
  const stars = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const n = q.stars;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 14 + Math.random() * 18;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.cos(ph);
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [q.stars]);
  const stage = zoom < 0.7 ? 0 : zoom < 1.45 ? 1 : 2;
  return (
    <group>
      <Starfield />
      {stage === 0 && (
        <group>
          <EarthMesh radius={1} clouds />
          <Atmosphere />
          <group position={[1.7, 0.1, 0.2]}>
            <MoonMesh radius={0.27} />
          </group>
          <Tag pos={[0, 1.2, 0]} text="Earth · 12 742 km" />
          <Tag pos={[1.7, 0.5, 0.2]} text="Moon · 30 Earth-diameters away (compressed)" />
        </group>
      )}
      {stage === 1 && (
        <group>
          <SunMesh radius={0.4} />
          {[1.2, 1.8, 2.5, 3.3].map((a, i) => (
            <mesh key={a} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[a - 0.01, a + 0.01, 64]} />
              <meshBasicMaterial color="#8B9A97" transparent opacity={0.35} side={THREE.DoubleSide} />
            </mesh>
          ))}
          <Tag pos={[0, 0.7, 0]} text="1 AU · 150 million km" tone="sandstone" />
        </group>
      )}
      {stage === 2 && (
        <points geometry={stars}>
          <pointsMaterial color="#F4EFE6" size={0.04} sizeAttenuation />
        </points>
      )}
      <Readout pos={[0, stage === 2 ? 3.2 : 1.85, 0]}>
        {stage === 0 && "Stop 1 · Earth. Units: km."}
        {stage === 1 && "Stop 2 · Solar system. Units: AU. Planets would be dust at true scale."}
        {stage === 2 && "Stop 3 · Neighbouring stars. Units: light years. No cartoon galaxy tour."}
      </Readout>
      <StepCamera positions={[[0, 1.2, 4.4], [0, 3.4, 9.5], [0, 8, 22], [0, 1.2, 4.4]]} />
    </group>
  );
}

export default function UniverseScaleScene() {
  return (
    <LabStudio
      slug="universe-scale"
      title="Universe scale"
      camera={{ position: [0, 1.2, 4.4], fov: 42 }}
      liveText="Powers of ten: Earth, then the system, then local stars. Each jump hides a scale."
      fallback={
        <GenericFallback
          slug="universe-scale"
          title="Universe scale"
          caption="Three stops only. Earth, solar system, neighbouring stars. No fake fly-through."
        />
      }
    >
      <Model />
    </LabStudio>
  );
}
