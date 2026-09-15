import { createFileRoute, Link } from "@tanstack/react-router";
import { headFor } from "@/lib/seo";
import { LABS } from "@/lib/labs/catalog";
import { LAB_SCENES } from "@/labs/registry";
import { isListed } from "@/lib/labs/status";
import { Figure } from "@/components/figure";

export const Route = createFileRoute("/about")({
  component: About,
  head: () =>
    headFor({
      title: "About",
      description: "A free Earth studio for secondary and high-school students worldwide.",
      path: "/about",
    }),
});

function About() {
  const n = LABS.filter((l) => LAB_SCENES[l.slug] && isListed(l.slug)).length;
  return (
    <main id="main" className="mx-auto max-w-[720px] px-5 pb-24 pt-24">
      <p className="section-label">About</p>
      <h1 className="mt-3 font-display text-4xl text-chalk md:text-5xl">A free Earth studio.</h1>
      <div className="mt-8 space-y-5 text-[17px] leading-7 text-chalk/90">
        <p>
          TerraLens is a free, English-language geoscience studio for secondary and high-school students
          worldwide. It is inspired by the idea that a process you can turn in your hands is a process you
          can explain.
        </p>
        <Figure
          src="/photos/earth-apollo17.jpg"
          alt="The whole Earth as a sphere seen from space, with Africa, Arabia and Antarctica under scattered cloud."
          caption="A process you can turn in your hands."
          credit="NASA / Apollo 17, public domain"
        />
        <p>
          After a lab, a student should be able to say the mechanism in their own words and recognise it on a
          map or in the field. That is the whole product. {n} labs sit on the bench.
        </p>
        <p>
          Free forever. No paywall, no ads, no sponsorship banner, no login wall for content. International
          English. SI units first; US customary in parentheses where it helps. Colour and color, metre and
          meter, both accepted in copy.
        </p>
        <p>
          Not affiliated with Kongsberg Geospatial or any other TerraLens product.
        </p>
      </div>

      <h2 className="mt-14 font-display text-2xl">Website Producer</h2>
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <img
          src="/photos/li-zeyu-field.jpg"
          alt="A student geologist in an orange hard hat kneeling on a dark laminated rock outcrop, holding a hand sample and a yellow-handled geological hammer."
          className="w-full object-cover object-top"
        />
        <p className="px-4 py-3 font-mono text-[11px] text-mist">Li Zeyu in the field.</p>
      </div>
      <p className="mt-5 whitespace-pre-wrap text-[17px] leading-7 text-chalk/90">
        Website Producer：Li Zeyu.  A Geoscience Lover. The President of Geoscience Club of Shanghai Pinghe School
      </p>

      <h2 className="mt-14 font-display text-2xl">Curriculum tags</h2>
      <p className="mt-4 text-mist">
        Labs are also mapped to KS3 / GCSE / A-level / NGSS / APES so a teacher can filter. Those tags are a
        filter, not the identity of the studio.
      </p>

      <h2 className="mt-14 font-display text-2xl">Licence</h2>
      <p className="mt-4 text-mist">
        Original lab models, copy, and diagrams: <strong className="text-chalk">CC BY-NC 4.0</strong>. Teachers
        may project and print for class. Do not sell the models as a product. NASA Blue Marble imagery is
        public domain. Cite USGS, BGS, NOAA, and the Met Office if you reuse numbers in a handout.
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
      </ul>

      <h2 className="mt-14 font-display text-2xl">Version</h2>
      <p className="mt-4 text-mist">
        Studio model pass, September 2026. See also{" "}
        <Link to="/privacy" className="text-ice hover:underline">
          Privacy
        </Link>
        .
      </p>
      <p className="mt-8 font-mono text-sm text-glacier">Free for students and teachers. Always.</p>
    </main>
  );
}
