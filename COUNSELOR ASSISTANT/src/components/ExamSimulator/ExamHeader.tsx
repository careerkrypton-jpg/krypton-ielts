import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Pause, 
  Play, 
  HelpCircle, 
  Eye, 
  CheckCircle2, 
  ArrowLeft,
  X,
  AlertTriangle,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  GraduationCap
} from 'lucide-react';
import { ModuleType, StudentProfile } from '../../types/ielts';

interface ExamHeaderProps {
  testCode: string;
  testTitle: string;
  module: ModuleType;
  student: StudentProfile;
  initialTimeSeconds: number;
  onTimeExpired: () => void;
  onSubmitExam: () => void;
  onExitExam: () => void;
  onSwitchModule: (newModule: ModuleType) => void;
  answeredCount: number;
  totalQuestions: number;
  flaggedCount: number;
  fontSize: 'standard' | 'large' | 'xlarge';
  setFontSize: (size: 'standard' | 'large' | 'xlarge') => void;
  contrastMode: 'normal' | 'dark' | 'yellow-blue';
  setContrastMode: (mode: 'normal' | 'dark' | 'yellow-blue') => void;
}

export const ExamHeader: React.FC<ExamHeaderProps> = ({
  testCode,
  testTitle,
  module,
  student,
  initialTimeSeconds,
  onTimeExpired,
  onSubmitExam,
  onExitExam,
  onSwitchModule,
  answeredCount,
  totalQuestions,
  flaggedCount,
  fontSize,
  setFontSize,
  contrastMode,
  setContrastMode,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialTimeSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    setSecondsRemaining(initialTimeSeconds);
  }, [module, initialTimeSeconds]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, onTimeExpired]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const isLowTime = secondsRemaining < 300 && secondsRemaining > 0;

  return (
    <>
      <header className={`sticky top-0 z-50 border-b shadow-xs select-none transition-colors ${
        contrastMode === 'dark' 
          ? 'bg-slate-900 border-slate-700 text-white' 
          : contrastMode === 'yellow-blue'
          ? 'bg-[#0B1F3A] border-amber-400 text-yellow-300'
          : 'bg-white border-slate-200 text-slate-800'
      }`}>
        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          {/* Left: Back Button & Test Identifier */}
          <div className="flex items-center gap-3">
            <button
              onClick={onExitExam}
              className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs flex items-center gap-1.5 transition"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[#173F7A] dark:text-blue-400 text-sm">
                  KRYPTON IELTS
                </span>
                <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {testCode}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  module === 'reading' ? 'bg-emerald-100 text-emerald-800' :
                  module === 'listening' ? 'bg-indigo-100 text-indigo-800' :
                  module === 'writing' ? 'bg-amber-100 text-amber-800' :
                  'bg-rose-100 text-rose-800'
                }`}>
                  {module}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block truncate max-w-sm">
                {testTitle}
              </div>
            </div>
          </div>

          {/* Center: Live Timer */}
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono font-bold text-xs sm:text-sm border ${
              isLowTime 
                ? 'bg-red-50 border-red-300 text-red-600 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
            }`}>
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition"
              title={isPaused ? "Resume Exam" : "Pause Timer"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 fill-current text-emerald-600" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Right: Accessibility, Help & Submit */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettingsModal(true)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs font-semibold hidden md:flex items-center gap-1"
              title="Display Options"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Display</span>
            </button>

            <button
              onClick={() => setShowHelpModal(true)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs font-semibold hidden md:flex items-center gap-1"
              title="IELTS Rules"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Help</span>
            </button>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>
          </div>
        </div>

        {/* User Requested: Quick Module Switcher sub-bar */}
        <div className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 px-4 py-1.5 flex items-center justify-between text-xs overflow-x-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline mr-1">
              Switch Module:
            </span>

            <button
              onClick={() => onSwitchModule('listening')}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition flex items-center gap-1 ${
                module === 'listening'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Headphones className="w-3 h-3" /> Listening
            </button>

            <button
              onClick={() => onSwitchModule('reading')}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition flex items-center gap-1 ${
                module === 'reading'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3 h-3" /> Reading
            </button>

            <button
              onClick={() => onSwitchModule('writing')}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition flex items-center gap-1 ${
                module === 'writing'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <PenTool className="w-3 h-3" /> Writing
            </button>

            <button
              onClick={() => onSwitchModule('speaking')}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition flex items-center gap-1 ${
                module === 'speaking'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Mic className="w-3 h-3" /> Speaking
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-mono hidden md:block">
            Answered: <strong>{answeredCount}</strong> / {totalQuestions}
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Display & Contrast</h3>
              <button onClick={() => setShowSettingsModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase">Text Size</label>
              <div className="grid grid-cols-3 gap-2">
                {['standard', 'large', 'xlarge'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFontSize(s as any)}
                    className={`p-2 rounded-xl text-xs font-bold border ${
                      fontSize === s ? 'bg-blue-50 border-blue-600 text-blue-700' : 'border-slate-200'
                    }`}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase">Contrast Theme</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'normal', label: 'Default', bg: 'bg-white text-slate-900' },
                  { id: 'dark', label: 'Dark', bg: 'bg-slate-900 text-white' },
                  { id: 'yellow-blue', label: 'High Contrast', bg: 'bg-[#0B1F3A] text-yellow-300' }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setContrastMode(c.id as any)}
                    className={`p-2 rounded-xl text-xs font-bold border ${c.bg} ${
                      contrastMode === c.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full bg-[#173F7A] text-white font-bold text-xs py-2.5 rounded-xl"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" /> IELTS Test Guidelines
              </h3>
              <button onClick={() => setShowHelpModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use the top module switcher to jump to any section (Listening, Reading, Writing, Speaking). Answers are auto-saved. When you finish, click Submit to receive instant AI band scores and detailed text citations.
            </p>
            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full bg-[#173F7A] text-white font-bold text-xs py-2.5 rounded-xl"
            >
              Continue Test
            </button>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-lg text-slate-900">Finish and Submit {module.toUpperCase()}?</h3>
            </div>
            <p className="text-xs text-slate-500">
              You have answered <strong>{answeredCount} of {totalQuestions}</strong> questions. Once submitted, the Krypton AI Analyzer will calculate your Band score.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Keep Practising
              </button>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  onSubmitExam();
                }}
                className="bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
