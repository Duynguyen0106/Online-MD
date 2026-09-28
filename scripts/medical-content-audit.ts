/**
 * Inspect-only medical content audit of the live curriculum graph.
 * Run: npx tsx scripts/medical-content-audit.ts
 * Writes JSON inventory under docs/audit/ (does not modify curriculum).
 */
import { promises as fs } from "fs";
import path from "path";
import {
  getClinicalCases,
  getFlashcards,
  getObjectives,
  getProgram,
  getQbankQuestions,
  getQuestionMap,
} from "../lib/curriculum/accessors";
import type { Lesson, Module, Phase, QuizQuestion } from "../lib/types/domain";

const OUT_DIR = path.join(process.cwd(), "docs", "audit");

const VAGUE_OBJ =
  /\b(understand|know|learn|become familiar|appreciate|be aware)\b/i;
const WHICH_TRUE = /which of the following is (true|correct|false)/i;
const COMPRESSED =
  /\b(hyperk|fluid first|modes|scvo2 concepts|mona-bash)\b/i;
const GUIDELINE_SENSITIVE =
  /\b(antibiotic|anticoagul|antiplatelet|acs|stemi|nstemi|stroke|tpa|thromboly|sepsis|vasopressor|insulin|dka|hhs|mechanical vent|ards|pregnan|pediatric|dialysis|rrt|chemotherap|immunosuppress|contraindicat|resuscitat|defibrillat|epinephrine|norepinephrine|heparin|warfarin|doac|pci|cabg|guidelines?|hour-?1|perc|wells)\b/i;

type LessonRow = {
  lessonId: string;
  title: string;
  slug: string;
  moduleId: string;
  moduleTitle: string;
  phaseId: string;
  phaseName: string;
  phaseKind: string;
  sequence: number;
  estimatedMinutes: number;
  conceptCount: number;
  blockCount: number;
  readingChars: number;
  quizCount: number;
  objectiveCount: number;
  flashcardCount: number;
  hasVignette: number;
  titleCompressed: boolean;
  inferredLevel: string;
};

function inferLearnerLevel(
  phase: Phase,
  mod: Module,
  lesson: Lesson,
): string {
  const title = `${lesson.title} ${mod.title}`.toLowerCase();
  if (
    /advanced|consult|icu|sub-?i|complex|fellowship|critical care/i.test(
      title,
    ) ||
    phase.phaseKind === "advanced"
  ) {
    return "ADVANCED_CLINICAL";
  }
  if (phase.phaseKind === "clerkship_core" || mod.isCoreClerkship) {
    if (/usmle|step\s*2|board/i.test(title)) return "STEP_2";
    return "CLERKSHIP";
  }
  if (/step\s*1|usmle/i.test(title)) return "STEP_1";
  // Year 1–2 organ systems → preclinical / step1 emphasis
  if (/cardiovascular|respiratory|renal|gastro|endocrine|hematolog|neuro|musculoskeletal|immun|micro|pharm|biochem|anatomy|cell/i.test(
    mod.title,
  )) {
    return /pathophys|clinical|disease|syndrome|failure|acs|shock/i.test(
      lesson.title,
    )
      ? "STEP_1"
      : "PRECLINICAL";
  }
  return "PRECLINICAL";
}

