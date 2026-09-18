import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LibreMap, type MapFeatureHit } from "@/components/map/libre-map";
import {
  BASINS,
  CURRENTS,
  KOPPEN,
  PLATES,
  PLATE_ARROWS,
  PLATE_LEGEND,
  PLATE_POLYS,
  QUAKES,
  RIDGES,
  RIVERS,
  SEARCH_POI,
  SETTLEMENTS,
  TEACHING_PRESETS,
  TRENCHES,
  BORDERS,
  VOLCANOES,
} from "@/lib/map-overlays";
import { ATLAS, atlasGeo, atlasKindLabel, nearestAtlasPlace } from "@/lib/atlas-data";
import { cn } from "@/lib/utils";
import { fmtLatLon, haversineKm } from "@/lib/geo";
import { headFor } from "@/lib/seo";

export const Route = createFileRoute("/tools/map")({
  component: MapStudio,
  head: () =>
    headFor({
      title: "World map studio",
      description:
        "Classroom world map: relief, bathymetry, plates, volcanoes, earthquakes, Köppen, currents, measure, split view. No Google.",
      path: "/tools/map",
    }),
});

const CITY_PRESETS = [
  { name: "London", lat: 51.51, lon: -0.13, zoom: 6 },
  { name: "New York", lat: 40.71, lon: -74.01, zoom: 6 },
  { name: "Nairobi", lat: -1.29, lon: 36.82, zoom: 6 },
  { name: "Sydney", lat: -33.87, lon: 151.21, zoom: 6 },
  { name: "Tokyo", lat: 35.68, lon: 139.69, zoom: 6 },
  { name: "Reykjavík", lat: 64.15, lon: -21.94, zoom: 6 },
  { name: "Cairo", lat: 30.04, lon: 31.24, zoom: 6 },
  { name: "Shanghai", lat: 31.23, lon: 121.47, zoom: 6 },
  { name: "Hong Kong", lat: 22.3, lon: 114.17, zoom: 9 },
  { name: "Taipei", lat: 25.03, lon: 121.57, zoom: 8 },
  { name: "Singapore", lat: 1.35, lon: 103.82, zoom: 6 },
] as const;

type BaseMap = "vector" | "relief" | "political" | "bathymetry";
type Layers = {
  rivers: boolean;
  settlements: boolean;
  plates: boolean;
  plateFill: boolean;
  climate: boolean;
  volcanoes: boolean;
  quakes: boolean;
  currents: boolean;
  basins: boolean;
  graticule: boolean;
  borders: boolean;
  trenches: boolean;
  ridges: boolean;
  arrows: boolean;
};

const LAYER_OFF: Layers = {
  rivers: true,
  settlements: true,
  plates: true,
  plateFill: false,
  climate: false,
  volcanoes: false,
  quakes: false,
  currents: false,
  basins: false,
  graticule: false,
  borders: false,
  trenches: false,
  ridges: false,
  arrows: false,
};

function sphericalAreaKm2(pts: { lat: number; lon: number }[]): number {
  if (pts.length < 3) return 0;
  const R = 6371;
  const toR = Math.PI / 180;
  let sum = 0;
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const a = pts[i]!;
    const b = pts[(i + 1) % n]!;
    sum += (b.lon - a.lon) * toR * (2 + Math.sin(a.lat * toR) + Math.sin(b.lat * toR));
  }
  return Math.abs((sum * R * R) / 2);
}

