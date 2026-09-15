import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Atmosphere, EarthMesh, Starfield } from "./earth";
import { ClientCanvas, useWebGL } from "./client-canvas";
import { usePrefersReducedMotion, useIsCompact } from "@/hooks/use-media";

function RotatingEarth({ paused, freeze }: { paused: boolean; freeze: boolean }) {
  const g = useRef<THREE.Group>(null);
  const sun = useMemo(() => new THREE.Vector3(6, 0.5, 2.2), []);
  useFrame((_, raw) => {
    if (!g.current || freeze || paused) return;
    const d = Math.min(raw, 0.1);
    g.current.rotation.y += d * ((Math.PI * 2) / 90);
  });
  return (
    <group ref={g} rotation={[0, 0.6, 0.35]}>
      <EarthMesh sunDirection={sun} clouds />
      <Atmosphere />
    </group>
  );
}

export function HeroEarth() {
  const reduced = usePrefersReducedMotion();
  const compact = useIsCompact();
  const webgl = useWebGL();
  const [paused, setPaused] = useState(false);
  const [want3d, setWant3d] = useState(!compact);

  if (!webgl || (compact && !want3d)) {
    return (
      <div className="absolute inset-0 bg-void">
        <img src="/textures/earth-day.jpg" alt="" className="size-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/70 to-transparent" />
        {compact && webgl && (
          <button
            type="button"
            onClick={() => setWant3d(true)}
            className="absolute bottom-6 left-5 z-10 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-chalk backdrop-blur-xl md:left-1/2 md:-translate-x-1/2"
          >
            Play 3D globe
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <ClientCanvas camera={{ position: [0, 0.2, 3.15], fov: 38 }} frameloop="always">
        <ambientLight intensity={0.18} />
        <directionalLight position={[6, 0.5, 2.2]} intensity={2.1} color="#fff4e0" />
        <Starfield />
        <RotatingEarth paused={paused} freeze={reduced} />
      </ClientCanvas>
    </div>
  );
}
