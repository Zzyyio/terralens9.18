import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LibreMap, type MapFeatureHit } from "@/components/map/libre-map";
import { KOPPEN, PLATES, PLATE_LEGEND, RIVERS, SEARCH_POI, SETTLEMENTS } from "@/lib/map-overlays";
import { ATLAS, atlasGeo, atlasKindLabel, nearestAtlasPlace } from "@/lib/atlas-data";
import { cn } from "@/lib/utils";
import { fmtLatLon } from "@/lib/geo";
import { headFor } from "@/lib/seo";

export const Route = createFileRoute("/tools/map")({
  component: MapStudio,
  head: () =>
    headFor({
      title: "World map studio",
      description: "Readable world map with relief, rivers, settlements, three kinds of plate boundary, and Köppen samples.",
      path: "/tools/map",
    }),
});

const PRESETS = [
  { name: "London", lat: 51.51, lon: -0.13, zoom: 6 },
  { name: "New York", lat: 40.71, lon: -74.01, zoom: 6 },
  { name: "Nairobi", lat: -1.29, lon: 36.82, zoom: 6 },
  { name: "Sydney", lat: -33.87, lon: 151.21, zoom: 6 },
  { name: "Tokyo", lat: 35.68, lon: 139.69, zoom: 6 },
  { name: "Reykjavík", lat: 64.15, lon: -21.94, zoom: 6 },
  { name: "Kathmandu", lat: 27.72, lon: 85.32, zoom: 6 },
  { name: "San Francisco", lat: 37.77, lon: -122.42, zoom: 7 },
] as const;

