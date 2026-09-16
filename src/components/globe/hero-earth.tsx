import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Atmosphere, EarthMesh, Starfield } from "./earth";
import { ClientCanvas, useWebGL } from "./client-canvas";
import { usePrefersReducedMotion } from "@/hooks/use-media";

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

export function HeroEarth({ force3d = false }: { force3d?: boolean }) {
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGL();
  const [paused, setPaused] = useState(false);

  if (webgl === null) {
    return (
      <div className="absolute inset-0 bg-void">
        <img
          src="/textures/earth-day.jpg"
          alt="Earth from space: the sunlit Blue Marble, Africa and Arabia under scattered cloud."
          className="size-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/70 to-transparent" />
      </div>
    );
  }

  if (!webgl) {
    return (
      <div className="absolute inset-0 bg-void">
        <img
          src="/textures/earth-day.jpg"
          alt="Earth from space: the sunlit Blue Marble, Africa and Arabia under scattered cloud."
          className="size-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/70 to-transparent" />
        <p className="absolute bottom-6 left-5 z-10 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-mist backdrop-blur-xl">
          2D fallback · WebGL unavailable
        </p>
      </div>
    );
  }

  if (!force3d) {
    /* Homepage wrapper decides when to mount this; keep the same camera and light. */
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
