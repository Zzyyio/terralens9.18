import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { Suspense } from "react";
import { LAB_BY_SLUG } from "@/lib/labs/catalog";
import { LAB_SCENES } from "@/labs/registry";
import { LAB_ALIASES } from "@/lib/redirects";
import { LabPlayer } from "@/components/lab/lab-player";
import { LabLoadFallback } from "@/components/lab/load-gate";
import { canonicalLink, learningResourceJsonLd, pageTitle, robotsMeta, siteOrigin } from "@/lib/seo";

export const Route = createFileRoute("/lab/$slug")({
  beforeLoad: ({ params }) => {
    const alias = LAB_ALIASES[params.slug];
    if (alias) throw redirect({ to: "/lab/$slug", params: { slug: alias } });
    if (!LAB_BY_SLUG[params.slug] || !LAB_SCENES[params.slug]) throw notFound();
  },
  head: ({ params }) => {
    const lab = LAB_BY_SLUG[params.slug];
    if (!lab) {
      return {
        meta: [
          { title: pageTitle("Not on the bench") },
          { name: "description", content: "This slug is not a shipped lab." },
          robotsMeta(),
        ],
      };
    }
    return {
      meta: [
        { title: pageTitle(lab.title) },
        { name: "description", content: lab.hook },
        robotsMeta(),
      ],
      links: [canonicalLink(`/lab/${lab.slug}`)],
    };
  },
  component: LabPage,
});

function LabPage() {
  const { slug } = Route.useParams();
  const lab = LAB_BY_SLUG[slug];
  const Scene = LAB_SCENES[slug];

  if (!lab || !Scene) {
    throw notFound();
  }

  const jsonLd = learningResourceJsonLd({
    name: lab.title,
    description: lab.hook,
    url: `${siteOrigin()}/lab/${lab.slug}`,
    educationalLevel: lab.ages,
    about: lab.realm,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="sr-only">
        <h1>{lab.title}</h1>
        <p>{lab.hook}</p>
        <p>By the end you can {lab.objective.charAt(0).toLowerCase() + lab.objective.slice(1)}</p>
        {lab.why.map((w) => (
          <p key={w.slice(0, 40)}>{w}</p>
        ))}
      </article>
      <Suspense fallback={<LabLoadFallback title={lab.title} />}>
        <LabPlayer lab={lab} scene={<Scene />} />
      </Suspense>
    </>
  );
}
