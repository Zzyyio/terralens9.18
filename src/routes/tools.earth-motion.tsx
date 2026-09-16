import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import * as THREE from "three";
import {
  CITIES,
  dayLengthHours,
  dayOfYearUTC,
  equationOfTimeMinutes,
  fmtClock,
  fmtLatLon,
  latLonToVector3,
  seasonName,
  solarDeclination,
  solarNoonAltitude,
  sunriseSunsetHours,
  vector3ToLatLon,
} from "@/lib/geo";
import { ClientCanvas } from "@/components/globe/client-canvas";
import { EarthMesh } from "@/components/globe/earth";
import { OrbitControls } from "@react-three/drei";
import { headFor } from "@/lib/seo";
import { Figure } from "@/components/figure";

export const Route = createFileRoute("/tools/earth-motion")({
  component: EarthMotion,
  head: () =>
    headFor({
      title: "Earth-motion calculator",
      description:
        "Date and latitude to noon altitude, day length, and declination, with a 3D Earth. School geometry, not a sextant.",
      path: "/tools/earth-motion",
    }),
});

const PRESETS = [
  CITIES.london,
  CITIES.newYork,
  CITIES.nairobi,
  CITIES.sydney,
  CITIES.reykjavik,
  CITIES.ushuaia,
  CITIES.singapore,
  CITIES.shanghai,
  CITIES.hongKong,
  CITIES.taipei,
] as const;

type Site = { name: string; lat: number; lon: number };

function compute(date: string, site: Site, tilt: number, eotOn: boolean) {
  const d = new Date(`${date}T12:00:00Z`);
  const doy = Number.isNaN(d.getTime()) ? 80 : dayOfYearUTC(d);
  const decl = solarDeclination(doy, tilt);
  const declDeg = THREE.MathUtils.radToDeg(decl);
  const noon = solarNoonAltitude(site.lat, decl);
  const ss = sunriseSunsetHours(site.lat, doy, site.lon, tilt);
  const length = dayLengthHours(site.lat, decl);
  const eot = equationOfTimeMinutes(doy);
  return {
    doy,
    declDeg,
    noon,
    length,
    season: seasonName(site.lat, doy, tilt),
    sunrise: ss.sunrise + (eotOn ? eot / 60 : 0),
    sunset: ss.sunset + (eotOn ? eot / 60 : 0),
    polar: ss.polar,
    eot,
  };
}

