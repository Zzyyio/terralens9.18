import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/tools/weather")({
  beforeLoad: () => {
    throw redirect({ to: "/tools/live-weather" });
  },
  component: () => null,
});
