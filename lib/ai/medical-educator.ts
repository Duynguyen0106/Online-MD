import {
  caseFeedbackSchema,
  tutorOutputSchema,
  type CaseFeedback,
  type TutorOutput,
} from "@/lib/validations/schemas";
import {
  TEXTBOOK_DOMAIN_MAP,
  buildTutorCurriculumPreamble,
} from "@/lib/ai/knowledge-domains";

export const MEDICAL_EDUCATOR_SYSTEM = `You are Online MD Faculty AI — a board-certified-level physician-educator who teaches at the standard of top US MD schools (USMLE Step 1 & Step 2 CK).

You have internalized the conceptual depth of major medical teaching corpora (physiology, pathology, pharmacology, microbiology, and clinical medicine) as domain expertise — without reproducing copyrighted textbook prose or proprietary question banks.

${TEXTBOOK_DOMAIN_MAP}

Role constraints:
- Teach like elite faculty: Socratic when helpful; direct when safety or clarity requires it.
- Always prefer mechanism → clinical phenotype → differential → urgent vs elective action.
- Use loaded Online MD lesson context as course ground truth; when students go beyond it, draw on the domain map, label uncertainty, and name the best module/lesson to study next.
- Never invent drug doses, trial names, or guideline years unless present in context; if estimating, label uncertainty explicitly.
- Educational simulation only — not personalized advice for real patients.
- Precise terminology (preload vs volume; V/Q vs shunt; nephritic vs nephrotic; SS vs NMS).
- Separate emergency stabilization from definitive therapy.
- Output MUST be valid JSON matching the schema in the user message.`;

function offlineTutor(message: string, context: string): TutorOutput {
  const excerpt = context.slice(0, 1200);
  return tutorOutputSchema.parse({
    reply: `**Faculty AI (offline expert mode)**\n\nYou asked: “${message.trim()}”\n\nApply the Online MD teaching arc:\n1. Name the core mechanism\n2. Link mechanism → bedside findings\n3. Build a short differential\n4. Separate what is urgent now vs what can wait for workup\n5. Return to the relevant lesson for mastery before Qbank\n\nCurriculum/domain context:\n${excerpt}\n\nEnable AI_ENABLED + AI_API_KEY for full live medical-educator responses. Verify critical decisions with primary sources and faculty.`,
    relatedObjectiveIds: [],
    keyTeachingPoints: [
      "Mechanism before memorization",
      "Urgent stabilization vs definitive therapy",
      "Master lessons before using Qbank as assessment",
    ],
    disclaimers: [
      "Educational simulation only — not clinical advice for real patients",
      "Offline fallback (configure AI_API_KEY for live expert model)",
    ],
    uncertaintyNotes: [
      "Live model unavailable; scaffolding uses curriculum + domain map heuristics",
    ],
  });
}

function offlineCaseFeedback(responses: Record<string, string>): CaseFeedback {
  const answered = Object.values(responses).filter((v) => v.trim().length > 0);
  return caseFeedbackSchema.parse({
    overallAssessment:
      answered.length === 0
        ? "No substantive responses yet. Structure answers as problem representation → pathophysiology → urgent priorities → definitive plan."
        : "Reasonable clinical engagement. Strengthen explicit mechanisms, name the syndrome precisely, and separate ABCs/resuscitation from disease-modifying therapy.",
    strengths: answered.length
      ? ["Attempted structured written assessment", "Engaged staged case prompts"]
      : [],
    gaps: [
      "State a one-sentence problem representation",
      "Link each major finding to a mechanism",
      "List time-critical actions before elective tests",
    ],
    rubricScores: [
      { criterion: "Problem representation", score: answered.length ? 3 : 1 },
      { criterion: "Pathophysiologic link", score: answered.length ? 3 : 1 },
      { criterion: "Management prioritization", score: answered.length ? 2 : 1 },
    ],
    followUpQuestions: [
      "What is the single most dangerous diagnosis you must not miss?",
      "Which findings force action in the next 15 minutes vs the next day?",
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
      temperature: 0.25,
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
  const enriched = buildTutorCurriculumPreamble(opts.curriculumContext);
  try {
    const content = await callChatJson(
      MEDICAL_EDUCATOR_SYSTEM,
      `Return JSON with keys: reply, relatedObjectiveIds, suggestedNextBlockId, keyTeachingPoints, disclaimers, uncertaintyNotes.\n\n${enriched}\n\nStudent message:\n${opts.message}`,
    );
    return tutorOutputSchema.parse(JSON.parse(content));
  } catch {
    return offlineTutor(opts.message, enriched);
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
      `Return JSON with keys: overallAssessment, strengths, gaps, rubricScores[{criterion,score,comment}], followUpQuestions, safetyFlags, disclaimers.\nScore rubric 0-5.\nUse specialty-expert standards for this case type.\n\nCase: ${opts.caseTitle}\n${opts.presentation}\nTeaching points: ${opts.teachingPoints}\nStages: ${JSON.stringify(opts.stages)}\nStudent responses: ${JSON.stringify(opts.responses)}`,
    );
    return caseFeedbackSchema.parse(JSON.parse(content));
  } catch {
    return offlineCaseFeedback(opts.responses);
  }
}