function EarthMotion() {
  const today = useMemo(() => {
    const d = new Date();
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
  }, []);
  const [date, setDate] = useState(today);
  const [a, setA] = useState<Site>({ ...CITIES.london });
  const [b, setB] = useState<Site | null>(null);
  const [tilt, setTilt] = useState(23.44);
  const [eotOn, setEotOn] = useState(false);
  const [daySlider, setDaySlider] = useState(() => {
    const d = new Date(`${today}T12:00:00Z`);
    return dayOfYearUTC(Number.isNaN(d.getTime()) ? new Date() : d);
  });

  function applyDay(n: number) {
    const d = new Date(Date.UTC(2026, 0, 1));
    d.setUTCDate(Math.max(1, Math.min(365, Math.round(n))));
    const iso = d.toISOString().slice(0, 10);
    setDate(iso);
    setDaySlider(n);
  }

  const outA = useMemo(() => compute(date, a, tilt, eotOn), [date, a, tilt, eotOn]);
  const outB = useMemo(() => (b ? compute(date, b, tilt, eotOn) : null), [date, b, tilt, eotOn]);

  return (
    <main id="main" className="mx-auto max-w-[1180px] px-5 pb-24 pt-24">
      <p className="section-label">Tool</p>
      <h1 className="mt-3 font-display text-4xl">Earth-motion calculator</h1>
      <p className="mt-4 max-w-3xl text-mist">
        Date, latitude, longitude. Outputs: solar declination, noon altitude, sunrise/sunset in local solar
        time, day length, season, day of year, and the tilt you chose. School geometry — not a sextant. SI
        first.
      </p>
      <p className="mt-2 text-sm text-mist">
        Linked labs:{" "}
        <Link to="/lab/$slug" params={{ slug: "seasons" }} className="text-ice hover:underline">
          Why seasons happen
        </Link>
        {" · "}
        <Link to="/lab/$slug" params={{ slug: "solar-altitude" }} className="text-ice hover:underline">
          Solar altitude
        </Link>
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div>
          <label className="block text-sm text-mist">
            Date
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                const d = new Date(`${e.target.value}T12:00:00Z`);
                if (!Number.isNaN(d.getTime())) setDaySlider(dayOfYearUTC(d));
              }}
              className="mt-1 h-11 w-full rounded-[12px] border border-white/10 bg-white/6 px-3 text-chalk"
            />
          </label>
          <label className="mt-4 block text-sm text-mist">
            Day of year · {Math.round(daySlider)}
            <input
              type="range"
              min={1}
              max={365}
              value={daySlider}
              onChange={(e) => applyDay(Number(e.target.value))}
              className="mt-2 w-full accent-glacier"
            />
          </label>

          <SiteFields label="Place A" site={a} set={setA} />
          {b ? (
            <SiteFields label="Place B (compare)" site={b} set={(s) => setB(s)} />
          ) : (
            <button
              type="button"
              className="mt-4 h-11 rounded-full border border-white/10 px-4 text-sm text-chalk hover:bg-white/8"
              onClick={() => setB({ ...CITIES.sydney })}
            >
              Compare a second place
            </button>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setA({ ...p })}
                className="h-9 rounded-full border border-white/10 bg-white/6 px-3 text-sm text-chalk hover:bg-white/10"
              >
                {p.name}
              </button>
            ))}
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm text-mist">Axial tilt (teaching switch)</legend>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setTilt(23.44)}
                className={`h-9 rounded-full border px-3 text-sm ${tilt === 23.44 ? "border-glacier/40 bg-glacier text-basalt" : "border-white/10 text-chalk"}`}
              >
                23.44°
              </button>
              <button
                type="button"
                onClick={() => setTilt(0)}
                className={`h-9 rounded-full border px-3 text-sm ${tilt === 0 ? "border-glacier/40 bg-glacier text-basalt" : "border-white/10 text-chalk"}`}
              >
                0° (no seasons)
              </button>
            </div>
          </fieldset>

          <label className="mt-4 flex min-h-11 items-center gap-3 text-sm text-mist">
            <input type="checkbox" checked={eotOn} onChange={(e) => setEotOn(e.target.checked)} className="accent-glacier" />
            Equation of time (off by default). Clocks can differ by about 16 minutes from local solar noon.
          </label>

          <OutCard name={a.name} site={a} out={outA} tilt={tilt} eotOn={eotOn} />
          {b && outB && <OutCard name={b.name} site={b} out={outB} tilt={tilt} eotOn={eotOn} />}
        </div>

        <div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-void">
            <div className="relative h-[min(56vh,32rem)]">
              <MotionGlobe date={date} tilt={tilt} site={a} other={b} onPick={(lat, lon) => setA((s) => ({ ...s, lat, lon, name: "Dropped point" }))} />
            </div>
            <p className="px-4 py-3 font-mono text-[11px] text-mist">
              Click the Earth to set Place A latitude. Terminator walks with date and tilt. Orbit radius is a
              classroom lie; tilt is true.
            </p>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Figure
              src="/photos/terminator.jpg"
              alt="Earth from orbit with a sharp day-night terminator."
              caption="June and December are opposite tilts, not opposite distances. The terminator walks."
              credit="NASA, public domain"
            />
            <Figure
              src="/photos/sun-path.jpg"
              alt="A long-exposure sun path over a horizon, an analemma-like arc."
              caption="Noon altitude is 90° − |φ − δ|. Analemma is optional; equation of time is the clock error."
              credit="Wikimedia Commons / public domain"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function SiteFields({
  label,
  site,
  set,
}: {
  label: string;
  site: Site;
  set: (s: Site) => void;
}) {
  return (
    <fieldset className="mt-4 grid grid-cols-2 gap-3">
      <legend className="col-span-2 text-sm text-mist">{label}</legend>
      <label className="col-span-2 text-sm text-mist">
        Name
        <input
          value={site.name}
          onChange={(e) => set({ ...site, name: e.target.value })}
          className="mt-1 h-11 w-full rounded-[12px] border border-white/10 bg-white/6 px-3 text-chalk"
        />
      </label>
      <label className="text-sm text-mist">
        Latitude °
        <input
          type="number"
          step={0.1}
          min={-90}
          max={90}
          value={site.lat}
          onChange={(e) => set({ ...site, lat: Number(e.target.value) })}
          className="mt-1 h-11 w-full rounded-[12px] border border-white/10 bg-white/6 px-3 text-chalk"
        />
      </label>
      <label className="text-sm text-mist">
        Longitude °
        <input
          type="number"
          step={0.1}
          min={-180}
          max={180}
          value={site.lon}
          onChange={(e) => set({ ...site, lon: Number(e.target.value) })}
          className="mt-1 h-11 w-full rounded-[12px] border border-white/10 bg-white/6 px-3 text-chalk"
        />
      </label>
    </fieldset>
  );
}

