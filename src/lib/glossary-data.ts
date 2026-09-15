import { LABS } from "./labs/catalog";

export type GlossaryEntry = {
  term: string;
  def: string;
  exam?: string;
  lab: string;
  labTitle: string;
};

const EXTRA: GlossaryEntry[] = [
  {
    term: "Terminator (day–night)",
    def: "The line on Earth between day and night. Seasons labs show it walking with tilt.",
    lab: "seasons",
    labTitle: "Why seasons happen",
  },
  {
    term: "Levee",
    def: "US spelling of levée. A raised bank along a channel, natural or built.",
    exam: "Levée",
    lab: "rivers",
    labTitle: "Rivers from source to mouth",
  },
  {
    term: "Levée",
    def: "UK spelling of levee. A raised bank along a channel, natural or built.",
    exam: "Levee",
    lab: "rivers",
    labTitle: "Rivers from source to mouth",
  },
];

function dedupe(entries: GlossaryEntry[]): GlossaryEntry[] {
  const seen = new Map<string, GlossaryEntry>();
  for (const e of entries) {
    const k = e.term.toLowerCase();
    if (!seen.has(k)) seen.set(k, e);
  }
  return [...seen.values()].sort((a, b) => a.term.localeCompare(b.term));
}

export const GLOSSARY: GlossaryEntry[] = dedupe([
  ...LABS.flatMap((lab) =>
    lab.glossary.map((g) => ({
      term: g.term,
      def: g.def,
      exam: g.exam,
      lab: lab.slug,
      labTitle: lab.title,
    })),
  ),
  ...EXTRA,
]);
