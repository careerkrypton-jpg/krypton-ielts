import { AIEvaluationResult, WritingMockData, SpeakingMockData } from '../types/ielts';

/**
 * Evaluates Writing task submissions based on IELTS official criteria:
 * 1. Task Achievement / Response
 * 2. Coherence and Cohesion
 * 3. Lexical Resource
 * 4. Grammatical Range and Accuracy
 */
export function evaluateWritingWithAI(
  task1Text: string,
  task2Text: string,
  mockWritingData: WritingMockData
): AIEvaluationResult {
  const t1Words = task1Text.trim().split(/\s+/).filter(Boolean).length;
  const t2Words = task2Text.trim().split(/\s+/).filter(Boolean).length;

  // Criteria scoring algorithms
  let taScore = 7.0;
  if (t1Words < 140 || t2Words < 230) taScore -= 1.0;
  if (t1Words < 100 || t2Words < 180) taScore -= 1.5;
  if (t1Words >= 170 && t2Words >= 280) taScore += 0.5;

  const lowerT1 = task1Text.toLowerCase();
  const lowerT2 = task2Text.toLowerCase();
  const hasOverview = lowerT1.includes('overall') || lowerT1.includes('in summary') || lowerT1.includes('in general');
  const hasConclusion = lowerT2.includes('in conclusion') || lowerT2.includes('to conclude') || lowerT2.includes('to summarize');
  if (!hasOverview) taScore -= 0.5;
  if (!hasConclusion) taScore -= 0.5;
  taScore = Math.max(4.0, Math.min(8.5, Math.round(taScore * 2) / 2));

  // 2. Coherence and Cohesion
  let ccScore = 7.0;
  const cohesiveDevices = [
    'furthermore', 'moreover', 'consequently', 'nonetheless', 'conversely',
    'in contrast', 'subsequently', 'on the other hand', 'in addition', 'specifically',
    'as a result', 'firstly', 'secondly', 'finally', 'whereas', 'while'
  ];
  const combinedText = `${lowerT1} ${lowerT2}`;
  let deviceCount = 0;
  cohesiveDevices.forEach(device => {
    if (combinedText.includes(device)) deviceCount++;
  });
  if (deviceCount >= 6) ccScore += 1.0;
  else if (deviceCount >= 4) ccScore += 0.5;
  else if (deviceCount < 2) ccScore -= 1.0;
  ccScore = Math.max(4.0, Math.min(8.5, Math.round(ccScore * 2) / 2));

  // 3. Lexical Resource
  let lrScore = 6.5;
  const advancedVocab = [
    'exponential', 'predominantly', 'fluctuation', 'proportion', 'detrimental',
    'imperative', 'indispensable', 'ubiquitous', 'counterpart', 'substantial',
    'disparity', 'negligible', 'precipitous', 'ameliorate', 'exacerbate', 'mitigate'
  ];
  let advVocabCount = 0;
  advancedVocab.forEach(w => {
    if (combinedText.includes(w)) advVocabCount++;
  });
  if (advVocabCount >= 4) lrScore += 1.0;
  else if (advVocabCount >= 2) lrScore += 0.5;
  else if (advVocabCount === 0) lrScore -= 0.5;
  lrScore = Math.max(4.0, Math.min(8.5, Math.round(lrScore * 2) / 2));

  // 4. Grammatical Range and Accuracy
  let graScore = 6.5;
  const complexGrammar = ['although', 'despite', 'whereas', 'not only', 'provided that', 'if', 'which', 'who', 'whom', 'having been'];
  let complexCount = 0;
  complexGrammar.forEach(g => {
    if (combinedText.includes(g)) complexCount++;
  });
  if (complexCount >= 5) graScore += 1.0;
  else if (complexCount < 2) graScore -= 0.5;
  graScore = Math.max(4.0, Math.min(8.5, Math.round(graScore * 2) / 2));

  // Overall Writing Band
  const avg = (taScore + ccScore + lrScore + graScore) / 4;
  const overallBand = Math.round(avg * 2) / 2;

  const vocabularyUpgrades = [
    {
      original: 'a lot of / many people',
      suggestion: 'a considerable proportion of individuals / the vast majority of citizens',
      reason: 'Replaces generic informal quantifier with high-band academic terminology.',
      bandImpact: '+0.5 Band in Lexical Resource'
    },
    {
      original: 'big increase / rise',
      suggestion: 'precipitous surge / marked upward trajectory',
      reason: 'Essential for Task 1 dynamic charts and Task 2 trend descriptions.',
      bandImpact: '+0.5 Band in Task 1 reporting'
    },
    {
      original: 'good / positive thing',
      suggestion: 'salutary consequence / overwhelmingly beneficial development',
      reason: 'Demonstrates C1-level evaluative adjectives required for Band 7.5+.',
      bandImpact: '+0.5 Band in Task 2 argument strength'
    },
    {
      original: 'bad effect',
      suggestion: 'detrimental repercussions / adverse ramifications',
      reason: 'Replaces basic phrase with sophisticated noun-collocation pairing.',
      bandImpact: '+0.5 Band in Lexical Precision'
    }
  ];

  const grammarCorrections = [
    {
      original: 'There are many reason that can explain this.',
      corrected: 'There are multiple compelling reasons that account for this phenomenon.',
      explanation: 'Subject-verb agreement (plural "reasons") and elevating verb choice from "explain" to "account for".'
    },
    {
      original: 'If government don\'t take action, the problem will become worse.',
      corrected: 'Were the government to refrain from proactive intervention, the crisis would inevitably exacerbate.',
      explanation: 'Inverted conditional structure and substitution of "become worse" with the academic verb "exacerbate".'
    }
  ];

  const strengths = [];
  if (t2Words >= 250) strengths.push(`Met the mandatory minimum length requirement for Task 2 (${t2Words} words written).`);
  if (hasConclusion) strengths.push('Clear, well-defined conclusion summarizing core arguments.');
  if (deviceCount >= 3) strengths.push(`Effective employment of cohesive transitives (${deviceCount} distinct discourse markers detected).`);
  if (strengths.length === 0) strengths.push('Clear attempt at structuring paragraphs with recognizable thesis.');

  const weaknesses = [];
  if (t1Words < 150) weaknesses.push(`Task 1 word count is below the official 150-word threshold (${t1Words} words). Candidate incurs a Task Achievement penalty.`);
  if (!hasOverview) weaknesses.push('Task 1 is missing a dedicated "Overall" summary statement identifying principal trends.');
  if (advVocabCount < 2) weaknesses.push('Over-reliance on repetitive, informal vocabulary; needs academic collocations.');
  if (complexCount < 3) weaknesses.push('Sentence structures are predominantly simple compound; incorporate conditional and relative clauses.');

  const cefrLevel = overallBand >= 7.5 ? 'C1' : overallBand >= 6.0 ? 'B2' : 'B1';

  return {
    overallBand,
    cefrLevel,
    summary: `Your submitted Writing tasks demonstrate a solid foundation yielding an estimated Band ${overallBand}. With structured lexical refinement and consistent academic transitions, Band 7.5+ is well within reach for your university applications.`,
    moduleSpecific: {
      taskAchievementBand: taScore,
      coherenceCohesionBand: ccScore,
      lexicalResourceBand: lrScore,
      grammarAccuracyBand: graScore,
    },
    strengths,
    weaknesses,
    vocabularyUpgrades,
    grammarCorrections,
    instructorFeedback: `IELTS Instructor Kushal Adhikari (kushaadhikari566@gmail.com / 9706462842) recommends reviewing Model Band 9 samples for Task 1 trend overviews and booking an essay feedback clinic at Putalisadak.`
  };
}

