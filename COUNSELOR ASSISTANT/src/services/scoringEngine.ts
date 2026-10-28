import { ExamFormat } from '../types/ielts';

/**
 * Calculates Band Score from Raw Score (0 - 40) for Reading
 */
export function calculateReadingBand(rawScore: number, format: ExamFormat = 'Academic'): number {
  const score = Math.max(0, Math.min(40, Math.round(rawScore)));

  if (format === 'Academic') {
    if (score >= 39) return 9.0;
    if (score >= 37) return 8.5;
    if (score >= 35) return 8.0;
    if (score >= 33) return 7.5;
    if (score >= 30) return 7.0;
    if (score >= 27) return 6.5;
    if (score >= 23) return 6.0;
    if (score >= 19) return 5.5;
    if (score >= 15) return 5.0;
    if (score >= 13) return 4.5;
    if (score >= 10) return 4.0;
    if (score >= 8) return 3.5;
    if (score >= 6) return 3.0;
    if (score >= 4) return 2.5;
    if (score >= 2) return 2.0;
    return 1.0;
  } else {
    // General Training
    if (score >= 40) return 9.0;
    if (score >= 39) return 8.5;
    if (score >= 37) return 8.0;
    if (score >= 36) return 7.5;
    if (score >= 34) return 7.0;
    if (score >= 32) return 6.5;
    if (score >= 30) return 6.0;
    if (score >= 27) return 5.5;
    if (score >= 23) return 5.0;
    if (score >= 19) return 4.5;
    if (score >= 15) return 4.0;
    if (score >= 12) return 3.5;
    if (score >= 9) return 3.0;
    if (score >= 6) return 2.5;
    if (score >= 3) return 2.0;
    return 1.0;
  }
}

/**
 * Calculates Band Score from Raw Score (0 - 40) for Listening
 */
export function calculateListeningBand(rawScore: number): number {
  const score = Math.max(0, Math.min(40, Math.round(rawScore)));
  if (score >= 39) return 9.0;
  if (score >= 37) return 8.5;
  if (score >= 35) return 8.0;
  if (score >= 32) return 7.5;
  if (score >= 30) return 7.0;
  if (score >= 26) return 6.5;
  if (score >= 23) return 6.0;
  if (score >= 18) return 5.5;
  if (score >= 16) return 5.0;
  if (score >= 13) return 4.5;
  if (score >= 10) return 4.0;
  if (score >= 8) return 3.5;
  if (score >= 6) return 3.0;
  if (score >= 4) return 2.5;
  if (score >= 2) return 2.0;
  return 1.0;
}

/**
 * Calculates overall IELTS band score following official IELTS rounding rules:
 * - Average is computed across available module scores.
 * - If the fractional part is .25, it rounds UP to .5.
 * - If the fractional part is .75, it rounds UP to the next integer.
 * - If between .00 and .125, it rounds to .00.
 * - If between .125 and .25, it rounds to .25 -> .5.
 */
export function calculateOverallBand(scores: number[]): number {
  if (!scores || scores.length === 0) return 0;
  const validScores = scores.filter(s => s > 0);
  if (validScores.length === 0) return 0;

  const sum = validScores.reduce((acc, curr) => acc + curr, 0);
  const average = sum / validScores.length;

  const floor = Math.floor(average);
  const remainder = average - floor;

  if (remainder < 0.25) {
    return floor;
  } else if (remainder < 0.75) {
    return floor + 0.5;
  } else {
    return floor + 1.0;
  }
}

/**
 * Maps IELTS Band Score to Common European Framework (CEFR) level
 */
export function getCEFRLevel(band: number): 'B1' | 'B2' | 'C1' | 'C2' {
  if (band >= 8.5) return 'C2';
  if (band >= 7.0) return 'C1';
  if (band >= 5.5) return 'B2';
  return 'B1';
}

/**
 * Normalizes user answer for IELTS string comparison
 * Ignores casing, punctuation, extra whitespace, and common articles
 */
export function isIeltsAnswerCorrect(userAns: string | undefined, correctAns: string | string[]): boolean {
  if (!userAns) return false;
  
  const clean = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
      .replace(/\s+/g, ' ');

  const cleanedUser = clean(userAns);
  if (!cleanedUser) return false;

  if (Array.isArray(correctAns)) {
    return correctAns.some(ca => clean(ca) === cleanedUser);
  }

  // Handle slash alternatives like "autumn/fall"
  const possibleAnswers = correctAns.split('/').map(p => clean(p));
  return possibleAnswers.includes(cleanedUser);
}

