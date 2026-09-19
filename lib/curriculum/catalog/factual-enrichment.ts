/**
 * Keyword-triggered textbook enrichments for catalog chapter prose.
 * Matched against teaching-point + title text; multiple snippets may apply.
 * Category/organ fallbacks ensure nearly every lesson gets didactic depth.
 */

type TopicLike = {
  title: string;
  points: string[];
  quizExplain: string;
  cardBack: string;
  contentCategory?: string;
  organSystem?: string;
};

const SNIPPETS: { test: RegExp; prose: string }[] = [
  // ——— Biochemistry ———
  {
    test: /glycolys|pfk|hexokinase|glucokinase|pyruvate kinase/i,
    prose: `**Glycolysis — textbook core.**

Glucose is phosphorylated by **hexokinase** (most tissues; low Km; inhibited by G6P) or **glucokinase** (liver/β-cell; high Km; insulin-inducible). The committed step is **PFK-1**, activated by fructose-2,6-bisphosphate and AMP and inhibited by ATP and citrate. Hepatic PFK-2/FBPase-2 raises F2,6BP in the fed state and lowers it in fasting, coordinating glycolysis with gluconeogenesis. **Pyruvate kinase** completes the payoff phase; its deficiency depletes RBC ATP and causes extravascular hemolysis. When oxygen is limiting, LDH regenerates NAD⁺—explaining lactate rise in hypoperfusion.`,
  },
  {
    test: /gluconeogenes|pepck|fructose-1,6|glucose-6-phosphatase/i,
    prose: `**Gluconeogenesis.** Irreversible glycolytic steps are bypassed by pyruvate carboxylase (biotin; mitochondrial) plus PEPCK, fructose-1,6-bisphosphatase, and glucose-6-phosphatase (liver/kidney). High NADH from ethanol metabolism stalls gluconeogenesis and predisposes to hypoglycemia. Cori and alanine cycles return lactate/alanine carbons to the liver.`,
  },
  {
    test: /tca|krebs|citric|anapleros|pdh|α-?ketoglutarate|alpha-?ketoglutarate/i,
    prose: `**TCA cycle.** Acetyl-CoA condenses with oxaloacetate via citrate synthase. NADH/FADH₂ feed the ETC. Anaplerosis (e.g., pyruvate carboxylase) refills intermediates. PDH and α-KGDH require thiamine, lipoic acid, CoA, FAD, and NAD⁺—linking thiamine deficiency and arsenic teaching to this chapter.`,
  },
  {
    test: /etc|electron transport|oxidative phosphorylation|complex i|cytochrome|uncoupl/i,
    prose: `**ETC / OXPHOS.** Complexes I–IV transfer electrons to O₂ while pumping protons; ATP synthase uses the proton motive force. Site-specific inhibitors (cyanide/CO at IV; oligomycin at ATP synthase) and uncouplers (heat without ATP) create classic toxidromes. High-demand tissues (CNS, heart) declare injury early.`,
  },
  {
    test: /glycogen|debranch|von gierke|mcardle|pompe/i,
    prose: `**Glycogen metabolism.** Synthase and phosphorylase are reciprocally regulated. Glucose-6-phosphatase deficiency (von Gierke) causes severe fasting hypoglycemia; muscle phosphorylase deficiency (McArdle) limits exercise; lysosomal acid α-glucosidase deficiency (Pompe) is a compartment problem, not cytosolic glycogenolysis.`,
  },
  {
    test: /fatty acid|beta-?oxid|carnitine|ketone|hmg-?coa synthase/i,
    prose: `**Fatty-acid oxidation & ketones.** Long-chain acyl-CoAs need the carnitine shuttle. β-oxidation yields acetyl-CoA for TCA or hepatic ketogenesis in fasting. Hypoketotic hypoglycemia suggests FAO defects; insulin excess and ethanol suppress ketogenesis.`,
  },
  {
    test: /urea cycle|ornithine|citrulline|argininosuccin|hyperammon/i,
    prose: `**Urea cycle.** CPS1, OTC, ASS, ASL, and arginase detoxify ammonia to urea. OTC deficiency is X-linked with hyperammonemia and low citrulline. Acute management teaching: stop protein, give calories, nitrogen scavengers/dialysis as indicated—while remembering the enzyme map.`,
  },
  {
    test: /purine|pyrimidine|salvage|de novo|gout|lesch|orotic/i,
    prose: `**Nucleotide metabolism.** De novo and salvage pathways supply purines/pyrimidines. HGPRT deficiency (Lesch–Nyhan) increases de novo flux and uric acid. Orotic aciduria implicates UMP synthase. Allopurinol blocks xanthine oxidase in gout teaching; ribonucleotide reductase and thymidylate synthase are chemotherapy targets.`,
  },
  {
    test: /porphyrin|heme synthes|photosensitiv|lead.*heme|ala dehydrat/i,
    prose: `**Porphyrin / heme.** ALA synthase is rate-limiting; lead inhibits ALA dehydratase and ferrochelatase. Acute intermittent porphyria features abdominal pain and neuropsychiatric findings without blistering photosensitivity; PCT features photosensitive blistering. Urine/stool porphyrin patterns discriminate the enzyme block.`,
  },
  {
    test: /fructose|galactose|hereditary fructose|gal-?1-?p|galt/i,
    prose: `**Fructose & galactose.** Essential fructosuria is benign (fructokinase); hereditary fructose intolerance (aldolase B) causes hypoglycemia after fructose. Classic galactosemia (GALT) presents with E. coli sepsis risk, cataracts, and liver injury after milk exposure—remove lactose/galactose.`,
  },
  {
    test: /phenylalanine|tyrosine|pk u|homocystin|methionine|cysteine|one-?carbon|folate|b12|vitamin/i,
    prose: `**Amino-acid & one-carbon metabolism.** PKU is phenylalanine hydroxylase (or BH4) deficiency with musty odor and developmental injury if untreated. Homocystinuria vs Marfan discrimination uses thrombosis and downward lens dislocation patterns. Folate/B12 one-carbon transfer explains megaloblastic anemia and the methyl-trap concept.`,
  },
  {
    test: /eicosanoid|prostaglandin|leukotriene|cox|thromboxane|lipoxin/i,
    prose: `**Eicosanoids.** COX products include prostaglandins and thromboxane; LOX products include leukotrienes. Aspirin irreversibly acetylates COX (platelet TXA₂↓); leukotriene modifiers matter in asthma. NSAID GI/renal toxicity follows loss of protective prostaglandins.`,
  },
  {
    test: /redox|glutathione|antioxidant|nadph oxidase|g6pd/i,
    prose: `**Redox & G6PD.** NADPH from HMP shunt regenerates glutathione. G6PD deficiency predisposes to oxidative hemolysis after primaquine, sulfa drugs, infection, or fava beans—bite/blister cells and Heinz bodies are classic teaching morphology.`,
  },
  {
    test: /lysosomal|sphingolipid|glycogen storage|mucopolysaccharid|i-?cell/i,
    prose: `**Lysosomal storage.** Enzyme deficiencies accumulate sphingolipids, mucopolysaccharides, or glycogen in lysosomes. I-cell disease fails mannose-6-phosphate targeting. Clinical maps pair neurodegeneration, hepatosplenomegaly, and skeletal dysplasia with the missing hydrolase.`,
  },
  {
    test: /membrane lipid|cholesterol synthes|statin|lipoprotein|chylomicron|ldl|hdl/i,
    prose: `**Lipids & lipoproteins.** Chylomicrons carry dietary TG; VLDL carries hepatic TG; LDL delivers cholesterol; HDL participates in reverse transport. Familial hypercholesterolemia is LDL-receptor pathway failure. Statins inhibit HMG-CoA reductase and upregulate LDL receptors.`,
  },

  // ——— CV / pulmonary / renal pathophys ———
  {
    test: /wiggers|cardiac cycle|isovolum|systole|diastole/i,
    prose: `**Cardiac cycle.** Isovolumetric contraction/relaxation bracket ejection and filling. AV valves close with S1; semilunar valves close with S2. Wiggers diagrams link pressure, volume, ECG, and heart sounds—essential for valvular timing and pulse findings.`,
  },
  {
    test: /valvular|stenosis|regurgitation|murmur|aortic stenosis|mitral/i,
    prose: `**Valvular physics.** Stenosis limits forward flow (pressure overload upstream); regurgitation creates volume overload. Timing (sys/dias), location, and radiation map the lesion. Critical AS features delayed carotid upstroke and narrowed pulse pressure; chronic MR tolerates larger volumes until late failure.`,
  },
  {
    test: /shock|microcirculation|distributive|cardiogenic|obstructive|hypovolemic/i,
    prose: `**Shock phenotypes.** Hypovolemic and distributive shocks are usually high-CO or preload-responsive early; cardiogenic is pump failure; obstructive includes tamponade/PE/tension pneumothorax. Lactate and mentation track tissue perfusion. Therapy must match phenotype—fluids help some shocks and harm others.`,
  },
  {
    test: /pericard|tamponade|constrictive|pulsus paradox/i,
    prose: `**Pericardial disease.** Acute pericarditis: positional pain and diffuse ST elevation. Tamponade: impaired diastolic filling, pulsus paradoxus, equalization of diastolic pressures—urgent drainage. Constriction mimics right-heart failure with dissociation of intrathoracic and intracardiac pressures.`,
  },
  {
    test: /compliance|elastance|airway resistance|work of breathing|respiratory mechanics/i,
    prose: `**Respiratory mechanics.** Compliance is ΔV/ΔP; low compliance (fibrosis, edema, ARDS) raises elastic work. High resistance (asthma/COPD) raises resistive work and prolongs expiration. Auto-PEEP and dynamic hyperinflation follow incomplete emptying.`,
  },
  {
    test: /gas exchange|diffusion|v\/q|shunt|dead space|a-?a gradient/i,
    prose: `**Gas exchange.** V/Q mismatch is the commonest hypoxemia mechanism; shunt does not fully correct with oxygen; dead space wastes ventilation (PE, low perfusion). A–a gradient separates extrapulmonary hypoventilation from intrinsic lung causes.`,
  },
  {
    test: /obstructive vs restrictive|spirometry|fev1|fvc|tlc|dlco/i,
    prose: `**PFTs.** Obstruction: ↓FEV1/FVC; restriction: ↓TLC. DLCO falls in emphysema, ILD, anemia, and PAH patterns and rises in polycythemia/alveolar hemorrhage teaching contrasts. Flow–volume loops add upper-airway obstruction clues.`,
  },
  {
    test: /interstitial lung|ild|idiopathic pulmonary fibrosis|honeycomb|ground.?glass/i,
    prose: `**ILD patterns.** Fibrotic ILDs show restriction and low DLCO; HRCT patterns (UIP honeycombing vs NSIP ground-glass) guide differential. Hypersensitivity pneumonitis and connective-tissue disease–ILD require exposure and serologic framing beyond idiopathic IPF.`,
  },
  {
    test: /sleep.?apnea|osa|hypoventilation|obesity hypovent/i,
    prose: `**Sleep-disordered breathing.** OSA features collapsible upper airway with apneas/hypopneas and daytime sleepiness; CPAP is first-line for many. Obesity hypoventilation adds daytime hypercapnia. Screen for pulmonary hypertension and arrhythmias in severe disease.`,
  },
  {
    test: /pneumonia pathogen|cap |hap |vap |community.?acquired pneumonia/i,
    prose: `**Pneumonia pathogenesis.** Aspiration, inhalation, and hematogenous seeding initiate infection; alveolar inflammation impairs gas exchange. Severity scores plus comorbidities guide site of care; resistance risk factors expand coverage. De-escalate with cultures and clinical response.`,
  },
  {
    test: /\btb\b|tubercul|granuloma|caseat/i,
    prose: `**TB granulomas.** Cell-mediated immunity walls off mycobacteria in caseating granulomas. Primary vs post-primary patterns differ radiographically. Latent infection lacks symptoms but can reactivate with TNF inhibitors or immunodeficiency—screen before biologics.`,
  },
  {
    test: /heart failure|hfref|hfpef|congestion|pulmonary edema|bnp/i,
    prose: `**Heart failure.** HFrEF is systolic pump failure; HFpEF is often stiff diastolic filling with comorbidity drivers. Congestion (rales, edema, elevated filling pressures) dominates many admissions. BNP supports diagnosis; treatment pairs decongestion with disease-modifying therapy when indicated.`,
  },
  {
    test: /arrhythmia|atrial fibril|svt|vt |torsades|brady/i,
    prose: `**Arrhythmias.** Unstable tachyarrhythmias need immediate cardioversion. AF rate vs rhythm control and anticoagulation (CHA₂DS₂-VASc) are parallel decisions. VT/VF are shockable arrest rhythms; polymorphic VT with long QT suggests torsades—magnesium and remove QT drugs.`,
  },
  {
    test: /nephrotic|nephritic|glomerul|proteinuria|hematuria.*rbc cast/i,
    prose: `**Glomerular syndromes.** Nephrotic: heavy proteinuria, hypoalbuminemia, edema, hyperlipidemia. Nephritic: hematuria, RBC casts, hypertension, rising creatinine. Pattern recognition narrows the biopsy differential before immunofluorescence/EM details.`,
  },
  {
    test: /acid.?base|winter|metabolic acidosis|respiratory alkalosis|anion gap/i,
    prose: `**Acid–base.** pH → primary process → anion gap → expected compensation (e.g., Winter’s formula) → hunt mixed disorders with delta-delta. HAGMA causes (MUDPILES/GOLDMARK teaching sets) differ from NAGMA (diarrhea vs RTA). Always interpret with clinical context.`,
  },

  // ——— Clinical medicine / clerkships ———
  {
    test: /stemi|nste|acs|troponin|reperfusion|door-to-balloon|fibrinolys/i,
    prose: `**ACS.** ECG within minutes. STEMI prioritizes emergent reperfusion (PCI preferred; fibrinolysis if PCI delayed and no contraindications). NSTE-ACS uses risk stratification and antithrombotic therapy with selective invasive timing. Avoid nitrates in RV infarct or recent PDE-5 inhibitors.`,
  },
  {
    test: /\bsepsis\b|vasopressor|norepinephrine|source control|qsofa|septic shock/i,
    prose: `**Sepsis.** Pair suspected infection with organ dysfunction. Cultures before antibiotics when they do not delay therapy. Fluids and norepinephrine support septic shock; source control is mandatory for drainable foci. Reassess perfusion and de-escalate antibiotics.`,
  },
  {
    test: /dka|hhs|anion gap|insulin infusion|ketoacid/i,
    prose: `**DKA/HHS.** Shared insulin deficiency/resistance plus counter-regulatory hormones. DKA adds ketogenesis/HAGMA; HHS shows extreme hyperosmolality with minimal ketones. Fluids first, potassium before/with insulin, close the gap in DKA before SQ transition, treat precipitants.`,
  },
  {
    test: /gi bleed|varice|melena|hematemesis|brbpr|upper gi/i,
    prose: `**GI bleed.** ABCs and large-bore access first. Resuscitate before definitive endoscopy. Distinguish variceal vs nonvariceal pathways (octreotide/antibiotics vs PPI strategies). Massive transfusion and coagulopathy reversal follow institutional hemorrhage protocols.`,
  },
  {
    test: /cirrhosis|ascites|sbp|hepatic encephalopath|variceal/i,
    prose: `**Cirrhosis complications.** Ascites, SBP, variceal bleed, encephalopathy, and hepatorenal physiology dominate ward care. Diagnostic paracentesis is early in new ascites/decompensation. Lactulose/rifaximin address encephalopathy; alcohol cessation and infection hunt are perpetual themes.`,
  },
  {
    test: /anemia workup|mcv|ferritin|hemolysis|b12 deficiency|iron deficien/i,
    prose: `**Anemia framework.** MCV sorts micro/normo/macrocytic paths. Iron deficiency needs a bleeding/source evaluation in adults. Hemolysis shows ↑LDH, ↓haptoglobin, ↑indirect bili ± reticulocytosis. B12/folate deficiency yields megaloblastic changes—replace and find the cause.`,
  },
  {
    test: /perioperative|preop|rcri|functional capacity|mets /i,
    prose: `**Perioperative risk.** Estimate clinical risk (RCRI concepts) and functional capacity (METs). Optimize anemia, glucose, and cardiopulmonary disease; manage anticoagulation/antiplatelet holds with procedural bleeding risk. Consent must cover material risks and alternatives.`,
  },
  {
    test: /goals of care|code status|palliative|hospice|surrogate/i,
    prose: `**Goals of care.** Identify decision-makers, share prognosis honestly, and align treatments with values. Time-limited trials can structure intensive care. Primary palliative skills (symptom control, spiritual screen, caregiver support) belong on every service.`,
  },
  {
    test: /oncologic emerg|tls|neutropenic fever|spinal cord compress|svcs|hypercalcemia of malignancy/i,
    prose: `**Oncologic emergencies.** Neutropenic fever needs prompt empiric antibiotics. TLS needs prevention/monitoring of K, Phos, Ca, uric acid, and renal function. Cord compression is steroids + urgent imaging/specialties. SVCS and severe hypercalcemia are airway/volume/oncology problems.`,
  },
  {
    test: /hyponatremia|siadh|osmolality|hypertonic saline|ods/i,
    prose: `**Hyponatremia.** Serum osmolality → urine studies → volume status. Severe symptoms may need careful hypertonic saline; overly rapid correction risks ODS. SIADH is euvolemic hypo-osmolar hyponatremia with inappropriate antidiuresis.`,
  },
  {
    test: /aki|atn|prerenal|dialysis|aeiou/i,
    prose: `**AKI.** Prerenal vs ATN vs post-renal. Volume, nephrotoxins, and obstruction imaging come early. AEIOU recalls urgent dialysis triggers. Hold ACEI/ARB/NSAID during hypovolemic stress.`,
  },
  {
    test: /copd|asthma|bronchodil|spo2|niv|noninvasive/i,
    prose: `**Obstructive lung care.** COPD exacerbations: controlled O₂ targets, bronchodilators, steroids, selective antibiotics, NIV for hypercapnic failure. Asthma: repeated SABA, early steroids, escalate for severe obstruction. Teach inhaler technique.`,
  },
  {
    test: /pe\b|pulm(?:onary)? embol|wells|ctpa|d-?dimer/i,
    prose: `**PE.** Pretest probability guides D-dimer vs CTPA/VQ. Massive PE = hypotension; submassive shows RV strain. Anticoagulate when suspicion is high and bleeding risk allows; systemic thrombolysis is for selected high-risk cases.`,
  },
  {
    test: /stroke|tpa|tnk|last known well|ich|intracranial hemorrhage/i,
    prose: `**Stroke.** Last known well, glucose, noncontrast CT to exclude bleed. Thrombolysis is time-bound; LVO may need thrombectomy. BP targets differ around thrombolysis. Do not give antiplatelets until hemorrhage is excluded when reperfusion is planned.`,
  },
  {
    test: /clinical reasoning|problem representation|illness script|diagnostic error/i,
    prose: `**Clinical reasoning.** Build a problem representation (who + tempo + syndrome). Activate illness scripts, then test them with discriminating data. Premature closure and anchoring are common errors—force a can’t-miss alternative onto the board.`,
  },
  {
    test: /dermatology emerg|sjs|ten |necrotizing|purpura fulminans|erythroderma/i,
    prose: `**Derm emergencies.** SJS/TEN: mucosal involvement, detachment, stop offenders, burn-unit logic. Necrotizing infection: pain out of proportion—surgical emergency. Purpura fulminans and acute meningococcemia are resuscitation + antibiotics, not outpatient rash care.`,
  },
  {
    test: /rheumatolog|gout|septic arthritis|lupus flare|giant cell arter/i,
    prose: `**Rheum urgencies.** Septic arthritis is synovial fluid emergency—do not inject steroids first. Gout can mimic infection; crystals do not exclude coinfection. GCA threatens vision—start steroids when suspicion is high while arranging definitive evaluation.`,
  },

  // ——— Surgery / trauma / ICU ———
  {
    test: /appendic|cholecyst|murphy|periton|acute abdomen|sbo|bowel obstruct/i,
    prose: `**Acute abdomen.** Peritonitis + instability may need OR without endless imaging. Appendicitis: probability + selective imaging. Cholecystitis: US first. Cholangitis: Charcot/Reynolds urgency. SBO: decompress, fluids, watch for closed-loop/ischemia.`,
  },
  {
    test: /atls|primary survey|secondary survey|massive hemorrhage|airway with c-spine/i,
    prose: `**ATLS mindset.** ABCDE with hemorrhage control. Airway while protecting C-spine; breathing (pneumothorax/hemothorax); circulation with blood products as indicated; disability; exposure. Tertiary survey catches missed injuries after resuscitation.`,
  },
  {
    test: /hernia|incarcerat|strangulat|inguinal/i,
    prose: `**Hernias.** Incarceration is irreducible; strangulation adds ischemia (pain out of proportion, skin changes, lactate/acidosis). Strangulation is operative urgency. Inguinal anatomy (Hesselbach, processus vaginalis) explains direct vs indirect patterns.`,
  },
  {
    test: /burn|parkland|rule of nines|inhalation injury/i,
    prose: `**Burns.** Airway edema can progress—intubate early when inhalation injury is likely. Estimate TBSA (rule of nines/Lund-Browder) to guide resuscitation. Infection, nutrition, and early rehab dominate burn ICU care after the first hours.`,
  },
  {
    test: /ards|prone|low tidal|mechanical vent|peep|plateau pressure/i,
    prose: `**ARDS / ventilation.** Berlin hypoxemia categories guide severity. Lung-protective ventilation uses low tidal volumes and plateau-pressure limits. Prone positioning helps severe ARDS. PEEP supports recruitment; liberation needs adequate gas exchange and airway protection.`,
  },
  {
    test: /central line|clabsi|sterile barrier|chlorhexidine/i,
    prose: `**CLABSI prevention.** Full sterile barrier, chlorhexidine prep, optimal site choice, and daily necessity review cut infection risk. Unused lines should come out. Bundle compliance is the intervention.`,
  },
  {
    test: /transplant|immunosuppress|rejection|induction therap/i,
    prose: `**Transplant basics.** Induction vs maintenance immunosuppression balances rejection vs infection/malignancy. Prophylaxis (PJP, CMV strategies) is protocolized. Drug levels and drug–drug interactions are outpatient survival skills.`,
  },
  {
    test: /aaa|abdominal aortic|ruptured aaa/i,
    prose: `**Ruptured AAA.** Hypotension + back/abdominal pain ± pulsatile mass. Unstable patients need operative/endovascular pathways—do not delay for perfect imaging. Permissive hypotension concepts appear in transport/OR planning.`,
  },
  {
    test: /ssi|surgical site infection|prophylactic antibiotic|wound class/i,
    prose: `**SSI prevention.** Time antibiotics before incision, control glucose, maintain normothermia, and use appropriate hair removal. Wound class predicts risk. Bundles beat single heroic interventions.`,
  },
  {
    test: /postoperative fever|5 w|atelectasis|dvt|anastomotic leak/i,
    prose: `**Post-op fever & leaks.** Timing suggests wind/water/wound/walking/wonder-drugs. Unexplained tachycardia after bowel anastomosis raises leak concern until proven otherwise—resuscitate and escalate surgically when indicated.`,
  },

  // ——— OB/GYN / pediatrics / FM ———
  {
    test: /preeclampsia|eclampsia|hellp|magnesium sulfate|postpartum hemorrhage|uterotonic/i,
    prose: `**Obstetric emergencies.** Preeclampsia = HTN + proteinuria/end-organ findings; severe features → magnesium and delivery planning. PPH: 4 Ts—massage and uterotonics first, then procedures/transfusion. Shoulder dystocia uses HELPERR maneuvers without fundal pressure.`,
  },
  {
    test: /ectopic|methotrexate.*pregnan|heterotopic|rhogam|anti-?d/i,
    prose: `**Ectopic & Rh.** Unstable suspected ectopic → surgery. Stable methotrexate candidates need reliable follow-up and β-hCG pathways. Give anti-D immune globulin to eligible Rh-negative patients after sensitizing events.`,
  },
  {
    test: /bronchiolitis|ors|oral rehydration|otitis media|strep pharyng|pediatric uti/i,
    prose: `**Core pediatrics.** Bronchiolitis is supportive care—avoid routine bronchodilators/steroids. Mild–moderate dehydration: ORS first. AOM needs good otoscopy and selective antibiotics. Strep testing prevents unnecessary antibiotics. Infant UTI demands quality specimens and selective imaging.`,
  },
  {
    test: /vaccine|immunization|catch-?up schedule|vaers/i,
    prose: `**Vaccines.** True contraindications are uncommon; counsel with disease-risk framing. Catch-up schedules matter. Live vaccines have special immunocompromise rules. Report serious adverse events; mild URI is rarely a reason to permanently defer.`,
  },
  {
    test: /child abuse|non.?accidental|ten-?4|skeletal survey|mandatory report/i,
    prose: `**Child protection.** History inconsistent with injury, patterned bruises, and TEN-4-FACESp clues raise concern. Mandated reporting duties override parental permission. Document objectively and ensure safety.`,
  },
  {
    test: /phq-?9|depression screen|sbirt|audit-?c|tobacco|5as|opioid stewardship|pdmp/i,
    prose: `**Primary-care behavioral health.** PHQ-9 severity guides therapy/meds and forces suicide questions when positive. SBIRT reduces unhealthy alcohol use. Tobacco: counseling + pharmacotherapy. Opioids: PDMP, MME awareness, naloxone, and taper when harm outweighs benefit.`,
  },
  {
    test: /uspstf|screening|nnt|prevention|statin.*primary|ascvd/i,
    prose: `**Prevention science.** Match Grade A/B services to age/sex/risk. Shared decisions matter for close-call screenings. ASCVD risk estimation guides primary-prevention statins. Avoid low-value cascades that create more harm than benefit.`,
  },
  {
    test: /low back pain|cauda equina|snoop|migraine|primary care headache/i,
    prose: `**Back & headache red flags.** Cauda equina (saddle anesthesia, bowel/bladder) is urgent. SNOOP features force secondary headache workups. Most mechanical back pain is activity-based care without early MRI; medication-overuse headache follows frequent combination analgesics.`,
  },

  // ——— Anatomy / embryology ———
  {
    test: /pharyngeal apparatus|branchial|aortic arch|neural crest/i,
    prose: `**Pharyngeal apparatus.** Arches, pouches, and clefts map to adult CN/artery/muscle/gland derivatives. Neural crest contributes heavily to head/neck structures—explaining combined craniofacial and cardiac teaching associations.`,
  },
  {
    test: /fetal circulation|ductus|foramen ovale|cardiac embryology/i,
    prose: `**Fetal circulation.** Umbilical vein → ductus venosus → IVC → foramen ovale / RV→ductus arteriosus bypass lungs. At birth, SVR rises, PVR falls, shunts close. Persistent transitional circulation explains some cyanotic presentations.`,
  },
  {
    test: /neural tube|neuropore|anencephaly|myelomeningocele|folate/i,
    prose: `**Neural tube.** Failure of neuropore closure yields anencephaly or myelomeningocele. Folate periconceptionally reduces risk. Associated Chiari II findings matter for hydrocephalus counseling.`,
  },
  {
    test: /midgut rotation|volvulus|malrotation|omphalocele|gastroschisis/i,
    prose: `**Midgut.** Malrotation predisposes to volvulus—bilious emesis is an emergency until proven otherwise. Omphalocele (membrane, midline, associated anomalies) differs from gastroschisis (no membrane, right of umbilicus).`,
  },
  {
    test: /brachial plexus|erb|klumpke|inguinal canal|hesselbach|cranial nerve|extraocular|orbit/i,
    prose: `**High-yield anatomy.** Brachial plexus trunks/cords explain Erb vs Klumpke patterns. Inguinal canal anatomy separates direct/indirect hernias. Cranial-nerve testing localizes brainstem vs peripheral lesions; extraocular muscle innervation (LR6 SO4) prevents localization errors.`,
  },
  {
    test: /autonomic|sympathetic|parasympathetic|mediastinal compartment|pelvic floor/i,
    prose: `**Autonomic & regional anatomy.** Thoracolumbar sympathetics vs craniosacral parasympathetics explain many drug side-effect maps. Mediastinal compartments organize masses. Pelvic floor support failure contributes to prolapse and incontinence syndromes.`,
  },

  // ——— Micro / ID ———
  {
    test: /gram stain|cell wall|peptidoglycan|lps|vancomycin.*wall/i,
    prose: `**Gram stain logic.** Peptidoglycan thickness and outer membrane/LPS differentiate Gram+ vs Gram−. Cell-wall agents (β-lactams, vancomycin) need growing organisms; atypical organisms stain poorly—explain “culture-negative” teaching traps.`,
  },
  {
    test: /staph|strep|enterobacter|anaerobe|abscess micro|mycobacter|spirochete/i,
    prose: `**Clinical bacteriology.** Staph vs strep patterns (clusters/chains, catalase) start the tree. Enterobacterales dominate many enteric and UTI syndromes. Anaerobes thrive in abscesses—drain what you can. Mycobacteria and spirochetes need special stains/tests.`,
  },
  {
    test: /dna virus|rna virus|herpes|hepatitis|influenza|retrovirus/i,
    prose: `**Medical virology.** DNA vs RNA families predict latency, cancer associations, and antiviral targets. Herpesviruses establish latency; influenza drifts/shifts; blood-borne hepatitis viruses differ in chronicity and vaccine preventability.`,
  },
  {
    test: /mycology|candida|aspergillus|cryptococc|parasitology|helminth|protozoa/i,
    prose: `**Mycology & parasites.** Yeasts vs molds guide empiric antifungals; cryptococcus loves meningitis in immunocompromise. Parasite life cycles explain eosinophilia, travel exposure, and stool/O&P vs antigen testing choices.`,
  },
  {
    test: /steriliz|disinfect|autoclave|infection control|contact precaution/i,
    prose: `**Sterilization & transmission.** Autoclaving kills spores; many disinfectants do not. Contact/droplet/airborne precautions match organism biology. Hand hygiene remains the highest-yield infection-control intervention.`,
  },

  // ——— Immuno / path ———
  {
    test: /mhc|hla|t cell|b cell|cytokine|complement|hypersensitivity/i,
    prose: `**Immunology core.** Innate then adaptive. MHC I/II present antigen; B cells make antibody. Hypersensitivity I–IV organize disease mechanisms; complement amplifies defense and can injure hosts.`,
  },
  {
    test: /transplant rejection|hyperacute|acute cellular|chronic rejection|gvhd/i,
    prose: `**Rejection timing.** Hyperacute = preformed antibody/complement. Acute cellular = T-cell mediated days–months. Chronic = vascular/fibrotic graft injury. GVHD is donor T cells attacking host—rash, liver, gut.`,
  },
  {
    test: /vaccine immunology|germinal center|affinity maturation|adjuvant/i,
    prose: `**Vaccine immunology.** Germinal centers drive affinity maturation and memory. Adjuvants enhance innate activation. Live vs inactivated vs subunit/mRNA platforms differ in durability, boosters, and immunocompromise rules.`,
  },
  {
    test: /tolerance|anergy|regulatory t|autoimmun/i,
    prose: `**Tolerance.** Central deletion and peripheral anergy/Tregs prevent autoimmunity. Breakdown yields organ-specific or systemic autoimmunity—pair mechanism with the clinical syndrome you are studying.`,
  },
  {
    test: /apoptosis|necrosis|cell injury|free radical|ischemia.?reperfusion/i,
    prose: `**Cell injury.** Reversible swelling vs irreversible membrane/mitochondrial failure. Necrosis is inflammatory; apoptosis is programmed and usually tidier. Ischemia–reperfusion adds oxidative burst injury after flow returns.`,
  },

  // ——— Pharm / epi / ethics ———
  {
    test: /receptor|gpcr|tyrosine kinase|second messenger|camp|ip3|dag/i,
    prose: `**Signaling.** GPCRs → cAMP or IP₃/DAG. RTKs → Ras–MAPK / PI3K–AKT. Nuclear receptors rewrite transcription. Amplification explains potent drugs and toxicities.`,
  },
  {
    test: /adme|cytochrome|cyp|half-?life|volume of distribution|therapeutic index|dose.?response/i,
    prose: `**Pharmacology core.** ADME sets onset/duration. Half-life → interval; clearance → steady-state dosing rate. CYP induction/inhibition drives interactions. Therapeutic index frames monitoring intensity.`,
  },
  {
    test: /diuretic|loop |thiazide|spironolactone|raas|ace inhibitor|arb /i,
    prose: `**RAAS & diuretics.** ACEI/ARB interrupt angiotensin II effects (efferent dilation → ↓GFR in some settings). Loops act on NKCC2; thiazides on NCC; mineralocorticoid antagonists spare potassium and help HFrEF/resistant HTN teaching cases.`,
  },
  {
    test: /antibiotic|pk\/pd|mic |time.?dependent|concentration.?dependent|beta-?lactam/i,
    prose: `**Antibiotic PK/PD.** Time-dependent killers (many β-lactams) need adequate time above MIC; concentration-dependent killers benefit from high peaks. Stewardship: right drug, source control, IV-to-PO, and stop dates.`,
  },
  {
    test: /antidote|toxidrome|overdose|toxicology|naloxone|n-?acetylcysteine|fomepizole/i,
    prose: `**Toxicology.** Toxidromes (anticholinergic, cholinergic, opioid, sympathomimetic, sedative-hypnotic) guide empiric care. Antidotes are adjuncts to ABCs: naloxone, NAC, fomepizole, atropine/pralidoxime, etc., matched to the agent.`,
  },
  {
    test: /incidence|prevalence|bias|confound|nnt|rrr|arr|sensitivity|specificity|ppv|npv|odds ratio|hazard ratio/i,
    prose: `**Epi & biostats.** Prevalence is burden; incidence is new events. Sensitivity/specificity are test properties; PPV/NPV depend on prevalence. ARR/RRR/NNT communicate treatment magnitude. Confounding ≠ bias, but both threaten causal claims.`,
  },
  {
    test: /study design|rct|cohort|case.?control|screening test|lead time|length time/i,
    prose: `**Study designs & screening.** RCTs reduce confounding for interventions; cohorts establish sequence; case–control suits rare outcomes. Screening harms include false positives and overdiagnosis; lead-time/length-time biases inflate apparent survival.`,
  },
  {
    test: /consent|capacity|justice|equity|confidentiality|error disclosure|resource allocation/i,
    prose: `**Ethics.** Capacity is decision-specific (understand, appreciate, reason, express). Consent needs material risks/alternatives. Confidentiality has safety exceptions. Disclose harmful errors honestly. Scarce resources demand transparent, equitable triage criteria.`,
  },
  {
    test: /suicid|serotonin syndrome|nms|lithium|alcohol withdraw|ciwa|benzo withdraw/i,
    prose: `**Psych emergencies.** Ask ideation/plan/intent/means. Serotonin syndrome: clonus/hyperreflexia. NMS: rigidity/fever after antipsychotics. Lithium toxicity rises with dehydration/interacting drugs. Alcohol withdrawal: symptom-triggered benzos + thiamine.`,
  },
  {
    test: /action potential|phase 0|sodium channel|qt |torsad/i,
    prose: `**Cardiac EP.** Phase 0 = fast Na⁺. Delayed rectifiers govern repolarization; long QT predisposes to torsades. Class I/III drugs leave ECG footprints and proarrhythmia risks.`,
  },
  {
    test: /starling|preload|afterload|contractility|cardiac output/i,
    prose: `**CV physiology.** CO = HR × SV; SV depends on preload, afterload, contractility. Frank–Starling is preload responsiveness until the flat curve. Match pressors/inotropes to shock phenotype.`,
  },
  {
    test: /gfr|aldosterone|adh|vasopressin|renin/i,
    prose: `**Renal physiology.** GFR follows Starling forces in the glomerular capillary. RAAS and ADH govern volume and osmolality—explaining edema, hyponatremia, and many drug effects.`,
  },
];

