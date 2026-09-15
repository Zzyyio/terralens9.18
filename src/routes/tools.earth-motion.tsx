import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CITIES,
  dayLengthHours,
  dayOfYearUTC,
  fmtClock,
  seasonName,
  solarDeclination,
  solarNoonAltitude,
  sunriseSunsetHours,
} from "@/lib/geo";
import * as THREE from "three";
import { headFor } from "@/lib/seo";

export const Route = createFileRoute("/tools/earth-motion")({
  component: EarthMotion,
  head: () =>
    headFor({
      title: "Earth-motion calculator",
      description: "Date and latitude to noon altitude, day length, and declination. Equation of time not included.",
      path: "/tools/earth-motion",
    }),
});

const PRESETS = [
  { id: "london", ...CITIES.london },
  { id: "newYork", ...CITIES.newYork },
  { id: "sydney", ...CITIES.sydney },
  { id: "nairobi", ...CITIES.nairobi },
] as const;

function EarthMotion() {
  const today = useMemo(() => {
    const d = new Date();
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
  }, []);
  const [date, setDate] = useState(today);
  const [lat, setLat] = useState(51.51);
  const [lon, setLon] = useState(-0.13);
  const [name, setName] = useState("London");

  const out = useMemo(() => {
    const d = new Date(`${date}T12:00:00Z`);
    const doy = Number.isNaN(d.getTime()) ? 80 : dayOfYearUTC(d);
    const tilt = 23.44;
    const decl = solarDeclination(doy, tilt);
    const declDeg = THREE.MathUtils.radToDeg(decl);
    const noon = solarNoonAltitude(lat, decl);
    const ss = sunriseSunsetHours(lat, doy, lon, tilt);
    const length = dayLengthHours(lat, decl);
    return {
      doy,
      declDeg,
      noon,
      length,
      season: seasonName(lat, doy, tilt),
      sunrise: ss.sunrise,
      sunset: ss.sunset,
      polar: ss.polar,
    };
  }, [date, lat, lon]);

  return (
    <main id="main" className="mx-auto max-w-[800px] px-5 pb-24 pt-24">
      <p className="section-label">Tool</p>
      <h1 className="mt-3 font-display text-4xl">Earth-motion calculator</h1>
      <p className="mt-4 text-mist">
        Date, latitude, longitude. Outputs: solar declination, noon altitude, sunrise/sunset, day length,
        season. School geometry — no equation of time, so clocks can be off by up to about 16 minutes. SI
        first. Not a navigation instrument.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setLat(p.lat);
              setLon(p.lon);
              setName(p.name);
            }}
            className="h-9 rounded-full border border-white/10 bg-white/6 px-3.5 text-sm text-chalk hover:bg-white/10"
          >
            {p.name}
          </button>
        ))}
      </div>

      <form className="mt-8 grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="section-label">Date (UTC)</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 h-11 w-full rounded-[10px] border border-white/10 bg-white/6 px-3 text-chalk"
            suppressHydrationWarning
          />
        </label>
        <label className="block">
          <span className="section-label">Latitude °</span>
          <input
            type="number"
            step={0.01}
            min={-90}
            max={90}
            value={lat}
            onChange={(e) => {
              setLat(Number(e.target.value));
              setName("Custom");
            }}
            className="mt-2 h-11 w-full rounded-[10px] border border-white/10 bg-white/6 px-3 text-chalk"
            suppressHydrationWarning
          />
        </label>
        <label className="block">
          <span className="section-label">Longitude °</span>
          <input
            type="number"
            step={0.01}
            min={-180}
            max={180}
            value={lon}
            onChange={(e) => {
              setLon(Number(e.target.value));
              setName("Custom");
            }}
            className="mt-2 h-11 w-full rounded-[10px] border border-white/10 bg-white/6 px-3 text-chalk"
            suppressHydrationWarning
          />
        </label>
      </form>

      <p className="mt-6 font-mono text-sm text-glacier">{name}</p>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <Row k="Solar declination" v={`${out.declDeg.toFixed(2)}°`} />
        <Row k="Noon solar altitude" v={`${out.noon.toFixed(1)}°`} />
        <Row k="Day length" v={`${out.length.toFixed(2)} h`} />
        <Row k="Season (tilt, this latitude)" v={out.season} />
        <Row
          k="Sunrise (local solar)"
          v={out.polar === "day" ? "Polar day" : out.polar === "night" ? "Polar night" : fmtClock(out.sunrise)}
        />
        <Row
          k="Sunset (local solar)"
          v={out.polar === "day" ? "Polar day" : out.polar === "night" ? "Polar night" : fmtClock(out.sunset)}
        />
        <Row k="Day of year" v={`${out.doy}`} />
        <Row k="Axial tilt used" v="23.44°" />
      </dl>

      <p className="mt-10 text-sm text-mist">
        Pair with the{" "}
        <Link to="/lab/$slug" params={{ slug: "seasons" }} className="text-ice hover:underline">
          seasons
        </Link>{" "}
        and{" "}
        <Link to="/lab/$slug" params={{ slug: "solar-altitude" }} className="text-ice hover:underline">
          solar altitude
        </Link>{" "}
        labs. Formulae: NOAA solar geometry approximations as used in those labs.
      </p>
    </main>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-[16px] border border-white/10 bg-white/[0.04] px-4 py-3">
      <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-mist">{k}</dt>
      <dd className="mt-1 font-display text-2xl text-chalk">{v}</dd>
    </div>
  );
}
