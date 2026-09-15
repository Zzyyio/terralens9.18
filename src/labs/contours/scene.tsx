import { OrbitControls, Html } from "@react-three/drei";
import { useMemo, useState } from "react";
import * as THREE from "three";
import { ClientCanvas } from "@/components/globe/client-canvas";
import { useLabControls } from "@/lib/store/lab-controls";

/** Invented hill: knoll + spur + valley. Heights in metres. */
function height(x: number, y: number): number {
  const knoll = 180 * Math.exp(-((x - 0.6) ** 2 + (y - 0.3) ** 2) / 0.35);
  const knoll2 = 120 * Math.exp(-((x + 0.9) ** 2 + (y + 0.7) ** 2) / 0.28);
  const ridge = 90 * Math.exp(-((y - 0.15 * x) ** 2) / 0.18) * (1 / (1 + Math.abs(x + 0.2)));
  const valley = -70 * Math.exp(-((x + 0.2 * y) ** 2) / 0.12) * Math.max(0, 1.2 - Math.abs(y));
  return Math.max(5, knoll + knoll2 + ridge + valley + 40);
}

function Terrain({ mode3d }: { mode3d: boolean }) {
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(4.6, 4.6, 80, 80);
    const pos = g.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const h = height(x, y);
      pos.setZ(i, mode3d ? h / 120 : 0);
      if (h < 40) c.set("#1C2628");
      else if (h < 80) c.set("#7C9A6A");
      else if (h < 140) c.set("#E8B86D");
      else c.set("#F4EFE6");
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    g.computeVertexNormals();
    return g;
  }, [mode3d]);

  return (
    <mesh geometry={geom} rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
      <meshStandardMaterial vertexColors roughness={0.85} />
    </mesh>
  );
}

function ContourLines({ interval, mode3d }: { interval: number; mode3d: boolean }) {
  const obj = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const res = 90;
    const size = 4.6;
    const step = size / res;
    const levels: number[] = [];
    for (let h = interval; h <= 220; h += interval) levels.push(h);
    for (let i = 0; i < res; i++) {
      for (let j = 0; j < res; j++) {
        const x0 = -size / 2 + i * step;
        const y0 = -size / 2 + j * step;
        const x1 = x0 + step;
        const y1 = y0 + step;
        const h00 = height(x0, y0);
        const h10 = height(x1, y0);
        const h01 = height(x0, y1);
        for (const L of levels) {
          march(pts, L, x0, y0, h00, x1, y0, h10, mode3d);
          march(pts, L, x0, y0, h00, x0, y1, h01, mode3d);
        }
      }
    }
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    const m = new THREE.LineBasicMaterial({ color: 0x121a1c });
    return new THREE.LineSegments(g, m);
  }, [interval, mode3d]);

  return <primitive object={obj} />;
}

function march(
  pts: THREE.Vector3[],
  L: number,
  x0: number,
  y0: number,
  h0: number,
  x1: number,
  y1: number,
  h1: number,
  mode3d: boolean,
) {
  if ((h0 - L) * (h1 - L) > 0) return;
  const t = (L - h0) / (h1 - h0 + 1e-6);
  const x = x0 + (x1 - x0) * t;
  const y = y0 + (y1 - y0) * t;
  const z = mode3d ? L / 120 + 0.012 : 0.02;
  pts.push(new THREE.Vector3(x, z, -y), new THREE.Vector3(x + 0.018, z, -y));
}

export default function ContoursScene() {
  const interval = useLabControls((s) => s.params.interval ?? 10);
  const labels = useLabControls((s) => s.labels);
  const mode3d = (useLabControls((s) => s.params.mode3d) ?? 1) > 0.5;
  const setParam = useLabControls((s) => s.setParam);
  const setInspect = useLabControls((s) => s.setInspect);
  const inspect = useLabControls((s) => s.inspect);
  const [spot, setSpot] = useState<{ x: number; y: number; h: number } | null>({
    x: 0.6,
    y: 0.3,
    h: height(0.6, 0.3),
  });

  return (
    <>
      <ClientCanvas camera={{ position: [3.2, 3.4, 3.6], fov: 42 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 2]} intensity={1.4} castShadow />
        <Terrain mode3d={mode3d} />
        <ContourLines interval={interval} mode3d={mode3d} />
        {spot && (
          <mesh position={[spot.x, (mode3d ? spot.h / 120 : 0) + 0.05, -spot.y]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color="#E24B4B" />
          </mesh>
        )}
        {labels && (
          <>
            <Html position={[0.7, 1.7, -0.3]} center style={{ pointerEvents: "none" }}>
              <span className="rounded-full bg-basalt/80 px-2 py-0.5 font-mono text-[10px] text-chalk">
                Knoll
              </span>
            </Html>
            <Html position={[-0.2, 0.9, 1.1]} center style={{ pointerEvents: "none" }}>
              <span className="rounded-full bg-basalt/80 px-2 py-0.5 font-mono text-[10px] text-ice">
                Valley
              </span>
            </Html>
            <Html position={[1.3, 1.1, 0.6]} center style={{ pointerEvents: "none" }}>
              <span className="rounded-full bg-basalt/80 px-2 py-0.5 font-mono text-[10px] text-sandstone">
                Spur
              </span>
            </Html>
            {spot && (
              <Html position={[spot.x, 0.4, -spot.y]} center style={{ pointerEvents: "none" }}>
                <span className="rounded-full bg-basalt/80 px-2 py-0.5 font-mono text-[10px] text-fault">
                  Spot {spot.h.toFixed(0)} m
                </span>
              </Html>
            )}
          </>
        )}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.01, 0]}
          onClick={(e) => {
            e.stopPropagation();
            const x = e.point.x;
            const y = -e.point.z;
            const h = height(x, y);
            setSpot({ x, y, h });
            setInspect({
              name: `${h.toFixed(0)} m`,
              note: "The line through this point is this height. Toggle 2D / 3D: the lines are the hill.",
            });
          }}
        >
          <planeGeometry args={[4.6, 4.6]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <OrbitControls
          enablePan
          maxPolarAngle={mode3d ? Math.PI / 2.05 : 0.02}
          minPolarAngle={mode3d ? 0.2 : 0}
        />
      </ClientCanvas>
      <div className="pointer-events-auto absolute right-6 top-[7.5rem] z-10 hidden flex-col gap-2 md:flex">
        <button
          type="button"
          onClick={() => setParam("mode3d", mode3d ? 0 : 1)}
          className="rounded-full border border-white/10 bg-basalt/70 px-3 py-1.5 font-mono text-[11px] text-chalk backdrop-blur-xl"
        >
          {mode3d ? "2D map" : "3D hill"}
        </button>
        <p className="font-mono text-[10px] text-mist">Click the hill to drop a spot height</p>
      </div>
      {inspect && (
        <div className="pointer-events-auto absolute bottom-28 left-1/2 z-10 w-[min(28rem,calc(100%-2rem))] -translate-x-1/2 rounded-2xl border border-white/10 bg-basalt/85 px-4 py-3 backdrop-blur-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-glacier">Inspect</p>
          <p className="mt-1 font-medium text-chalk">{inspect.name}</p>
          <p className="mt-1 text-[12px] leading-5 text-mist">{inspect.note}</p>
        </div>
      )}
    </>
  );
}
