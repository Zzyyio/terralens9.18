import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { LABS } from "@/lib/labs/catalog";
import { LAB_SCENES } from "@/labs/registry";
import { GLOSSARY } from "@/lib/glossary-data";
import { CASES } from "@/lib/cases";
import { Button } from "@/components/ui/button";
import { headFor } from "@/lib/seo";
import { isListed } from "@/lib/labs/status";

export const Route = createFileRoute("/search")({
  component: SearchPage,
  head: () =>
    headFor({
      title: "Search",
      description: "Find a TerraLens lab, glossary term, or case study.",
      path: "/search",
    }),
});

const SHIPPED = LABS.filter((l) => LAB_SCENES[l.slug] && isListed(l.slug));

function SearchPage() {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const needle = q.trim().toLowerCase();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      const tag = el?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || el?.isContentEditable) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const labs = useMemo(() => {
    if (!needle) return SHIPPED;
    return SHIPPED.filter((l) =>
      [l.title, l.hook, l.objective, l.realm, ...l.curriculum, ...l.ages]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [needle]);

  const terms = useMemo(() => {
    if (!needle) return GLOSSARY.slice(0, 12);
    return GLOSSARY.filter((g) =>
      `${g.term} ${g.def} ${g.exam ?? ""}`.toLowerCase().includes(needle),
    );
  }, [needle]);

  const cases = useMemo(() => {
    if (!needle) return CASES.slice(0, 8);
    return CASES.filter((c) =>
      `${c.title} ${c.place} ${c.lede} ${c.body.join(" ")}`.toLowerCase().includes(needle),
    );
  }, [needle]);

  const empty = needle.length > 0 && labs.length === 0 && terms.length === 0 && cases.length === 0;

  return (
    <main id="main" className="mx-auto max-w-[900px] px-5 pb-24 pt-24">
      <p className="section-label">Search</p>
      <h1 className="mt-3 font-display text-4xl text-chalk md:text-5xl">Find a lab, a word, a place.</h1>
      <p className="mt-3 text-sm text-mist">Press / to focus. SI names and ordinary English both work.</p>
      <label className="relative mt-8 block">
        <span className="sr-only">Search TerraLens</span>
        <input
          ref={inputRef}
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Seasons, Holderness, Coriolis…"
          className="h-12 w-full rounded-[16px] border border-white/10 bg-white/6 px-4 pr-24 text-chalk placeholder:text-mist/70"
          suppressHydrationWarning
        />
        {q && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              inputRef.current?.focus();
            }}
            className="absolute right-2 top-1/2 inline-flex h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full px-3 font-mono text-[11px] text-mist hover:text-chalk"
          >
            Clear
          </button>
        )}
      </label>

      {empty ? (
        <div className="mt-16 max-w-lg">
          <h2 className="font-display text-2xl">This coordinate is empty ocean.</h2>
          <p className="mt-3 text-mist">Nothing on the chart matches that. Try a realm name, a landform, or a case.</p>
          <Button asChild className="mt-6">
            <Link to="/explore">Explore labs</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-12 space-y-12">
          <section>
            <p className="section-label">Labs · {labs.length}</p>
            <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {labs.map((l) => (
                <li key={l.slug}>
                  <Link
                    to="/lab/$slug"
                    params={{ slug: l.slug }}
                    className="flex flex-col gap-1 py-4 hover:text-glacier"
                  >
                    <span className="font-display text-xl text-chalk">{l.title}</span>
                    <span className="text-sm text-mist">{l.hook}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <p className="section-label">Glossary · {terms.length}</p>
            <ul className="mt-4 space-y-4">
              {terms.map((g, i) => (
                <li key={`${g.term}-${g.lab}-${i}`}>
                  <p className="font-medium text-chalk">{g.term}</p>
                  <p className="text-sm text-mist">{g.def}</p>
                  <Link to="/lab/$slug" params={{ slug: g.lab }} className="text-sm text-ice hover:underline">
                    {g.labTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <p className="section-label">Cases · {cases.length}</p>
            <ul className="mt-4 space-y-4">
              {cases.map((c) => (
                <li key={c.slug}>
                  <Link to="/case/$slug" params={{ slug: c.slug }} className="hover:text-glacier">
                    <p className="font-display text-xl text-chalk">{c.title}</p>
                    <p className="text-sm text-mist">{c.lede}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </main>
  );
}
