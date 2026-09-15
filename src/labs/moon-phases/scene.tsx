import { Html, OrbitControls } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { EarthMesh, Atmosphere, Starfield } from "@/components/globe/earth";
import { MoonMesh, SunMesh } from "@/components/globe/moon";
import { ClientCanvas } from "@/components/globe/client-canvas";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";

const PHASES = ["New", "Waxing crescent", "First quarter", "Waxing gibbous", "Full", "Waning gibbous", "Last quarter", "Waning crescent"];

function System() {
  useLabTick(1 / 22);
  const t = useLabControls((s) => s.t);
  const labels = useLabControls((s) => s.labels);
  const align = (useLabControls((s) => s.params.align) ?? 0) > 0.5;
  const tilt = align ? 0 : 5;
  const angle = t * Math.PI * 2;
  const moonR = 2.35;
  const incl = THREE.MathUtils.degToRad(tilt);
  const mx = Math.cos(angle) * moonR;
  const my = Math.sin(angle) * moonR * Math.sin(incl);
  const mz = Math.sin(angle) * moonR * Math.cos(incl);
  const phaseIdx = Math.round(t * 8) % 8;
  const sunDir = useMemo(() => new THREE.Vector3(1, 0, 0), []);

  return (
    <>
      <ambientLight intensity={0.06} />
      <directionalLight position={[12, 0, 0]} intensity={3.2} color="#fff4dc" />
      <Starfield />

      <group position={[8.5, 0, 0]}>
        <SunMesh radius={0.55} />
      </group>

      <group>
        <EarthMesh sunDirection={sunDir} radius={0.55} />
        <Atmosphere radius={0.58} />
      </group>

      <group position={[mx, my, mz]}>
        <MoonMesh radius={0.27} />
      </group>

      <mesh rotation={[incl, 0, 0]}>
        <ringGeometry args={[moonR - 0.01, moonR + 0.01, 96]} />
        <meshBasicMaterial color="#8B9A97" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {labels && (
        <>
          <Html position={[0, 1.55, 0]} center style={{ pointerEvents: "none" }}>
            <div className="rounded-[16px] border border-white/10 bg-basalt/70 px-3 py-2 text-center font-mono text-[11px] text-chalk">
              {PHASES[phaseIdx]} · day {(t * 29.53).toFixed(1)} of synodic month
              <div className="text-mist">
                Orbit tilt {tilt.toFixed(0)}° · {align ? "eclipse possible" : "usually misses shadow"}
              </div>
            </div>
          </Html>
          <Html position={[mx, my + 0.38, mz]} center style={{ pointerEvents: "none" }}>
            <span className="font-mono text-[10px] text-chalk">Moon</span>
          </Html>
          <Html position={[0, -0.78, 0]} center style={{ pointerEvents: "none" }}>
            <span className="font-mono text-[10px] text-chalk">Earth</span>
          </Html>
        </>
      )}
      <PhaseDisc t={t} />
    </>
  );
}

function PhaseDisc({ t }: { t: number }) {
  const labels = useLabControls((s) => s.labels);
  if (!labels) return null;
  const k = (1 - Math.cos(t * Math.PI * 2)) / 2;
  return (
    <Html position={[-3.2, -1.6, 0]} center>
      <div className="rounded-[16px] border border-white/10 bg-basalt/75 p-3 text-center">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-mist">
          UK / US night sky
        </p>
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="30" fill="#1C2628" />
          <circle cx="36" cy="36" r="30" fill="#F4EFE6" />
          <ellipse
            cx={36 + (t < 0.5 ? 30 * (1 - 2 * t) * 2 : 0)}
            cy="36"
            rx={Math.abs(Math.cos(t * Math.PI * 2)) * 30}
            ry="30"
            fill={t < 0.5 ? "#1C2628" : "#F4EFE6"}
          />
          <rect
            x={t < 0.5 ? 6 : 36}
            y="6"
            width="30"
            height="60"
            fill={t < 0.5 ? "#1C2628" : "#F4EFE6"}
          />
        </svg>
        <p className="mt-1 font-mono text-[10px] text-mist">{Math.round(k * 100)}% lit</p>
      </div>
    </Html>
  );
}

export default function MoonScene() {
  const setParam = useLabControls((s) => s.setParam);
  const align = useLabControls((s) => s.params.align ?? 0);
  return (
    <>
      <ClientCanvas camera={{ position: [0, 2.4, 6.2], fov: 42 }}>
        <System />
        <OrbitControls enablePan={false} minDistance={4} maxDistance={12} />
      </ClientCanvas>
      <button
        type="button"
        onClick={() => setParam("align", align > 0.5 ? 0 : 1)}
        className="pointer-events-auto absolute right-6 top-[7.5rem] z-10 hidden rounded-full border border-white/10 bg-basalt/70 px-3 py-1.5 font-mono text-[11px] text-chalk backdrop-blur-xl md:block"
      >
        Eclipse alignment {align > 0.5 ? "on (0° tilt)" : "off (5° tilt)"}
      </button>
    </>
  );
}
