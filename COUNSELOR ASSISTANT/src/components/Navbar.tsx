import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Headphones, 
  BookOpen, 
  PenTool, 
  Mic, 
  LogOut, 
  User, 
  PhoneCall,
  Calculator,
  ChevronDown,
  GraduationCap
} from 'lucide-react';
import { ModuleType, StudentProfile } from '../types/ielts';

interface NavbarProps {
  activeView: 'dashboard' | 'test-bank' | 'exam' | 'result' | 'calculator' | 'full-mock-flow';
  activeModuleFilter: ModuleType;
  onNavigate: (view: 'dashboard' | 'test-bank' | 'exam' | 'result' | 'calculator' | 'full-mock-flow', module?: ModuleType) => void;
  student: StudentProfile;
  onLogout: () => void;
  onOpenInstructorModal: () => void;
  onOpenCalculatorModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  activeModuleFilter,
  onNavigate,
  student,
  onLogout,
  onOpenInstructorModal,
  onOpenCalculatorModal,
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand with Official Logo */}
        <div 
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img 
            src="/krypton-logo.jpg" 
            alt="Kathmandu Krypton Educational Consultancy" 
            className="h-10 sm:h-12 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="border-l border-slate-200 pl-3">
            <div className="flex items-center gap-1.5 font-sans">
              <span className="text-base sm:text-lg font-extrabold text-[#173F7A]">IELTS</span>
              <span className="text-base sm:text-lg font-black text-[#DC2626]">Mock Tests</span>
            </div>
            <span className="text-[10px] tracking-wider text-slate-400 uppercase font-bold block">
              FREE FOR EVERY STUDENT
            </span>
          </div>
        </div>

        {/* Center: Exact Segmented Control from Image 2 */}
        <nav className="hidden md:flex items-center bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/70 text-xs font-bold gap-1">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
              activeView === 'dashboard'
                ? 'bg-[#EBF2FE] text-[#2563EB] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onNavigate('test-bank', 'listening')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
              activeView === 'test-bank' && activeModuleFilter === 'listening'
                ? 'bg-[#EBF2FE] text-[#2563EB] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Listening</span>
          </button>

          <button
            onClick={() => onNavigate('test-bank', 'reading')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
              activeView === 'test-bank' && activeModuleFilter === 'reading'
                ? 'bg-[#EBF2FE] text-[#2563EB] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Reading</span>
          </button>

          <button
            onClick={() => onNavigate('test-bank', 'writing')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
              activeView === 'test-bank' && activeModuleFilter === 'writing'
                ? 'bg-[#EBF2FE] text-[#2563EB] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Writing</span>
          </button>

          <button
            onClick={() => onNavigate('test-bank', 'speaking')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
              activeView === 'test-bank' && activeModuleFilter === 'speaking'
                ? 'bg-[#EBF2FE] text-[#2563EB] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Speaking</span>
          </button>

          <button
            onClick={() => onNavigate('test-bank', 'full-mock')}
            className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
              activeView === 'test-bank' && activeModuleFilter === 'full-mock'
                ? 'bg-[#EBF2FE] text-[#2563EB] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
            title="All 100 Full Mock Tests"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="bg-[#173F7A] text-white text-[10px] px-1.5 rounded">100</span>
          </button>
        </nav>

        {/* Right: Avatar Badge matching Image 2 */}
        <div className="relative">
          <div 
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 cursor-pointer bg-slate-50 hover:bg-slate-100 p-1.5 pr-3 rounded-full border border-slate-200/80 transition"
          >
            <div className="w-9 h-9 rounded-full bg-[#2051BD] text-white font-black text-xs flex items-center justify-center shadow-xs">
              {getInitials(student.name)}
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-xs font-bold text-slate-800 block leading-tight">
                {student.name}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">
                Target: Band {student.targetBand.toFixed(1)}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Profile Dropdown */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-3 border-b border-slate-100">
                <div className="text-xs font-bold text-slate-900">{student.name}</div>
                <div className="text-[11px] text-slate-500 truncate">{student.email}</div>
                <div className="mt-1 text-[10px] bg-red-50 text-[#DC2626] font-bold px-2 py-0.5 rounded inline-block">
                  Target Destination: {student.preferredCountry}
                </div>
              </div>

              <div className="py-1 text-xs font-semibold text-slate-700">
                <button
                  onClick={() => {
                    onOpenCalculatorModal();
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-slate-400" /> IELTS Band Calculator
                </button>
                <button
                  onClick={() => {
                    onOpenInstructorModal();
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-[#173F7A]" /> IELTS Faculty & Review (Kushal / Nirmal)
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Log out / Change Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
