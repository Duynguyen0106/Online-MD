/**
 * Dense multi-paragraph textbook banks for domains that were under-enriched.
 * Imported by factual-enrichment.ts and merged into topic enrichment.
 * Target: category/organ banks dense enough that nearly all topics reach ≥8k enrichment characters.
 */

export const DEEP_SNIPPETS: { test: RegExp; prose: string }[] = [
  {
    test: /mse|mental status|psychosis|delusion|hallucin|thought disorder|first-?episode/i,
    prose: `**Psychosis & mental status examination — textbook chapter.**

The mental status exam is a structured neurologic examination of mind. Systematically record appearance and behavior, speech (rate, volume, prosody), mood (patient-reported) versus affect (observed range and congruence), thought process (goal-directed, tangential, circumstantial, loosening, flight of ideas), thought content (obsessions, delusions, suicidal or homicidal ideation), perception (hallucinations, illusions, depersonalization), cognition (orientation, attention, memory, abstraction), insight, and judgment. A complete note separates *syndrome* (psychosis, mania, delirium, catatonia, major depression) from *cause* (primary psychiatric illness versus substance, medication, or medical encephalopathy). Premature labeling of “schizophrenia” on day one of a first episode delays reversible workups and stigmatizes the differential.

Psychosis means impaired reality testing—typically delusions, hallucinations, and/or disorganized thought or behavior—without committing to a lifelong diagnosis. First-episode evaluation always excludes delirium and encephalopathy, intoxication and withdrawal, CNS infection, autoimmune encephalitis red flags (subacute psychosis with seizures, autonomic instability, or movement abnormalities), endocrine and metabolic crises (thyroid storm or myxedema, hypercalcemia, hyponatremia, hepatic or uremic encephalopathy), structural lesions when focal signs exist, and medication effects (steroids, anticholinergics, dopaminergic agents). Safety assessment is concurrent: agitation plan, elopement risk, and suicidal or homicidal ideation with means.

Thought-form disorders are described, not paraphrased into vague “disorganized.” Document concrete speech samples when possible. Delusions are fixed false beliefs held with conviction despite contrary evidence; note theme (persecutory, referential, grandiose, somatic, erotomanic) and whether they are mood-congruent. Hallucinations are perceptions without external stimulus; auditory hallucinations in clear sensorium differ mechanistically and prognostically from visual hallucinations in delirium. Negative symptoms (avolition, alogia, anhedonia, flat affect) must be distinguished from depression, sedation, and negative symptoms of chronic institutionalization.

Treat agitation with the least restrictive effective approach: verbal de-escalation, offer oral medication when safe, then intramuscular pathways if needed—avoid stacking respiratory depressants, and reassess after each intervention. Early coordinated specialty care, family psychoeducation, and substance-use assessment improve trajectories. Families are collateral historians and allies, not optional visitors. When antipsychotics are started, document target symptoms, metabolic baseline, QTc risk factors, and a follow-up plan—psychosis chapters that stop at “start risperidone” are incomplete.

Discriminate schizophrenia-spectrum illness from mood disorders with psychosis by polarity history, not by the presence of hallucinations alone. Brief psychotic disorder and substance-induced psychosis have time-limited courses when the trigger remits; schizophreniform and schizophrenia diagnoses require duration and functional criteria. Catatonia may coexist and changes the first medication choice. Always reassess medical status when the sensorium waxes and wanes—psychosis in clear consciousness differs from delirium with psychotic features. Mastery is a one-sentence problem representation that includes syndrome, duration, substances, medical rule-outs, and risk.`,
  },
  {
    test: /mood disorder|mdd|bipolar|mania|depression|phq|antidepressant|ssri|snri|ect /i,
    prose: `**Mood disorders — textbook chapter.**

Major depressive disorder is a syndrome of persistent low mood and/or anhedonia plus neurovegetative and cognitive features causing clinically significant impairment. Specifiers (anxious distress, mixed features, melancholic, atypical, psychotic, seasonal, peripartum) change prognosis and treatment urgency. Severity screening tools such as the PHQ-9 quantify symptom burden and track response; they do not replace a clinical interview that explores suicide risk, psychosis, bipolar history, substances, medical mimics, and functional collapse. Ask specifically about sleep, appetite, energy, concentration, guilt/worthlessness, psychomotor change, and recurrent thoughts of death—then ask about plan, intent, means, protective factors, and lethal-means access.

An adequate antidepressant trial requires sufficient dose and duration before declaring failure; many “treatment-resistant” labels reflect underdosing, nonadherence, unrecognized bipolarity, ongoing substances, or untreated sleep apnea and thyroid disease. Psychotherapy (CBT, IPT, and related structured therapies) is first-line alone or combined for many patients. Augmentation and switching strategies belong after a true trial, not after three days of side effects without psychoeducation.

Mania and hypomania redefine the illness as bipolar spectrum. Grandiosity, decreased need for sleep, pressured speech, racing thoughts, distractibility, increased goal-directed activity, and risky behavior are the core cluster; hospitalization often turns on dangerousness, psychosis, or inability to care for self. Do not use antidepressant monotherapy in mania or in bipolar depression without an antimanic anchor. Acute mania prioritizes sleep restoration, safety, and antimanic medication strategies (mood stabilizer ± antipsychotic per context and medical comorbidities). Mixed features raise suicide risk and complicate antidepressant choices.

ECT remains highly effective for severe, psychotic, catatonic, or treatment-resistant depression and some manic states; consent conversations should cover efficacy, transient cognitive effects, and anesthetic risk rather than cultural myths. Always exclude medical mimics (hypothyroidism, B12 deficiency, sleep apnea, substances, interferon and other meds) and ask about postpartum timing when relevant. Mood chapters earn their keep when the learner can write a problem representation that includes polarity, psychosis, suicide risk, and medical rule-outs in one sentence.

Measurement-based care means repeating a severity scale and a side-effect review at follow-up, not only asking “how are you?” Maintenance treatment duration after a first episode differs from recurrent illness; premature discontinuation drives relapse. Light therapy, sleep scheduling, and behavioral activation are mechanism-based adjuncts, not soft extras. When psychotic features accompany depression, treat the psychosis and the mood disorder with a plan that does not leave the patient on indefinite high-dose antipsychotics without review. Bipolar depression pathways prioritize mood stabilizers and evidence-based combinations over antidepressant monotherapy.`,
  },
  {
    test: /trauma.?related|ptsd|borderline|personality disorder|dbs|validation|self-?harm/i,
    prose: `**Trauma-related disorders & personality crisis care — textbook chapter.**

PTSD follows exposure to actual or threatened death, serious injury, or sexual violence and organizes into intrusion (re-experiencing, nightmares, flashbacks), avoidance, negative alterations in cognition and mood, and marked arousal/reactivity. Duration and functional impairment distinguish the disorder from expected acute stress. Trauma-focused psychotherapies are first-line; long-term benzodiazepines are poor chronic therapy because they impair extinction learning and carry dependence risk. Pharmacologic adjuncts may help sleep, nightmares, or comorbid depression, but the core skill is a coherent trauma history without forcing disclosure beyond what the patient can tolerate in session.

Acute crisis care for borderline personality pathology emphasizes validation, clarity of limits, and structured skills (distress tolerance, emotion regulation, interpersonal effectiveness from DBT concepts) over polypharmacy cascades. Affective instability, identity disturbance, frantic efforts to avoid abandonment, and recurrent self-injury are interpersonal and affective regulation problems—not merely “attention-seeking.” Safety planning for self-harm is concrete: triggers, early warning signs, coping steps, people to contact, emergency pathways, and lethal-means counseling, with a scheduled follow-up. Cluster labels can help team communication but must not replace functional assessment of relationships, work, and risk.

Comorbid substance use, mood disorders, and PTSD are common—treat what is immediately dangerous first (withdrawal seizures, active suicidal plan, psychosis), then what is most impairing. Dissociation during trauma recall is managed with grounding and paced exposure, not endless open-ended processing without skills. Document capacity, voluntary status, and the rationale for any hold. The chapter outcome is a clinician who can sit with intense affect, name the interpersonal pattern, and still run a medical differential for overdose, head injury, and toxidromes.`,
  },
  {
    test: /addiction|substance|oud|aud|withdrawal|naloxone|buprenorph|methadone|contingency/i,
    prose: `**Addiction medicine — textbook chapter.**

Substance use disorders are chronic, relapsing conditions involving compulsive use despite harm, craving, and loss of control. Neurobiologically, they engage dopaminergic learning circuits, stress systems, and executive-control networks—useful for reducing stigma, not for therapeutic nihilism. Separate intoxication, withdrawal, and the use disorder itself. Alcohol and benzodiazepine withdrawal can seize and kill; opioid withdrawal is miserable and destabilizing but usually not directly lethal in otherwise healthy adults—yet precipitated withdrawal from naloxone or naltrexone can be severe and must be anticipated.

For opioid use disorder, medication treatment with buprenorphine, methadone, or extended-release naltrexone plus psychosocial support outperforms detox-alone. Buprenorphine requires attention to last opioid use and COWS staging to avoid precipitated withdrawal; methadone is dispensed in regulated settings with QT and respiratory-depression vigilance; naltrexone demands a true opioid-free window. Naloxone access is harm reduction, not “enabling.” For alcohol use disorder, naltrexone, acamprosate, and selected other agents join motivational interviewing and mutual-help pathways; thiamine precedes glucose in the at-risk patient to prevent Wernicke encephalopathy.

SBIRT in medical settings identifies unhealthy use early. Use person-first language and avoid moralizing. Co-occurring psychiatric illness is the rule—integrate care rather than bouncing patients between silos. Pain management in patients with OUD requires honesty, multimodal non-opioid strategies when possible, and clear agreements rather than abrupt abandonment. Contingency management and measurement-based follow-up improve retention. The mastery skill is matching the pharmacology of the substance to the physiology of withdrawal and the social determinants that sustain use.`,
  },
  {
    test: /catatonia|lorazepam challenge|malignant catatonia|nms|neuroleptic malignant/i,
    prose: `**Catatonia & neuroleptic malignant syndrome — textbook chapter.**

Catatonia is a motor and behavioral syndrome that cuts across mood, psychotic, medical, and autism-spectrum diagnoses. Classic signs include stupor, catalepsy, waxy flexibility, mutism, negativism, posturing, mannerisms, stereotypy, agitation, grimacing, echolalia, and echopraxia. Excited catatonia can look like undifferentiated agitation; retarded catatonia can look like depression or obtundation. The lorazepam challenge can be both diagnostic and therapeutic—marked improvement supports the diagnosis and guides standing benzodiazepine treatment. ECT treats refractory or malignant catatonia. Do not reflexively administer high-potency antipsychotics as first treatment of unrecognized catatonia; dopamine blockade can worsen the syndrome.

Malignant catatonia and NMS share fever, rigidity, and autonomic instability and are medical emergencies. NMS follows dopamine blockade (antipsychotics, antiemetics with D2 antagonism) and features lead-pipe rigidity, elevated CK, leukocytosis, and fluctuating consciousness. Management: stop the offending agent, support airway and circulation, cool, hydrate, and escalate to ICU care; dantrolene, bromocriptine, or ECT enter selected pathways. Distinguish serotonin syndrome (clonus, hyperreflexia, shivering, serotonergic drug stacks) by neuromuscular findings and exposure history. Both require a medical hospitalization mindset, not “psych only.” Document medication timelines carefully—the differential lives in the medication administration record.`,
  },
  {
    test: /qtc|qt prolong|torsades|psychotropic|clozapine|anc |agranulocytosis/i,
    prose: `**Psychotropic cardiac & hematologic safety — textbook chapter.**

Many antipsychotics and some antidepressants prolong ventricular repolarization (QTc). Risk stacks with congenital long QT, bradycardia, female sex, electrolyte depletion (potassium, magnesium), structural heart disease, and drug combinations (other QT-prolonging agents, CYP inhibitors that raise levels). Check ECG when risk is high or symptoms (syncope, palpitations) appear; correct electrolytes; rethink the regimen if QTc rises meaningfully. Torsades de pointes is a polymorphic VT in the setting of long QT—acute management includes magnesium and unstable-patient ACLS pathways while removing offenders.

Clozapine uniquely requires ANC monitoring because of agranulocytosis risk, and vigilance for myocarditis (early fever, tachycardia, troponin/CRP changes), dose-related seizures, severe constipation progressing to ileus, orthostasis, sialorrhea, and smoking-related shifts in drug levels (smoking induces CYP1A2; cessation raises levels). Metabolic monitoring (weight, glucose, lipids) applies broadly to second-generation antipsychotics. These safety systems are why clozapine saves lives in treatment-resistant schizophrenia only when labs and bowel regimens are real, not theoretical. Teach patients and families the fever and infection warning signs that trigger same-day contact.`,
  },
  {
    test: /hold|5150|involuntary|grave disability|capacity|decision-?making capacity/i,
    prose: `**Decision-making capacity & involuntary care — textbook chapter.**

Capacity is decision-specific and can fluctuate with delirium, intoxication, psychosis, and pain. The four elements: understand the relevant information, appreciate the situation and consequences, reason about options, and express a consistent choice. Diagnosis alone does not equal incapacity; a patient with schizophrenia may retain capacity for many medical decisions. Document the conversation, the patient’s words, and why the threshold was or was not met. When capacity is lacking for a needed decision, identify the appropriate surrogate and emergency exceptions.

Involuntary psychiatric holds require jurisdictional criteria—typically danger to self, danger to others, or grave disability—supported by facts, not vibes. Document least restrictive alternatives attempted, collateral information, and medical clearance when indicated (toxidrome, head injury, metabolic crisis). Do not use holds as disposition convenience for homelessness or personality conflict when legal criteria are absent. Respect autonomy when thresholds are not met; continue voluntary engagement, safety planning, and outpatient linkage. Ethics chapters become clinical skills when the learner can write a capacity note and a hold narrative that would survive peer review.`,
  },
  {
    test: /dna replication|dna repair|mismatch|nucleotide excision|base excision|brca|microsatellite/i,
    prose: `**DNA replication & repair — textbook chapter.**

Replication fidelity depends on polymerase base selectivity, 3′→5′ proofreading exonuclease activity, and post-replicative repair. Helicases unwind; primase lays RNA primers; leading-strand synthesis is continuous while lagging-strand Okazaki fragments require ligase sealing. Topoisomerases relieve torsional strain—explaining why topoisomerase inhibitors create lethal DNA damage in dividing cells. Origins of replication and checkpoint control couple DNA synthesis to cell-cycle progression.

Mismatch repair (MMR) corrects replication errors; germline MMR defects underlie Lynch syndrome teaching and microsatellite instability phenotypes. Nucleotide excision repair clears bulky adducts such as UV-induced pyrimidine dimers; xeroderma pigmentosum illustrates failure of this pathway with extreme UV cancer risk. Base excision repair handles oxidative and deamination damage via glycosylases and AP endonuclease. Double-strand breaks are repaired by non-homologous end joining (error-prone, available throughout the cycle) or homologous recombination (accurate, needs a sister chromatid in S/G2). BRCA1/2-associated homologous recombination failure sensitizes tumors to PARP-inhibitor synthetic lethality—mechanism that only makes sense if learners understand unrepaired single-strand breaks becoming double-strand breaks in BRCA-deficient cells.

ATM/ATR–CHK and p53 pathways halt the cycle after damage, allowing repair or apoptosis. Unrepaired damage yields mutation, senescence, or cell death—the pathologic tradeoff underlying carcinogenesis, aging phenotypes, and cytotoxic therapy. Clinical vignettes often hide in sun sensitivity, colon cancer pedigrees, breast/ovarian cancer clusters, and chemotherapy mechanism questions; answer them from the repair map, not memorized disease lists alone.

Polymerase errors, spontaneous deamination of cytosine to uracil, and oxidative 8-oxoguanine lesions are daily threats even without mutagens. Translesion polymerases trade accuracy for continuity when forks stall—another source of mutation under replication stress. Telomere maintenance and ALT pathways matter in cancer immortality teaching. Fanconi anemia pathway defects link cross-link repair failure to bone-marrow failure and cancer predisposition. When a Step-style stem mentions “microsatellite instability” or “homologous recombination deficiency,” map it to MMR versus BRCA-pathway biology before picking the drug or syndrome answer.`,
  },
  {
    test: /ecm|integrin|metastasis|matrix metalloprotein|basement membrane/i,
    prose: `**Extracellular matrix, integrins & invasion — textbook chapter.**

The extracellular matrix (ECM) is not inert scaffolding; it stores growth factors, sets stiffness cues, and provides adhesion ligands. Integrins are heterodimeric receptors that couple ECM to the cytoskeleton and to survival signaling (FAK, Src, MAPK, PI3K pathways). Loss of anchorage can trigger anoikis in normal epithelia; cancer cells often evade this checkpoint. Basement membrane integrity separates in situ neoplasia from invasive carcinoma—the histologic line that changes stage and therapy.

Metastasis is a multi-step cascade: detachment and EMT programs, ECM degradation by matrix metalloproteinases and other proteases, migration and local invasion, intravasation, survival in circulation (platelets and clotting pathways help), arrest and extravasation, and colonization of a distant niche. Each step is inefficient, which is why thousands of circulating tumor cells rarely form clinical metastases. Angiogenesis and lymphangiogenesis support growth beyond diffusion limits; VEGF-axis biology explains both tumor vascularity and anti-angiogenic drug concepts. Organotropism (e.g., prostate to bone) reflects receptor–ligand and niche compatibility, not random lodging alone.

Therapy implications appear in anti-angiogenic strategies, adhesion/migration research, and the recognition that micrometastatic disease may already exist at diagnosis. The chapter skill is mechanistic sequencing: given a vignette of invasion or a histology description of breached basement membrane, reconstruct which molecular programs must be active and which host barriers failed.`,
  },
  {
    test: /mitochondrial genet|heteroplasm|maternal inheritance|oxphos disease|ragged red/i,
    prose: `**Mitochondrial genetics & OXPHOS disease — textbook chapter.**

Mitochondrial DNA is circular, maternally inherited, present in many copies per cell, and encodes a subset of OXPHOS subunits plus mitochondrial tRNAs and rRNAs. Heteroplasmy—the mixture of mutant and wild-type mtDNA—means phenotype depends on mutant load and tissue energy demand. Threshold effects explain why the same mutation can be silent in one tissue and catastrophic in another. High-demand organs (brain, muscle, heart, kidney, retina) declare disease early.

Classic teaching syndromes (MELAS, MERRF, LHON, Kearns–Sayre, NARP) illustrate point mutations versus large deletions and variable heteroplasmy. Ragged-red fibers on Gomori trichrome and lactic acidemia are muscle/metabolic clues to respiratory-chain failure. Nuclear-encoded mitochondrial protein defects follow Mendelian inheritance—critical when counseling families who assume all mitochondrial disease is maternal. Toxins and drugs (nucleoside reverse-transcriptase inhibitors historically, others) can injure mitochondria iatrogenically.

Clinically, think mitochondrial disease with stroke-like episodes in young patients without typical vascular territories, unexplained multi-organ energy failure, maternal pedigree patterns, and combinations of myopathy, neuropathy, diabetes, and hearing loss. Management is largely supportive and complication-focused; the educational payoff is inheritance logic plus recognizing energy failure physiology (lactate rise, exercise intolerance, encephalopathy).`,
  },
  {
    test: /cell cycle|cyclin|cdk|p53|apoptosis|necrosis|autophagy/i,
    prose: `**Cell cycle & death programs — textbook chapter.**

Cyclin–CDK complexes drive ordered progression G1→S→G2→M. G1 cyclins prepare the DNA replication machinery; cyclin A/E–CDK2 supports S phase; cyclin B–CDK1 drives mitosis. CDK inhibitors (CKIs) of the INK4 and CIP/KIP families brake the cycle. Restriction-point control integrates growth-factor signaling through the Rb–E2F axis: hypophosphorylated Rb restrains E2F; progressive CDK phosphorylation releases E2F transcriptional programs. DNA-damage checkpoints (ATM/ATR → CHK kinases → p53 and CDC25 regulation) halt progression to allow repair.

p53 integrates genotoxic and oncogenic stress into transient arrest, senescence, or apoptosis via transcriptional targets (p21, BAX, PUMA, and others) and cytoplasmic actions. MDM2 ubiquitinates p53; ARF antagonizes MDM2—explaining why these nodes are hotspots in cancer genetics. Necrosis is chaotic membrane failure with inflammation and danger-signal release; apoptosis is ordered caspase-mediated dismantling usually quieter to neighbors; necroptosis and pyroptosis are regulated lytic deaths with inflammatory payloads. Autophagy recycles organelles and proteins under nutrient stress via ULK1, Beclin, and LC3–autophagosome machinery; it can be adaptive survival or, when exhausted, a prelude to death.

Cancer biology is often checkpoint failure plus apoptotic resistance plus metabolic rewiring. Therapy exploits these differences: cytotoxic agents create damage that competent p53 networks convert into death; resistant clones disable the network. Ischemic infarction teaches coagulative necrosis patterns; viral hepatitis teaches apoptosis in contiguous hepatocytes. Mastery means naming which death program fits the histology and which cycle node a drug or mutation hits.`,
  },
  {
    test: /ecg|interval|bundle branch|av block|pr segment|qrs|st elevation/i,
    prose: `**ECG intervals, blocks & ischemia patterns — textbook chapter.**

The ECG is a voltage–time map of atrial and ventricular depolarization and repolarization. PR interval reflects AV nodal and His-Purkinje conduction delay from atrial activation to ventricular onset; QRS width reflects ventricular conduction synchrony; QT interval reflects ventricular repolarization and must be rate-corrected (QTc) with awareness of measurement pitfalls in wide-QRS rhythms. Axis and precordial transition help localize fascicular blocks and chamber enlargement.

AV blocks: first-degree is PR prolongation alone; second-degree Mobitz I (Wenckebach) typically shows progressive PR lengthening then a dropped QRS and is often AV-nodal (better prognosis, vagal contexts); Mobitz II shows sudden drops without progressive PR lengthening and threatens infranodal escape—pace when unstable or high-risk; third-degree is complete dissociation with escape rhythm width hinting at nodal versus ventricular escape. Bundle branch blocks widen QRS with characteristic morphology (RBBB rsR′ in V1; LBBB broad notched or slurred lateral leads) and can mask or mimic ischemia patterns.

STEMI territories map roughly to coronary distributions: anterior (V1–V4, LAD), inferior (II, III, aVF, often RCA), lateral (I, aVL, V5–V6). Always interpret with electrolytes, drugs, and clinical syndrome—hyperkalemia (peaked T, P flattening, sine wave), TCA overdose (wide QRS, R in aVR), digoxin effect, and intracranial events create classic mimics. Compare to priors when available. The chapter skill is linking each interval abnormality to an anatomic conduction site and an urgent versus expectant action.

Right-heart strain patterns, Brugada morphology warnings, and paced rhythms have their own traps—do not diagnose STEMI from a ventricular paced complex without Sgarbossa-aware reasoning. Artifact from tremor or Parkinsonian movement can mimic ventricular tachycardia; check the patient. Lead misplacement (limb lead reversal) creates inverted P/QRS in unexpected leads—reposition before consulting. For AV block, atropine and ischemia context matter for nodal disease, while infranodal disease needs pacing readiness. Teach every learner to measure intervals manually once per week until pattern recognition is trustworthy.`,
  },
  {
    test: /neurodevelopmental|autism|adhd|intellectual disability|developmental delay/i,
    prose: `**Neurodevelopmental biology — textbook chapter.**

Neurodevelopmental disorders reflect altered brain circuit maturation from genetic, epigenetic, and environmental contributions. Evaluation prioritizes hearing and vision, growth and dysmorphology, genetic consideration when indicated (especially with anomalies, family history, or severe ID), seizure history, sleep, and early intervention referrals. Developmental delay is a description of trajectory; intellectual disability requires deficits in intellectual and adaptive function with onset in the developmental period.

Autism spectrum disorder features persistent social-communication differences and restricted, repetitive patterns of behavior or interests, with or without language delay and intellectual disability. ADHD is impairing inattention and/or hyperactivity-impulsivity across settings, documented by history and collateral—not by a single office observation. Regression—loss of previously acquired skills—is a red flag for epileptic encephalopathies, metabolic/neurodegenerative disease, and autoimmune or infectious CNS processes until evaluated.

Early intervention (speech, OT, PT, behavioral supports) changes trajectories more than waiting for a “clear diagnosis.” Psychopharmacology, when used, targets impairing comorbidity (ADHD, irritability, sleep, anxiety) with monitoring for appetite, growth, tics, and mood switching. The pediatric method uses age as a vital sign: expected milestones define the differential and the urgency of imaging or metabolic labs.`,
  },
  {
    test: /altered mental status|delirium|encephalopath|coma|gcs /i,
    prose: `**Altered mental status, delirium & coma — textbook chapter.**

Delirium is an acute disturbance of attention and awareness that fluctuates, often worse at night, with additional cognitive change. It is a medical emergency marker, not a personality change. Hypoactive delirium is under-recognized and associated with poor outcomes; hyperactive delirium draws more attention but is not “worse” by definition. Precipitants include infection, drugs and withdrawal, metabolic derangements, CNS disease, urinary retention, constipation, pain, hypoxia, and sensory deprivation. Prevention and treatment target the cause plus reorientation, sleep–wake restoration, early mobility, and cautious, indication-driven medication when distress or danger requires it.

Coma evaluation is ABC first, then glucose, then a focused neurologic exam for lateralizing signs, brainstem reflexes, and meningismus, concurrent with toxic-metabolic labs and targeted imaging or LP. The Glasgow Coma Scale communicates severity for trauma teams but does not replace localization. Structural coma (mass lesion, herniation) versus metabolic/toxic coma (usually symmetric, preserved pupils until late) is a classic discriminant—exceptions exist (basilar stroke, sedative toxidromes). Never assign “psychosis” or “psych hold” until medical encephalopathy and toxidromes are considered, especially with visual hallucinations, waxing-waning attention, or abnormal vitals.

Document a problem representation that includes acuity, attention, focality, tox exposure, and infectious risk. Reassess frequently; AMS is a trajectory, not a single GCS number.`,
  },
  {
    test: /t cell activation|cd28|checkpoint|ctla|pd-?1|anergy/i,
    prose: `**T-cell activation & immune checkpoints — textbook chapter.**

Naive T-cell activation requires signal 1 (TCR recognition of peptide–MHC) plus signal 2 (costimulation, prototypically CD28 binding B7/CD80/CD86 on APCs). Antigen recognition without costimulation favors anergy or deletion—peripheral tolerance in action. Signal 3 from cytokines polarizes effector programs (Th1, Th2, Th17, Treg, cytotoxic CD8 differentiation). CTLA-4 competes with CD28 and delivers inhibitory signals early in lymphoid activation; PD-1/PD-L1 restrains effector T cells in peripheral tissues and tumors. Blocking these checkpoints unleashes antitumor immunity and also autoimmune toxicity (colitis, dermatitis, endocrinopathies, pneumonitis, hepatitis)—toxicity that is the pharmacologic mirror of tolerance failure.

Exhaustion in chronic infection and cancer features sustained inhibitory-receptor expression and poor effector function; checkpoint blockade attempts to reverse parts of that program. Regulatory T cells and inhibitory cytokines (IL-10, TGF-β) add further brakes. Clinical mastery links vaccination (costimulation and adjuvants), transplant (costimulation blockade concepts), autoimmunity (failure of anergy/Treg control), and immuno-oncology (checkpoint inhibitors) to the same two-signal diagram. When a vignette mentions CTLA-4 or PD-1, draw the synapse and predict both efficacy and organ-specific toxicity.`,
  },
  {
    test: /shock micro|lactate clearance|capillary refill|skin perfusion|sepsis|lactate/i,
    prose: `**Shock microcirculation, lactate & sepsis perfusion — textbook chapter.**

Macro-hemodynamics (blood pressure, cardiac output) can look acceptable while capillary exchange fails. Microcirculatory dysfunction—heterogeneous perfusion, endothelial injury, and shunting—explains persistent lactate and organ failure after “normalization” of MAP. Lactate rises from anaerobic metabolism and from adrenergic aerobic glycolysis; clearance trends after resuscitation often matter more than a single value, but rising lactate always demands a mechanism search. Mottling, cool clammy skin, delayed capillary refill, oliguria, and altered mentation are bedside perfusion exams that complement numbers.

Shock phenotype drives therapy. Hypovolemic shock needs volume and hemorrhage control. Distributive/septic shock needs early antimicrobials, source control, judicious fluids, and vasopressors titrated to perfusion—not endless crystalloid after venous congestion appears. Cardiogenic shock needs afterload/preload optimization and mechanical support pathways, not large fluid boluses. Obstructive shock (tamponade, tension pneumothorax, massive PE) needs relief of obstruction. Chasing a lactate number with fluids in cardiogenic or obstructive physiology worsens edema without restoring oxygen delivery.

Sepsis bundles emphasize early recognition, cultures before antibiotics when they do not delay therapy, lactate measurement, and reassessment. The educational endpoint is matching the resuscitation tool to the failure mode while watching the microcirculation respond.

ScvO₂ and bedside ultrasound (IVC, LV function, lung B-lines) refine phenotype when available, but they do not replace the exam. Capillary refill time, mottling score, and urine output are free perfusion monitors. In septic shock, delayed antibiotics increase mortality—source hypotheses (lung, urine, abdomen, skin, line, CNS) should be spoken aloud in the first minutes. Refractory shock prompts adrenal-insufficiency consideration, occult bleeding, abdominal catastrophe, and mechanical complications. Avoid equating “MAP ≥65” with tissue wellness; ask whether organs are recovering.`,
  },
  {
    test: /thyroid nodule|bethesda|fn a|fna|rln|recurrent laryngeal/i,
    prose: `**Thyroid nodule evaluation & surgical decisions — textbook chapter.**

Begin with TSH and ultrasound risk features (composition, echogenicity, margins, calcifications, shape, size) rather than reflex excision. Hot nodules on scintigraphy (when TSH is low) are rarely malignant and change the pathway. FNA with Bethesda cytopathology stratifies risk when imaging and size criteria are met; nondiagnostic results require disciplined repeat strategy, not automatic surgery. Molecular testing adjuncts appear in indeterminate categories in selected pathways.

Surgery counseling includes hematoma airway risk, hypocalcemia from parathyroid injury or stunning, and recurrent laryngeal nerve injury causing voice change or aspiration. Lobectomy versus total thyroidectomy depends on cytology, contralateral disease, and need for radioactive iodine pathways. Not every nodule needs resection—risk-stratified pathways prevent unnecessary operations and lifelong replacement when lobectomy would suffice. Postoperatively, monitor calcium, voice, and wound; teach patients hematoma warning signs. The chapter skill is integrating endocrine function, cancer risk, and operative morbidity into one shared decision.`,
  },
  {
    test: /breast mass|triple assess|bi-?rads|mammograph/i,
    prose: `**Breast mass triple assessment — textbook chapter.**

Triple assessment means clinical exam + age-appropriate imaging + tissue diagnosis when indicated. Young patients with likely fibroadenomas still need a coherent plan; older patients with new masses need cancer exclusion. Mammography, ultrasound, and MRI play complementary roles; BI-RADS categories organize imaging concern and recommended action. Discordance between modalities or between imaging and exam is a red flag—do not reassure on a single benign-looking test when another data stream is suspicious.

Tissue diagnosis (core needle preferred over excisional biopsy for initial diagnosis in most modern pathways) anchors treatment planning for cancer and avoids unnecessary surgery for benign disease. Inflammatory signs raise mastitis versus inflammatory carcinoma questions. Male breast masses and axillary findings have their own differentials but the same systems logic. High-value care means timely tissue when risk is meaningful and restraint when imaging is definitively benign with concordant exam. Document family history and genetic risk when cancer is confirmed—the chapter continues into staging and adjuvant decisions.`,
  },
  {
    test: /ventilator|assist control|pressure support|weaning|liberation/i,
    prose: `**Mechanical ventilation & liberation — textbook chapter.**

Invasive ventilation supports gas exchange and work of breathing while risking ventilator-induced lung injury, pneumonia, and sedation-related delirium. Mode selection (volume- or pressure-targeted assist-control, pressure support, and others) serves oxygenation, ventilation, and comfort; PEEP and FiO₂ titrate against shunt and recruitment; tidal volume limitation protects the lung in ARDS pathways. Waveforms reveal dyssynchrony, air trapping, and circuit problems—look at the patient and the screen.

Liberation begins the day of intubation: treat the reason for intubation, minimize sedation, mobilize when safe, and perform daily readiness assessments (oxygenation, hemodynamics, mental status, secretions, acid–base). Spontaneous breathing trials test readiness; failure is a diagnosis list (cardiac ischemia or fluid overload, neuromuscular weakness, oversedation, unresolved pneumonia/edema, metabolic alkalosis driving hypoventilation), not a moral failing. Extubation risk includes upper-airway edema—cuff-leak and steroid strategies appear in selected high-risk patients. Noninvasive ventilation or high-flow oxygen may bridge selected extubations. Document goals of care when liberation is not aligned with patient values.`,
  },
  {
    test: /acid-?base icu|delta.?delta|winter.?s formula|triple disorder|anion gap|abg/i,
    prose: `**Complex acid–base disorders — textbook chapter.**

In ICU and ward medicine, mixed disorders are common. Always start with pH (acidemia vs alkalemia), then primary process (metabolic vs respiratory), then ask whether compensation is appropriate—if not, name the second process. Winter’s formula estimates expected PCO₂ in metabolic acidosis; inadequate respiratory compensation implies concurrent respiratory acidosis (worry about tiring muscles or central drive). Delta-delta (delta anion gap / delta HCO₃) reveals hidden metabolic alkalosis or NAGMA beside HAGMA.

Anion-gap acidosis differentials (lactate, ketones, toxins, renal failure) must be paired with osmolar gap when toxic alcohols are plausible. Non-gap acidosis suggests diarrhea bicarbonate loss or renal tubular acidosis patterns. Metabolic alkalosis follows vomiting/NG losses, diuretics, mineralocorticoid excess, and volume contraction—chloride status and urine chloride help. Integrate fluids, losses, and ventilator settings—ABGs without a clinical story are numerology. The mastery move is writing a one-line synthesis: “HAGMA from lactate plus respiratory alkalosis from sepsis-driven hyperventilation,” then tying therapy to each limb.`,
  },
  {
    test: /heart failure|hfref|hfpef|pulmonary edema|nyha|ejection fraction/i,
    prose: `**Heart failure mechanisms & management logic — textbook chapter.**

Heart failure is the clinical syndrome in which the heart cannot provide output adequate for metabolic need at normal filling pressures, or can do so only with elevated filling pressures. HFrEF emphasizes systolic remodeling and neurohormonal activation (sympathetic, RAAS, natriuretic peptides); HFpEF emphasizes stiff ventricles, often with hypertension, obesity, aging, and comorbid kidney disease. Congestion (orthopnea, edema, elevated JVP, pulmonary edema) and low-output signs (cool extremities, renal hypoperfusion, fatigue) can dissociate—treat the phenotype you see.

Acute decompensation pathways address oxygen, nitrates/afterload reduction when hypertensive and congested, diuretics for volume overload, and urgent evaluation for ischemia, arrhythmia, infection, and medical nonadherence. Chronic HFrEF foundational therapy (ARNI/ACEi/ARB, evidence-based β-blockers, mineralocorticoid antagonists, SGLT2 inhibitors) remodeled prognosis; devices enter selected EF and QRS indications. Avoid reflexive fluids. The chapter skill is linking Starling physiology and neurohormonal blockade to the bedside exam.

Classify profiles as warm/cold and wet/dry to choose vasodilators, inotropes, diuretics, or mechanical support thoughtfully. Right-sided failure with clear lungs still congests the liver and gut—diurese the venous system you can examine. Hyponatremia in advanced HF is a severity marker; rapid correction is rarely the goal. Transition of care includes daily weights, sodium literacy, and a plan for rising creatinine during decongestion. When EF recovers or GDMT is not tolerated, document why and what will be retried.`,
  },
  {
    test: /pneumonia|cap |hap |vap |community-?acquired pneumonia|consolidat/i,
    prose: `**Pneumonia syndromes — textbook chapter.**

Pneumonia is infection of lung parenchyma with a clinical syndrome (fever, cough, dyspnea, crackles/egophony) plus radiographic infiltrate in the right context. Community, hospital, and ventilator associations change likely organisms and empiric regimens. Severity tools and oxygen requirement guide ward versus ICU care; hypotensive septic pneumonia is sepsis first. Cover typical and atypical pathogens when indicated; narrow with culture and PCR data; ensure adequate duration without reflexive prolonged courses.

Mimics include pulmonary edema, PE infarct, malignancy, DAH, and organizing pneumonia—reassess when “antibiotics fail.” Aspiration risk and anaerobic coverage decisions are clinical, not automatic. Prevention includes vaccination and oral care in ventilated patients. Source control is unusual in pneumonia except for empyema/abscess—drain when a pleural space becomes the focus. Teach patients return precautions and smoking cessation; document oxygen saturation on room air for disposition clarity.`,
  },
  {
    test: /aki|acute kidney|creatinine|oligur|atn|prerenal|hydronephr/i,
    prose: `**Acute kidney injury — textbook chapter.**

AKI is a rise in creatinine and/or fall in urine output meeting consensus thresholds, but the educational core is mechanism: prerenal perfusion failure, intrinsic renal injury (ATN, AIN, glomerulonephritis, vascular), or post-renal obstruction. Volume status exam, orthostatics, FeNa/FeUrea in oliguric contexts, urine microscopy (muddy brown casts in ATN; RBC casts in glomerulonephritis), and bladder scan/ultrasound for obstruction sort the tree. Drugs (NSAIDs, ACEi/ARB in hypovolemia, aminoglycosides, iodinated contrast in stacked risk) are frequent contributors.

Management: restore perfusion if prerenal, stop nephrotoxins, relieve obstruction, treat underlying sepsis or glomerulonephritis urgently when present, and monitor potassium, volume, and acid–base for dialysis indications (AEIOU teaching). Distinguish community versus hospital-acquired timing. CKD-on-AKI baselines matter for dosing. The mastery sentence names the mechanism and the next discriminating test.

Cardiorenal and hepatorenal syndromes remind you that the kidney often fails secondarily—fix the parent organ while supporting filtration. Contrast exposure risk is multiplicative with GFR, diabetes, and volume depletion; hydration strategies and alternative imaging matter. Rhabdomyolysis AKI needs volume and monitoring for electrolyte storms. Post-obstructive diuresis can be profound after relief of chronic obstruction—replace thoughtfully. Never ignore anuria; it is obstruction, vascular catastrophe, or severe ATN until proven otherwise.`,
  },
  {
    test: /\bstroke\b|\btia\b|nihss|thrombolysis|alteplase|large.?vessel|hemorrhag/i,
    prose: `**Acute stroke syndromes — textbook chapter.**

Hyperacute focal neurologic deficits are vascular until proven otherwise. Time last known well, glucose, NIHSS, and noncontrast CT (to exclude hemorrhage) gate thrombolysis decisions; vascular imaging identifies large-vessel occlusion for thrombectomy pathways. Hemorrhagic stroke management prioritizes ABC, blood-pressure parameters, coagulopathy reversal, and neurosurgical consultation as indicated. Mimics include seizure with Todd paresis, migraine, hypoglycemia, and functional neurologic disorder—still treat as stroke until imaging and course declare otherwise when uncertainty is high.

Localize: MCA, ACA, PCA, brainstem, and lacunar syndromes produce characteristic patterns. Secondary prevention after ischemic events addresses antiplatelet or anticoagulation (by mechanism), statin, BP control, diabetes, smoking, and sleep apnea. TIA is a warning for completed stroke risk—same vascular workup urgency in the right window. Document deficits carefully; the neuro exam is the “imaging” before the scanner.

BP targets differ for ischemic versus hemorrhagic pathways and for post-thrombolysis care—know which protocol you are in. Dysphagia screening before oral intake prevents aspiration. DVT prophylaxis, glucose control, and fever management are supportive care that changes outcomes. Cryptogenic stroke evaluation may include prolonged rhythm monitoring for occult AF. When deficits fluctuate, reconsider seizure, migraine, or hypoperfusion rather than reflexively redosing thrombolytics.`,
  },
  {
    test: /dka|hhs|diabetic keto|anion.?gap.*glucose|insulin drip/i,
    prose: `**DKA & HHS — textbook chapter.**

DKA combines anion-gap metabolic acidosis, ketones, and hyperglycemia (glucose may be near-normal in pregnancy or SGLT2 contexts—euglycemic DKA). HHS features extreme hyperglycemia and hyperosmolality with profound dehydration, usually without major ketoacidosis. Both are insulin-deficiency/resistance plus counterregulatory hormone states often triggered by infection, ischemia, nonadherence, or new diabetes.

Treatment pillars: fluid resuscitation, potassium-aware insulin therapy, careful glucose decline, electrolyte repletion, and trigger search. Avoid overly rapid osmolality shifts. Transition criteria to subcutaneous insulin require gap closure and oral tolerance, with overlap to prevent rebound. Complications include hypokalemia, hypoglycemia, cerebral edema (especially pediatric), and aspiration. Education at discharge prevents the next admission. Mechanistically, low insulin explains both lipolysis/ketogenesis and hyperglycemia—glucagon and catecholamines amplify the storm.

Check potassium before insulin; insulin drives potassium intracellularly and can precipitate arrhythmia if total-body potassium is depleted. Phosphate and magnesium often need attention. Bicarbonate is rarely first-line when insulin and fluids are working. Identify new diabetes versus known disease with pump failure or SGLT2-associated euglycemic DKA. Discharge teaching covers sick-day rules, ketone testing, and when to seek care—biochemistry without education becomes readmission.`,
  },
  {
    test: /pediatric seizure|febrile seizure|seizure first aid|status epilepticus.*ped/i,
    prose: `**Pediatric seizure first aid & workup — textbook chapter.**

Protect airway and prevent injury; do not force objects into the mouth. Time the event. Most seizures stop within minutes; prolonged convulsions (≥5 minutes) are treated as status pathways with benzodiazepines and escalation per pediatric dosing. Check glucose early—hypoglycemia is reversible brain injury. Fever plus seizure in the right age band raises febrile-seizure teaching, but first complex features, focal signs, meningitis concern, or developmental regression change the workup intensity.

History reconstructs onset, eye deviation, Todd paresis, medications, ingestions, and trauma. Labs and imaging are hypothesis-driven, not automatic full panels for every simple febrile seizure. Caregiver teaching covers positioning, timing, when to call EMS, and rescue medication plans when prescribed. EEG and neurology follow-up belong after the acute safety net is secured. Never call a staring spell “behavioral” until absence epilepsy and complex partial seizures are considered in school-age children.`,
  },
  {
    test: /anaphylaxis|im epinephrine|epinephrine thigh|allergic emergency/i,
    prose: `**Anaphylaxis — textbook chapter.**

Anaphylaxis is an acute, potentially fatal systemic hypersensitivity reaction—usually IgE-mediated—presenting with skin/mucosal findings plus respiratory compromise, hypotension, or persistent GI symptoms. IM epinephrine in the anterolateral thigh is first-line and should not wait for complete criteria if suspicion is high. Positioning matters: supine with legs elevated if hypotensive; avoid abrupt sitting in distributive shock. Repeat epinephrine if needed; start IV fluids and airway support early.

Remove the trigger when identifiable. Adjuncts (H1/H2 blockers, steroids, bronchodilators) do not replace epinephrine. Observe for biphasic reactions per local pathways; prescribe and teach epinephrine autoinjector use before discharge. Differential includes vasovagal syncope, panic, hereditary angioedema, and scombroid—none get epinephrine withheld when true anaphylaxis is likely. Document allergen and provide allergy follow-up.`,
  },
  {
    test: /bronchiolitis|rsv|supportive oxygen.?hydration|albuterol.*steroid/i,
    prose: `**Bronchiolitis supportive care — textbook chapter.**

Bronchiolitis is a viral lower-airway illness of infants with cough, tachypnea, wheeze/crackles, and variable hypoxia—RSV is the classic agent but not the only one. Care is supportive: oxygen for hypoxemia, hydration, nasal suctioning, and monitoring work of breathing. Routine albuterol, steroids, and chest physiotherapy lack consistent benefit in typical viral bronchiolitis and should not be reflexive.

Risk stratify by age, prematurity, congenital heart/lung disease, and ability to feed. Apnea can precede florid respiratory findings in young infants. Infection control and caregiver counseling about expected course (often worse days 3–5) reduce bounce-backs. Hypertonic saline and high-flow oxygen enter selected pathways; intubation is for failure of gas exchange or exhaustion. Secondary bacterial pneumonia is uncommon early—avoid shotgun antibiotics without a new focal story.`,
  },
  {
    test: /pediatric uti|cath specimen|uti.*imaging|vesicoureteral/i,
    prose: `**Pediatric UTI & imaging — textbook chapter.**

Specimen quality decides everything: bag specimens contaminate; catheter or SPA samples are preferred in non–toilet-trained children when treatment decisions hang on culture. Fever without source in young infants is a UTI until evaluated. Empiric antibiotics follow local resistance; narrow with culture. Imaging pathways (ultrasound ± VCUG) are age- and recurrence-dependent—protect kidneys from missed anatomic risk without irradiating every first simple cystitis in an older child.

Dysuria in adolescents still needs STI consideration. Circumcision status, constipation, and voiding dysfunction modify risk. Teach caregivers return precautions for persistent fever. The chapter skill is matching invasiveness of collection and imaging to age-based complication risk.`,
  },
  {
    test: /safe sleep|sids|pediatric sleep|abcs of safe sleep/i,
    prose: `**Pediatric sleep & safety — textbook chapter.**

Safe sleep teaching uses the ABCs: Alone, on the Back, in a Crib (firm surface, no soft bedding, no smoke exposure). Room-sharing without bed-sharing reduces SIDS risk in guidance frameworks. Prematurity, smoke exposure, and prone positioning elevate risk. Anticipatory guidance is clinical medicine—document it.

Sleep problems in older children include behavioral insomnia, OSA from adenotonsillar hypertrophy, and insufficient sleep affecting school and mood. Screen for snoring, gasping, and daytime sleepiness. Never attribute bruising or injuries solely to “sleeping wrong” when abuse patterns fit better.`,
  },
  {
    test: /pediatric obesity|bmi percentile|family-based.*weight|weight counseling/i,
    prose: `**Pediatric obesity counseling — textbook chapter.**

Use BMI percentile for age/sex, not adult cutoffs alone. Counseling is family-based: sugar-sweetened beverages, screen time, sleep, and shared meals outperform child-only diets. Screen for comorbidities (hypertension, dysglycemia, NAFLD, OSA, psychosocial stigma) rather than only plotting a curve.

Motivational interviewing beats lecture. Medications and bariatric pathways exist for severe disease in specialized settings—know when to refer. Avoid weight talk that shames; focus on health behaviors. Endocrine “rule-outs” are uncommon relative to lifestyle drivers but matter when growth velocity, short stature, or syndromic features appear.`,
  },
  {
    test: /limping child|septic arthritis|transient synovitis|scfe|kocher/i,
    prose: `**Limping child — textbook chapter.**

Never miss septic arthritis of the hip: fever, non–weight-bearing, elevated inflammatory markers, and Kocher-criteria teaching push toward urgent ortho/aspiration. Transient synovitis is a diagnosis of relative reassurance after serious infection is unlikely. SCFE in adolescents (especially overweight) presents with limp or knee pain referred from the hip—frog-leg imaging and non–weight-bearing status matter.

Toddler’s fracture, Legg–Calvé–Perthes, JIA, and discitis enter age-banded differentials. Abuse remains on the board when history and injury mechanics disagree. The algorithm is age → fever/toxicity → imaging/labs → urgent drainage when septic joint cannot be excluded.`,
  },
  {
    test: /child abuse|nonaccidental|ten-?4|faces p|inflicted injur/i,
    prose: `**Child abuse recognition — textbook chapter.**

Inconsistent history, delayed care, patterned bruises, TEN-4-FACES-P bruise regions in young infants, metaphyseal fractures, and retinal hemorrhages in the right context raise inflicted-injury concern. Mandated reporting duties are legal and ethical obligations—document objectively, treat injuries, and involve child-protection teams.

Differential includes osteogenesis imperfecta, bleeding disorders, and accidental trauma—work them up without dismissing abuse. Intimate partner violence in the home is linked pediatric risk. The clinician’s job is recognition and safety, not courtroom verdicts.`,
  },
  {
    test: /acute otitis|pneumatic otoscop|watchful waiting|aom /i,
    prose: `**Acute otitis media decisions — textbook chapter.**

Diagnosis needs bulging tympanic membrane or other clear middle-ear inflammation signs—not redness alone. Pneumatic otoscopy improves accuracy. Many children qualify for watchful waiting with pain control when criteria are met; antibiotics matter for younger infants, severe disease, and otorrhea.

Amoxicillin remains first-line in many guidelines when antibiotics are indicated; resistance and recent exposure change choices. Counsel caregivers on return precautions. Recurrent AOM and effusion pathways may lead to ENT referral. Avoid diagnosing “ear infection” from symptoms without an ear exam.`,
  },
  {
    test: /preterm labor|tocolysis|antenatal steroid|cerclage/i,
    prose: `**Preterm labor evaluation — textbook chapter.**

Assess contractions, cervical change, rupture of membranes, infection, and fetal status. Antenatal corticosteroids for fetal lung maturity are time-critical when delivery is likely in the eligible gestational window. Tocolysis may buy hours for steroids/transfer—not days of false reassurance—and has contraindications (abruption, infection, lethal anomaly pathways).

Magnesium sulfate for neuroprotection enters selected early gestational ages. GBS prophylaxis, latency antibiotics for PPROM, and transfer to appropriate neonatal capability save lives. Cerclage and progesterone strategies belong to prevention/selected anatomy—not to active infection-driven labor. Always ask why labor started early (infection, abruption, polyhydramnios, multiples).`,
  },
  {
    test: /fetal heart|category i|category iii|deceleration|intrapartum.*trac/i,
    prose: `**Intrapartum fetal heart tracing — textbook chapter.**

Category I tracings are normal (moderate variability, no late/variable decelerations of concern). Category III tracings (absent variability with recurrent late/variable decelerations or bradycardia, or sinusoidal pattern) demand rapid decision toward delivery if not correctable. Category II is everything else—requires a structured response, not ignore-or-crash extremes.

Variable decelerations suggest cord compression; late decelerations suggest uteroplacental insufficiency. Maternal repositioning, oxygen per protocol, fluid bolus, stopping oxytocin, and assessing for abruption/tachysystole are common corrective steps. Document time, interventions, and decision for OR. Tracing literacy is a team sport with nursing and obstetrics.`,
  },
  {
    test: /menopause|vasomotor|estrogen decline|hormone therapy|ht risks/i,
    prose: `**Menopause physiology & symptom care — textbook chapter.**

Estrogen decline drives vasomotor symptoms, genitourinary syndrome, and bone-loss acceleration. Diagnosis is clinical in the appropriate age band; FSH testing is often unnecessary. Shared decision-making for menopausal hormone therapy weighs symptom severity, time since menopause, CVD risk, breast cancer risk, VTE history, and route of estrogen.

Nonhormonal options (SSRIs/SNRIs, gabapentin, and others per guidance) help vasomotor symptoms when hormones are undesirable. Vaginal estrogen can treat local symptoms with minimal systemic exposure in many pathways. Lifestyle measures help but rarely suffice alone for severe flushes. Do not dismiss new postmenopausal bleeding as “hormones”—rule out hyperplasia/cancer pathways.`,
  },
  {
    test: /abnormal uterine bleeding|palm-?coein|aub /i,
    prose: `**Abnormal uterine bleeding — textbook chapter.**

Always exclude pregnancy first in reproductive-age patients. PALM-COEIN organizes structural (polyp, adenomyosis, leiomyoma, malignancy/hyperplasia) and nonstructural causes (coagulopathy, ovulatory dysfunction, endometrial, iatrogenic, not otherwise classified). Acute heavy bleeding needs hemodynamic assessment and targeted therapy; chronic AUB needs pattern history and risk-based endometrial sampling (age, unopposed estrogen, failed medical therapy).

Imaging (ultrasound) and labs (CBC, TSH, coagulopathy when indicated) follow the story. Treatment ranges from NSAIDs/tranexamic acid and hormonal options to procedural care. Adolescent heavy menses should prompt bleeding-disorder consideration. Document quantity with pad/tampon counts and clots—vague “heavy” is not a plan.`,
  },
  {
    test: /ectopic pregnancy|hcg.*ultrasound|unstable.*or|tubal pregnancy/i,
    prose: `**Ectopic pregnancy emergency — textbook chapter.**

Any positive pregnancy test plus pain/bleeding is ectopic until the pregnancy location is established. Unstable patients go toward OR resuscitation, not prolonged ED observation. Stable patients use quantitative hCG and ultrasound pathways; discriminatory zones are guides, not absolute laws—interpret with the clinical picture.

Methotrexate candidates must meet criteria (stability, hCG thresholds, no contraindications, reliable follow-up). Rh status matters for Rh-negative patients. Heterotopic pregnancy is rare but real with assisted reproduction. Counsel every at-risk patient on danger signs. Missed ectopic is a leading malpractice and mortality pattern in early pregnancy care.`,
  },
  {
    test: /endometriosis|dysmenorrhea.*infertility|empiric.*gnrh|endometrioma/i,
    prose: `**Endometriosis clinical approach — textbook chapter.**

Cyclical pelvic pain, dysmenorrhea, dyspareunia, and infertility form the classic pattern; exam and imaging may be normal. Empiric hormonal suppression is often appropriate before laparoscopy when suspicion is high and red flags are absent. Endometriomas have characteristic ultrasound features and influence surgical planning.

Definitive diagnosis historically used laparoscopy with histologic confirmation, but clinical diagnosis is increasingly accepted to avoid delaying care. NSAIDs, combined hormones, progestins, and GnRH-pathway agents are stepwise tools. Fertility goals change the algorithm—suppression is not fertility treatment. Central sensitization and overlapping IBS/IC symptoms require multimodal pain care, not endless opioids.`,
  },
  {
    test: /infertility|ovulation induction|tubal patency|ivf|semen analysis/i,
    prose: `**Infertility evaluation basics — textbook chapter.**

Infertility is typically defined after 12 months of unprotected intercourse (earlier evaluation at ≥6 months if age ≥35 or known risk factors). Core assessment: ovulation (history, progesterone, AMH/AFC as adjuncts), semen analysis, and tubal patency when indicated. Preconception counseling (folate, rubella immunity, chronic disease optimization) starts concurrently.

Male factor is common—evaluate the couple, not only the female partner. Unexplained infertility still has evidence-based pathways (expectant care, IUI, IVF) stratified by age. Clomiphene/letrozole ovulation induction requires monitoring for multiples. Emotional load is high; normalize mental-health support. Do not delay evaluation with endless “try longer” advice when age-related decline is the dominant clock.`,
  },
  {
    test: /fetal growth|fgr |iugr|macrosomia|growth restriction/i,
    prose: `**Fetal growth disorders — textbook chapter.**

Fetal growth restriction (FGR) reflects uteroplacental insufficiency, genetic/infectious causes, or constitutionally small fetuses—discriminate with Doppler, anatomy survey, and maternal factors. Surveillance intervals and delivery timing trade stillbirth risk against prematurity. Macrosomia raises shoulder dystocia and glycemic concerns (GDM).

Fundal height discordance triggers ultrasound. Tobacco, hypertension, and antiphospholipid disease are modifiable contributors. Communicate uncertainty honestly: estimated fetal weight has error bars. Coordinate neonatology when early delivery is planned.`,
  },
  {
    test: /multiple gestation|chorionicity|ttts|mono.?di|twin.?twin/i,
    prose: `**Multiple gestation risks — textbook chapter.**

Chorionicity drives risk more than zygosity alone. Monochorionic twins share placental anastomoses and can develop twin–twin transfusion syndrome (TTTS)—serial ultrasound surveillance is mandatory in specialty pathways. Dichorionic twins still carry preterm birth and preeclampsia risk above singletons.

Delivery planning, antenatal steroid timing, and mode of delivery depend on presentation, gestational age, and chorionicity. Nutrition, anemia, and preterm labor surveillance intensify. Counsel families early about NICU likelihood. Label twins consistently (A/B) across imaging and delivery documentation to prevent wrong-twin errors.`,
  },
  {
    test: /chorioamnionitis|endometritis|obstetric infection|intrapartum fever/i,
    prose: `**Obstetric infections — textbook chapter.**

Intraamniotic infection (chorioamnionitis) presents with intrapartum fever plus maternal/fetal tachycardia, uterine tenderness, or purulent fluid—start antibiotics and plan delivery progression per obstetric protocols. Postpartum endometritis causes fever, uterine tenderness, and foul lochia after delivery—broad coverage including anaerobes is typical until refined.

GBS prophylaxis reduces early-onset neonatal disease when indicated. Wound infection, mastitis, and septic pelvic thrombophlebitis enter the postpartum fever differential. Sepsis in pregnancy can progress rapidly—lactate, cultures, source control, and obstetric collaboration are concurrent. Never delay antimicrobials for “wait and see” once infection criteria are met.`,
  },
  {
    test: /preeclampsia|gestational hypertension|eclampsia|hellp|hypertensive disorder.*pregnan/i,
    prose: `**Hypertensive disorders of pregnancy — textbook chapter.**

Gestational hypertension and preeclampsia are blood-pressure disorders after 20 weeks with or without proteinuria and end-organ criteria (thrombocytopenia, creatinine rise, liver enzymes, pulmonary edema, neurologic symptoms). Severe features accelerate toward delivery after maternal stabilization. Magnesium sulfate prevents eclampsia in indicated pathways; antihypertensive agents lower stroke risk from severe-range BPs.

HELLP is a related microangiopathic/hepatic syndrome. Postpartum preeclampsia still occurs—teach danger signs. Aspirin prophylaxis for high-risk patients is prevention medicine. Differentiate chronic hypertension, superimposed preeclampsia, and white-coat readings with appropriate monitoring. Delivery is definitive therapy for preeclampsia; gestational age modulates how fast you move.`,
  },
  {
    test: /contraception|mec categor|larc|iud counseling|cdc mec/i,
    prose: `**Contraception counseling (MEC) — textbook chapter.**

CDC Medical Eligibility Criteria categorize method safety by condition (1–4). LARC methods (IUD, implant) are highly effective first-line options for many patients, including adolescents and nulliparous patients when appropriate. Estrogen-containing methods raise VTE risk—screen migraines with aura, smoking age ≥35, and prior clot carefully.

Counsel on perfect-use versus typical-use failure, emergency contraception access, and dual protection against STIs. Quick-start strategies improve initiation. Remove unnecessary pelvic-exam barriers to contraception when guidelines allow. Reproductive justice means offering the full method mix without coercion after pregnancy or in marginalized populations.`,
  },
  {
    test: /ovarian torsion|adnexal torsion|sudden unilateral.*pelvic/i,
    prose: `**Ovarian torsion urgency — textbook chapter.**

Sudden unilateral pelvic pain with nausea raises torsion—Doppler flow present does not exclude it. Urgent surgical evaluation preserves ovary; delays cost tissue. Masses and ovarian enlargement predispose but torsion can occur without a large cyst.

Differential includes ectopic, appendicitis, stone, and ruptured cyst. Analgesia should not delay imaging/consult when suspicion is high. Fertility counseling after detorsion/oophoropexy decisions is part of postoperative care. Document time of pain onset and consult times—this is a stopwatch diagnosis.`,
  },
  {
    test: /pid |pelvic inflammatory|cervical motion tenderness|tubo-?ovarian/i,
    prose: `**PID diagnosis & treatment — textbook chapter.**

Cervical motion, uterine, or adnexal tenderness in a sexually active patient with pelvic pain supports empiric PID treatment—do not wait for every lab. Cover gonorrhea, chlamydia, and anaerobes per current regimens; add TOA imaging when severe, mass suspected, or failing outpatient care.

Complications include infertility, ectopic pregnancy, and chronic pain. Test and treat partners; offer HIV/syphilis screening. Fitz-Hugh–Curtis perihepatitis can mimic cholecystitis. Hospitalize for pregnancy, TOA, nausea preventing orals, or uncertain diagnosis. Counseling on safer sex closes the loop.`,
  },
  {
    test: /palm|rankl|osteoblast|bone remodel|crystal arthritis|gout pathogenesis|neurapraxia|salter.?harris/i,
    prose: `**Musculoskeletal pathophysiology — textbook chapter.**

Bone remodeling couples osteoblast formation and osteoclast resorption through RANKL/OPG and Wnt pathways—explaining osteoporosis drugs and metastatic osteolysis. Growth-plate (physeal) injuries use Salter–Harris grades; misclassification changes growth prognosis. Peripheral nerve injury grades (neurapraxia, axonotmesis, neurotmesis) predict recovery and surgical timing; Wallerian degeneration follows axonal discontinuity.

Crystal arthritis: MSU crystals activate NLRP3 inflammasome in gout; CPPD has its own demographics and chondrocalcinosis clues. Septic arthritis remains the can’t-miss monoarthritis until excluded. Map pain to articular versus periarticular structures before ordering advanced imaging.`,
  },
  {
    test: /anemia production|reticulocyte|hemolysis workup|coagulopath|neutropenic fever|tumor lysis/i,
    prose: `**Hematology clinical pathophysiology — textbook chapter.**

Anemia forks into underproduction (low reticulocytes) versus loss/hemolysis (high reticulocytes). Hemolysis labs (LDH, bilirubin, haptoglobin, smear) and Coombs testing sort immune versus intrinsic RBC defects. Coagulopathy: platelets for mucocutaneous bleeding; factors for deep hematomas/hemarthroses—DIC consumes both.

Oncologic emergencies—neutropenic fever, TLS, hyperviscosity, cord compression—have clocks. Transfusion decisions need indication, antibodies, and volume tolerance. Thrombosis chapters always ask provoked versus unprovoked and bleeding risk before indefinite anticoagulation.`,
  },
  {
    test: /somatic symptom|illness anxiety|health anxiety|somatiz/i,
    prose: `**Somatic symptom & illness anxiety — textbook chapter.**

Somatic symptom disorder features distressing physical symptoms plus disproportionate thoughts, anxiety, or behaviors—not “faking.” Illness anxiety centers on preoccupation with having a serious disease with minimal somatic findings. Rule out medical disease proportionally; avoid endless negative workups that reinforce threat perception.

Schedule regular visits, acknowledge symptoms as real experiences, treat comorbid depression/anxiety, and limit PRN emergency testing without new red flags. CBT and collaborative care outperform confrontation. Document a clear follow-up plan so every clinician does not restart the diagnostic odyssey.`,
  },
  {
    test: /act team|housing first|public psychiatry|serious mental illness|systems of mental/i,
    prose: `**Public psychiatry & systems of care — textbook chapter.**

Serious mental illness outcomes depend on housing, income, and continuous community treatment as much as on the right antipsychotic. Assertive community treatment (ACT) teams bring intensive outreach to high-utilizers. Housing First reduces homelessness without requiring sobriety-first gates in evidence-based models.

Levels of care (outpatient, IOP, PHP, inpatient, residential) should match risk and function, not insurance convenience alone. Continuity after discharge prevents revolving-door admissions. Measure engagement, not only symptom scales. Advocacy for benefits and disability paperwork is clinical work.`,
  },
  {
    test: /eating disorder|anorexia|bulimia|binge.?eating|refeeding/i,
    prose: `**Eating disorders — textbook chapter.**

Anorexia nervosa combines restriction, weight/shape overvaluation, and low weight; medical instability (bradycardia, electrolyte shifts, refeeding risk) can kill. Bulimia involves binge–purge cycles at normal or higher weight with dental erosion, parotid enlargement, and electrolyte risks. Binge-eating disorder lacks compensatory purging but still impairs health.

Medical stabilization precedes psychotherapy when unstable. Refeeding syndrome risk demands phosphate monitoring and measured caloric advancement. CBT-E and family-based therapy (adolescents) are first-line psychosocial tools. Screen for suicide risk and misuse of laxatives/diuretics. Avoid weight-focused shaming language that worsens secrecy.`,
  },
  {
    test: /cbt-?i|insomnia prescribing|beers criteria|sleep.?psychiatry|psychotherapy modalities/i,
    prose: `**Sleep psychiatry & psychotherapy map — textbook chapter.**

CBT-I is first-line for chronic insomnia; hypnotics are short-term adjuncts with fall, confusion, and dependence risks—especially in older adults (Beers caution). Screen for OSA when snoring, obesity, or resistant depression appears; untreated OSA sabotages mood treatment.

Psychotherapy modalities: CBT targets thoughts/behaviors; psychodynamic explores patterns and relationships; DBT skills suit emotion dysregulation; motivational interviewing supports change ambivalence. Match modality to problem, not to therapist preference alone. Document goals and session structure.`,
  },
  {
    test: /lithium toxicity|lithium.*monitor|serotonin syndrome|hunter criteria/i,
    prose: `**Lithium toxicity & serotonin syndrome — textbook chapter.**

Lithium has a narrow therapeutic index; toxicity rises with dehydration, NSAIDs, ACEi/ARB, and reduced GFR. Tremor, GI upset, ataxia, and confusion escalate toward seizures—check a level and vitals, hydrate, and escalate for severe toxicity (dialysis in selected cases). Monitor renal and thyroid function chronically.

Serotonin syndrome (Hunter framing) features clonus/hyperreflexia, agitation, and autonomic signs after serotonergic stacks (SSRI + MAOI/tramadol/linezolid teaching). Stop offenders, support critically, and use benzodiazepines; cyproheptadine enters selected pathways. Distinguish from NMS (rigidity, bradyreflexia, dopamine-blocker context).`,
  },
  {
    test: /gbs prophylaxis|group b strep|intrapartum.*penicillin/i,
    prose: `**Intrapartum GBS prophylaxis — textbook chapter.**

Screen at the guideline window in pregnancy; give penicillin (or appropriate alternative for allergy) during labor when indicated to reduce early-onset neonatal GBS disease. Adequate prophylaxis timing before delivery matters. Neonatal sepsis evaluation still depends on clinical status and risk factors—not culture results alone at birth.

Document allergy details (reaction type) to avoid unnecessary broad agents. Prematurity, prolonged ROM, and maternal fever change neonatal risk pathways. GBS bacteriuria earlier in pregnancy is already an indication for intrapartum prophylaxis.`,
  },
  {
    test: /dopamine pathway|nigrostriatal|mesolimbic|mesocortical/i,
    prose: `**Dopamine pathways pharmacology — textbook chapter.**

Nigrostriatal blockade explains EPS and tardive risk; mesolimbic blockade relates to antipsychotic efficacy for positive symptoms; mesocortical effects relate to negative/cognitive domains; tuberoinfundibular blockade raises prolactin. Name the tract when predicting side effects.

Parkinson drugs and stimulants act on related circuits with different therapeutic goals. Partial D2 agonists try to balance tone. Understanding pathways prevents treating EPS with more dopamine blockade or missing NMS.`,
  },
  {
    test: /collagen synthesis|scurvy|osteogenesis imperfecta|gly-?x-?y|hydroxylation.*vitamin c/i,
    prose: `**Collagen synthesis & scurvy/OI — textbook chapter.**

Collagen’s Gly-X-Y repeats and vitamin C–dependent hydroxylation enable triple-helix stability and cross-linking. Scurvy is a hydroxylation failure with bleeding gums, poor wound healing, and perifollicular hemorrhage. Osteogenesis imperfecta reflects collagen type I quantity/quality defects with fractures and blue sclerae teaching.

Wound strength depends on collagen remodeling over weeks—early suture removal risks dehiscence. Connective-tissue drug and disease vignettes (copper, vitamin C, genetic collagenopathies) all map to this assembly line.`,
  },
  {
    test: /gpcr|receptor tyrosine kinase|nuclear receptor|second messenger|camp|cgmp/i,
    prose: `**Receptor signaling & second messengers — textbook chapter.**

GPCRs couple to G proteins and second messengers (cAMP, IP3/DAG, ion channels). RTKs dimerize and autophosphorylate, recruiting adaptor cascades (RAS–MAPK, PI3K–AKT). Nuclear receptors transcriptionally regulate genes after ligand binding (steroids, thyroid hormone).

cAMP and cGMP pathways explain many autonomic and vasodilator drugs; phosphodiesterase inhibitors raise cyclic nucleotide tone. Pathology is wrong ligand, wrong receptor number, or downstream mutation (oncogenic kinases). Draw the cascade before memorizing drug lists.`,
  },
  {
    test: /wound healing|pathologic calcification|psammoma|cellular aging|telomere|senescence|metastatic cascade|emt /i,
    prose: `**Pathology mechanisms — healing, calcification, aging, metastasis.**

Wound healing: hemostasis → inflammation → proliferation → remodeling; disruption yields dehiscence, hernia, or keloid. Dystrophic calcification occurs in damaged tissue with normal serum calcium; metastatic calcification follows systemic Ca/P imbalance. Psammoma bodies are laminated calcifications in specific tumors teaching.

Cellular aging involves telomere attrition, senescence-associated secretory phenotype (SASP), and proteostasis failure. Metastatic cascade: EMT, invasion, intravasation, survival in transit, extravasation, colonization—each step is inefficient, which is why micrometastases matter clinically.`,
  },
  {
    test: /bite wound|eikenella|micro lab|culture media|naat|dimorphic|histoplasma|blastomyces|sterilization|disinfection|parasitology|helminth|transplant infection|cmv |gram stain|peptidoglycan|dna virus|rna virus|herpes latency|prosthetic joint infection/i,
    prose: `**Microbiology methods & high-yield organisms — textbook chapter.**

Gram stain logic: thick peptidoglycan retains crystal violet (Gram+); outer membrane/LPS defines Gram−. Culture media and NAAT choices follow pre-test probability. Dimorphic fungi (Histoplasma Midwest river valleys; Blastomyces; Coccidioides deserts) switch mold/yeast with temperature—geography is the stem.

Bite wounds are polymicrobial; human bites implicate Eikenella. Sterilization kills spores; disinfection levels match critical/semicritical/noncritical instruments. Parasitology pairs life cycles with eosinophilia and travel. Post-transplant timelines predict CMV and other opportunists. Prosthetic joint infection: early vs late, sinus tract, and staged revision thinking. DNA viruses (herpes latency, HBV) versus RNA virus families organize antiviral targets.`,
  },
  {
    test: /iron.*copper.*zinc|hemochromatosis|wilson|atp7b|phagocyte|chronic granulomatous|leukocyte adhesion/i,
    prose: `**Trace metals & phagocyte immunodeficiencies — textbook chapter.**

Iron overload (hemochromatosis) deposits in liver/heart/pancreas; copper overload (Wilson, ATP7B) hits liver and basal ganglia with low ceruloplasmin teaching; zinc deficiency impairs immunity and wound healing. Interpret ferritin with inflammation context.

CGD (NADPH oxidase failure) causes catalase-positive organism infections and granulomas; LAD impairs neutrophil migration with omphalitis/high WBC without pus. Match organism pattern to the missing host defense.`,
  },
  {
    test: /breast care|lactation mastitis|sexual assault|vaginitis|candida vs bv|wet mount/i,
    prose: `**Women’s health office emergencies & breast care — textbook chapter.**

Breast masses need triple assessment; lactation mastitis differs from abscess (drain the latter). Sexual assault care prioritizes safety, consent for exam, forensic options, STI/pregnancy prophylaxis, and trauma-informed follow-up—never coerce the exam.

Vaginitis office diagnosis uses pH and wet mount: Candida (yeast/pseudohyphae), BV (clue cells, high pH), trichomonads (motile). Treat partners when indicated (trich). Avoid empiric “yeast cream” forever without a diagnosis.`,
  },
  {
    test: /digital age|privacy.*boundar|research ethics|irb|equipoise|grade spirit|outbreak investigation|incidence.*prevalence|diagnostic study appraisal|spectrum bias/i,
    prose: `**Evidence, ethics & professionalism extensions — textbook chapter.**

Incidence is new cases over time; prevalence is existing disease burden—screening and chronicity change their relationship. Outbreak steps: confirm diagnosis, define cases, describe time/place/person, generate hypotheses, implement control. Diagnostic studies fail via spectrum bias and imperfect gold standards.

GRADE separates strong versus conditional recommendations. Research ethics needs IRB review and equipoise. Digital professionalism: privacy, boundaries, and no PHI on personal devices/social media. Document thoughtfully—charts are legal and clinical instruments.`,
  },
  {
    test: /surgical drain|neonatal surgical|malrotation|volvulus|nec |gyn oncology staging|cardio-?obstetric|maternal medical disease|antibiotic pk|t>mic|auc\/mic/i,
    prose: `**Surgical & perinatal advanced care — textbook chapter.**

Drain fluid character (serous, bilious, feculent, bloody) plus output trends detect leaks early. Neonatal surgical emergencies: malrotation/midgut volvulus is a green-vomit clock; NEC combines prematurity, feeding intolerance, and pneumatosis pathways. Gyn oncology staging is surgical/pathologic discipline that drives chemo/radiation.

Cardio-obstetrics optimizes preconception risk for cardiomyopathy, aortopathy, and pulmonary hypertension. Antibiotic PK/PD: β-lactams care about time above MIC; vancomycin/fluoroquinolones about AUC/MIC—dosing interval follows the kill pattern, not vibes.`,
  },
  {
    test: /agitation de-?escalation|verbal de-?escalation|offer po when safe/i,
    prose: `**Acute agitation de-escalation — textbook chapter.**

Start with scene safety, space, and calm voice—aggression often escalates when staff crowd or argue content of delusions. Offer oral medications when the patient can cooperate; IM routes are for imminent danger after verbal strategies fail. Avoid stacking sedatives that depress respiration; reassess after each dose.

Medical clearance thinking still applies: hypoxia, hypoglycemia, withdrawal, intracranial injury, and toxidromes mimic “psych agitation.” Document least-restrictive steps attempted. Seclusion/restraints are last resorts with time limits and monitoring. Teach-back with the team after every event to improve the next response.`,
  },
  {
    test: /medical complications in pregnancy|preexisting htn|preexisting.*dm|physiologic changes.*pregnan/i,
    prose: `**Medical complications in pregnancy — textbook chapter.**

Preexisting hypertension and diabetes require preconception optimization and trimester-specific targets; physiologic rises in blood volume and GFR change drug dosing and lab norms. Distinguish chronic hypertension from superimposed preeclampsia using timelines and end-organ criteria.

Cardiac, renal, autoimmune, and thyroid disease each need specialty co-management and delivery planning. Imaging and medication choices weigh fetal risk against maternal harm from undertreatment—undertreating maternal disease also harms the fetus. Postpartum is a high-risk window for hypertension, cardiomyopathy, and thrombosis; schedule early follow-up deliberately.`,
  },
  {
    test: /foregut|tracheoesophageal|lung fissure|intercostal|sciatic|peroneal|foot drop|median.*benediction|ulnar claw|axillary levels|mediastinal mass|prostate zone|tarsal tunnel|plantar fascia/i,
    prose: `**High-yield regional anatomy — textbook chapter.**

Foregut septation failures yield TEF patterns. Thoracic wall neurovascular bundles hide at rib inferior margins—chest tubes go over the rib. Limb nerves: sciatic injury and common peroneal foot drop; median “benediction” and ulnar claw patterns localize lesions.

Breast lymphatics drain to axillary levels I–III; mediastinal masses use the anterior 4Ts teaching. Prostate peripheral zone hosts most cancers; transition zone drives BPH. Foot arches and tarsal tunnel entrapments explain plantar pain differentials. Draw once, label vessels/nerves, then predict the deficit.`,
  },
  {
    test: /tolac|vbac|uterine rupture|prior cesarean/i,
    prose: `**TOLAC / VBAC counseling — textbook chapter.**

Trial of labor after cesarean trades uterine rupture risk against repeat-cesarean morbidity. Prior incision type (low transverse vs classical), number of prior cesareans, and institutional readiness for emergency cesarean dominate counseling. Continuous fetal monitoring and clear stop criteria are non-negotiable.

Shared decision-making documents absolute risks in plain numbers, not slogans. Successful VBAC reduces cumulative surgical risk for future pregnancies; failed TOLAC raises morbidity versus planned repeat cesarean. Contraindications (classical scar, some obstetric complications) must be named explicitly.`,
  },
  {
    test: /stem cell|differentiation|pluripotent|multipotent|lineage commitment/i,
    prose: `**Stem cells & differentiation — textbook chapter.**

Potency declines from totipotent → pluripotent → multipotent → committed progenitors. Niche signals (growth factors, matrix, cell–cell contacts) decide self-renewal versus differentiation. Cancer stem-cell models explain relapse after cytoreduction; regenerative therapies depend on controlled differentiation without teratoma risk.

Epigenetic marks lock lineage identity; reprogramming erases them experimentally. Clinical vignettes connect marrow stem cells to transplantation, embryonic pathways to congenital anomalies, and failed differentiation to dysplasia/neoplasia.`,
  },
  {
    test: /transcription.*rna|rna processing|splicing|translation.*targeting|signal recognition particle/i,
    prose: `**Transcription, RNA processing & translation targeting — textbook chapter.**

Transcription uses RNA polymerases with promoters, enhancers, and chromatin states. Splicing joins exons; errors yield disease alleles (β-thalassemia teaching). mRNA export, stability, and miRNA control set protein output.

Translation initiation and elongation map to antibiotic targets in bacteria and to eukaryotic initiation-factor disease. Signal recognition particle targeting sends proteins to the secretory pathway; nuclear localization signals route transcription factors. Mutation at any step changes phenotype without altering DNA coding sense alone.`,
  },
  {
    test: /vaccine counseling|immunization counseling|vaccine hesitancy/i,
    prose: `**Vaccine counseling essentials — textbook chapter.**

Start with the disease prevented, not the needle. Address specific concerns (schedule density, ingredients, autism myths) with evidence and empathy—confrontational correction backfires. True contraindications are uncommon; mild illness rarely permanently defers vaccination.

Catch-up schedules matter for missed doses. Live vaccines have immunocompromise rules. Document refusal and revisit; VAERS reporting is for safety surveillance, not proof of causation from temporal association alone.`,
  },
  {
    test: /confidentiality|error disclosure|scarce resource|allocation ethics|public health limits/i,
    prose: `**Clinical ethics procedures — textbook chapter.**

Confidentiality yields to mandated reporting and imminent serious harm pathways—explain limits when safe. Error disclosure: what happened, why it matters, apology where appropriate, and prevention plan. Scarce-resource allocation uses explicit, revisable criteria rather than stealth bedside rationing.

Document capacity, surrogates, and goals. Digital professionalism protects PHI. Ethics without an operational next step is incomplete care.`,
  },
  {
    test: /confidentiality & public|medical error disclosure ethics|insomnia prescribing caution/i,
    prose: `**Ethics disclosure & insomnia prescribing — chapter addendum.**

Confidentiality limits and error disclosure scripts must be practiced until automatic: what happened, impact, apology, prevention. Insomnia care starts with CBT-I and comorbidity treatment; hypnotics are brief, monitored, and avoided as chronic sole therapy in older adults whenever alternatives exist. Revisit refused vaccines and declined workups with the same procedural clarity.`,
  },
  {
    test: /acute agitation de-?escalation|ovarian torsion urgency|pediatric obesity counseling|lithium toxicity & monitoring|gi motility|bile formation|swallowing & esophageal|spleen immunology|motility disorders expanded|serotonin syndrome recognition|tolac \/ vbac|strep pharyngitis testing|vaccine counseling essentials|study designs|public psychiatry|survival analysis basics|somatic symptom|professionalism digital|vaginitis office|pediatric dehydration|menopause symptom management|intrapartum fetal heart|research ethics|pulmonary hypertension groups|cardiovascular aging/i,
    prose: `**Coverage completion — textbook chapter.**

These high-frequency topics share a method: name the stopwatch diagnosis (torsion, agitation, serotonin toxicity, Category III tracing), the prevention skill (vaccines, GBS, Rh, SSI), and the counseling skill (TOLAC, menopause, obesity, digital professionalism). Motility, bile, esophageal, and hyposplenism chapters are mechanism → complication maps. Study design and survival analysis keep evidence numerate. Pulmonary hypertension groups and cardiovascular aging remind you that phenotype—not a single pressure number—drives therapy.`,
  },
  {
    test: /biostatistics essentials|enzyme kinetics|km |vmax|lineweaver/i,
    prose: `**Biostatistics & enzyme kinetics essentials — textbook chapter.**

Sensitivity/specificity vs predictive values, relative vs absolute risk, and confounding literacy prevent misreading papers. NNT from ARR communicates benefit better than relative risk alone.

Km and Vmax describe enzyme–substrate behavior; competitive inhibitors raise apparent Km, noncompetitive lower Vmax. Clinical drugs are often enzyme inhibitors—map the kinetic pattern to dose–response and toxicity.`,
  },
  {
    test: /third.?trimester bleeding|placenta previa|abruption|rh incompatibility|rho.?gam|anti-?d/i,
    prose: `**Late-pregnancy bleeding & Rh prevention — textbook chapter.**

Third-trimester bleeding differentials: previa (painless), abruption (painful, rigid uterus), labor, vasa previa. Stabilize mother, avoid digital exam until previa excluded by ultrasound, and prepare for hemorrhage.

Rh-negative patients need anti-D immune globulin after sensitizing events and at routine gestational windows to prevent alloimmunization and future hydrops. Document blood type early and treat postpartum hemorrhage protocols as rehearsed team events.`,
  },
  {
    test: /heme pharmacology|chemotherapy mechanism|alkylat|antimetabolite|microtubule.*chemo/i,
    prose: `**Heme & chemotherapy pharmacology — textbook chapter.**

Anticoagulants, antiplatelets, and thrombolytics hit distinct clotting nodes—bleed risk is the shared toxicity language. Chemotherapy classes: alkylators, antimetabolites, antitubulins, topoisomerase inhibitors, and targeted kinase/antibody agents—each has a nadir and organ-toxicity fingerprint.

Supportive care (growth factors, antiemetics, infection precautions) is part of the prescription. Tumor lysis risk rises with bulky, chemosensitive disease—hydrate and monitor electrolytes before celebrating the response.`,
  },
  {
    test: /or safety|burn resuscitation|cholecystitis|hernia incarceration|strangulation|perioperative fluid|acute limb ischemia|6 ?ps/i,
    prose: `**Surgical acute-care essentials — textbook chapter.**

OR safety checklists catch wrong-site and equipment failures before incision. Burn resuscitation uses weight-based fluids titrated to urine output. Cholecystitis escalates from antibiotics to source control; hernia incarceration vs strangulation is a perfusion clock.

Perioperative fluids match losses and cardiac reserve—avoid reflexive liters. Acute limb ischemia uses the 6 Ps; time to revascularization saves tissue. Name the complication you are watching for tonight after every case.`,
  },
  {
    test: /chronic inflammation.*cancer|spirochetes|ob analgesia|gyn oncology surgical/i,
    prose: `**Inflammation–cancer, spirochetes & perinatal surgical care — textbook chapter.**

Chronic inflammation promotes DNA damage, proliferation, and stromal remodeling that favor neoplasia—H. pylori, viral hepatitis, and IBD are teaching bridges. Spirochetes (Treponema, Borrelia, Leptospira) have stage-specific syndromes and serology pitfalls.

OB analgesia balances maternal comfort with fetal monitoring constraints; neuraxial techniques dominate labor pathways when available. Gyn oncology surgical care is staging discipline plus complication surveillance after radical procedures.`,
  },
  {
    test: /hemostasis pathology|innate immune sensor|complement deficienc|cellular redox|fatty acid synthesis|cardiovascular drug mechanism|diuretic.*renal drug|pulmonary pharmacology|gi pharmacology|rct critical|health economics/i,
    prose: `**Cross-cutting foundations — textbook chapter.**

Hemostasis pathology separates primary (platelet/vessel) from secondary (factor) bleeding and DIC consumptive patterns. Innate sensors (TLRs, inflammasomes) and complement deficiencies explain pyogenic and Neisseria risk. Redox balance and fatty-acid synthesis vs oxidation coordinate fed/fasting fuel choice.

CV, pulmonary, GI, diuretic, and renal drug maps start from receptor/transporter → physiologic effect → toxicity fingerprint. RCT appraisal checks randomization, blinding, follow-up, and applicability; basic health economics keeps absolute benefit and cost visible without denying high-value care.`,
  },
  {
    test: /lipoprotein assembly|urea cycle regulation|one-carbon metabolism|stem cells & differentiation|prevention levels|emerging infection|hand intrinsic|koch|molecular postulate|biostatistics essentials|\barr\b|\brrr\b|nnt\/nnh|justice.*allocation|health equity/i,
    prose: `**Final coverage bridges — textbook chapter.**

Lipoprotein assembly/clearance and urea-cycle regulation explain atherosclerosis risk and hyperammonemia. One-carbon metabolism links folate/B12 to megaloblastic anemia. Stem-cell potency and niche signals underpin regeneration and cancer stem-cell teaching.

Prevention levels organize public-health action; emerging infections need isolation and surveillance logic. Hand intrinsic anatomy predicts claw patterns. Koch’s postulates became molecular criteria—PCR alone is not causation. ARR/RRR/NNT/NNH and biostat essentials keep evidence numerate. Justice and health equity demand allocation criteria that are explicit, revisable, and free of stealth bedside rationing.`,
  },
];

