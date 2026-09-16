import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PATH_BY_SLUG } from "@/lib/paths";
import { LAB_BY_SLUG } from "@/lib/labs/catalog";
import { LAB_SCENES } from "@/labs/registry";
import { isListed } from "@/lib/labs/status";
import { LabCard } from "@/components/lab-card";
import { headFor } from "@/lib/seo";

export const Route = createFileRoute("/paths/$slug")({
  beforeLoad: ({ params }) => {
    if (!PATH_BY_SLUG[params.slug]) throw notFound();
  },
  component: PathPage,
  head: ({ params }) => {
    const p = PATH_BY_SLUG[params.slug];
    return headFor({
      title: p?.title ?? "Path",
      description: p?.blurb ?? "A TerraLens lab sequence.",
      path: `/paths/${params.slug}`,
    });
  },
});

function PathPage() {
  const { slug } = Route.useParams();
  const path = PATH_BY_SLUG[slug];
  if (!path) throw notFound();
  const labs = path.labs
    .map((s) => LAB_BY_SLUG[s])
    .filter((l) => l && LAB_SCENES[l.slug] && isListed(l.slug));
  return (
    <main id="main" className="mx-auto max-w-[1280px] px-5 pb-24 pt-24">
      <p className="section-label">Path · {path.board}</p>
      <p className="mt-2">
        <Link to="/paths" className="text-sm text-ice hover:underline">
          All paths
        </Link>
      </p>
      <h1 className="mt-3 font-display text-4xl text-chalk md:text-5xl">{path.title}</h1>
      <p className="mt-2 text-glacier">{path.kicker}</p>
      <p className="mt-5 max-w-2xl text-mist">{path.blurb}</p>
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {labs.map((lab, i) => (
          <li key={lab.slug} className="relative">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-glacier">
              {String(i + 1).padStart(2, "0")}
            </p>
            <LabCard lab={lab} />
          </li>
        ))}
      </ol>
    </main>
  );
}
