/**
 * SuperMemo-2 spaced repetition.
 * quality: 0–5 (0=total blackout … 5=perfect recall)
 */
export interface Sm2Input {
  easiness: number;
  intervalDays: number;
  repetitions: number;
  quality: number;
}

export interface Sm2Result {
  easiness: number;
  intervalDays: number;
  repetitions: number;
  dueAt: Date;
}

export function reviewSm2(input: Sm2Input, now = new Date()): Sm2Result {
  const quality = Math.max(0, Math.min(5, Math.round(input.quality)));
  let { easiness, intervalDays, repetitions } = input;

  if (quality < 3) {
    repetitions = 0;
    intervalDays = 1;
  } else {
    if (repetitions === 0) intervalDays = 1;
    else if (repetitions === 1) intervalDays = 6;
    else intervalDays = Math.max(1, Math.round(intervalDays * easiness));
    repetitions += 1;
  }

  easiness = easiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easiness < 1.3) easiness = 1.3;

  const dueAt = new Date(now);
  dueAt.setUTCDate(dueAt.getUTCDate() + intervalDays);

  return { easiness, intervalDays, repetitions, dueAt };
}

export function initialCardReview(now = new Date()) {
  return {
    easiness: 2.5,
    intervalDays: 0,
    repetitions: 0,
    dueAt: now.toISOString(),
  };
}
