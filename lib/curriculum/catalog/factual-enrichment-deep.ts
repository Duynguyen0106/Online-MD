/**
 * Dense multi-paragraph textbook banks for domains that were under-enriched.
 * Imported by factual-enrichment.ts and merged into topic enrichment.
 */

export const DEEP_SNIPPETS: { test: RegExp; prose: string }[] = [
  {
    test: /mse|mental status|psychosis|delusion|hallucin|thought disorder|first-?episode/i,
    prose: `**Psychosis & MSE — textbook core.**

The mental status exam is a structured neurologic exam of mind: appearance, behavior, speech, mood/affect, thought process/content, perception, cognition, insight, and judgment. A useful problem representation separates *syndrome* (psychosis, mania, delirium, catatonia) from *cause* (primary psychiatric vs substance vs medical).

Psychosis means impaired reality testing—typically delusions, hallucinations, disorganized thought/behavior—without assuming schizophrenia on day one. First-episode workups exclude encephalopathy, withdrawal/intoxication, CNS infection, autoimmune encephalitis red flags, endocrine/metabolic crises, and medication effects while ensuring safety. Premature labeling delays reversible causes.

Treat agitation with the least restrictive effective approach: verbal de-escalation, offer oral meds when safe, then IM pathways if needed—avoid stacking respiratory depressants. Early coordinated specialty care improves trajectories; families are collateral and allies, not optional.`,
  },
  {
    test: /mood disorder|mdd|bipolar|mania|depression|phq|antidepressant|ssri|snri|ect /i,
    prose: `**Mood disorders — textbook core.**

Major depression is a syndrome of persistent low mood and/or anhedonia plus neurovegetative and cognitive features causing impairment. Screen severity and suicide risk explicitly; PHQ-9 is a severity/aid tool, not a substitute for clinical interview. Adequate antidepressant trials need sufficient dose and duration before declaring failure; psychotherapy (CBT/IPT and related) is first-line alone or combined for many patients.

Mania/hypomania redefine the illness as bipolar spectrum—do not use antidepressant monotherapy in mania. Acute mania prioritizes sleep, safety, and antimanic medication strategies (mood stabilizer ± antipsychotic per context). ECT remains highly effective for severe, psychotic, catatonic, or treatment-resistant depression and some manic states.

Always exclude medical mimics (thyroid, B12, sleep apnea, substances, meds) and ask about mixed features, psychosis, and postpartum timing when relevant.`,
  },
  {
    test: /trauma.?related|ptsd|borderline|personality disorder|dbs|validation|self-?harm/i,
    prose: `**Trauma & personality crisis care.**

PTSD is a trauma-exposure syndrome with intrusion, avoidance, negative mood/cognition alterations, and arousal—trauma-focused psychotherapy is first-line; long-term benzodiazepines are poor chronic therapy. Acute crisis care for borderline pathology emphasizes validation, clarity, and structured skills (DBT concepts) over polypharmacy cascades. Safety planning for self-harm is concrete: triggers, coping, contacts, lethal-means counseling, and follow-up.

Cluster labels can help communication but should not replace functional assessment. Comorbid substance use, mood disorders, and PTSD are common—treat what is dangerous first, then what is impairing.`,
  },
  {
    test: /addiction|substance|oud|aud|withdrawal|naloxone|buprenorph|methadone|contingency/i,
    prose: `**Addiction medicine — textbook core.**

Substance use disorders are chronic relapsing brain diseases with compulsive use despite harm. Withdrawal management (alcohol/benzo seizure risk; opioid discomfort vs precipitated withdrawal) is not the same as long-term treatment. For OUD, medication treatment (buprenorphine, methadone, naltrexone pathways) plus psychosocial support outperforms detox-alone. Naloxone access is harm reduction, not enabling.

SBIRT in medical settings identifies unhealthy use early. Avoid stigma language; use person-first terms. Co-occurring psychiatric illness is the rule, not the exception—integrate care rather than bouncing patients between silos.`,
  },
  {
    test: /catatonia|lorazepam challenge|malignant catatonia|nms|neuroleptic malignant/i,
    prose: `**Catatonia & NMS.**

Catatonia presents with motor and behavioral signs (stupor, mutism, posturing, negativism, echolalia/praxia, excitement). The lorazepam challenge can be diagnostic and therapeutic; ECT treats refractory or malignant catatonia. Do not reflexively give high-potency antipsychotics as first treatment of unrecognized catatonia.

NMS is a rigid, febrile, autonomic emergency after dopamine blockade—stop the agent, support critically, and escalate. Distinguish from serotonin syndrome (clonus/hyperreflexia, serotonergic drug stacks). Both need medical hospitalization mindset, not “psych only.”`,
  },
  {
    test: /qtc|qt prolong|torsades|psychotropic|clozapine|anc |agranulocytosis/i,
    prose: `**Psychotropics safety.**

Many antipsychotics and some antidepressants prolong QTc—risk stacks with congenital long QT, bradycardia, female sex, electrolytes (K/Mg), and drug combinations. Check ECG when risk is high; correct electrolytes; rethink the regimen if QTc rises meaningfully or syncope appears.

Clozapine uniquely requires ANC monitoring and vigilance for myocarditis, seizures (dose-related), severe constipation/ileus, and smoking-related level shifts. These are not trivia—they are reasons clozapine saves lives only when systems monitoring is real.`,
  },
  {
    test: /hold|5150|involuntary|grave disability|capacity|decision-?making capacity/i,
    prose: `**Capacity & involuntary care.**

Capacity is decision-specific and fluctuating: understand, appreciate, reason, express a choice. Diagnosis alone does not equal incapacity. Emergency holds require jurisdictional criteria (danger to self/others or grave disability)—document facts, least restrictive alternatives, and medical clearance when indicated. Respect autonomy when the legal/ethical threshold is not met; do not use holds as disposition convenience.`,
  },
  {
    test: /dna replication|dna repair|mismatch|nucleotide excision|base excision|brca|microsatellite/i,
    prose: `**DNA replication & repair — textbook core.**

Replication fidelity depends on polymerase selectivity plus proofreading, then post-replicative repair. Mismatch repair defects cause microsatellite instability (Lynch-spectrum teaching). Nucleotide excision repair clears bulky UV adducts (xeroderma pigmentosum teaching). BRCA-associated homologous recombination repair failure sensitizes to PARP-inhibitor synthetic lethality concepts.

Cell-cycle checkpoints (ATM/ATR–p53 pathways) halt progression after damage. Unrepaired damage yields mutation, senescence, or apoptosis—the pathologic tradeoff underlying carcinogenesis and therapy.`,
  },
  {
    test: /ecm|integrin|metastasis|matrix metalloprotein|basement membrane/i,
    prose: `**ECM, integrins & invasion.**

Integrins couple extracellular matrix to cytoskeleton and survival signaling. Metastasis requires detachment, ECM degradation (MMPs), migration/invasion, intravasation, survival in transit, and colonization—each step is inefficient, which is why thousands of circulating cells rarely form clinical metastases. Epithelial–mesenchymal transition programs and angiogenesis support the process. Therapy implications appear in anti-angiogenic and adhesion/migration research, but the chapter skill is mechanistic sequencing.`,
  },
  {
    test: /mitochondrial genet|heteroplasm|maternal inheritance|oxphos disease|ragged red/i,
    prose: `**Mitochondrial genetics.**

mtDNA is maternally inherited, present in many copies, and tolerates heteroplasmy—phenotype depends on mutant load and tissue energy demand. OXPHOS complex defects hit brain, muscle, heart, and kidney early. Ragged-red fibers and lactic acidemia are classic muscle/metabolic clues. Distinguish mtDNA disease from nuclear-encoded mitochondrial protein defects (Mendelian inheritance).`,
  },
  {
    test: /cell cycle|cyclin|cdk|p53|apoptosis|necrosis|autophagy/i,
    prose: `**Cell cycle & death programs.**

Cyclin–CDK complexes drive G1→S→G2→M with inhibitors (CKIs) and checkpoint control. p53 integrates DNA damage into repair, arrest, or apoptosis. Necrosis is chaotic membrane failure with inflammation; apoptosis is ordered and usually quieter; autophagy recycles components under stress and can be adaptive or maladaptive. Cancer biology is often checkpoint failure plus apoptotic resistance.`,
  },
  {
    test: /ecg|interval|bundle branch|av block|pr segment|qrs|st elevation/i,
    prose: `**ECG intervals & blocks — textbook core.**

PR reflects AV conduction; QRS ventricular depolarization width; QT repolarization (correct for rate). AV blocks: 1° PR↑; 2° Mobitz I (Wenckebach) usually AV nodal; Mobitz II and 3° threaten infranodal escape—pace when unstable or high-risk. Bundle branch blocks widen QRS with characteristic morphology (RBBB rsR′, LBBB broad notched).

Ischemia patterns (STEMI territories) are time-critical. Always interpret ECG with electrolytes, drugs, and clinical syndrome—hyperkalemia, TCA overdose, and intracranial events create classic mimics.`,
  },
  {
    test: /neurodevelopmental|autism|adhd|intellectual disability|developmental delay/i,
    prose: `**Neurodevelopmental biology.**

Neurodevelopmental disorders reflect altered brain circuit maturation—genetic, epigenetic, and environmental contributions. Evaluation prioritizes hearing/vision, genetic consideration when indicated, and early intervention referrals. Autism features social-communication differences and restricted/repetitive behaviors; ADHD is impairing inattention/hyperactivity-impulsivity across settings. Regression is a red flag for metabolic/neurodegenerative or epileptic encephalopathies until evaluated.`,
  },
  {
    test: /altered mental status|delirium|encephalopath|coma|gcs /i,
    prose: `**Altered mental status.**

Delirium is acute fluctuating attention/awareness—find precipitants (infection, drugs, metabolic, CNS, urinary retention, pain, sensory deprivation). Hypoactive delirium is missed and deadly. Coma workups are ABC → glucose → focal signs → tox/metabolic panel → imaging/LP as indicated. GCS communicates severity but does not replace localization. Never call “psych” until medical encephalopathy is considered.`,
  },
  {
    test: /t cell activation|cd28|checkpoint|ctla|pd-?1|anergy/i,
    prose: `**T-cell activation & checkpoints.**

Signal 1 (TCR–MHC peptide) plus signal 2 (costimulation, e.g., CD28–B7) activates; antigen without costimulation favors anergy. CTLA-4 and PD-1 checkpoints restrain responses—blockade unleashes antitumor immunity and autoimmune toxicity. Tolerance failure explains autoimmunity; excessive tolerance/exhaustion explains chronic infection and tumor escape.`,
  },
  {
    test: /shock micro|lactate clearance|capillary refill|skin perfusion/i,
    prose: `**Microcirculation in shock.**

Macro-hemodynamics (BP, CO) can look acceptable while capillary exchange fails. Lactate and mottling/capillary refill track tissue perfusion better than a single BP number. Resuscitation targets differ by phenotype; chasing fluids in cardiogenic/obstructive shock worsens edema without restoring oxygen delivery.`,
  },
  {
    test: /thyroid nodule|bethesda|fn a|rln|recurrent laryngeal/i,
    prose: `**Thyroid nodule surgery decisions.**

Start with TSH and ultrasound risk features, then FNA with Bethesda cytopathology when indicated. Surgery counseling includes hypocalcemia (parathyroids) and recurrent laryngeal nerve injury risk. Not every nodule needs resection—risk-stratified pathways prevent unnecessary operations.`,
  },
  {
    test: /breast mass|triple assess|bi-?rads|mammograph/i,
    prose: `**Breast mass triple assessment.**

Clinical exam + age-appropriate imaging + tissue diagnosis. BI-RADS organizes imaging concern. A reassuring single modality is not enough when another modality is discordant—cancer risk management is systems thinking, not one test.`,
  },
  {
    test: /ventilator|assist control|pressure support|weaning|liberation/i,
    prose: `**Ventilator liberation mindset.**

Mode selection serves gas exchange and comfort while limiting ventilator-induced lung injury. Daily readiness assessment (oxygenation, hemodynamics, mental status, secretions) precedes spontaneous breathing trials. Failure to wean is a diagnosis list (cardiac, neuromuscular, oversedation, unresolved lung disease), not a moral failing.`,
  },
  {
    test: /acid-?base icu|delta.?delta|winter.?s formula|triple disorder/i,
    prose: `**Complex acid–base.**

In ICU, mixed disorders are common. Calculate expected compensation; if off, name the second process. Delta-delta reveals hidden metabolic alkalosis beside HAGMA. Always integrate fluids, losses (diarrhea/NG/lactate/ketoacids), and ventilator settings—ABGs without a story are numerology.`,
  },
];

