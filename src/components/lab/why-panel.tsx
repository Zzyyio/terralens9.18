import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { LabMeta, PanelTab } from "@/lib/labs/types";
import { useLabControls } from "@/lib/store/lab-controls";
import { cn } from "@/lib/utils";
import { Figure } from "@/components/figure";
import { labFigures, termFigure } from "@/lib/figures";
import { labVideo } from "@/lib/lab-videos";
import { tenQuestions } from "@/lib/labs/ten-questions";

const WHY_LABELS = [
  "Why this matters",
  "The mechanism",
  "How to drive the model",
  "If the model will not spin",
] as const;

export function WhyPanel({ lab }: { lab: LabMeta }) {
  const tab = useLabControls((s) => s.panelTab);
  const setTab = useLabControls((s) => s.setPanelTab);
  const exam = useLabControls((s) => s.examLanguage);
  const setExam = useLabControls((s) => s.setExam);
  const pairs = lab.misconceptions?.length ? lab.misconceptions : [lab.misconception];
  const figs = labFigures(lab.slug);
  const video = labVideo(lab.slug);
  const seenTermSrc = new Set<string>();

  return (
    <aside className="pointer-events-auto flex max-h-[min(68vh,40rem)] w-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-basalt/75 backdrop-blur-xl lg:w-[min(100%,22rem)]">
      <div className="flex border-b border-white/10">
        {(
          [
            ["why", "Why"],
            ["terms", "Terms"],
            ["check", "Check"],
            ["teach", "Teach"],
          ] as const satisfies readonly [PanelTab, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "flex-1 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em]",
              tab === id ? "text-glacier" : "text-mist hover:text-chalk",
            )}
            aria-label={id === "teach" ? "Teacher" : label}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="overflow-y-auto p-4 text-[13px] leading-5">
        {tab === "why" && (
          <div className="space-y-4">
            {figs[0] && <Figure {...figs[0]} />}
            {lab.why.map((w, i) => (
              <div key={w.slice(0, 56)}>
                <p className="section-label">{WHY_LABELS[i] ?? `Note ${i + 1}`}</p>
                <p className="mt-2 text-[13px] leading-6 text-chalk/90">{w}</p>
                {i === 0 && figs[1] && <Figure {...figs[1]} />}
              </div>
            ))}
            {video && (
              <div>
                <p className="section-label">Film</p>
                <div className="mt-2 overflow-hidden rounded-xl border border-white/10">
                  <iframe
                    title={video.title}
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                    className="aspect-video w-full"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <p className="mt-2 text-[12px] leading-5 text-mist">
                  {video.title}. {video.source}. About {video.minutes} min. {video.license} Autoplay off.
                </p>
              </div>
            )}
            <p className="section-label">Misconceptions</p>
            {pairs.map((m) => (
              <div key={m.claim} className="rounded-[10px] border border-fault/30 bg-fault/10 p-3">
                <p className="font-medium text-fault">{m.claim}</p>
                <p className="mt-2 text-chalk">{m.truth}</p>
              </div>
            ))}
            {lab.cases.length > 0 && (
              <div>
                <p className="section-label mb-2">Cases</p>
                <ul className="space-y-1">
                  {lab.cases.map((c) => (
                    <li key={c.slug}>
                      <Link to="/case/$slug" params={{ slug: c.slug }} className="text-ice hover:underline">
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {tab === "terms" && (
          <div className="space-y-3">
            <label className="flex min-h-11 items-center justify-between gap-2 text-mist">
              Exam language
              <input
                type="checkbox"
                checked={exam}
                onChange={(e) => setExam(e.target.checked)}
                className="accent-glacier"
              />
            </label>
            {lab.glossary.map((g) => {
              const tfig = termFigure(g.term);
              const show = tfig && !seenTermSrc.has(tfig.src);
              if (tfig && show) seenTermSrc.add(tfig.src);
              return (
                <div key={g.term}>
                  <p className="font-medium text-chalk">{exam && g.exam ? g.exam : g.term}</p>
                  {exam && g.exam && <p className="font-mono text-[11px] text-mist">{g.term}</p>}
                  <p className="mt-1 text-mist">{g.def}</p>
                  {show && tfig && <Figure {...tfig} size="sm" />}
                </div>
              );
            })}
          </div>
        )}
        {tab === "check" && <CheckList lab={lab} />}
        {tab === "teach" && (
          <div className="space-y-3">
            {(figs[1] ?? figs[0]) && <Figure {...(figs[1] ?? figs[0])!} size="sm" />}
            <p className="section-label">8–12 minute demo</p>
            <p className="whitespace-pre-line text-chalk/90">{lab.teacher.script}</p>
            <p className="section-label">Common misconceptions</p>
            <ul className="list-disc space-y-1 pl-4 text-mist">
              {lab.teacher.pitfalls.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="section-label">Sources</p>
            <ul className="space-y-1 text-mist">
              {lab.sources.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a href={s.href} className="text-ice hover:underline" target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  ) : (
                    s.label
                  )}
                </li>
              ))}
            </ul>
            <Link
              to="/teachers/$slug"
              params={{ slug: lab.slug }}
              className="inline-flex h-11 items-center text-ice hover:underline"
            >
              Open the full note
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}

function CheckList({ lab }: { lab: LabMeta }) {
  const qs = tenQuestions(lab);
  const [picked, setPicked] = useState<Record<number, number>>({});
  return (
    <div className="space-y-5">
      {qs.map((q, i) => {
        const choice = picked[i];
        const shown = choice !== undefined;
        const ok = shown && choice === q.answer;
        return (
          <div key={q.prompt}>
            <p className="font-medium text-chalk">
              {i + 1}. {q.prompt}
            </p>
            <ul className="mt-2 space-y-1.5">
              {q.choices.map((c, j) => (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => setPicked((p) => ({ ...p, [i]: j }))}
                    className={cn(
                      "min-h-11 w-full rounded-[10px] border px-3 py-2 text-left text-[13px]",
                      choice === j
                        ? ok
                          ? "border-moss/50 bg-moss/15 text-chalk"
                          : "border-fault/50 bg-fault/15 text-chalk"
                        : "border-white/10 text-mist hover:border-white/25 hover:text-chalk",
                    )}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
            {shown && <p className="mt-2 text-[12px] leading-5 text-mist">{q.explain}</p>}
          </div>
        );
      })}
    </div>
  );
}
