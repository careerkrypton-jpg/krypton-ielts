import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { TestBankExplorer } from './components/TestBankExplorer';
import { ExamHeader } from './components/ExamSimulator/ExamHeader';
import { ReadingExam } from './components/ExamSimulator/ReadingExam';
import { ListeningExam } from './components/ExamSimulator/ListeningExam';
import { WritingExam } from './components/ExamSimulator/WritingExam';
import { SpeakingExam } from './components/ExamSimulator/SpeakingExam';
import { FullMockFlow } from './components/ExamSimulator/FullMockFlow';
import { ResultDashboard } from './components/AIAnalyzer/ResultDashboard';
import { BandCalculatorModal } from './components/BandCalculatorModal';
import { InstructorContactModal } from './components/InstructorContactModal';
import { LoginPortal } from './components/Auth/LoginPortal';
import { ALL_100_MOCK_TESTS } from './data/mockTestsData';
import { 
  ModuleType, 
  UserTestAttempt, 
  StudentProfile, 
  AIEvaluationResult 
} from './types/ielts';
import { 
  getStoredProfile, 
  saveStoredProfile,
  getStoredAttempts, 
  saveTestAttempt, 
  DEFAULT_STUDENT 
} from './services/storage';
import { 
  calculateReadingBand, 
  calculateListeningBand, 
  isIeltsAnswerCorrect, 
  getCEFRLevel 
} from './services/scoringEngine';
import { evaluateWritingWithAI, evaluateSpeakingWithAI } from './services/aiEvaluator';

