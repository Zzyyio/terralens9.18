import { createFileRoute, Link } from "@tanstack/react-router";
import { GLOSSARY } from "@/lib/glossary-data";
import { headFor } from "@/lib/seo";
import { Figure } from "@/components/figure";
import { termFigure } from "@/lib/figures";

export const Route = createFileRoute("/glossary")({
  component: Glossary,
  head: () =>
    headFor({
      title: "Glossary",
      description: "Words used in the TerraLens labs, collected for revision.",
      path: "/glossary",
    }),
});

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function Glossary() {
  const present = new Set(
    GLOSSARY.map((g) => g.term.replace(/[^A-Za-z]/g, "").charAt(0).toUpperCase()).filter(Boolean),
  );
  const shownSrc = new Set<string>();
  return (
    <main id="main" className="mx-auto max-w-[800px] px-5 pb-24 pt-24">
      <p className="section-label">Glossary</p>
      <h1 className="mt-3 font-display text-4xl">Words used in the labs.</h1>
      <p className="mt-4 text-mist">
        Defined on first use in each lab. Collected here for revision. One entry per term; UK and US
        spellings both kept where they differ.
      </p>
      <nav aria-label="A to Z" className="mt-8 flex flex-wrap gap-1">
        {LETTERS.map((L) =>
          present.has(L) ? (
            <a
              key={L}
              href={`#letter-${L}`}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 font-mono text-sm text-glacier hover:bg-white/8"
            >
              {L}
            </a>
          ) : (
            <span
              key={L}
              className="inline-flex size-11 items-center justify-center font-mono text-sm text-mist/40"
            >
              {L}
            </span>
          ),
        )}
      </nav>
      <dl className="mt-12 divide-y divide-white/10 border-y border-white/10">
        {GLOSSARY.map((g, i) => {
          const letter = g.term.replace(/[^A-Za-z]/g, "").charAt(0).toUpperCase();
          const prev = GLOSSARY[i - 1]?.term.replace(/[^A-Za-z]/g, "").charAt(0).toUpperCase();
          const start = letter && letter !== prev;
          const fig = termFigure(g.term);
          const show = fig && !shownSrc.has(fig.src);
          if (fig && show) shownSrc.add(fig.src);
          return (
            <div key={`${g.term}-${g.lab}`} className="py-5" id={start ? `letter-${letter}` : undefined}>
              {start && (
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-glacier">{letter}</p>
              )}
              <dt className="font-display text-xl text-chalk">{g.term}</dt>
              {g.exam && <dd className="font-mono text-[11px] text-glacier">{g.exam}</dd>}
              <dd className="mt-2 text-mist">{g.def}</dd>
              {show && fig && <Figure {...fig} className="mt-3 max-w-md" />}
              <dd className="mt-2">
                <Link to="/lab/$slug" params={{ slug: g.lab }} className="text-sm text-ice hover:underline">
                  {g.labTitle}
                </Link>
              </dd>
            </div>
          );
        })}
      </dl>
    </main>
  );
}