const CATEGORY_FALLBACK: { test: RegExp; prose: string }[] = [
  {
    test: /biochem/i,
    prose: `**Biochemistry chapter method.** Trace the pathway on paper: substrates → enzymes → products → compartment. For each regulated step, write activators/inhibitors and the clinical phenotype when that step fails. Cofactor lists (B vitamins, metals) often explain deficiency syndromes better than memorizing disease names alone.`,
  },
  {
    test: /pathophysiol|physiolog/i,
    prose: `**Pathophysiology chapter method.** Name the primary disturbed variable (pressure, flow, compliance, diffusion, filtration, conduction, secretion). Then predict compensatory responses and the bedside findings those compensations produce. Good chapters always end in a measurable phenotype.`,
  },
  {
    test: /anatom|embryo/i,
    prose: `**Anatomy/embryology chapter method.** Localize the structure in three planes, list relationships (what is adjacent, what traverses), and connect malformation or injury to a precise deficit. Embryologic timing explains why anomalies cluster.`,
  },
  {
    test: /immunol/i,
    prose: `**Immunology chapter method.** Decide whether the lesson is about recognition, effector function, regulation, or tissue injury. Then pair the molecular players (MHC, antibody isotype, cytokine, complement) with the clinical syndrome they produce when excessive or deficient.`,
  },
  {
    test: /microbiol/i,
    prose: `**Microbiology chapter method.** Organism → virulence strategy → host niche → syndrome → first-line diagnostics → stewardship-aware therapy. Gram stain, oxygen tolerance, and toxin production shrink the differential quickly.`,
  },
  {
    test: /pharmacol/i,
    prose: `**Pharmacology chapter method.** Target → agonist/antagonist/blocker logic → desired physiologic effect → on-target toxicity → PK quirks (CYP, renal clearance). Mechanism classes transfer across organ systems.`,
  },
  {
    test: /epidemiolog|biostat/i,
    prose: `**Epidemiology chapter method.** Define the measure (incidence, effect size, diagnostic metric), state the threat to validity (bias/confounding/chance), and translate the number into a patient-level decision (NNT, PPV at a prevalence).`,
  },
  {
    test: /ethic|profession/i,
    prose: `**Ethics chapter method.** Name the tension (autonomy vs beneficence, privacy vs safety, justice vs efficiency). Apply a concrete decision procedure (capacity assessment, consent elements, disclosure, triage criteria) rather than slogans.`,
  },
  {
    test: /patholog/i,
    prose: `**Pathology chapter method.** Pattern of injury (inflammation, neoplasia, degeneration, hemodynamic) → key morphologic hallmarks → clinical correlate. Mechanisms stick when tied to what you would see on gross/micro and in the patient.`,
  },
  {
    test: /internal medicine|clinical medicine|family medicine|advanced clinical/i,
    prose: `**Clinical medicine chapter method.** Syndrome → can’t-miss alternative → decision-changing data → initial therapy → reassessment. Ward excellence is sequenced action under uncertainty, not exhaustive testing.`,
  },
  {
    test: /surgery/i,
    prose: `**Surgery chapter method.** Anatomy → indication → operative risk → complications to watch (bleed, infection, leak, ischemia) → when to re-operate or escalate. Preoperative optimization and postoperative vigilance are part of the operation.`,
  },
  {
    test: /pediatr/i,
    prose: `**Pediatrics chapter method.** Age-adjust physiology and dosing, weigh caregivers as part of the therapeutic alliance, and keep development/safety (vaccines, sleep, abuse screening) on every differential that allows it.`,
  },
  {
    test: /obstetric|gynecol/i,
    prose: `**OB/GYN chapter method.** Two patients in obstetrics (mother/fetus), time-critical hemorrhage and hypertensive pathways, and gynecologic urgencies (ectopic, torsion, hemorrhage). Always ask what changes if she is pregnant or postpartum.`,
  },
  {
    test: /psychiatr|behavioral/i,
    prose: `**Psychiatry chapter method.** Safety first (suicide/violence), syndrome diagnosis second, then mechanism-informed treatment (therapy ± medication). Medical mimics and toxidromes must stay on the differential.`,
  },
];