export function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('krypton_ielts_authenticated') === 'true';
  });
  const [student, setStudent] = useState<StudentProfile>(getStoredProfile());

  // Navigation State
  const [activeView, setActiveView] = useState<'dashboard' | 'test-bank' | 'exam' | 'result' | 'calculator' | 'full-mock-flow'>('dashboard');
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<ModuleType>('full-mock');
  const [attempts, setAttempts] = useState<UserTestAttempt[]>([]);

  // Current active test state
  const [currentTestId, setCurrentTestId] = useState<number>(1);
  const [currentModule, setCurrentModule] = useState<ModuleType>('reading');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [task1Text, setTask1Text] = useState('');
  const [task2Text, setTask2Text] = useState('');

  // Accessibility & Display state
  const [fontSize, setFontSize] = useState<'standard' | 'large' | 'xlarge'>('standard');
  const [contrastMode, setContrastMode] = useState<'normal' | 'dark' | 'yellow-blue'>('normal');

  // Modals & Evaluation Results
  const [activeAttempt, setActiveAttempt] = useState<UserTestAttempt | null>(null);
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);

  // Load stored state on mount
  useEffect(() => {
    const storedAttempts = getStoredAttempts();
    if (storedAttempts.length > 0) {
      setAttempts(storedAttempts);
    } else {
      // Seed initial sample attempt for Vibe Coder
      const sampleAttempt: UserTestAttempt = {
        id: 'TRF-KRYPTON-001',
        testId: 1,
        module: 'reading',
        testTitle: 'Krypton Full Mock Test 01 - Barron\'s IELTS Official Exam 1',
        format: 'Academic',
        completedAt: '2026-10-27',
        durationSeconds: 3240,
        rawScore: 8,
        totalQuestions: 10,
        bandScore: 7.5,
        answers: { b1_q1: 'C) both dragonflies and damselflies', b1_q2: 'B) damselflies only', b1_q3: 'B) damselflies only' },
        aiEvaluation: {
          overallBand: 7.5,
          cefrLevel: 'C1',
          summary: 'Exemplary reading comprehension in Barron\'s Test 1 with accurate identification of factual distractors.',
          moduleSpecific: {
            taskAchievementBand: 7.5,
            coherenceCohesionBand: 8.0,
            lexicalResourceBand: 7.5,
            grammarAccuracyBand: 7.5,
          },
          strengths: ['Accurate identification of factual distractors in Odonata passage', 'Consistent scanning pace'],
          weaknesses: ['Carefully check word limits on sentence completions'],
          vocabularyUpgrades: [
            { original: 'many people', suggestion: 'a substantial cohort of individuals', reason: 'High-band academic noun collocation', bandImpact: '+0.5 Band' }
          ],
          grammarCorrections: [],
          instructorFeedback: 'Kathmandu Krypton Certified IELTS Faculty (Kushal Adhikari & Nirmal Thapa) confirms candidate is ready for official exam sitting. Maintain current speed drill pacing.'
        }
      };
      setAttempts([sampleAttempt]);
      saveTestAttempt(sampleAttempt);
    }
  }, []);

  const handleLogin = (profile: StudentProfile) => {
    setStudent(profile);
    saveStoredProfile(profile);
    setIsAuthenticated(true);
    localStorage.setItem('krypton_ielts_authenticated', 'true');
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('krypton_ielts_authenticated');
  };

  const currentTestData = ALL_100_MOCK_TESTS.find(t => t.id === currentTestId) || ALL_100_MOCK_TESTS[0];

  // Start single module test
  const handleStartTest = (testId: number, module: ModuleType) => {
    setCurrentTestId(testId);
    if (module === 'full-mock') {
      setActiveView('full-mock-flow');
    } else {
      setCurrentModule(module);
      setAnswers({});
      setFlaggedQuestions([]);
      setTask1Text('');
      setTask2Text('');
      setActiveView('exam');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start all-in-one 4-module mock flow
  const handleStartFullMockFlow = (testId: number) => {
    setCurrentTestId(testId);
    setActiveView('full-mock-flow');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle flagged questions
  const handleToggleFlag = (qNum: number) => {
    setFlaggedQuestions(prev => 
      prev.includes(qNum) ? prev.filter(n => n !== qNum) : [...prev, qNum]
    );
  };

  // Answer change handler
  const handleAnswerChange = (qId: string, val: string) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  // Switch module within active exam session
  const handleSwitchModule = (newModule: ModuleType) => {
    setCurrentModule(newModule);
    setAnswers({});
    setFlaggedQuestions([]);
  };

  // Submit and Evaluate single module exam
  const handleSubmitExam = () => {
    let rawScore = 0;
    let totalQ = 40;
    let band = 6.5;
    let evalResult: AIEvaluationResult;

    if (currentModule === 'reading') {
      const qList = currentTestData.readingData.questions;
      totalQ = qList.length;
      qList.forEach(q => {
        if (isIeltsAnswerCorrect(answers[q.id], q.correctAnswer)) {
          rawScore++;
        }
      });
      band = calculateReadingBand((rawScore / totalQ) * 40, currentTestData.format);
      evalResult = {
        overallBand: band,
        cefrLevel: getCEFRLevel(band),
        summary: `Your Reading test submission scored ${rawScore} out of ${totalQ} questions correct, resulting in an estimated Band ${band.toFixed(1)}.`,
        moduleSpecific: {
          taskAchievementBand: band,
          lexicalResourceBand: band,
          grammarAccuracyBand: band,
          coherenceCohesionBand: band,
        },
        strengths: [
          `Answered ${rawScore} questions accurately under timed exam constraints.`,
          'Strong factual recall in historical and scientific passages.'
        ],
        weaknesses: [
          `Review the ${totalQ - rawScore} missed items to verify passage keywords.`
        ],
        vocabularyUpgrades: [
          { original: 'important', suggestion: 'paramount / pivotal', reason: 'High-band academic adjective', bandImpact: '+0.5 Band' }
        ],
        grammarCorrections: [],
        instructorFeedback: 'Kathmandu Krypton Certified IELTS Faculty recommends reviewing passage citations for missed questions.'
      };
    } else if (currentModule === 'listening') {
      const qList = currentTestData.listeningData.sections.flatMap(s => s.questions);
      totalQ = qList.length;
      qList.forEach(q => {
        if (isIeltsAnswerCorrect(answers[q.id], q.correctAnswer)) {
          rawScore++;
        }
      });
      band = calculateListeningBand((rawScore / totalQ) * 40);
      evalResult = {
        overallBand: band,
        cefrLevel: getCEFRLevel(band),
        summary: `Your Listening test submission scored ${rawScore} out of ${totalQ} questions correct, resulting in an estimated Band ${band.toFixed(1)}.`,
        moduleSpecific: {
          taskAchievementBand: band,
          lexicalResourceBand: band,
          grammarAccuracyBand: band,
          coherenceCohesionBand: band,
        },
        strengths: ['Accurate acoustic comprehension of British and Australian accents.'],
        weaknesses: ['Verify singular/plural noun forms in form completion.'],
        vocabularyUpgrades: [],
        grammarCorrections: [],
        instructorFeedback: 'IELTS Instructor Kushal Adhikari recommends practicing multi-speaker conversations to sharpen acoustic recognition.'
      };
    } else if (currentModule === 'writing') {
      evalResult = evaluateWritingWithAI(task1Text, task2Text, currentTestData.writingData);
      band = evalResult.overallBand;
    } else {
      evalResult = evaluateSpeakingWithAI({}, currentTestData.speakingData);
      band = evalResult.overallBand;
    }

    const newAttempt: UserTestAttempt = {
      id: `TRF-${Date.now().toString().slice(-6)}`,
      testId: currentTestId,
      module: currentModule,
      testTitle: currentTestData.title,
      format: currentTestData.format,
      completedAt: new Date().toISOString().split('T')[0],
      durationSeconds: 3600,
      rawScore,
      totalQuestions: totalQ,
      bandScore: band,
      answers,
      writingSubmissions: currentModule === 'writing' ? {
        task1Text,
        task1WordCount: task1Text.trim().split(/\s+/).filter(Boolean).length,
        task2Text,
        task2WordCount: task2Text.trim().split(/\s+/).filter(Boolean).length,
      } : undefined,
      aiEvaluation: evalResult,
    };

    saveTestAttempt(newAttempt);
    setAttempts(prev => [newAttempt, ...prev]);
    setActiveAttempt(newAttempt);
    setActiveView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // View specific past attempt
  const handleViewAttempt = (att: UserTestAttempt) => {
    setActiveAttempt(att);
    setCurrentTestId(att.testId);
    setActiveView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If not logged in, show the attractive Pre-Login Portal
  if (!isAuthenticated) {
    return <LoginPortal onLogin={handleLogin} />;
  }

  // Count answered questions
  const totalQuestionsInCurrent = currentModule === 'reading' 
    ? currentTestData.readingData.questions.length 
    : currentModule === 'listening' 
    ? currentTestData.listeningData.sections.flatMap(s => s.questions).length 
    : 2;

  const answeredCount = Object.keys(answers).length;

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      contrastMode === 'dark' 
        ? 'bg-slate-950 text-white' 
        : contrastMode === 'yellow-blue'
        ? 'bg-[#061426] text-yellow-300'
        : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Show Navbar when not in active test or full-mock flow */}
      {activeView !== 'exam' && activeView !== 'full-mock-flow' && (
        <Navbar
          activeView={activeView}
          activeModuleFilter={selectedModuleFilter}
          onNavigate={(view, mod) => {
            if (mod) setSelectedModuleFilter(mod);
            setActiveView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          student={student}
          onLogout={handleLogout}
          onOpenInstructorModal={() => setIsInstructorModalOpen(true)}
          onOpenCalculatorModal={() => setIsCalculatorModalOpen(true)}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'dashboard' && (
          <Dashboard
            student={student}
            allTests={ALL_100_MOCK_TESTS}
            attempts={attempts}
            onStartTest={handleStartTest}
            onStartFullMockFlow={handleStartFullMockFlow}
            onViewResults={handleViewAttempt}
            onNavigateToTestBank={(mod) => {
              if (mod) setSelectedModuleFilter(mod);
              setActiveView('test-bank');
            }}
            onOpenInstructorModal={() => setIsInstructorModalOpen(true)}
            onOpenCalculatorModal={() => setIsCalculatorModalOpen(true)}
          />
        )}

        {activeView === 'test-bank' && (
          <TestBankExplorer
            tests={ALL_100_MOCK_TESTS}
            selectedModule={selectedModuleFilter}
            onSelectModule={setSelectedModuleFilter}
            onStartTest={handleStartTest}
          />
        )}

        {/* Continuous Full 4-in-1 Mock Test Mode */}
        {activeView === 'full-mock-flow' && (
          <FullMockFlow
            testData={currentTestData}
            student={student}
            onExit={() => setActiveView('dashboard')}
            onCompleteFullMock={(attempt) => {
              saveTestAttempt(attempt);
              setAttempts(prev => [attempt, ...prev]);
              setActiveAttempt(attempt);
              setActiveView('result');
            }}
          />
        )}

        {/* Single Module Exam Simulator */}
        {activeView === 'exam' && (
          <div>
            <ExamHeader
              testCode={currentTestData.code}
              testTitle={currentTestData.title}
              module={currentModule}
              student={student}
              initialTimeSeconds={currentModule === 'listening' ? 1920 : 3600}
              onTimeExpired={handleSubmitExam}
              onSubmitExam={handleSubmitExam}
              onExitExam={() => setActiveView('dashboard')}
              onSwitchModule={handleSwitchModule}
              answeredCount={answeredCount}
              totalQuestions={totalQuestionsInCurrent}
              flaggedCount={flaggedQuestions.length}
              fontSize={fontSize}
              setFontSize={setFontSize}
              contrastMode={contrastMode}
              setContrastMode={setContrastMode}
            />

            {currentModule === 'reading' && (
              <ReadingExam
                data={currentTestData.readingData}
                answers={answers}
                onAnswerChange={handleAnswerChange}
                flaggedQuestions={flaggedQuestions}
                onToggleFlag={handleToggleFlag}
                fontSize={fontSize}
                contrastMode={contrastMode}
              />
            )}

            {currentModule === 'listening' && (
              <ListeningExam
                data={currentTestData.listeningData}
                answers={answers}
                onAnswerChange={handleAnswerChange}
                flaggedQuestions={flaggedQuestions}
                onToggleFlag={handleToggleFlag}
                fontSize={fontSize}
                contrastMode={contrastMode}
              />
            )}

            {currentModule === 'writing' && (
              <WritingExam
                data={currentTestData.writingData}
                task1Text={task1Text}
                setTask1Text={setTask1Text}
                task2Text={task2Text}
                setTask2Text={setTask2Text}
                onSubmitForEvaluation={(result) => {
                  handleSubmitExam();
                }}
              />
            )}

            {currentModule === 'speaking' && (
              <SpeakingExam
                data={currentTestData.speakingData}
                onSubmitForEvaluation={(result) => {
                  handleSubmitExam();
                }}
              />
            )}
          </div>
        )}

        {/* Result & AI Scorecard View */}
        {activeView === 'result' && activeAttempt && (
          <ResultDashboard
            attempt={activeAttempt}
            testData={currentTestData}
            student={student}
            onReturnToDashboard={() => setActiveView('dashboard')}
            onRetakeTest={() => handleStartTest(activeAttempt.testId, activeAttempt.module)}
          />
        )}
      </main>

      {/* Official IELTS Band Calculator Modal */}
      <BandCalculatorModal
        isOpen={isCalculatorModalOpen}
        onClose={() => setIsCalculatorModalOpen(false)}
      />

      {/* Kathmandu Krypton Instructor Booking Modal */}
      <InstructorContactModal
        isOpen={isInstructorModalOpen}
        onClose={() => setIsInstructorModalOpen(false)}
        student={student}
      />
    </div>
  );
}
