import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  CheckCircle2, 
  User, 
  GraduationCap, 
  Sparkles, 
  ExternalLink,
  Clock
} from 'lucide-react';
import { StudentProfile } from '../types/ielts';

interface InstructorContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
}

export const InstructorContactModal: React.FC<InstructorContactModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  const [selectedInstructor, setSelectedInstructor] = useState<'Kushal Adhikari' | 'Nirmal Thapa'>('Kushal Adhikari');
  const [service, setService] = useState('Writing Task 2 Essay Evaluation');
  const [preferredDate, setPreferredDate] = useState('2026-11-05');
  const [studentNote, setStudentNote] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      onClose();
    }, 2800);
  };

  const openWhatsApp = (phone: string, instructorName: string) => {
    const text = encodeURIComponent(
      `Hello ${instructorName}, I am ${student.name} from Krypton Ielts mock test portal. I would like to schedule an IELTS guidance session for my target Band ${student.targetBand.toFixed(1)}.`
    );
    window.open(`https://wa.me/977${phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 border border-slate-200 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#173F7A] flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">
                Krypton Ielts Faculty & Contact
              </h3>
              <p className="text-xs text-slate-500">
                Kathmandu Krypton Educational Consultancy • Putalisadak
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Location Contact Card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#DC2626]" /> Official Center Location
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              Open 7 AM - 6:30 PM
            </span>
          </div>
          <p className="text-slate-700 font-medium pl-5">
            Kathmandu Krypton Educational Consultancy, Putalisadak (Opposite to Shankar Dev Campus / Star Mall), Kathmandu, Nepal
          </p>
          <div className="pl-5 pt-1 flex flex-wrap items-center gap-4 text-slate-600 font-semibold">
            <span>Landline: <strong>01-5313111</strong></span>
            <span>Hotline: <strong>+977 9744598328</strong></span>
            <span>Direct: <strong>9706462842</strong></span>
          </div>
        </div>

        {/* Two IELTS Instructors Cards */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Meet Your Certified IELTS Instructors
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Kushal Adhikari Card */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-[#173F7A]">
                  Kushal Adhikari
                </span>
                <span className="text-[10px] bg-[#173F7A] text-white font-bold px-2 py-0.5 rounded">
                  HEAD INSTRUCTOR
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Specialist in Band 8.5+ Strategy, Academic Writing Task 2 & Speaking Mock Interviews.
              </p>
              <div className="text-xs font-mono font-semibold text-slate-700 space-y-0.5 pt-1">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <a href="tel:9706462842" className="hover:underline font-bold">9706462842</a>
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
                  type="button"
                  onClick={() => openWhatsApp('9706462842', 'Kushal Adhikari')}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] py-1.5 rounded-xl transition flex items-center justify-center gap-1 shadow-xs"
                >
                  <MessageSquare className="w-3 h-3" /> WhatsApp
                </button>
                <a
                  href="tel:9706462842"
                  className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 font-bold text-[11px] rounded-xl hover:bg-slate-50 transition"
                >
                  Call
                </a>
              </div>
            </div>

            {/* Nirmal Thapa Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-slate-900">
                  Nirmal Thapa
                </span>
                <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded">
                  MASTER TRAINER
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Specialist in Reading Fast Scanning, Listening Accents & Grammar Accuracy Clinics.
              </p>
              <div className="text-xs font-mono font-semibold text-slate-700 space-y-0.5 pt-1">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <a href="tel:015313111" className="hover:underline font-bold">01-5313111</a>
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
                  className="flex-1 bg-[#173F7A] hover:bg-blue-900 text-white font-bold text-[11px] py-1.5 rounded-xl transition flex items-center justify-center gap-1 shadow-xs"
                >
                  <Mail className="w-3 h-3" /> Email Nirmal
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 1-on-1 Guidance Booking Form */}
        {isBooked ? (
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-base text-slate-900">Session Request Dispatched!</h4>
            <p className="text-xs text-slate-600">
              Instructor {selectedInstructor} has been notified. We will confirm your session at Putalisadak or online.
            </p>
          </div>
        ) : (
          <form onSubmit={handleBookSession} className="space-y-3 pt-1 border-t">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Schedule 1-on-1 Test Review Session
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Select Instructor</label>
                <select
                  value={selectedInstructor}
                  onChange={(e) => setSelectedInstructor(e.target.value as any)}
                  className="w-full p-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                >
                  <option value="Kushal Adhikari">Kushal Adhikari (9706462842)</option>
                  <option value="Nirmal Thapa">Nirmal Thapa</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Focus Module</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                >
                  <option>Writing Task 1 & 2 Evaluation</option>
                  <option>Speaking 1-on-1 Mock Interview</option>
                  <option>Reading Speed & Matching Headings Drill</option>
                  <option>Full 4-in-1 Mock Test Review</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600">Preferred Date</label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600">Specific Queries or Target Band</label>
              <input
                type="text"
                value={studentNote}
                onChange={(e) => setStudentNote(e.target.value)}
                placeholder="E.g., Need help boosting Writing from 6.0 to 7.5..."
                className="w-full p-2 rounded-xl border border-slate-300 text-xs text-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded-xl transition shadow"
            >
              Confirm Instructor Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

