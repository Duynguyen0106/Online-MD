/**
 * Dense multi-paragraph textbook banks for domains that were under-enriched.
 * Imported by factual-enrichment.ts and merged into topic enrichment.
 * Target: many entries ≥3k characters of declarative teaching prose.
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
    test: /stroke|tia|nihss|thrombolysis|alteplase|large.?vessel|hemorrhag/i,
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
];

export const DEEP_CATEGORY: { test: RegExp; prose: string }[] = [
  {
    test: /pathophysiol/i,
    prose: `**Pathophysiology deep frame — textbook chapter.**

Every pathophysiology chapter should answer four questions in order. (1) What is the primary disrupted variable—pressure, flow, volume, compliance, diffusion, conduction, secretion, receptor signaling, or immune recognition? (2) What compensatory systems activate, and what bedside signs do those compensations create (tachycardia, vasoconstriction, hyperventilation, hypertrophy, cytokine cascades)? (3) When does compensation become maladaptive (vasoconstriction that worsens afterload, hyperventilation that exhausts respiratory muscles, remodeling that stiffens a ventricle)? (4) Which measurement proves your mechanism (exam finding, waveform, lab pattern, imaging, provocation test)?

Write one causal sentence linking molecular or cellular change → organ dysfunction → patient finding. If you cannot, the section is still a summary, not a chapter. Prefer diagrams that show direction of causality over lists of associated features. When two mechanisms compete (e.g., cardiogenic versus distributive shock), name the discriminating test and what you will do differently based on the result. Pathophysiology mastery is prediction: given the lesion, forecast the vital signs, labs, and physical exam before opening the answer key.`,
  },
  {
    test: /clinical medicine|internal medicine|advanced clinical|family medicine/i,
    prose: `**Clinical medicine deep frame — textbook chapter.**

Ward and clinic chapters are decision engines: recognize the syndrome, name the can’t-miss alternative, choose data that changes the branch point, start therapy when delay harms, and reassess on a clock. Document the story so the next clinician can continue it without rediscovering the differential. High-value care means fewer low-yield tests and more time-sensitive actions—cultures before antibiotics when safe, ECG before cath lab activation pathways, glucose before “psych” labels.

For each lesson, practice a 30-second verbal compact: leading diagnosis likelihood, danger if wrong, and next three actions. That compact is how textbook knowledge becomes overnight cross-cover skill. Always include disposition criteria and return precautions in outpatient chapters. When guidelines conflict with an individual patient’s goals, record the shared decision explicitly. Clinical medicine without follow-up planning is incomplete care.`,
  },
  {
    test: /psychiatr|behavioral/i,
    prose: `**Psychiatry deep frame — textbook chapter.**

Organize every encounter around safety, syndrome, substrate (medical/substance contributors), and supports (therapy, medications, social determinants). Suicide risk assessment is a procedure: ideation, plan, intent, means, protective factors, prior attempts, and lethal-means counseling—documented specifically. Capacity and involuntary treatment follow legal criteria and decision-specific assessment, not diagnostic labels alone. Medications are tools with measurable toxicities (QTc prolongation, NMS, serotonin syndrome, clozapine agranulocytosis, metabolic syndrome)—monitoring is part of the prescription.

Separate delirium from primary psychosis, mania from stimulant intoxication, and depression from hypothyroidism or sleep apnea. Collateral is clinical data. Trauma-informed interviewing reduces re-traumatization without omitting safety questions. The endpoint of a psychiatry chapter is a learner who can write a problem representation and a risk formulation that guides level of care.`,
  },
  {
    test: /cell biology|molecular/i,
    prose: `**Cell and molecular biology deep frame — textbook chapter.**

Track information flow (DNA→RNA→protein), quality control (DNA repair, UPR, proteasome/autophagy), and fate decisions (cell cycle, senescence, apoptosis, differentiation). Disease is usually a broken control loop, not a single molecule floating alone. Tie each control loop to a cancer pathway, neurodegeneration mechanism, infection strategy, or drug target so the cell chapter predicts phenotypes.

Ask which compartment fails (nucleus, mitochondria, lysosome, peroxisome, plasma membrane) and whether the problem is too much signal, too little signal, or signal at the wrong time. Experimental medicine vignettes (knockouts, inhibitors, reporters) should be translated into human disease correlates. Memorizing organelle lists without regulation is not mastery.`,
  },
  {
    test: /anatom|embryo/i,
    prose: `**Anatomy and embryology deep frame — textbook chapter.**

Structure predicts injury only when relationships are explicit: what borders it, what traverses it, what happens if it is compressed, transected, or failed to form at a developmental week. Draw once from memory, then check. Cluster anomalies by embryologic field (pharyngeal apparatus, midgut rotation, neural crest migration, septation events) rather than memorizing isolated facts.

Clinical anatomy chapters should end in procedures and syndromes: nerve blocks, surgical approaches, referred pain maps, and congenital lesion patterns. Surface landmarks exist to keep needles and knives out of trouble. Embryology earns its place when a congenital heart or branchial cleft vignette becomes inevitable from a failed developmental step.`,
  },
  {
    test: /immunol/i,
    prose: `**Immunology deep frame — textbook chapter.**

Map innate sensing → antigen presentation → lymphocyte effector programs → regulation and resolution. Pathology is too little defense (infection, opportunistic disease), too much defense (hypersensitivity, cytokine storm), or defense aimed at self or graft (autoimmunity, rejection). Connect hypersensitivity types and complement pathways to real diseases, and connect checkpoint biology to both cancer therapy and immune-related adverse events.

Vaccines, monoclonal antibodies, and immunosuppressants are applied immunology—name the cell or cytokine targeted and the infection risk created. Primary immunodeficiency patterns (antibody vs cellular vs phagocyte vs complement) sort by organism type and age at presentation. Write one sentence that links receptor → cell → tissue lesion → clinical syndrome.`,
  },
  {
    test: /biochem/i,
    prose: `**Biochemistry deep frame — textbook chapter.**

Compartmentation, cofactors, and regulation explain more clinical syndromes than enzyme names alone. Fed versus fasting hormonal control flips entire pathway directions; insulin and glucagon are master switches, not trivia. When a toxin or vitamin deficiency appears in a vignette, ask which enzyme’s cofactor or thiol chemistry was hit—then the phenotype becomes inevitable.

Link metabolic pathways to hypoglycemia, lactic acidosis, hyperammonemia, ketoacidosis, and storage phenotypes. Rate-limiting steps and feedback inhibition are the high-yield nodes for drug targets (statins, allopurinol, methotrexate teaching). Draw the pathway with arrows of regulation, not only intermediates.`,
  },
  {
    test: /pharmacol/i,
    prose: `**Pharmacology deep frame — textbook chapter.**

For every drug class: mechanism → physiologic effect → toxicity fingerprint → pharmacokinetic vulnerabilities (CYP interactions, renal/hepatic clearance, distribution, protein binding). Therapeutic index decides monitoring intensity. Drug interactions are pathway collisions—learn collision rules (QT prolongation, serotonergic stacks, CYP3A4/2D6, additive sedation, bleeding risk) rather than infinite pairwise lists.

Agonist versus antagonist versus partial agonist versus inverse agonist language prevents mechanism errors. Receptor upregulation/downregulation explains withdrawal and tolerance. Special populations (pregnancy, pediatrics, geriatrics, CKD) change both dose and drug choice. A complete pharmacology note includes what you monitor and when you stop.`,
  },
  {
    test: /microbiol/i,
    prose: `**Microbiology deep frame — textbook chapter.**

Virulence strategy and host niche predict syndrome better than taxonomy alone. Capsules, toxins, intracellular survival, biofilms, and antigenic variation each create recognizable clinical patterns. Diagnostics start with pre-test probability and the right stain, culture, antigen, or PCR—not shotgun testing without a question.

Therapy without source control fails; therapy without stewardship breeds resistance. Always close the loop: organism → syndrome → controllable focus → shortest effective course. Empiric regimens exist for time-critical diseases (meningitis, necrotizing infection, febrile neutropenia) and must be narrowed. Infection prevention (hand hygiene, catheters, ventilation bundles) is microbiology applied to systems.`,
  },
  {
    test: /epidemiolog|biostat/i,
    prose: `**Epidemiology and biostatistics deep frame — textbook chapter.**

Numbers mean nothing without population denominator and bias structure. Sensitivity/specificity are test properties; PPV/NPV move with prevalence—screen differently in high- versus low-prevalence settings. Treatment effects should be expressed as absolute benefits (ARR, NNT) alongside relative risks that can exaggerate modest gains.

Screening programs need a detectable preclinical phase, acceptable false-positive burden, and mortality or morbidity benefit—not merely earlier diagnosis. Confounding, selection bias, and reverse causation haunt observational data; randomization addresses confounding of known and unknown factors but does not guarantee external validity. Read forest plots and confidence intervals as precision, not as “significance theater.”`,
  },
  {
    test: /ethic|profession/i,
    prose: `**Ethics and professionalism deep frame — textbook chapter.**

Translate principles (autonomy, beneficence, nonmaleficence, justice) into procedures: capacity assessment steps, consent elements, confidentiality exceptions, error disclosure scripts, and triage criteria that are transparent and revisable. Professionalism includes documentation quality, handoff integrity, and speaking up for safety—ethics without operations is decoration.

Conflicts of interest, boundary issues, and social media pitfalls are clinical risk domains. When patients refuse recommended care, document understanding and offer the least harmful alternative still aligned with goals. Resource allocation decisions should use explicit criteria rather than stealth bedside rationing. Cultural humility improves history quality and trust.`,
  },
  {
    test: /surgery/i,
    prose: `**Surgery deep frame — textbook chapter.**

Indication clarity, anatomy, physiologic reserve, and complication surveillance define operative care. The operation begins with preoperative optimization (meds, glucose, smoking, nutrition, VTE risk) and ends only after leak, bleed, infection, and ischemia windows are respected. Consent is a conversation about material risks, benefits, and alternatives—not a signature alone.

Postoperative fever, tachycardia, and oliguria have timed differentials (atelectasis/POD timing teaching, VTE, leak, bleed, infection). Source control and antibiotics partner; antibiotics without drainage of abscess fail. Minimally invasive approaches change incision morbidity, not the need for anatomic respect. The surgical learner names the next complication they are watching for tonight.`,
  },
  {
    test: /pediatr/i,
    prose: `**Pediatrics deep frame — textbook chapter.**

Age is a vital sign. Vital-sign norms, immune history, developmental trajectory, and caregiver systems change the differential every few months of life. Congenital heart disease, metabolic disease, and nonaccidental trauma rise in younger age bands; behavioral and school issues rise later—but medical mimics never fully disappear.

Safety nets—vaccines, safe sleep, abuse screening, growth charts, vision/hearing—are not “extra”; they are the pediatric method. Weight-based dosing and formulation literacy prevent errors. Family-centered communication means explaining uncertainty without outsourcing decisions to fear. A pediatric chapter ends with anticipatory guidance tied to the next developmental window.`,
  },
  {
    test: /obstetric|gynecol/i,
    prose: `**Obstetrics and gynecology deep frame — textbook chapter.**

In obstetrics, maternal physiology shifts blood volume, coagulation, minute ventilation, and airway risk; fetal considerations constrain imaging and drug choice. Hemorrhage and hypertensive emergencies (preeclampsia/eclampsia spectrum) are protocolized because minutes matter. Shoulder dystocia, cord prolapse, and breech emergencies are rehearsal skills.

In gynecology, pregnancy testing is part of the abdominal/pelvic pain pathway for appropriate patients. Ectopic pregnancy, ovarian torsion, PID/TOA, and miscarriage each have time-sensitive branches. Contraception counseling is preventive medicine with mechanism-specific risks (estrogen and thrombosis). Oncologic pathways begin with screening literacy and end with staging discipline.`,
  },
  {
    test: /patholog/i,
    prose: `**Pathology deep frame — textbook chapter.**

Gross and microscopic patterns are crystallized mechanisms. Link inflammation types (acute neutrophilic, chronic lymphocytic/plasma cell, granulomatous), necrosis patterns (coagulative, liquefactive, caseous, fat, fibrinoid), neoplasia features (dysplasia, invasion, metastasis hallmarks), and hemodynamic lesions (congestion, edema, thrombosis, embolism, infarction) to the clinical syndrome.

Pathology vocabulary exists to make mechanism visible—use it to predict complications (e.g., squamous metaplasia locations, granuloma differential). Immunohistochemistry and molecular pathology extend the morphologic differential; they do not replace it. A complete answer names the pattern and the process that produced it.`,
  },
];

export const DEEP_ORGAN: { test: RegExp; prose: string }[] = [
  {
    test: /cardiovascular/i,
    prose: `**Cardiovascular organ frame — textbook chapter.**

Ischemia, arrhythmia, pump failure, valve lesions, pericardial constraint, and vascular obstruction are distinct failure modes. Mixing them kills—for example, large fluid boluses for tamponade or massive PE obstructive physiology, or nitrates in preload-dependent right-ventricular infarction. Always name the failure mode before the drug.

Oxygen supply–demand mismatch, preload/afterload/contractility, and electrical conduction form the three teaching axes. Bedside exam (JVP, pulses, edema, lung sounds, murmurs timed to cycle) still sorts many pathways before imaging. Acute coronary syndromes, heart failure phenotypes, shock, and syncope each demand a can’t-miss list and a clock.`,
  },
  {
    test: /nervous|behavioral health/i,
    prose: `**Nervous system & behavioral health organ frame — textbook chapter.**

Localize the lesion and tempo first. Hyperacute focal deficits are vascular until proven otherwise; fluctuating attention is delirium until proven otherwise; subacute psychiatric change still needs medical and substance exclusion. For behavioral crises, safety and toxidromes precede personality theories.

Central versus peripheral patterns, upper versus lower motor neuron signs, and cortical versus subcortical features prevent shotgun imaging without a hypothesis. Seizure versus syncope discrimination uses prodrome, tonic–clonic activity, recovery, and injury pattern. Psychiatric formulations include risk, capacity, and social supports as clinical data.`,
  },
  {
    test: /multisystem/i,
    prose: `**Multisystem organ frame — textbook chapter.**

Prefer one mechanism that explains many findings (sepsis, toxidrome, endocrine crisis, vasculitis, thrombotic microangiopathy, malignancy, mitochondrial energy failure) over fragmented organ lists. Ask what test would falsify the unifying diagnosis today, and what therapy must start before that test returns when delay is dangerous.

Track shared pathways: endothelial injury, cytokine amplification, microvascular thrombosis, autonomic storm, and toxin exposures. Multisystem lessons reward a coherent problem representation and a prioritized action list.`,
  },
  {
    test: /respirat/i,
    prose: `**Respiratory organ frame — textbook chapter.**

Separate airway, parenchymal, pulmonary vascular, pleural, chest-wall, and central drive problems. Not all hypoxemia is “more nasal cannula”—shunt, V/Q mismatch, diffusion limitation, hypoventilation, and low inspired oxygen have different tools. CO₂ retention and work of breathing tell you when ventilation support is needed.

Asthma/COPD physiology, pneumonia, ARDS, PE, and pleural disease each change auscultation, imaging, and gas-exchange patterns differently. Peak pressures, plateau pressures, and compliance matter once a ventilator is involved. Smoking, aspiration risk, and immunosuppression reshape the differential.`,
  },
  {
    test: /renal/i,
    prose: `**Renal organ frame — textbook chapter.**

Volume first, then filter, then tubules. Obstruction is reversible blindness if missed—image or bladder-scan early when post-renal disease is plausible. Electrolyte and acid–base patterns are tubular physiology made visible; read them as such, not as isolated lab fires.

AKI mechanisms (prerenal, ATN, AIN, glomerular, vascular) and CKD complications (anemia, mineral bone disease, acidosis, hyperkalemia, volume) structure both acute and chronic care. Nephrotoxic stacks and renally cleared drugs are daily safety issues. Dialysis indications (AEIOU) are decisions, not automatic creatinine cutoffs.`,
  },
  {
    test: /gastro|hepat|digest/i,
    prose: `**Gastrointestinal & hepatic organ frame — textbook chapter.**

Bleed, obstruct, perforate, inflame, and fail to absorb—these verbs organize acute GI care. Portal hypertension physiology links varices, ascites, and encephalopathy. Liver synthetic failure (INR, bilirubin, albumin) differs from cholestasis and from isolated enzyme leaks.

Ischemic bowel, cholangitis, and pancreatitis are time-sensitive. Chronic disease chapters connect H. pylori, IBD immune dysregulation, and cirrhosis complication surveillance. Always ask whether the abdomen needs an operation tonight versus medical management with serial exams.`,
  },
  {
    test: /endocrin/i,
    prose: `**Endocrine organ frame — textbook chapter.**

Hormone axes are negative-feedback loops; interpret levels with the tropic hormone and clinical context (e.g., TSH with free T4). Crisis care (DKA/HHS, adrenal crisis, thyroid storm/myxedema, severe hypo/hypercalcemia, hypoglycemia) is protocol plus trigger search.

Diabetes complications are microvascular and macrovascular teaching maps; insulin physiology explains both DKA and iatrogenic hypoglycemia. Pituitary mass effects add neurosurgical timing to endocrine labs. Replacement therapy must mimic physiology (circadian steroids, titrated thyroid hormone) and include sick-day rules.`,
  },
  {
    test: /hematol|oncolog|blood/i,
    prose: `**Hematology & oncology organ frame — textbook chapter.**

Anemia is production versus loss/destruction; the reticulocyte count and smear start the fork. Coagulopathy separates platelet problems (mucocutaneous bleeding) from clotting-factor problems (deep bleeding) with important exceptions. Thrombosis chapters need provocation assessment and bleeding-risk balance.

Oncology adds stage, grade, molecular drivers, and performance status to treatment choice. Emergencies (neutropenic fever, spinal cord compression, SVC syndrome, TLS, hypercalcemia) are time-critical. Transfusion decisions weigh indication, antibody risk, and volume.`,
  },
];
