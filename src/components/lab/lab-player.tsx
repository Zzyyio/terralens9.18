import { useEffect, useRef, useState, type ReactNode } from "react";
import type { LabMeta } from "@/lib/labs/types";
import { defaultParams } from "@/lib/labs/defaults";
import { useLabControls } from "@/lib/store/lab-controls";
import { Badge } from "@/components/ui/badge";
import { StepRail } from "./step-rail";
import { WhyPanel } from "./why-panel";
import { ControlBar } from "./control-bar";
import { useIsCompact } from "@/hooks/use-media";
import { labShareUrl, applyLabUrl, useLabUrlSync } from "@/labs/shared/url-state";

const KEYS: { key: string; does: string }[] = [
  { key: "Space", does: "Play / pause" },
  { key: "← →", does: "Scrub time" },
  { key: "L", does: "Labels" },
  { key: "R", does: "Reset" },
  { key: "F", does: "Fullscreen" },
  { key: "P", does: "Projector" },
  { key: "T", does: "True scale" },
  { key: "Click", does: "Inspect a named part" },
  { key: "?", does: "This list" },
];

export function LabPlayer({ lab, scene }: { lab: LabMeta; scene: ReactNode }) {
  const hydrate = useLabControls((s) => s.hydrate);
  const toggle = useLabControls((s) => s.toggle);
  const reset = useLabControls((s) => s.reset);
  const setT = useLabControls((s) => s.setT);
  const t = useLabControls((s) => s.t);
  const setLabels = useLabControls((s) => s.setLabels);
  const labels = useLabControls((s) => s.labels);
  const setExplode = useLabControls((s) => s.setExplode);
  const explode = useLabControls((s) => s.explode);
  const setSlice = useLabControls((s) => s.setSlice);
  const slice = useLabControls((s) => s.slice);
  const layout = useLabControls((s) => s.layout);
  const setLayout = useLabControls((s) => s.setLayout);
  const setPanelTab = useLabControls((s) => s.setPanelTab);
  const setTrueScale = useLabControls((s) => s.setTrueScale);
  const trueScale = useLabControls((s) => s.trueScale);
  const compact = useIsCompact();
  const root = useRef<HTMLDivElement>(null);
  const [fs, setFs] = useState(false);
  const [drawer, setDrawer] = useState<"steps" | "why" | null>(null);
  const [keysOpen, setKeysOpen] = useState(false);
  const projector = layout === "projector" && !compact;
  useLabUrlSync();

  useEffect(() => {
    hydrate(defaultParams(lab));
    if (lab.controls.slice) {
      useLabControls.getState().setSlice(0.42);
    }
    applyLabUrl();
  }, [lab.slug, hydrate, lab]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setKeysOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        setKeysOpen(false);
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        toggle();
      } else if (e.key === "r" || e.key === "R") {
        reset(defaultParams(lab));
      } else if (e.key === "l" || e.key === "L") {
        setLabels(!labels);
      } else if (e.key === "e" || e.key === "E") {
        setExplode(explode > 0.5 ? 0 : 1);
      } else if (e.key === "x" || e.key === "X") {
        setSlice(slice > 0.5 ? 0 : 1);
      } else if (e.key === "p" || e.key === "P") {
        setLayout(layout === "projector" ? "hud" : "projector");
      } else if (e.key === "f" || e.key === "F") {
        void toggleFs();
      } else if (e.key === "t" || e.key === "T") {
        setTrueScale(!trueScale);
      } else if (e.key === "ArrowRight") {
        setT(t + 0.02);
      } else if (e.key === "ArrowLeft") {
        setT(t - 0.02);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle, reset, lab, setT, t, setLabels, labels, setExplode, explode, setSlice, slice, layout, setLayout, setTrueScale, trueScale]);

  async function toggleFs() {
    if (!root.current) return;
    if (!document.fullscreenElement) {
      await root.current.requestFullscreen().catch(() => undefined);
      setFs(true);
    } else {
      await document.exitFullscreen().catch(() => undefined);
      setFs(false);
    }
  }

  const extraKeys = [
    ...(lab.controls.explode ? [{ key: "E", does: "Explode" }] : []),
    ...(lab.controls.slice ? [{ key: "X", does: "Slice" }] : []),
  ];

  const keysPanel = keysOpen && (
    <div className="pointer-events-auto absolute bottom-24 left-1/2 z-30 w-[min(22rem,calc(100%-2rem))] -translate-x-1/2 rounded-2xl border border-white/10 bg-basalt/95 p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <p className="section-label">Keys</p>
        <button type="button" className="text-sm text-mist hover:text-chalk" onClick={() => setKeysOpen(false)}>
          Close
        </button>
      </div>
      <ul className="mt-3 space-y-1.5 font-mono text-[12px] text-chalk">
        {[...KEYS, ...extraKeys].map((row) => (
          <li key={row.key} className="flex justify-between gap-4">
            <span className="text-glacier">{row.key}</span>
            <span className="text-mist">{row.does}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const titleBlock = (
    <div className={projector ? "max-w-3xl" : "max-w-xl"}>
      <p className="section-label">Lab</p>
      <h1 className="font-display text-[24px] leading-8 text-chalk md:text-[32px] md:leading-10">
        {lab.title}
      </h1>
      {!projector && (
        <>
          <p className="mt-2 max-w-lg text-sm leading-6 text-mist">{lab.hook}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
            {lab.curriculum.map((c) => (
              <Badge key={c} tone="mist" className="shrink-0 whitespace-nowrap">
                {c}
              </Badge>
            ))}
          </div>
          <p className="mt-3 text-sm leading-6 text-chalk/85">
            <span className="text-mist">By the end you can </span>
            {lab.objective.charAt(0).toLowerCase() + lab.objective.slice(1)}
          </p>
        </>
      )}
      {projector && (
        <p className="mt-1 text-sm text-mist">{lab.objective}</p>
      )}
    </div>
  );

  if (compact) {
    return (
      <div ref={root} id="main" className="flex h-dvh flex-col overflow-hidden bg-void">
        <div className="relative min-h-0 flex-[1.05]">{scene}</div>
        <div className="z-10 max-h-[48vh] shrink-0 overflow-y-auto border-t border-white/10 bg-basalt">
          <div className="px-4 pt-4">{titleBlock}</div>
          <p className="px-4 pt-2 text-xs text-mist">
            Best on a computer or projector.{" "}
            <button
              type="button"
              className="text-glacier underline"
              onClick={() => void navigator.clipboard?.writeText(labShareUrl())}
            >
              Copy this lab’s link
            </button>
            {" · "}
            <button type="button" className="text-glacier underline" onClick={() => setKeysOpen((v) => !v)}>
              Keys
            </button>
          </p>
          <div className="grid gap-3 p-3 sm:grid-cols-2">
            <StepRail lab={lab} />
            <WhyPanel lab={lab} />
          </div>
          <div className="sticky bottom-0 px-3 pb-3">
            <ControlBar lab={lab} fullscreen={fs} onToggleFullscreen={() => void toggleFs()} />
          </div>
        </div>
        {keysPanel}
      </div>
    );
  }

  return (
    <div ref={root} id="main" className="relative h-dvh overflow-hidden bg-void">
      <div className="absolute inset-0">{scene}</div>

      <div className="pointer-events-none absolute inset-x-0 top-14 z-10 px-4 pt-3 md:px-6">
        <div className="pointer-events-auto">{titleBlock}</div>
      </div>

      {!projector && (
        <>
          <div className="pointer-events-none absolute bottom-24 left-4 top-56 z-10 flex items-start md:left-6">
            <StepRail lab={lab} />
          </div>
          <div className="pointer-events-none absolute bottom-24 right-4 top-56 z-10 flex items-start md:right-6">
            <WhyPanel lab={lab} />
          </div>
        </>
      )}

      {projector && (
        <div className="pointer-events-auto absolute right-4 top-16 z-20 flex gap-2 md:right-6">
          <button
            type="button"
            className="h-11 rounded-full border border-white/10 bg-basalt/80 px-4 text-sm text-chalk"
            onClick={() => setDrawer(drawer === "steps" ? null : "steps")}
          >
            Steps
          </button>
          <button
            type="button"
            className="h-11 rounded-full border border-white/10 bg-basalt/80 px-4 text-sm text-chalk"
            onClick={() => {
              setPanelTab("why");
              setDrawer(drawer === "why" ? null : "why");
            }}
          >
            Why
          </button>
        </div>
      )}

      {projector && drawer === "steps" && (
        <div className="pointer-events-auto absolute bottom-24 left-4 top-24 z-20 md:left-6">
          <StepRail lab={lab} />
        </div>
      )}
      {projector && drawer === "why" && (
        <div className="pointer-events-auto absolute bottom-24 right-4 top-24 z-20 md:right-6">
          <WhyPanel lab={lab} />
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 px-3 md:bottom-4 md:px-6">
        <ControlBar lab={lab} fullscreen={fs} onToggleFullscreen={() => void toggleFs()} />
      </div>

      <button
        type="button"
        onClick={() => setKeysOpen((v) => !v)}
        className="pointer-events-auto absolute bottom-[4.6rem] left-1/2 z-20 hidden h-11 min-w-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/10 bg-basalt/80 px-3 font-mono text-[12px] text-mist hover:text-chalk xl:flex"
        aria-label="Keyboard shortcuts"
      >
        ?
      </button>

      {keysPanel}
    </div>
  );
}