export const DEEP_CATEGORY: { test: RegExp; prose: string }[] = [
  {
    test: /pathophysiol/i,
    prose: `**Pathophysiology deep frame — textbook chapter.**

Every pathophysiology chapter should answer four questions in order. (1) What is the primary disrupted variable—pressure, flow, volume, compliance, diffusion, conduction, secretion, receptor signaling, or immune recognition? (2) What compensatory systems activate, and what bedside signs do those compensations create (tachycardia, vasoconstriction, hyperventilation, hypertrophy, cytokine cascades)? (3) When does compensation become maladaptive (vasoconstriction that worsens afterload, hyperventilation that exhausts respiratory muscles, remodeling that stiffens a ventricle)? (4) Which measurement proves your mechanism (exam finding, waveform, lab pattern, imaging, provocation test)?

Write one causal sentence linking molecular or cellular change → organ dysfunction → patient finding. If you cannot, the section is still a summary, not a chapter. Prefer diagrams that show direction of causality over lists of associated features. When two mechanisms compete (e.g., cardiogenic versus distributive shock), name the discriminating test and what you will do differently based on the result. Pathophysiology mastery is prediction: given the lesion, forecast the vital signs, labs, and physical exam before opening the answer key.

Build a three-column scratchpad for every chapter: *insult*, *adaptation*, *decompensation*. Insults include ischemia, toxin, immune attack, genetic enzyme failure, mechanical obstruction, and microbiome breach. Adaptations include hypertrophy, hyperplasia, collateral flow, hyperventilation, and cytokine dampening. Decompensation is when adaptations create new disease—fibrosis, remodeling, exhaustion, autoimmunity. Exam questions often hide in the adaptation column; ward disasters hide in the decompensation column. Close each section by naming one drug or procedure that interrupts the causal chain at the earliest safe node.

Quantitative thinking belongs here too: Starling forces, Ohm’s-law analogs for flow, compliance curves, and dose–response relationships turn qualitative “failure” into measurable trajectories. When a vignette gives numbers (PaO₂, lactate, anion gap, EF, creatinine slope), translate them back into the disrupted variable you named in question (1). If the numbers and the named variable disagree, your mechanism is wrong—not the patient.

Compare paired mechanisms explicitly (systolic vs diastolic failure; obstructive vs restrictive lung disease; pre-renal vs ATN; excitatory vs inhibitory synapse failure). The discriminator is usually a physical finding, waveform, or lab ratio—not a longer memorized list. End every pathophys section by stating what you would measure tomorrow to prove the mechanism is improving.

Time course is a fifth hidden question: hyperacute (seconds–minutes), acute (hours), subacute (days), chronic (weeks–years). The same organ can fail by hemorrhage, ischemia, inflammation, or degeneration—tempo sorts them before the scan returns. Write the tempo into your problem representation so the differential does not become an unsorted encyclopedia.

Threshold concepts: reserve capacity, critical closing pressure, oxygen delivery vs consumption, and feedback gain. When reserve is exhausted, small insults produce nonlinear collapse—that is why compensated shock becomes uncompensated so quickly. Predict the cliff, not only the plateau.

Integrative drills: given a drug or toxin, name the node it hits and the expected vital-sign/lab change; given a lab pattern, name the disrupted variable. Pathophysiology becomes clinical skill when prediction precedes the answer key.

Cross-organ pattern recognition: edema has Starling, lymphatic, and renal stories; cyanosis has central versus peripheral oxygen stories; shock has a pump–pipe–tank taxonomy that must be named before fluids or pressors. Write the dominant disrupted variable in the first line of every note so the team inherits a mechanism, not a symptom list.

When two lesions coexist (e.g., sepsis plus cardiomyopathy), state which physiology is rate-limiting *now* and which therapy would harm the other pathway. Pathophysiology on the wards is triage of mechanisms under time pressure—rehearse the discriminating bedside test for each classic pair until it is automatic.

Compensation curves matter: the same stroke volume on a steeper diastolic pressure–volume relationship means higher filling pressures and earlier pulmonary edema. Name the curve you are on before you interpret the number.

Multi-hit models explain why the same insult produces different phenotypes across patients: reserve capacity, concurrent drugs, and genetic modifiers change the decompensation threshold. Write the modifier list beside the mechanism so the vignette’s “why this person, why now” is answered.

Waveform and imaging literacy belongs in pathophysiology—not only in clerkships. Pressure–volume loops, flow–volume curves, and Starling curves are the same story told graphically; practice translating a curve shift into a drug choice. When a number surprises you (normal EF with pulmonary edema; rising creatinine with “adequate” urine), return to the disrupted variable before ordering another panel.

End every organ-failure chapter with a one-line recovery criterion: which measurable change proves the mechanism is reversing, and which change only marks symptomatic relief.

Hypoxia versus hypoxemia versus ischemia are not synonyms—oxygen content, delivery, and utilization fail at different nodes and produce different lactate and mentation patterns. Write the node you believe is broken before you escalate oxygen or pressors.

Inflammation resolution is an active program (lipid mediators, macrophage phenotype switching, barrier repair). Chronic disease is often failed resolution, not endless activation alone. When remodeling appears (fibrosis, hypertrophy, angiogenesis), ask whether it is adaptive reserve or the start of irreversible loss—and what measurement will tell you which.`,
  },
  {
    test: /clinical medicine|internal medicine|advanced clinical|family medicine/i,
    prose: `**Clinical medicine deep frame — textbook chapter.**

Ward and clinic chapters are decision engines: recognize the syndrome, name the can’t-miss alternative, choose data that changes the branch point, start therapy when delay harms, and reassess on a clock. Document the story so the next clinician can continue it without rediscovering the differential. High-value care means fewer low-yield tests and more time-sensitive actions—cultures before antibiotics when safe, ECG before cath lab activation pathways, glucose before “psych” labels.

For each lesson, practice a 30-second verbal compact: leading diagnosis likelihood, danger if wrong, and next three actions. That compact is how textbook knowledge becomes overnight cross-cover skill. Always include disposition criteria and return precautions in outpatient chapters. When guidelines conflict with an individual patient’s goals, record the shared decision explicitly. Clinical medicine without follow-up planning is incomplete care.

Prioritize the sickest physiology first (airway, perfusion, glucose, seizure, hemorrhage) even when the chart says “routine follow-up.” Bundle related orders to reduce missed steps: cultures with antibiotics when indicated, ECG with electrolytes in syncope, pregnancy test with pelvic pain. Write contingency lines—“if lactate rises, then…”—so night coverage inherits your thinking. Prevention (vaccines, screening, deprescribing) belongs in the same note as acute care when the visit allows.

Problem representation skill: one sentence with syndrome + acuity + key risk + leading diagnosis + can’t-miss alternative. Then a three-item plan with timing. Teach this aloud until it is automatic. Clinic chapters add continuity: what changes at the next visit, what labs prove response, and what patient education prevents the bounce-back. Cross-cover medicine rewards explicit if–then plans more than exhaustive differentials without actions.

When uncertainty is high, time-box the workup: which test in the next hour changes disposition, which can wait until morning, and which consultant needs a precise question. Document allergies, anticoagulants, and code status early—these change every branch. Family Medicine and Advanced Clinical chapters emphasize longitudinal risk reduction alongside the acute visit agenda.

Handoffs are clinical procedures: illness severity, pending actions, if–then contingencies, and who to call. A chapter that ends without a handoff plan is unfinished ward medicine. Outpatient chapters close with return precautions written in the patient’s language and a scheduled follow-up that matches risk, not convenience.

Medication reconciliation at every transition prevents the silent killer of omitted anticoagulants, insulin, and antiepileptics. Social determinants—housing, food, transport, language—are often the true rate-limiting step after the “perfect” plan is written.

Night-float skill: inherit the problem representation, not only the to-do list. Ask what would make you wake the senior, and write that threshold explicitly. Clinic skill: close every visit with one behavior change the patient can repeat aloud.

Diagnostic calibration: after each major result, update probability and the next action in writing. Premature closure is prevented by keeping one can’t-miss alternative alive until a decisive test kills it. Teach value-based ordering—ask what management changes if the test is positive versus negative before you click.

Continuity skill: reconcile medications, allergies, and pending results at every transition. Advanced Clinical chapters add resuscitation modifications (pregnancy, pediatrics, massive hemorrhage) that override default ACLS instincts—name the modification before you start the algorithm.

Resuscitation modifiers (aortocaval compression relief, perimortem cesarean timing, pediatric energy/drug dosing, hemorrhage protocols) belong in the first verbal compact when the population is not a standard adult.

Sick/not-sick calibration is the first clinical skill: work of breathing, perfusion, mentation, and glucose sort the room before the differential is elegant. Bundle time-critical actions (oxygen, access, ECG, pregnancy test, cultures) so parallel care beats serial perfectionism.

Chronic disease visits still need an acute screen—missed chest pain, suicidal ideation, and medication nonadherence hide inside “routine follow-up.” Write one prevention action and one monitoring action every visit. Advanced Clinical chapters add population-specific resuscitation: weight-based pediatric dosing, left uterine displacement, hemorrhage carts, and when to call for operative delivery or ECMO pathways without delaying the basics.

Problem lists should be ranked by threat and actionability, not by chronological accident. Every overnight handoff names illness severity, pending results, and the exact threshold to call. Clinic notes close with patient-language return precautions and a follow-up interval matched to risk.

Deprescribing is clinical medicine: indication, time-limited therapy, and cascade prevention. When multimorbidity competes, choose the intervention that changes the near-term trajectory first. Advanced pathways (massive transfusion, difficult airway, maternal cardiac arrest) are cognitive aids you rehearse—not documents you discover mid-code.`,
  },
  {
    test: /psychiatr|behavioral/i,
    prose: `**Psychiatry deep frame — textbook chapter.**

Organize every encounter around safety, syndrome, substrate (medical/substance contributors), and supports (therapy, medications, social determinants). Suicide risk assessment is a procedure: ideation, plan, intent, means, protective factors, prior attempts, and lethal-means counseling—documented specifically. Capacity and involuntary treatment follow legal criteria and decision-specific assessment, not diagnostic labels alone. Medications are tools with measurable toxicities (QTc prolongation, NMS, serotonin syndrome, clozapine agranulocytosis, metabolic syndrome)—monitoring is part of the prescription.

Separate delirium from primary psychosis, mania from stimulant intoxication, and depression from hypothyroidism or sleep apnea. Collateral is clinical data. Trauma-informed interviewing reduces re-traumatization without omitting safety questions. The endpoint of a psychiatry chapter is a learner who can write a problem representation and a risk formulation that guides level of care.

Acute agitation pathways escalate from verbal de-escalation to oral then IM medications while protecting airway and avoiding over-sedation stacks. Insomnia prescribing caution means sleep hygiene and treating underlying mood/anxiety/OSA before chronic benzodiazepines. Document target symptoms and stop dates for sedatives. Substance intoxication and withdrawal remain on every behavioral emergency differential.

Lithium and serotonergic stacks need level/toxicity literacy (renal/thyroid monitoring; Hunter clonus framing). Measurement-based care repeats severity scales at follow-up. Safety planning is concrete: means counseling, contacts, and a timed next appointment—not “follow up PRN.”

Psychopharmacology chapters always include metabolic, cardiac, and overdose fingerprints beside efficacy. Therapy modalities are prescriptions with indications—match CBT, DBT, IPT, or motivational interviewing to the problem. Document level of care and the reason for change when stepping up or down.

Acute agitation, lithium toxicity, serotonin syndrome, and insomnia prescribing are high-frequency safety chapters—rehearse the first five minutes until automatic. Public psychiatry and somatic symptom care remind you that housing, validation, and systems of care are clinical interventions.

Risk formulation is a clinical product: static factors, dynamic factors, protective factors, and a level-of-care decision that matches them. Document collateral and the MSE with quotable speech samples when thought form is disordered. Withdrawal, delirium, and toxidromes remain on every “psych” differential until time and data clear them.

Therapy is not optional soft content—match modality to problem (exposure for avoidance, behavioral activation for depression, skills for emotion dysregulation) and write the homework. Medication chapters always include stop criteria, overdose fingerprints, and metabolic or cardiac monitoring calendars.

Insomnia chapters prefer treating the driver (mood, anxiety, OSA, substances, circadian) before chronic hypnotics; document stop dates and fall risk in the elderly. Sleep is a vital sign in psychiatry—loss of need for sleep flags mania.

Dual-diagnosis care treats intoxication/withdrawal and the psychiatric syndrome on one timeline—neither waits for the other to be “cleared” when both are dangerous. Document the substance, last use, and withdrawal risk beside the MSE.

Outpatient psychiatry succeeds on adherence architecture: side-effect anticipation, early follow-up after starts/changes, and a crisis plan the patient can repeat. Clozapine, lithium, and MAOI-era teaching remind you that some drugs demand systems (labs, diet, registries), not only prescriptions. End the note with sleep, appetite, and one functional goal—the outcomes that prove the plan is working.

Catatonia recognition (mutism, posturing, negativism, excitement) changes the first medication choice toward benzodiazepines and away from high-potency antipsychotics alone. Malignant catatonia and NMS overlap—stop dopamine blockers and treat supportively while you sort.

Psychotherapy homework adherence is a vital sign for CBT/DBT courses; if homework never happens, change the plan rather than escalating meds endlessly. Cultural formulation and language access change both diagnosis and alliance—document interpreters used. End acute notes with sleep restored (or not), oral intake, and whether the patient can participate in safety planning.`,
  },
  {
    test: /cell biology|molecular/i,
    prose: `**Cell and molecular biology deep frame — textbook chapter.**

Track information flow (DNA→RNA→protein), quality control (DNA repair, UPR, proteasome/autophagy), and fate decisions (cell cycle, senescence, apoptosis, differentiation). Disease is usually a broken control loop, not a single molecule floating alone. Tie each control loop to a cancer pathway, neurodegeneration mechanism, infection strategy, or drug target so the cell chapter predicts phenotypes.

Ask which compartment fails (nucleus, mitochondria, lysosome, peroxisome, plasma membrane) and whether the problem is too much signal, too little signal, or signal at the wrong time. Experimental medicine vignettes (knockouts, inhibitors, reporters) should be translated into human disease correlates. Memorizing organelle lists without regulation is not mastery.

Receptor classes (GPCR, RTK, nuclear receptors) explain rapid versus transcriptional drug effects and why scurvy/OI collagen defects produce connective-tissue phenotypes. Second messengers and phosphorylation cascades are the wiring diagrams behind endocrine and oncology therapies. Tie each signaling node to a disease or drug before leaving the section.

Stem cells and differentiation chapters track potency (totipotent → pluripotent → multipotent), niche signals, and lineage commitment—cancer stem-cell concepts and regenerative medicine both depend on this map. Epigenetic marks lock or reopen fate; disease is often failed differentiation or failed restraint of self-renewal.

Protein quality control (chaperones, UPR, proteasome, autophagy) explains many conformational diseases. Trafficking motifs and post-translational modifications turn sequence into localization—CFTR and LDL-receptor teaching live here.

DNA→RNA→protein information flow fails at splicing, proofreading, or targeting as often as at the gene itself. Tie each failure to a board-style vignette (thalassemia splicing, collagen hydroxylation, receptor trafficking) before leaving the section.

Membrane transport and channelopathies turn abstract gradients into seizures, arrhythmias, and secretory diarrhea. Extracellular matrix composition explains why collagen and fibrillin defects produce vessel, bone, and eye phenotypes together. Cell-cycle checkpoints (G1/S, G2/M) are the logic behind many chemotherapies and DNA-repair deficiency syndromes.

When a vignette gives a trafficking motif or glycosylation defect, predict which organelle pathway failed and which serum protein or receptor never reaches the surface. Molecular medicine is phenotype prediction from a broken node—not gene-name memorization.

Mitochondrial disease teaching links ATP failure to lactic acidosis, stroke-like episodes, and maternal inheritance patterns—energy failure is a clinical syndrome, not only an organelle fact. Nuclear versus mitochondrial genome defects change counseling.

Signal termination matters as much as activation: phosphatases, GTPase timers, receptor internalization, and feedback transcription keep pathways from locking on. Cancer and endocrine disease often break the off-switch. When a drug is a “targeted therapy,” name the node, the downstream readout you will monitor, and the resistance mechanism you expect next.

Cell–cell junctions and polarity decide barrier integrity in gut, lung, and blood–brain barrier disease. Loss of polarity is an early cancer theme as much as a developmental one. Extracellular vesicles and paracrine signals explain how local injury becomes systemic.

CRISPR and gene-therapy teaching still rests on delivery, off-target risk, and which cell must be corrected permanently versus transiently. When a vignette gives a receptor tyrosine kinase or ion-channel mutation, predict dominant-negative versus haploinsufficiency phenotypes before naming the syndrome.`,
  },
  {
    test: /anatom|embryo/i,
    prose: `**Anatomy and embryology deep frame — textbook chapter.**

Structure predicts injury only when relationships are explicit: what borders it, what traverses it, what happens if it is compressed, transected, or failed to form at a developmental week. Draw once from memory, then check. Cluster anomalies by embryologic field (pharyngeal apparatus, midgut rotation, neural crest migration, septation events) rather than memorizing isolated facts.

Clinical anatomy chapters should end in procedures and syndromes: nerve blocks, surgical approaches, referred pain maps, and congenital lesion patterns. Surface landmarks exist to keep needles and knives out of trouble. Embryology earns its place when a congenital heart or branchial cleft vignette becomes inevitable from a failed developmental step.

For limb and nerve chapters, name the root, cord, or peripheral nerve and the muscles/sensation lost—then predict the gait or hand posture. For thoracic and abdominal maps, name the pleural reflections, peritoneal recesses, and lymphatic drainage that explain effusion, metastasis, and referred pain. Mediastinal compartments localize masses before biopsy. Breast lymphatic pathways explain sentinel-node logic. Male and female pelvic viscera chapters should end in continence, fertility, and surgical hazard (ureter, nerves, vessels).

Cross-sectional imaging literacy still starts with cadaver relationships: what is anterior/posterior, what canal connects spaces, and which fascia contains infection. Embryologic remnants (vitelline duct, urachus, branchial clefts) explain cysts and fistulas in adults and children. If you cannot sketch it from memory in two minutes, you do not own it yet.

Fascia planes explain how infections spread in the neck and perineum. Portal versus systemic venous anastomoses explain varices. Dermatomes and myotomes convert imaging into bedside neurologic localization. Anatomy without clinical consequence is trivia; consequence without anatomy is unsafe.

Space–occupying relationships matter under pressure: compartments in the limb, epidural vs subdural planes, and retroperitoneal vs intraperitoneal collections change both imaging and operative approach. Name the fascial boundary before you name the antibiotic.

Embryologic timing tables (weeks of teratogen vulnerability, neural crest migration, gut rotation) convert anomalies from trivia into predictable clusters. If two anomalies share a field, look for a third.

Neuroanatomy localization drills: long-tract signs plus cranial-nerve level name the brainstem floor; cortical signs name the hemisphere and lobe. Vascular territories (MCA/ACA/PCA, vertebrobasilar) convert imaging into expected deficits before the report is read.

Embryologic field defects cluster—when you see one pharyngeal-arch anomaly, inspect hearing, thymus/parathyroid, and cardiac outflow. Anatomy mastery is a two-minute sketch that still predicts the surgical hazard and the referred-pain map.

Autonomic maps (sympathetic chain, vagal distribution, pelvic splanchnics) explain referred pain, Horner syndrome, and surgical hypotension better than memorizing eponyms. Pair every autonomic fact with a bedside finding.

Imaging correlation drills: on CT/MRI, name the compartment, the vessel, and the nerve at risk before reading the impression. Embryology of the diaphragm, gut rotation, and cardiac septation should make congenital lesions feel inevitable from a missed week—not random. If two anomalies share a developmental field, search for the third before discharge planning.

Peritoneal compartments and fascia planes explain where pus tracks and why a “simple” abscess is actually a surgical anatomy problem. Retroperitoneal versus intraperitoneal collections change both imaging and approach.

Cranial fossa relationships and dural reflections turn headache and trauma vignettes into localization exercises. Embryologic timing of teratogen exposure (weeks) should be memorized as ranges tied to organogenesis—not as trivia dates. Sketch the anomaly, the missed developmental step, and the adult remnant in one diagram.`,
  },
  {
    test: /immunol/i,
    prose: `**Immunology deep frame — textbook chapter.**

Map innate sensing → antigen presentation → lymphocyte effector programs → regulation and resolution. Pathology is too little defense (infection, opportunistic disease), too much defense (hypersensitivity, cytokine storm), or defense aimed at self or graft (autoimmunity, rejection). Connect hypersensitivity types and complement pathways to real diseases, and connect checkpoint biology to both cancer therapy and immune-related adverse events.

Vaccines, monoclonal antibodies, and immunosuppressants are applied immunology—name the cell or cytokine targeted and the infection risk created. Primary immunodeficiency patterns (antibody vs cellular vs phagocyte vs complement) sort by organism type and age at presentation. Write one sentence that links receptor → cell → tissue lesion → clinical syndrome.

Hypersensitivity types I–IV are teaching scaffolds: anaphylaxis and atopy; cytotoxic antibody; immune-complex disease; delayed T-cell injury. Complement deficiencies map to Neisseria risk and SLE-like syndromes. Transplant rejection timing (hyperacute, acute, chronic) is applied MHC and antibody biology. When checkpoint inhibitors appear, predict irAE organ systems and steroid-first thinking for many toxicities.

Vaccine platforms (live attenuated, inactivated, subunit, mRNA, viral vector) differ in risk for immunocompromised patients and in how memory is generated. Cytokine names matter when a drug blocks them—infection surveillance follows. Primary immunodeficiency age-of-onset patterns remain the fastest sorting tool at the bedside.

Complement regulation failure (AH50/CH50 patterns, atypical HUS teaching) and neutrophil defects (CGD, LAD) convert abstract pathways into organism lists you can predict. When a checkpoint inhibitor causes colitis or endocrinopathy, that is applied tolerance biology—not a random side effect.

Allergy chapters need mechanism (IgE vs non-IgE) before the epinephrine autoinjector talk ends. Desensitization and graded challenge are protocols with stop criteria. Autoimmunity teaching should name the dominant effector (autoantibody, immune complex, T cell) so therapy choice is not random immunosuppression.

Tolerance failure versus pathogen clearance failure sorts autoimmunity from immunodeficiency in one sentence. Cytokine storm and HLH-spectrum teaching demand ferritin, cytopenias, and coagulation context—not only “inflammation.” Transplant chapters always include infection prophylaxis timed to net immunosuppression.

Vaccine adverse-event frameworks separate true contraindications from precautions so counseling stays honest. When eosinophilia, complement consumption, or opportunistic organisms appear, name the immune arm that failed before ordering the next shotgun panel.

Lab literacy: SPEP/UPEP, ANA patterns in context, complement consumption, and flow cytometry for lymphocyte subsets turn abstract pathways into actionable orders. Interpret results with the pretest syndrome, not in isolation.

Immune effector geography matters: IgA at mucosa, IgG in serum and placenta, IgE on mast cells, cytotoxic T cells in tissue. Predict the infection pattern from the missing effector, then confirm with the right assay.

Biologic drugs are applied immunology with infection and malignancy tradeoffs—screen for latent TB and hepatitis when indicated before starting, and teach patients which fever is an emergency. Graft-versus-host versus rejection timing after transplant is the same MHC story told from opposite directions. Close immunology chapters by naming one vaccine strategy and one immunosuppressive toxicity that follow from the mechanism.

Central versus peripheral tolerance failures predict different autoimmunity patterns and different therapy levers (B-cell depletion, T-cell costimulation blockade, cytokine neutralization). Match the lever to the effector.

Primary immunodeficiency danger signs (failure to thrive, recurrent deep abscesses, opportunistic organisms, family history) deserve early immunology referral—not endless antibiotics without a mechanism. Vaccine responses are functional assays of the immune system; absent titers after adequate immunization rewrite the differential. Close with the infection you refuse to miss in this defect.`,
  },
  {
    test: /biochem/i,
    prose: `**Biochemistry deep frame — textbook chapter.**

Compartmentation, cofactors, and regulation explain more clinical syndromes than enzyme names alone. Fed versus fasting hormonal control flips entire pathway directions; insulin and glucagon are master switches, not trivia. When a toxin or vitamin deficiency appears in a vignette, ask which enzyme’s cofactor or thiol chemistry was hit—then the phenotype becomes inevitable.

Link metabolic pathways to hypoglycemia, lactic acidosis, hyperammonemia, ketoacidosis, and storage phenotypes. Rate-limiting steps and feedback inhibition are the high-yield nodes for drug targets (statins, allopurinol, methotrexate teaching). Draw the pathway with arrows of regulation, not only intermediates.

Fed-state glycolysis and fat storage flip to fasting glycogenolysis, gluconeogenesis, lipolysis, and ketogenesis under glucagon/epinephrine. Ethanol’s NADH surge stalls gluconeogenesis and favors hypoglycemia and lactic acidosis teaching. Urea-cycle defects present with hyperammonemia without massive ALT spikes—think detoxification, not “hepatitis.” Vitamin cofactors (B1, B2, B3, B6, B12, biotin) turn enzyme lists into deficiency syndromes.

When a stem gives a toxin (cyanide, arsenic, carbon monoxide, methanol), map it to the electron-transport or cofactor step before naming the antidote. Storage diseases declare by which macromolecule accumulates in which organelle. Clinical biochemistry is mechanism with a lab ticket attached.

Fatty-acid oxidation defects and carnitine shuttle failure produce hypoketotic hypoglycemia—different from glycogen storage fasting patterns. Cholesterol synthesis and lipoprotein clearance connect liver biochemistry to ASCVD risk and statin teaching. Always ask which compartment holds the bottleneck.

Amino-acid catabolism and one-carbon transfer explain hyperammonemia, homocystinuria teaching, and megaloblastic anemia. Enzyme kinetics (Km/Vmax) turn inhibitor class into dose–response intuition at the bedside and on boards.

Acid–base teaching from metabolism: lactic acidosis is tissue hypoxia or toxin/drug uncoupling until proven otherwise; ketoacidosis is insulin deficiency or starvation/alcohol contexts; hyperammonemia without huge transaminases suggests urea-cycle or portal bypass physiology. Always pair the lab ticket with the pathway node.

Inborn errors declare by age, trigger (fasting, protein load, fructose), and whether ketones are present. Draw fed/fasting maps until hypoglycemia differentials write themselves. Biochemistry becomes clinical when you can name the missing enzyme’s cofactor and the first stabilizing step.

Tissue-specific metabolism explains board vignettes: RBC dependence on glycolysis, brain glucose obligation, muscle glycogen for anaerobic bursts, liver as the glucose exporter. Ask which tissue lacks which enzyme before predicting hypoglycemia or myoglobinuria.

Allosteric versus hormonal regulation operate on different timescales—seconds versus hours—and both belong in the same paragraph as the pathway. Toxins that mimic substrates or block cofactors (methanol, ethylene glycol, cyanide, lead) are biochemistry with an antidote clock. End each pathway with the lab pattern that would falsify your story.

Redox balance and NADPH supply link G6PD, oxidative hemolysis, and infections/drugs that push RBCs over the edge. Always ask what regenerates the cofactor the pathway needs.

Purine/pyrimidine and one-carbon disorders present with megaloblastic change, immunodeficiency, or neurologic injury depending on the node—map the accumulating metabolite to the organ. Clinical biochemistry ends when you can defend a diet, dialysis, scavenger, or vitamin cofactor as the first stabilizing move from the pathway alone.

Name the missing cofactor and the first stabilizing substrate or vitamin before the exotic workup expands.`,
  },
  {
    test: /pharmacol/i,
    prose: `**Pharmacology deep frame — textbook chapter.**

For every drug class: mechanism → physiologic effect → toxicity fingerprint → pharmacokinetic vulnerabilities (CYP interactions, renal/hepatic clearance, distribution, protein binding). Therapeutic index decides monitoring intensity. Drug interactions are pathway collisions—learn collision rules (QT prolongation, serotonergic stacks, CYP3A4/2D6, additive sedation, bleeding risk) rather than infinite pairwise lists.

Agonist versus antagonist versus partial agonist versus inverse agonist language prevents mechanism errors. Receptor upregulation/downregulation explains withdrawal and tolerance. Special populations (pregnancy, pediatrics, geriatrics, CKD) change both dose and drug choice. A complete pharmacology note includes what you monitor and when you stop.

Dopamine pathways explain antipsychotics (D2), Parkinson therapies, and addiction reinforcement teaching—name the tract before the drug. Autonomic pharmacology pairs receptor (α1, α2, β1, β2, M) with organ effect and overdose toxidrome. Narrow therapeutic index drugs (warfarin, digoxin, lithium, aminoglycosides, phenytoin teaching) demand level/monitoring literacy. Always ask what happens if the patient cannot clear the drug tomorrow.

Special populations (pregnancy, lactation, pediatrics, geriatrics, hepatic/renal failure) change Vd and clearance—dose is not “adult tablet, smaller human.” Chemotherapy classes map to cell-cycle phase and DNA/microtubule targets; heme drugs map to coagulation pathways. Endocrine pharmacology is receptor agonism/antagonism plus feedback consequences.

Pharmacodynamics language (full/partial/inverse agonist, competitive vs noncompetitive antagonist) prevents mechanism errors on boards and wards. Always pair a new drug with its monitoring plan and the toxicity you refuse to miss.

Therapeutic drug monitoring exists because kinetics vary—know which drugs need levels and when trough vs peak matters. QT, serotonergic, and CYP collision rules prevent polypharmacy disasters better than memorizing infinite pairwise lists.

Special-population dosing (CKD, liver failure, pregnancy, geriatrics) is not optional trivia—write the adjusted plan. Antibiotic PK/PD (T>MIC vs AUC/MIC) explains interval choice; heme and chemo drugs need nadir and organ-toxicity calendars.

Toxidrome recognition (anticholinergic, cholinergic, opioid, sympathomimetic, sedative-hypnotic, serotonergic) is the first five minutes of unknown overdose. Antidotes exist for a short list—know indications and what supportive care still must continue after the antidote.

Antibiotic and anticoagulant chapters are high-stakes applied PK/PD: match bug–drug–dose–duration, and match clot–bleed–duration. Write the monitoring plan in the same order as the prescription. Pharmacology literacy is refusing silent interactions that the EHR may not catch.

Prodrugs, active metabolites, and first-pass extraction explain why route and liver disease change effect size. pH trapping and ion channels explain why some overdoses get bicarbonate or lipid emulsion logic.

Antimicrobial stewardship is pharmacology plus microbiology: narrow when cultures return, stop when duration is done, and avoid duplicate anaerobic or MRSA coverage without indication. Anticoagulation chapters always state the indication, the planned duration, and the reverse strategy before the first dose. Write interactions as pathway collisions (QT, serotonin, bleeding, CYP) in the plan, not as an afterthought alert click.

Concentration–time curves explain loading doses, steady state, and why “missed doses” of short-half-life drugs fail differently than long-half-life ones. Protein binding and hypoalbuminemia change free fraction for narrow-index drugs.

Receptor reserve and spare receptors explain why partial agonists can antagonize full agonists in some systems. Write the washout and monitoring plan when stopping drugs with withdrawal syndromes (opioids, benzodiazepines, clonidine, antidepressants). Pharmacology mastery is naming mechanism, expected effect, toxicity fingerprint, and the lab or ECG you will check.`,
  },
  {
    test: /microbiol/i,
    prose: `**Microbiology deep frame — textbook chapter.**

Virulence strategy and host niche predict syndrome better than taxonomy alone. Capsules, toxins, intracellular survival, biofilms, and antigenic variation each create recognizable clinical patterns. Diagnostics start with pre-test probability and the right stain, culture, antigen, or PCR—not shotgun testing without a question.

Therapy without source control fails; therapy without stewardship breeds resistance. Always close the loop: organism → syndrome → controllable focus → shortest effective course. Empiric regimens exist for time-critical diseases (meningitis, necrotizing infection, febrile neutropenia) and must be narrowed. Infection prevention (hand hygiene, catheters, ventilation bundles) is microbiology applied to systems.

Bite wounds mix oral flora (including anaerobes and Eikenella in human bites)—prophylaxis and tetanus status matter. Stain and culture before antibiotics when the patient is stable enough. Resistance mechanisms (β-lactamases, altered PBPs, efflux) explain drug failure better than “stronger antibiotic” instincts. Opportunistic pathogens declare host immune defects—ask which arm of immunity failed.

Koch’s postulates evolved into molecular criteria—causation still needs more than PCR positivity. Biofilm on hardware explains why antibiotics alone fail prosthetic infections. Stewardship: right drug, right dose, right duration, right de-escalation after cultures.

Spirochetes and atypical organisms teach serology timing and false negatives early in disease. Always pair the organism with the host defect when opportunistic infection appears. Source control remains the missing antibiotic when abscess or hardware infection persists.

Emerging infection frameworks add isolation, PPE, and public-health notification to the bedside plan. Vaccine-preventable disease resurgence is a systems failure as much as a pathogen story—counsel with disease risk, not ridicule.

Host–microbe matching: encapsulated organisms and asplenia; catalase-positive organisms and CGD; intracellular organisms and T-cell defects; Neisseria and terminal complement. Empiric meningitis and necrotizing-infection clocks override stewardship until the patient is safe—then narrow aggressively.

Blood culture contamination versus true bacteremia changes everything—use pretest probability and organism identity. Infection chapters close with isolation needs, notification duties, and whether hardware or abscess needs a procedure, not only a prescription.

Diarrhea algorithms separate inflammatory/invasive from toxin-mediated watery disease using fever, blood, leukocytes, and exposure history—then match empiric therapy only when invasive disease or high-risk hosts demand it.

Pre-analytical microbiology decides truth: volume and timing of blood cultures, sterile technique, and whether antibiotics preceded the draw. A negative culture after antibiotics is not the same as a negative disease.

Zoonoses, travel, and occupational exposures rewrite the differential—ask where the patient has been and what they touch. Viral latency and reactivation (HSV, VZV, CMV, EBV) explain disease in immunocompromise better than “new infection” alone. Close every micro chapter with infection-control actions: isolation category, PPE, and who must be notified.

Biofilm and foreign-body infection physiology explain why antibiotics without removal fail. Duration rules differ for osteomyelitis, endocarditis, and uncomplicated cystitis—do not copy one duration onto another syndrome.

Mycobacteria and dimorphic fungi teach slow timelines and immune-status modifiers. Parasites demand exposure geography and eosinophilia context. When the Gram stain and the syndrome disagree, believe the patient and broaden thoughtfully—then narrow hard when identity returns.

Match host defect to organism before escalating to ever-broader regimens.`,
  },
  {
    test: /epidemiolog|biostat/i,
    prose: `**Epidemiology and biostatistics deep frame — textbook chapter.**

Numbers mean nothing without population denominator and bias structure. Sensitivity/specificity are test properties; PPV/NPV move with prevalence—screen differently in high- versus low-prevalence settings. Treatment effects should be expressed as absolute benefits (ARR, NNT) alongside relative risks that can exaggerate modest gains.

Screening programs need a detectable preclinical phase, acceptable false-positive burden, and mortality or morbidity benefit—not merely earlier diagnosis. Confounding, selection bias, and reverse causation haunt observational data; randomization addresses confounding of known and unknown factors but does not guarantee external validity. Read forest plots and confidence intervals as precision, not as “significance theater.”

Intention-to-treat preserves randomization benefits; per-protocol analyses answer different questions and can mislead. Lead-time and length-time bias explain why earlier diagnosis can look like longer survival without changing death dates. NNT and NNH should be computed from the same absolute scale. Ask who was excluded from the trial before extrapolating to your patient.

RCT appraisal checks randomization, blinding, allocation concealment, loss to follow-up, and applicability. Health economics for clinicians starts with cost-effectiveness literacy without letting price alone deny high-value care. Guidelines are tools—know the strength of recommendation and the evidence behind it.

Study design literacy (RCT, cohort, case-control, cross-sectional) and survival analysis basics prevent misreading Kaplan–Meier curves and hazard ratios. Always ask what the comparator was and who was excluded.

Bias checklists (selection, confounding, measurement) belong in every journal club. Absolute risk language (ARR/NNT) is how you counsel patients without relative-risk theater.

Outbreak steps (verify, define cases, describe time/place/person, hypothesis, test, control, communicate) are a procedure you can run under pressure. Surveillance systems and notifiable diseases are bedside duties, not only public-health office work.

At the point of care, translate a paper’s relative risk into the patient’s absolute risk using baseline incidence. If you cannot state ARR and harm in one sentence, you are not ready to counsel. Biostatistics is clinical communication technology.

Screening counseling requires disease prevalence, false-positive burden, and whether early detection changes outcomes—not only test marketing claims.

Diagnostic test sequences change post-test probability—use likelihood ratios mentally when prevalence is extreme. A high-sensitivity test helps rule out when negative; a high-specificity test helps rule in when positive—but only if the patient matches the study population.

Quality improvement uses the same numeracy: run charts, denominators, and balancing measures prevent “improving” one metric by harming another. When reading guidelines, separate strong recommendations with high evidence from expert consensus. Your counseling sentence should include baseline risk, absolute benefit, and absolute harm.

Surveillance bias and coding changes can create false epidemics—verify case definitions before declaring outbreaks. Secondary attack rates and incubation periods drive isolation length and contact tracing windows.

Number needed to treat should be paired with time horizon and baseline risk; an NNT from a five-year trial is not a one-visit promise. When counseling, prefer absolute risks over relative percentages that inflate small benefits. Close journal club by stating one practice you will change—or explicitly why you will not.`,
  },
  {
    test: /ethic|profession/i,
    prose: `**Ethics and professionalism deep frame — textbook chapter.**

Translate principles (autonomy, beneficence, nonmaleficence, justice) into procedures: capacity assessment steps, consent elements, confidentiality exceptions, error disclosure scripts, and triage criteria that are transparent and revisable. Professionalism includes documentation quality, handoff integrity, and speaking up for safety—ethics without operations is decoration.

Conflicts of interest, boundary issues, and social media pitfalls are clinical risk domains. When patients refuse recommended care, document understanding and offer the least harmful alternative still aligned with goals. Resource allocation decisions should use explicit criteria rather than stealth bedside rationing. Cultural humility improves history quality and trust.

Error disclosure follows institutional pathways: truth, apology where appropriate, prevention plan, and support for the patient. Confidentiality breaks for mandated reporting (abuse, certain threats) must be explained when safe. Professionalism includes timely notes, closed-loop handoffs, and refusing to cut safety corners for throughput.

Digital-age professionalism covers PHI on personal devices, social media boundaries, and documenting only what serves care. Research ethics (IRB, equipoise, informed consent for protocols) belongs beside clinical ethics—same principles, different paperwork.

Capacity is decision-specific and time-specific: understanding, appreciation, reasoning, and expression of choice. Surrogate priority and advance directives guide care when capacity is absent—document the source of authority. Conscience objections require timely transfer of care, not abandonment.

Justice chapters demand explicit triage criteria under scarcity and honest conversations about cost without covert rationing. Professionalism includes fatigue management, asking for help, and reporting impaired colleagues through proper channels. Ethics becomes real when the note shows the process, not only the principle.

Scarce-resource protocols must be public, revisable, and applied consistently; bedside stealth rationing fails justice and trust.

Truth-telling and hope are compatible: prognosis ranges, uncertainty, and what will be done for comfort belong in the same conversation. Futile and potentially inappropriate care frameworks require process—second opinions, ethics consultation, and transfer options—not unilateral silence.

Professional boundaries protect patients and trainees: dual relationships, gifts, and social media are risk domains with institutional rules. When an error reaches a patient, the ethical pathway is disclosure plus system learning; shame-based concealment repeats harm. Document the values conversation the way you document the creatinine—specific, timed, and actionable.

Surrogate decision-making uses substituted judgment first (what the patient would have wanted) then best interest when values are unknown. Document the conversation partners and the values cited, not only the code status checkbox.

Research versus innovation at the bedside needs consent clarity—patients deserve to know when a approach is standard, off-label, or investigational. Mistreatment and discrimination reporting pathways are professionalism duties that protect future patients. Ethics without a documented process is opinion; process without compassion is bureaucracy.`,
  },
  {
    test: /surgery/i,
    prose: `**Surgery deep frame — textbook chapter.**

Indication clarity, anatomy, physiologic reserve, and complication surveillance define operative care. The operation begins with preoperative optimization (meds, glucose, smoking, nutrition, VTE risk) and ends only after leak, bleed, infection, and ischemia windows are respected. Consent is a conversation about material risks, benefits, and alternatives—not a signature alone.

Postoperative fever, tachycardia, and oliguria have timed differentials (atelectasis/POD timing teaching, VTE, leak, bleed, infection). Source control and antibiotics partner; antibiotics without drainage of abscess fail. Minimally invasive approaches change incision morbidity, not the need for anatomic respect. The surgical learner names the next complication they are watching for tonight.

Drains report quality and quantity—bilious, feculent, bloody, or high-output serous fluid each change the differential for leak versus expected drainage. Nutrition timing (early enteric feeding when appropriate) supports anastomotic healing. OR safety checklists catch wrong-site and equipment failures before incision. Hernia incarceration versus strangulation is a perfusion clock; cholecystitis pathways escalate from antibiotics to source control. Burn resuscitation uses weight-based fluid formulas with urine-output titration—not blind liter dumps.

Acute limb ischemia, appendicitis decision pathways, and surgical site infection prevention close the loop from indication to recovery. Name the complication window (bleed, leak, infection, ischemia) you are watching tonight.

Preoperative optimization (glucose, smoking, anemia, VTE risk) and consent that names material alternatives are the start of the operation. Drains, nutrition, and early mobilization are therapy—not afterthoughts.

Resuscitation before incision: hemorrhage control, antibiotics timing for contaminated cases, glucose and temperature, and VTE prophylaxis matched to bleeding risk. Damage-control principles prioritize physiology over anatomic perfection in the exsanguinating patient.

Postoperative checkpoints are timed: bleeding early, pulmonary embolism and leak in characteristic windows, infection later—tachycardia is a clue, not a vital sign to chart and ignore. Name tonight’s watched complication at sign-out. Surgery chapters end when the patient clears the hazard window, not when the skin closes.

Site-infection prevention is a bundle: antibiotic timing, glycemic control, normothermia, skin prep, and sterile discipline—miss one link and the chapter’s outcome fails.

Anatomy under stress differs from anatomy in the atlas: distorted planes in reoperation, inflammation that erases landmarks, and bleeding that changes exposure priorities. Verbalize the next structure before you cut.

Enhanced recovery pathways (multimodal analgesia, early feeding, early mobilization) are physiologic interventions that reduce ileus and VTE—not optional comfort measures. Oncologic surgery adds margin status and staging lymphadenectomy logic to the same complication clocks. Sign out the anastomosis, the drain plan, and the exact finding that brings the patient back to the OR tonight.

Hemostasis strategy (pressure, suture, energy device, topical agents, systemic reversal) is chosen by bleeding character and anatomy. Ongoing transfusion without a surgical plan is delay dressed as resuscitation.

Wound classification and antibiotic prophylaxis windows are timed safety rules. Oncologic and bariatric pathways add nutritional and VTE risk layers to the same leak/bleed clocks. Before leaving the OR, state the most likely failure mode in the next twelve hours and how it will declare.`,
  },
  {
    test: /pediatr/i,
    prose: `**Pediatrics deep frame — textbook chapter.**

Age is a vital sign. Vital-sign norms, immune history, developmental trajectory, and caregiver systems change the differential every few months of life. Congenital heart disease, metabolic disease, and nonaccidental trauma rise in younger age bands; behavioral and school issues rise later—but medical mimics never fully disappear.

Safety nets—vaccines, safe sleep, abuse screening, growth charts, vision/hearing—are not “extra”; they are the pediatric method. Weight-based dosing and formulation literacy prevent errors. Family-centered communication means explaining uncertainty without outsourcing decisions to fear. A pediatric chapter ends with anticipatory guidance tied to the next developmental window.

Vital-sign tables by age should be memorized enough to feel wrong numbers in your bones—tachycardia in a toddler is not “anxiety” until fever, hypoxia, and volume loss are addressed. Fever without source algorithms differ by age in months, not years. Medication errors concentrate at transitions (mg/kg versus mg/m², mL versus mg). Ask who feeds, who smokes in the home, and who can consent. Developmental delay workups start with hearing/vision and social determinants before exotic metabolic panels, unless red flags demand urgency.

Obesity counseling is family-based BMI-percentile work with comorbidity screening. Strep testing follows Centor-like pediatric pathways—treat positives, avoid shotgun antibiotics for viral URI. Anticipatory guidance (nutrition, screens, safety) is billed clinical care, not small talk. Adolescent confidentiality rules change the interview structure when sexual/mental health arises.

Vaccine counseling starts with disease risk and addresses hesitancy without ridicule. Growth failure and obesity both deserve longitudinal charts, not one-time lectures. Ask who can actually execute the plan tonight.

Fever without source, bronchiolitis, and dehydration pathways are the daily grammar of pediatrics—memorize age-banded vitals and when a “well-appearing” infant still needs workup. Nonaccidental trauma recognition and mandated reporting are clinical skills, not optional extras.

Weight-based dosing errors concentrate at transitions—write the mg/kg and the absolute dose. Developmental screening and school function are vital signs for the older child. Family-centered rounds mean the caregiver can teach back the plan.

Neonatal transitional physiology (PPHN, ductal-dependent lesions, hypoglycemia, hypothermia) explains why the first hours differ from toddler care. Bilious emesis is malrotation/volvulus until proven otherwise—time is bowel. Brief resolved unexplained events and ALTE-spectrum presentations need a serious differential, not reassurance alone.

Child abuse recognition uses injury patterns incompatible with history, supervised versus unsupervised timelines, and mandated reporting as a clinical act. Adolescent interview structure (HEADSS) and confidentiality limits must be practiced aloud. Pediatric mastery is age-banded normals plus a family that can teach back the plan before discharge.

Safe-sleep counseling (alone, back, crib; no soft bedding; smoke-free) and anaphylaxis action plans with epinephrine autoinjector teaching are discharge skills, not pamphlets. Congenital heart clues (differential cyanosis, ductal-dependent shock at duct closure, murmur plus poor feeding) demand pulse-ox screening literacy and prostaglandin thinking when indicated. Asthma and bronchiolitis pathways separate viral supportive care from steroid/bronchodilator decision rules by age and phenotype.

Fluid and electrolyte math is pediatric core: deficit percent, maintenance by weight method, and glucose in fluids to prevent hypoglycemia during NPO periods. Over-rapid sodium correction risks neurologic injury—rate limits are safety rules.

Respiratory chapters separate upper-airway obstruction, bronchiolitis, asthma, and pneumonia by age and exam before the chest film. Cardiac clues (hepatomegaly, differential pulses, SpO₂ screening fails) demand prostaglandin and cardiology pathways when ductal dependence is plausible. End every pediatric encounter with vaccine status, growth trajectory, and one safety instruction the caregiver can teach back.

Neonatal jaundice pathways separate physiologic from pathologic by timing, rate of rise, and hemolysis labs—kernicterus prevention is a clock. Congenital adrenal hyperplasia salt-wasting crises present as shock with electrolyte clues in the first weeks.

Behavioral and school concerns still need medical mimics (hearing, sleep, thyroid, substances, abuse) on the list. Medication counseling for caregivers includes measuring devices, concentration checks, and what to do if a dose is vomited. Discharge is safe only when the caregiver can teach back red flags and the next appointment exists.`,
  },
  {
    test: /obstetric|gynecol/i,
    prose: `**Obstetrics and gynecology deep frame — textbook chapter.**

In obstetrics, maternal physiology shifts blood volume, coagulation, minute ventilation, and airway risk; fetal considerations constrain imaging and drug choice. Hemorrhage and hypertensive emergencies (preeclampsia/eclampsia spectrum) are protocolized because minutes matter. Shoulder dystocia, cord prolapse, and breech emergencies are rehearsal skills.

In gynecology, pregnancy testing is part of the abdominal/pelvic pain pathway for appropriate patients. Ectopic pregnancy, ovarian torsion, PID/TOA, and miscarriage each have time-sensitive branches. Contraception counseling is preventive medicine with mechanism-specific risks (estrogen and thrombosis). Oncologic pathways begin with screening literacy and end with staging discipline.

Maternal physiology increases cardiac output and decreases oncotic pressure—edema and dyspnea need thoughtful differentials, not automatic reassurance. Drug categories in pregnancy are evolving frameworks; use current resources rather than memorized letter grades alone. Postpartum care includes hemorrhage, hypertension, infection, thrombosis, depression, and lactation—each with a clock. Respect reproductive autonomy in counseling; coercion has no place in method selection after delivery or abortion care.

TOLAC/VBAC counseling balances uterine rupture risk against cesarean morbidity using prior incision type and institutional readiness. Rh immune globulin prevents alloimmunization when indicated—timing and dose literacy prevent future hydrops. Every prenatal visit is also a hypertension, glucose, and mental-health screen.

Menopause symptom care is shared decision-making on hormones vs nonhormonal options. Vaginitis diagnosis uses pH/wet mount, not endless empiric cream. Fetal heart tracing categories drive timed corrective steps and delivery decisions—Category III is a clock.

Postpartum hemorrhage, hypertensive disorders after discharge, and contraception counseling are the unfinished chapter of every delivery. Treat the fourth trimester as high-risk medicine with a scheduled visit, not a goodbye at discharge.

TOLAC counseling, GBS prophylaxis, gestational diabetes targets, and third-trimester bleeding differentials are high-frequency skills—rehearse them until the protocol is automatic. Reproductive emergencies (ectopic, torsion, TOA) remain stopwatch diagnoses in every ED and clinic.

Obstetric hemorrhage protocols (tone, trauma, tissue, thrombin) run in parallel with massive-transfusion readiness and uterotonic literacy. Eclampsia prevention and treatment with magnesium includes toxicity monitoring—loss of reflexes and respiratory depression are the stop signs. Category II/III fetal heart tracings drive intrauterine resuscitation then delivery decisions on a clock.

Gynecologic oncology screening (HPV/Pap pathways, endometrial risk factors) prevents late-stage disease more than heroic surgery. Pelvic pain always includes pregnancy test and torsion/ectopic thinking in appropriate patients. OB/GYN chapters close when both maternal and fetal (or future fertility) clocks are named explicitly.

GBS prophylaxis timing, gestational diabetes targets and postpartum testing, Rh immune globulin windows, and third-trimester bleeding (previa vs abruption vs labor) are protocol chapters—rehearse the first actions and the imaging/delivery branch before the emergency arrives. Contraception MEC categories turn comorbidity lists into method safety, not opinion.

Intrapartum safety is checklist medicine: shoulder dystocia maneuvers in order, cord prolapse elevation and urgent delivery, breech decision trees, and postpartum hemorrhage simultaneous actions. Rehearse until the words are automatic under adrenaline.

Gynecologic care across the lifespan includes adolescent confidentiality, fertility desires, menopause shared decisions, and cancer predisposition counseling when family history demands it. Imaging in pregnancy prefers ultrasound and MRI when possible; ionizing studies need a clear decision-changing question. Close the chapter by naming the maternal clock and the fetal (or fertility) clock you are watching.

Preterm labor evaluation separates true labor from false contractions with cervical change, fetal fibronectin context where used, and tocolysis/steroid/GBS decisions that are time-bound. Magnesium for neuroprotection and antenatal corticosteroids have indication windows—know them cold.

Gynecologic ultrasound literacy (IUP location, adnexal masses, endometrial thickness contexts) changes operative urgency. Oncology referrals after abnormal screening need documented closed-loop follow-up so results never orphan. Every delivery chapter includes the fourth trimester: bleed, pressure, clot, infection, mood, and contraception.`,
  },
  {
    test: /patholog/i,
    prose: `**Pathology deep frame — textbook chapter.**

Gross and microscopic patterns are crystallized mechanisms. Link inflammation types (acute neutrophilic, chronic lymphocytic/plasma cell, granulomatous), necrosis patterns (coagulative, liquefactive, caseous, fat, fibrinoid), neoplasia features (dysplasia, invasion, metastasis hallmarks), and hemodynamic lesions (congestion, edema, thrombosis, embolism, infarction) to the clinical syndrome.

Pathology vocabulary exists to make mechanism visible—use it to predict complications (e.g., squamous metaplasia locations, granuloma differential). Immunohistochemistry and molecular pathology extend the morphologic differential; they do not replace it. A complete answer names the pattern and the process that produced it.

Wound healing timelines (hemostasis, inflammation, proliferation, remodeling) explain dehiscence and keloid teaching. Pathologic calcification (dystrophic vs metastatic) mirrors local injury versus systemic calcium-phosphate imbalance. Cellular aging (telomeres, senescence, proteostasis failure) links to cancer risk and degenerative disease. Always ask whether the slide shows cause, effect, or both.

Chemical and physical injury patterns (burns, radiation, toxins) and the metastatic cascade (EMT → intravasation → colonization) complete the injury–repair–spread arc. Pathology vocabulary exists to forecast complications, not to decorate reports.

Inflammation types and necrosis patterns should predict complications (abscess, fistula, scarring, carcinogenesis). When the report says “invasion,” the clinical chapter has already changed stage and therapy.

Aging, calcification, and wound-healing timelines explain why the same injury looks different weeks later. Metastatic cascade steps are inefficient—which is why staging and adjuvant decisions matter even after “clear margins.”

Neoplasia hallmarks (growth signals, evade suppression, immortality, angiogenesis, invasion/metastasis, metabolic rewiring, immune evasion) turn morphologic grades into mechanism. Premalignant lesions and carcinoma in situ teach interception before invasion.

Hemodynamic pathology (thrombosis Virchow triad, embolism sources, infarction red vs white) predicts where the next lesion appears. Always ask whether the slide explains the syndrome or only documents end-stage damage. Pathology mastery is forecasting the next complication from the pattern on the page.

Inflammation staging on the slide predicts clinical tempo: neutrophils imply hours; lymphocytes and plasma cells imply days to longer; granulomas imply persistent antigen or indigestible material. Match the tempo to the differential.

Molecular pathology (IHC, FISH, NGS panels) refines therapy but still rests on adequate sampling and clinical context—garbage in, garbage out. Amyloid, storage, and deposition diseases are pathology patterns with systemic hunt lists. End each pathology chapter by stating the complication the pattern forecasts (rupture, fistula, invasion, organ failure) so the report drives action.

Grading versus staging answer different questions—biology of the tumor cells versus anatomic extent—and both drive therapy. Margins and lymphovascular invasion are pathology sentences that rewrite adjuvant decisions.

Autopsy and quality correlation close the learning loop when outcomes surprise the team. Frozen section exists to answer an intraoperative yes/no that changes the operation now—not to replace permanent histology. Pathology mastery is translating pattern → process → next clinical action in one breath.

When the report lists invasion or positive margins, the clinical chapter has already changed stage and adjuvant timing—translate the sentence into the next tumor-board action.`,
  },
];

