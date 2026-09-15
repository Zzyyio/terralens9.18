import { useMemo } from "react";
import * as THREE from "three";
import { EarthMesh, Atmosphere, Starfield } from "@/components/globe/earth";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StepCamera } from "@/labs/shared/kit";
import { PBR } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";
import { latLonToVector3 } from "@/lib/geo";

const SUN = new THREE.Vector3(0.55, 0.42, 4.2);

const BIOMES = [
  {
    name: "A tropical",
    sample: "Amazon",
    note: "Af rainforest · no real winter",
    color: "#2d8a4e",
    lat: -3.1,
    lon: -60.0,
    tone: "moss" as const,
  },
  {
    name: "B dry",
    sample: "Sahara",
    note: "BWh hot desert · evaporation beats rain",
    color: PBR.sand.color,
    lat: 23.4,
    lon: 12.5,
    tone: "sandstone" as const,
  },
  {
    name: "C temperate",
    sample: "London",
    note: "Cfb · no dry season, warm summer",
    color: "#3EE0C6",
    lat: 51.51,
    lon: -0.13,
    tone: "glacier" as const,
  },
  {
    name: "D continental",
    sample: "Great Plains",
    note: "Dfa · hot summer, hard winter",
    color: "#6aa0c8",
    lat: 42.0,
    lon: -100.0,
    tone: "ice" as const,
  },
  {
    name: "E polar",
    sample: "Greenland fringe",
    note: "ET tundra · plants as a slow thermometer",
    color: PBR.ice.color,
    lat: 70.5,
    lon: -44.0,
    tone: "chalk" as const,
  },
] as const;

function Patch({
  lat,
  lon,
  color,
  r,
  active,
}: {
  lat: number;
  lon: number;
  color: string;
  r: number;
  active: boolean;
}) {
  const q = useQuality();
  const segs = Math.max(24, Math.round(q.sphere / 3));
  const { pos, quat } = useMemo(() => {
    const p = latLonToVector3(lat, lon, 1.02);
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      p.clone().normalize(),
    );
    return { pos: p, quat };
  }, [lat, lon]);
  return (
    <mesh position={pos} quaternion={quat} scale={[1, 1, 0.38]} castShadow>
      <sphereGeometry args={[active ? r * 1.45 : r, segs, segs]} />
      <meshStandardMaterial
        color={color}
        roughness={0.48}
        metalness={0.05}
        emissive={color}
        emissiveIntensity={active ? 0.38 : 0.07}
      />
    </mesh>
  );
}

function Tiles() {
  const idx = Math.min(4, Math.max(0, Math.round(useLabControls((s) => s.params.biome ?? 2))));
  const b = BIOMES[idx] ?? BIOMES[2];
  const yaw = useMemo(() => {
    const p = latLonToVector3(b.lat, b.lon, 1);
    return Math.atan2(p.x, p.z);
  }, [b.lat, b.lon]);

  return (
    <group>
      <Starfield />
      <group rotation={[0, -yaw, 0]}>
        <EarthMesh sunDirection={SUN} />
        <Atmosphere />
        {BIOMES.map((m, i) => (
          <group key={m.name}>
            <Patch lat={m.lat} lon={m.lon} color={m.color} r={0.1} active={i === idx} />
            <Tag
              pos={latLonToVector3(m.lat, m.lon, 1.28).toArray() as [number, number, number]}
              text={m.name}
              tone={m.tone}
            />
          </group>
        ))}
      </group>
      <Readout pos={[0, 1.58, 0]}>
        Köppen {b.name} · {b.sample} · {b.note}
      </Readout>
      <StepCamera
        positions={[
          [0.15, 0.45, 3.3],
          [1.5, 0.9, 2.5],
          [0.1, 1.7, 2.6],
          [0.15, 0.45, 3.3],
        ]}
      />
    </group>
  );
}

export default function ClimateTypesScene() {
  const idx = Math.min(4, Math.max(0, Math.round(useLabControls((s) => s.params.biome ?? 2))));
  const b = BIOMES[idx] ?? BIOMES[2];
  return (
    <LabStudio
      slug="climate-types"
      title="Climate types"
      camera={{ position: [0.15, 0.45, 3.3], fov: 40 }}
      liveText={`Köppen ${b.name}. Sample: ${b.sample}. ${b.note}`}
      exaggeration="Patches are representative sites, not a legal climate map. Mountains punch holes in Köppen."
      fallback={
        <GenericFallback
          slug="climate-types"
          title="Climate types"
          caption="A tropical, B dry, C temperate, D continental, E polar. Amazon, Sahara, London, Great Plains, Greenland fringe."
        />
      }
      minDistance={1.7}
      maxDistance={7}
      target={[0, 0, 0]}
    >
      <Tiles />
    </LabStudio>
  );
}