function OutCard({
  name,
  site,
  out,
  tilt,
  eotOn,
}: {
  name: string;
  site: Site;
  out: ReturnType<typeof compute>;
  tilt: number;
  eotOn: boolean;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="font-display text-xl text-chalk">{name}</p>
      <p className="font-mono text-[11px] text-mist">{fmtLatLon(site.lat, site.lon)}</p>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <dt className="text-mist">Declination</dt>
        <dd className="text-chalk">{out.declDeg.toFixed(2)}°</dd>
        <dt className="text-mist">Noon altitude</dt>
        <dd className="text-chalk">{out.noon.toFixed(1)}°</dd>
        <dt className="text-mist">Sunrise (solar)</dt>
        <dd className="text-chalk">{out.polar === "night" ? "—" : fmtClock(out.sunrise)}</dd>
        <dt className="text-mist">Sunset (solar)</dt>
        <dd className="text-chalk">{out.polar === "night" ? "—" : fmtClock(out.sunset)}</dd>
        <dt className="text-mist">Day length</dt>
        <dd className="text-chalk">{out.length.toFixed(2)} h</dd>
        <dt className="text-mist">Season</dt>
        <dd className="text-chalk">{out.season}</dd>
        <dt className="text-mist">Day of year</dt>
        <dd className="text-chalk">{out.doy}</dd>
        <dt className="text-mist">Tilt used</dt>
        <dd className="text-chalk">{tilt.toFixed(2)}°</dd>
        {eotOn && (
          <>
            <dt className="text-mist">Equation of time</dt>
            <dd className="text-chalk">{out.eot.toFixed(1)} min</dd>
          </>
        )}
      </dl>
      {out.polar !== "none" && <p className="mt-2 text-sm text-glacier">Polar {out.polar}.</p>}
    </div>
  );
}

function MotionGlobe({
  date,
  tilt,
  site,
  other,
  onPick,
}: {
  date: string;
  tilt: number;
  site: Site;
  other: Site | null;
  onPick: (lat: number, lon: number) => void;
}) {
  const doy = dayOfYearUTC(new Date(`${date}T12:00:00Z`));
  const decl = solarDeclination(Number.isFinite(doy) ? doy : 80, tilt);
  const sun = new THREE.Vector3(1, Math.tan(decl), 0).normalize();
  return (
    <ClientCanvas camera={{ position: [0, 0.2, 3.1], fov: 38 }} className="absolute inset-0">
      <color attach="background" args={["#07090C"]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[sun.x * 6, sun.y * 6, sun.z * 6]} intensity={2.4} color="#fff4e0" />
      <group
        rotation={[THREE.MathUtils.degToRad(tilt), 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          const ll = vector3ToLatLon(e.point);
          onPick(Number(ll.lat.toFixed(2)), Number(ll.lon.toFixed(2)));
        }}
      >
        <EarthMesh sunDirection={sun} radius={1} clouds />
        <Pin lat={site.lat} lon={site.lon} color="#3EE0C6" />
        {other && <Pin lat={other.lat} lon={other.lon} color="#E8B86D" />}
      </group>
      <OrbitControls enablePan={false} minDistance={1.8} maxDistance={6} />
    </ClientCanvas>
  );
}

function Pin({ lat, lon, color }: { lat: number; lon: number; color: string }) {
  const p = latLonToVector3(lat, lon, 1.04);
  return (
    <mesh position={p.toArray()}>
      <sphereGeometry args={[0.03, 16, 12]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}
