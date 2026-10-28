/**
 * Pathology coverage + depth audit against public USMLE-style general and
 * systemic pathology pillars.
 *
 * Run: npx tsx scripts/pathology-content-audit.ts
 * Writes:
 *   docs/audit/pathology-coverage.json
 *   docs/audit/pathology-depth.json
 *
 * Does NOT download, parse, quote, or reproduce any copyrighted textbook
 * (including Harsh Mohan). Not medical approval.
 */
import { promises as fs } from "fs";
import path from "path";
import {
  getAllLessons,
  getAllModules,
  getClinicalCases,
  getObjectives,
} from "../lib/curriculum/accessors";
import { FOUR_YEAR_TOPICS } from "../lib/curriculum/catalog/topics-generated";
import type { Lesson } from "../lib/types/domain";

const OUT_DIR = path.join(process.cwd(), "docs", "audit");

type Pillar = {
  id: string;
  domain: "general" | "systemic";
  title: string;
  keywords: RegExp;
};

const PILLARS: Pillar[] = [
  {
    id: "cell-injury",
    domain: "general",
    title: "Cell injury, death, adaptations",
    keywords:
      /necrosis|apoptosis|autophagy|atrophy|hypertrophy|hyperplasia|metaplasia|reversible injury|irreversible|free radical|hypoxia|ischemia|cell injury/i,
  },
  {
    id: "inflammation",
    domain: "general",
    title: "Acute & chronic inflammation",
    keywords:
      /inflammation|histamine|bradykinin|chemotax|neutrophil|macrophage|granuloma|abscess|mediator|leukocyte|complement/i,
  },
  {
    id: "repair",
    domain: "general",
    title: "Tissue repair & wound healing",
    keywords:
      /wound healing|granulation|collagen|scar|fibrosis|repair|remodeling|keloid|contracture/i,
  },
  {
    id: "hemodynamic",
    domain: "general",
    title: "Hemodynamic disorders (edema, thrombosis, embolism, shock)",
    keywords:
      /edema|thrombosis|emboli|embolism|infarct|shock|virchow|stasis|DIC|hemostasis|bleeding|clot/i,
  },
  {
    id: "neoplasia",
    domain: "general",
    title: "Neoplasia (benign/malignant, invasion, staging)",
    keywords:
      /neoplas|tumor|carcinoma|sarcoma|oncogene|tumor suppressor|metastas|invasion|grading|staging|benign|malignant|anaplasia/i,
  },
  {
    id: "genetic",
    domain: "general",
    title: "Genetic disorders & congenital malformations",
    keywords:
      /genetic|chromosom|mendel|autosomal|x-linked|trisomy|congenital|malformation|mutation|mendelian/i,
  },
  {
    id: "immunopath",
    domain: "general",
    title: "Immunopathology (hypersensitivity, autoimmunity, transplant)",
    keywords:
      /hypersensit|autoimmun|transplant|rejection|tolerance|SLE|rheumatoid|immunodeficienc|HIV|AIDS|type I|type II|type III|type IV/i,
  },
  {
    id: "infectious",
    domain: "general",
    title: "Infectious disease pathology patterns",
    keywords:
      /infect|bacter|virus|fungal|parasite|sepsis|abscess|granulomatous|mycobacter|viral pathogenesis/i,
  },
  {
    id: "environmental",
    domain: "general",
    title: "Environmental / nutritional pathology",
    keywords:
      /nutrition|vitamin|obesity|alcohol|smoking|toxin|poison|radiation|environmental|malnutrit/i,
  },
  {
    id: "pediatric-path",
    domain: "general",
    title: "Pediatric / perinatal pathology themes",
    keywords:
      /pediatric|neonat|perinatal|congenital|failure to thrive|SIDS|developmental/i,
  },
  {
    id: "cv-path",
    domain: "systemic",
    title: "Cardiovascular pathology",
    keywords:
      /atherosclero|infarct|myocarditis|cardiomyopath|endocarditis|pericard|valve|aneurysm|vasculitis|hypertension.*path|ischemic heart/i,
  },
  {
    id: "resp-path",
    domain: "systemic",
    title: "Respiratory pathology",
    keywords:
      /pneumonia|ARDS|emphysema|bronchitis|asthma|pulmonary.*embol|interstitial lung|tubercul|lung cancer|pleural/i,
  },
  {
    id: "renal-path",
    domain: "systemic",
    title: "Renal / urinary pathology",
    keywords:
      /glomerul|nephritic|nephrotic|AKI|CKD|pyelonephrit|nephritis|cast|proteinuria|hematuria|renal.*path|tubulointerstit/i,
  },
  {
    id: "gi-path",
    domain: "systemic",
    title: "GI / hepatobiliary pathology",
    keywords:
      /cirrhosis|hepatitis|IBD|Crohn|ulcerative colitis|peptic|pancreatit|cholecystit|portal hypertension|esophageal|colorectal|malabsorption/i,
  },
  {
    id: "heme-path",
    domain: "systemic",
    title: "Hematopathology",
    keywords:
      /anemia|leukemia|lymphoma|myeloma|coagulopath|thrombocyt|hemolysis|DIC|pancytopen|marrow/i,
  },
  {
    id: "endo-path",
    domain: "systemic",
    title: "Endocrine pathology",
    keywords:
      /thyroid|diabetes|adrenal|pituitary|parathyroid|Cushing|Addison|pheochromocytoma|MEN|goiter|insulinoma/i,
  },
  {
    id: "breast-repro",
    domain: "systemic",
    title: "Breast & female genital pathology",
    keywords:
      /breast|mammary|cervical|endometri|ovarian|uterine|fibroadenoma|DCIS|BRCA|PID|ectopic/i,
  },
  {
    id: "male-repro",
    domain: "systemic",
    title: "Male genital / prostate pathology",
    keywords: /prostate|testicular|BPH|seminoma|penile|orchitis|epididym/i,
  },
  {
    id: "cns-path",
    domain: "systemic",
    title: "CNS / neuropathology",
    keywords:
      /stroke|meningitis|encephalitis|glioblastoma|Alzheimer|Parkinson|demyelinat|MS\b|intracranial|neuropath|seizure.*path/i,
  },
  {
    id: "msk-path",
    domain: "systemic",
    title: "Bone, joint, soft tissue pathology",
    keywords:
      /osteoporos|osteomyelitis|fracture|gout|osteoarthritis|rheumatoid|sarcoma|bone tumor|Paget|soft tissue/i,
  },
  {
    id: "derm-path",
    domain: "systemic",
    title: "Dermatopathology",
    keywords:
      /melanoma|basal cell|squamous cell|psoriasis|dermatitis|bullous|skin cancer|rash.*path|dermato/i,
  },
  {
    id: "eye-ent",
    domain: "systemic",
    title: "Eye / ENT pathology themes",
    keywords:
      /retinopath|glaucoma|otitis|sinusitis|nasopharyn|larynx|cataract|uveitis/i,
  },
];

