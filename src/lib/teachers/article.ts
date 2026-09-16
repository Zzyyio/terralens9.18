import type { LabMeta } from "@/lib/labs/types";
import { defaultParams } from "@/lib/labs/defaults";
import { labFigures } from "@/lib/figures";
import { labVideo } from "@/lib/lab-videos";

export type ArticleSection = { heading: string; paragraphs: string[] };

export function teacherArticle(lab: LabMeta): {
  title: string;
  kicker: string;
  sections: ArticleSection[];
  wordCount: number;
} {
  const extras = (lab.controls.extra ?? []).map((e) => `${e.label}${e.unit ? ` (${e.unit})` : ""}`);
  const toggles = (lab.controls.toggles ?? []).map((t) => t.label);
  const figs = labFigures(lab.slug);
  const video = labVideo(lab.slug);
  const myths = lab.misconceptions?.length ? lab.misconceptions : [lab.misconception];
  const cases = lab.cases.length
    ? lab.cases
    : [
        { slug: lab.slug, label: "the field example named in Why" },
        { slug: "compare", label: "the comparison case in the same Why panel" },
      ];
  const params = Object.keys(defaultParams(lab));
  const sliderLine =
    extras.length || toggles.length
      ? `The sliders that earn their keep are ${[...extras, ...toggles].slice(0, 8).join("; ")}.`
      : "Time, labels, and T (true scale) are the whole desk. Play walks the process; T removes the vertical lie where one was drawn.";

  const explode = lab.controls.explode
    ? " E explodes the cut so inner surfaces can be named from the back of the room."
    : "";
  const slice = lab.controls.slice ? " X slices the volume so a hidden plane can be seen." : "";
  const glossaryWalk = lab.glossary
    .slice(0, 8)
    .map((g) => `${g.term}: ${g.def}${g.exam ? ` Exam language also accepts “${g.exam}”.` : ""}`)
    .join(" ");

  const sections: ArticleSection[] = [
    {
      heading: "Why this lesson, and why the 3D",
      paragraphs: [
        `${lab.title} is a fifteen-minute projector lesson, not a homework packet and not a film with a quiz bolted on. Put this hook on the board before you dim the lights: ${lab.hook} By the end of the slot a pupil should be able to ${lab.objective.charAt(0).toLowerCase()}${lab.objective.slice(1)} Curriculum tags in the header (${lab.curriculum.join("; ")}) are filters, not a flag. The room is worldwide; SI first; International English. Ages on the card (${lab.ages.join(", ")}) are a suggested band, not a gate.`,
        lab.why[0] ?? lab.hook,
        `The 3D is a named, inspectable object. Click the part, not a caption. If the model will not spin, the Why panel still carries the mechanism, the two photographs, and the film. Do not apologise for the model. Drive it. A silent spin teaches a screensaver. A named mesh that changes under a slider teaches the process.`,
      ],
    },
    {
      heading: "Fifteen minutes on the projector",
      paragraphs: [
        lab.teacher.script,
        `Open the lab full screen (F). Labels on (L). Speak the first step before you touch a slider: ${lab.steps[0]?.body ?? lab.hook} Then the second: ${lab.steps[1]?.body ?? "Drive one control and freeze."} Then the third: ${lab.steps[2]?.body ?? "Name the part that moved."}`,
        `${sliderLine}${explode}${slice} Space plays; arrows nudge time; R resets. Parameters the URL can remember: ${params.slice(0, 8).join(", ") || "t, labels, true scale"}. If you only have eight minutes, skip the last step and finish in Check. Projector layout (P) is for the back row: one idea, large type, the model still live.`,
        lab.why[2] ??
          "Talk while the geometry moves. Freeze when a pupil names the part. If nobody can name it, the label is too small or the camera is too polite — zoom in.",
        video
          ? `The in-site film is “${video.title}” (${video.source}, about ${video.minutes} min, ${video.license}). Autoplay is off. Play one minute if you need a second voice; do not let the film eat the slot. The 3D still has to move under your hand.`
          : "There is an in-site film on the Why panel. Use it as a second voice, not as the lesson.",
      ],
    },
    {
      heading: "What the third row will get wrong",
      paragraphs: [
        `You will hear the misconception before you have finished the first sentence. Write the false claim on the board and leave it there until the model has contradicted it. Do not skip this. A fluent pupil can recite the hook and still believe the false sentence.`,
        ...myths.map((m) => `“${m.claim}” — no. ${m.truth}`),
        `Pitfalls to keep in your pocket: ${lab.teacher.pitfalls.join(" ")} Do not let a pupil leave thinking the 3D is a photograph. It is a teaching model. Where vertical exaggeration exists, T collapses it and the caption says so. A labelled lie of scale is honest. An unlabelled one is a cartoon.`,
      ],
    },
    {
      heading: "Two places, not a slogan",
      paragraphs: [
        lab.why[1] ?? lab.why[0] ?? lab.hook,
        `The first place to land is ${cases[0]?.label ?? "the field example in Why"}. The second is ${cases[1]?.label ?? "the comparison case"}. Same process, different rock or climate. If a pupil can only name one place, they have a postcard, not a mechanism. Atlas entries for those names are a click from the case list; send them back to the lab with one sentence they can say in Check.`,
        `Do not flatten the comparison into “this country versus that country.” Name the landform. Holderness is till, not chalk. Hawaii is a hotspot, not an island arc. Yosemite is a glacial trough, not a river canyon. The 3D is allowed to be schematic; the place names are not allowed to be sloppy.`,
      ],
    },
    {
      heading: "Figures and the film",
      paragraphs: [
        figs[0]
          ? `Field photograph: ${figs[0].alt} ${figs[0].caption} Credit: ${figs[0].credit}.`
          : "Use the Why panel photograph. Do not paste a random Earth disc on a soils lesson.",
        figs[1]
          ? `Mechanism photograph: ${figs[1].alt} ${figs[1].caption} Credit: ${figs[1].credit}.`
          : "The second figure is the mechanism. If it is a schematic, the caption must say so.",
        `Two photographs, two jobs. The field picture is the place. The mechanism picture is the process. Do not run the lesson on a single Apollo Earth disc. A carbon-cycle class is a forest and a seam, not a blue marble. An ENSO class is a Pacific temperature map, not Africa from Apollo 17.`,
      ],
    },
    {
      heading: "Words they must be able to say",
      paragraphs: [
        `Say these out loud once while you click the matching mesh. If a word has no mesh, it still has a photograph in Terms.`,
        glossaryWalk || lab.hook,
        `Exam-language toggle (the Teacher tab) swaps UK/US pairs where they exist — levée/levee, arête/arete — so a mixed room is not punished for spelling.`,
      ],
    },
    {
      heading: "Close the slot",
      paragraphs: [
        lab.why[3] ??
          "Without the 3D, the same sentences must still be true. If they are not, the model was decoration.",
        `Finish in Check — ten questions, not a mood. The bank mixes definition, process, the misconception you just killed, a named place, and a read-the-model item (click the part; T). If a pupil can only recite the hook, they have not used the geometry. Wrong answers still show the one-line explain. Do not skip the explain.`,
        `Sources on the Teacher tab are the trail, not a bibliography to copy. ${lab.sources.map((s) => s.label).join("; ")}.`,
        `Link back to the live lab and keep the same slug. Do not invent a parallel worksheet that contradicts T, SI, or the named parts.`,
        `This note is worldwide. Curriculum tags (${lab.curriculum.join("; ")}) are filters, not a flag. A class in Nairobi, London, or Shanghai can use the same 3D. Ages (${lab.ages.join(", ")}) are a suggested band. If a sentence only works in one exam board, rewrite it before you project it.`,
        `Write these three lines on the board before you dim the lights. One: ${lab.hook} Two: the misconception “${lab.misconception.claim}”. Three: the named parts they must click. Then drive the model. Check is ten questions covering definition, process, the misconception, a place, and a read-the-model item. Do not skip the explain on a wrong answer.`,
      ],
    },
    {
      heading: "Board, units, and what not to say",
      paragraphs: [
        `SI first. Metres, kilometres, degrees Celsius, metres per second. A conversion in brackets is courtesy, not a second system. Do not let a pupil leave thinking the 3D is a photograph. It is a teaching model. Where vertical exaggeration exists, T collapses it and the caption says so.`,
        `Do not say “teaching mesh”, “sprinkle”, or “thin free surface not a fat pipe” out loud. Say the landform. Seasons are ~23.44° of axial tilt, not Earth–Sun distance. The outer core is liquid; S-waves do not pass. Yosemite is a glacial U-trough. San Andreas is a transform. Hawaiʻi and Yellowstone are hotspots. Florida is not a glacial trough.`,
        `If the room is noisy, projector layout (P) is the back-row setting: one idea, large type, the model still live. Full screen (F). Labels (L). Space plays. Arrows nudge time. R resets. The URL can remember ${params.slice(0, 6).join(", ") || "t, labels, true scale"}. Send them home with the same link; there is no login.`,
        lab.why[0] ?? lab.hook,
      ],
    },
  ];

  const text = sections.flatMap((s) => s.paragraphs).join(" ");
  const wordCount = text.trim().split(/\s+/).length;
  return {
    title: lab.title,
    kicker: `${lab.curriculum[0] ?? lab.realm} · 15 minutes · no login`,
    sections,
    wordCount,
  };
}
