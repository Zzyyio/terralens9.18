import { createFileRoute, Link } from "@tanstack/react-router";
import { headFor, indexModeLabel, learningResourceJsonLd, siteOrigin } from "@/lib/seo";
import { LABS } from "@/lib/labs/catalog";
import { LAB_SCENES } from "@/labs/registry";
import { isListed } from "@/lib/labs/status";
import { CASES } from "@/lib/cases";
import { MailLink } from "@/components/mail-link";
import {
  CONTACT_LEAD,
  PRODUCER_IG,
  PRODUCER_IG_HANDLE,
  PRODUCER_LINE,
  PRODUCER_LINE_ZH,
  PRODUCER_QUOTE,
  PRODUCER_SITE,
  PRODUCER_X,
  PRODUCER_X_HANDLE,
  SCHOOL_NAME,
} from "@/lib/contact";

export const Route = createFileRoute("/about")({
  component: About,
  head: () =>
    headFor({
      title: "About",
      description: "A free Earth studio for secondary and high-school students worldwide.",
      path: "/about",
      image: "/photos/li-zeyu-field.jpg",
    }),
});

function About() {
  const n = LABS.filter((l) => LAB_SCENES[l.slug] && isListed(l.slug)).length;
  const jsonLd = learningResourceJsonLd({
    name: "TerraLens",
    description: "Free 3D labs for geography and Earth science students.",
    url: `${siteOrigin()}/about`,
    type: "WebPage",
    about: "Earth science education",
    image: "/photos/li-zeyu-field.jpg",
  });
  return (
    <main id="main" className="mx-auto max-w-[860px] px-5 pb-24 pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="section-label">About</p>
      <h1 className="mt-3 font-display text-4xl text-chalk md:text-5xl">A free Earth studio.</h1>
      <div className="mt-8 space-y-5 text-[17px] leading-7 text-chalk/90">
        <p>
          TerraLens is a free, English-language geoscience studio for secondary and high-school students
          worldwide. It is inspired by the idea that a process you can turn in your hands is a process you
          can explain.
        </p>
        <p>
          After a lab, a student should be able to say the mechanism in their own words and recognise it on a
          map or in the field. That is the whole product. {n} labs and {CASES.length} case studies sit on the
          bench.
        </p>
        <p>
          Free forever. No paywall, no ads, no sponsorship banner, no login wall for content. International
          English. SI units first; US customary in parentheses where it helps. Colour and color, metre and
          meter, both accepted in copy.
        </p>
        <p>Not affiliated with Kongsberg Geospatial or any other TerraLens product.</p>
      </div>

      <h2 className="mt-16 font-display text-2xl">Website producer</h2>
      <article className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="grid md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="relative min-h-[22rem] bg-trench md:min-h-full">
            <img
              src="/photos/li-zeyu-field.jpg"
              alt="Li Zeyu in the field: a student geologist in an orange hard hat kneeling on a dark laminated rock outcrop, holding a hand sample and a yellow-handled geological hammer."
              className="absolute inset-0 size-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8">
            <p className="font-display text-2xl leading-8 text-chalk md:text-[1.65rem] md:leading-9">
              “{PRODUCER_QUOTE}”
            </p>
            <p className="mt-6 text-[15px] leading-7 text-chalk/90">{PRODUCER_LINE}</p>
            <p className="font-cjk mt-4 text-[15px] leading-7 text-mist">{PRODUCER_LINE_ZH}</p>
            <p className="mt-2 text-[15px] leading-7 text-mist">
              International English is the classroom language; this line is the bilingual handshake, not a
              second site. {SCHOOL_NAME} is the school on the identity line — not a contact desk.
            </p>
            <ul className="mt-6 flex flex-col gap-2 text-sm">
              <li>
                <MailLink />
              </li>
              <li>
                <a href={PRODUCER_IG} className="text-ice hover:underline" target="_blank" rel="noreferrer">
                  Instagram {PRODUCER_IG_HANDLE}
                </a>
              </li>
              <li>
                <a href={PRODUCER_X} className="text-ice hover:underline" target="_blank" rel="noreferrer">
                  X {PRODUCER_X_HANDLE}
                </a>
              </li>
              <li>
                <a href={PRODUCER_SITE} className="text-ice hover:underline" target="_blank" rel="noreferrer">
                  Personal site · zeyuli.grok.me
                </a>
              </li>
            </ul>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-mist">Also builds</p>
            <p className="mt-2 text-sm leading-6 text-mist">
              TerraLens (this studio), Mountainstone, and Tuzhi — small tools, same job: make a process
              visible. This site stays a classroom, not a portfolio.
            </p>
            <p className="mt-4 text-xs leading-5 text-mist">
              {CONTACT_LEAD}{" "}
              <MailLink />
            </p>
          </div>
        </div>
      </article>

      <h2 className="mt-14 font-display text-2xl">Curriculum tags</h2>
      <p className="mt-4 text-mist">
        Labs are also mapped to KS3 / GCSE / A-level / NGSS / APES so a teacher can filter. Those tags are a
        filter, not the identity of the studio.
      </p>

      <h2 className="mt-14 font-display text-2xl">Licence</h2>
      <p className="mt-4 text-mist">
        Original lab models, copy, and diagrams:{" "}
        <a
          href="https://creativecommons.org/licenses/by-nc/4.0/"
          className="font-medium text-chalk hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          CC BY-NC 4.0
        </a>
        . Teachers may project and print for class. Do not sell the models as a product.{" "}
        <a href="https://www.nasa.gov/" className="text-ice hover:underline" target="_blank" rel="noreferrer">
          NASA
        </a>{" "}
        Blue Marble imagery is public domain. Cite{" "}
        <a href="https://www.usgs.gov/" className="text-ice hover:underline" target="_blank" rel="noreferrer">
          USGS
        </a>
        ,{" "}
        <a href="https://www.bgs.ac.uk/" className="text-ice hover:underline" target="_blank" rel="noreferrer">
          BGS
        </a>
        ,{" "}
        <a href="https://www.noaa.gov/" className="text-ice hover:underline" target="_blank" rel="noreferrer">
          NOAA
        </a>
        , and the{" "}
        <a href="https://www.metoffice.gov.uk/" className="text-ice hover:underline" target="_blank" rel="noreferrer">
          Met Office
        </a>{" "}
        if you reuse numbers in a handout.
      </p>

      <h2 className="mt-14 font-display text-2xl">Sources</h2>
      <ul className="mt-4 space-y-2 text-mist">
        <li>NASA Blue Marble and Scientific Visualization Studio — globe textures and seasonal geometry</li>
        <li>USGS — interior, plates, rivers, water science, hazards</li>
        <li>British Geological Survey — UK landforms and tectonics</li>
        <li>NOAA / Met Office — insolation, day length, weather, water cycle</li>
        <li>Open-Meteo — educational live weather (not a forecast desk)</li>
        <li>Natural Earth — countries, states, coastlines</li>
        <li>OpenStreetMap / OpenFreeMap — locators and the atlas, never as a tracker</li>
        <li>YouTube nocookie — in-site classroom films, autoplay off</li>
      </ul>

      <h2 className="mt-14 font-display text-2xl">Version</h2>
      <p className="mt-4 text-mist">
        Classroom studio, September 2026. Indexing is {indexModeLabel()}: published terralens.grok.me is
        open to crawlers; sandbox preview and local hosts send noindex. See also{" "}
        <Link to="/privacy" className="text-ice hover:underline">
          Privacy
        </Link>
        .
      </p>
      <p className="mt-8 font-mono text-sm text-glacier">Free for students and teachers. Always.</p>
    </main>
  );
}