export const DEEP_ORGAN: { test: RegExp; prose: string }[] = [
  {
    test: /cardiovascular/i,
    prose: `**Cardiovascular organ frame — textbook chapter.**

Ischemia, arrhythmia, pump failure, valve lesions, pericardial constraint, and vascular obstruction are distinct failure modes. Mixing them kills—for example, large fluid boluses for tamponade or massive PE obstructive physiology, or nitrates in preload-dependent right-ventricular infarction. Always name the failure mode before the drug.

Oxygen supply–demand mismatch, preload/afterload/contractility, and electrical conduction form the three teaching axes. Bedside exam (JVP, pulses, edema, lung sounds, murmurs timed to cycle) still sorts many pathways before imaging. Acute coronary syndromes, heart failure phenotypes, shock, and syncope each demand a can’t-miss list and a clock.

Pulmonary embolism and tamponade are obstructive physiology cousins—fluids and vasopressors behave differently than in sepsis. Valvular timing on exam predicts which chamber faces pressure or volume overload. After any acute coronary event, secondary prevention (antiplatelet, statin, ACE/ARNI/β-blocker as indicated, rehab) is part of the same chapter as the cath lab.

Preload, afterload, and contractility must be named before vasoactive choice—phenylephrine, norepinephrine, dobutamine, and nitroprusside are mechanism tools, not interchangeable “pressors.” Diastolic dysfunction and valvular stenosis are preload-sensitive; distributive shock is often afterload-sensitive once volume is restored.

Secondary prevention after ACS and the GDMT spine in HFrEF (ARNI/ACE/ARB, β-blocker, MRA, SGLT2i as indicated) are pathophysiology applied over months. Document rhythm, rate, ischemia, and pump function as four parallel problems when the chart is complex.

Shock phenotypes must be reassessed after each intervention—fluids that help hypovolemia harm cardiogenic pulmonary edema. Bedside ultrasound (LV function, RV strain, IVC, lung lines) updates the phenotype in minutes.

Arrhythmia chapters separate unstable (electricity) from stable (drug/diagnosis) pathways before the antiarrhythmic is chosen. Always name ischemia, electrolytes, and drugs as reversible triggers.`,
  },
  {
    test: /nervous|behavioral health/i,
    prose: `**Nervous system & behavioral health organ frame — textbook chapter.**

Localize the lesion and tempo first. Hyperacute focal deficits are vascular until proven otherwise; fluctuating attention is delirium until proven otherwise; subacute psychiatric change still needs medical and substance exclusion. For behavioral crises, safety and toxidromes precede personality theories.

Central versus peripheral patterns, upper versus lower motor neuron signs, and cortical versus subcortical features prevent shotgun imaging without a hypothesis. Seizure versus syncope discrimination uses prodrome, tonic–clonic activity, recovery, and injury pattern. Psychiatric formulations include risk, capacity, and social supports as clinical data.

For behavioral health crises, toxidromes and medical encephalopathy stay on the board until excluded. Document MSE findings specifically—not “psychosis” alone. Continuity after acute stabilization (sleep, meds, follow-up within days) prevents rapid readmission. Localization still matters when “altered mental status” is actually a focal stroke or nonconvulsive seizure.

Serious mental illness care includes ACT teams, housing, and medication monitoring as one plan. Somatic symptom and illness-anxiety pathways need scheduled visits and restrained testing—not confrontation.

Stroke localization plus time last known well plus thrombolysis/thrombectomy eligibility is one continuous algorithm. Status epilepticus has timed benzodiazepine then ASM steps—do not stall for EEG when the patient is convulsing.

Delirium prevention (sleep, orientation, vision/hearing aids, medication review) is neurologic hygiene on every ward. For behavioral health, level-of-care decisions and lethal-means counseling are procedures with documentation standards equal to a procedure note.

Raised intracranial pressure teaching (head of bed, CO₂, osmotherapy, neurosurgery timing) is a physiology protocol. Meningitis/encephalitis clocks start antibiotics/antivirals before every result returns when suspicion is high.

Substance intoxication and withdrawal stay on the board for every altered mental status. Behavioral plans fail without housing, follow-up within days, and a written crisis pathway.`,
  },
  {
    test: /multisystem/i,
    prose: `**Multisystem organ frame — textbook chapter.**

Prefer one mechanism that explains many findings (sepsis, toxidrome, endocrine crisis, vasculitis, thrombotic microangiopathy, malignancy, mitochondrial energy failure) over fragmented organ lists. Ask what test would falsify the unifying diagnosis today, and what therapy must start before that test returns when delay is dangerous.

Track shared pathways: endothelial injury, cytokine amplification, microvascular thrombosis, autonomic storm, and toxin exposures. Multisystem lessons reward a coherent problem representation and a prioritized action list.

When findings span skin, kidney, lung, and CNS, think vasculitis, endocarditis, TTP/HUS-spectrum disease, catastrophic APS, sepsis, and drug reaction with eosinophilia. Draw a timeline: what started first, what drugs were added, what exposures occurred. One unifying lab (blood cultures, ADAMTS13 pathway thinking, ANA/ANCA in context, smear for schistocytes) beats five disconnected consults. If no unifier exists, say so explicitly and treat the organ threats in parallel.

Multisystem pathophysiology also includes fever of unknown origin, weight loss with night sweats, and “failure to thrive” across ages—each is a syndrome of syndromes. Prefer a problem representation that names the tempo (hyperacute, acute, subacute, chronic) and the dominant pathway (infectious, inflammatory, neoplastic, toxic-metabolic, ischemic). Reassess the unifier every day; new focal findings should either fit or force a rewrite of the story.

When the unifier is still missing after 48 hours, broaden deliberately: travel, exposures, drugs, immunodeficiency, and occult infection/malignancy. Avoid adding every organ’s consult without a shared question—parallel work needs a conductor.

SIRS physiology without infection, toxidromes that span many organs, and endocrine crises that look like sepsis are classic multisystem traps—name the mechanism before the antibiotic or the pressor.

Lab patterns that unify systems—cytopenias with schistocytes, anion-gap acidosis with osmolar gap, fever with eosinophilia—should trigger a named syndrome, not another organ-specific consult without a question.

When multiple organs fail in hours, think shock, toxin, adrenal crisis, and catastrophic infection first. When they fail over weeks, think inflammation, malignancy, and chronic endocrine/metabolic disease. Tempo remains the first sorter.

Toxidromes, endocrine crises, and thrombotic microangiopathies are multisystem patterns that look like “sepsis plus confusion” until you name them. Keep a smear, glucose, ECG, and med list in the first wave of data.

When inflammation scores are high but cultures are negative, widen to sterile inflammatory mimics and drug reaction syndromes. Reassess the unifier daily; a new focal finding should fit or rewrite the story.

Fever plus rash plus organ injury patterns (meningococcemia, RMSF, DRESS, Still’s, endocarditis) demand early consents for cultures and careful drug charts. Do not let “viral syndrome” close the case when red flags accumulate.

Sepsis mimics (adrenal crisis, thyroid storm, salicylate, massive PE) deserve a named alternative on the first note. Tempo plus a unifying lab often beats more organ consults.`,
  },
  {
    test: /respirat/i,
    prose: `**Respiratory organ frame — textbook chapter.**

Separate airway, parenchymal, pulmonary vascular, pleural, chest-wall, and central drive problems. Not all hypoxemia is “more nasal cannula”—shunt, V/Q mismatch, diffusion limitation, hypoventilation, and low inspired oxygen have different tools. CO₂ retention and work of breathing tell you when ventilation support is needed.

Asthma/COPD physiology, pneumonia, ARDS, PE, and pleural disease each change auscultation, imaging, and gas-exchange patterns differently. Peak pressures, plateau pressures, and compliance matter once a ventilator is involved. Smoking, aspiration risk, and immunosuppression reshape the differential.

Dead-space versus shunt thinking explains why oxygen alone fails in some hypoxemia and why CO₂ rises when ventilation is inadequate. Peak inspiratory vs plateau pressure splits airway resistance from compliance problems. Liberation from the ventilator is a daily readiness skill, not a one-time event.

Obstructive versus restrictive spirometry, DLCO patterns, and the A-a gradient turn gas-exchange theory into orders. Know when high-flow, NIV, or intubation is the right next ventilator decision—and what plateau-pressure limit you will respect after intubation.

PE workup is pretest probability plus D-dimer or definitive imaging—not shotgun CT for every tachypnea. Smoking cessation and oxygen criteria belong in chronic chapters beside the acute rescue plan.

ARDS is a compliance and driving-pressure problem once the tube is in—oxygen alone is not the therapy. Know proning and paralysis indications as escalation steps.

Chronic home oxygen, nocturnal ventilation, and pulmonary rehab change survival and readmissions. Inhaler technique and smoking status are respiratory vital signs.`,
  },
  {
    test: /renal/i,
    prose: `**Renal organ frame — textbook chapter.**

Volume first, then filter, then tubules. Obstruction is reversible blindness if missed—image or bladder-scan early when post-renal disease is plausible. Electrolyte and acid–base patterns are tubular physiology made visible; read them as such, not as isolated lab fires.

AKI mechanisms (prerenal, ATN, AIN, glomerular, vascular) and CKD complications (anemia, mineral bone disease, acidosis, hyperkalemia, volume) structure both acute and chronic care. Nephrotoxic stacks and renally cleared drugs are daily safety issues. Dialysis indications (AEIOU) are decisions, not automatic creatinine cutoffs.

Urine microscopy still earns its keep: muddy brown casts, RBC casts, crystals, and sterile pyuria each point differently. Hyperkalemia with ECG changes is a membrane emergency treated before the “perfect” etiology workup finishes. In CKD, medication reconciliation for dosing is as important as the GFR number itself.

Nephron transporter maps explain diuretic class and stone risk. Nephrotoxin stacks (NSAIDs, aminoglycosides, contrast, ACEi/ARB in hypovolemia) are daily prevention. Metabolic evaluation of stones follows the crystal type—not endless “drink more water” alone.

Volume exam plus FeNa/FeUrea context plus urinalysis sorts AKI faster than repeating creatinine alone. Hyperkalemia with ECG changes is treated as a membrane emergency while the etiology workup continues.

CKD-MBD, anemia of CKD, and acidosis are complication clusters that need scheduled labs, not crisis-only care. Always reconcile renally cleared drugs when GFR falls.

Acid–base and potassium disorders are emergency membranes and ventilation problems as much as nephrology puzzles—stabilize first. Obstruction is ruled out early when post-renal disease is plausible.

Dialysis indications (AEIOU) are clinical judgments. Transplant and immunosuppression infection risk rewrite fever workups forever after.`,
  },
  {
    test: /gastro|hepat|digest/i,
    prose: `**Gastrointestinal & hepatic organ frame — textbook chapter.**

Bleed, obstruct, perforate, inflame, and fail to absorb—these verbs organize acute GI care. Portal hypertension physiology links varices, ascites, and encephalopathy. Liver synthetic failure (INR, bilirubin, albumin) differs from cholestasis and from isolated enzyme leaks.

Ischemic bowel, cholangitis, and pancreatitis are time-sensitive. Chronic disease chapters connect H. pylori, IBD immune dysregulation, and cirrhosis complication surveillance. Always ask whether the abdomen needs an operation tonight versus medical management with serial exams.

GI bleed pathways separate upper vs lower, variceal vs nonvariceal, and stable vs exsanguinating—resuscitation and reverse coagulopathy run in parallel with localization. Ascites analysis (SAAG) sorts portal hypertension from other causes. Hepatic encephalopathy is a diagnosis of ammonia-context plus exam, not a number alone.

Motility and ENS disorders, bile formation/gallstones, swallowing/esophageal disease, and hyposplenism infection risk are mechanism chapters that predict specific complications. Ask which lumen, which wall layer, and which hormone or nerve failed.

Variceal versus nonvariceal bleed pathways diverge early—airway, access, reversal, antibiotics in cirrhosis, and definitive endoscopy timing. Ascites with fever is SBP until excluded.

Pancreatitis severity and cholangitis (Charcot/Reynolds) are clocks that escalate to ICU and ERCP. Nutrition and alcohol counseling are disease-modifying, not optional social work footnotes.

Peritonitis and perforation are surgical clocks dressed as abdominal pain—serial exams beat one reassuring early CT when physiology worsens. Cirrhosis decompensation (ascites, bleed, encephalopathy, SBP, HRS) is a syndrome cluster with protocolized first moves.

IBD flares need infection exclusion before escalating immunosuppression. Nutrition is therapy in pancreatitis and short-bowel states.`,
  },
  {
    test: /endocrin/i,
    prose: `**Endocrine organ frame — textbook chapter.**

Hormone axes are negative-feedback loops; interpret levels with the tropic hormone and clinical context (e.g., TSH with free T4). Crisis care (DKA/HHS, adrenal crisis, thyroid storm/myxedema, severe hypo/hypercalcemia, hypoglycemia) is protocol plus trigger search.

Diabetes complications are microvascular and macrovascular teaching maps; insulin physiology explains both DKA and iatrogenic hypoglycemia. Pituitary mass effects add neurosurgical timing to endocrine labs. Replacement therapy must mimic physiology (circadian steroids, titrated thyroid hormone) and include sick-day rules.

Adrenal crisis is volume and steroid first; thyroid storm and myxedema are ICU endocrine diagnoses. Calcium disorders need albumin context and PTH interpretation. Continuous glucose data and insulin pharmacokinetics belong in outpatient chapters that prevent the next DKA admission.

Pituitary mass effects (visual fields, headache, hormone excess/deficiency) mix neurosurgery with endocrine labs. Always interpret hormone levels with the clinical state and binding proteins—free hormone thinking prevents false reassurance.

Sick-day steroid rules and insulin sick-day plans prevent adrenal crisis and DKA readmissions. Interpret thyroid labs with binding state and acute illness (euthyroid sick) in mind.

Calcium/phosphate/PTH triangles and diabetes complication screens (eyes, kidneys, feet, ASCVD risk) are longitudinal organ care. Crisis protocols end with the trigger search—infection, ischemia, medication nonadherence, pregnancy.

Pump and CGM literacy belongs in modern diabetes chapters alongside DKA prevention. Osteoporosis treatment is fracture-risk medicine, not T-score worship alone.

Pituitary apoplexy and adrenal crisis are endocrine codes. Always pair hormone replacement with education on stress dosing and emergency injectable steroids when indicated.`,
  },
  {
    test: /hematol|oncolog|blood|hematopoietic|lymphoreticular/i,
    prose: `**Hematology & oncology organ frame — textbook chapter.**

Anemia is production versus loss/destruction; the reticulocyte count and smear start the fork. Coagulopathy separates platelet problems (mucocutaneous bleeding) from clotting-factor problems (deep bleeding) with important exceptions. Thrombosis chapters need provocation assessment and bleeding-risk balance.

Oncology adds stage, grade, molecular drivers, and performance status to treatment choice. Emergencies (neutropenic fever, spinal cord compression, SVC syndrome, TLS, hypercalcemia) are time-critical. Transfusion decisions weigh indication, antibody risk, and volume.

Smear morphology still sorts microangiopathy, dysplasia, and parasite clues before the send-out panel returns. Anticoagulation chapters always balance clot and bleed with a planned duration. In lymphoma/leukemia teaching, lineage and genetics beat eponyms alone.

Transfusion reactions and TACO/TRALI are stopwatch diagnoses after blood products. Neutropenic fever pathways start antibiotics before the perfect source is found. Oncologic staging is a decision language—stage/grade/driver/performance status—not a paperwork afterthought.

Transfusion thresholds differ by context (ACS, bleeding, marrow failure); know why you are giving the unit. DIC versus TTP versus ITP versus liver coagulopathy are mechanism forks with opposite therapies.

Oncologic emergencies (neutropenic fever, cord compression, SVC, TLS, hypercalcemia) have timed first hours. Staging language (TNM, biomarkers, performance status) decides cure intent versus palliation—say which you are pursuing.

Cytopenia mechanisms (production, destruction, sequestration, loss) sort marrow exams versus hemolysis labs. Anticoagulation bridging and procedure planning prevent silent clotting or bleeding disasters.

CAR-T and checkpoint eras add CRS and irAE recognition to oncologic emergencies. Goals-of-care conversations are timed clinical procedures when cure intent ends.`,
  },
  {
    test: /pediatric/i,
    prose: `**Pediatric organ-system frame — textbook chapter.**

Age recalibrates every normal range and every differential. Neonates and young infants declare illness with poor feeding, apnea, and temperature instability more than with classic focal complaints. Weight-based physiology means smaller absolute losses are proportionally huge—dehydration math is mandatory.

Congenital anomalies, inborn errors, and nonaccidental trauma occupy larger shares of the differential than in adults. Vaccination status is part of the infectious-disease history. Caregiver capacity and social determinants determine whether an outpatient plan is safe. Always ask: is this child toxic, and can this caregiver execute the plan tonight?

Growth charts and developmental milestones are longitudinal vital signs. Dehydration percentage estimates drive fluid plans. Antibiotic stewardship still applies—viral bronchiolitis does not need antibacterial coverage. Transition-of-care teaching for adolescents with chronic disease prevents drop-off from pediatric specialty care.

Safe sleep, vaccine counseling, and obesity prevention are population health delivered one family at a time. Document anticipatory guidance; it is clinical work with a code and a purpose.

Appearance (toxic versus well) plus age in months often outweighs a single vital-sign number—but never ignore hypoxia or poor perfusion because the child is “quiet.” Caregiver teach-back is the discharge safety net.

Growth faltering and obesity both need longitudinal charts and comorbidity screens. Transition planning for adolescents with chronic disease prevents gaps when pediatric specialty care ends.

Weight-based emergency dosing references must be open before the first drug is drawn. Brief unexplained events, BRUE risk stratification, and safe-sleep counseling are same-visit work.

Social determinants (food, housing, caregiver mental health) decide whether an elegant plan survives the night. Document them as clinical data.`,
  },
  {
    test: /reproduct/i,
    prose: `**Reproductive organ-system frame — textbook chapter.**

Pregnancy testing gates abdominal/pelvic pain evaluation in appropriate patients. Early pregnancy complications (ectopic, miscarriage, molar disease) are location-and-stability problems first. Later pregnancy complications (preeclampsia, preterm labor, abruption, previa, cholestasis) mix maternal and fetal clocks.

Gynecologic emergencies (torsion, TOA, hemorrhage) need surgical timing literacy. Hormonal axes (HPO) explain amenorrhea, AUB, and infertility better than organ-by-organ lists. Contraception and preconception counseling are core reproductive care, not electives. Document gestational age dating clearly—every subsequent decision hangs on it.

Postpartum hemorrhage protocols, Rh status, and lactation medication safety are daily skills. Hypertensive disorders can present after discharge—early postpartum visits catch them. Reproductive justice framing means offering options without coercion and documenting informed refusal when patients decline recommended interventions.

Preconception optimization for diabetes, hypertension, and teratogen exposure changes outcomes more than heroic intrapartum saves. Dating accuracy is the foundation of every later decision—write how gestational age was established.

Ectopic pregnancy is a stability-and-location problem: free fluid, β-hCG pattern, and operative versus medical pathways. Hypertensive disorders of pregnancy can present postpartum—early visits catch seizures and stroke risks.

Contraception after delivery and abortion care require method counseling without coercion and clear return precautions. Dating quality (LMP versus ultrasound) underpins every later decision—document how GA was established.

Postpartum hemorrhage stages escalate through mechanical, medical, and procedural steps without waiting for a single “cause.” Hypertensive emergency in pregnancy uses protocol agents and delivery timing decided with obstetrics.

Early pregnancy loss counseling is clinical care with follow-up β-hCG or ultrasound closure. Respect autonomy while naming medical risk clearly.`,
  },
  {
    test: /musculoskeletal|rheum|msk/i,
    prose: `**Musculoskeletal / rheumatology organ frame — textbook chapter.**

Separate articular from periarticular pain, inflammatory from mechanical patterns, and monoarticular from polyarticular disease. Septic arthritis stays on the monoarthritis list until excluded. Axial versus peripheral involvement sorts spondyloarthritis from RA-like patterns.

Fracture, compartment syndrome, and cauda equina are stopwatch diagnoses. Growth plates change pediatric injury patterns. Rheumatologic labs (RF, anti-CCP, ANA, ANCA, HLA-B27) support syndromes—they do not replace the joint exam. Function and work status belong in every MSK note.

Back pain red flags (cancer history, IVDU, neurologic deficits, incontinence) change imaging urgency. Crystal vs septic arthritis can coexist in teaching—when in doubt, aspirate. Rehab and weight-bearing status are prescriptions, not afterthoughts.

Fracture description (open/closed, displacement, joint involvement) drives urgency. Compartment syndrome pain out of proportion is a surgical clock. Rheumatologic serologies support syndromes—they never replace the joint exam and the time course.

Monoarthritis is septic until proven otherwise when the joint is hot—aspirate before steroids. Back pain with neurologic deficits, cancer history, or IVDU is an imaging urgency, not a primary-care deferral.

Crystal disease, seropositive RA patterns, and spondyloarthritis axial features sort chronic inflammatory care. Rehab prescriptions (weight-bearing status, ROM goals) are part of the treatment, not an afterthought PT referral line.

Open fractures and compartment syndrome are surgical emergencies with timed antibiotics and fasciotomy decisions. Prosthetic joint infection pathways differ from native septic arthritis.

Rheumatologic emergencies (cervical instability, scleroderma renal crisis, catastrophic APS) are uncommon but protocol-worthy. Function and return-to-work goals belong in every MSK plan.`,
  },
];