function normalizeTitle(t: string) {
  return t
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenSet(t: string) {
  return new Set(
    normalizeTitle(t)
      .split(" ")
      .filter((w) => w.length > 3),
  );
}

function jaccard(a: Set<string>, b: Set<string>) {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter += 1;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

function explainIssues(q: QuizQuestion) {
  const issues: string[] = [];
  if (!q.objectiveId) issues.push("Missing objective");
  if (!q.explanation || q.explanation.trim().length < 40)
    issues.push("Weak/short explanation");
  if (WHICH_TRUE.test(q.stem)) issues.push("Which-of-following-is-true stem");
  if (!/why|because|correct|incorrect|distractor/i.test(q.explanation || "")) {
    if ((q.explanation || "").length < 120)
      issues.push("Explanation may lack distractor teaching");
  }
  return issues;
}

async function main() {
  const program = await getProgram();
  const objectives = getObjectives();
  const qmap = getQuestionMap();
  const quizAll = Object.values(qmap);
  const qbank = getQbankQuestions();
  const cases = getClinicalCases();
  const flashcards = getFlashcards();

  const lessonRows: LessonRow[] = [];
  const moduleSummary: Array<{
    moduleId: string;
    title: string;
    phase: string;
    phaseKind: string;
    lessonCount: number;
    coreClerkship: boolean;
    lessons: { id: string; title: string; level: string; minutes: number }[];
  }> = [];

  let totalBlocks = 0;
  let lessonsMissingObjectives = 0;
  let lessonsWithCompressedTitle = 0;

  for (const phase of program.phases) {
    for (const mod of phase.modules) {
      const lessonsMeta: {
        id: string;
        title: string;
        level: string;
        minutes: number;
      }[] = [];
      for (const lesson of mod.lessons) {
        const blocks = lesson.concepts.flatMap((c) => c.blocks);
        totalBlocks += blocks.length;
        const readingChars = blocks.reduce(
          (n, b) => n + (b.bodyMd?.length ?? 0),
          0,
        );
        const objs = objectives.filter((o) =>
          o.lessonIds.includes(lesson.id),
        );
        const quizCount = quizAll.filter((q) => q.lessonId === lesson.id)
          .length;
        const fc = flashcards.filter((f) => f.lessonId === lesson.id).length;
        const vignette = blocks.filter(
          (b) => b.blockType === "clinical_vignette",
        ).length;
        const level = inferLearnerLevel(phase, mod, lesson);
        const compressed = COMPRESSED.test(lesson.title) || lesson.title.length < 12;
        if (objs.length === 0) lessonsMissingObjectives += 1;
        if (compressed) lessonsWithCompressedTitle += 1;

        const row: LessonRow = {
          lessonId: lesson.id,
          title: lesson.title,
          slug: lesson.slug,
          moduleId: mod.id,
          moduleTitle: mod.title,
          phaseId: phase.id,
          phaseName: phase.name,
          phaseKind: phase.phaseKind,
          sequence: lesson.sequence,
          estimatedMinutes: lesson.estimatedMinutes,
          conceptCount: lesson.concepts.length,
          blockCount: blocks.length,
          readingChars,
          quizCount,
          objectiveCount: objs.length,
          flashcardCount: fc,
          hasVignette: vignette,
          titleCompressed: compressed,
          inferredLevel: level,
        };
        lessonRows.push(row);
        lessonsMeta.push({
          id: lesson.id,
          title: lesson.title,
          level,
          minutes: lesson.estimatedMinutes,
        });
      }
      moduleSummary.push({
        moduleId: mod.id,
        title: mod.title,
        phase: phase.name,
        phaseKind: phase.phaseKind,
        lessonCount: mod.lessons.length,
        coreClerkship: mod.isCoreClerkship,
        lessons: lessonsMeta,
      });
    }
  }

  // Duplicate / overlap detection by title similarity within and across modules
  const overlaps: Array<{
    a: string;
    aTitle: string;
    aModule: string;
    b: string;
    bTitle: string;
    bModule: string;
    score: number;
    classificationHint: string;
  }> = [];
  for (let i = 0; i < lessonRows.length; i++) {
    const A = lessonRows[i];
    const ta = tokenSet(A.title);
    for (let j = i + 1; j < lessonRows.length; j++) {
      const B = lessonRows[j];
      // Cheap filter: share a distinctive word or same module
      const tb = tokenSet(B.title);
      const score = jaccard(ta, tb);
      if (score < 0.45) continue;
      // skip trivial shared words only
      if (normalizeTitle(A.title) === normalizeTitle(B.title) || score >= 0.45) {
        let hint = "REVIEW";
        if (A.phaseKind !== B.phaseKind) hint = "FOUNDATIONAL vs CLINICAL";
        else if (A.inferredLevel !== B.inferredLevel)
          hint = "LEVEL DISTINCTION";
        else if (A.moduleId === B.moduleId) hint = "SAME_MODULE_CONSOLIDATE?";
        else hint = "CROSS_MODULE_OVERLAP";
        overlaps.push({
          a: A.lessonId,
          aTitle: A.title,
          aModule: A.moduleTitle,
          b: B.lessonId,
          bTitle: B.title,
          bModule: B.moduleTitle,
          score: Number(score.toFixed(2)),
          classificationHint: hint,
        });
      }
    }
  }
  overlaps.sort((x, y) => y.score - x.score);

  // Keyword-targeted CV / IM clusters
  const keywordClusters: Record<string, LessonRow[]> = {};
  const keywords = [
    ["cardiac electrophysiology", /electrophysiol|action potential|ion channel/i],
    ["ischemic heart / ACS", /ischemi|acs|stemi|nstemi|atherosclero|coronary|plaque/i],
    ["heart failure", /heart failure|hfref|hfpef|hfmr/i],
    ["shock", /\bshock\b|microcirculation|vasopressor/i],
    ["valvular", /valvul|stenosis|regurgitation|aortic stenosis|mitral/i],
    ["pericardial / tamponade", /pericard|tamponade/i],
    ["pulmonary hypertension", /pulmonary hypertension|pah\b|group [1-5] ph/i],
    ["pneumonia", /pneumonia|cap\b|hap\b|vap\b/i],
    ["sepsis", /sepsis|septic shock/i],
    ["aki", /acute kidney|aki\b|renal failure/i],
    ["electrolytes", /electrolyte|hyperkal|hyponatr|hypernatr|hypokal/i],
    ["chest pain", /chest pain|angina/i],
    ["vte", /\bvte\b|pe\b|pulmonary embol|dvt|wells|perc/i],
    ["diabetes emergencies", /dka|hhs|hyperosmolar|diabetic keto/i],
    ["gi bleed", /gi bleed|gastrointestinal bleed|variceal|ugib|lgib/i],
    ["stroke", /stroke|tia\b|cerebrovascular|thrombolysis/i],
    ["respiratory failure / vent", /respiratory failure|mechanical vent|ards|niv\b/i],
  ] as const;

  for (const [name, re] of keywords) {
    keywordClusters[name] = lessonRows.filter(
      (l) => re.test(l.title) || re.test(l.moduleTitle),
    );
  }

  // Objectives quality
  const vagueObjectives = objectives.filter((o) => VAGUE_OBJ.test(o.statement));
  const objectivesPerLesson = new Map<string, number>();
  for (const o of objectives) {
    for (const lid of o.lessonIds) {
      objectivesPerLesson.set(lid, (objectivesPerLesson.get(lid) ?? 0) + 1);
    }
  }
  const lessonsObjCountDist = { 0: 0, 1: 0, 2: 0, "3-5": 0, "6+": 0 };
  for (const l of lessonRows) {
    const n = objectivesPerLesson.get(l.lessonId) ?? 0;
    if (n === 0) lessonsObjCountDist[0]++;
    else if (n === 1) lessonsObjCountDist[1]++;
    else if (n === 2) lessonsObjCountDist[2]++;
    else if (n <= 5) lessonsObjCountDist["3-5"]++;
    else lessonsObjCountDist["6+"]++;
  }

  // Question audits
  const quizIssues = quizAll
    .map((q) => {
      const issues = explainIssues(q);
      const lesson = lessonRows.find((l) => l.lessonId === q.lessonId);
      return {
        id: q.id,
        lessonId: q.lessonId,
        lessonTitle: lesson?.title,
        moduleTitle: lesson?.moduleTitle,
        stem: q.stem.slice(0, 160),
        hasObjective: Boolean(q.objectiveId),
        objectiveId: q.objectiveId,
        explanationLen: (q.explanation || "").length,
        issues,
        guidelineSensitive: GUIDELINE_SENSITIVE.test(
          `${q.stem} ${q.explanation}`,
        ),
      };
    })
    .filter((r) => r.issues.length > 0 || r.guidelineSensitive);

  const qbankIssues = qbank.map((q) => {
    const issues: string[] = [];
    if (!q.objectiveId) issues.push("Missing objective");
    if (!q.explanation || q.explanation.length < 40)
      issues.push("Weak/short explanation");
    if (WHICH_TRUE.test(q.stem)) issues.push("Which-of-following-is-true stem");
    return {
      id: q.id,
      moduleId: q.moduleId,
      usmleStep: q.usmleStep,
      difficulty: q.difficulty,
      stem: q.stem.slice(0, 160),
      hasObjective: Boolean(q.objectiveId),
      objectiveId: q.objectiveId,
      explanationLen: (q.explanation || "").length,
      organSystem: q.organSystem,
      issues,
      guidelineSensitive: GUIDELINE_SENSITIVE.test(
        `${q.stem} ${q.explanation}`,
      ),
    };
  });

  // Cases structure
  const caseAudit = cases.map((c) => ({
    id: c.id,
    title: c.title,
    moduleId: c.moduleId,
    stageCount: c.stages.length,
    stages: c.stages.map((s) => s.prompt.slice(0, 80)),
    objectiveCount: c.objectiveIds.length,
    teachingPointsLen: c.teachingPoints?.length ?? 0,
    hasPresentation: Boolean(c.presentationMd?.trim()),
  }));

  // References in lesson bodies
  const lessonsMissingRefs: string[] = [];
  const guidelineSensitiveLessons: LessonRow[] = [];
  for (const phase of program.phases) {
    for (const mod of phase.modules) {
      for (const lesson of mod.lessons) {
        const body = lesson.concepts
          .flatMap((c) => c.blocks)
          .map((b) => b.bodyMd || "")
          .join("\n");
        const hasRefSection =
          /##?\s*sources\b|##?\s*references\b|guideline \/ reference|REFERENCE_REVIEW_REQUIRED/i.test(
            body,
          );
        const row = lessonRows.find((r) => r.lessonId === lesson.id)!;
        if (!hasRefSection && /clinical|clerkship|disease|management|treatment/i.test(
          `${lesson.title} ${mod.title} ${phase.phaseKind}`,
        )) {
          lessonsMissingRefs.push(lesson.id);
        }
        if (GUIDELINE_SENSITIVE.test(`${lesson.title}\n${body.slice(0, 2000)}`)) {
          guidelineSensitiveLessons.push(row);
        }
      }
    }
  }

  // Level mix within modules (advanced next to preclinical)
  const mixedLevelModules = moduleSummary
    .map((m) => {
      const levels = new Set(m.lessons.map((l) => l.level));
      return { ...m, levels: [...levels], mixed: levels.size > 2 };
    })
    .filter((m) => m.mixed);

  // Specific concept text scans (tamponade, HF triad, PH thresholds, sepsis hour-1, PERC)
  const conceptFlags: Array<{
    lessonId: string;
    title: string;
    flag: string;
    excerpt: string;
    priority: string;
  }> = [];

  const scans: Array<[RegExp, string, string]> = [
    [
      /kills preload/i,
      "Tamponade: imprecise 'kills preload' language",
      "HIGH",
    ],
    [
      /ACE inhibitor \+ beta.?blocker \+ diuretic|ACEI.*beta.?blocker.*diuretic(?!.*SGLT)/i,
      "HF: possibly outdated ACEI+BB+diuretic-only framing",
      "HIGH",
    ],
    [
      /mean pulmonary.*(25|≥25|>25)|mPAP.*>\s*25|mPAP\s*≥\s*25/i,
      "PH: possible obsolete mPAP ≥25 definition without historical label",
      "HIGH",
    ],
    [
      /hour-?1 bundle|1-hour bundle/i,
      "Sepsis: Hour-1 bundle presented — verify flexible framing",
      "HIGH",
    ],
    [
      /PERC\b(?![^\n]{0,80}(pretest|pre-test|clinical judgment))/i,
      "PERC/Wells: ensure not substitute for pretest probability",
      "MEDIUM",
    ],
    [
      /\bMONA\b/,
      "ACS: MONA historical teaching — verify contemporary pathway framing",
      "MEDIUM",
    ],
    [
      /HyperK|Fluid first|^Modes$|ScvO2 concepts/i,
      "Compressed student-facing title/description",
      "LOW",
    ],
  ];

  for (const phase of program.phases) {
    for (const mod of phase.modules) {
      for (const lesson of mod.lessons) {
        const body = lesson.concepts
          .flatMap((c) => c.blocks)
          .map((b) => `${b.title}\n${b.bodyMd || ""}`)
          .join("\n");
        const hay = `${lesson.title}\n${body}`;
        for (const [re, flag, priority] of scans) {
          const m = hay.match(re);
          if (m) {
            const idx = hay.indexOf(m[0]);
            conceptFlags.push({
              lessonId: lesson.id,
              title: lesson.title,
              flag,
              excerpt: hay.slice(Math.max(0, idx - 40), idx + 120).replace(/\s+/g, " "),
              priority,
            });
          }
        }
      }
    }
  }

  const summary = {
    program: { id: program.id, name: program.name },
    counts: {
      phases: program.phases.length,
      modules: moduleSummary.length,
      lessons: lessonRows.length,
      contentBlocks: totalBlocks,
      objectives: objectives.length,
      quizQuestions: quizAll.length,
      qbankQuestions: qbank.length,
      clinicalCases: cases.length,
      flashcards: flashcards.length,
      lessonsMissingObjectives,
      lessonsWithCompressedTitle,
      lessonsMissingReferenceSection: lessonsMissingRefs.length,
      guidelineSensitiveLessonCount: guidelineSensitiveLessons.length,
      vagueObjectiveCount: vagueObjectives.length,
      titleOverlapPairs: overlaps.length,
      quizRowsNeedingAttention: quizIssues.length,
      conceptFlagCount: conceptFlags.length,
    },
    objectivesPerLessonDistribution: lessonsObjCountDist,
    quizObjectiveCoverage: {
      withObjective: quizAll.filter((q) => q.objectiveId).length,
      withoutObjective: quizAll.filter((q) => !q.objectiveId).length,
    },
    qbankObjectiveCoverage: {
      withObjective: qbank.filter((q) => q.objectiveId).length,
      withoutObjective: qbank.filter((q) => !q.objectiveId).length,
    },
    phases: program.phases.map((p) => ({
      id: p.id,
      name: p.name,
      kind: p.phaseKind,
      usmleFocus: p.usmleFocus,
      modules: p.modules.map((m) => ({
        id: m.id,
        title: m.title,
        lessons: m.lessons.length,
        core: m.isCoreClerkship,
      })),
    })),
  };

  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(
    path.join(OUT_DIR, "summary.json"),
    JSON.stringify(summary, null, 2),
  );
  await fs.writeFile(
    path.join(OUT_DIR, "lessons.json"),
    JSON.stringify(lessonRows, null, 2),
  );
  await fs.writeFile(
    path.join(OUT_DIR, "modules.json"),
    JSON.stringify(moduleSummary, null, 2),
  );
  await fs.writeFile(
    path.join(OUT_DIR, "overlaps.json"),
    JSON.stringify(overlaps.slice(0, 200), null, 2),
  );
  await fs.writeFile(
    path.join(OUT_DIR, "keyword-clusters.json"),
    JSON.stringify(
      Object.fromEntries(
        Object.entries(keywordClusters).map(([k, v]) => [
          k,
          v.map((l) => ({
            id: l.lessonId,
            title: l.title,
            module: l.moduleTitle,
            level: l.inferredLevel,
            phase: l.phaseName,
          })),
        ]),
      ),
      null,
      2,
    ),
  );
  await fs.writeFile(
    path.join(OUT_DIR, "vague-objectives.json"),
    JSON.stringify(
      vagueObjectives.map((o) => ({
        id: o.id,
        statement: o.statement,
        lessonIds: o.lessonIds,
        moduleId: o.moduleId,
      })),
      null,
      2,
    ),
  );
  await fs.writeFile(
    path.join(OUT_DIR, "quiz-issues.json"),
    JSON.stringify(quizIssues.slice(0, 500), null, 2),
  );
  await fs.writeFile(
    path.join(OUT_DIR, "qbank-issues.json"),
    JSON.stringify(qbankIssues, null, 2),
  );
  await fs.writeFile(
    path.join(OUT_DIR, "cases.json"),
    JSON.stringify(caseAudit, null, 2),
  );
  await fs.writeFile(
    path.join(OUT_DIR, "guideline-sensitive-lessons.json"),
    JSON.stringify(
      guidelineSensitiveLessons.map((l) => ({
        id: l.lessonId,
        title: l.title,
        module: l.moduleTitle,
        level: l.inferredLevel,
      })),
      null,
      2,
    ),
  );
  await fs.writeFile(
    path.join(OUT_DIR, "concept-flags.json"),
    JSON.stringify(conceptFlags, null, 2),
  );
  await fs.writeFile(
    path.join(OUT_DIR, "mixed-level-modules.json"),
    JSON.stringify(
      mixedLevelModules.map((m) => ({
        id: m.moduleId,
        title: m.title,
        levels: m.levels,
        lessonCount: m.lessonCount,
      })),
      null,
      2,
    ),
  );
  await fs.writeFile(
    path.join(OUT_DIR, "missing-refs-sample.json"),
    JSON.stringify(lessonsMissingRefs.slice(0, 100), null, 2),
  );

  console.log(JSON.stringify(summary.counts, null, 2));
  console.log("Wrote audit JSON to", OUT_DIR);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
