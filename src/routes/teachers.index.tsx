import { createFileRoute, Link } from "@tanstack/react-router";
import { LABS, REALMS } from "@/lib/labs/catalog";
import { LAB_SCENES } from "@/labs/registry";
import { isListed, teacherScriptReady } from "@/lib/labs/status";
import { headFor } from "@/lib/seo";
import { CASES } from "@/lib/cases";

export const Route = createFileRoute("/teachers/")({
  component: TeachersIndex,
  head: () =>
    headFor({
      title: "Teachers",
      description: "Fifteen-minute projector scripts for TerraLens labs. No login.",
      path: "/teachers",
    }),
});

function TeachersIndex() {
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
        will hear from the third row. Same count as Explore. {CASES.length} case studies sit beside the
        labs.
      </p>
      <nav aria-label="Realms" className="mt-8 flex flex-wrap gap-2">
        {REALMS.map((realm) => (
          <a
            key={realm.slug}
            href={`#realm-${realm.slug}`}
            className="inline-flex h-11 items-center rounded-full border border-white/10 px-3.5 text-sm text-chalk hover:bg-white/8"
          >
            {realm.title}
          </a>
        ))}
      </nav>
      <div className="mt-10 space-y-16">
        {REALMS.map((realm) => {
          const labs = ready.filter((lab) => lab.realm === realm.slug);
          if (labs.length === 0) return null;
          return (
            <section key={realm.slug} id={`realm-${realm.slug}`}>
              <p className="section-label">{realm.kicker}</p>
              <h2 className="mt-2 font-display text-3xl text-chalk">{realm.title}</h2>
              <p className="mt-2 text-mist">{realm.blurb}</p>
              <div className="mt-8 grid gap-3">
                {labs.map((lab) => {
                  const pairs = lab.misconceptions?.length ? lab.misconceptions : [lab.misconception];
                  return (
                    <article key={lab.slug} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-glacier">
                        {lab.curriculum[0]}
                      </p>
                      <h3 className="mt-1 font-display text-2xl">
                        <Link to="/teachers/$slug" params={{ slug: lab.slug }} className="hover:text-glacier">
                          {lab.title}
                        </Link>
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-chalk/90">{lab.hook}</p>
                      <p className="mt-3 text-sm leading-6 text-mist">
                        Third row will say: {pairs[0]?.claim}
                      </p>
                      <p className="mt-3 text-sm">
                        <Link to="/teachers/$slug" params={{ slug: lab.slug }} className="text-ice hover:underline">
                          Open the full note
                        </Link>
                        {" · "}
                        <Link to="/lab/$slug" params={{ slug: lab.slug }} className="text-ice hover:underline">
                          Open the lab
                        </Link>
                      </p>
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
