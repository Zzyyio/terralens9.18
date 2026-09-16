import type { LabMeta, LabQuestion } from "./types";

const POOL = [
  "A painted line with no thickness",
  "A hurricane eyewall on a UK winter chart",
  "A volcanic arc sitting on a transform",
  "A magma ocean under every continent",
  "Day length changing because Earth is closer in July",
  "A river canyon cut by ice",
  "Florida as a glacial trough",
  "San Andreas as a subduction trench",
  "Hawaii as an island arc",
  "S-waves racing through the outer core",
  "A spit that grows by freeze–thaw",
  "A stack that is a sand dune",
  "A cold front as a sticker of cloud, not a wedge",
  "Soil as coloured boxes with no thickness",
  "A tsunami as a pile of wind-driven water",
  "Mercator as an equal-area map",
  "The Moon’s dark side never receiving sunlight",
  "Groynes that fix the whole sediment budget",
  "Crust thicker than the mantle in true scale",
  "Yosemite as a V-valley of a young river",
];

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function distractors(seed: string, avoid: string, n = 3): string[] {
  const out: string[] = [];
  let i = hash(seed);
  let guard = 0;
  while (out.length < n && guard < 80) {
    const d = POOL[i % POOL.length]!;
    if (d !== avoid && !out.includes(d) && !avoid.toLowerCase().includes(d.slice(0, 12).toLowerCase())) {
      out.push(d);
    }
    i = (i * 1103515245 + 12345) >>> 0;
    guard++;
  }
  while (out.length < n) out.push(`Not this process — see the model.`);
  return out;
}

function q(prompt: string, right: string, seed: string, explain: string): LabQuestion {
  const wrong = distractors(seed, right);
  const choices = [right, ...wrong];
  const rot = hash(seed + "r") % 4;
  const rotated = [...choices.slice(rot), ...choices.slice(0, rot)];
  return { prompt, choices: rotated, answer: rotated.indexOf(right), explain };
}

/** Always 10 unique Check items: definition, process, misconception, place, model-read, T, figure, steps, SI, hook. */
export function tenQuestions(lab: LabMeta): LabQuestion[] {
  const out: LabQuestion[] = [];
  const seen = new Set<string>();
  const add = (item: LabQuestion) => {
    if (out.length >= 10) return;
    const key = item.prompt.trim().toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push(item);
  };

  for (const item of lab.questions) add(item);

  const g0 = lab.glossary[0];
  if (g0) {
    add(q(`What is ${g0.term}?`, g0.def, lab.slug + "def-" + g0.term, g0.def));
  }

  add(
    q(
      `A pupil says: “${lab.misconception.claim}” Which is true?`,
      lab.misconception.truth,
      lab.slug + "myth",
      lab.misconception.truth,
    ),
  );

  const extraMyth = lab.misconceptions?.[1];
  if (extraMyth) {
    add(
      q(
        `Another common mix-up: “${extraMyth.claim}” The correction is…`,
        extraMyth.truth,
        lab.slug + "myth2",
        extraMyth.truth,
      ),
    );
  }

  const place = lab.cases[0];
  if (place) {
    add(
      q(
        `Why does ${place.label} belong with ${lab.title}?`,
        `It is a real instance of the process this model teaches.`,
        lab.slug + "place-" + place.slug,
        `${place.label} is listed so the 3D is not an orphan diagram.`,
      ),
    );
  }

  const place2 = lab.cases[1];
  if (place2) {
    add(
      q(
        `${place2.label} is the comparison case. What is it for?`,
        "Same process, different rock or climate — not a second slogan",
        lab.slug + "place2-" + place2.slug,
        "If a pupil can only name one place they have a postcard, not a mechanism.",
      ),
    );
  }

  add(
    q(
      "On the 3D model, T (true scale) is for…",
      "Collapsing labelled teaching exaggeration so thickness is honest",
      lab.slug + "T",
      "T does not invent new landforms. It removes the vertical lie where one was drawn.",
    ),
  );

  add(
    q(
      "Clicking a named part on the model should…",
      "Open an inspect note for that mesh, not only a HUD label",
      lab.slug + "click",
      "The part is the object. Labels are a courtesy.",
    ),
  );

  if (lab.steps[0]) {
    add(
      q(
        `First move on this model: ${lab.steps[0].title}. What are you looking for?`,
        lab.steps[0].body.split(". ")[0] ?? lab.steps[0].body,
        lab.slug + "step0",
        lab.steps[0].body,
      ),
    );
  }

  if (lab.why[1]) {
    const sentence = lab.why[1].split(". ")[0] ?? lab.hook;
    add(
      q(
        "Which sentence is the mechanism, not a slogan?",
        sentence.replace(/\.$/, ""),
        lab.slug + "mech",
        lab.why[1].slice(0, 240),
      ),
    );
  }

  add(
    q(
      `SI and units on ${lab.title}…`,
      "SI first; imperial only as a labelled conversion",
      lab.slug + "si",
      "Classroom numbers are SI. A conversion in brackets is courtesy, not a second system.",
    ),
  );

  add(
    q(
      lab.hook.endsWith(".") ? lab.hook.replace(/\.$/, "?") : `${lab.hook}?`,
      lab.objective,
      lab.slug + "obj",
      `By the end: ${lab.objective}`,
    ),
  );

  const g1 = lab.glossary[1];
  if (g1) {
    add(q(`What is ${g1.term}?`, g1.def, lab.slug + "def2-" + g1.term, g1.def));
  }

  const extra = lab.controls.extra?.[0];
  if (extra) {
    add(
      q(
        `The slider “${extra.label}” is on the desk because…`,
        "It drives a named part of the process, not a decoration",
        lab.slug + "slider-" + extra.key,
        `Drive ${extra.label}. Watch the mesh, not the caption.`,
      ),
    );
  }

  return out.slice(0, 10);
}
