import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { useVolcanoGeometry } from "@/labs/shared/terrain";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

function kindOf(visc: number) {
  if (visc < 0.18) return { name: "Fissure / rift · Iceland", tone: "magma" as const };
  if (visc < 0.48) return { name: "Shield · low-viscosity basalt", tone: "sandstone" as const };
  if (visc < 0.78) return { name: "Stratovolcano · andesite", tone: "fault" as const };
  return { name: "Steep plug · sticky, gassy", tone: "magma" as const };
}

function Conduit({ h, visc }: { h: number; visc: number }) {
  const r = THREE.MathUtils.lerp(0.2, 0.07, visc);
  return (
    <mesh position={[0, h * 0.42, 0]}>
      <cylinderGeometry args={[r * 0.7, r, h * 0.9, 24]} />
      <meshStandardMaterial
        color={PBR.magma.color}
        emissive={PBR.magma.emissive}
        emissiveIntensity={0.55}
        roughness={0.4}
      />
    </mesh>
  );
}

/** Rift is LOW viscosity basalt, not a sticky plug. */
function Fissure({ on }: { on: boolean }) {
  const geom = useMemo(() => {
    const g = new THREE.BoxGeometry(5.2, 0.14, 0.38, 28, 1, 4);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      pos.setY(i, pos.getY(i) + Math.sin(x * 1.35) * 0.05);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  if (!on) return null;
  return (
    <mesh geometry={geom} position={[0.15, 0.12, 0.4]}>
      <meshStandardMaterial
        color={PBR.magma.color}
        emissive={PBR.magma.emissive}
        emissiveIntensity={0.75}
        roughness={0.32}
      />
    </mesh>
  );
}

/** Eruptive column only when sticky. Runny basalt has no column. */
function Column({ visc, h }: { visc: number; h: number }) {
  if (visc < 0.62) return null;
  const colH = 0.4 + (visc - 0.62) * 4.6;
  const r = 0.22 + visc * 0.42;
  return (
    <group position={[0, h + 0.05, 0]}>
      <mesh position={[0, colH * 0.45, 0]}>
        <coneGeometry args={[r, colH, 18]} />
        <meshStandardMaterial
          color="#c9c3b6"
          roughness={0.92}
          transparent
          opacity={0.42}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, colH * 0.72, 0]}>
        <sphereGeometry args={[r * 0.85, 16, 12]} />
        <meshStandardMaterial color="#9a958c" roughness={0.95} transparent opacity={0.28} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Model() {
  const visc = useLabControls((s) => s.params.visc ?? 0.25);
  const step = useLabControls((s) => s.step);
  const q = useQuality();
  const nrm = useRockNormal();
  const nrmScale = useMemo(() => new THREE.Vector2(0.7, 0.7), []);
  const geom = useVolcanoGeometry(visc, q.lathe);
  const h = THREE.MathUtils.lerp(0.72, 2.35, visc);
  const kind = kindOf(visc);
  const basaltic = visc < 0.48;
  return (
    <group>
      <StudioFloor size={10} />
      <mesh geometry={geom} castShadow receiveShadow>
        <meshStandardMaterial
          color={basaltic ? PBR.basalt.color : "#6a5e52"}
          roughness={basaltic ? 0.86 : 0.9}
          metalness={basaltic ? 0.08 : 0.04}
          normalMap={nrm}
          normalScale={nrmScale}
        />
      </mesh>
      {step >= 1 && <Conduit h={h} visc={visc} />}
      <Fissure on={visc < 0.18} />
      <Column visc={visc} h={h} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[6.5, 48]} />
        <meshStandardMaterial color={basaltic ? "#2a2a28" : "#3a4038"} roughness={0.95} />
      </mesh>
      <Tag pos={[0, h + (visc > 0.62 ? 1.6 : 0.35), 0]} text={kind.name} tone={kind.tone} note="Viscosity writes slope. Runny basalt = shield. Sticky andesite = steep cone. Rift is still runny." />
      <Tag pos={[0, h * 0.45, visc < 0.33 ? 1.6 : 0.7]} text="Conduit" tone="sandstone" note="The pipe. Slice (X) to see magma rise. Not a hollow mountain." />
      {visc < 0.18 && <Tag pos={[0.2, 0.45, 2.2]} text="Fissure · low visc" tone="magma" note="Iceland-style rift. Low viscosity basalt, not a sticky plug." />}
      {visc > 0.62 && <Tag pos={[0.6, h + 1.1, 0]} text="Ash column" tone="fault" note="Gas cannot escape sticky magma, so a column. Runny basalt has none." />}
      <Readout pos={[0, h + (visc > 0.62 ? 2.15 : 0.9), 0]}>
        Viscosity {visc.toFixed(2)} · {basaltic ? "basalt pours" : "andesite stacks + column"}
      </Readout>
      <StepCamera positions={[[0, 2.8, 8], [1.4, 1.6, 5.2], [0, 3.2, 7], [0, 2.8, 8]]} />
    </group>
  );
}

export default function VolcanoesScene() {
  const visc = useLabControls((s) => s.params.visc ?? 0.25);
  return (
    <LabStudio
      slug="volcanoes"
      title="Volcanoes"
      camera={{ position: [0, 2.6, 8], fov: 40 }}
      exaggeration="Slope is honest. Size is not. Column only when magma is sticky."
      liveText={`Volcano viscosity ${visc.toFixed(2)}. Shield is low viscosity; stratovolcano is sticky; fissure is runnier still.`}
      fallback={
        <GenericFallback
          slug="volcanoes"
          title="Volcanoes"
          caption="Shield, strato, fissure. Viscosity changes slope. Column only when sticky."
        />
      }
    >
      <Model />
    </LabStudio>
  );
}
