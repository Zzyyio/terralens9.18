import { Html, OrbitControls } from "@react-three/drei";
import { useMemo, useState } from "react";
import * as THREE from "three";
import { Atmosphere, EarthMesh, Starfield } from "./earth";
import { ClientCanvas, useWebGL } from "./client-canvas";
import { usePrefersReducedMotion } from "@/hooks/use-media";
import { latLonToXYZ } from "@/lib/geo";

const CITIES: { name: string; lat: number; lon: number }[] = [
  { name: "London", lat: 51.51, lon: -0.13 },
  { name: "Nairobi", lat: -1.29, lon: 36.82 },
  { name: "Shanghai", lat: 31.23, lon: 121.47 },
  { name: "New York", lat: 40.71, lon: -74.01 },
  { name: "Sydney", lat: -33.87, lon: 151.21 },
];

function MarblePoster({ note }: { note?: string }) {
  return (
    <div className="absolute inset-0 bg-void">
      <img
        src="/textures/earth-day.jpg"
        alt="Earth from space: the sunlit Blue Marble, Africa and Arabia under scattered cloud."
        className="size-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-void via-void/70 to-transparent" />
      {note ? (
        <p className="absolute bottom-6 left-5 z-10 max-w-sm rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-mist backdrop-blur-xl">
          {note}
        </p>
      ) : null}
    </div>
  );
}

function Graticule({ radius = 1.012 }: { radius?: number }) {
  const geom = useMemo(() => {
    const pts: number[] = [];
    const push = (lat0: number, lon0: number, lat1: number, lon1: number) => {
      const a = latLonToXYZ(lat0, lon0, radius);
      const b = latLonToXYZ(lat1, lon1, radius);
      pts.push(a[0], a[1], a[2], b[0], b[1], b[2]);
    };
    for (let lat = -75; lat <= 75; lat += 15) {
      for (let lon = -180; lon < 180; lon += 5) push(lat, lon, lat, lon + 5);
    }
    for (let lon = -180; lon < 180; lon += 30) {
      for (let lat = -80; lat < 80; lat += 5) push(lat, lon, lat + 5, lon);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [radius]);
  return (
    <lineSegments geometry={geom}>
      <lineBasicMaterial color="#7FD4FF" transparent opacity={0.32} depthWrite={false} />
    </lineSegments>
  );
}

function CityLabels() {
  return (
    <group>
      {CITIES.map((c) => {
        const p = latLonToXYZ(c.lat, c.lon, 1.06);
        return (
          <Html key={c.name} position={p} center style={{ pointerEvents: "none" }}>
            <span className="rounded-full border border-white/15 bg-basalt/80 px-2 py-0.5 font-mono text-[10px] text-chalk">
              {c.name}
            </span>
          </Html>
        );
      })}
    </group>
  );
}

export function HeroEarth() {
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGL();
  const [grid, setGrid] = useState(false);
  const [labels, setLabels] = useState(false);
  const sun = useMemo(() => new THREE.Vector3(6, 0.5, 2.2), []);

  if (webgl === null) return <MarblePoster />;
  if (!webgl) {
    return <MarblePoster note="WebGL unavailable. NASA Blue Marble still — this is a photograph, not a 2D globe." />;
  }

  return (
    <div className="absolute inset-0">
      <ClientCanvas camera={{ position: [0, 0.2, 3.15], fov: 38 }} frameloop="always">
        <ambientLight intensity={0.2} />
        <hemisphereLight args={["#9ec4d4", "#1c1814", 0.32]} />
        <directionalLight position={[6, 0.5, 2.2]} intensity={2.35} color="#fff4e0" />
        <Starfield />
        <group rotation={[0, 0.6, 0.35]}>
          <EarthMesh sunDirection={sun} clouds segments={128} />
          <Atmosphere />
          {grid && <Graticule />}
          {labels && <CityLabels />}
        </group>
        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={1.85}
          maxDistance={5.6}
          autoRotate={!reduced}
          autoRotateSpeed={0.42}
        />
      </ClientCanvas>
      <div className="pointer-events-auto absolute bottom-6 right-5 z-20 flex gap-2 md:bottom-8 md:right-8">
        <button
          type="button"
          onClick={() => setGrid((v) => !v)}
          className="h-11 rounded-full border border-white/10 bg-basalt/70 px-4 text-sm text-chalk backdrop-blur-xl"
        >
          {grid ? "Hide grid" : "Graticule"}
        </button>
        <button
          type="button"
          onClick={() => setLabels((v) => !v)}
          className="h-11 rounded-full border border-white/10 bg-basalt/70 px-4 text-sm text-chalk backdrop-blur-xl"
        >
          {labels ? "Hide names" : "Labels"}
        </button>
      </div>
    </div>
  );
}
