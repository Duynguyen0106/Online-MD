/**
 * Keyword-triggered textbook enrichments for catalog chapter prose.
 * Matched against teaching-point + title text; multiple snippets may apply.
 */
const SNIPPETS: { test: RegExp; prose: string }[] = [
  {
    test: /glycolys|pfk|hexokinase|glucokinase|pyruvate kinase/i,
    prose: `**Glycolysis detail.** Glucose is trapped by hexokinase (most tissues; low Km) or glucokinase (liver/β-cell; high Km, inducible). The committed step is PFK-1, activated by fructose-2,6-bisphosphate and AMP and inhibited by ATP and citrate. Pyruvate kinase yields net ATP in the payoff phase. Under anaerobic conditions, lactate dehydrogenase regenerates NAD⁺ so glycolysis can continue—hence lactate rise in hypoperfusion. Pyruvate kinase deficiency impairs RBC ATP supply and is a classic cause of extravascular hemolysis teaching cases.`,
  },
  {
    test: /gluconeogenes|pepck|fructose-1,6|glucose-6-phosphatase/i,
    prose: `**Gluconeogenesis detail.** Irreversible glycolytic steps are bypassed by pyruvate carboxylase (biotin; mitochondrial) plus PEPCK, fructose-1,6-bisphosphatase, and glucose-6-phosphatase (liver/kidney). High NADH from ethanol metabolism stalls gluconeogenesis and predisposes to hypoglycemia. Cori and alanine cycles return lactate/alanine carbons to the liver.`,
  },
  {
    test: /tca|krebs|citric|anapleros|pdh|α-?ketoglutarate|alpha-?ketoglutarate/i,
    prose: `**TCA detail.** Acetyl-CoA condenses with oxaloacetate via citrate synthase. NADH/FADH₂ feed the electron transport chain. Anaplerosis (e.g., pyruvate carboxylase) refills intermediates drained for biosynthesis. PDH and α-KGDH need thiamine, lipoic acid, CoA, FAD, and NAD⁺—which is why thiamine deficiency and arsenic teaching links appear here.`,
  },
  {
    test: /etc|electron transport|oxidative phosphorylation|complex i|cytochrome|uncoupl/i,
    prose: `**ETC / OXPHOS detail.** Complexes I–IV transfer electrons to O₂ while pumping protons; ATP synthase uses the proton motive force. Inhibitors act at characteristic sites (e.g., cyanide/CO at complex IV; oligomycin at ATP synthase). Uncouplers dissipate the gradient as heat. Tissues with high ATP demand (CNS, heart) declare injury early when OXPHOS fails.`,
  },
  {
    test: /glycogen|debranch|glucose-6-phosphatase|von gierke|mcardle|pompe/i,
    prose: `**Glycogen detail.** Glycogen synthase and glycogen phosphorylase are reciprocally regulated by covalent modification and allosteric signals. Debranching enzyme defects and glucose-6-phosphatase deficiency (von Gierke) produce fasting hypoglycemia patterns; muscle phosphorylase deficiency (McArdle) limits exercise; lysosomal acid α-glucosidase deficiency (Pompe) is a different compartment problem.`,
  },
  {
    test: /fatty acid|beta-?oxid|carnitine|ketone|hmg-?coa/i,
    prose: `**Fatty acid / ketone detail.** Long-chain fatty acyl-CoAs require the carnitine shuttle to enter mitochondria. β-oxidation yields acetyl-CoA for TCA or ketogenesis (HMG-CoA synthase pathway) in hepatic mitochondria during fasting. Hypoketotic hypoglycemia suggests fatty-acid oxidation defects; ethanol and insulin excess suppress ketogenesis.`,
  },
  {
    test: /urea cycle|ornithine|citrulline|argininosuccin|hyperammon/i,
    prose: `**Urea cycle detail.** Ammonia is detoxified to urea via CPS1, OTC, argininosuccinate synthase/lyase, and arginase. OTC deficiency is the classic X-linked urea-cycle disorder with hyperammonemia and low citrulline. Treat teaching cases by stopping protein load, providing calories, and using nitrogen scavengers/dialysis per protocol—while remembering the enzyme logic.`,
  },
  {
    test: /stemi|nste|acs|troponin|reperfusion|door-to-balloon|fibrinolys/i,
    prose: `**ACS detail.** Obtain ECG within minutes of arrival. STEMI pathways prioritize emergent reperfusion (PCI preferred when timely; fibrinolysis when PCI cannot be delivered in time and no contraindications). NSTE-ACS uses risk stratification, antiplatelet/anticoagulant therapy, and selective invasive timing. Dual antiplatelet therapy, anticoagulation, and caution with nitrates in right-ventricular infarct or PDE-5 inhibitor use are high-yield safety points.`,
  },
  {
    test: /\bsepsis\b|vasopressor|norepinephrine|source control|qsofa|septic shock/i,
    prose: `**Sepsis detail.** Early recognition pairs suspected infection with organ dysfunction. Cultures precede antibiotics when they do not delay therapy. Empiric coverage should match likely source and local resistance; fluids and norepinephrine are first-line supports in septic shock after/with volume assessment; source control is not optional when an abscess, obstruction, or necrotic focus exists.`,
  },
  {
    test: /dka|hhs|anion gap|insulin infusion|keto/i,
    prose: `**DKA/HHS detail.** Both feature insulin deficiency/resistance plus counter-regulatory hormones. DKA adds ketogenesis and anion-gap acidosis; HHS features extreme hyperglycemia/hyperosmolality with minimal ketones. Fluids first, check/replete potassium before/with insulin, close the anion gap in DKA before transitioning to subcutaneous insulin, and search for precipitants (infection, ischemia, missed doses).`,
  },
  {
    test: /hyponatremia|siadh|osmolality|hypertonic saline|ods|central pontine/i,
    prose: `**Hyponatremia detail.** Start with serum osmolality, then urine Na/osmolality and volume status. Severe neurologic symptoms may require careful hypertonic saline; overly rapid correction risks osmotic demyelination. SIADH is euvolemic hypo-osmolar hyponatremia with inappropriately concentrated urine—treat the cause and restrict free water as indicated.`,
  },
  {
    test: /aki|atn|prerenal|dialysis|aeiou|creatinine/i,
    prose: `**AKI detail.** Classify prerenal, intrinsic (often ATN), and post-renal causes. Volume status, nephrotoxin review, and obstruction imaging are early moves. Urgent dialysis indications are recalled by AEIOU (acidosis, electrolytes, intoxications, overload, uremia). Holding ACE inhibitors/ARBs/NSAIDs during hypovolemia prevents compounding injury.`,
  },
  {
    test: /copd|asthma|bronchodil|spo2|niv|noninvasive/i,
    prose: `**Obstructive lung detail.** COPD exacerbations use controlled oxygen targets (often SpO₂ ~88–92%), bronchodilators, systemic steroids, and antibiotics when indicated; NIV helps selected hypercapnic failures. Asthma exacerbations emphasize repeated SABA, early steroids, and escalation (Mg, ICU) for severe obstruction. Inhaler technique is part of therapy, not an afterthought.`,
  },
  {
    test: /pe |pulm(?:onary)? embol|wells|ctpa|d-?dimer/i,
    prose: `**PE detail.** Pretest probability (Wells/Gestalt) guides D-dimer versus direct CTPA/VQ imaging. Massive PE presents with hypotension; submassive features right-heart strain. Anticoagulation is the default when suspicion is high and bleeding risk acceptable; systemic thrombolysis is reserved for selected high-risk presentations.`,
  },
  {
    test: /stroke|tpa|tnk|last known well|ich|intracranial/i,
    prose: `**Stroke detail.** Establish last known well, check glucose, and image to exclude hemorrhage before reperfusion. Thrombolysis windows are time-bound; large-vessel occlusion may need endovascular therapy. BP targets differ pre- and post-thrombolysis. Do not give antiplatelets until bleed is excluded when reperfusion is planned.`,
  },
  {
    test: /appendic|cholecyst|murphy|periton|acute abdomen|sbo|bowel obstruct/i,
    prose: `**Acute abdomen detail.** Peritonitis with instability may need operative exploration without endless imaging. Appendicitis combines clinical probability with selective imaging. Cholecystitis is often ultrasound-first; cholangitis adds Charcot/Reynolds urgency. SBO needs decompression, fluids, and vigilance for closed-loop/ischemia indications to operate.`,
  },
  {
    test: /preeclampsia|eclampsia|hellp|magnesium|postpartum hemorrhage|uterotonic/i,
    prose: `**Obstetric emergency detail.** Preeclampsia is hypertension plus proteinuria or end-organ findings; severe features escalate magnesium for seizure prophylaxis and plans toward delivery. HELLP overlaps. Postpartum hemorrhage follows the 4 Ts (tone, tissue, trauma, thrombin): bimanual massage and uterotonics first, with early escalation to procedures/transfusion.`,
  },
  {
    test: /suicid|serotonin syndrome|nms|lithium|alcohol withdraw|ciwa|benzo/i,
    prose: `**Psychiatry emergency detail.** Ask directly about ideation, plan, intent, and means; safety planning and lethal-means counseling are clinical acts. Serotonin syndrome features clonus/hyperreflexia; NMS features rigidity and fever after antipsychotics. Lithium toxicity rises with dehydration and interacting drugs. Alcohol withdrawal is treated with symptom-triggered benzodiazepines and thiamine.`,
  },
  {
    test: /action potential|phase 0|sodium channel|repolariz|qt |torsad/i,
    prose: `**Cardiac electrophysiology detail.** Phase 0 depends on fast Na⁺ current in ventricular myocytes; plateau currents and delayed rectifier K⁺ currents govern duration. Drug- or electrolyte-induced QT prolongation predisposes to torsades. Class I/III antiarrhythmics alter these currents with predictable ECG footprints and proarrhythmia risks.`,
  },
  {
    test: /starling|preload|afterload|contractility|cardiac output|ejection fraction/i,
    prose: `**CV physiology detail.** Cardiac output is heart rate × stroke volume; stroke volume depends on preload, afterload, and contractility. Frank–Starling describes preload-responsive stroke volume until the flat portion of the curve. Afterload reduction can raise stroke volume in failing hearts; vasopressors and inotropes must be matched to the shock phenotype.`,
  },
  {
    test: /gfr|clearance|tubular|aldosterone|adh|vasopressin|renin/i,
    prose: `**Renal physiology detail.** GFR depends on hydrostatic/oncotic pressures in the glomerular capillary and filtration surface. Tubular handling of Na⁺, water, and solutes creates the concentrating mechanism. RAAS and ADH adjust volume and osmolality; their dysregulation explains many edema, hypertension, and hyponatremia syndromes.`,
  },
  {
    test: /mhc|hla|t cell|b cell|cytokine|complement|hypersensitivity/i,
    prose: `**Immunology detail.** Innate defenses act first; adaptive immunity adds specificity and memory. MHC I/II present antigen to T cells; B cells produce antibody. Hypersensitivity types I–IV organize many disease mechanisms; complement cascades amplify inflammation and lysis but can injure host tissues when misdirected.`,
  },
  {
    test: /receptor|gpcr|tyrosine kinase|second messenger|camp|ip3|dag/i,
    prose: `**Signaling detail.** GPCRs couple through Gs/Gi/Gq to cAMP or IP₃/DAG pathways. Receptor tyrosine kinases autophosphorylate and recruit Ras–MAPK and PI3K–AKT cascades. Nuclear receptors alter transcription directly. Amplification explains why small ligand signals produce large physiologic changes—and why pathway inhibitors are potent drugs.`,
  },
  {
    test: /adme|cytochrome|cyp|half-?life|clearance|volume of distribution/i,
    prose: `**Pharmacology detail.** ADME governs onset and duration: absorption, distribution (Vd), metabolism (often CYP-mediated), and excretion. Half-life informs dosing interval; clearance informs steady-state dosing rate. Induction/inhibition of CYP enzymes creates clinically important drug–drug interactions.`,
  },
];

export function factualEnrichment(text: string): string {
  const hits: string[] = [];
  for (const snip of SNIPPETS) {
    if (snip.test.test(text) && !hits.includes(snip.prose)) {
      hits.push(snip.prose);
    }
  }
  return hits.join("\n\n");
}

/** Collect unique enrichments for an entire topic (title + all points). */
export function factualEnrichmentForTopic(topic: {
  title: string;
  points: string[];
  quizExplain: string;
  cardBack: string;
}): string {
  return factualEnrichment(
    [topic.title, topic.quizExplain, topic.cardBack, ...topic.points].join(" \n "),
  );
}
