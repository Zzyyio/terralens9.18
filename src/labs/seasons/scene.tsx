import { Html, OrbitControls, Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  Atmosphere,
  AxisLine,
  CityMarker,
  EarthMesh,
  Graticule,
  Starfield,
} from "@/components/globe/earth";
import { SunMesh } from "@/components/globe/moon";
import { ClientCanvas } from "@/components/globe/client-canvas";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import {
  CITIES,
  dayLengthHours,
  formatDay,
  solarDeclination,
  solarNoonAltitude,
} from "@/lib/geo";
import { SeasonsFallback } from "./fallback";
import { useWebGL } from "@/components/globe/client-canvas";

const ORBIT_A = 2.85;

function System() {
  useLabTick(1 / 28);
  const t = useLabControls((s) => s.t);
  const params = useLabControls((s) => s.params);
  const labels = useLabControls((s) => s.labels);
  const graticule = useLabControls((s) => s.graticule);
  const tilt = params.tilt ?? 23.44;
  const ecc = params.ecc ?? 0;

  const earthG = useRef<THREE.Group>(null);
  const sunDir = useMemo(() => new THREE.Vector3(), []);

  const day = t * 365;
  const theta = Math.PI * 2 * (t - 80 / 365);
  const nu = theta - Math.PI * 2 * (3 / 365);
  const r = ORBIT_A * (1 - ecc * ecc) / Math.max(0.35, 1 + ecc * Math.cos(nu));
  const x = -r * Math.sin(theta);
  const z = r * Math.cos(theta);
  sunDir.set(-x, 0, -z).normalize();

  const decl = solarDeclination(day, tilt);
  const cities = [
    { ...CITIES.london, color: "#3EE0C6" },
    { ...CITIES.cairo, color: "#E8B86D" },
    { ...CITIES.nairobi, color: "#7C9A6A" },
    { ...CITIES.sydney, color: "#7FD4FF" },
    { ...CITIES.ushuaia, color: "#FF6A3D" },
  ];

  const orbitPts = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      const rr = ORBIT_A;
      pts.push(new THREE.Vector3(-rr * Math.sin(a), 0, rr * Math.cos(a)));
    }
    return pts;
  }, []);

  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight position={[0, 0, 0]} intensity={40} distance={24} color="#fff1c4" />
      <Starfield />
      <Line points={orbitPts} color="#8B9A97" transparent opacity={0.35} />

      <group>
        <SunMesh radius={0.22} />
      </group>

      <group ref={earthG} position={[x, 0, z]}>
        <group rotation={[0, 0, THREE.MathUtils.degToRad(tilt)]}>
          <EarthMesh sunDirection={sunDir} radius={1.02} clouds />
          <Atmosphere radius={1.06} />
          <AxisLine radius={1.28} tiltDeg={0} />
          {graticule && <Graticule radius={1.03} />}
          {cities.map((c) => (
            <group key={c.name}>
              <CityMarker lat={c.lat} lon={c.lon} radius={1.05} color={c.color} />
              {labels && (
                <Html
                  position={latLonHtml(c.lat, c.lon, 1.22)}
                  center
                  style={{ pointerEvents: "none" }}
                >
                  <span className="rounded-full border border-white/15 bg-basalt/80 px-2 py-0.5 font-mono text-[10px] text-chalk whitespace-nowrap">
                    {c.name}
                  </span>
                </Html>
              )}
            </group>
          ))}
        </group>
      </group>

      <Hud day={day} tilt={tilt} decl={decl} ecc={ecc} />
    </>
  );
}

function latLonHtml(lat: number, lon: number, r: number): [number, number, number] {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const th = THREE.MathUtils.degToRad(lon + 180);
  return [-r * Math.sin(phi) * Math.sin(th), r * Math.cos(phi), r * Math.sin(phi) * Math.cos(th)];
}

function Hud({
  day,
  tilt,
  decl,
  ecc,
}: {
  day: number;
  tilt: number;
  decl: number;
  ecc: number;
}) {
  const labels = useLabControls((s) => s.labels);
  if (!labels) return null;
  const rows = [
    ["London", CITIES.london.lat],
    ["Nairobi", CITIES.nairobi.lat],
    ["Sydney", CITIES.sydney.lat],
    ["Ushuaia", CITIES.ushuaia.lat],
  ] as const;
  return (
    <Html position={[0, 2.35, 0]} center style={{ pointerEvents: "none", width: 520 }}>
      <div className="rounded-[16px] border border-white/10 bg-basalt/70 px-3 py-2 font-mono text-[11px] text-chalk backdrop-blur-md">
        <div className="flex justify-between text-mist">
          <span>{formatDay(day)}</span>
          <span>tilt {tilt.toFixed(1)}°</span>
          <span>δ {THREE.MathUtils.radToDeg(decl).toFixed(1)}°</span>
          {ecc > 0.02 && <span className="text-sandstone">e exaggerated</span>}
        </div>
        <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {rows.map(([name, lat]) => (
            <div key={name}>
              <div className="text-mist">{name}</div>
              <div className="tabular-nums">
                {dayLengthHours(lat, decl).toFixed(1)} h · noon{" "}
                {solarNoonAltitude(lat, decl).toFixed(0)}°
              </div>
            </div>
          ))}
        </div>
      </div>
    </Html>
  );
}

function Callouts() {
  const setParam = useLabControls((s) => s.setParam);
  const setGraticule = useLabControls((s) => s.setGraticule);
  const graticule = useLabControls((s) => s.graticule);
  const ecc = useLabControls((s) => s.params.ecc ?? 0);
  return (
    <div className="pointer-events-auto absolute right-6 top-[7.5rem] z-10 hidden flex-col gap-2 md:flex">
      <button
        type="button"
        onClick={() => setGraticule(!graticule)}
        className="rounded-full border border-white/10 bg-basalt/70 px-3 py-1.5 font-mono text-[11px] text-chalk backdrop-blur-xl"
      >
        Graticule {graticule ? "on" : "off"}
      </button>
      <button
        type="button"
        onClick={() => setParam("ecc", ecc > 0.05 ? 0 : 0.32)}
        className="rounded-full border border-white/10 bg-basalt/70 px-3 py-1.5 font-mono text-[11px] text-chalk backdrop-blur-xl"
      >
        {ecc > 0.05 ? "Real eccentricity" : "Exaggerate distance"}
      </button>
    </div>
  );
}

export default function SeasonsScene() {
  const webgl = useWebGL();
  if (!webgl) return <SeasonsFallback />;
  return (
    <>
      <ClientCanvas camera={{ position: [0, 1.85, 6.4], fov: 38 }}>
        <System />
        <OrbitControls enablePan={false} minDistance={4} maxDistance={12} target={[0, 0, 0]} />
      </ClientCanvas>
      <Callouts />
    </>
  );
}
