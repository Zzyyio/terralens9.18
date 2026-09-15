import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HeroEarth } from "@/components/globe/hero-earth";
import { pageTitle } from "@/lib/seo";

export function NotFoundPage() {
  useEffect(() => {
    document.title = pageTitle("Not on the chart");
  }, []);
  return (
    <main id="main" className="relative flex min-h-dvh items-center px-6 pt-14">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <HeroEarth />
      </div>
      <div className="relative z-10 mx-auto max-w-lg py-24">
        <p className="section-label">404</p>
        <h1 className="mt-3 font-display text-4xl text-chalk">This coordinate is empty ocean.</h1>
        <p className="mt-4 text-mist">
          The page is not on the chart. The globe still turns. Pick a lab and start from a coast you know.
        </p>
        <div className="mt-8 flex gap-3">
          <Button asChild>
            <Link to="/explore">Explore labs</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/">Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
