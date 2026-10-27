import type { ClinicalCase } from "@/lib/types/domain";
import { IDS } from "@/lib/curriculum/seed";

/**
 * Progressive interactive case: Acute Mesenteric Ischemia (arterial embolic).
 * Conceptual management only — no standing doses/regimens.
 * Faculty marker: REFERENCE_REVIEW_REQUIRED for pathway timing and anticoagulation details.
 */
export const acuteMesentericIschemiaCase: ClinicalCase = {
  id: "case-ami-1",
  moduleId: IDS.modSurg,
  title: "Pain Out of Proportion — Acute Mesenteric Ischemia",
  summary:
    "Elderly patient with atrial fibrillation and sudden severe abdominal pain. Progressive disclosure through differential → CTA → definitive management → board pearls.",
  organSystem: "Gastrointestinal",
  difficulty: "clerkship",
  format: "progressive",
  presentationMd: `## Emergency triage — opening frame

You are the admitting intern. EMS brings a **72-year-old** from home for sudden abdominal pain. Before the full history arrives, you get the **chief complaint** and **triage vitals** only.

Work this case in four locked steps. Do not skip ahead—each answer unlocks the next disclosure.`,
  stages: [
    {
      id: "ami-step-1",
      kind: "decision",
      prompt:
        "Based on the chief complaint and triage vitals alone, which leading diagnosis belongs at the top of your differential?",
      expectedFocus:
        "Acute mesenteric ischemia (embolic) — pain out of proportion + AF + sudden onset",
      revealMd: `### Step 1 — Chief complaint & triage vitals

**Chief complaint:** Sudden-onset severe diffuse abdominal pain starting 90 minutes ago while watching television.

| Vital | Value |
| --- | --- |
| Temp | 37.1 °C |
| HR | 118 (irregularly irregular) |
| BP | 148/86 mmHg |
| RR | 22 |
| SpO₂ | 96% on room air |
| Pain | 10/10 |

**Triage note:** Looks uncomfortable, clutching abdomen. Skin warm. No reported trauma.

*Exact numeric cutoffs and institutional ESI triage bands: REFERENCE_REVIEW_REQUIRED.*`,
      choices: [
        {
          id: "ami-s1-a",
          text: "Acute mesenteric ischemia (arterial embolism) until proven otherwise",
          explanation:
            "Correct frame. Sudden severe pain + new/known AF rhythm is the classic board and bedside cue for embolic mesenteric ischemia—especially when exam later is soft relative to pain.",
        },
        {
          id: "ami-s1-b",
          text: "Perforated peptic ulcer with diffuse peritonitis",
          explanation:
            "Classic error early: perforation usually produces peritonitis and a rigid abdomen. Pain-out-of-proportion with a still-soft exam points elsewhere until late infarction.",
        },
        {
          id: "ami-s1-c",
          text: "Uncomplicated biliary colic",
          explanation:
            "Biliary colic is typically episodic RUQ/epigastric pain after meals, not sudden 10/10 diffuse pain with tachycardia and irregular rhythm as the dominant clue.",
        },
        {
          id: "ami-s1-d",
          text: "ST-elevation ACS — treat abdomen as referred cardiac pain only",
          explanation:
            "Always get an ECG in ill adults, but anchoring solely on ACS misses a surgical vascular emergency when abdominal pain is the primary syndrome and AF is present.",
        },
        {
          id: "ami-s1-e",
          text: "Gastroenteritis — discharge with oral hydration if labs are pending",
          explanation:
            "Dangerous premature closure. Sudden 10/10 pain with irregular tachycardia is not a discharge gastroenteritis script.",
        },
      ],
      correctChoiceId: "ami-s1-a",
      teachingMd: `**Differential discipline:** Keep three lines—most likely, most dangerous, most common mimic. Here **acute mesenteric ischemia** is both likely *and* dangerous. Perforation, pancreatitis, obstructing stone, AAA syndrome, and ACS remain active until exam and data narrow them.

Unlock Step 2 for HPI and exam.`,
    },
    {
      id: "ami-step-2",
      kind: "decision",
      prompt:
        "Given the HPI and exam, what is the highest-yield next diagnostic test?",
      expectedFocus:
        "CT angiography of the abdomen/pelvis (mesenteric arterial phase) after ABCs and surgical awareness",
      revealMd: `### Step 2 — HPI & physical exam

**HPI**
- Pain began abruptly, maximal within minutes, diffuse, without radiation to the back.
- Associated nausea; one loose stool with a streak of blood 20 minutes ago.
- History of **nonvalvular atrial fibrillation**; reports intermittent adherence to anticoagulation (“ran out last week”).
- Prior stent for CAD; no recent surgery; no alcohol binge; no known AAA.
- Last oral intake 4 hours ago.

**Exam**
- Uncomfortable, diaphoretic.
- Abdomen: **soft**, mild diffuse tenderness, **no guarding or rebound**.
- No palpable pulsatile mass. Bowel sounds present but diminished.
- Rectal: trace occult blood.
- Lungs clear; irregular tachycardic pulse; no calf swelling.

**ECG:** Atrial fibrillation, rate ~120; no STEMI criteria.

**Problem representation so far:** Elderly patient with AF off anticoagulation → sudden severe abdominal pain **out of proportion** to a soft exam ± early GI bleeding.`,
      choices: [
        {
          id: "ami-s2-a",
          text: "CT angiography (CTA) of abdomen/pelvis with mesenteric arterial-phase protocol",
          explanation:
            "Correct. CTA is the usual decision-changing study when mesenteric ischemia is suspected and the patient can be resuscitated toward imaging. Call surgery/vascular in parallel.",
        },
        {
          id: "ami-s2-b",
          text: "Plain upright abdominal series alone; discharge if no free air",
          explanation:
            "Classic miss. AXR may show late ileus/thumbprinting/pneumatosis but is insensitive for early arterial occlusion—and “no free air” does not clear mesenteric ischemia.",
        },
        {
          id: "ami-s2-c",
          text: "Urgent colonoscopy before any cross-sectional vascular imaging",
          explanation:
            "Wrong sequence. Endoscopy does not map proximal SMA occlusion and delays revascularization thinking; mucosal ischemia, when seen, is often a late clue.",
        },
        {
          id: "ami-s2-d",
          text: "Observe with serial abdominal exams overnight without advanced imaging",
          explanation:
            "Time is bowel. Waiting for peritonitis means waiting for infarction/transmural necrosis.",
        },
        {
          id: "ami-s2-e",
          text: "D-dimer alone as a rule-out test, then primary care follow-up",
          explanation:
            "D-dimer is nonspecific and not a validated standalone rule-out for mesenteric arterial embolism in this high-pretest story.",
        },
      ],
      correctChoiceId: "ami-s2-a",
      teachingMd: `**Test that changes the branch:** When suspicion is high, choose imaging that can confirm or refute **mesenteric arterial occlusion** while you resuscitate (IV access, fluids as appropriate, ECG already done, labs, NPO, early surgical/vascular notification).

Lactate and leukocyte count may rise but are neither sensitive nor specific enough to exclude early disease. *Exact CTA protocols and contrast thresholds: REFERENCE_REVIEW_REQUIRED.*`,
    },
    {
      id: "ami-step-3",
      kind: "decision",
      prompt:
        "CTA confirms the diagnosis. What is the definitive diagnosis and the primary management priority?",
      expectedFocus:
        "Acute embolic SMA occlusion → urgent revascularization pathway + resuscitation + anticoagulation planning with surgery/vascular",
      revealMd: `### Step 3 — Labs & imaging

**Selected labs** (still pending full panel when CTA is read)
- WBC 14.2 × 10⁹/L  
- Lactate elevated above your lab’s reference range  
- Creatinine mildly up from baseline  
- Hemoglobin stable  
- Troponin negative  

*Do not memorize invented cutoffs from this page — use your institution’s reference ranges (REFERENCE_REVIEW_REQUIRED).*

**CTA abdomen/pelvis (mesenteric arterial phase)**
- Filling defect / abrupt cutoff in the **proximal-to-mid superior mesenteric artery (SMA)** consistent with **embolus**
- Distal SMA branches poorly opacified
- Small-bowel wall hypoenhancement in a corresponding territory; no frank pneumoperitoneum
- No AAA rupture; no obstructing stone; patent celiac origin

**Radiology impression:** Acute SMA embolic occlusion with early bowel ischemia.`,
      choices: [
        {
          id: "ami-s3-a",
          text: "Acute embolic SMA occlusion — urgent surgery/vascular revascularization pathway plus resuscitation and anticoagulation planning",
          explanation:
            "Correct. Diagnosis is acute embolic mesenteric ischemia. Primary management is time-critical restoration of mesenteric flow with continuous resuscitation—not observation or diverticulitis-style antibiotics alone.",
        },
        {
          id: "ami-s3-b",
          text: "Acute diverticulitis — IV antibiotics and surgical consult only if abscess forms",
          explanation:
            "Wrong disease script. Diverticulitis is usually LLQ-focused with different imaging. SMA embolus needs revascularization thinking, not a diverticulitis pathway.",
        },
        {
          id: "ami-s3-c",
          text: "Nonspecific abdominal pain — PPI, antiemetic, and outpatient GI follow-up tomorrow",
          explanation:
            "Catastrophic under-triage after CTA-proven SMA occlusion. Bowel infarction and death risk rise with each hour of untreated ischemia.",
        },
        {
          id: "ami-s3-d",
          text: "Isolated lactic acidosis from dehydration — IV fluids overnight, recheck lactate, no procedural pathway",
          explanation:
            "Lactate is a late/insensitive marker here; treating “dehydration” alone ignores the occluded SMA on CTA.",
        },
        {
          id: "ami-s3-e",
          text: "Chronic mesenteric ischemia — schedule elective angiography next week after a full meal trial",
          explanation:
            "Chronic disease is postprandial fear-of-food / weight loss over months. This is hyperacute embolism—do not electivize.",
        },
      ],
      correctChoiceId: "ami-s3-a",
      teachingMd: `**Primary management (conceptual order)**
1. ABCs / IV access / NPO / continuous monitoring  
2. Hemodynamic support and correction of reversible contributors  
3. **Immediate surgery ± vascular consultation** for revascularization and bowel viability assessment (embolectomy / open or endovascular strategies per team and anatomy)  
4. Anticoagulation planning unless active contraindication—coordinate with procedural team  
5. Broad-spectrum antibiotics are often considered when translocation/infarction is possible — *regimens REFERENCE_REVIEW_REQUIRED*  
6. Resect frankly necrotic bowel if present; second-look operations are a known pattern in selected patients  

Exact timing windows, heparin protocols, and endovascular vs open algorithms are institutional and guideline-sensitive (*REFERENCE_REVIEW_REQUIRED*).`,
    },
    {
      id: "ami-step-4",
      kind: "wrapup",
      prompt:
        "Educational wrap-up — pathophysiology and board pearls (no additional gate).",
      expectedFocus:
        "Embolus to SMA → mucosal then transmural ischemia; pain ≫ exam early; CTA; time-critical revascularization",
      revealMd: `### Step 4 — Pathophysiology & high-yield board pearls

#### Mechanism story
Atrial fibrillation → left-atrial appendage thrombus → **embolism into the SMA** (common visceral embolic target because of its oblique origin and high flow) → abrupt cutoff of intestinal arterial inflow.

Ischemia progresses **mucosa → mural → transmural**. Early exam can be soft (“pain out of proportion”). Peritonitis arrives late and signals infarction/perforation risk. Bacterial translocation and lactate rise are often delayed relative to the vascular insult.

#### Differentiate the AMI family (board map)
| Type | Classic cue |
| --- | --- |
| **Arterial embolic** | AF / cardioembolic source; sudden pain |
| **Arterial thrombotic** | Chronic atherosclerotic SMA stenosis + acute on chronic clues |
| **Venous thrombosis** | Hypercoagulable state; often subacute pain; different CTA venous-phase emphasis |
| **Nonocclusive (NOMI)** | Low-flow / shock / pressors in critically ill patients |

#### Pearls that separate this from look-alikes
1. **Pain ≫ tenderness early** is a feature, not reassurance.  
2. Normal early lactate does **not** exclude mesenteric ischemia.  
3. Free air / peritonitis means you are late—not that the diagnosis was ever “just gastroenteritis.”  
4. Holding anticoagulation in AF without a plan is a preventable setup for this vignette.  
5. Imaging choice: **CTA**, not “flat plate then home.”  

#### Self-check
- [ ] I can state the problem representation in one sentence.  
- [ ] I can name the can’t-miss vascular diagnosis and its top mimics.  
- [ ] I know why CTA beats plain films here.  
- [ ] I can list revascularization + resuscitation as the management spine without inventing doses.

*Faculty marker: REFERENCE_REVIEW_REQUIRED — attach verified citations for CTA protocols, anticoagulation, and operative/endovascular pathways before claiming guideline currency.*`,
      teachingMd: `**Take-home line:** Sudden abdominal pain out of proportion + AF → think embolic mesenteric ischemia → CTA → urgent revascularization pathway.

You have completed the progressive case. Optionally submit written reflections below for tutor-style feedback.`,
    },
  ],
  teachingPoints:
    "Acute embolic mesenteric ischemia presents with sudden pain out of proportion to exam, often in atrial fibrillation. CTA is the key early test; management is urgent revascularization with continuous resuscitation. Pain-out-of-proportion is a warning, not reassurance. REFERENCE_REVIEW_REQUIRED for dosing and institutional pathways.",
  objectiveIds: ["obj-surg-2", "obj-surg-1"],
  status: "published",
};
