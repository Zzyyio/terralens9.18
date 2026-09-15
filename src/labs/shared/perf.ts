import { useIsCompact } from "@/hooks/use-media";

export type Quality = {
  sphere: number;
  terrain: number;
  lathe: number;
  particles: number;
  shadows: boolean;
  dpr: [number, number];
  stars: number;
};

export function useQuality(): Quality {
  const compact = useIsCompact();
  if (compact) {
    return {
      sphere: 64,
      terrain: 128,
      lathe: 64,
      particles: 10,
      shadows: false,
      dpr: [1, 1.35],
      stars: 800,
    };
  }
  return {
    sphere: 128,
    terrain: 256,
    lathe: 128,
    particles: 24,
    shadows: true,
    dpr: [1, 2],
    stars: 2200,
  };
}
