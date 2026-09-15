import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera, Arrow3 } from "@/labs/shared/kit";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { latheGeometry } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

function Granite() {
  const q = useQuality();
  const nrm = useRockNormal();
  const nrmScale = useMemo(() => new THREE.Vector2(0.55, 0.55), []);
  const crystals = useMemo(() => {
    const out: { p: [number, number, number]; s: number; r: [number, number, number] }[] = [];
    for (let i = 0; i < 16; i++) {
      const a = i * 2.21;
      out.push({
        p: [Math.sin(a) * 0.34, 0.08 + (i % 5) * 0.1, Math.cos(a * 1.17) * 0.3],
        s: 0.11 + (i % 4) * 0.028,
        r: [i * 0.41, i * 0.73, i * 0.19],
      });
    }
    return out;
  }, []);
  const plug = useMemo(
    () => latheGeometry([[0.001, 0.55], [0.22, 0.48], [0.42, 0.22], [0.5, 0.02], [0.55, 0]], q.lathe),
    [q.lathe],
  );
  return (
    <group>
      <mesh geometry={plug} castShadow>
        <meshStandardMaterial
          color={PBR.granite.color}
          roughness={PBR.granite.roughness}
          metalness={PBR.granite.metalness}
          normalMap={nrm}
          normalScale={nrmScale}
        />
      </mesh>
      {crystals.map((c, i) => (
        <mesh key={i} position={c.p} rotation={c.r} scale={c.s} castShadow>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#d4c4b4" : PBR.granite.color}
            roughness={0.62}
            metalness={0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

function Beds({ foliated }: { foliated?: boolean }) {
  return (
    <group>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[foliated ? Math.sin(i * 0.9) * 0.06 : 0, i * 0.09 - 0.18, 0]}
          rotation={[0, foliated ? 0.15 : 0, foliated ? 0.42 + i * 0.05 : 0]}
          scale={foliated ? [1.4, 1, 0.52] : [1, 1, 1]}
          castShadow
        >
          <boxGeometry args={[0.95, 0.08, 0.72, 8, 1, 6]} />
          <meshStandardMaterial
            color={foliated ? (i % 2 ? "#8B9A97" : "#6a6560") : i % 2 ? PBR.limestone.color : PBR.sand.color}
            roughness={foliated ? 0.78 : i % 2 ? PBR.limestone.roughness : PBR.sand.roughness}
            metalness={0.04}
          />
        </mesh>
      ))}
    </group>
  );
}

function Model() {
  useLabTick(1 / 10);
  const t = useLabControls((s) => s.t);
  const temp = useLabControls((s) => s.params.temp ?? 0.3);
  const pressure = useLabControls((s) => s.params.pressure ?? 0.3);
  const heat = (temp + pressure) * 0.5;
  const melt = heat > 0.42;
  const weather = heat < 0.58;
  const q = useQuality();
  const magmaGlow = 0.35 + heat * 0.55 + Math.sin(t * Math.PI * 2) * 0.12;
  const hot = "#FF6A3D";
  const cool = "#3EE0C6";
  const dim = "#3a4240";
  return (
    <group>
      <StudioFloor size={12} />
      <mesh position={[0, -0.55, 0]}>
        <sphereGeometry args={[0.42, q.sphere, q.sphere]} />
        <meshStandardMaterial
          color={PBR.magma.color}
          emissive={PBR.magma.emissive}
          emissiveIntensity={magmaGlow}
          roughness={PBR.magma.roughness}
          metalness={PBR.magma.metalness}
        />
      </mesh>
      <group position={[0, 1.22, 0]}>
        <Granite />
      </group>
      <group position={[1.62, 0.22, 0.18]}>
        <Beds />
      </group>
      <group position={[-1.62, 0.22, -0.12]}>
        <Beds foliated />
      </group>
      <Arrow3 from={[0.45, 1.15, 0]} to={[1.35, 0.55, 0.12]} color={weather ? cool : dim} />
      <Arrow3 from={[1.35, 0.12, 0.12]} to={[0.4, 0.85, 0]} color={melt ? hot : dim} />
      <Arrow3 from={[1.2, 0.35, 0.1]} to={[-1.15, 0.35, -0.08]} color={melt ? hot : dim} />
      <Arrow3 from={[-1.15, 0.12, -0.08]} to={[1.2, 0.12, 0.1]} color={weather ? cool : dim} />
      <Arrow3 from={[-0.45, 1.15, 0]} to={[-1.25, 0.55, -0.08]} color={melt ? hot : dim} />
      <Arrow3 from={[-1.25, 0.12, -0.08]} to={[-0.35, 0.85, 0]} color={melt ? hot : dim} />
      <Arrow3 from={[0, 0.05, 0]} to={[0, 0.85, 0]} color={melt ? hot : dim} />
      <Tag pos={[0, 1.95, 0]} text="Igneous · granite" tone="magma" occlude={false} />
      <Tag pos={[1.62, 0.95, 0.18]} text="Sedimentary · beds" tone="sandstone" occlude={false} />
      <Tag pos={[-1.62, 0.95, -0.12]} text="Metamorphic · foliated" occlude={false} />
      <Tag pos={[0, -0.05, 0.55]} text="Magma" tone="magma" occlude={false} />
      <Readout pos={[0, 2.65, 0]}>
        T {temp.toFixed(2)} · P {pressure.toFixed(2)} · arrows loop both ways, not a ladder
      </Readout>
      <StepCamera positions={[[0, 2.7, 6.4], [0.1, 1.9, 3.8], [2.1, 1.5, 4.4], [-2.1, 1.45, 4.3]]} />
    </group>
  );
}

export default function RockCycleScene() {
  const temp = useLabControls((s) => s.params.temp ?? 0.3);
  const pressure = useLabControls((s) => s.params.pressure ?? 0.3);
  return (
    <LabStudio
      slug="rock-cycle"
      title="Rock cycle"
      camera={{ position: [0, 2.7, 6.4], fov: 40 }}
      liveText={`Rock cycle. Temperature ${temp.toFixed(2)}, pressure ${pressure.toFixed(2)}. Heat biases melt and metamorphism.`}
      fallback={<GenericFallback slug="rock-cycle" title="Rock cycle" caption="Igneous, sedimentary, metamorphic. Arrows loop both ways." />}
      minDistance={2.6}
      maxDistance={14}
      target={[0, 0.5, 0]}
    >
      <Model />
    </LabStudio>
  );
}
