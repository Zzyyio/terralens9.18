import { createFileRoute, notFound } from "@tanstack/react-router";
import { NotFoundPage } from "@/components/not-found";
import { pageTitle, robotsMeta } from "@/lib/seo";

export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
  component: NotFoundPage,
  head: () => ({
    meta: [
      { title: pageTitle("Not on the chart") },
      { name: "description", content: "This coordinate is empty ocean. The page is not on the chart." },
      robotsMeta(),
    ],
  }),
});
