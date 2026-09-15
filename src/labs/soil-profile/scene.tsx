import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { PBR, useRockNormal, useSoilNormal } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

type Layer = { id: string; h: number; color: string; soil?: boolean; rock?: boolean };

const PROFILES: { name: string; note: string; layers: Layer[] }[] = [
  {
    name: "Brown earth",
    note: "UK woodland / farm default · weak pale E",
    layers: [
      { id: "O", h: 0.07, color: "#2c261c" },
      { id: "A", h: 0.28, color: "#5c4a36", soil: true },
      { id: "E", h: 0.14, color: "#d8d0c0" },
      { id: "B", h: 0.52, color: "#8a6234", soil: true },
      { id: "C", h: 0.42, color: "#c4a574" },
      { id: "R", h: 0.95, color: "#6a6560", rock: true },
    ],
  },
  {
    name: "Mollisol",
    note: "Grassland · thick dark A · no E",
    layers: [
      { id: "O", h: 0.04, color: "#1a1610" },
      { id: "A", h: 0.72, color: "#3a2414", soil: true },
      { id: "B", h: 0.4, color: "#7a5a32", soil: true },
      { id: "C", h: 0.36, color: PBR.sand.color },
      { id: "R", h: 0.82, color: "#6a6560", rock: true },
    ],
  },
  {
    name: "Oxisol",
    note: "Tropical · deep red B · E gone",
    layers: [
      { id: "O", h: 0.03, color: "#2a1810" },
      { id: "A", h: 0.18, color: "#6a3a22", soil: true },
      { id: "B", h: 1.12, color: "#c45a28", soil: true },
      { id: "C", h: 0.38, color: "#c4a070" },
      { id: "R", h: 0.7, color: "#6a6560", rock: true },
    ],
  },
];

function Slab({
  layer,
  y,
  segs,
  soilN,
  rockN,
}: {
  layer: Layer;
  y: number;
  segs: number;
  soilN: THREE.Texture;
  rockN: THREE.Texture;
}) {
  const nrmScale = useMemo(() => new THREE.Vector2(0.85, 0.85), []);
  const geom = useMemo(() => {
    const g = new THREE.BoxGeometry(2.45, layer.h, 1.28, Math.max(8, segs), 2, Math.max(8, segs / 2));
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const z = pos.getZ(i);
      const x = pos.getX(i);
      if (z > 0.4) {
        const n =
          Math.sin(x * 7.3 + y * 3.1) * 0.018 +
          Math.sin(x * 13.1) * 0.01 +
          (layer.rock ? Math.sin(x * 21) * 0.012 : 0);
        pos.setZ(i, z + n);
      }
    }
    g.computeVertexNormals();
    return g;
  }, [layer.h, layer.rock, segs, y]);
  return (
    <mesh position={[0, y, 0]} geometry={geom} castShadow receiveShadow>
      <meshStandardMaterial
        color={layer.color}
        roughness={layer.rock ? 0.82 : 0.93}
        metalness={layer.rock ? 0.08 : 0.02}
        normalMap={layer.soil ? soilN : layer.rock ? rockN : undefined}
        normalScale={nrmScale}
      />
    </mesh>
  );
}

function Stack() {
  const idx = Math.min(2, Math.max(0, Math.round(useLabControls((s) => s.params.soil ?? s.params.profile ?? 0))));
  const p = PROFILES[idx]!;
  const q = useQuality();
  const soilN = useSoilNormal();
  const rockN = useRockNormal();
  const segs = Math.max(12, Math.floor(q.sphere / 6));
  const placed = useMemo(() => {
    let y = 1.52;
    return p.layers.map((layer) => {
      y -= layer.h / 2;
      const at = y;
      y -= layer.h / 2;
      return { layer, y: at };
    });
  }, [p]);
  const present = new Set(p.layers.map((l) => l.id));
  return (
    <group>
      <StudioFloor size={10} />
      {placed.map(({ layer, y }) => (
        <group key={layer.id}>
          <Slab layer={layer} y={y} segs={segs} soilN={soilN} rockN={rockN} />
          <Tag
            pos={[1.55, y, 0]}
            text={layer.id}
            tone={layer.id === "A" ? "sandstone" : layer.id === "R" ? "chalk" : "moss"}
            occlude={false}
            note={
              layer.id === "O"
                ? "Organic litter. Thin on grassland, thicker in woodland."
                : layer.id === "A"
                  ? "Mixed mineral-organic topsoil. The budget this lab spends."
                  : layer.id === "E"
                    ? "Eluviated: pale because clay and iron have washed down. Can be missing."
                    : layer.id === "B"
                      ? "Illuviated: clay and iron accumulate. Colour is not texture."
                      : layer.id === "C"
                        ? "Weathered parent material, not yet soil."
                        : "R: unweathered rock. The floor of the profile."
            }
          />
        </group>
      ))}
      {(["O", "A", "E", "B", "C", "R"] as const).map((id, i) =>
        present.has(id) ? null : (
          <Tag key={`miss-${id}`} pos={[-1.85, 1.35 - i * 0.28, 0]} text={`${id} absent`} tone="fault" occlude={false} />
        ),
      )}
      <Readout pos={[0, 2.45, 0]}>
        {p.name} · {p.note}
      </Readout>
      <StepCamera positions={[[2.5, 0.85, 5.4], [1.3, 2.15, 3.3], [1.5, 0.35, 3.5], [1.7, -0.55, 3.6]]} />
    </group>
  );
}

export default function SoilProfileScene() {
  const idx = Math.min(2, Math.max(0, Math.round(useLabControls((s) => s.params.soil ?? s.params.profile ?? 0))));
  const p = PROFILES[idx]!;
  return (
    <LabStudio
      slug="soil-profile"
      title="Soil profile"
      camera={{ position: [2.5, 0.85, 5.4], fov: 40 }}
      exaggeration="Horizons are true relative thickness. The slab is a cut face, not a hillside."
      liveText={`${p.name}. Horizons O A E B C R with real relative thickness. ${p.note}.`}
      fallback={<GenericFallback slug="soil-profile" title="Soil profile" caption="O A E B C R stack. Brown earth, mollisol, oxisol." />}
      minDistance={2.4}
      maxDistance={12}
      target={[0, 0.4, 0]}
    >
      <Stack />
    </LabStudio>
  );
}
