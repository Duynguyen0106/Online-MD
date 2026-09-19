/**
 * Recount full-time study duration from the live curriculum graph.
 * Run: npx tsx scripts/hour-budget.ts
 */
import { estimateCatalogStudyHours } from "../lib/curriculum/catalog/apply";
import { FOUR_YEAR_TOPICS } from "../lib/curriculum/catalog/topics-generated";
import { getProgram } from "../lib/curriculum/accessors";

async function main() {
  const catalog = estimateCatalogStudyHours();
  const program = await getProgram();

  let preMin = 0;
  let clinMin = 0;
  let preLessons = 0;
  let clinLessons = 0;

  for (const phase of program.phases) {
    const isPre = /Preclinical|Years 1/i.test(phase.name);
    for (const mod of phase.modules) {
      for (const lesson of mod.lessons) {
        const minutes = lesson.estimatedMinutes ?? 0;
        if (isPre) {
          preMin += minutes;
          preLessons += 1;
        } else {
          clinMin += minutes;
          clinLessons += 1;
        }
      }
    }
  }

  const byYear = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const t of FOUR_YEAR_TOPICS) byYear[t.year] += 1;

  const weekHours = 40;
  const weeksPerYear = 46;
  const ftYear = weekHours * weeksPerYear;
  const mastery = 2;

  const preFirst = preMin / 60;
  const clinFirst = clinMin / 60;

  console.log(
    JSON.stringify(
      {
        assumptions: {
          hoursPerWeek: weekHours,
          weeksPerYear,
          masteryMultiplier: mastery,
          hoursPerFullTimeYear: ftYear,
        },
        catalogTopics: catalog.topics,
        catalogTopicsByYear: byYear,
        liveGraph: {
          preclinicalLessons: preLessons,
          clinicalLessons: clinLessons,
          totalLessons: preLessons + clinLessons,
          preclinicalFirstPassHours: Math.round(preFirst),
          preclinicalMasteryHours: Math.round(preFirst * mastery),
          preclinicalFullTimeYears: Number(
            ((preFirst * mastery) / ftYear).toFixed(3),
          ),
          clinicalFirstPassHours: Math.round(clinFirst),
          clinicalMasteryHours: Math.round(clinFirst * mastery),
          clinicalFullTimeYears: Number(
            ((clinFirst * mastery) / ftYear).toFixed(3),
          ),
          programFullTimeYears: Number(
            (((preFirst + clinFirst) * mastery) / ftYear).toFixed(3),
          ),
        },
        catalogHelper: catalog,
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
