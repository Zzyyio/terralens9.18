import { createFileRoute, Link } from "@tanstack/react-router";
import { PATHS } from "@/lib/paths";
import { LABS } from "@/lib/labs/catalog";
import { LAB_SCENES } from "@/labs/registry";
import { isListed } from "@/lib/labs/status";
import { headFor } from "@/lib/seo";

export const Route = createFileRoute("/paths/")({
  component: PathsIndex,
  head: () =>
    headFor({
      title: "Paths",
      description: "Curriculum sequences through TerraLens labs. GCSE, A-level, NGSS, APES, and one-question walks.",
      path: "/paths",
    }),
});

function PathsIndex() {
  return (
    <main id="main" className="mx-auto max-w-[900px] px-5 pb-24 pt-24">
      <p className="section-label">Paths</p>
      <h1 className="mt-3 font-display text-4xl text-chalk md:text-5xl">A sequence, not a pile.</h1>
      <p className="mt-4 max-w-2xl text-mist">
        Curriculum tags are filters. A path is an order: which lab first, which lab next, why that order. Open
        one and walk it. Same 3D bench as Explore.
      </p>
      <div className="mt-12 space-y-4">
        {PATHS.map((p) => {
          const n = p.labs.filter((s) => LAB_SCENES[s] && isListed(s)).length;
          return (
            <Link
              key={p.slug}
              to="/paths/$slug"
              params={{ slug: p.slug }}
              className="block rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-glacier/40"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-glacier">{p.board}</p>
              <h2 className="mt-2 font-display text-2xl text-chalk">{p.title}</h2>
              <p className="mt-2 text-sm text-mist">{p.kicker}</p>
              <p className="mt-3 text-sm leading-6 text-mist">{p.blurb}</p>
              <p className="mt-3 font-mono text-[11px] text-glacier">
                {n} {n === 1 ? "lab" : "labs"}
                {p.labs
                  .map((s) => LABS.find((l) => l.slug === s)?.title)
                  .filter(Boolean)
                  .slice(0, 4)
                  .join(" · ")}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
