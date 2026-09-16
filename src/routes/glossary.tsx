import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GLOSSARY } from "@/lib/glossary-data";
import { headFor } from "@/lib/seo";
import { Figure } from "@/components/figure";
import { termFigure } from "@/lib/figures";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/glossary")({
  component: Glossary,
  head: () =>
    headFor({
      title: "Glossary",
      description: `${GLOSSARY.length} words used in the TerraLens labs, collected for revision.`,
      path: "/glossary",
    }),
});

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function Glossary() {
  const [q, setQ] = useState("");
  const [letter, setLetter] = useState<string | "all">("A");
  const present = useMemo(
    () =>
      new Set(
        GLOSSARY.map((g) => g.term.replace(/[^A-Za-z]/g, "").charAt(0).toUpperCase()).filter(Boolean),
      ),
    [],
  );
  const needle = q.trim().toLowerCase();
  const list = useMemo(() => {
    if (needle) {
      return GLOSSARY.filter((g) =>
        `${g.term} ${g.def} ${g.exam ?? ""} ${g.labTitle}`.toLowerCase().includes(needle),
      );
    }
    if (letter === "all") return GLOSSARY;
    return GLOSSARY.filter((g) => g.term.replace(/[^A-Za-z]/g, "").charAt(0).toUpperCase() === letter);
  }, [needle, letter]);

  const shownSrc = new Set<string>();

  return (
    <main id="main" className="mx-auto max-w-[800px] px-5 pb-24 pt-24">
      <p className="section-label">Glossary</p>
      <h1 className="mt-3 font-display text-4xl">{GLOSSARY.length} words used in the labs.</h1>
      <p className="mt-4 text-mist">
        Defined on first use in each lab. Collected here for revision. One entry per term; UK and US
        spellings both kept where they differ. Pick a letter or search — the full list is not dumped into one
        page.
      </p>
      <label className="relative mt-8 block">
        <span className="sr-only">Filter glossary</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cirque, spit, terminator…"
          className="h-12 w-full rounded-[16px] border border-white/10 bg-white/6 px-4 text-chalk placeholder:text-mist/70"
        />
      </label>
      <nav aria-label="A to Z" className="mt-6 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => {
            setLetter("all");
            setQ("");
          }}
          className={cn(
            "inline-flex h-11 items-center rounded-full border px-3 font-mono text-sm",
            letter === "all" && !needle
              ? "border-glacier/40 bg-glacier text-basalt"
              : "border-white/10 text-glacier hover:bg-white/8",
          )}
        >
          All
        </button>
        {LETTERS.map((L) =>
          present.has(L) ? (
            <button
              key={L}
              type="button"
              onClick={() => {
                setLetter(L);
                setQ("");
              }}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full border font-mono text-sm",
                letter === L && !needle
                  ? "border-glacier/40 bg-glacier text-basalt"
                  : "border-white/10 text-glacier hover:bg-white/8",
              )}
            >
              {L}
            </button>
          ) : (
            <span
              key={L}
              className="inline-flex size-11 items-center justify-center font-mono text-sm text-mist/40"
              aria-disabled
            >
              {L}
            </span>
          ),
        )}
      </nav>
      <p className="mt-6 font-mono text-[11px] text-mist">
        Showing {list.length}
        {needle ? ` matching “${q.trim()}”` : letter === "all" ? "" : ` · ${letter}`}
      </p>
      <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
        {list.map((g) => {
          const fig = termFigure(g.term);
          const show = fig && !shownSrc.has(fig.src);
          if (fig && show) shownSrc.add(fig.src);
          return (
            <div key={`${g.term}-${g.lab}`} className="py-5">
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
      {list.length === 0 && (
        <p className="mt-10 text-mist">This coordinate is empty ocean. Try another letter, or All.</p>
      )}
    </main>
  );
}
