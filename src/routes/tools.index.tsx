import { createFileRoute, Link } from "@tanstack/react-router";
import { headFor } from "@/lib/seo";

export const Route = createFileRoute("/tools/")({
  component: ToolsIndex,
  head: () =>
    headFor({
      title: "Tools",
      description: "Earth-motion calculator, live weather, world map studio, atlas, and search.",
      path: "/tools",
    }),
});

const TOOLS = [
  {
    to: "/tools/earth-motion",
    title: "Earth-motion calculator",
    blurb: "Date and latitude to noon altitude, day length, declination, and season. Presets for London, New York, Sydney, Nairobi.",
  },
  {
    to: "/tools/live-weather",
    title: "Live weather",
    blurb: "Click or drag a pin. Open-Meteo returns temperature, wind, rain, humidity, and cloud in SI. Educational and delayed.",
  },
  {
    to: "/tools/map",
    title: "World map studio",
    blurb: "Readable world map. Relief, rivers, settlements, three colours of plate boundary, Köppen samples. OpenFreeMap, then OSM, then Natural Earth.",
  },
  {
    to: "/atlas",
    title: "Atlas",
    blurb: "World countries, UK nations, US states. Capital, coordinates, two or three physical sentences, related labs.",
  },
  {
    to: "/search",
    title: "Search",
    blurb: "Labs, glossary terms, case studies.",
  },
] as const;

function ToolsIndex() {
  return (
    <main id="main" className="mx-auto max-w-[900px] px-5 pb-24 pt-24">
      <p className="section-label">Tools</p>
      <h1 className="mt-3 font-display text-4xl">Calculators and maps, not gizmos.</h1>
      <p className="mt-4 max-w-2xl text-mist">
        SI first. Educational disclaimers where the data is live. No third-party weather branding.
      </p>
      <div className="mt-12 grid gap-4">
        {TOOLS.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:border-glacier/40"
          >
            <h2 className="font-display text-2xl text-chalk">{t.title}</h2>
            <p className="mt-2 text-mist">{t.blurb}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
