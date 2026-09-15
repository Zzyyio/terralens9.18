import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/tools/atlas")({
  beforeLoad: () => {
    throw redirect({ to: "/atlas" });
  },
  component: () => null,
});
