import type { LabMeta } from "@/lib/labs/types";
import { useLabControls } from "@/lib/store/lab-controls";
import { cn } from "@/lib/utils";

export function StepRail({ lab }: { lab: LabMeta }) {
  const step = useLabControls((s) => s.step);
  const setStep = useLabControls((s) => s.setStep);
  const setPanelTab = useLabControls((s) => s.setPanelTab);
  const current = lab.steps[step] ?? lab.steps[0];

  return (
    <aside className="pointer-events-auto flex max-h-[min(58vh,32rem)] w-full flex-col gap-3 overflow-y-auto rounded-[20px] border border-white/10 bg-basalt/75 p-4 backdrop-blur-xl lg:w-[min(100%,18rem)]">
      <p className="section-label">Steps</p>
      <ol className="flex flex-col gap-1">
        {lab.steps.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => {
                setStep(i);
                if (s.id === "check") setPanelTab("check");
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-[10px] px-2 py-2 text-left text-sm",
                i === step ? "bg-white/10 text-chalk" : "text-mist hover:bg-white/6 hover:text-chalk",
              )}
            >
              <span
                className={cn(
                  "inline-flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px]",
                  i === step ? "bg-glacier text-basalt" : "bg-white/8 text-mist",
                )}
              >
                {i + 1}
              </span>
              {s.title}
            </button>
          </li>
        ))}
      </ol>
      <p className="text-[13px] leading-5 text-chalk/90">{current.body}</p>
    </aside>
  );
}