export const DEEP_CATEGORY: { test: RegExp; prose: string }[] = [
  {
    test: /pathophysiol/i,
    prose: `**Pathophysiology deep frame.**

Every chapter should answer four questions in order: (1) What is the primary disrupted variable—pressure, flow, volume, compliance, diffusion, conduction, secretion, or immune recognition? (2) What compensatory systems activate, and what bedside signs do those compensations create? (3) When does compensation become maladaptive (e.g., vasoconstriction that worsens afterload, hyperventilation that exhausts muscles)? (4) Which measurement proves your mechanism (exam, waveform, lab, imaging, provocation)?

Write one causal sentence linking molecular/cellular change → organ dysfunction → patient finding. If you cannot, the section is still a summary, not a chapter.`,
  },
  {
    test: /clinical medicine|internal medicine|advanced clinical|family medicine/i,
    prose: `**Clinical medicine deep frame.**

Ward chapters are decision engines: recognize the syndrome, name the can’t-miss alternative, choose data that changes the branch, start therapy when delay harms, and reassess on a clock. Document the story so the next clinician can continue it. High-value care means fewer low-yield tests and more time-sensitive actions.

For each lesson, practice a 30-second verbal compact: diagnosis likelihood, danger if wrong, next three actions. That compact is how textbook knowledge becomes overnight cross-cover skill.`,
  },
  {
    test: /psychiatr|behavioral/i,
    prose: `**Psychiatry deep frame.**

Safety, syndrome, substrate (medical/substance), and supports (therapy, meds, social). Suicide risk assessment is a procedure: ideation, plan, intent, means, protective factors, and lethal-means counseling. Capacity and involuntary treatment follow legal criteria, not vibes. Medications are tools with measurable toxicities (QTc, NMS, serotonin syndrome, clozapine agranulocytosis)—monitoring is part of the prescription.`,
  },
  {
    test: /cell biology|molecular/i,
    prose: `**Cell/molecular deep frame.**

Track information flow (DNA→RNA→protein), quality control (repair, UPR, proteasome), and fate decisions (cycle, senescence, apoptosis). Disease is usually a broken control loop, not a single molecule floating alone. Tie each control loop to a cancer, degeneration, infection strategy, or drug target so the cell chapter predicts phenotypes.`,
  },
  {
    test: /anatom|embryo/i,
    prose: `**Anatomy/embryology deep frame.**

Structure is destiny only when relationships are explicit: what borders it, what traverses it, what happens if it is compressed, cut, or failed to form at a developmental week. Draw once from memory, then check. Cluster anomalies by embryologic field (pharyngeal apparatus, midgut rotation, neural crest) rather than memorizing isolated facts.`,
  },
  {
    test: /immunol/i,
    prose: `**Immunology deep frame.**

Innate sensing → antigen presentation → lymphocyte effector programs → regulation/resolution. Pathology is too little defense, too much defense, or defense aimed at self/graft. Map hypersensitivity types and complement pathways onto real diseases, and map checkpoint biology onto both cancer therapy and autoimmunity.`,
  },
  {
    test: /biochem/i,
    prose: `**Biochemistry deep frame.**

Compartmentation, cofactors, and regulation explain more clinical syndromes than enzyme names alone. Fed/fasting hormonal control flips entire pathway directions. When a toxin or vitamin deficiency appears in a vignette, ask which enzyme’s cofactor or thiol chemistry was hit—then the phenotype becomes inevitable.`,
  },
  {
    test: /pharmacol/i,
    prose: `**Pharmacology deep frame.**

Mechanism class → physiologic effect → toxicity fingerprint → PK vulnerabilities (CYP, renal function, distribution). Therapeutic index decides monitoring. Drug interactions are pathway collisions; learn the collision rules (QT, serotonin, CYP3A4/2D6, additive sedation) rather than infinite pairwise lists.`,
  },
  {
    test: /microbiol/i,
    prose: `**Microbiology deep frame.**

Virulence strategy and host niche predict syndrome better than taxonomy alone. Diagnostics start with pre-test probability and stain/culture/PCR appropriateness. Therapy without source control fails; therapy without stewardship breeds resistance. Always close the loop: organism → syndrome → controllable focus → shortest effective course.`,
  },
  {
    test: /epidemiolog|biostat/i,
    prose: `**Epidemiology deep frame.**

Numbers mean nothing without population and bias structure. Diagnostic metrics move with prevalence; treatment metrics should be expressed as absolute benefits (ARR/NNT) alongside relative ones. Screening programs need disease latency, acceptable false positives, and mortality benefit—not earlier diagnosis alone.`,
  },
  {
    test: /ethic|profession/i,
    prose: `**Ethics deep frame.**

Translate principles into procedures: capacity assessment steps, consent elements, confidentiality exceptions, error disclosure scripts, and triage criteria that are transparent and revisable. Professionalism includes documentation quality and speaking up for safety—ethics without operations is decoration.`,
  },
  {
    test: /surgery/i,
    prose: `**Surgery deep frame.**

Indication clarity, anatomy, physiologic reserve, and complication surveillance define operative care. The operation begins with preoperative optimization and ends only after leak/bleed/infection/ischemia windows are respected. Consent is a conversation about material risks and alternatives, not a signature.`,
  },
  {
    test: /pediatr/i,
    prose: `**Pediatrics deep frame.**

Age is a vital sign. Vital-sign norms, immune history, developmental trajectory, and caregiver systems change the differential every few months of life. Safety nets—vaccines, sleep, abuse screening, growth charts—are not “extra”; they are the pediatric method.`,
  },
  {
    test: /obstetric|gynecol/i,
    prose: `**OB/GYN deep frame.**

In obstetrics, maternal physiology shifts volume, coagulation, and airway risk; fetal considerations constrain imaging and drugs. Hemorrhage and hypertensive emergencies are protocolized for a reason—minutes matter. In gynecology, pregnancy testing is part of the abdominal/pelvic pain pathway for appropriate patients.`,
  },
  {
    test: /patholog/i,
    prose: `**Pathology deep frame.**

Gross and microscopic patterns are crystallized mechanisms. Link inflammation types, necrosis patterns, neoplasia features (invasion, dysplasia, metastasis hallmarks), and hemodynamic lesions to the clinical syndrome. Pathology vocabulary exists to make mechanism visible.`,
  },
];

