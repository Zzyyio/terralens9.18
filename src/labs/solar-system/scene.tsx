import { useMemo } from "react";
import * as THREE from "three";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StepCamera } from "@/labs/shared/kit";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";
import { Starfield } from "@/components/globe/earth";
import { SunMesh } from "@/components/globe/moon";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";

const PLANETS = [
  { name: "Mercury", au: 0.39, visA: 1.15, visR: 0.07, trueR: 0.009, color: "#8B9A97", p: 0.24 },
  { name: "Venus", au: 0.72, visA: 1.55, visR: 0.11, trueR: 0.022, color: "#E8B86D", p: 0.62 },
  { name: "Earth", au: 1, visA: 1.95, visR: 0.12, trueR: 0.023, color: "#3EE0C6", p: 1 },
  { name: "Mars", au: 1.52, visA: 2.4, visR: 0.09, trueR: 0.012, color: "#FF6A3D", p: 1.88 },
  { name: "Jupiter", au: 5.2, visA: 3.25, visR: 0.3, trueR: 0.26, color: "#C4A574", p: 11.9 },
  { name: "Saturn", au: 9.58, visA: 4.15, visR: 0.26, trueR: 0.22, color: "#E8B86D", p: 29.5 },
  { name: "Uranus", au: 19.2, visA: 4.95, visR: 0.17, trueR: 0.1, color: "#7FD4FF", p: 84 },
  { name: "Neptune", au: 30.1, visA: 5.7, visR: 0.16, trueR: 0.097, color: "#3a6aa0", p: 165 },
];

function Model() {
  useLabTick(1 / 18);
  const t = useLabControls((s) => s.t);
  const trueScale = (useLabControls((s) => s.params.trueScale) ?? 0) > 0.5;
  const q = useQuality();
  const segs = Math.max(24, Math.floor(q.sphere / 2));

  const rings = useMemo(
    () =>
      PLANETS.map((p) => {
        const a = trueScale ? p.au * 0.42 : p.visA;
        return new THREE.RingGeometry(a - 0.012, a + 0.012, 96);
      }),
    [trueScale],
  );

  return (
    <group>
      <Starfield />
      <SunMesh radius={trueScale ? 0.2 : 0.38} />
      {PLANETS.map((p, i) => {
        const a = trueScale ? p.au * 0.42 : p.visA;
        const r = trueScale ? Math.max(0.012, p.trueR * 0.9) : p.visR;
        const ang = (t * 2 * Math.PI) / p.p;
        const x = Math.cos(ang) * a;
        const z = Math.sin(ang) * a;
        return (
          <group key={p.name}>
            <mesh rotation={[Math.PI / 2, 0, 0]} geometry={rings[i]}>
              <meshBasicMaterial color="#8B9A97" transparent opacity={0.32} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[x, 0, z]}>
              <sphereGeometry args={[r, segs, segs]} />
              <meshStandardMaterial color={p.color} roughness={0.55} metalness={0.08} />
            </mesh>
            {p.name === "Saturn" && (
              <mesh position={[x, 0, z]} rotation={[Math.PI / 2.35, 0, 0]}>
                <ringGeometry args={[r * 1.35, r * 2.15, 48]} />
                <meshBasicMaterial color="#E8B86D" transparent opacity={0.7} side={THREE.DoubleSide} />
              </mesh>
            )}
            <Tag pos={[x, r + 0.22, z]} text={p.name} />
          </group>
        );
      })}
      <Readout pos={[0, trueScale ? 2.4 : 1.6, 0]}>
        {trueScale
          ? "True distance (compressed AU). Planets are dust. Classroom models always lie here."
          : "Visible mode. Sizes and orbits are two different lies. Toggle True distance."}
      </Readout>
      <StepCamera
        positions={[
          [0, 4.6, 8.4],
          [0, 2.2, 6.2],
          [0, 6.5, 12],
          [0, 4.6, 8.4],
        ]}
      />
    </group>
  );
}

export default function SolarSystemScene() {
  const trueScale = (useLabControls((s) => s.params.trueScale) ?? 0) > 0.5;
  return (
    <LabStudio
      slug="solar-system"
      title="Solar system"
      camera={{ position: [0, 4.6, 8.4], fov: 42 }}
      lights={false}
      liveText={
        trueScale
          ? "True-distance mode. If orbits are honest, planets shrink to dust."
          : "Visible classroom model. Size and distance cannot both be true."
      }
      fallback={
        <GenericFallback
          slug="solar-system"
          title="Solar system"
          caption="Eight planets. Visible mode vs true distance. The kit always lies somewhere."
        />
      }
    >
      <ambientLight intensity={0.12} color="#c9d4d0" />
      <pointLight position={[0, 0, 0]} intensity={2.4} color="#fff4dc" distance={18} />
      <Model />
    </LabStudio>
  );
}
