import {
  caseFeedbackSchema,
  tutorOutputSchema,
  type CaseFeedback,
  type TutorOutput,
} from "@/lib/validations/schemas";

export const MEDICAL_EDUCATOR_SYSTEM = `You are Online MD Faculty AI — an expert medical educator with the knowledge standard of a board-certified physician-educator experienced in USMLE Step 1 and Step 2 CK teaching.

Role constraints:
- Teach like a top US MD school faculty tutor (Socratic when helpful; direct when safety or clarity requires it).
- Prioritize mechanistic reasoning, differential diagnosis structure, and guideline-aware clinical decision frameworks.
- Use only the provided curriculum context as ground truth for course-specific claims. If the student asks beyond context, say what is known vs uncertain and recommend the relevant lesson/module.
- Never invent drug doses, trial names, or guideline years unless present in context; if estimating, label uncertainty.
- Do not provide personalized medical advice for real patients; this is educational simulation only.
- Prefer precise terminology (e.g., preload vs volume status; V/Q mismatch vs shunt).
- When discussing management, distinguish emergency stabilization from definitive therapy.
- Output MUST be valid JSON matching the schema described by the user message.`;

function offlineTutor(message: string, context: string): TutorOutput {
  return tutorOutputSchema.parse({
    reply: `**Faculty AI (offline expert mode)**\n\nYou asked: “${message.trim()}”\n\nBased on the loaded curriculum context, focus on mechanism → clinical consequence → next learning step.\n\n${context.slice(0, 900)}\n\nWhen AI_ENABLED is on with an API key, answers use a full medical-educator model. Always verify critical clinical decisions with primary sources and faculty.`,
    relatedObjectiveIds: [],
    keyTeachingPoints: [
      "Anchor on mechanism before memorization",
      "Map findings to anatomy/physiology first",
      "Qbank is for assessment after mastery — return to lessons for gaps",
    ],
    disclaimers: [
      "Educational simulation only — not clinical advice for real patients",
      "Offline fallback response (configure AI_API_KEY for live expert model)",
    ],
    uncertaintyNotes: ["Live model unavailable; response is heuristic scaffolding"],
  });
}

function offlineCaseFeedback(responses: Record<string, string>): CaseFeedback {
  const answered = Object.values(responses).filter((v) => v.trim().length > 0);
  return caseFeedbackSchema.parse({
    overallAssessment:
      answered.length === 0
        ? "No substantive responses yet. Structure answers as diagnosis → physiology → management priorities."
        : "Solid attempt at clinical reasoning. Strengthen links between hemodynamics and exam findings, and separate acute stabilization from chronic disease-modifying therapy.",
    strengths: answered.length
      ? ["Attempted a structured written assessment", "Engaged the staged case prompts"]
      : [],
    gaps: [
      "Explicitly name the heart-failure phenotype if relevant",
      "List GDMT pillars with mechanisms, not only diuretics",
    ],
    rubricScores: [
      { criterion: "Problem representation", score: answered.length ? 3 : 1 },
      { criterion: "Pathophysiologic link", score: answered.length ? 3 : 1 },
      { criterion: "Management prioritization", score: answered.length ? 2 : 1 },
    ],
    followUpQuestions: [
      "What physical exam findings track left-sided vs right-sided filling pressures?",
      "Which therapies improve survival in HFrEF versus those that mainly relieve congestion?",
    ],
    safetyFlags: [],
    disclaimers: [
      "Educational feedback only",
      "Offline fallback — enable AI for full expert rubric",
    ],
  });
}

async function callChatJson(system: string, user: string): Promise<string> {
  const apiKey = process.env.AI_API_KEY;
  const baseUrl = process.env.AI_BASE_URL || "https://api.openai.com/v1";
  const model = process.env.AI_MODEL || "gpt-4o";
  if (!apiKey || process.env.AI_ENABLED !== "true") {
    throw new Error("AI_DISABLED");
  }
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });
  if (!res.ok) {
    throw new Error(`AI_HTTP_${res.status}`);
  }
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content ?? "{}";
}

export async function generateTutorReply(opts: {
  message: string;
  curriculumContext: string;
}): Promise<TutorOutput> {
  try {
    const content = await callChatJson(
      MEDICAL_EDUCATOR_SYSTEM,
      `Return JSON with keys: reply, relatedObjectiveIds, suggestedNextBlockId, keyTeachingPoints, disclaimers, uncertaintyNotes.\n\nCurriculum context:\n${opts.curriculumContext}\n\nStudent message:\n${opts.message}`,
    );
    return tutorOutputSchema.parse(JSON.parse(content));
  } catch {
    return offlineTutor(opts.message, opts.curriculumContext);
  }
}

export async function generateCaseFeedback(opts: {
  caseTitle: string;
  presentation: string;
  stages: { prompt: string; expectedFocus: string }[];
  responses: Record<string, string>;
  teachingPoints: string;
}): Promise<CaseFeedback> {
  try {
    const content = await callChatJson(
      MEDICAL_EDUCATOR_SYSTEM,
      `Return JSON with keys: overallAssessment, strengths, gaps, rubricScores[{criterion,score,comment}], followUpQuestions, safetyFlags, disclaimers.\nScore rubric 0-5.\n\nCase: ${opts.caseTitle}\n${opts.presentation}\nTeaching points: ${opts.teachingPoints}\nStages: ${JSON.stringify(opts.stages)}\nStudent responses: ${JSON.stringify(opts.responses)}`,
    );
    return caseFeedbackSchema.parse(JSON.parse(content));
  } catch {
    return offlineCaseFeedback(opts.responses);
  }
}
