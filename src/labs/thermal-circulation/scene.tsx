import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera, Arrow3, SceneToggles, SceneBtn } from "@/labs/shared/kit";
import { PBR } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

function Loop() {
  useLabTick(1 / 16);
  const t = useLabControls((s) => s.t);
  const urban = (useLabControls((s) => s.params.urban) ?? 0) > 0.5;
  const q = useQuality();
  const day = t < 0.5;
  const strength = 0.55 + Math.sin((day ? t / 0.5 : (t - 0.5) / 0.5) * Math.PI) * 0.45;
  const r = (urban ? 0.055 : 0.038) * (0.7 + strength * 0.5);
  const segs = Math.max(16, Math.round(q.lathe / 4));

  const landColor = urban ? "#2c2622" : PBR.soil.color;
  const landGlow = day ? (urban ? 0.42 : 0.28) : urban ? 0.12 : 0.02;
  const seaGlow = day ? 0.02 : 0.14;

  const onshore: { from: [number, number, number]; to: [number, number, number] }[] = day
    ? [
        { from: [1.35, 0.42, 0.35], to: [-0.15, 0.58, 0.35] },
        { from: [1.35, 0.42, -0.35], to: [-0.15, 0.58, -0.35] },
      ]
    : [
        { from: [-1.2, 0.58, 0.35], to: [0.35, 0.42, 0.35] },
        { from: [-1.2, 0.58, -0.35], to: [0.35, 0.42, -0.35] },
      ];
  const aloft: { from: [number, number, number]; to: [number, number, number] }[] = day
    ? [
        { from: [-0.85, 1.72, 0.2], to: [1.15, 1.62, 0.2] },
        { from: [-0.85, 1.72, -0.2], to: [1.15, 1.62, -0.2] },
      ]
    : [
        { from: [1.05, 1.62, 0.2], to: [-0.75, 1.55, 0.2] },
        { from: [1.05, 1.62, -0.2], to: [-0.75, 1.55, -0.2] },
      ];
  const rise: [number, number, number] = day ? [-0.95, 0.7, 0] : [1.15, 0.5, 0];
  const riseTo: [number, number, number] = day ? [-0.95, 1.78, 0] : [1.15, 1.7, 0];
  const sink: [number, number, number] = day ? [1.2, 1.68, 0] : [-0.95, 1.6, 0];
  const sinkTo: [number, number, number] = day ? [1.2, 0.5, 0] : [-0.95, 0.7, 0];

  const sunX = Math.cos((0.5 - t) * Math.PI) * 3.1;
  const sunY = Math.max(0.28, Math.sin((0.5 - t) * Math.PI) * 2.4 + 1.15);

  const buildings = useMemo(() => {
    const a: [number, number, number, number][] = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        a.push([-1.55 + i * 0.38, 0.55 + ((i * 3 + j) % 4) * 0.12, -0.55 + j * 0.4, 0.55 + ((i + j) % 3) * 0.22]);
      }
    }
    return a;
  }, []);

  return (
    <group>
      <StudioFloor size={10} />
      <mesh position={[sunX, sunY, 1.7]}>
        <sphereGeometry args={[day ? 0.26 : 0.14, segs, segs]} />
        <meshStandardMaterial
          color={day ? "#E8B86D" : "#d5eaf4"}
          emissive={day ? "#E8B86D" : "#8aa0b0"}
          emissiveIntensity={day ? 1.15 : 0.28}
        />
      </mesh>

      <mesh position={[-1.15, 0.22, 0]} castShadow>
        <boxGeometry args={[2.15, 0.44, 2.5]} />
        <meshStandardMaterial
          color={landColor}
          roughness={PBR.soil.roughness}
          metalness={PBR.soil.metalness}
          emissive="#ff6a3d"
          emissiveIntensity={landGlow}
        />
      </mesh>
      {urban &&
        buildings.map((b, i) => (
          <mesh key={i} position={[b[0], b[3] / 2 + 0.44, b[2]]} castShadow>
            <boxGeometry args={[0.22, b[3], 0.22]} />
            <meshStandardMaterial color="#1e2426" roughness={0.86} metalness={0.1} />
          </mesh>
        ))}
      <mesh position={[1.15, 0.12, 0]} receiveShadow>
        <boxGeometry args={[2.15, 0.24, 2.5]} />
        <meshStandardMaterial
          color={PBR.water.color}
          roughness={PBR.water.roughness}
          metalness={PBR.water.metalness}
          emissive="#3aa0c8"
          emissiveIntensity={seaGlow}
        />
      </mesh>

      <mesh position={[0, 1.18, 0]}>
        <boxGeometry args={[4.55, 1.85, 2.7]} />
        <meshStandardMaterial
          color="#7FD4FF"
          transparent
          opacity={0.07}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {onshore.map((a, i) => (
        <Arrow3 key={`s${i}`} from={a.from} to={a.to} color="#3EE0C6" radius={r} />
      ))}
      {aloft.map((a, i) => (
        <Arrow3 key={`a${i}`} from={a.from} to={a.to} color="#7FD4FF" radius={r * 0.85} />
      ))}
      <Arrow3 from={rise} to={riseTo} color="#FF6A3D" radius={r} />
      <Arrow3 from={sink} to={sinkTo} color="#7FD4FF" radius={r * 0.8} />

      <Tag pos={[-1.15, 1.05, 1.45]} text="land heats first" tone="magma" occlude={false} />
      {day ? (
        <Tag pos={[0.15, 0.28, 0.15]} text="sea breeze" tone="glacier" occlude={false} />
      ) : (
        <Tag pos={[0.15, 0.28, 0.15]} text="land breeze" tone="ice" occlude={false} />
      )}
      <Readout pos={[0, 2.55, 0]}>
        {day ? "Day" : "Night"} · {urban ? "urban heat, stronger loop" : "bare soil vs water"} ·
        surface from cool column to warm
      </Readout>
      <StepCamera
        positions={[
          [0, 2.35, 5.8],
          [-2.6, 1.5, 4.2],
          [2.4, 1.7, 4.4],
          [0, 2.35, 5.8],
        ]}
      />
    </group>
  );
}

export default function ThermalCirculationScene() {
  const urban = (useLabControls((s) => s.params.urban) ?? 0) > 0.5;
  const setParam = useLabControls((s) => s.setParam);
  const t = useLabControls((s) => s.t);
  const day = t < 0.5;
  return (
    <>
      <LabStudio
        slug="thermal-circulation"
        title="Thermal circulation"
        camera={{ position: [0, 2.35, 5.8], fov: 40 }}
        liveText={`${day ? "Day sea breeze" : "Night land breeze"}. Land heats first. ${urban ? "Urban heat island, stronger loop." : "Soil vs water."}`}
        exaggeration="The roll is a few kilometres high. Coriolis is a later lab."
        fallback={
          <GenericFallback
            slug="thermal-circulation"
            title="Thermal circulation"
            caption="Land heats first. Day: onshore at the surface, offshore aloft. Night reverses."
          />
        }
      >
        <Loop />
      </LabStudio>
      <SceneToggles>
        <SceneBtn onClick={() => setParam("urban", urban ? 0 : 1)} active={urban}>
          Urban {urban ? "on" : "off"}
        </SceneBtn>
      </SceneToggles>
    </>
  );
}
