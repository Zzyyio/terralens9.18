import { useMemo } from "react";
import * as THREE from "three";
import { EarthMesh, Atmosphere, Starfield } from "@/components/globe/earth";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StepCamera, Arrow3 } from "@/labs/shared/kit";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";
import { latLonToVector3 } from "@/lib/geo";

const IN = 340;
const SUN = new THREE.Vector3(4, 0.35, 0.55);

function ll(lat: number, lon: number, r: number): [number, number, number] {
  const v = latLonToVector3(lat, lon, r);
  return [v.x, v.y, v.z];
}

function fluxR(w: number) {
  return 0.012 + Math.max(0, w) * 0.0001;
}

/** Several dayside beams. Width encodes insolation, not decoration. */
const BEAMS = [
  { lat: 4, lon: 88, w: 1 },
  { lat: 28, lon: 74, w: 0.82 },
  { lat: -22, lon: 102, w: 0.86 },
  { lat: 52, lon: 64, w: 0.48 },
  { lat: -48, lon: 96, w: 0.5 },
] as const;

function DaysideGlow({ absorbed }: { absorbed: number }) {
  const q = useQuality();
  const quat = useMemo(
    () =>
      new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        SUN.clone().normalize(),
      ),
    [],
  );
  const k = THREE.MathUtils.clamp(absorbed / IN, 0.08, 1);
  return (
    <mesh quaternion={quat}>
      <sphereGeometry args={[1.018, q.sphere, q.sphere, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
      <meshStandardMaterial
        color="#ff8a4c"
        emissive="#ff6a3d"
        emissiveIntensity={0.2 + k * 0.95}
        transparent
        opacity={0.18 + k * 0.32}
        depthWrite={false}
      />
    </mesh>
  );
}

function Budget() {
  const albedo = useLabControls((s) => s.params.albedo ?? 0.3);
  const gh = (useLabControls((s) => s.params.greenhouse) ?? 1) > 0.5;
  const reflected = IN * albedo;
  const absorbed = IN * (1 - albedo);
  const surfaceUp = gh ? 398 : absorbed;
  const back = gh ? 333 * (0.72 + (1 - albedo) * 0.28) : 0;

  return (
    <group>
      <Starfield />
      <EarthMesh sunDirection={SUN} radius={1} />
      <Atmosphere />
      <DaysideGlow absorbed={absorbed} />

      {BEAMS.map((b) => (
        <Arrow3
          key={`sw-${b.lat}`}
          from={ll(b.lat, b.lon, 2.22)}
          to={ll(b.lat, b.lon, 1.14)}
          color="#F5D76E"
          radius={fluxR(IN * b.w)}
        />
      ))}

      {BEAMS.filter((b) => Math.abs(b.lat) < 40).map((b) => (
        <Arrow3
          key={`alb-${b.lat}`}
          from={ll(b.lat + 6, b.lon - 8, 1.16)}
          to={ll(b.lat + 14, b.lon - 18, 2.05)}
          color="#F4EFE6"
          radius={fluxR(reflected * b.w)}
        />
      ))}

      {BEAMS.map((b) => (
        <Arrow3
          key={`lw-${b.lat}`}
          from={ll(b.lat - 4, b.lon + 10, 1.08)}
          to={ll(b.lat - 8, b.lon + 16, 1.92)}
          color="#FF6A3D"
          radius={fluxR(surfaceUp * (0.55 + b.w * 0.45))}
        />
      ))}

      {gh &&
        BEAMS.slice(0, 4).map((b) => (
          <Arrow3
            key={`gh-${b.lat}`}
            from={ll(b.lat + 8, b.lon + 6, 1.52)}
            to={ll(b.lat + 2, b.lon + 2, 1.1)}
            color="#E24B4B"
            radius={fluxR(back * 0.55 * b.w)}
          />
        ))}

      <Tag pos={ll(8, 88, 1.72)} text="shortwave" tone="sandstone" occlude={false} />
      <Tag pos={ll(22, 58, 1.68)} text={`albedo · ${albedo.toFixed(2)}`} occlude={false} />
      <Tag pos={ll(-12, 112, 1.7)} text="longwave" tone="magma" occlude={false} />
      {gh && <Tag pos={ll(32, 96, 1.58)} text="greenhouse" tone="fault" occlude={false} />}
      <Readout pos={[0, 1.62, 0]}>
        in {IN} · bounce {reflected.toFixed(0)} · absorbed {absorbed.toFixed(0)} W/m² · arrow
        width = flux
      </Readout>
      <StepCamera
        positions={[
          [2.4, 0.55, 2.8],
          [3.2, 1.1, 1.4],
          [1.2, 2.2, 2.6],
          [2.4, 0.55, 2.8],
        ]}
      />
    </group>
  );
}

export default function EnergyBudgetScene() {
  const albedo = useLabControls((s) => s.params.albedo ?? 0.3);
  const gh = (useLabControls((s) => s.params.greenhouse) ?? 1) > 0.5;
  return (
    <LabStudio
      slug="energy-budget"
      title="Earth’s energy budget"
      camera={{ position: [2.4, 0.55, 2.8], fov: 40 }}
      liveText={`Albedo ${albedo.toFixed(2)}. Absorbed ${(IN * (1 - albedo)).toFixed(0)} W/m². Greenhouse ${gh ? "on" : "off"}. Arrow width is flux.`}
      exaggeration="Arrow width = flux. School-box global means, not a forecast."
      fallback={
        <GenericFallback
          slug="energy-budget"
          title="Energy budget"
          caption="Yellow shortwave hits the dayside. The ground glows. Longwave leaves. Greenhouse returns a thinner IR beam."
        />
      }
      minDistance={1.8}
      maxDistance={8}
      target={[0, 0, 0]}
    >
      <Budget />
    </LabStudio>
  );
}
