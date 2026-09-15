import {
  Pause,
  Play,
  RotateCcw,
  Tags,
  Maximize,
  Minimize,
  Spline,
  Layers2,
  Projector,
  Link2,
  Focus,
} from "lucide-react";
import type { LabMeta } from "@/lib/labs/types";
import { useLabControls } from "@/lib/store/lab-controls";
import { defaultParams } from "@/lib/labs/defaults";
import { labShareUrl } from "@/labs/shared/url-state";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function ControlBar({
  lab,
  fullscreen,
  onToggleFullscreen,
}: {
  lab: LabMeta;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
}) {
  const playing = useLabControls((s) => s.playing);
  const speed = useLabControls((s) => s.speed);
  const t = useLabControls((s) => s.t);
  const labels = useLabControls((s) => s.labels);
  const explode = useLabControls((s) => s.explode);
  const slice = useLabControls((s) => s.slice);
  const params = useLabControls((s) => s.params);
  const layout = useLabControls((s) => s.layout);
  const toggle = useLabControls((s) => s.toggle);
  const setSpeed = useLabControls((s) => s.setSpeed);
  const setT = useLabControls((s) => s.setT);
  const setLabels = useLabControls((s) => s.setLabels);
  const setExplode = useLabControls((s) => s.setExplode);
  const setSlice = useLabControls((s) => s.setSlice);
  const setParam = useLabControls((s) => s.setParam);
  const reset = useLabControls((s) => s.reset);
  const resetView = useLabControls((s) => s.resetView);
  const setLayout = useLabControls((s) => s.setLayout);
  const trueScale = useLabControls((s) => s.trueScale);
  const setTrueScale = useLabControls((s) => s.setTrueScale);
  const [copied, setCopied] = useState(false);

  const timeLabel =
    lab.controls.time === "year"
      ? "Year"
      : lab.controls.time === "day"
        ? "Day"
        : lab.controls.time === "month"
          ? "Month"
          : lab.controls.time === "none"
            ? null
            : "Process";

  return (
    <div className="pointer-events-auto mx-auto flex w-full max-w-[1100px] flex-col gap-2 rounded-[20px] border border-white/10 bg-basalt/80 px-3 py-2.5 backdrop-blur-xl md:flex-row md:flex-wrap md:items-center md:gap-3">
      <div className="flex items-center gap-1.5">
        <IconBtn label={playing ? "Pause" : "Play"} onClick={toggle}>
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </IconBtn>
        {lab.controls.time !== "none" && (
          <div className="flex rounded-[10px] bg-white/6 p-0.5">
            {[1, 2, 4].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={cn(
                  "inline-flex h-11 min-w-11 items-center justify-center rounded-[8px] px-2 font-mono text-[11px]",
                  speed === s ? "bg-glacier text-basalt" : "text-mist hover:text-chalk",
                )}
              >
                {s}×
              </button>
            ))}
          </div>
        )}
        <IconBtn label="Reset lab" onClick={() => reset(defaultParams(lab))}>
          <RotateCcw className="size-4" />
        </IconBtn>
        <IconBtn label="Reset view" onClick={resetView}>
          <Focus className="size-4" />
        </IconBtn>
      </div>

      {timeLabel && (
        <label className="flex min-w-0 flex-1 items-center gap-3">
          <span className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-mist sm:inline">
            {timeLabel}
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.001}
            value={t}
            onChange={(e) => setT(Number(e.target.value))}
            className="h-2 w-full accent-glacier"
            aria-label={timeLabel}
            suppressHydrationWarning
          />
          <span className="w-10 shrink-0 font-mono text-[11px] tabular-nums text-chalk">
            {t.toFixed(2)}
          </span>
        </label>
      )}

      {lab.controls.extra?.map((ex) => (
        <label key={ex.key} className="flex min-w-[9rem] items-center gap-2">
          <span className="whitespace-nowrap font-mono text-[11px] text-mist">{ex.label}</span>
          <input
            type="range"
            min={ex.min}
            max={ex.max}
            step={ex.step}
            value={params[ex.key] ?? ex.default ?? ex.min}
            onChange={(e) => setParam(ex.key, Number(e.target.value))}
            className="h-2 w-24 accent-sandstone"
            aria-label={ex.label}
            suppressHydrationWarning
          />
          <span className="w-12 shrink-0 font-mono text-[11px] tabular-nums text-chalk">
            {Number(params[ex.key] ?? ex.default ?? ex.min).toFixed(ex.step < 1 ? 1 : 0)}
            {ex.unit ?? ""}
          </span>
        </label>
      ))}

      {lab.controls.toggles?.map((tg) => {
        const on = (params[tg.key] ?? (tg.defaultOn ? 1 : 0)) > 0.5;
        return (
          <button
            key={tg.key}
            type="button"
            onClick={() => setParam(tg.key, on ? 0 : 1)}
            className={cn(
              "inline-flex h-11 shrink-0 items-center rounded-full border px-3 font-mono text-[11px]",
              on
                ? "border-glacier/40 bg-glacier/15 text-glacier"
                : "border-white/10 text-mist hover:text-chalk",
            )}
          >
            {tg.label}
          </button>
        );
      })}

      <div className="flex items-center gap-1">
        {lab.controls.explode && (
          <label className="flex items-center gap-1.5 pr-2">
            <Layers2 className="size-3.5 text-mist" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={explode}
              onChange={(e) => setExplode(Number(e.target.value))}
              className="h-2 w-16 accent-magma"
              aria-label="Explode layers"
              suppressHydrationWarning
            />
          </label>
        )}
        {lab.controls.slice && (
          <label className="flex items-center gap-1.5 pr-2">
            <Spline className="size-3.5 text-mist" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={slice}
              onChange={(e) => setSlice(Number(e.target.value))}
              className="h-2 w-16 accent-ice"
              aria-label="Cross-section"
              suppressHydrationWarning
            />
          </label>
        )}
        <IconBtn label="Toggle labels" onClick={() => setLabels(!labels)} active={labels}>
          <Tags className="size-4" />
        </IconBtn>
        <IconBtn
          label={trueScale ? "Teaching exaggeration" : "True scale"}
          onClick={() => setTrueScale(!trueScale)}
          active={trueScale}
        >
          <span className="font-mono text-[10px]">{trueScale ? "1:1" : "×"}</span>
        </IconBtn>
        <IconBtn
          label={layout === "projector" ? "Classroom HUD" : "Projector layout"}
          onClick={() => setLayout(layout === "projector" ? "hud" : "projector")}
          active={layout === "projector"}
        >
          <Projector className="size-4" />
        </IconBtn>
        <IconBtn
          label={copied ? "Link copied" : "Copy share link"}
          onClick={() => {
            const url = labShareUrl();
            void navigator.clipboard?.writeText(url).then(() => {
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1600);
            });
          }}
          active={copied}
        >
          <Link2 className="size-4" />
        </IconBtn>
        <IconBtn label={fullscreen ? "Exit fullscreen" : "Fullscreen"} onClick={onToggleFullscreen}>
          {fullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
        </IconBtn>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  label,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-[10px] text-chalk hover:bg-white/10",
        active && "bg-glacier/20 text-glacier",
      )}
    >
      {children}
    </button>
  );
}
