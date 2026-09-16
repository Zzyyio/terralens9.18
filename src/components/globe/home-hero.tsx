import { lazy, Suspense, useState } from "react";

const HeroEarth = lazy(() => import("./hero-earth").then((m) => ({ default: m.HeroEarth })));

function Poster({ onPlay }: { onPlay?: () => void }) {
  return (
    <div className="absolute inset-0 bg-void">
      <img
        src="/textures/earth-day.jpg"
        alt="Earth from space: the sunlit Blue Marble, Africa and Arabia under scattered cloud."
        className="size-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-void via-void/70 to-transparent" />
      {onPlay && (
        <button
          type="button"
          onClick={onPlay}
          className="absolute bottom-6 left-5 z-20 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-chalk backdrop-blur-xl md:bottom-8 md:left-auto md:right-8"
        >
          Play 3D globe
        </button>
      )}
    </div>
  );
}

/** Marketing globe: poster first so the homepage does not download the 3D stack. Same Blue Marble once 3D is on. */
export function HomeHero() {
  const [want, setWant] = useState(false);
  if (!want) return <Poster onPlay={() => setWant(true)} />;
  return (
    <Suspense fallback={<Poster />}>
      <HeroEarth force3d />
    </Suspense>
  );
}