function MapStudio() {
  const [baseMap, setBaseMap] = useState<BaseMap>("vector");
  const [layers, setLayers] = useState<Layers>(LAYER_OFF);
  const [center, setCenter] = useState<[number, number]>([10, 20]);
  const [zoom, setZoom] = useState(2);
  const [centerB, setCenterB] = useState<[number, number]>([100, 20]);
  const [zoomB, setZoomB] = useState(3);
  const [q, setQ] = useState("");
  const [hit, setHit] = useState<MapFeatureHit | null>(null);
  const [opacity, setOpacity] = useState(1);
  const [path, setPath] = useState<{ lat: number; lon: number }[]>([]);
  const [measuring, setMeasuring] = useState<"off" | "line" | "area">("off");
  const [projector, setProjector] = useState(false);
  const [split, setSplit] = useState(false);
  const [land, setLand] = useState<{
    lat: number;
    lon: number;
    name: string;
    notes: string[];
    kind: string;
  } | null>(null);
  const [cursor, setCursor] = useState<{ lat: number; lon: number } | null>(null);

  const overlays = useMemo(() => {
    const o: {
      id: string;
      data: { type: string; features: unknown[] };
      color: string;
      circle?: boolean;
      width?: number;
      plates?: boolean;
      ranked?: boolean;
      opacity?: number;
      polygon?: boolean;
    }[] = [];
    if (layers.plateFill) o.push({ id: "platefill", data: PLATE_POLYS, color: "#3EE0C6", polygon: true, opacity: opacity * 0.9 });
    if (layers.borders) o.push({ id: "borders", data: BORDERS, color: "#c9d4d0", width: 1.4, opacity });
    if (layers.rivers) o.push({ id: "rivers", data: RIVERS, color: "#7FD4FF", width: 2.2, opacity });
    if (layers.basins) o.push({ id: "basins", data: BASINS, color: "#7c9a6a", width: 1.6, opacity });
    if (layers.currents) o.push({ id: "currents", data: CURRENTS, color: "#7FD4FF", width: 2.4, opacity });
    if (layers.trenches) o.push({ id: "trenches", data: TRENCHES, color: "#FF6A3D", width: 3.0, opacity });
    if (layers.ridges) o.push({ id: "ridges", data: RIDGES, color: "#3EE0C6", width: 2.8, opacity });
    if (layers.arrows) o.push({ id: "arrows", data: PLATE_ARROWS, color: "#E8B86D", width: 2.6, opacity });
    if (layers.plates) o.push({ id: "plates", data: PLATES, color: "#FF6A3D", width: 2.8, plates: true, opacity });
    if (layers.settlements) o.push({ id: "towns", data: SETTLEMENTS, color: "#E8B86D", circle: true, ranked: true, opacity });
    if (layers.climate) o.push({ id: "koppen", data: KOPPEN, color: "#3EE0C6", circle: true, opacity });
    if (layers.volcanoes) o.push({ id: "volcanoes", data: VOLCANOES, color: "#FF6A3D", circle: true, opacity });
    if (layers.quakes) o.push({ id: "quakes", data: QUAKES, color: "#E8B86D", circle: true, opacity });
    if (path.length > 0) {
      const coords = path.map((p) => [p.lon, p.lat]);
      const data = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: { name: measuring === "area" ? "Measured area" : "Measured path", kind: "measure", note: "Classroom measure. Great-circle km." },
            geometry:
              measuring === "area" && path.length > 2
                ? { type: "Polygon", coordinates: [[...coords, coords[0]]] }
                : { type: "LineString", coordinates: coords },
          },
        ],
      };
      o.push({
        id: `measure-${path.length}`,
        data,
        color: "#3EE0C6",
        width: 2.8,
        opacity: 1,
        polygon: measuring === "area" && path.length > 2,
      });
    }
    return o;
  }, [layers, opacity, path, measuring]);

  const searchHits = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (needle.length < 2) return [];
    const fromAtlas = ATLAS.filter((p) =>
      `${p.name} ${p.capital} ${p.hook} ${(p.alias ?? []).join(" ")}`.toLowerCase().includes(needle),
    ).slice(0, 6);
    const fromPoi = SEARCH_POI.filter((p) => p.name.toLowerCase().includes(needle));
    const fromTeach = TEACHING_PRESETS.filter((p) => p.name.toLowerCase().includes(needle));
    return [
      ...fromTeach.map((p) => ({ name: p.name, lat: p.lat, lon: p.lon, zoom: p.zoom, note: p.note })),
      ...fromPoi.map((p) => ({ name: p.name, lat: p.lat, lon: p.lon, zoom: p.zoom, note: p.note })),
      ...fromAtlas.map((p) => ({
        name: `${p.name} · ${p.capital}`,
        lat: p.lat,
        lon: p.lon,
        zoom: p.kind === "country" ? 4 : 7,
        note: p.hook,
      })),
    ].slice(0, 10);
  }, [q]);

  function go(lat: number, lon: number, z = 5, name = "", note = "") {
    setCenter([lon, lat]);
    setZoom(z);
    const near = nearestAtlasPlace(lat, lon, 4);
    setLand({
      lat,
      lon,
      name: name || near?.name || "Dropped point",
      notes: note ? [note] : near ? atlasGeo(near) : ["Click land for a country, or an overlay for a river, plate, volcano, or quake."],
      kind: near ? atlasKindLabel(near.kind) : "Locator",
    });
    setHit(null);
  }

  function onClickMap(c: { lat: number; lon: number }, pane: "a" | "b") {
    if (measuring !== "off") {
      setPath((p) => [...p, c]);
      return;
    }
    const near = nearestAtlasPlace(c.lat, c.lon);
    setLand({
      lat: c.lat,
      lon: c.lon,
      name: near ? near.name : "Dropped point",
      notes: near ? atlasGeo(near) : ["No named place within ~400 km. Read the overlays."],
      kind: near ? atlasKindLabel(near.kind) : "Locator",
    });
    if (pane === "b") {
      setCenterB([c.lon, c.lat]);
    }
  }

  const pathKm = useMemo(() => {
    let n = 0;
    for (let i = 1; i < path.length; i++) {
      const a = path[i - 1]!;
      const b = path[i]!;
      n += haversineKm(a.lat, a.lon, b.lat, b.lon);
    }
    return n;
  }, [path]);
  const areaKm2 = measuring === "area" ? sphericalAreaKm2(path) : 0;

  function setLayer<K extends keyof Layers>(k: K, v: boolean) {
    setLayers((L) => ({ ...L, [k]: v }));
  }

  return (
    <main id="main" className="mx-auto max-w-[1180px] px-5 pb-24 pt-24">
      <p className="section-label">Tools</p>
      <h1 className="mt-3 font-display text-4xl">World map studio</h1>
      <p className="mt-4 max-w-2xl text-mist">
        A 15-minute classroom map. Vector coast first; relief, political outlines, or bathymetry on demand.
        Click a plate, a volcano, a quake, a current, or a country. No Google.
      </p>
      <p className="mt-2 text-sm text-mist">
        Also:{" "}
        <Link to="/tools/live-weather" className="text-ice hover:underline">
          Live weather
        </Link>
        {" · "}
        <Link to="/atlas" className="text-ice hover:underline">
          Atlas
        </Link>
      </p>

      <p className="section-label mt-8 mb-3">Basemap</p>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["vector", "Vector coast"],
            ["relief", "Relief hillshade"],
            ["political", "Political outlines"],
            ["bathymetry", "Bathymetry"],
          ] as const
        ).map(([id, label]) => (
          <Toggle key={id} on={baseMap === id} set={() => setBaseMap(id)} label={label} />
        ))}
      </div>

      <p className="section-label mt-6 mb-3">Layers</p>
      <div className="flex flex-wrap gap-2">
        <Toggle on={layers.rivers} set={(v) => setLayer("rivers", v)} label="Rivers" />
        <Toggle on={layers.basins} set={(v) => setLayer("basins", v)} label="Basins" />
        <Toggle on={layers.settlements} set={(v) => setLayer("settlements", v)} label="Settlements" />
        <Toggle on={layers.borders} set={(v) => setLayer("borders", v)} label="Borders" />
        <Toggle on={layers.plates} set={(v) => setLayer("plates", v)} label="Plate boundaries" />
        <Toggle on={layers.plateFill} set={(v) => setLayer("plateFill", v)} label="Plate polygons" />
        <Toggle on={layers.arrows} set={(v) => setLayer("arrows", v)} label="Plate arrows" />
        <Toggle on={layers.trenches} set={(v) => setLayer("trenches", v)} label="Trenches" />
        <Toggle on={layers.ridges} set={(v) => setLayer("ridges", v)} label="Ridges" />
        <Toggle on={layers.volcanoes} set={(v) => setLayer("volcanoes", v)} label="Volcanoes" />
        <Toggle on={layers.quakes} set={(v) => setLayer("quakes", v)} label="Earthquakes" />
        <Toggle on={layers.currents} set={(v) => setLayer("currents", v)} label="Currents" />
        <Toggle on={layers.climate} set={(v) => setLayer("climate", v)} label="Köppen" />
        <Toggle on={layers.graticule} set={(v) => setLayer("graticule", v)} label="Graticule" />
      </div>

      <p className="section-label mt-6 mb-3">Classroom</p>
      <div className="flex flex-wrap gap-2">
        <Toggle on={measuring === "line"} set={(v) => { setMeasuring(v ? "line" : "off"); setPath([]); }} label="Measure km" />
        <Toggle on={measuring === "area"} set={(v) => { setMeasuring(v ? "area" : "off"); setPath([]); }} label="Measure km²" />
        <Toggle on={split} set={setSplit} label="Split view" />
        <Toggle on={projector} set={setProjector} label="Projector" />
        <button
          type="button"
          onClick={() => {
            const u = new URL(window.location.href);
            u.searchParams.set("lat", String(center[1]));
            u.searchParams.set("lon", String(center[0]));
            u.searchParams.set("z", String(zoom));
            u.searchParams.set("base", baseMap);
            void navigator.clipboard.writeText(u.toString()).catch(() => undefined);
          }}
          className="h-9 rounded-full border border-white/10 px-3.5 text-sm text-mist hover:text-chalk"
        >
          Copy view link
        </button>
        <button
          type="button"
          onClick={() => {
            setCenter([10, 20]);
            setZoom(2);
            setHit(null);
            setLand(null);
            setPath([]);
            setLayers(LAYER_OFF);
            setBaseMap("vector");
          }}
          className="h-9 rounded-full border border-white/10 px-3.5 text-sm text-mist hover:text-chalk"
        >
          Reset view
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {CITY_PRESETS.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => go(p.lat, p.lon, p.zoom, p.name, "")}
            className="h-9 rounded-full border border-white/10 bg-white/6 px-3 text-sm text-chalk hover:bg-white/10"
          >
            {p.name}
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {TEACHING_PRESETS.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => go(p.lat, p.lon, p.zoom, p.name, p.note)}
            className="h-9 rounded-full border border-white/10 px-3 text-sm text-mist hover:bg-white/10 hover:text-chalk"
          >
            {p.name}
          </button>
        ))}
      </div>

      <label className="mt-4 flex max-w-xs items-center gap-3 text-sm text-mist">
        Overlay opacity
        <input
          type="range"
          min={0.25}
          max={1}
          step={0.05}
          value={opacity}
          onChange={(e) => setOpacity(Number(e.target.value))}
          className="flex-1 accent-glacier"
        />
        <span className="font-mono text-[11px]">{Math.round(opacity * 100)}%</span>
      </label>

      <label className="relative mt-4 block max-w-md">
        <span className="sr-only">Search places</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Holderness, Himalaya, San Andreas, Shanghai…"
          className="h-11 w-full rounded-[12px] border border-white/10 bg-white/6 px-3 text-chalk placeholder:text-mist/70"
          suppressHydrationWarning
        />
        {searchHits.length > 0 && (
          <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-2xl border border-white/10 bg-basalt/95 shadow-2xl">
            {searchHits.map((h) => (
              <li key={`${h.name}-${h.lat}`}>
                <button
                  type="button"
                  className="block w-full px-3 py-2.5 text-left text-sm text-chalk hover:bg-white/8"
                  onClick={() => {
                    go(h.lat, h.lon, h.zoom, h.name, h.note);
                    setQ("");
                  }}
                >
                  {h.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </label>

      <div className={cn("mt-6 grid gap-4", split && "lg:grid-cols-2")}>
        <LibreMap
          center={center}
          zoom={zoom}
          baseMap={baseMap}
          overlays={overlays}
          graticule={layers.graticule}
          onFeature={(f) => {
            setHit(f);
            setLand({ lat: f.lat, lon: f.lon, name: f.title, notes: [f.note], kind: f.kind || "Overlay" });
          }}
          onClick={(c) => onClickMap(c, "a")}
          onMove={setCursor}
          className={cn(
            "h-[min(72vh,42rem)] w-full overflow-hidden rounded-2xl border border-white/10 bg-trench",
            projector && "contrast-125",
          )}
          label="World map studio A"
        />
        {split && (
          <LibreMap
            center={centerB}
            zoom={zoomB}
            baseMap={baseMap}
            overlays={overlays}
            graticule={layers.graticule}
            onFeature={(f) => {
              setHit(f);
              setLand({ lat: f.lat, lon: f.lon, name: f.title, notes: [f.note], kind: f.kind || "Overlay" });
            }}
            onClick={(c) => onClickMap(c, "b")}
            onMove={setCursor}
            className="h-[min(72vh,42rem)] w-full overflow-hidden rounded-2xl border border-white/10 bg-trench"
            label="World map studio B"
          />
        )}
      </div>
      {cursor && (
        <p className="mt-2 font-mono text-[11px] text-mist">
          Cursor {fmtLatLon(cursor.lat, cursor.lon, 2)}
        </p>
      )}
      {split && (
        <p className="mt-2 text-sm text-mist">
          Left pane is Place A. Click the right pane to set Place B. Same layers, two windows — compare a trench
          with a ridge, or Shanghai with Holderness.
        </p>
      )}

      {layers.plates && (
        <ul className="mt-4 flex flex-wrap gap-3 font-mono text-[11px] text-mist">
          {PLATE_LEGEND.map((l) => (
            <li key={l.kind}>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 hover:border-glacier/40 hover:text-chalk"
                onClick={() => {
                  if (l.kind === "divergent") go(64.15, -21.94, 4, "Divergent · Iceland", l.note);
                  else if (l.kind === "convergent") go(35.68, 139.65, 4, "Convergent · Japan", l.note);
                  else go(36.0, -120.5, 5, "Transform · San Andreas", l.note);
                }}
              >
                <span className="inline-block h-1.5 w-8 rounded-full" style={{ background: l.color }} />
                <span className="text-chalk">{l.label}</span>
                <span>{l.note}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {layers.climate && (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-mist">
          <li><span className="text-chalk">A</span> tropical — no real winter</li>
          <li><span className="text-chalk">B</span> dry — evaporation beats rain</li>
          <li><span className="text-chalk">C</span> temperate — mild winter</li>
          <li><span className="text-chalk">D</span> continental — hard winter</li>
          <li><span className="text-chalk">E</span> polar — too cold for trees</li>
        </ul>
      )}

      {path.length > 0 && (
        <p className="mt-4 font-mono text-sm text-glacier">
          {path.length} point{path.length === 1 ? "" : "s"}
          {path.length > 1 && ` · path ${pathKm.toFixed(0)} km`}
          {measuring === "area" && path.length > 2 && ` · area ~${areaKm2.toFixed(0)} km²`}
          {path[0] && ` · last ${fmtLatLon(path[path.length - 1]!.lat, path[path.length - 1]!.lon)}`}
          {" · "}
          <button type="button" className="underline" onClick={() => setPath([])}>
            Clear measure
          </button>
        </p>
      )}
      {land && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-glacier">
            {hit?.kind || land.kind}
          </p>
          <h2 className="mt-1 font-display text-2xl text-chalk">{land.name}</h2>
          <p className="mt-1 font-mono text-sm text-ice">{fmtLatLon(land.lat, land.lon, 2)}</p>
          <div className="mt-3 space-y-2 leading-7 text-chalk/90">
            {land.notes.filter(Boolean).map((n) => (
              <p key={n.slice(0, 48)}>{n}</p>
            ))}
          </div>
        </div>
      )}

      <p className="mt-4 font-mono text-[11px] text-mist">
        Natural Earth positions. Overlays simplified for class — not a GIS desk. OpenFreeMap / OSM / OpenTopoMap /
        Esri Ocean (GEBCO). Pan, pinch, double-click zoom, keyboard +/−. Scale bar is metric. Cursor click is
        lat/lon.
      </p>
    </main>
  );
}

function Toggle({ on, set, label }: { on: boolean; set: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      onClick={() => set(!on)}
      className={cn(
        "h-9 rounded-full border px-3.5 text-sm",
        on ? "border-glacier/40 bg-glacier/15 text-glacier" : "border-white/10 text-mist hover:text-chalk",
      )}
    >
      {label}
    </button>
  );
}
