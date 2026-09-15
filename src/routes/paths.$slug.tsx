import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/paths/$slug")({
  beforeLoad: () => {
    throw redirect({ to: "/explore" });
  },
  component: () => null,
});