type ClassicTopic = {
  id: string;
  title: string;
  titleRe: RegExp;
  bodyRe: RegExp;
};

const CLASSICS: ClassicTopic[] = [
  {
    id: "amyloidosis",
    title: "Amyloidosis",
    titleRe: /amyloid/i,
    bodyRe: /amyloid|congo red|apple-green/i,
  },
  {
    id: "calcification",
    title: "Pathologic calcification",
    titleRe: /calcification/i,
    bodyRe: /dystrophic|metastatic calcification/i,
  },
  {
    id: "pigments",
    title: "Endogenous pigments (hemosiderin, lipofuscin, melanin, bilirubin)",
    titleRe: /pigment|hemosiderin|lipofuscin|bilirubin/i,
    bodyRe: /hemosiderin|lipofuscin|melanin|bilirubin|pigment/i,
  },
  {
    id: "edema-types",
    title: "Edema mechanisms (hydrostatic/oncotic/lymphatic)",
    titleRe: /edema/i,
    bodyRe: /hydrostatic|oncotic|lymphatic.*edema|starling force/i,
  },
  {
    id: "infarct-red-white",
    title: "Red vs white infarct",
    titleRe: /infarct/i,
    bodyRe: /red infarct|white infarct|hemorrhagic infarct|anemic infarct/i,
  },
  {
    id: "shock-stages",
    title: "Shock stages / morphology",
    titleRe: /shock/i,
    bodyRe: /compensat.*shock|progressive shock|irreversible shock|shock.*lung|ATN/i,
  },
  {
    id: "carcinogenesis",
    title: "Chemical / radiation / microbial carcinogenesis",
    titleRe: /carcinogen/i,
    bodyRe:
      /initiator|promoter|aflatoxin|HPV|EBV|H\.?\s*pylori|radiation.*cancer|carcinogen/i,
  },
  {
    id: "paraneoplastic",
    title: "Paraneoplastic syndromes",
    titleRe: /paraneoplastic/i,
    bodyRe: /paraneoplastic|PTHrP|ACTH.*tumor|Lambert-Eaton|SIADH.*cancer/i,
  },
  {
    id: "grading-staging",
    title: "Tumor grading vs staging",
    titleRe: /grading|staging|TNM/i,
    bodyRe: /grading|staging|TNM|Breslow|Duke/i,
  },
  {
    id: "hypersensitivity-I-IV",
    title: "Hypersensitivity types I–IV",
    titleRe: /hypersensit/i,
    bodyRe: /type I|type II|type III|type IV|anaphylaxis|immune complex|delayed.?type/i,
  },
  {
    id: "transplant-rejection",
    title: "Transplant rejection types",
    titleRe: /transplant|rejection/i,
    bodyRe: /hyperacute|acute rejection|chronic rejection|GVHD|graft.versus/i,
  },
  {
    id: "tb-primary-secondary",
    title: "Primary vs secondary TB morphology",
    titleRe: /tubercul|TB\b/i,
    bodyRe: /Ghon|Ranke|caseous|primary TB|reactivation|secondary TB/i,
  },
  {
    id: "atherosclerosis-morph",
    title: "Atherosclerosis morphology / complications",
    titleRe: /atherosclero/i,
    bodyRe: /fatty streak|fibroatheroma|plaque rupture|complicated plaque|atheroma/i,
  },
  {
    id: "mi-timeline",
    title: "MI morphologic timeline",
    titleRe: /myocardial infarct|MI timeline|infarct.*timeline/i,
    bodyRe:
      /waviness|coagulative.*myocard|granulation.*infarct|3–?4 day|macrophage.*infarct|scar.*infarct|MI timeline/i,
  },
  {
    id: "glomerular-patterns",
    title: "Nephritic vs nephrotic patterns",
    titleRe: /nephritic|nephrotic|glomerul/i,
    bodyRe: /nephritic|nephrotic|RBC cast|podocyte|subepithelial|subendothelial/i,
  },
  {
    id: "cirrhosis-morph",
    title: "Cirrhosis / hepatic failure morphology",
    titleRe: /cirrhosis/i,
    bodyRe: /bridging fibrosis|regenerative nodule|micronodular|macronodular|cirrhosis/i,
  },
  {
    id: "ibd-compare",
    title: "Crohn vs UC pathology",
    titleRe: /Crohn|ulcerative colitis|IBD/i,
    bodyRe: /skip lesion|transmural|crypt abscess|continuous.*rectum|Crohn|ulcerative colitis/i,
  },
  {
    id: "lung-obstructive",
    title: "Obstructive vs restrictive lung pathology",
    titleRe: /emphysema|COPD|restrictive|interstitial lung/i,
    bodyRe: /centrilobular|panacinar|FEV1|compliance|honeycomb|UIP|restrictive/i,
  },
  {
    id: "anemia-class",
    title: "Anemia classification (production/destruction/loss)",
    titleRe: /anemia/i,
    bodyRe: /microcytic|macrocytic|hemolysis|reticulocyte|iron deficien|B12|folate/i,
  },
  {
    id: "leukemia-lymphoma",
    title: "Leukemia / lymphoma frameworks",
    titleRe: /leukemia|lymphoma/i,
    bodyRe: /ALL|AML|CLL|CML|Reed-Sternberg|non-Hodgkin|Hodgkin|blast/i,
  },
  {
    id: "diabetes-morph",
    title: "Diabetes mellitus pathology",
    titleRe: /diabetes/i,
    bodyRe: /Kimmelstiel|hyaline arteriolosclerosis|retinopath|nephropathy|insulin|type 1|type 2 diabetes/i,
  },
  {
    id: "thyroid-path",
    title: "Thyroid pathology (goiter, Graves, Hashimoto, neoplasm)",
    titleRe: /thyroid|Graves|Hashimoto|goiter/i,
    bodyRe: /Graves|Hashimoto|papillary thyroid|follicular thyroid|medullary|anaplastic|goiter/i,
  },
  {
    id: "breast-ca",
    title: "Breast carcinoma pathology",
    titleRe: /breast/i,
    bodyRe: /DCIS|invasive ductal|lobular|BRCA|HER2|triple.negative|fibroadenoma/i,
  },
  {
    id: "cervical-ca",
    title: "Cervical neoplasia / HPV",
    titleRe: /cervical|HPV|CIN/i,
    bodyRe: /CIN|HPV|koilocyte|pap smear|cervical cancer/i,
  },
  {
    id: "prostate-path",
    title: "Prostate pathology (BPH vs carcinoma)",
    titleRe: /prostate|BPH/i,
    bodyRe: /BPH|Gleason|peripheral zone|transition zone|prostate cancer/i,
  },
  {
    id: "cns-tumors",
    title: "CNS tumors / herniation",
    titleRe: /glioblastoma|meningioma|herniation|CNS tumor/i,
    bodyRe: /glioblastoma|astrocytoma|meningioma|uncal|tonsillar|herniation|metastas.*brain/i,
  },
  {
    id: "skin-tumors",
    title: "Skin tumors (BCC/SCC/melanoma)",
    titleRe: /melanoma|basal cell|squamous cell.*skin|skin cancer/i,
    bodyRe: /melanoma|basal cell|squamous cell|ABCDE|Breslow|Clark/i,
  },
  {
    id: "bone-tumors",
    title: "Primary bone tumors",
    titleRe: /osteosarcoma|Ewing|giant cell tumor|chondrosarcoma|bone tumor/i,
    bodyRe: /osteosarcoma|Ewing|Codman|sunburst|chondrosarcoma|giant cell tumor/i,
  },
  {
    id: "malaria-tb-extra",
    title: "Classic infectious morphologies (TB, abscess, viral inclusions)",
    titleRe: /tubercul|abscess|viral inclusion|CMV|HSV/i,
    bodyRe: /caseous|Ghon|abscess|owl.eye|Cowdry|Negri|viral inclusion/i,
  },
  {
    id: "cell-adaptations",
    title: "Cellular adaptations suite",
    titleRe: /atrophy|hypertrophy|hyperplasia|metaplasia/i,
    bodyRe: /atrophy|hypertrophy|hyperplasia|metaplasia/i,
  },
];

