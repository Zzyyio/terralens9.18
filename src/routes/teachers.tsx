import { createFileRoute, Link } from "@tanstack/react-router";
import { LABS, REALMS } from "@/lib/labs/catalog";
import { LAB_SCENES } from "@/labs/registry";
import { isListed, teacherScriptReady } from "@/lib/labs/status";
import { headFor } from "@/lib/seo";
import { Figure } from "@/components/figure";
import { labFigure, labFigures, REALM_FIGURE } from "@/lib/figures";

export const Route = createFileRoute("/teachers")({
  component: Teachers,
  head: () =>
    headFor({
      title: "Teachers",
      description: "Fifteen-minute projector scripts for TerraLens labs. No login.",
      path: "/teachers",
    }),
});

function Teachers() {
  const shipped = LABS.filter((lab) => LAB_SCENES[lab.slug] && isListed(lab.slug));
  const ready = shipped.filter((lab) => teacherScriptReady(lab.teacher.script));
  const pending = shipped.filter((lab) => !teacherScriptReady(lab.teacher.script));

  return (
    <main id="main" className="mx-auto max-w-[800px] px-5 pb-24 pt-24">
      <p className="section-label">Teachers</p>
      <h1 className="mt-3 font-display text-4xl text-chalk md:text-5xl">Fifteen minutes, projector on.</h1>
      <p className="mt-5 text-lg leading-7 text-mist">
        No login. Open a lab, go full screen, talk. {ready.length} labs have a full demo script
        {pending.length ? `; ${pending.length} still thin` : ""}. Each script names the misconception you
        will hear from the third row. Same count as Explore.
      </p>
      <div className="mt-10 space-y-16">
        {REALMS.map((realm) => {
          const labs = ready.filter((lab) => lab.realm === realm.slug);
          if (labs.length === 0) return null;
          const realmFig = REALM_FIGURE[realm.slug];
          return (
            <section key={realm.slug}>
              <p className="section-label">{realm.kicker}</p>
              <h2 className="mt-2 font-display text-3xl text-chalk">{realm.title}</h2>
              <p className="mt-2 text-mist">{realm.blurb}</p>
              {realmFig && <Figure {...realmFig} className="mt-5 max-w-xl" />}
              <div className="mt-8 space-y-4">
                {labs.map((lab) => {
                  const shot = labFigures(lab.slug)[0] ?? labFigure(lab.slug);
                  return (
                    <article key={lab.slug} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-glacier">
                        {lab.curriculum[0]}
                      </p>
                      <h3 className="mt-1 font-display text-2xl">
                        <Link to="/lab/$slug" params={{ slug: lab.slug }} className="hover:text-glacier">
                          {lab.title}
                        </Link>
                      </h3>
                      {shot && <Figure {...shot} className="mt-3" />}
                      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-chalk/90">
                        {lab.teacher.script}
                      </p>
                      <ul className="mt-3 list-disc pl-5 text-sm text-mist">
                        {lab.teacher.pitfalls.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
