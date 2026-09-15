import { useTexture } from "@react-three/drei";
import * as THREE from "three";

/** PBR presets. Colours encode mechanism, not decoration. */
export const PBR = {
  rock: { color: "#5c564c", roughness: 0.92, metalness: 0.04 },
  crust: { color: "#7C9A6A", roughness: 0.88, metalness: 0.02 },
  mantle: { color: "#4f463c", roughness: 0.93, metalness: 0.06 },
  outerCore: { color: "#c4a05a", roughness: 0.28, metalness: 0.72 },
  innerCore: { color: "#e8d5a3", roughness: 0.18, metalness: 0.82 },
  water: { color: "#1a4a6e", roughness: 0.08, metalness: 0.06 },
  ice: { color: "#d5eaf4", roughness: 0.14, metalness: 0.04 },
  soil: { color: "#6b5344", roughness: 0.96, metalness: 0.02 },
  sand: { color: "#c4a574", roughness: 0.9, metalness: 0.02 },
  magma: { color: "#ff6a3d", roughness: 0.35, metalness: 0.1, emissive: "#ff3b00", emissiveIntensity: 0.45 },
  ash: { color: "#3a4038", roughness: 0.95, metalness: 0.02 },
  limestone: { color: "#d8d0c0", roughness: 0.7, metalness: 0.04 },
  basalt: { color: "#3d3a38", roughness: 0.86, metalness: 0.08 },
  granite: { color: "#b8a090", roughness: 0.72, metalness: 0.06 },
} as const;

export function useRockNormal() {
  const t = useTexture("/textures/rock-normal.png");
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 2);
  t.colorSpace = THREE.NoColorSpace;
  t.anisotropy = 8;
  return t;
}

export function useSoilNormal() {
  const t = useTexture("/textures/soil-normal.png");
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 3);
  t.colorSpace = THREE.NoColorSpace;
  t.anisotropy = 8;
  return t;
}

export function useCloudMap() {
  const t = useTexture("/textures/clouds.png");
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  t.wrapS = THREE.RepeatWrapping;
  return t;
}

export function useMoonMap() {
  const t = useTexture("/textures/moon.jpg");
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** USDA 12-class texture from sand/silt/clay percents (0–100). */
export function usdaClass(sand: number, clay: number): string {
  const silt = Math.max(0, 100 - sand - clay);
  if (clay >= 40 && sand <= 45 && silt < 40) return "Clay";
  if (clay >= 40 && silt >= 40) return "Silty clay";
  if (clay >= 35 && sand >= 45) return "Sandy clay";
  if (clay >= 27 && clay < 40 && sand <= 20) return "Silty clay loam";
  if (clay >= 27 && clay < 40 && sand > 45 && silt < 28) return "Sandy clay loam";
  if (clay >= 27 && clay < 40) return "Clay loam";
  if (silt >= 80 && clay < 12) return "Silt";
  if (silt >= 50 && clay < 27 && sand <= 20) return "Silt loam";
  if (clay >= 7 && clay < 27 && silt >= 28 && silt < 50 && sand < 52) return "Loam";
  if (clay < 20 && sand >= 43 && sand < 85 && (silt + 1.5 * clay) >= 15) {
    if (clay >= 7 && sand < 52) return "Sandy loam";
    return "Sandy loam";
  }
  if (sand >= 70 && clay <= 15 && (silt + 2 * clay) < 30) {
    if (sand >= 85 && clay < 10) return "Sand";
    return "Loamy sand";
  }
  if (sand >= 85 && clay < 10) return "Sand";
  if (sand >= 70) return "Loamy sand";
  if (silt >= 50) return "Silt loam";
  if (clay >= 20) return "Clay loam";
  return "Loam";
}

export const WATER_PHYSICAL = {
  roughness: 0.06,
  metalness: 0.06,
  transmission: 0.28,
  thickness: 0.55,
  ior: 1.333,
  transparent: true,
  opacity: 0.78,
  envMapIntensity: 0.85,
} as const;

export const ICE_PHYSICAL = {
  roughness: 0.14,
  metalness: 0.04,
  transmission: 0.42,
  thickness: 1.2,
  ior: 1.31,
  transparent: true,
  opacity: 0.88,
  envMapIntensity: 0.9,
} as const;