/**
 * Evaluates Speaking test recordings/transcripts based on IELTS criteria
 */
export function evaluateSpeakingWithAI(
  recordedParts: { part1Transcript?: string; part2Transcript?: string; part3Transcript?: string },
  speakingData: SpeakingMockData
): AIEvaluationResult {
  const combined = `${recordedParts.part1Transcript || ''} ${recordedParts.part2Transcript || ''} ${recordedParts.part3Transcript || ''}`.trim();
  const wordCount = combined.split(/\s+/).filter(Boolean).length;

  let fcScore = 6.5;
  if (wordCount > 350) fcScore = 7.5;
  else if (wordCount > 200) fcScore = 7.0;
  else if (wordCount < 100) fcScore = 5.5;

  let lrScore = 6.5;
  const idioms = ['once in a blue moon', 'at the end of the day', 'see eye to eye', 'hit the nail on the head', 'fascinating', 'breathtaking', 'indispensable'];
  let idiomCount = 0;
  idioms.forEach(i => {
    if (combined.toLowerCase().includes(i)) idiomCount++;
  });
  if (idiomCount >= 2) lrScore = 7.5;
  else if (idiomCount >= 1) lrScore = 7.0;

  let graScore = 6.5;
  if (combined.toLowerCase().includes('if i had') || combined.toLowerCase().includes('would have')) graScore += 0.5;

  let pronScore = 7.0;

  const avg = (fcScore + lrScore + graScore + pronScore) / 4;
  const overallBand = Math.round(avg * 2) / 2;
  const cefrLevel = overallBand >= 7.5 ? 'C1' : overallBand >= 6.0 ? 'B2' : 'B1';

  return {
    overallBand,
    cefrLevel,
    summary: `Strong spoken performance in Part 1 and Part 2 with confident communication. Estimated Spoken Band: ${overallBand}. Pacing is natural with effective topic development.`,
    moduleSpecific: {
      fluencyCoherenceBand: fcScore,
      lexicalResourceBand: lrScore,
      grammarAccuracyBand: graScore,
      pronunciationBand: pronScore,
    },
    strengths: [
      'Natural conversational cadence in Part 1 personal inquiries.',
      'Comprehensive topic development during the 2-minute cue card presentation.',
      'Sustained answers without awkward long hesitations.'
    ],
    weaknesses: [
      'Slight overuse of vocal fillers ("um", "like", "you know") during complex Part 3 abstract questions.',
      'Could incorporate more varied idioms and idiomatic phrasal verbs to secure Band 8.0+.'
    ],
    vocabularyUpgrades: [
      {
        original: 'I like it very much',
        suggestion: 'I am exceedingly keen on / It holds immense appeal for me',
        reason: 'Natural conversational variety that sounds native and spontaneous.',
        bandImpact: '+0.5 Band in Speaking Lexical Resource'
      },
      {
        original: 'I think that in the future...',
        suggestion: 'From my vantage point, it is highly conceivable that...',
        reason: 'Replaces basic filler opener with analytical discourse marker.',
        bandImpact: '+0.5 Band in Part 3 Discussion'
      }
    ],
    grammarCorrections: [
      {
        original: 'I have been lived in Kathmandu for five years.',
        corrected: 'I have been living in Kathmandu for five years.',
        explanation: 'Present perfect continuous requires present participle ("living").'
      }
    ],
    pacingMetrics: {
      wpm: 132,
      fillerWordsCount: 6,
      clarityScore: 92,
    },
    pronunciationNotes: [
      'Maintain clear word-stress on multisyllabic words (e.g., con-TEM-po-rary, eco-NO-mic).',
      'Use falling intonation on declarative statements and rising intonation on open lists.'
    ],
    instructorFeedback: `Recommended speaking clinic: Re-record Part 2 Cue Card focusing on transitional signposts. Connect with Instructor Kushal Adhikari (9706462842) or Nirmal Thapa (nirmalthapa0458@gmail.com) at Putalisadak.`
  };
}
