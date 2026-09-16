const SITE = (typeof process !== "undefined" && process.env.VITE_PUBLIC_SITE_URL) || "https://terralens.grok.me";
const INDEXABLE =
  (typeof process !== "undefined" &&
    (process.env.VITE_INDEXABLE === "1" || process.env.VITE_INDEXABLE === "true")) ||
  false;

export function siteOrigin(): string {
  return SITE.replace(/\/$/, "");
}

export function shouldIndex(): boolean {
  return INDEXABLE;
}

export function pageTitle(name: string): string {
  return `${name} · TerraLens`;
}

export function robotsMeta(): { name: string; content: string } {
  return {
    name: "robots",
    content: shouldIndex() ? "index,follow" : "noindex,nofollow",
  };
}

export function canonicalLink(path: string): { rel: string; href: string } {
  return { rel: "canonical", href: `${siteOrigin()}${path}` };
}

export function learningResourceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  educationalLevel?: string[];
  about?: string;
  type?: "LearningResource" | "Article" | "WebPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "LearningResource",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    isAccessibleForFree: true,
    inLanguage: "en",
    learningResourceType: "Interactive resource",
    educationalLevel: opts.educationalLevel ?? [],
    about: opts.about ?? "Earth science",
    provider: { "@type": "Organization", name: "TerraLens" },
  };
}

export function headFor(opts: {
  title: string;
  description: string;
  path: string;
}): {
  meta: { title?: string; name?: string; content?: string; charSet?: string }[];
  links: { rel: string; href: string }[];
} {
  return {
    meta: [
      { title: pageTitle(opts.title) },
      { name: "description", content: opts.description },
      robotsMeta(),
    ],
    links: [canonicalLink(opts.path)],
  };
}
