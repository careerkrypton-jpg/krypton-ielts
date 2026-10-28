import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  User, 
  Lock, 
  Mail, 
  Target, 
  Headphones, 
  BookOpen, 
  PenTool, 
  Mic, 
  GraduationCap,
  X
} from 'lucide-react';
import { StudentProfile } from '../../types/ielts';

interface LoginPortalProps {
  onLogin: (profile: StudentProfile) => void;
}

export const LoginPortal: React.FC<LoginPortalProps> = ({ onLogin }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('Vibe Coder');
  const [email, setEmail] = useState('vibecoder@krypton.edu.np');
  const [password, setPassword] = useState('••••••••');
  const [targetBand, setTargetBand] = useState<number>(7.5);
  const [preferredCountry, setPreferredCountry] = useState<'UK' | 'Australia' | 'Canada' | 'USA' | 'South Korea' | 'New Zealand'>('UK');

  const handleQuickGuestLogin = () => {
    onLogin({
      name: 'Vibe Coder',
      email: 'vibecoder@krypton.edu.np',
      candidateNumber: 'NP-KTM-084219',
      targetBand: 7.5,
      preferredCountry: 'UK',
      consultancyLocation: 'Putalisadak (Opposite to Shankar Dev Campus / Star Mall), Kathmandu, Nepal',
      primaryInstructor: {
        name: 'Kushal Adhikari',
        role: 'Head IELTS Instructor',
        phone: '9706462842',
        email: 'kushaadhikari566@gmail.com',
      },
      secondaryInstructor: {
        name: 'Nirmal Thapa',
        role: 'IELTS Master Trainer',
        phone: '01-5313111',
        email: 'nirmalthapa0458@gmail.com',
      },
      examDate: '2026-11-20',
    });
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name: name || 'Vibe Coder',
      email: email || 'student@krypton.edu.np',
      candidateNumber: `NP-KTM-${Math.floor(100000 + Math.random() * 900000)}`,
      targetBand: targetBand,
      preferredCountry: preferredCountry,
      consultancyLocation: 'Putalisadak (Opposite to Shankar Dev Campus / Star Mall), Kathmandu, Nepal',
      primaryInstructor: {
        name: 'Kushal Adhikari',
        role: 'Head IELTS Instructor',
        phone: '9706462842',
        email: 'kushaadhikari566@gmail.com',
      },
      secondaryInstructor: {
        name: 'Nirmal Thapa',
        role: 'IELTS Master Trainer',
        phone: '01-5313111',
        email: 'nirmalthapa0458@gmail.com',
      },
      examDate: '2026-11-20',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-red-500 selection:text-white">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <img 
              src="/krypton-logo.jpg" 
              alt="Kathmandu Krypton Educational Consultancy" 
              className="h-10 sm:h-12 object-contain"
              onError={(e) => {
                // Fallback to stylized SVG emblem if image asset is unavailable
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="border-l border-slate-200 pl-3">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold text-[#173F7A]">IELTS</span>
                <span className="text-sm font-black text-[#DC2626]">Mock Tests</span>
              </div>
              <span className="text-[10px] tracking-wider text-slate-500 uppercase font-bold block">
                FREE FOR EVERY STUDENT
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setAuthMode('login');
                setShowAuthModal(true);
              }}
              className="text-xs font-bold text-[#173F7A] hover:bg-slate-100 px-3.5 py-2 rounded-xl transition"
            >
              Sign in
            </button>
            <button
              onClick={handleQuickGuestLogin}
              className="bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs px-4 sm:px-5 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
            >
              <span>Instant Access as Vibe Coder</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Landing Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Hero Section */}
        <div 
          className="relative rounded-3xl overflow-hidden p-8 sm:p-14 text-white shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8 border border-blue-900/50"
          style={{
            backgroundColor: '#071746',
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: '28px 28px'
          }}
        >
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-blue-200 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Kathmandu Krypton Educational Consultancy • Putalisadak, Kathmandu</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              100 Free IELTS Mock Tests & <span className="text-[#DC2626]">AI Band Analyser</span>
            </h1>

            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Experience the authentic Computer-Delivered IELTS environment. Practice real exam materials from 
              <strong className="text-white"> Barron's IELTS Practice Exams</strong>, <strong className="text-white">Cambridge English 14–19</strong>, 
              and the <strong className="text-white">British Council</strong>. Complete with instant AI Band evaluation for all 4 modules.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={handleQuickGuestLogin}
                className="bg-[#DC2626] hover:bg-red-700 text-white font-black text-sm px-6 py-3.5 rounded-2xl shadow-xl transition flex items-center gap-2"
              >
                <span>Continue as Vibe Coder</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setAuthMode('register');
                  setShowAuthModal(true);
                }}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3.5 rounded-2xl border border-white/20 transition"
              >
                Create Free Student Account
              </button>
            </div>
          </div>

          {/* Right Live Scorecard Preview Widget */}
          <div className="bg-[#10245C]/80 backdrop-blur-md rounded-2xl p-6 border border-white/15 min-w-[280px] text-center shadow-inner relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
              ESTIMATED OVERALL
            </span>
            <div className="text-6xl font-black text-white font-mono my-2 tracking-tight">
              7.5
            </div>
            <div className="text-xs text-emerald-300 font-bold mb-4">
              Target Band Met • CEFR C1
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold pt-3 border-t border-white/15">
              <div className="bg-white/5 py-1.5 px-3 rounded-lg text-blue-100">L &nbsp; 7.5</div>
              <div className="bg-white/5 py-1.5 px-3 rounded-lg text-blue-100">R &nbsp; 8.0</div>
              <div className="bg-white/5 py-1.5 px-3 rounded-lg text-blue-100">W &nbsp; 7.0</div>
              <div className="bg-white/5 py-1.5 px-3 rounded-lg text-blue-100">S &nbsp; 7.5</div>
            </div>
          </div>
        </div>

        {/* 3 Core Feature Cards (Exact replica of User Image 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-3">
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

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-3">
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

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-3">
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

        {/* 4 Core Modules Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: 'Listening',
              sub: '4 recordings • 40 questions',
              icon: Headphones,
              desc: 'Audio player with native accents, waveform visualizer, and questions 1–40.'
            },
            {
              title: 'Reading',
              sub: '3 passages • 40 questions',
              icon: BookOpen,
              desc: 'Passages from Barron\'s & Cambridge with multi-color text highlighter.'
            },
            {
              title: 'Writing',
              sub: 'Task 1 report • Task 2 essay',
              icon: PenTool,
              desc: 'Real-time word counters and automated 4-criteria AI band feedback.'
            },
            {
              title: 'Speaking',
              sub: 'Interview • Cue card • Discussion',
              icon: Mic,
              desc: 'Mic audio recording, cue card prep timer, and fluency diagnostics.'
            }
          ].map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">—</span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900">{m.title}</h4>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{m.sub}</div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{m.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>100 Full Tests</span>
                  <span className="text-emerald-600 font-bold">100% Free</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner (Exact replica of User Image 3) */}
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
            onClick={() => {
              setAuthMode('register');
              setShowAuthModal(true);
            }}
            className="bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 shrink-0"
          >
            <span>Create free account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Footer (Matching Image 3) */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/krypton-logo.jpg" 
              alt="Kathmandu Krypton" 
              className="h-8 object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="border-l border-slate-200 pl-3">
              <div className="flex items-center gap-1 font-bold text-xs text-slate-800">
                <span>IELTS</span>
                <span className="text-[#DC2626]">Mock Tests</span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">FREE FOR EVERY STUDENT</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 max-w-xl text-left md:text-right">
            © 2026 Krypton Consultancy. IELTS is a registered trademark of the British Council, IDP and Cambridge University Press & Assessment.
          </div>
        </div>
      </footer>

      {/* Login & Registration Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">
                  {authMode === 'login' ? 'Sign in to Krypton IELTS' : 'Create Free Student Account'}
                </h3>
                <p className="text-xs text-slate-500">
                  Kathmandu Krypton Educational Consultancy Portal
                </p>
              </div>
              <button onClick={() => setShowAuthModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              {authMode === 'register' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full pl-9 pr-3 py-2 border rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@gmail.com"
                    className="w-full pl-9 pr-3 py-2 border rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {authMode === 'register' && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Target Band</label>
                    <select
                      value={targetBand}
                      onChange={(e) => setTargetBand(parseFloat(e.target.value))}
                      className="w-full p-2 border rounded-xl text-xs text-slate-800"
                    >
                      <option value="6.5">Band 6.5</option>
                      <option value="7.0">Band 7.0</option>
                      <option value="7.5">Band 7.5</option>
                      <option value="8.0">Band 8.0</option>
                      <option value="8.5">Band 8.5</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Destination</label>
                    <select
                      value={preferredCountry}
                      onChange={(e) => setPreferredCountry(e.target.value as any)}
                      className="w-full p-2 border rounded-xl text-xs text-slate-800"
                    >
                      <option value="UK">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Canada">Canada</option>
                      <option value="USA">USA</option>
                      <option value="South Korea">South Korea</option>
                    </select>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#173F7A] hover:bg-blue-900 text-white font-bold text-xs py-3 rounded-xl transition shadow"
              >
                {authMode === 'login' ? 'Sign In & Access Dashboard' : 'Complete Free Registration'}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-xs text-[#DC2626] hover:underline font-semibold"
                >
                  {authMode === 'login' 
                    ? "Don't have an account? Create one for free" 
                    : "Already registered? Sign in here"}
                </button>
              </div>

              <div className="pt-2 border-t">
                <button
                  type="button"
                  onClick={handleQuickGuestLogin}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Instant 1-Click Guest Access (Vibe Coder)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

