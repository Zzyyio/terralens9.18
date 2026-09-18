import type { FigureProps } from "@/components/figure";
import type { RealmSlug } from "@/lib/labs/types";
import {
  GLOSSARY_PHOTO,
  LAB_COVER,
  REALM_COVER,
  TEACHER_HERO,
  TERM_THUMB,
} from "@/lib/photo-assign";

type Fig = Pick<FigureProps, "src" | "alt" | "caption" | "credit">;

function slot(s: { src: string; alt: string; caption: string; credit: string } | undefined): Fig | undefined {
  if (!s) return undefined;
  return { src: s.src, alt: s.alt, caption: s.caption, credit: s.credit };
}

function fold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export const LAB_FIGURE: Record<string, Fig> = Object.fromEntries(
  Object.entries(LAB_COVER)
    .map(([k, v]) => [k, slot(v)])
    .filter((e): e is [string, Fig] => Boolean(e[1])),
);

const FALLBACK_REALM: Fig = {
  src: "/photos/covers/landform-types.jpg",
  alt: "A collision range: process written as relief.",
  caption: "A sphere with a tilt — realm fallback, not the Apollo 17 still.",
  credit: "NASA, public domain",
};

export const REALM_FIGURE: Record<RealmSlug, Fig> = {
  planet: slot(REALM_COVER.planet) ?? FALLBACK_REALM,
  interior: slot(REALM_COVER.interior) ?? FALLBACK_REALM,
  atmosphere: slot(REALM_COVER.atmosphere) ?? FALLBACK_REALM,
  water: slot(REALM_COVER.water) ?? FALLBACK_REALM,
  landforms: slot(REALM_COVER.landforms) ?? FALLBACK_REALM,
  soils: slot(REALM_COVER.soils) ?? FALLBACK_REALM,
  hazards: slot(REALM_COVER.hazards) ?? FALLBACK_REALM,
  skills: slot(REALM_COVER.skills) ?? FALLBACK_REALM,
};

export function labFigure(slug: string): Fig | undefined {
  return LAB_FIGURE[slug];
}

export function labFigures(slug: string): Fig[] {
  const a = LAB_COVER[slug];
  const b = TEACHER_HERO[slug];
  const out: Fig[] = [];
  const fa = slot(a);
  const fb = slot(b);
  if (fa) out.push(fa);
  if (fb && fb.src !== fa?.src) out.push(fb);
  return out;
}

export function teacherHero(slug: string): Fig | undefined {
  return slot(TEACHER_HERO[slug]);
}

export function termFigure(term: string): Fig | undefined {
  const direct = GLOSSARY_PHOTO[term];
  if (direct) return slot(direct);
  const want = fold(term);
  const hit = Object.keys(GLOSSARY_PHOTO).find((k) => fold(k) === want);
  return hit ? slot(GLOSSARY_PHOTO[hit]) : undefined;
}

function termKey(lab: string, term: string): string {
  const slug = fold(term).replace(/\s+/g, "-");
  return `${lab}--${slug}`;
}

/** Lab TERMS thumbnail. Must not share a content-hash with that lab's cover, teacher hero, or glossary main. */
export function termThumb(lab: string, term: string): Fig | undefined {
  const thumbs = TERM_THUMB ?? {};
  const direct = thumbs[termKey(lab, term)];
  if (direct) return slot(direct);
  const want = termKey(lab, term);
  const hit = Object.keys(thumbs).find((k) => fold(k) === fold(want));
  if (hit) return slot(thumbs[hit]);
  return termFigure(term);
}
