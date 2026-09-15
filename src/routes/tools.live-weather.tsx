import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LibreMap } from "@/components/map/libre-map";
import { fmtLatLon } from "@/lib/geo";
import { nearestAtlasPlace } from "@/lib/atlas-data";
import { headFor } from "@/lib/seo";

export const Route = createFileRoute("/tools/live-weather")({
  component: LiveWeather,
  head: () =>
    headFor({
      title: "Live weather",
      description: "Educational Open-Meteo weather on a map. Delayed. Not an operational forecast.",
      path: "/tools/live-weather",
    }),
});

type Wx = {
  temperature: number;
  apparent: number;
  wind: number;
  windDir: number;
  precip: number;
  cloud: number;
  humidity: number;
  code: number;
  time: string;
  sample?: boolean;
};

type Hour = { t: string; temp: number; precip: number };

const WMO: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with hail",
};

function compass(deg: number) {
  const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return dirs[Math.round(((deg % 360) + 360) % 360 / 22.5) % 16];
}

function wmo(code: number) {
  return WMO[code] ?? `Weather code ${code}`;
}

const PRESETS = [
  { name: "London", lat: 51.51, lon: -0.13 },
  { name: "New York", lat: 40.71, lon: -74.01 },
  { name: "Nairobi", lat: -1.29, lon: 36.82 },
  { name: "Sydney", lat: -33.87, lon: 151.21 },
  { name: "Tokyo", lat: 35.68, lon: 139.69 },
  { name: "Reykjavík", lat: 64.15, lon: -21.94 },
  { name: "Cairo", lat: 30.04, lon: 31.24 },
  { name: "São Paulo", lat: -23.55, lon: -46.63 },
] as const;

/** Used only when Open-Meteo 429s. Round, labelled, not a forecast. */
const SAMPLE: Record<string, Wx> = {
  London: { temperature: 14, apparent: 12, wind: 3.5, windDir: 240, precip: 0.2, cloud: 70, humidity: 78, code: 3, time: "classroom sample", sample: true },
  "New York": { temperature: 18, apparent: 17, wind: 4.0, windDir: 210, precip: 0, cloud: 40, humidity: 62, code: 2, time: "classroom sample", sample: true },
  Nairobi: { temperature: 22, apparent: 21, wind: 2.5, windDir: 90, precip: 0, cloud: 25, humidity: 55, code: 1, time: "classroom sample", sample: true },
  Sydney: { temperature: 17, apparent: 16, wind: 5.0, windDir: 180, precip: 0.4, cloud: 55, humidity: 68, code: 61, time: "classroom sample", sample: true },
  Tokyo: { temperature: 21, apparent: 20, wind: 3.0, windDir: 80, precip: 0, cloud: 30, humidity: 60, code: 1, time: "classroom sample", sample: true },
  Reykjavík: { temperature: 8, apparent: 5, wind: 7.0, windDir: 270, precip: 0.6, cloud: 85, humidity: 82, code: 63, time: "classroom sample", sample: true },
  Cairo: { temperature: 28, apparent: 27, wind: 3.2, windDir: 10, precip: 0, cloud: 10, humidity: 35, code: 0, time: "classroom sample", sample: true },
  "São Paulo": { temperature: 20, apparent: 20, wind: 2.8, windDir: 140, precip: 1.2, cloud: 75, humidity: 80, code: 80, time: "classroom sample", sample: true },
};