const ORGAN_FALLBACK: { test: RegExp; prose: string }[] = [
  {
    test: /cardiovascular|heart/i,
    prose: `**Cardiovascular organ frame.** Pump, valves, vessels, and conduction each fail differently. Separate ischemic, arrhythmic, valvular, cardiomyopathic, and pericardial pathways before choosing therapy.`,
  },
  {
    test: /respirat|pulmon|lung/i,
    prose: `**Respiratory organ frame.** Airways, alveoli, interstitium, pleura, and pulmonary vessels create distinct exam/imaging/PFT signatures. Hypoxemia mechanism (hypoventilation, V/Q, shunt, diffusion, low FiO₂) organizes the workup.`,
  },
  {
    test: /renal|urinaty|kidney|genitourinary/i,
    prose: `**Renal organ frame.** Pre-renal perfusion, intrinsic parenchymal injury, and post-renal obstruction are the first branch. Volume, acid–base, and electrolyte disorders are the language of tubular function.`,
  },
  {
    test: /gastro|hepat|liver|gi /i,
    prose: `**GI/liver organ frame.** Luminal bleeding/obstruction/inflammation differ from hepatocellular vs cholestatic liver patterns. Portal hypertension complications are their own syllabus within cirrhosis.`,
  },
  {
    test: /endocrin/i,
    prose: `**Endocrine organ frame.** Excess vs deficiency, primary vs central, and acute crisis vs chronic control. Feedback loops (and what breaks them) explain most exam findings and lab patterns.`,
  },
  {
    test: /hemat|lymph/i,
    prose: `**Heme organ frame.** Production vs destruction vs loss for cytopenias; bleeding vs clotting for hemostasis. Peripheral smear and kinetics (reticulocytes, ferritin, LDH, haptoglobin) narrow mechanism quickly.`,
  },
  {
    test: /nervous|neuro|cns|brain/i,
    prose: `**Nervous-system frame.** Localize (cortical, subcortical, brainstem, cord, peripheral, NMJ, muscle) before naming the disease. Tempo (hyperacute to chronic) then sorts vascular, inflammatory, toxic-metabolic, and degenerative causes.`,
  },
  {
    test: /musculoskeletal|rheum|msk/i,
    prose: `**MSK/rheum frame.** Articular vs periarticular, inflammatory vs mechanical, mono vs polyarticular, axial vs peripheral. Septic joint always stays on the monoarthritis differential until excluded.`,
  },
  {
    test: /reproduct|obstetric|gynecol|pregnan/i,
    prose: `**Reproductive frame.** Hormonal axis disorders, structural pelvic disease, pregnancy physiology, and obstetric emergencies each have distinct time pressures. Always ask how pregnancy changes risk and imaging/therapy choices.`,
  },
  {
    test: /multisystem|general/i,
    prose: `**Multisystem frame.** Decide whether the unifying mechanism is infectious, inflammatory, neoplastic, toxic-metabolic, or hemodynamic. Multisystem lessons reward a single coherent mechanism over organ-by-organ laundry lists.`,
  },
  {
    test: /pediatric|child/i,
    prose: `**Pediatric physiology frame.** Age changes baseline vitals, immune experience, and medication clearance. Congenital and developmental differentials shrink with each month of life—use age as a hard filter.`,
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

function pushUnique(hits: string[], prose: string) {
  if (prose && !hits.includes(prose)) hits.push(prose);
}

/** Collect unique enrichments for an entire topic (keywords + category/organ fallbacks). */
export function factualEnrichmentForTopic(topic: TopicLike): string {
  const blob = [
    topic.title,
    topic.quizExplain,
    topic.cardBack,
    topic.contentCategory ?? "",
    topic.organSystem ?? "",
    ...topic.points,
  ].join(" \n ");

  const hits: string[] = [];
  for (const snip of SNIPPETS) {
    if (snip.test.test(blob)) pushUnique(hits, snip.prose);
  }

  // If thin, add category then organ fallbacks for guaranteed textbook depth.
  if (hits.length < 2) {
    const cat = topic.contentCategory ?? "";
    for (const fb of CATEGORY_FALLBACK) {
      if (fb.test.test(cat)) pushUnique(hits, fb.prose);
    }
  }
  if (hits.length < 2) {
    const organ = topic.organSystem ?? "";
    for (const fb of ORGAN_FALLBACK) {
      if (fb.test.test(organ)) pushUnique(hits, fb.prose);
    }
  }

  return hits.join("\n\n");
}