export const DEEP_ORGAN: { test: RegExp; prose: string }[] = [
  {
    test: /cardiovascular/i,
    prose: `**Cardiovascular deep frame.**

Ischemia, arrhythmia, pump failure, valve lesions, pericardial constraint, and vascular obstruction are distinct failure modes. Mix-ups kill—e.g., fluids for tamponade/PE obstruction physiology, or nitrates in preload-dependent RV infarct. Always name the failure mode before the drug.`,
  },
  {
    test: /nervous|behavioral health/i,
    prose: `**Neuro/behavioral deep frame.**

Localize the lesion and tempo first. Hyperacute focal deficits are vascular until proven otherwise; fluctuating attention is delirium until proven otherwise; subacute psychiatric change still needs medical exclusion. For behavioral crises, safety and toxidromes precede personality theories.`,
  },
  {
    test: /multisystem/i,
    prose: `**Multisystem deep frame.**

Prefer one mechanism that explains many findings (sepsis, toxidrome, endocrine crisis, vasculitis, thrombotic microangiopathy, malignancy) over fragmented organ lists. Ask what test would falsify the unifying diagnosis today.`,
  },
  {
    test: /respirat/i,
    prose: `**Respiratory deep frame.**

Separate airway, parenchymal, vascular, pleural, and central drive problems. Match oxygen delivery tools to mechanism (not all hypoxemia is “more nasal cannula”). CO₂ retention and work of breathing tell you when ventilation support is needed.`,
  },
  {
    test: /renal/i,
    prose: `**Renal deep frame.**

Volume first, then filter, then tubules. Obstruction is reversible blindness if missed. Electrolyte and acid–base patterns are tubular poetry—read them as such, not as isolated lab fires.`,
  },
];