function LiveWeather() {
  const [point, setPoint] = useState({ lat: 51.51, lon: -0.13, name: "London" });
  const [wx, setWx] = useState<Wx | null>(null);
  const [hours, setHours] = useState<Hour[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void load(51.51, -0.13, "London");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load(lat: number, lon: number, name = "Dropped point") {
    setBusy(true);
    setErr(null);
    const near = name === "Dropped point" ? nearestAtlasPlace(lat, lon, 8) : null;
    const label = name === "Dropped point" && near ? near.name : name;
    setPoint({ lat, lon, name: label });
    try {
      const url = new URL("https://api.open-meteo.com/v1/forecast");
      url.searchParams.set("latitude", lat.toFixed(3));
      url.searchParams.set("longitude", lon.toFixed(3));
      url.searchParams.set(
        "current",
        "temperature_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,precipitation,cloud_cover,relative_humidity_2m,weather_code",
      );
      url.searchParams.set("hourly", "temperature_2m,precipitation");
      url.searchParams.set("forecast_days", "2");
      url.searchParams.set("wind_speed_unit", "ms");
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Open-Meteo did not answer.");
      const json = (await res.json()) as {
        current: {
          time: string;
          temperature_2m: number;
          apparent_temperature: number;
          wind_speed_10m: number;
          wind_direction_10m: number;
          precipitation: number;
          cloud_cover: number;
          relative_humidity_2m: number;
          weather_code: number;
        };
        hourly: { time: string[]; temperature_2m: number[]; precipitation: number[] };
      };
      setWx({
        temperature: json.current.temperature_2m,
        apparent: json.current.apparent_temperature,
        wind: json.current.wind_speed_10m,
        windDir: json.current.wind_direction_10m,
        precip: json.current.precipitation,
        cloud: json.current.cloud_cover,
        humidity: json.current.relative_humidity_2m,
        code: json.current.weather_code,
        time: json.current.time,
      });
      const now = json.current.time;
      const idx = json.hourly.time.findIndex((t) => t >= now);
      const start = Math.max(0, idx);
      const slice = json.hourly.time.slice(start, start + 24).map((t, i) => ({
        t,
        temp: json.hourly.temperature_2m[start + i]!,
        precip: json.hourly.precipitation[start + i]!,
      }));
      setHours(slice);
    } catch {
      const sample = SAMPLE[label] ?? SAMPLE[name];
      if (sample) {
        setWx(sample);
        setHours(
          Array.from({ length: 24 }, (_, i) => ({
            t: `+${i}h`,
            temp: sample.temperature + Math.sin(i / 4) * 2,
            precip: i % 8 === 3 ? sample.precip : 0,
          })),
        );
        setErr(
          "Open-Meteo did not answer (rate limit or network). Showing a labelled classroom sample so the desk is not empty. Not a forecast.",
        );
      } else {
        setWx(null);
        setHours([]);
        setErr("Could not reach Open-Meteo. The map still works; the numbers will wait.");
      }
    } finally {
      setBusy(false);
    }
  }

  const f = wx ? (wx.temperature * 9) / 5 + 32 : 0;

  return (
    <main id="main" className="mx-auto max-w-[1100px] px-5 pb-24 pt-24">
      <p className="section-label">Tools</p>
      <h1 className="mt-3 font-display text-4xl">Live weather</h1>
      <p className="mt-4 max-w-2xl text-mist">
        Click the map or drag the pin. Open-Meteo returns temperature, wind, precipitation, humidity, and
        cloud. Educational, often delayed, not operational forecasting. Not a cockpit. No third-party weather
        branding.
      </p>
      <p className="mt-2 text-sm text-mist">
        Also:{" "}
        <Link to="/tools/map" className="text-ice hover:underline">
          World map studio
        </Link>
        {" · "}
        <Link to="/atlas" className="text-ice hover:underline">
          Atlas
        </Link>
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => void load(p.lat, p.lon, p.name)}
            className="h-9 rounded-full border border-white/10 bg-white/6 px-3.5 text-sm text-chalk hover:bg-white/10"
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <LibreMap
          center={[point.lon, point.lat]}
          zoom={5}
          marker={[point.lon, point.lat]}
          draggableMarker
          onClick={(c) => void load(c.lat, c.lon)}
          className="h-[min(60vh,36rem)] w-full overflow-hidden rounded-2xl border border-white/10 bg-trench"
          label="Live weather map"
        />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-glacier">{point.name}</p>
        <p className="mt-1 font-mono text-sm text-ice">{fmtLatLon(point.lat, point.lon, 2)}</p>
        {busy && <p className="mt-3 text-mist">Asking Open-Meteo…</p>}
        {err && <p className="mt-3 text-sandstone">{err}</p>}
        {wx && (
          <>
            <p className="mt-4 font-display text-3xl text-chalk">{wmo(wx.code)}</p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <Row k="Air temperature" v={`${wx.temperature.toFixed(1)} °C`} sub={`(${f.toFixed(0)} °F)`} />
              <Row k="Apparent temperature" v={`${wx.apparent.toFixed(1)} °C`} />
              <Row k="Wind (10 m)" v={`${wx.wind.toFixed(1)} m s⁻¹ · ${wx.windDir.toFixed(0)}° ${compass(wx.windDir)}`} />
              <Row k="Precipitation" v={`${wx.precip.toFixed(1)} mm`} />
              <Row k="Cloud cover" v={`${wx.cloud.toFixed(0)} %`} />
              <Row k="Relative humidity" v={`${wx.humidity.toFixed(0)} %`} />
              <Row
                k="Observation time"
                v={wx.sample ? "classroom sample" : wx.time.replace("T", " ") + " (model)"}
              />
            </dl>
          </>
        )}
      </div>

      {hours.length > 0 && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-glacier">
            Next 24 hours · educational / delayed
          </p>
          <Spark hours={hours} />
        </div>
      )}

      <p className="mt-4 text-sm text-mist">
        Educational, often delayed, not operational forecasting. Not a cockpit. No third-party weather
        branding.
      </p>
      <p className="mt-2 text-sm text-mist">
        Disclaimer: delayed model output for class, not a warning service.
      </p>
      <p className="mt-4 text-sm text-mist">
        Machinery behind a chart:{" "}
        <Link to="/lab/$slug" params={{ slug: "wind" }} className="text-ice hover:underline">
          Wind, PGF and Coriolis
        </Link>
        {" · "}
        <Link to="/lab/$slug" params={{ slug: "fronts" }} className="text-ice hover:underline">
          Fronts as wedges
        </Link>
      </p>
    </main>
  );
}

