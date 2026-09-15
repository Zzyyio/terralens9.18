import { createFileRoute, redirect, notFound } from "@tanstack/react-router";
import { REALMS, labsInRealm } from "@/lib/labs/catalog";
import { LAB_SCENES } from "@/labs/registry";
import { isListed } from "@/lib/labs/status";
import { REALM_ALIASES } from "@/lib/redirects";
import { LabCard } from "@/components/lab-card";
import { headFor } from "@/lib/seo";
import { Figure } from "@/components/figure";
import { REALM_FIGURE } from "@/lib/figures";

export const Route = createFileRoute("/realms/$realm")({
  beforeLoad: ({ params }) => {
    const alias = REALM_ALIASES[params.realm];
    if (alias) throw redirect({ to: "/realms/$realm", params: { realm: alias } });
  },
  head: ({ params }) => {
    const meta = REALMS.find((r) => r.slug === params.realm);
    return headFor({
      title: meta?.title ?? "Realm",
      description: meta?.blurb ?? "TerraLens realm.",
      path: `/realms/${params.realm}`,
    });
  },
  component: RealmPage,
});

function RealmPage() {
  const { realm } = Route.useParams();
  const meta = REALMS.find((r) => r.slug === realm);
  if (!meta) throw notFound();
  const labs = labsInRealm(meta.slug).filter((l) => LAB_SCENES[l.slug] && isListed(l.slug));
  const fig = REALM_FIGURE[meta.slug];
  return (
    <main id="main" className="mx-auto max-w-[1280px] px-5 pb-24 pt-24">
      <p className="section-label">Realm</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">{meta.title}</h1>
      <p className="mt-2 text-glacier">{meta.kicker}</p>
      <p className="mt-5 max-w-2xl text-mist">{meta.blurb}</p>
      {fig && <Figure {...fig} className="mt-8 max-w-xl" />}
      {labs.length === 0 ? (
        <p className="mt-16 max-w-lg text-mist">
          No shipped lab in this realm yet, so there is no empty card. Start with Explore.
        </p>
      ) : (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {labs.map((lab) => (
            <LabCard key={lab.slug} lab={lab} />
          ))}
        </div>
      )}
    </main>
  );
}
