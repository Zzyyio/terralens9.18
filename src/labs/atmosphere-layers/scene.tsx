import * as THREE from "three";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StepCamera } from "@/labs/shared/kit";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";
import { EarthMesh, CloudLayer, Starfield } from "@/components/globe/earth";
import { useLabControls } from "@/lib/store/lab-controls";

const LAYERS = [
  { name: "Troposphere", km: 12, color: "#7FD4FF", note: "0–12 km · weather lives here", tone: "ice" as const },
  { name: "Stratosphere", km: 50, color: "#3EE0C6", note: "12–50 km · ozone", tone: "glacier" as const },
  { name: "Mesosphere", km: 80, color: "#E8B86D", note: "50–80 km", tone: "sandstone" as const },
  { name: "Thermosphere", km: 600, color: "#FF6A3D", note: "80–600 km · aurora", tone: "magma" as const },
];

function Shell({ r, color, gap }: { r: number; color: string; gap: number }) {
  const q = useQuality();
  return (
    <mesh position={[gap, 0, 0]}>
      <sphereGeometry args={[r, q.sphere, q.sphere]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.14}
        roughness={0.12}
        metalness={0.04}
        side={THREE.DoubleSide}
        depthWrite={false}
        emissive={color}
        emissiveIntensity={0.08}
      />
    </mesh>
  );
}

function Model() {
  const explode = useLabControls((s) => s.explode);
  const step = useLabControls((s) => s.step);
  const trueScale = useLabControls((s) => s.trueScale);
  const teach = trueScale ? 1 : 42;
  return (
    <group>
      <Starfield />
      <EarthMesh radius={1} clouds={false} />
      <CloudLayer radius={1.018} />
      {LAYERS.map((s, i) => {
        const r = 1 + (s.km / 6371) * teach;
        const gap = explode * (0.18 + i * 0.22);
        const labelR = r + gap + 0.02;
        const ang = (i - 1.5) * 0.32;
        return (
          <group key={s.name}>
            <Shell r={r} color={s.color} gap={gap} />
            <Tag
              pos={[Math.sin(ang) * labelR, Math.cos(ang) * labelR * 0.15, labelR * 0.15]}
              text={`${s.name} · ${s.note}`}
              tone={s.tone}
              occlude={false}
              note={
                trueScale
                  ? `${s.name} is ${s.km} km. Earth radius is 6371 km. Weather is a film.`
                  : `${s.name} drawn ×42 so the film can be seen. True thickness is ${s.km} km on a 6371 km radius.`
              }
            />
          </group>
        );
      })}
      {step >= 1 && (
        <Tag pos={[0, 1.12, 0.2]} text="Clouds stop at the tropopause" tone="ice" occlude={false} note="Weather lives in the troposphere. We do not run out of air at 12 km." />
      )}
      <Readout pos={[0, -1.85, 0]}>
        {trueScale ? "True scale. Troposphere is a film you can barely see." : "Thickness ×42. Troposphere is ~12 km; Earth radius is 6371 km."}
      </Readout>
      <StepCamera
        positions={[
          [0, 0.4, 4.6],
          [2.4, 1.2, 3.6],
          [0, 2.8, 5.2],
          [0, 0.4, 4.6],
        ]}
      />
    </group>
  );
}

export default function AtmosphereLayersScene() {
  return (
    <LabStudio
      slug="atmosphere-layers"
      title="Atmosphere layers"
      camera={{ position: [0, 0.4, 4.8], fov: 40 }}
      exaggeration="Radial ×42. Troposphere is ~12 km; Earth radius is 6371 km."
      liveText="Exploded atmosphere. Weather lives in the troposphere. Thickness is exaggerated so the film can be seen."
      fallback={
        <GenericFallback
          slug="atmosphere-layers"
          title="Atmosphere layers"
          caption="Troposphere to thermosphere. Weather is only in the inner film."
        />
      }
    >
      <Model />
    </LabStudio>
  );
}
