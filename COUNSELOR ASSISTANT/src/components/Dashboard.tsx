import React, { useState } from 'react';
import { 
  Trophy, 
  Clock, 
  Target, 
  Headphones, 
  BookOpen, 
  PenTool, 
  Mic, 
  ArrowRight, 
  Sparkles, 
  BarChart3, 
  CheckCircle2,
  Calendar,
  Layers,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Volume2,
  Flame,
  Award,
  Zap,
  HelpCircle
} from 'lucide-react';
import { MockTestItem, ModuleType, StudentProfile, UserTestAttempt } from '../types/ielts';

interface DashboardProps {
  student: StudentProfile;
  allTests: MockTestItem[];
  attempts: UserTestAttempt[];
  onStartTest: (testId: number, module: ModuleType) => void;
  onStartFullMockFlow: (testId: number) => void;
  onViewResults: (attempt: UserTestAttempt) => void;
  onNavigateToTestBank: (module?: ModuleType) => void;
  onOpenInstructorModal: () => void;
  onOpenCalculatorModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  student,
  allTests,
  attempts,
  onStartTest,
  onStartFullMockFlow,
  onViewResults,
  onNavigateToTestBank,
  onOpenInstructorModal,
  onOpenCalculatorModal,
}) => {
  const [collocationIndex, setCollocationIndex] = useState(0);

  // Daily high-band vocabulary builder to keep practice exciting
  const collocations = [
    { word: 'Precipitous surge', meaning: 'A very steep and rapid increase (essential for Task 1)', example: 'The data indicates a precipitous surge in renewable electricity generation.', band: 'Band 8.5+' },
    { word: 'Cognitive reserve', meaning: 'The brain\'s resilience to neuropathological damage', example: 'Lifelong bilingualism bolsters cognitive reserve in older adults.', band: 'Band 8.0+' },
    { word: 'Detrimental repercussions', meaning: 'Harmful or damaging consequences', example: 'Unchecked carbon emissions inflict detrimental repercussions on marine reefs.', band: 'Band 8.5+' },
    { word: 'Inescapable consensus', meaning: 'An agreement that cannot be denied or ignored', example: 'Scholars have formed an inescapable consensus regarding environmental degradation.', band: 'Band 9.0' },
  ];

  const totalTests = attempts.length;
  const totalMinutes = attempts.reduce((acc, a) => acc + Math.round((a.durationSeconds || 1800) / 60), 0);
  
  const readingAttempts = attempts.filter(a => a.module === 'reading');
  const listeningAttempts = attempts.filter(a => a.module === 'listening');
  const writingAttempts = attempts.filter(a => a.module === 'writing');
  const speakingAttempts = attempts.filter(a => a.module === 'speaking');

  const bestBand = attempts.length > 0 
    ? Math.max(...attempts.map(a => a.bandScore)).toFixed(1)
    : '—';

  const lBand = listeningAttempts.length > 0 ? listeningAttempts[0].bandScore.toFixed(1) : '—';
  const rBand = readingAttempts.length > 0 ? readingAttempts[0].bandScore.toFixed(1) : '—';
  const wBand = writingAttempts.length > 0 ? writingAttempts[0].bandScore.toFixed(1) : '—';
  const sBand = speakingAttempts.length > 0 ? speakingAttempts[0].bandScore.toFixed(1) : '—';

  const overallAvg = attempts.length > 0 
    ? (attempts.reduce((sum, a) => sum + a.bandScore, 0) / attempts.length).toFixed(1)
    : '—';

  const openWhatsApp = (phone: string, instructor: string) => {
    const text = encodeURIComponent(`Hello ${instructor}, I am ${student.name} studying on Krypton Ielts portal.`);
    window.open(`https://wa.me/977${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Hero Banner matching exact Alfa IELTS Image 2 */}
      <div 
        className="rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-blue-900/60 relative overflow-hidden"
        style={{
          backgroundColor: '#071746',
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      >
        <div className="space-y-2 max-w-xl relative z-10">
          <div className="text-xs sm:text-sm text-blue-200 font-medium flex items-center gap-2">
            <span>Welcome back,</span>
            <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2 py-0.2 rounded-full uppercase tracking-wider">
              Krypton Ielts
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {student.name}
          </h1>
          <p className="text-blue-100/90 text-xs sm:text-sm leading-relaxed">
            Take a full test in each skill to see your estimated overall IELTS band. Featuring official Cambridge 20 & Barron's practice materials.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onStartFullMockFlow(1)}
              className="bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg transition flex items-center gap-2"
            >
              <span>Continue practising</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onStartFullMockFlow(1)}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl border border-white/20 transition flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4 text-amber-300" /> Full 4-in-1 Mock Test
            </button>
          </div>
        </div>

        {/* Right Estimated Overall Box matching Image 2 */}
        <div className="bg-[#10245C]/80 backdrop-blur-md rounded-2xl p-5 border border-white/10 min-w-[240px] text-center shadow-inner relative z-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
            ESTIMATED OVERALL
          </span>
          <div className="text-5xl font-black text-white font-mono my-1 tracking-tight">
            {overallAvg}
          </div>

          {/* L - R - / W - S - Quadrant */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs font-mono font-bold text-blue-200 pt-2 border-t border-white/10">
            <div className="text-left">L &nbsp; <span className="text-white">{lBand}</span></div>
            <div className="text-left">R &nbsp; <span className="text-white">{rBand}</span></div>
            <div className="text-left">W &nbsp; <span className="text-white">{wBand}</span></div>
            <div className="text-left">S &nbsp; <span className="text-white">{sBand}</span></div>
          </div>
        </div>
      </div>

      {/* 2. Three Summary Cards matching Image 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl border border-red-200 bg-red-50/50 text-red-500 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {totalTests}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">
              Tests taken
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl border border-red-200 bg-red-50/50 text-red-500 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {totalMinutes}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">
              Minutes practised
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl border border-red-200 bg-red-50/50 text-red-500 flex items-center justify-center shrink-0">
            <Target className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {bestBand}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">
              Best band
            </div>
          </div>
        </div>
      </div>

      {/* 3. Four Core Module Cards with Rich Visual Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Listening Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-indigo-300 transition">
          <div className="h-28 overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80" 
              alt="Listening Practice"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent"></div>
            <span className="absolute bottom-2 left-3 text-white font-mono font-black text-xs bg-indigo-600/90 px-2 py-0.5 rounded">
              AUDIO SIMULATOR
            </span>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#EBF2FE] text-[#2563EB] flex items-center justify-center">
                  <Headphones className="w-4 h-4" />
                </div>
                <span className="text-base font-black text-slate-700 font-mono">{lBand}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Listening</h3>
              <p className="text-xs text-slate-500 mt-0.5">4 recordings • 40 questions</p>

              <div className="mt-4 space-y-1.5">
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-[#2454B4] h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (listeningAttempts.length / 100) * 100)}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {listeningAttempts.length} / 100 tests completed
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-5">
              <button
                onClick={() => onStartTest(1, 'listening')}
                className="bg-[#2454B4] hover:bg-blue-800 text-white font-bold text-xs py-2 rounded-xl transition text-center"
              >
                Test 1
              </button>
              <button
                onClick={() => onNavigateToTestBank('listening')}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs py-2 rounded-xl transition text-center"
              >
                All tests
              </button>
            </div>
          </div>
        </div>

        {/* Reading Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-emerald-300 transition">
          <div className="h-28 overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80" 
              alt="Reading Passages"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent"></div>
            <span className="absolute bottom-2 left-3 text-white font-mono font-black text-xs bg-emerald-600/90 px-2 py-0.5 rounded">
              CAMBRIDGE & BARRON'S
            </span>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#EBF2FE] text-[#2563EB] flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-base font-black text-slate-700 font-mono">{rBand}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Reading</h3>
              <p className="text-xs text-slate-500 mt-0.5">3 passages • 40 questions</p>

              <div className="mt-4 space-y-1.5">
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-[#2454B4] h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (readingAttempts.length / 100) * 100)}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {readingAttempts.length} / 100 tests completed
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-5">
              <button
                onClick={() => onStartTest(1, 'reading')}
                className="bg-[#2454B4] hover:bg-blue-800 text-white font-bold text-xs py-2 rounded-xl transition text-center"
              >
                Test 1
              </button>
              <button
                onClick={() => onNavigateToTestBank('reading')}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs py-2 rounded-xl transition text-center"
              >
                All tests
              </button>
            </div>
          </div>
        </div>

        {/* Writing Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-amber-300 transition">
          <div className="h-28 overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80" 
              alt="Writing AI Evaluation"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent"></div>
            <span className="absolute bottom-2 left-3 text-white font-mono font-black text-xs bg-amber-600/90 px-2 py-0.5 rounded">
              AI EXAMINER GRADER
            </span>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#EBF2FE] text-[#2563EB] flex items-center justify-center">
                  <PenTool className="w-4 h-4" />
                </div>
                <span className="text-base font-black text-slate-700 font-mono">{wBand}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Writing</h3>
              <p className="text-xs text-slate-500 mt-0.5">Task 1 report • Task 2 essay</p>

              <div className="mt-4 space-y-1.5">
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-[#2454B4] h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (writingAttempts.length / 100) * 100)}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {writingAttempts.length} / 100 tests completed
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-5">
              <button
                onClick={() => onStartTest(1, 'writing')}
                className="bg-[#2454B4] hover:bg-blue-800 text-white font-bold text-xs py-2 rounded-xl transition text-center"
              >
                Test 1
              </button>
              <button
                onClick={() => onNavigateToTestBank('writing')}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs py-2 rounded-xl transition text-center"
              >
                All tests
              </button>
            </div>
          </div>
        </div>

        {/* Speaking Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-rose-300 transition">
          <div className="h-28 overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80" 
              alt="Speaking Practice"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent"></div>
            <span className="absolute bottom-2 left-3 text-white font-mono font-black text-xs bg-rose-600/90 px-2 py-0.5 rounded">
              MIC VOICE RECORDER
            </span>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#EBF2FE] text-[#2563EB] flex items-center justify-center">
                  <Mic className="w-4 h-4" />
                </div>
                <span className="text-base font-black text-slate-700 font-mono">{sBand}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Speaking</h3>
              <p className="text-xs text-slate-500 mt-0.5">Interview • Cue card • Discussion</p>

              <div className="mt-4 space-y-1.5">
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-[#2454B4] h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (speakingAttempts.length / 100) * 100)}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {speakingAttempts.length} / 100 tests completed
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-5">
              <button
                onClick={() => onStartTest(1, 'speaking')}
                className="bg-[#2454B4] hover:bg-blue-800 text-white font-bold text-xs py-2 rounded-xl transition text-center"
              >
                Test 1
              </button>
              <button
                onClick={() => onNavigateToTestBank('speaking')}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs py-2 rounded-xl transition text-center"
              >
                All tests
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Interactive "Collocation of the Day" + Faculty Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collocation Booster */}
        <div className="bg-gradient-to-br from-indigo-900 via-[#173F7A] to-blue-900 text-white rounded-3xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/10 px-2.5 py-0.5 rounded-full text-blue-200 border border-white/15">
                Band 8.0+ Daily Collocation
              </span>
              <span className="text-xs text-amber-300 font-bold font-mono">
                {collocations[collocationIndex].band}
              </span>
            </div>
            <h4 className="text-xl font-black text-amber-300 mb-1">
              "{collocations[collocationIndex].word}"
            </h4>
            <p className="text-xs text-blue-100 italic mb-2">
              Meaning: {collocations[collocationIndex].meaning}
            </p>
            <p className="text-xs text-slate-200 bg-white/10 p-3 rounded-xl border border-white/10 font-serif leading-relaxed">
              "{collocations[collocationIndex].example}"
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs">
            <button
              onClick={() => setCollocationIndex((collocationIndex + 1) % collocations.length)}
              className="text-xs text-blue-200 hover:text-white font-bold underline"
            >
              Next Collocation →
            </button>
            <span className="text-[11px] text-blue-300">
              Curated by Kushal Adhikari
            </span>
          </div>
        </div>

        {/* IELTS Instructors Contact Spotlight Card (Requested by User) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center font-bold">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Kathmandu Krypton IELTS Instructors
                  </h3>
                  <p className="text-[11px] text-slate-500">Putalisadak, Kathmandu • Direct Student Support</p>
                </div>
              </div>
              <button
                onClick={onOpenInstructorModal}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                View Full Faculty →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
              {/* Kushal Adhikari */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Kushal Adhikari</h4>
                    <span className="text-[10px] text-blue-700 font-bold bg-blue-100 px-1.5 py-0.2 rounded">
                      Head IELTS Instructor
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#173F7A] text-white font-bold text-xs flex items-center justify-center">
                    KA
                  </div>
                </div>

                <div className="text-xs font-mono space-y-1 text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <a href="tel:9706462842" className="hover:underline font-bold text-slate-800">9706462842</a>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <a href="mailto:kushaadhikari566@gmail.com" className="hover:underline truncate text-[11px]">
                      kushaadhikari566@gmail.com
                    </a>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => openWhatsApp('9706462842', 'Kushal Adhikari')}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] py-1.5 rounded-xl transition flex items-center justify-center gap-1"
                  >
                    <MessageSquare className="w-3 h-3" /> WhatsApp
                  </button>
                  <a
                    href="tel:9706462842"
                    className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 font-bold text-[11px] rounded-xl hover:bg-slate-100"
                  >
                    Call
                  </a>
                </div>
              </div>

              {/* Nirmal Thapa */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Nirmal Thapa</h4>
                    <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.2 rounded">
                      IELTS Master Trainer
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold text-xs flex items-center justify-center">
                    NT
                  </div>
                </div>

                <div className="text-xs font-mono space-y-1 text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <a href="tel:015313111" className="hover:underline font-bold text-slate-800">01-5313111</a>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <a href="mailto:nirmalthapa0458@gmail.com" className="hover:underline truncate text-[11px]">
                      nirmalthapa0458@gmail.com
                    </a>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <a
                    href="mailto:nirmalthapa0458@gmail.com"
                    className="flex-1 bg-[#173F7A] hover:bg-blue-900 text-white font-bold text-[11px] py-1.5 rounded-xl transition flex items-center justify-center gap-1"
                  >
                    <Mail className="w-3 h-3" /> Email Nirmal
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#DC2626]" /> Putalisadak, Kathmandu (Opposite Shankar Dev)
            </span>
            <button onClick={onOpenInstructorModal} className="font-bold text-[#DC2626] hover:underline">
              Book In-Person Test Review
            </button>
          </div>
        </div>
      </div>

      {/* 5. Three Core Feature Cards matching Image 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Real exam conditions
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Countdown timers, question navigator and one-play audio — exactly like the computer-delivered test.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            AI band analyser
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Writing and Speaking are marked against the four official criteria, with corrections and Band 9 model answers.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Track your progress
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            See your band for every attempt, your estimated overall score and how you improve over time.
          </p>
        </div>
      </div>

      {/* 6. Bottom Banner matching Image 3 */}
      <div 
        className="rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-blue-900/50"
        style={{
          backgroundColor: '#071746',
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      >
        <div className="space-y-1">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            Ready for your target band?
          </h3>
          <p className="text-blue-100 text-xs sm:text-sm">
            Create a free account and start Mock Test 1 in under a minute.
          </p>
        </div>

        <button
          onClick={() => onStartTest(1, 'reading')}
          className="bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 shrink-0"
        >
          <span>Start Practice Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 7. Footer matching Image 3 */}
      <footer className="pt-8 pb-4 text-xs text-slate-500 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img 
            src="/krypton-logo.jpg" 
            alt="Kathmandu Krypton" 
            className="h-8 object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="border-l border-slate-200 pl-3">
            <div className="flex items-center gap-1 font-bold text-xs text-slate-800">
              <span>Krypton Ielts</span>
              <span className="text-[#DC2626]">Mock Tests</span>
            </div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">FREE FOR EVERY STUDENT</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 max-w-xl text-left md:text-right">
          © 2026 Krypton Ielts • Kathmandu Krypton Educational Consultancy, Putalisadak, Kathmandu. IELTS is a registered trademark of the British Council, IDP and Cambridge University Press & Assessment.
        </div>
      </footer>
    </div>
  );
};
