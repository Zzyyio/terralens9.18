import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Suspense, useEffect, useState, type ReactNode } from "react";
import * as THREE from "three";

/** null = not yet tested (avoid a black canvas while we probe). */
export function useWebGL(): boolean | null {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl =
        c.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ||
        c.getContext("webgl");
      setOk(Boolean(gl));
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}

export function ClientCanvas({
  children,
  className,
  camera,
  frameloop,
  onCreated,
  gl,
  dpr,
  shadows,
}: {
  children: ReactNode;
  className?: string;
  camera?: CanvasProps["camera"];
  frameloop?: CanvasProps["frameloop"];
  onCreated?: CanvasProps["onCreated"];
  gl?: CanvasProps["gl"];
  dpr?: CanvasProps["dpr"];
  shadows?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const webgl = useWebGL();
  useEffect(() => setMounted(true), []);

  if (!mounted || webgl === null) {
    return <div className={className ?? "absolute inset-0 bg-void"} aria-hidden />;
  }
  if (!webgl) return null;

  return (
    <Canvas
      className={className ?? "absolute inset-0"}
      dpr={dpr ?? [1, 1.75]}
      camera={camera ?? { position: [0, 0.35, 3.4], fov: 42 }}
      frameloop={frameloop}
      shadows={shadows}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        localClippingEnabled: true,
        ...gl,
      }}
      onCreated={(state) => {
        state.gl.toneMapping = THREE.ACESFilmicToneMapping;
        state.gl.toneMappingExposure = 1.12;
        state.gl.outputColorSpace = THREE.SRGBColorSpace;
        state.gl.localClippingEnabled = true;
        onCreated?.(state);
      }}
    >
      <color attach="background" args={["#07090C"]} />
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
