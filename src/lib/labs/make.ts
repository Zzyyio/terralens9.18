import type { LabMeta, LabQuestion, LabStep } from "./types";

export function steps(observe: string, tinker: string, explain: string): LabStep[] {
  return [
    { id: "observe", title: "Observe", body: observe },
    { id: "tinker", title: "Tinker", body: tinker },
    { id: "explain", title: "Explain", body: explain },
    {
      id: "check",
      title: "Check",
      body: "Three to five questions. Instant feedback. Not a score-gate.",
    },
  ];
}

export function q(
  prompt: string,
  choices: string[],
  answer: number,
  explain: string,
): LabQuestion {
  return { prompt, choices, answer, explain };
}

export function mc(claim: string, truth: string): { claim: string; truth: string } {
  return { claim, truth };
}

export function lab(meta: LabMeta): LabMeta {
  return meta;
}