function Spark({ hours }: { hours: Hour[] }) {
  const temps = hours.map((h) => h.temp);
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const span = Math.max(1, max - min);
  const w = 640;
  const h = 88;
  const pts = hours
    .map((hr, i) => {
      const x = (i / Math.max(1, hours.length - 1)) * w;
      const y = 8 + (1 - (hr.temp - min) / span) * 56;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <div className="mt-3">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full text-glacier" role="img" aria-label="24-hour temperature and rain">
        {hours.map((hr, i) => {
          const x = (i / Math.max(1, hours.length - 1)) * w;
          const bh = Math.min(28, hr.precip * 8);
          return <rect key={hr.t} x={x - 4} y={h - 4 - bh} width={8} height={bh} fill="#7FD4FF" opacity={0.55} />;
        })}
        <polyline fill="none" stroke="currentColor" strokeWidth="2.4" points={pts} />
      </svg>
      <p className="mt-1 font-mono text-[11px] text-mist">
        Line: air temperature °C. Bars: precipitation mm. {min.toFixed(0)}–{max.toFixed(0)} °C over 24 h.
      </p>
    </div>
  );
}

function Row({ k, v, sub }: { k: string; v: string; sub?: string }) {
  return (
    <div className="rounded-[16px] border border-white/10 bg-white/[0.03] px-4 py-3">
      <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-mist">{k}</dt>
      <dd className="mt-1 font-display text-2xl text-chalk">
        {v}
        {sub && <span className="ml-2 font-mono text-sm text-mist">{sub}</span>}
      </dd>
    </div>
  );
}
