import React, { useState } from 'react';
import { 
  Headphones, 
  BookOpen, 
  PenTool, 
  Mic, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Trophy,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { MockTestItem, StudentProfile, UserTestAttempt } from '../../types/ielts';
import { ReadingExam } from './ReadingExam';
import { ListeningExam } from './ListeningExam';
import { WritingExam } from './WritingExam';
import { SpeakingExam } from './SpeakingExam';
import { calculateReadingBand, calculateListeningBand, calculateOverallBand, getCEFRLevel, isIeltsAnswerCorrect } from '../../services/scoringEngine';
import { evaluateWritingWithAI, evaluateSpeakingWithAI } from '../../services/aiEvaluator';

interface FullMockFlowProps {
  testData: MockTestItem;
  student: StudentProfile;
  onExit: () => void;
  onCompleteFullMock: (attempt: UserTestAttempt) => void;
}

export const FullMockFlow: React.FC<FullMockFlowProps> = ({
  testData,
  student,
  onExit,
  onCompleteFullMock,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1); // 1: L, 2: R, 3: W, 4: S

  // Store answers across all 4 modules
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, string>>({});
  const [readingAnswers, setReadingAnswers] = useState<Record<string, string>>({});
  const [flaggedReading, setFlaggedReading] = useState<number[]>([]);
  const [flaggedListening, setFlaggedListening] = useState<number[]>([]);
  const [task1Text, setTask1Text] = useState('');
  const [task2Text, setTask2Text] = useState('');

  // Handle final overall evaluation
  const handleFinalSubmit = () => {
    // 1. Score Listening
    let lRaw = 0;
    const lQuestions = testData.listeningData.sections.flatMap(s => s.questions);
    lQuestions.forEach(q => {
      if (isIeltsAnswerCorrect(listeningAnswers[q.id], q.correctAnswer)) lRaw++;
    });
    const lBand = calculateListeningBand(lRaw);

    // 2. Score Reading
    let rRaw = 0;
    const rQuestions = testData.readingData.questions;
    rQuestions.forEach(q => {
      if (isIeltsAnswerCorrect(readingAnswers[q.id], q.correctAnswer)) rRaw++;
    });
    const rBand = calculateReadingBand(rRaw, testData.format);

    // 3. Score Writing
    const writingEval = evaluateWritingWithAI(task1Text, task2Text, testData.writingData);
    const wBand = writingEval.overallBand;

    // 4. Score Speaking
    const speakingEval = evaluateSpeakingWithAI({}, testData.speakingData);
    const sBand = speakingEval.overallBand;

    // 5. Official Overall IELTS Band (rounded to nearest 0.5)
    const overallBand = calculateOverallBand([lBand, rBand, wBand, sBand]);
    const cefr = getCEFRLevel(overallBand);

    const fullAttempt: UserTestAttempt = {
      id: `FULL-TRF-${Date.now().toString().slice(-6)}`,
      testId: testData.id,
      module: 'full-mock',
      testTitle: `${testData.title} (Full 4-in-1 Mock)`,
      format: testData.format,
      completedAt: new Date().toISOString().split('T')[0],
      durationSeconds: 9600, // ~2h 40m
      rawScore: rRaw + lRaw,
      totalQuestions: 80,
      bandScore: overallBand,
      answers: { ...readingAnswers, ...listeningAnswers },
      writingSubmissions: {
        task1Text,
        task1WordCount: task1Text.trim().split(/\s+/).filter(Boolean).length,
        task2Text,
        task2WordCount: task2Text.trim().split(/\s+/).filter(Boolean).length,
      },
      aiEvaluation: {
        overallBand,
        cefrLevel: cefr,
        summary: `Complete 4-module simulated IELTS exam completed! Overall Band Score: ${overallBand.toFixed(1)} (${cefr}). Listening: ${lBand.toFixed(1)}, Reading: ${rBand.toFixed(1)}, Writing: ${wBand.toFixed(1)}, Speaking: ${sBand.toFixed(1)}.`,
        moduleSpecific: {
          taskAchievementBand: wBand,
          coherenceCohesionBand: writingEval.moduleSpecific.coherenceCohesionBand,
          lexicalResourceBand: (writingEval.moduleSpecific.lexicalResourceBand! + speakingEval.moduleSpecific.lexicalResourceBand!) / 2,
          grammarAccuracyBand: writingEval.moduleSpecific.grammarAccuracyBand,
          fluencyCoherenceBand: speakingEval.moduleSpecific.fluencyCoherenceBand,
          pronunciationBand: speakingEval.moduleSpecific.pronunciationBand,
        },
        strengths: [
          `Endurance demonstrated across all four continuous test modules.`,
          `Balanced performance with strongest sub-band in ${[
            { name: 'Reading', b: rBand },
            { name: 'Listening', b: lBand },
            { name: 'Writing', b: wBand },
            { name: 'Speaking', b: sBand }
          ].sort((a,b) => b.b - a.b)[0].name}.`
        ],
        weaknesses: [
          'Maintain consistent writing sentence complexity under strict fatigue conditions.'
        ],
        vocabularyUpgrades: writingEval.vocabularyUpgrades,
        grammarCorrections: writingEval.grammarCorrections,
        instructorFeedback: `Kathmandu Krypton Certified IELTS Faculty (Kushal Adhikari & Nirmal Thapa) confirms Candidate ${student.name} is tracking strongly toward ${student.preferredCountry} university admissions threshold (Target: Band ${student.targetBand.toFixed(1)}).`
      }
    };

    onCompleteFullMock(fullAttempt);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Top Stepper Bar */}
      <div className="bg-[#173F7A] text-white px-4 py-3 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Exit
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-amber-300 text-sm">
                  FULL 4-IN-1 MOCK TEST
                </span>
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.2 rounded">
                  {testData.code}
                </span>
              </div>
              <div className="text-[11px] text-blue-100 hidden sm:block">
                {testData.title}
              </div>
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center gap-1.5 bg-black/20 p-1 rounded-2xl overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setCurrentStep(1)}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                currentStep === 1 ? 'bg-indigo-600 text-white shadow' : 'text-blue-200 hover:text-white'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>1. Listening</span>
            </button>

            <button
              onClick={() => setCurrentStep(2)}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                currentStep === 2 ? 'bg-emerald-600 text-white shadow' : 'text-blue-200 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>2. Reading</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                currentStep === 3 ? 'bg-amber-600 text-white shadow' : 'text-blue-200 hover:text-white'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>3. Writing</span>
            </button>

            <button
              onClick={() => setCurrentStep(4)}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                currentStep === 4 ? 'bg-rose-600 text-white shadow' : 'text-blue-200 hover:text-white'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>4. Speaking</span>
            </button>
          </div>

          {/* Next / Submit Step Button */}
          <div className="flex items-center gap-2">
            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep((currentStep + 1) as any)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 border border-white/20"
              >
                <span>Proceed to Step {currentStep + 1}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinalSubmit}
                className="bg-[#DC2626] hover:bg-red-700 text-white font-black text-xs px-5 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Finish Full Mock & Get Overall Band</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Module Workspace */}
      <div className="flex-1">
        {currentStep === 1 && (
          <ListeningExam
            data={testData.listeningData}
            answers={listeningAnswers}
            onAnswerChange={(qId, val) => setListeningAnswers(prev => ({ ...prev, [qId]: val }))}
            flaggedQuestions={flaggedListening}
            onToggleFlag={(qNum) => setFlaggedListening(prev => prev.includes(qNum) ? prev.filter(n => n !== qNum) : [...prev, qNum])}
            fontSize="standard"
            contrastMode="normal"
          />
        )}

        {currentStep === 2 && (
          <ReadingExam
            data={testData.readingData}
            answers={readingAnswers}
            onAnswerChange={(qId, val) => setReadingAnswers(prev => ({ ...prev, [qId]: val }))}
            flaggedQuestions={flaggedReading}
            onToggleFlag={(qNum) => setFlaggedReading(prev => prev.includes(qNum) ? prev.filter(n => n !== qNum) : [...prev, qNum])}
            fontSize="standard"
            contrastMode="normal"
          />
        )}

        {currentStep === 3 && (
          <WritingExam
            data={testData.writingData}
            task1Text={task1Text}
            setTask1Text={setTask1Text}
            task2Text={task2Text}
            setTask2Text={setTask2Text}
            onSubmitForEvaluation={() => {
              setCurrentStep(4);
            }}
          />
        )}

        {currentStep === 4 && (
          <SpeakingExam
            data={testData.speakingData}
            onSubmitForEvaluation={() => {
              handleFinalSubmit();
            }}
          />
        )}
      </div>
    </div>
  );
};

