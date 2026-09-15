import { useMemo } from "react";
import * as THREE from "three";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StepCamera } from "@/labs/shared/kit";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";
import { EarthMesh, Atmosphere, Starfield } from "@/components/globe/earth";
import { SunMesh } from "@/components/globe/moon";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";

const LATS = [-66, -45, -23.44, 0, 23.44, 45, 66];

function Spots() {
  const q = useQuality();
  const spots = useMemo(
    () =>
      [
        [0.18, 0.22, 0.32],
        [-0.28, 0.08, 0.3],
        [0.05, -0.3, 0.28],
        [0.32, -0.05, 0.18],
        [-0.12, 0.34, 0.16],
        [0.22, 0.12, -0.3],
      ] as [number, number, number][],
    [],
  );
  return (
    <group>
      {spots.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.055, Math.max(12, q.sphere / 6), Math.max(10, q.sphere / 8)]} />
          <meshStandardMaterial color="#3a2a18" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Model() {
  useLabTick(1 / 24);
  const t = useLabControls((s) => s.t);
  const spots = (useLabControls((s) => s.params.spots) ?? 0) > 0.5;
  const decl = 23.44 * Math.sin(((t - 80 / 365) * 2 * Math.PI));
  return (
    <group>
      <Starfield />
      <group position={[-2.35, 0.15, 0]}>
        <SunMesh radius={0.55} />
        {spots && <Spots />}
        <Tag pos={[0, 0.85, 0]} text="Sun · ~1366 W m⁻² at 1 AU" tone="sandstone" />
      </group>
      <group position={[2.15, 0, 0]} rotation={[0, t * Math.PI * 2, 0.41]}>
        <EarthMesh radius={0.95} clouds sunDirection={new THREE.Vector3(-1, 0.05, 0)} />
        <Atmosphere radius={0.99} />
      </group>
      {LATS.map((lat) => {
        const inc = Math.max(0, Math.cos(((lat - decl) * Math.PI) / 180));
        const y = Math.sin((lat * Math.PI) / 180) * 0.95;
        const z = Math.cos((lat * Math.PI) / 180) * 0.95;
        return (
          <mesh key={lat} position={[2.15 + 0.08, y, z * 0.15]}>
            <cylinderGeometry args={[0.035, 0.035, 0.15 + inc * 1.15, 14]} />
            <meshStandardMaterial
              color="#E8B86D"
              emissive="#E8B86D"
              emissiveIntensity={0.25 + inc * 0.55}
              roughness={0.4}
            />
          </mesh>
        );
      })}
      <Tag pos={[2.15, 1.15, 0]} text="Equator" tone="glacier" />
      <Tag pos={[2.15, 0.72, 0.2]} text="55°N playground" />
      <Tag pos={[2.15, -1.05, 0]} text="Pole" tone="ice" />
      <Readout pos={[0, 1.85, 0]}>
        Same solar constant. Incidence changes with latitude. Sunspots are not seasons.
      </Readout>
      <StepCamera positions={[[0, 1.4, 6.2], [-1.6, 0.8, 3.4], [3.2, 0.6, 3.8], [0, 1.4, 6.2]]} />
    </group>
  );
}

export default function SunEarthScene() {
  return (
    <LabStudio
      slug="sun-earth"
      title="Sun and Earth"
      camera={{ position: [0, 1.4, 6.2], fov: 40 }}
      liveText="Solar constant is the same. Latitude changes incidence. Sunspots are a toggle, not astrology."
      fallback={
        <GenericFallback
          slug="sun-earth"
          title="Sun and Earth"
          caption="1366 W m⁻² at the top of the atmosphere. Latitude is why playgrounds disagree."
        />
      }
    >
      <Model />
    </LabStudio>
  );
}
