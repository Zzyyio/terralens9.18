import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LabCard } from "@/components/lab-card";
import { LABS, REALMS } from "@/lib/labs/catalog";
import { LAB_SCENES } from "@/labs/registry";
import { isListed, labStatus } from "@/lib/labs/status";
import type { AgeBand, RealmSlug } from "@/lib/labs/types";
import { cn } from "@/lib/utils";
import { headFor } from "@/lib/seo";
import { CASES } from "@/lib/cases";
import { PATHS } from "@/lib/paths";
import { caseFigure } from "@/lib/case-figures";

export const Route = createFileRoute("/explore")({
  component: Explore,
  head: () =>
    headFor({
      title: "Explore labs",
      description: "Filter TerraLens labs by realm or curriculum tag. Case studies and paths sit on the same chart.",
      path: "/explore",
    }),
});

const UK: AgeBand[] = ["KS3", "GCSE", "A-level"];
const US: AgeBand[] = ["NGSS MS", "HS Earth Sci", "APES"];

const SHIPPED = LABS.filter((l) => LAB_SCENES[l.slug] && isListed(l.slug));

function Explore() {
  const [kind, setKind] = useState<"labs" | "cases">("labs");
  const [realm, setRealm] = useState<RealmSlug | "all">("all");
  const [uk, setUk] = useState<AgeBand | "all">("all");
  const [us, setUs] = useState<AgeBand | "all">("all");
  const [region, setRegion] = useState<"all" | "UK" | "US" | "Shared" | "East Asia">("all");

  const list = useMemo(
    () =>
      SHIPPED.filter((l) => (realm === "all" ? true : l.realm === realm))
        .filter((l) => (uk === "all" ? true : l.ages.includes(uk)))
        .filter((l) => (us === "all" ? true : l.ages.includes(us))),
    [realm, uk, us],
  );

  const cases = useMemo(
    () => CASES.filter((c) => (region === "all" ? true : c.region === region)),
    [region],
  );

  const complete = SHIPPED.filter((l) => labStatus(l.slug) === "complete").length;

  return (
    <main id="main" className="mx-auto max-w-[1280px] px-5 pb-24 pt-24">
      <p className="section-label">Explore</p>
      <h1 className="mt-3 font-display text-4xl text-chalk md:text-5xl">
        {SHIPPED.length} labs. {CASES.length} cases. {complete} ready for a full lesson.
      </h1>
      <p className="mt-4 max-w-2xl text-mist">
        Filter by realm, then by a curriculum tag if you need one. KS3 / GCSE / A-level / NGSS / APES are
        filters, not the identity of the studio. A lab without a model does not get a card.
      </p>

      <div className="mt-8">
        <p className="section-label mb-3">Paths</p>
        <div className="flex flex-wrap gap-2">
          {PATHS.map((p) => (
            <Link
              key={p.slug}
              to="/paths/$slug"
              params={{ slug: p.slug }}
              className="inline-flex h-11 items-center rounded-full border border-white/10 bg-white/6 px-3.5 text-sm text-chalk hover:bg-white/10"
            >
              {p.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <Chip active={kind === "labs"} onClick={() => setKind("labs")}>
          Labs · {SHIPPED.length}
        </Chip>
        <Chip active={kind === "cases"} onClick={() => setKind("cases")}>
          Case studies · {CASES.length}
        </Chip>
      </div>

      {kind === "labs" ? (
        <>
          <div className="mt-10 flex flex-col gap-6">
            <FilterRow label="Realm">
              <Chip active={realm === "all"} onClick={() => setRealm("all")}>
                All
              </Chip>
              {REALMS.map((r) => (
                <Chip key={r.slug} active={realm === r.slug} onClick={() => setRealm(r.slug)}>
                  {r.title}
                </Chip>
              ))}
            </FilterRow>
            <FilterRow label="UK stage">
              <Chip active={uk === "all"} onClick={() => setUk("all")}>
                All
              </Chip>
              {UK.map((a) => (
                <Chip key={a} active={uk === a} onClick={() => setUk(a)}>
                  {a}
                </Chip>
              ))}
            </FilterRow>
            <FilterRow label="US framework">
              <Chip active={us === "all"} onClick={() => setUs("all")}>
                All
              </Chip>
              {US.map((a) => (
                <Chip key={a} active={us === a} onClick={() => setUs(a)}>
                  {a}
                </Chip>
              ))}
            </FilterRow>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((lab) => (
              <LabCard key={lab.slug} lab={lab} />
            ))}
          </div>
          {list.length === 0 && (
            <div className="mt-16 max-w-lg">
              <h2 className="font-display text-2xl">This coordinate is empty ocean.</h2>
              <p className="mt-3 text-mist">No lab matches that pair. Try All, or another realm.</p>
              <button
                type="button"
                onClick={() => {
                  setRealm("all");
                  setUk("all");
                  setUs("all");
                }}
                className="mt-6 inline-flex h-11 items-center rounded-full bg-glacier px-5 text-sm text-basalt"
              >
                Explore labs
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="mt-10">
            <FilterRow label="Region">
              <Chip active={region === "all"} onClick={() => setRegion("all")}>
                All
              </Chip>
              {(["UK", "US", "Shared", "East Asia"] as const).map((r) => (
                <Chip key={r} active={region === r} onClick={() => setRegion(r)}>
                  {r}
                </Chip>
              ))}
            </FilterRow>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {cases.map((c) => {
              const fig = caseFigure(c.slug);
              return (
                <Link
                  key={c.slug}
                  to="/case/$slug"
                  params={{ slug: c.slug }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-colors hover:border-glacier/40"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-trench">
                    {fig ? (
                      <img src={fig.src} alt={fig.alt} className="size-full object-cover" />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-glacier">
                      {c.region} · {c.place}
                    </p>
                    <h2 className="font-display text-xl text-chalk group-hover:text-glacier">{c.title}</h2>
                    <p className="line-clamp-3 text-sm leading-6 text-mist">{c.lede}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="section-label mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-11 items-center rounded-full border px-3.5 text-sm",
        active
          ? "border-glacier/40 bg-glacier text-basalt"
          : "border-white/10 bg-white/6 text-chalk hover:bg-white/10",
      )}
    >
      {children}
    </button>
  );
}