function blobOf(parts: (string | undefined | null)[]) {
  return parts.filter(Boolean).join(" \n ");
}

function readingChars(lesson: Lesson) {
  return lesson.concepts
    .flatMap((c) => c.blocks)
    .filter((b) => b.blockType === "reading")
    .reduce((n, b) => n + (b.bodyMd?.length ?? 0), 0);
}

async function writeCoverage() {
  const lessons = await getAllLessons();
  const modules = await getAllModules();
  const objectives = getObjectives();
  const cases = getClinicalCases();

  const lessonDocs = lessons.map((l) => {
    const text = blobOf([
      l.title,
      l.description,
      ...l.concepts.flatMap((c) => [
        c.title,
        c.summary,
        ...c.blocks.map((b) => `${b.title}\n${b.bodyMd ?? ""}`),
      ]),
    ]);
    return { id: l.id, title: l.title, moduleId: l.moduleId, text };
  });

  const topicDocs = FOUR_YEAR_TOPICS.map((t) => ({
    id: t.key,
    title: t.title,
    text: blobOf([
      t.title,
      t.quizExplain,
      t.cardFront,
      t.cardBack,
      ...(t.points ?? []),
    ]),
  }));

  const objectiveDocs = objectives.map((o) => ({
    id: o.id,
    text: blobOf([o.statement, o.organSystem, o.contentCategory]),
  }));

  const caseDocs = cases.map((c) => ({
    id: c.id,
    text: blobOf([c.title, c.presentationMd, c.teachingPoints, c.summary]),
  }));

  const results = PILLARS.map((p) => {
    const lessonHits = lessonDocs.filter((d) => p.keywords.test(d.text));
    const topicHits = topicDocs.filter((d) => p.keywords.test(d.text));
    const objHits = objectiveDocs.filter((d) => p.keywords.test(d.text));
    const caseHits = caseDocs.filter((d) => p.keywords.test(d.text));
    const coverageScore =
      (lessonHits.length > 0 ? 2 : 0) +
      (topicHits.length > 0 ? 2 : 0) +
      (objHits.length > 0 ? 1 : 0) +
      (caseHits.length > 0 ? 1 : 0);
    let rating: "strong" | "adequate" | "thin" | "gap";
    if (coverageScore >= 5 && lessonHits.length >= 3) rating = "strong";
    else if (coverageScore >= 3) rating = "adequate";
    else if (coverageScore >= 1) rating = "thin";
    else rating = "gap";
    return {
      id: p.id,
      domain: p.domain,
      title: p.title,
      rating,
      counts: {
        lessons: lessonHits.length,
        catalogTopics: topicHits.length,
        objectives: objHits.length,
        cases: caseHits.length,
      },
      sampleLessons: lessonHits.slice(0, 5).map((h) => ({
        id: h.id,
        title: h.title,
      })),
      sampleTopics: topicHits.slice(0, 5).map((h) => h.title),
    };
  });

  const byRating = {
    strong: results.filter((r) => r.rating === "strong").length,
    adequate: results.filter((r) => r.rating === "adequate").length,
    thin: results.filter((r) => r.rating === "thin").length,
    gap: results.filter((r) => r.rating === "gap").length,
  };

  const depthProbes = [
    {
      id: "necrosis-vs-apoptosis",
      test: /necrosis/i,
      also: /apoptosis/i,
      label: "Necrosis AND apoptosis both taught",
    },
    {
      id: "coagulative-liquefactive",
      test: /coagulative/i,
      also: /liquefactive/i,
      label: "Coagulative AND liquefactive necrosis named",
    },
    {
      id: "metaplasia-dysplasia",
      test: /metaplasia/i,
      also: /dysplasia/i,
      label: "Metaplasia AND dysplasia named",
    },
    {
      id: "benign-malignant",
      test: /benign/i,
      also: /malignant|carcinoma|sarcoma/i,
      label: "Benign vs malignant language",
    },
    {
      id: "thrombosis-embolism",
      test: /thrombos/i,
      also: /embol/i,
      label: "Thrombosis AND embolism",
    },
    {
      id: "acute-chronic-inflam",
      test: /acute inflammation|neutrophil/i,
      also: /chronic inflammation|granuloma|lymphocyte/i,
      label: "Acute AND chronic inflammation cues",
    },
    {
      id: "oncogene-suppressor",
      test: /oncogene|ras\b|myc\b/i,
      also: /tumor suppressor|p53|rb\b|APC/i,
      label: "Oncogene AND tumor suppressor cues",
    },
  ].map((probe) => {
    const corpus = [...lessonDocs, ...topicDocs].map((d) => d.text).join("\n");
    const ok = probe.test.test(corpus) && probe.also.test(corpus);
    return { id: probe.id, label: probe.label, present: ok };
  });

  const out = {
    generatedAt: new Date().toISOString(),
    method:
      "Keyword/heuristic coverage of USMLE-style general & systemic pathology pillars against Online MD lessons, catalog topics, objectives, and cases. Not a chapter-by-chapter comparison to any copyrighted textbook. Not medical approval.",
    inventory: {
      modules: modules.length,
      lessons: lessons.length,
      catalogTopics: FOUR_YEAR_TOPICS.length,
      objectives: objectives.length,
      cases: cases.length,
    },
    byRating,
    pillars: results,
    depthProbes,
  };

  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(
    path.join(OUT_DIR, "pathology-coverage.json"),
    JSON.stringify(out, null, 2),
    "utf8",
  );
  return out;
}

