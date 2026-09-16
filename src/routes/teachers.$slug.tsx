import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { LAB_BY_SLUG, LABS } from "@/lib/labs/catalog";
import { LAB_SCENES } from "@/labs/registry";
import { isListed } from "@/lib/labs/status";
import { teacherArticle } from "@/lib/teachers/article";
import { Figure } from "@/components/figure";
import { labFigures } from "@/lib/figures";
import { labVideo } from "@/lib/lab-videos";
import { headFor } from "@/lib/seo";
import { useState } from "react";

export const Route = createFileRoute("/teachers/$slug")({
  beforeLoad: ({ params }) => {
    const lab = LAB_BY_SLUG[params.slug];
    if (!lab || !LAB_SCENES[params.slug] || !isListed(params.slug)) throw notFound();
  },
  component: TeacherArticlePage,
  head: ({ params }) => {
    const lab = LAB_BY_SLUG[params.slug];
    return headFor({
      title: lab ? `Teacher notes · ${lab.title}` : "Teacher notes",
      description: lab
        ? `Fifteen-minute projector script for ${lab.title}. No login.`
        : "Teacher notes.",
      path: `/teachers/${params.slug}`,
    });
  },
});

function TeacherArticlePage() {
  const { slug } = Route.useParams();
  const lab = LAB_BY_SLUG[slug];
  if (!lab || !LAB_SCENES[slug] || !isListed(slug)) throw notFound();
  const article = teacherArticle(lab);
  const figs = labFigures(lab.slug);
  const video = labVideo(lab.slug);
  const more = LABS.filter((l) => l.realm === lab.realm && l.slug !== lab.slug && isListed(l.slug)).slice(0, 4);
  const [copied, setCopied] = useState(false);

  function copyScript() {
    const text = [
      article.title,
      article.kicker,
      ...article.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
    ].join("\n\n");
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <main id="main" className="mx-auto max-w-[760px] px-5 pb-24 pt-24">
      <p className="section-label">Teachers</p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-glacier">{article.kicker}</p>
      <h1 className="mt-3 font-display text-4xl text-chalk md:text-5xl">{article.title}</h1>
      <p className="mt-4 text-sm text-mist">
        <Link to="/teachers" className="text-ice hover:underline">
          All teacher notes
        </Link>
        {" · "}
        <Link to="/lab/$slug" params={{ slug: lab.slug }} className="text-ice hover:underline">
          Open the lab
        </Link>
        {" · "}
        {article.wordCount} words
        {" · "}
        <button type="button" onClick={copyScript} className="text-ice hover:underline">
          {copied ? "Copied" : "Copy script"}
        </button>
      </p>

      {figs[0] && <Figure {...figs[0]} className="mt-8" />}

      {article.sections.map((s) => (
        <section key={s.heading} className="mt-10">
          <h2 className="font-display text-2xl text-chalk">{s.heading}</h2>
          {s.heading.startsWith("Figures") && figs[1] && <Figure {...figs[1]} className="mt-4" />}
          {s.paragraphs.map((p) => (
            <p key={p.slice(0, 72)} className="mt-4 text-[17px] leading-8 text-chalk/90">
              {p}
            </p>
          ))}
        </section>
      ))}

      {video && (
        <section className="mt-10">
          <h2 className="font-display text-2xl text-chalk">In-site film</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title={video.title}
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
              className="aspect-video w-full"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <p className="mt-2 text-sm text-mist">
            {video.title}. {video.source}. {video.license} Autoplay off.
          </p>
        </section>
      )}

      {more.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl text-chalk">Same realm</h2>
          <ul className="mt-3 space-y-2">
            {more.map((l) => (
              <li key={l.slug}>
                <Link to="/teachers/$slug" params={{ slug: l.slug }} className="text-ice hover:underline">
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
