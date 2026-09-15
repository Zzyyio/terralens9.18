import type { ReactNode } from "react";
import type { CanvasProps } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { ClientCanvas, useWebGL } from "@/components/globe/client-canvas";
import { usePrefersReducedMotion } from "@/hooks/use-media";
import { useLabControls } from "@/lib/store/lab-controls";
import { GenericFallback } from "./fallback";
import { LabLights, StudioOrbit } from "./kit";
import { useQuality } from "./perf";

export function LabStudio({
  slug,
  title,
  camera,
  children,
  fallback,
  liveText,
  exaggeration,
  minDistance,
  maxDistance,
  target,
  lights = true,
}: {
  slug: string;
  title: string;
  camera?: CanvasProps["camera"];
  children: ReactNode;
  fallback?: ReactNode;
  liveText?: string;
  exaggeration?: string;
  minDistance?: number;
  maxDistance?: number;
  target?: [number, number, number];
  lights?: boolean;
}) {
  const webgl = useWebGL();
  const reduced = usePrefersReducedMotion();
  const playing = useLabControls((s) => s.playing);
  const trueScale = useLabControls((s) => s.trueScale);
  const setTrueScale = useLabControls((s) => s.setTrueScale);
  const inspect = useLabControls((s) => s.inspect);
  const setInspect = useLabControls((s) => s.setInspect);
  const q = useQuality();

  if (!webgl) {
    return (
      fallback ?? <GenericFallback slug={slug} title={title} caption={liveText} />
    );
  }

  return (
    <>
      <ClientCanvas
        camera={camera ?? { position: [0, 1.4, 5.4], fov: 40 }}
        dpr={q.dpr}
        frameloop={reduced && !playing ? "demand" : "always"}
        shadows={q.shadows}
      >
        {lights && <LabLights />}
        {children}
        {lights && q.shadows && (
          <ContactShadows
            opacity={0.42}
            scale={18}
            blur={2.4}
            far={8}
            resolution={512}
            color="#000000"
          />
        )}
        <StudioOrbit minDistance={minDistance} maxDistance={maxDistance} target={target} />
      </ClientCanvas>
      <p className="sr-only" aria-live="polite">
        {liveText ?? title}
      </p>
      {exaggeration && (
        <button
          type="button"
          onClick={() => setTrueScale(!trueScale)}
          className="pointer-events-auto absolute left-1/2 top-[4.6rem] z-10 -translate-x-1/2 rounded-full border border-white/10 bg-basalt/80 px-3 py-1 font-mono text-[10px] text-mist backdrop-blur-md hover:text-chalk"
        >
          {trueScale ? "True scale · click for teaching exaggeration" : exaggeration}
        </button>
      )}
      {inspect && (
        <div className="pointer-events-auto absolute bottom-28 left-1/2 z-10 w-[min(28rem,calc(100%-2rem))] -translate-x-1/2 rounded-2xl border border-white/10 bg-basalt/85 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-glacier">Inspect</p>
              <p className="mt-1 font-medium text-chalk">{inspect.name}</p>
              <p className="mt-1 text-[12px] leading-5 text-mist">{inspect.note}</p>
            </div>
            <button
              type="button"
              className="shrink-0 font-mono text-[11px] text-mist hover:text-chalk"
              onClick={() => setInspect(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