async function writeDepth() {
  const lessons = await getAllLessons();
  const topics = FOUR_YEAR_TOPICS;

  const lessonIndex = lessons.map((l) => {
    const body = l.concepts
      .flatMap((c) => c.blocks.map((b) => `${b.title}\n${b.bodyMd ?? ""}`))
      .join("\n");
    const titleBlob = `${l.title}\n${l.concepts.map((c) => c.title).join("\n")}`;
    return {
      id: l.id,
      title: l.title,
      moduleId: l.moduleId,
      isCatalog: l.id.startsWith("les-cat-"),
      readingChars: readingChars(l),
      titleBlob,
      body,
    };
  });

  const topicIndex = topics.map((t) => ({
    key: t.key,
    title: t.title,
    blob: `${t.title}\n${t.points.join("\n")}\n${t.quizExplain}\n${t.cardBack}`,
  }));

  const findings = CLASSICS.map((c) => {
    const dedicatedLessons = lessonIndex.filter(
      (l) => c.titleRe.test(l.titleBlob) || c.titleRe.test(l.title),
    );
    const bodyLessons = lessonIndex.filter((l) => c.bodyRe.test(l.body));
    const dedicatedTopics = topicIndex.filter((t) => c.titleRe.test(t.title));
    const bodyTopics = topicIndex.filter((t) => c.bodyRe.test(t.blob));

    const dedicated = dedicatedLessons.length + dedicatedTopics.length;
    const incidental = Math.max(
      0,
      bodyLessons.length - dedicatedLessons.length,
    );

    let depth: "dedicated" | "embedded" | "thin" | "missing";
    if (
      dedicated >= 1 &&
      (bodyLessons.some((l) => l.readingChars >= 2500) ||
        dedicatedTopics.length >= 1)
    ) {
      depth = "dedicated";
    } else if (bodyLessons.length >= 2 || bodyTopics.length >= 2) {
      depth = "embedded";
    } else if (bodyLessons.length + bodyTopics.length >= 1) {
      depth = "thin";
    } else {
      depth = "missing";
    }

    return {
      id: c.id,
      title: c.title,
      depth,
      dedicatedLessons: dedicatedLessons.slice(0, 4).map((l) => ({
        id: l.id,
        title: l.title,
        catalog: l.isCatalog,
        chars: l.readingChars,
      })),
      dedicatedTopics: dedicatedTopics.slice(0, 4).map((t) => t.title),
      bodyHitLessons: bodyLessons.length,
      bodyHitTopics: bodyTopics.length,
      incidentalBodyLessons: incidental,
    };
  });

  const summary = {
    dedicated: findings.filter((f) => f.depth === "dedicated").length,
    embedded: findings.filter((f) => f.depth === "embedded").length,
    thin: findings.filter((f) => f.depth === "thin").length,
    missing: findings.filter((f) => f.depth === "missing").length,
  };

  const generalPathLessons = lessonIndex.filter((l) =>
    /cell|inflam|neoplas|injury|apoptosis|necrosis|repair|hemodynamic|thromb/i.test(
      `${l.title} ${l.moduleId}`,
    ),
  );
  const thinHandcrafted = generalPathLessons
    .filter((l) => !l.isCatalog && l.readingChars > 0 && l.readingChars < 2000)
    .slice(0, 15)
    .map((l) => ({ id: l.id, title: l.title, chars: l.readingChars }));

  const catalogOnlyHeavy = findings.filter(
    (f) =>
      f.depth !== "missing" &&
      f.dedicatedLessons.every((l) => l.catalog) &&
      f.dedicatedLessons.length > 0 &&
      f.dedicatedTopics.length === 0,
  );

  const out = {
    generatedAt: new Date().toISOString(),
    disclaimer:
      "Heuristic pathology depth audit vs public USMLE-style classic topics. Does NOT use or reproduce any copyrighted textbook (including Harsh Mohan). Not medical approval.",
    summary,
    missingOrThin: findings.filter(
      (f) => f.depth === "missing" || f.depth === "thin",
    ),
    embedded: findings.filter((f) => f.depth === "embedded"),
    dedicated: findings.filter((f) => f.depth === "dedicated"),
    thinHandcraftedGeneralPathSample: thinHandcrafted,
    catalogOnlyDedicatedSample: catalogOnlyHeavy.slice(0, 10),
    all: findings,
  };

  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(
    path.join(OUT_DIR, "pathology-depth.json"),
    JSON.stringify(out, null, 2),
    "utf8",
  );
  return out;
}

async function main() {
  const coverage = await writeCoverage();
  const depth = await writeDepth();
  console.log(
    JSON.stringify(
      {
        inventory: coverage.inventory,
        byRating: coverage.byRating,
        depthProbes: coverage.depthProbes,
        depthSummary: depth.summary,
        embedded: depth.embedded.map((f) => f.id),
        thinOrMissing: depth.missingOrThin.map((f) => ({
          id: f.id,
          depth: f.depth,
        })),
      },
      null,
      2,
    ),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
