import { createFileRoute, Link } from "@tanstack/react-router";
import { LAB_BY_SLUG } from "@/lib/labs/catalog";
import { Button } from "@/components/ui/button";
import { LabCard } from "@/components/lab-card";

export const Route = createFileRoute("/topic/$slug")({ component: TopicPage });

function TopicPage() {
  const { slug } = Route.useParams();
  const lab = LAB_BY_SLUG[slug];
  if (!lab) {
    return (
      <main className="mx-auto max-w-lg px-5 pt-28">
        <h1 className="font-display text-4xl">Topic not shipped.</h1>
        <Button asChild className="mt-6">
          <Link to="/explore">Explore labs</Link>
        </Button>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-[720px] px-5 pb-24 pt-24">
      <p className="section-label">Topic</p>
      <h1 className="mt-3 font-display text-4xl">{lab.title}</h1>
      <p className="mt-5 text-lg text-mist">{lab.hook}</p>
      <div className="mt-10 max-w-md">
        <LabCard lab={lab} />
      </div>
    </main>
  );
}
