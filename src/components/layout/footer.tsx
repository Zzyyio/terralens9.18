import { Link } from "@tanstack/react-router";
import { CONTACT_LINE, PRODUCER_X, SCHOOL_MAIL, SCHOOL_NAME, SCHOOL_URL } from "@/lib/contact";

const STUDIO = [
  { to: "/explore", label: "Explore" },
  { to: "/paths", label: "Paths" },
  { to: "/teachers", label: "Teachers" },
  { to: "/search", label: "Search" },
  { to: "/about", label: "About" },
  { to: "/privacy", label: "Privacy" },
] as const;

const TOOLS = [
  { to: "/tools/earth-motion", label: "Earth motion" },
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
          <p className="mt-4 text-xs leading-5 text-mist">
            Not affiliated with Kongsberg Geospatial or any other TerraLens product.
          </p>
          <p className="mt-4 text-xs leading-5 text-mist">{CONTACT_LINE}</p>
          <p className="mt-2 text-xs leading-5">
            <a href={SCHOOL_URL} className="text-ice hover:underline" target="_blank" rel="noreferrer">
              {SCHOOL_NAME}
            </a>
            {" · "}
            <a href={`mailto:${SCHOOL_MAIL}`} className="text-ice hover:underline">
              {SCHOOL_MAIL}
            </a>
            {" · "}
            <a href={PRODUCER_X} className="text-ice hover:underline" target="_blank" rel="noreferrer">
              X
            </a>
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
            <li>
              <a href="https://www.nasa.gov/" className="text-ice hover:underline" target="_blank" rel="noreferrer">
                NASA
              </a>{" "}
              Blue Marble / SVS
            </li>
            <li>
              <a href="https://www.usgs.gov/" className="text-ice hover:underline" target="_blank" rel="noreferrer">
                USGS
              </a>{" "}
              ·{" "}
              <a href="https://www.bgs.ac.uk/" className="text-ice hover:underline" target="_blank" rel="noreferrer">
                BGS
              </a>{" "}
              ·{" "}
              <a href="https://www.noaa.gov/" className="text-ice hover:underline" target="_blank" rel="noreferrer">
                NOAA
              </a>
            </li>
            <li>
              <a href="https://www.metoffice.gov.uk/" className="text-ice hover:underline" target="_blank" rel="noreferrer">
                Met Office
              </a>{" "}
              · Natural Earth
            </li>
            <li>OpenStreetMap where mapped</li>
          </ul>
          <p className="mt-6 text-xs leading-5 text-mist">
            Lab geometry is original to TerraLens (
            <a href="https://creativecommons.org/licenses/by-nc/4.0/" className="text-ice hover:underline" target="_blank" rel="noreferrer">
              CC BY-NC 4.0
            </a>
            ). NASA Blue Marble is public domain. Cite USGS, BGS, NOAA, and the Met Office for numbers. SI units
            first.
          </p>
        </div>
      </div>
    </footer>
  );
}
