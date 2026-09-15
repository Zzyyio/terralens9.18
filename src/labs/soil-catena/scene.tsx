import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { HeightField } from "@/labs/shared/terrain";
import { PBR, useSoilNormal } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const tint = new THREE.Color();

function Model() {
  const slope = useLabControls((s) => s.params.slope ?? 0.55);
  const q = useQuality();
  const soil = useSoilNormal();
  const nrm = useMemo(() => new THREE.Vector2(0.7, 0.7), []);
  const steep = 0.6 + slope * 1.4;
  const fn = useMemo(
    () => (x: number, z: number) => 0.08 + ((x + 3.4) / 6.8) * steep + 0.04 * Math.sin(z * 2),
    [steep],
  );
  const pits = [
    { x: -2.4, name: "Crest", layers: [0.04, 0.12, 0.1], wet: false },
    { x: -0.7, name: "Shoulder", layers: [0.03, 0.1, 0.12], wet: false },
    { x: 0.9, name: "Backslope", layers: [0.02, 0.08, 0.1], wet: false },
    { x: 2.5, name: "Toe", layers: [0.08, 0.28, 0.22], wet: true },
  ] as const;
  const thin = 1.15 - slope * 0.55;
  return (
    <group>
      <StudioFloor size={12} />
      <HeightField
        fn={fn}
        width={7.4}
        depth={4.2}
        segX={q.terrain}
        segZ={Math.floor(q.terrain * 0.5)}
        colorFn={(h) => (h > steep * 0.7 ? tint.set("#8a7a48") : tint.set("#7C9A6A"))}
      />
      {pits.map((p) => {
        const ground = 0.08 + ((p.x + 3.4) / 6.8) * steep;
        const scale = p.name === "Crest" || p.name === "Backslope" ? thin : 1.15;
        let y = ground + 0.02;
        return (
          <group key={p.name} position={[p.x, 0, 0.9]}>
            {p.layers.map((h, i) => {
              const hh = h * scale;
              y += hh / 2;
              const at = y;
              y += hh / 2;
              const color = i === 0 ? "#2c261c" : i === 1 ? (p.wet ? "#4a5a48" : "#5c4a36") : "#8a6234";
              return (
                <mesh key={i} position={[0, at, 0]} castShadow>
                  <boxGeometry args={[0.55, hh, 0.4]} />
                  <meshStandardMaterial color={color} roughness={0.94} normalMap={soil} normalScale={nrm} />
                </mesh>
              );
            })}
            <Tag pos={[0, y + 0.18, 0]} text={p.name} tone={p.wet ? "ice" : "sandstone"} />
          </group>
        );
      })}
      <Readout pos={[0, steep + 1.35, 0]}>
        Slope {slope.toFixed(2)} · crest exports · toe imports
      </Readout>
      <StepCamera positions={[[0, 3.2, 8], [-2.2, 2.2, 5], [2.4, 1.8, 5], [0, 3.2, 8]]} />
    </group>
  );
}

export default function SoilCatenaScene() {
  return (
    <LabStudio
      slug="soil-catena"
      title="Soil catena"
      camera={{ position: [0, 3.2, 8], fov: 40 }}
      exaggeration="Four pits, one parent. Real hills have land use and mixed drift."
      liveText="One hillside, four soils. Crest thin and dry. Toe thick and wet."
      fallback={<GenericFallback slug="soil-catena" title="Soil catena" caption="Crest to toe. Water and sediment rewrite the profile." />}
    >
      <Model />
    </LabStudio>
  );
}
