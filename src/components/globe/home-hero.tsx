import { lazy, Suspense } from "react";

const HeroEarth = lazy(() => import("./hero-earth").then((m) => ({ default: m.HeroEarth })));

function MarblePoster({ note }: { note?: string }) {
  return (
    <div className="absolute inset-0 bg-void">
      <img
        src="/textures/earth-day.jpg"
        alt="Earth from space: the sunlit Blue Marble, Africa and Arabia under scattered cloud."
        className="size-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-void via-void/70 to-transparent" />
      {note ? (
        <p className="absolute bottom-6 left-5 z-10 max-w-xs rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-mist backdrop-blur-xl">
          {note}
        </p>
      ) : null}
    </div>
  );
}

/** Homepage globe: 3D on load. Static Blue Marble only if WebGL is missing — not a 2D globe widget. */
export function HomeHero() {
  return (
    <Suspense fallback={<MarblePoster />}>
      <HeroEarth />
    </Suspense>
  );
}