function MapStudio() {
  const [relief, setRelief] = useState(false);
  const [rivers, setRivers] = useState(true);
  const [settlements, setSettlements] = useState(true);
  const [plates, setPlates] = useState(true);
  const [climate, setClimate] = useState(false);
  const [graticule, setGraticule] = useState(false);
  const [center, setCenter] = useState<[number, number]>([10, 20]);
  const [zoom, setZoom] = useState(2);
  const [q, setQ] = useState("");
  const [hit, setHit] = useState<MapFeatureHit | null>(null);
  const [land, setLand] = useState<{
    lat: number;
    lon: number;
    name: string;
    notes: string[];
    kind: string;
  } | null>(null);

  const overlays = useMemo(() => {
    const o: {
      id: string;
      data: { type: string; features: unknown[] };
      color: string;
      circle?: boolean;
      width?: number;
      plates?: boolean;
      ranked?: boolean;
    }[] = [];
    if (rivers) o.push({ id: "rivers", data: RIVERS, color: "#7FD4FF", width: 2.2 });
    if (plates) o.push({ id: "plates", data: PLATES, color: "#FF6A3D", width: 2.8, plates: true });
    if (settlements) o.push({ id: "towns", data: SETTLEMENTS, color: "#E8B86D", circle: true, ranked: true });
    if (climate) o.push({ id: "koppen", data: KOPPEN, color: "#3EE0C6", circle: true });
    return o;
  }, [rivers, settlements, plates, climate]);

  const searchHits = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (needle.length < 2) return [];
    const fromAtlas = ATLAS.filter((p) => `${p.name} ${p.capital} ${p.hook} ${(p.alias ?? []).join(" ")}`.toLowerCase().includes(needle)).slice(0, 6);
    const fromPoi = SEARCH_POI.filter((p) => p.name.toLowerCase().includes(needle));
    return [
      ...fromPoi.map((p) => ({ name: p.name, lat: p.lat, lon: p.lon, zoom: p.zoom, note: p.note })),
      ...fromAtlas.map((p) => ({
        name: `${p.name} · ${p.capital}`,
        lat: p.lat,
        lon: p.lon,
        zoom: p.kind === "country" ? 4 : 7,
        note: p.hook,
      })),
    ].slice(0, 8);
  }, [q]);

  function go(lat: number, lon: number, z = 5, name = "", note = "") {
    setCenter([lon, lat]);
    setZoom(z);
    const near = nearestAtlasPlace(lat, lon, 4);
    setLand({
      lat,
      lon,
      name: name || near?.name || "Dropped point",
      notes: note ? [note] : near ? atlasGeo(near) : ["Click land for a country, or an overlay for a river, plate, or climate sample."],
      kind: near ? atlasKindLabel(near.kind) : "Locator",
    });
    setHit(null);
  }

  return (
    <main id="main" className="mx-auto max-w-[1180px] px-5 pb-24 pt-24">
      <p className="section-label">Tools</p>
      <h1 className="mt-3 font-display text-4xl">World map studio</h1>
      <p className="mt-4 max-w-2xl text-mist">
        A readable world map for class. OpenFreeMap vector when it answers; OpenStreetMap raster if it does
        not; Natural Earth coastlines if both are silent. Overlays are simplified for class, not a GIS desk.
        No Google.
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

      <div className="mt-8 flex flex-wrap gap-2">
        <Toggle on={relief} set={setRelief} label="Relief basemap" />
        <Toggle on={rivers} set={setRivers} label="Rivers" />
        <Toggle on={settlements} set={setSettlements} label="Settlements" />
        <Toggle on={plates} set={setPlates} label="Plate boundaries" />
        <Toggle on={climate} set={setClimate} label="Köppen samples" />
        <Toggle on={graticule} set={setGraticule} label="Graticule" />
        <button
          type="button"
          onClick={() => {
            setCenter([10, 20]);
            setZoom(2);
            setHit(null);
            setLand(null);
          }}
          className="h-9 rounded-full border border-white/10 px-3.5 text-sm text-mist hover:text-chalk"
        >
          Reset view
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
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

      <label className="relative mt-4 block max-w-md">
        <span className="sr-only">Search places</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Country, capital, Himalaya, Amazon, San Andreas…"
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

      <div className="mt-6">
        <LibreMap
          center={center}
          zoom={zoom}
          relief={relief}
          overlays={overlays}
          graticule={graticule}
          onFeature={(f) => {
            setHit(f);
            setLand({
              lat: f.lat,
              lon: f.lon,
              name: f.title,
              notes: [f.note],
              kind: f.kind || "Overlay",
            });
          }}
          onClick={(c) => {
            const near = nearestAtlasPlace(c.lat, c.lon);
            setLand({
              lat: c.lat,
              lon: c.lon,
              name: near ? near.name : "Dropped point",
              notes: near ? atlasGeo(near) : ["No named place within ~400 km. Read the overlays."],
              kind: near ? atlasKindLabel(near.kind) : "Locator",
            });
          }}
          className="h-[min(72vh,42rem)] w-full overflow-hidden rounded-2xl border border-white/10 bg-trench"
          label="World map studio"
        />
      </div>

      {plates && (
        <ul className="mt-4 flex flex-wrap gap-3 font-mono text-[11px] text-mist">
          {PLATE_LEGEND.map((l) => (
            <li key={l.kind} className="inline-flex items-center gap-2">
              <span className="inline-block h-1.5 w-8 rounded-full" style={{ background: l.color }} />
              <span className="text-chalk">{l.label}</span>
              <span>{l.note}</span>
            </li>
          ))}
        </ul>
      )}

      {climate && (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-mist">
          <li><span className="text-chalk">A</span> tropical — no real winter</li>
          <li><span className="text-chalk">B</span> dry — evaporation beats rain</li>
          <li><span className="text-chalk">C</span> temperate — mild winter</li>
          <li><span className="text-chalk">D</span> continental — hard winter</li>
          <li><span className="text-chalk">E</span> polar — too cold for trees</li>
        </ul>
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
        Natural Earth positions. Overlays simplified for class. OpenFreeMap / OSM / OpenTopoMap. Pan, pinch,
        double-click zoom, keyboard +/−. Scale bar is metric.
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
