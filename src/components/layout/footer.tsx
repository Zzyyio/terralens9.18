import { Link } from "@tanstack/react-router";

const STUDIO = [
  { to: "/explore", label: "Explore" },
  { to: "/teachers", label: "Teachers" },
  { to: "/search", label: "Search" },
  { to: "/about", label: "About" },
  { to: "/privacy", label: "Privacy" },
] as const;

const TOOLS = [
  { to: "/tools/map", label: "World map studio" },
  { to: "/tools/live-weather", label: "Live weather" },
  { to: "/atlas", label: "Atlas" },
  { to: "/glossary", label: "Glossary" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-basalt">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl text-chalk">TerraLens</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-mist">
            Free 3D labs for geography and Earth science students. Always.
          </p>
          <p className="mt-6 font-mono text-xs text-mist">Free for students and teachers. Always.</p>
        </div>
        <div>
          <p className="section-label mb-3">Studio</p>
          <ul className="space-y-2 text-sm">
            {STUDIO.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-chalk/90 hover:text-glacier">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="section-label mb-3">Tools</p>
          <ul className="space-y-2 text-sm">
            {TOOLS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-chalk/90 hover:text-glacier">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="section-label mb-3">Sources</p>
          <ul className="space-y-2 text-sm text-mist">
            <li>NASA Blue Marble / SVS</li>
            <li>USGS · BGS · NOAA</li>
            <li>Met Office · Natural Earth</li>
            <li>OpenStreetMap where mapped</li>
          </ul>
          <p className="mt-6 text-xs leading-5 text-mist">
            Lab geometry is original to TerraLens (CC BY-NC 4.0). NASA Blue Marble is public domain.
            Cite USGS, BGS, NOAA, and the Met Office for numbers. SI units first.
          </p>
        </div>
      </div>
    </footer>
  );
}
