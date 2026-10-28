export type ModuleType = 'reading' | 'listening' | 'writing' | 'speaking' | 'full-mock';

export type ExamSource = 
  | 'Cambridge 20 Official'
  | 'Cambridge 19'
  | 'Cambridge 18'
  | 'Cambridge 17'
  | 'Barron\'s Official'
  | 'British Council Official'
  | 'IDP Official Exam'
  | 'Recent Actual 2025';

export type ExamFormat = 'Academic' | 'General Training';

export type QuestionType =
  | 'multiple-choice-single'
  | 'multiple-choice-multi'
  | 'true-false-not-given'
  | 'yes-no-not-given'
  | 'matching-headings'
  | 'matching-information'
  | 'sentence-completion'
  | 'summary-completion'
  | 'diagram-labelling'
  | 'flowchart-completion'
  | 'map-labelling'
  | 'short-answer';

export interface ReadingQuestion {
  id: string;
  number: number;
  passageIndex: number;
  type: QuestionType;
  instruction: string;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  passageEvidence: string;
  headingOptions?: { id: string; label: string }[];
  targetParagraph?: string;
  wordLimit?: string;
}

export interface ReadingParagraph {
  label: string;
  text: string;
}

export interface ReadingPassage {
  title: string;
  subheading?: string;
  imageUrl?: string;
  paragraphs: ReadingParagraph[];
  wordCount: number;
}

export interface ReadingMockData {
  title: string;
  passages: ReadingPassage[];
  questions: ReadingQuestion[];
}

export interface ListeningQuestion {
  id: string;
  number: number;
  sectionNumber: 1 | 2 | 3 | 4;
  type: QuestionType;
  instruction: string;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  audioTimestamp?: string;
  audioEvidence?: string;
  wordLimit?: string;
}

export interface ListeningSection {
  sectionNumber: 1 | 2 | 3 | 4;
  title: string;
  context: string;
  audioTranscript: string;
  audioDurationSeconds: number;
  imageUrl?: string;
  questions: ListeningQuestion[];
}

export interface ListeningMockData {
  title: string;
  sections: ListeningSection[];
}

export interface WritingTask1 {
  type: 'academic' | 'general';
  chartType?: 'bar' | 'line' | 'pie' | 'process' | 'table' | 'map';
  chartTitle?: string;
  chartDescription?: string;
  chartDataSummary?: string;
  imageUrl?: string;
  prompt: string;
  minWords: number;
  modelAnswerBand9: string;
  keyPointsToCover: string[];
}

export interface WritingTask2 {
  category: 'opinion' | 'discussion' | 'problem-solution' | 'advantages-disadvantages' | 'double-question';
  topic: string;
  prompt: string;
  minWords: number;
  modelAnswerBand9: string;
  outlineSuggestions: string[];
}

export interface WritingMockData {
  title: string;
  task1: WritingTask1;
  task2: WritingTask2;
}

export interface SpeakingPart1 {
  topic: string;
  questions: string[];
}

export interface SpeakingPart2 {
  topic: string;
  cueCard: string;
  bulletPoints: string[];
  followUpQuestion: string;
}

export interface SpeakingPart3 {
  topic: string;
  questions: string[];
}

export interface SpeakingMockData {
  title: string;
  part1: SpeakingPart1;
  part2: SpeakingPart2;
  part3: SpeakingPart3;
  sampleBand9Transcript: string;
}

export interface MockTestItem {
  id: number;
  code: string;
  title: string;
  source: ExamSource;
  format: ExamFormat;
  difficulty: 'Standard (Band 6.0-7.0)' | 'Challenging (Band 7.0-8.0)' | 'Mastery (Band 8.0-9.0)';
  topics: string[];
  imageUrl?: string;
  questionTypesIncluded: QuestionType[];
  readingData: ReadingMockData;
  listeningData: ListeningMockData;
  writingData: WritingMockData;
  speakingData: SpeakingMockData;
}

export interface UserTestAttempt {
  id: string;
  testId: number;
  module: ModuleType;
  testTitle: string;
  format: ExamFormat;
  completedAt: string;
  durationSeconds: number;
  rawScore?: number;
  totalQuestions?: number;
  bandScore: number;
  answers: Record<string, string>;
  writingSubmissions?: {
    task1Text: string;
    task1WordCount: number;
    task2Text: string;
    task2WordCount: number;
  };
  speakingRecordings?: {
    part1AudioUrl?: string;
    part2AudioUrl?: string;
    part3AudioUrl?: string;
    transcripts?: { part1: string; part2: string; part3: string };
  };
  aiEvaluation?: AIEvaluationResult;
}

export interface AIEvaluationResult {
  overallBand: number;
  cefrLevel: 'B1' | 'B2' | 'C1' | 'C2';
  summary: string;
  moduleSpecific: {
    taskAchievementBand?: number;
    coherenceCohesionBand?: number;
    lexicalResourceBand?: number;
    grammarAccuracyBand?: number;
    fluencyCoherenceBand?: number;
    pronunciationBand?: number;
  };
  strengths: string[];
  weaknesses: string[];
  vocabularyUpgrades: {
    original: string;
    suggestion: string;
    reason: string;
    bandImpact: string;
  }[];
  grammarCorrections: {
    original: string;
    corrected: string;
    explanation: string;
  }[];
  pronunciationNotes?: string[];
  pacingMetrics?: {
    wpm: number;
    fillerWordsCount: number;
    clarityScore: number;
  };
  instructorFeedback: string;
}

export interface StudentProfile {
  name: string;
  email: string;
  candidateNumber: string;
  targetBand: number;
  examDate?: string;
  preferredCountry: 'UK' | 'Australia' | 'Canada' | 'USA' | 'South Korea' | 'New Zealand';
  consultancyLocation: string;
  primaryInstructor: {
    name: string;
    role: string;
    phone: string;
    email: string;
  };
  secondaryInstructor: {
    name: string;
    role: string;
    phone: string;
    email: string;
  };
}
