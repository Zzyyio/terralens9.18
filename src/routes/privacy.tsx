import { createFileRoute } from "@tanstack/react-router";
import { headFor } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () =>
    headFor({
      title: "Privacy",
      description: "TerraLens does not run accounts, ads, or student tracking.",
      path: "/privacy",
    }),
});

function Privacy() {
  return (
    <main id="main" className="mx-auto max-w-[720px] px-5 pb-24 pt-24">
      <p className="section-label">Privacy</p>
      <h1 className="mt-3 font-display text-4xl text-chalk md:text-5xl">No account. No tracker.</h1>
      <div className="mt-8 space-y-5 text-[17px] leading-7 text-chalk/90">
        <p>
          TerraLens is a free classroom studio. There is no login, no paywall, no advertising, and no
          sponsorship banner. We do not keep student work, scores, or class lists.
        </p>
        <p>
          Lab state (tilt, date, viscosity, labels) lives in the page URL and in this browser only. Copy the
          link to share a setup. Closing the tab does not send that state to a server.
        </p>
        <p>
          We do not track academic behaviour. There is no analytics SDK that scores a pupil’s clicks.
        </p>
        <p>
          Hosting may set a Cloudflare bot-management cookie (<code className="font-mono text-sm">__cf_bm</code>
          ). That cookie is for abuse control, not classroom surveillance.
        </p>
        <p>
          Maps request tiles from OpenFreeMap / OpenStreetMap and, on the live-weather tool, a forecast from
          Open-Meteo. Those requests carry an IP address to those services. If the tile network fails, the
          atlas falls back to a static Natural Earth coastline we ship with the app.
        </p>
        <p>
          Type is currently loaded from Google Fonts (Fraunces, Geist). A future build may self-host the same
          faces. Until then, a font request leaves this origin.
        </p>
        <p>
          Questions: open an issue on the project repository, or write from your school address. This page is
          the whole privacy notice. There is no hidden product.
        </p>
      </div>
    </main>
  );
}
