import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor } from "@/labs/shared/kit";
import { usdaClass } from "@/labs/shared/materials";
import { GenericFallback } from "@/labs/shared/fallback";

const COLS: Record<string, string> = {
  Sand: "#e8c98a",
  "Loamy sand": "#d7b56e",
  "Sandy loam": "#c4a056",
  Loam: "#8a7a48",
  "Silt loam": "#b8c47a",
  Silt: "#cfe08a",
  "Sandy clay loam": "#a07048",
  "Clay loam": "#7a5a38",
  "Silty clay loam": "#6a7040",
  "Sandy clay": "#8a5030",
  "Silty clay": "#5a6040",
  Clay: "#5a3a28",
};

function usdaTexture() {
  const size = 768;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#121a1c";
  ctx.fillRect(0, 0, size, size);
  const sand = { x: size * 0.08, y: size * 0.9 };
  const silt = { x: size * 0.92, y: size * 0.9 };
  const clay = { x: size * 0.5, y: size * 0.08 };
  const bary = (px: number, py: number) => {
    const det = (silt.y - clay.y) * (sand.x - clay.x) + (clay.x - silt.x) * (sand.y - clay.y);
    const a = ((silt.y - clay.y) * (px - clay.x) + (clay.x - silt.x) * (py - clay.y)) / det;
    const b = ((clay.y - sand.y) * (px - clay.x) + (sand.x - clay.x) * (py - clay.y)) / det;
    const c0 = 1 - a - b;
    return { sand: a * 100, silt: b * 100, clay: c0 * 100 };
  };
  const img = ctx.createImageData(size, size);
  const hex = (h: string) => {
    const n = parseInt(h.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const { sand: sa, silt: si, clay: cl } = bary(x + 0.5, y + 0.5);
      const i = (y * size + x) * 4;
      if (sa < -1 || si < -1 || cl < -1) {
        img.data[i + 3] = 0;
        continue;
      }
      if (sa < 0 || si < 0 || cl < 0) {
        img.data[i + 3] = 0;
        continue;
      }
      const name = usdaClass(sa, cl);
      const [r, g, b] = hex(COLS[name] ?? "#8a7a48");
      img.data[i] = r;
      img.data[i + 1] = g;
      img.data[i + 2] = b;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  ctx.strokeStyle = "#f4efe6";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(sand.x, sand.y);
  ctx.lineTo(silt.x, silt.y);
  ctx.lineTo(clay.x, clay.y);
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = "#f4efe6";
  ctx.font = "28px ui-monospace, monospace";
  ctx.fillText("SAND", sand.x, sand.y + 36);
  ctx.fillText("SILT", silt.x - 70, silt.y + 36);
  ctx.fillText("CLAY", clay.x - 36, clay.y - 10);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function Triangle() {
  const sand = useLabControls((s) => s.params.sand ?? 40);
  const clay = useLabControls((s) => s.params.clay ?? 20);
  const silt = Math.max(0, 100 - sand - clay);
  const cls = usdaClass(sand, clay);
  const tex = useMemo(() => (typeof document === "undefined" ? null : usdaTexture()), []);
  const x = ((silt - sand) / 100) * 1.55;
  const y = (clay / 100) * 2.35 - 0.15;
  return (
    <group>
      <StudioFloor size={8} />
      <mesh rotation={[-0.18, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[3.4, 3.4]} />
        {tex ? (
          <meshStandardMaterial map={tex} roughness={0.7} metalness={0.02} />
        ) : (
          <meshStandardMaterial color="#1c2628" />
        )}
      </mesh>
      <mesh position={[x, 0.12 + y * 0.05, y * 0.15 - 0.2]}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshStandardMaterial color="#E8B86D" emissive="#E8B86D" emissiveIntensity={0.35} />
      </mesh>
      <Tag pos={[-1.55, 0.2, 1.35]} text="Sand" tone="sandstone" />
      <Tag pos={[1.55, 0.2, 1.35]} text="Silt" />
      <Tag pos={[0, 2.15, -1.4]} text="Clay" tone="magma" />
      <Readout>
        {cls} · sand {sand.toFixed(0)} · silt {silt.toFixed(0)} · clay {clay.toFixed(0)}
      </Readout>
    </group>
  );
}

export default function SoilTextureScene() {
  const sand = useLabControls((s) => s.params.sand ?? 40);
  const clay = useLabControls((s) => s.params.clay ?? 20);
  const cls = usdaClass(sand, clay);
  return (
    <LabStudio
      slug="soil-texture"
      title="Soil texture triangle"
      camera={{ position: [0, 2.2, 4.4], fov: 40 }}
      liveText={`USDA class ${cls}. Sand ${sand.toFixed(0)} percent, clay ${clay.toFixed(0)} percent.`}
      fallback={<GenericFallback slug="soil-texture" title="Soil texture" caption={`Class: ${cls}`} />}
    >
      <Triangle />
    </LabStudio>
  );
}
