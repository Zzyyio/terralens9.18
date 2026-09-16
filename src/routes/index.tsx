import { createFileRoute, Link } from "@tanstack/react-router";
import { HomeHero } from "@/components/globe/home-hero";
import { Button } from "@/components/ui/button";
import { LabCard } from "@/components/lab-card";
import { LABS, REALMS, labsInRealm } from "@/lib/labs/catalog";
import { LAB_SCENES } from "@/labs/registry";
import { isListed, labStatus } from "@/lib/labs/status";
import { headFor } from "@/lib/seo";
import { CASES } from "@/lib/cases";
import { PATHS } from "@/lib/paths";

export const Route = createFileRoute("/")({
  component: Home,
  head: () =>
    headFor({
      title: "See how the Earth works",
      description: "Free 3D labs for geography and Earth science students.",
      path: "/",
    }),
});

const FEATURED = ["seasons", "earth-interior", "contours", "rivers"];

function Home() {
  const featured = FEATURED.map((s) => LABS.find((l) => l.slug === s)!).filter(Boolean);
  const ready = (slug: string) => Boolean(LAB_SCENES[slug] && isListed(slug));
  const nLabs = LABS.filter((l) => ready(l.slug)).length;
  const nReady = LABS.filter((l) => ready(l.slug) && labStatus(l.slug) === "complete").length;

  return (
    <main id="main">
      <section className="relative h-dvh min-h-[40rem] overflow-hidden">
        <HomeHero />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void via-void/70 to-transparent" />
        <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-end px-5 pb-16 pt-24 md:justify-center md:pb-0">
          <p className="section-label">Geoscience studio</p>
          <h1 className="mt-4 max-w-xl font-display text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.05] text-chalk">
            See how the Earth works.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-7 text-mist">
            Free 3D labs for geography and Earth science students.
          </p>
          <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
            <Button asChild size="pill">
              <Link to="/explore">Explore labs</Link>
            </Button>
            <Button asChild size="pill" variant="secondary">
              <Link to="/atlas">Atlas</Link>
            </Button>
            <Button asChild size="pill" variant="ghost">
              <Link to="/teachers">Teachers</Link>
            </Button>
          </div>
          <div className="pointer-events-auto mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-mist">
            <Link to="/glossary" className="hover:text-glacier">
              Glossary
            </Link>
            <Link to="/paths" className="hover:text-glacier">
              Paths
            </Link>
            <Link to="/about" className="hover:text-glacier">
              About
            </Link>
            <Link to="/privacy" className="hover:text-glacier">
              Privacy
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 md:py-24">
        <p className="section-label">Realms</p>
        <h2 className="mt-3 font-display text-3xl text-chalk md:text-4xl">Eight rooms. Eight ways in.</h2>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {REALMS.map((r) => {
            const n = labsInRealm(r.slug).filter((l) => ready(l.slug)).length;
            return (
              <Link
                key={r.slug}
                to="/realms/$realm"
                params={{ realm: r.slug }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-280 hover:border-glacier/40"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-glacier">
                  {n === 1 ? "1 lab" : `${n} labs`}
                </p>
                <h3 className="mt-2 font-display text-2xl text-chalk">{r.title}</h3>
                <p className="mt-2 text-sm leading-6 text-mist">{r.blurb}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 pb-16 md:pb-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-label">Featured labs</p>
            <h2 className="mt-3 font-display text-3xl text-chalk">Built to read from the back of the room.</h2>
          </div>
          <Link to="/explore" className="hidden text-sm text-glacier hover:underline md:inline">
            All labs
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((lab) => (
            <LabCard key={lab.slug} lab={lab} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-basalt">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="section-label">Classroom</p>
            <h2 className="mt-3 font-display text-3xl text-chalk">Fifteen minutes. Projector on.</h2>
            <p className="mt-3 max-w-md text-mist">
              Space plays. Arrows scrub time. L labels. R reset. F fullscreen. P projector. T true scale.
              Press ? for the key list. No login.
            </p>
            <Button asChild className="mt-6" variant="secondary">
              <Link to="/teachers">Teacher scripts</Link>
            </Button>
          </div>
          <div>
            <p className="section-label">On the bench</p>
            <p className="mt-4 font-mono text-sm text-glacier">
              {nLabs} labs · {CASES.length} cases · {PATHS.length} paths · {nReady} ready for a full lesson
            </p>
            <p className="mt-6 max-w-md text-sm leading-6 text-mist">
              International English. SI units first. Keyboard for every 3D control. No login, no ads, no
              paywall. Free for students and teachers. Always.
            </p>
            <p className="mt-4">
              <Link to="/explore" className="text-sm text-ice hover:underline">
                Explore labs and cases
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
