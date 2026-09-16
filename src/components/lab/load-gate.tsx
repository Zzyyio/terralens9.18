import { useEffect, useState, type ReactNode } from "react";
import { Play } from "lucide-react";
import { LabThumb } from "@/components/lab-thumb";
import { useLabControls } from "@/lib/store/lab-controls";

export function LabLoadFallback({ slug, title }: { slug: string; title: string }) {
  const [timedOut, setTimedOut] = useState(false);
  const play = useLabControls((s) => s.play);

  useEffect(() => {
    const id = window.setTimeout(() => setTimedOut(true), 2500);
    return () => window.clearTimeout(id);
  }, []);

  if (!timedOut) {
    return (
      <div className="flex h-full min-h-[42vh] items-center justify-center bg-void text-mist">
        Loading lab…
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[42vh] flex-col items-center justify-center bg-void px-6">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10">
        <div className="aspect-[16/10] bg-trench">
          <LabThumb slug={slug} />
        </div>
      </div>
      <p className="mt-4 max-w-sm text-center text-sm text-mist">
        The 3D bench is taking longer than a classroom projector likes. Use the still, or press play to keep
        waiting.
      </p>
      <button
        type="button"
        onClick={() => play()}
        className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-glacier px-5 text-sm font-medium text-basalt"
      >
        <Play className="size-4" /> Play {title}
      </button>
    </div>
  );
}

export function CanvasTimeoutPoster({
  slug,
  title,
  children,
}: {
  slug: string;
  title: string;
  children: ReactNode;
}) {
  const [showPoster, setShowPoster] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setShowPoster(true), 2500);
    return () => window.clearTimeout(id);
  }, []);

  if (showPoster && !dismissed) {
    return (
      <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center bg-void/95 px-6">
        <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10">
          <div className="aspect-[16/10] bg-trench">
            <LabThumb slug={slug} />
          </div>
        </div>
        <p className="mt-4 max-w-sm text-center text-sm text-mist">
          2D fallback · WebGL unavailable or slow. The still is the lesson. Play retries the bench; Check and
          Why still work.
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-glacier px-5 text-sm font-medium text-basalt"
        >
          <Play className="size-4" /> Play {title}
        </button>
        {children}
      </div>
    );
  }

  return <>{children}</>;
}
