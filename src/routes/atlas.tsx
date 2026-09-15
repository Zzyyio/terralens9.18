import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ATLAS,
  atlasGeo,
  atlasKindLabel,
  atlasLabs,
  atlasSearchText,
  type AtlasKind,
  type AtlasPlace,
} from "@/lib/atlas-data";
import { MiniMap } from "@/components/map/mini-map";
import { cn } from "@/lib/utils";
import { fmtLatLon } from "@/lib/geo";
import { headFor } from "@/lib/seo";

export const Route = createFileRoute("/atlas")({
  component: AtlasPage,
  head: () =>
    headFor({
      title: "Atlas",
      description:
        "World countries, the UK’s constituent countries, and US states. Capital, coordinates, physical geography, related labs.",
      path: "/atlas",
    }),
});

const TABS: { id: "country" | "uk" | "us"; label: string; kinds: AtlasKind[] }[] = [
  { id: "country", label: "World", kinds: ["country"] },
  { id: "uk", label: "UK", kinds: ["uk-nation", "uk-county", "uk-place"] },
  { id: "us", label: "US states", kinds: ["us-state"] },
];

function AtlasPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("country");
  const [q, setQ] = useState("");
  const kinds = TABS.find((t) => t.id === tab)!.kinds;
  const needle = q.trim().toLowerCase();
  const list = useMemo(() => {
    const pool = needle ? ATLAS : ATLAS.filter((p) => kinds.includes(p.kind));
    return pool.filter((p) => (needle ? atlasSearchText(p).includes(needle) : true));
  }, [kinds, needle]);
  const [sel, setSel] = useState<AtlasPlace>(ATLAS[0]);
  const shown = list.find((p) => p.id === sel.id) ?? list[0] ?? sel;
  const geo = atlasGeo(shown);
  const labs = atlasLabs(shown);
  const zoom = shown.kind === "country" ? 4 : shown.kind === "us-state" ? 5 : 7;

  return (
    <main id="main" className="mx-auto max-w-[1200px] px-5 pb-24 pt-24">
      <p className="section-label">Atlas</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Countries, nations, states.</h1>
      <p className="mt-4 max-w-2xl text-mist">
        World countries, the UK’s constituent countries, and US states. Capital, coordinates, two or three
        physical sentences, and a lab that matches. Natural Earth positions; OpenStreetMap locators. Not a
        tracker.
      </p>
      <p className="mt-2 text-sm text-mist">
        Also:{" "}
        <Link to="/tools/map" className="text-ice hover:underline">
          World map studio
        </Link>
        {" · "}
        <Link to="/tools/live-weather" className="text-ice hover:underline">
          Live weather
        </Link>
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setTab(t.id);
              setQ("");
            }}
            className={cn(
              "h-9 rounded-full border px-3.5 text-sm",
              tab === t.id
                ? "border-glacier/40 bg-glacier text-basalt"
                : "border-white/10 bg-white/6 text-chalk hover:bg-white/10",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <label className="mt-6 block">
        <span className="sr-only">Search atlas</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Japan, Iceland, California, Holderness, Hawaii…"
          className="h-11 w-full max-w-md rounded-[12px] border border-white/10 bg-white/6 px-3 text-chalk placeholder:text-mist/70"
          suppressHydrationWarning
        />
      </label>
      {needle && (
        <p className="mt-2 font-mono text-[11px] text-mist">
          Searching all tabs. {list.length} match{list.length === 1 ? "" : "es"}.
        </p>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,18rem)_1fr]">
        <ul className="max-h-[min(70vh,40rem)] overflow-y-auto rounded-2xl border border-white/10">
          {list.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => {
                  setSel(p);
                  if (p.kind === "country") setTab("country");
                  else if (p.kind === "us-state") setTab("us");
                  else setTab("uk");
                }}
                className={cn(
                  "flex w-full flex-col items-start px-4 py-3 text-left hover:bg-white/6",
                  shown.id === p.id && "bg-white/8",
                )}
              >
                <span className="text-sm text-chalk">{p.name}</span>
                <span className="font-mono text-[11px] text-mist">
                  {atlasKindLabel(p.kind)}
                  {p.capital !== "—" ? ` · ${p.capital}` : ""}
                </span>
              </button>
            </li>
          ))}
          {list.length === 0 && <li className="px-4 py-6 text-sm text-mist">Nothing matches.</li>}
        </ul>
        <div>
          <MiniMap
            lat={shown.lat}
            lon={shown.lon}
            zoom={zoom}
            label={shown.name}
            className="h-[min(56vh,32rem)] w-full min-h-[22rem] overflow-hidden rounded-2xl border border-white/10 bg-trench"
          />
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-glacier">
              {atlasKindLabel(shown.kind)}
            </p>
            <h2 className="mt-1 font-display text-3xl">{shown.name}</h2>
            {shown.capital !== "—" && <p className="mt-2 text-mist">Capital {shown.capital}</p>}
            <p className="mt-1 font-mono text-sm text-ice">{fmtLatLon(shown.lat, shown.lon, 2)}</p>
            <div className="mt-4 space-y-3 leading-7 text-chalk/90">
              {geo.map((s) => (
                <p key={s.slice(0, 48)}>{s}</p>
              ))}
            </div>
            {labs.length > 0 && (
              <div className="mt-5">
                <p className="section-label">Related labs</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {labs.map((l) => (
                    <li key={l.slug}>
                      <Link
                        to="/lab/$slug"
                        params={{ slug: l.slug }}
                        className="inline-flex h-9 items-center rounded-full border border-white/10 bg-white/6 px-3 text-sm text-ice hover:border-glacier/40"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
