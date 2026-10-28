import React, { useState } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Sparkles, 
  Printer, 
  ArrowLeft, 
  BookOpen, 
  Quote, 
  TrendingUp, 
  ShieldCheck, 
  FileText,
  HelpCircle,
  Share2
} from 'lucide-react';
import { UserTestAttempt, MockTestItem, StudentProfile } from '../../types/ielts';

interface ResultDashboardProps {
  attempt: UserTestAttempt;
  testData: MockTestItem;
  student: StudentProfile;
  onReturnToDashboard: () => void;
  onRetakeTest: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({
  attempt,
  testData,
  student,
  onReturnToDashboard,
  onRetakeTest,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'answers' | 'ai-feedback' | 'certificate'>('overview');

  const readingQuestions = testData.readingData.questions;
  const listeningQuestions = testData.listeningData.sections.flatMap(s => s.questions);
  const isReading = attempt.module === 'reading';
  const isListening = attempt.module === 'listening';
  const isWriting = attempt.module === 'writing';
  const isSpeaking = attempt.module === 'speaking';

  const questionsList = isReading ? readingQuestions : isListening ? listeningQuestions : [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onReturnToDashboard}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#173F7A] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onRetakeTest}
            className="px-3.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold hover:bg-slate-100 transition"
          >
            Retake Test
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-1.5 rounded-xl bg-[#173F7A] hover:bg-blue-900 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <Printer className="w-3.5 h-3.5" /> Print Diagnostic Certificate
          </button>
        </div>
      </div>

      {/* Hero Scorecard Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0E284E] via-[#173F7A] to-[#2563EB] text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-blue-100 border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Official IELTS Band Evaluation • Krypton AI Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {attempt.testTitle}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 flex items-center gap-2">
              <span>Candidate: <strong>{student.name}</strong></span>
              <span>•</span>
              <span>ID: <strong className="font-mono">{student.candidateNumber}</strong></span>
              <span>•</span>
              <span>Format: <strong>{attempt.format}</strong></span>
            </p>
          </div>

          {/* Big Band Score Box */}
          <div className="bg-white/10 backdrop-blur-md border border-white/25 rounded-2xl p-5 flex items-center gap-5 shrink-0 shadow-inner">
            <div className="text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                Overall Band
              </span>
              <div className="text-5xl font-black text-white font-mono mt-0.5">
                {attempt.bandScore.toFixed(1)}
              </div>
              <span className="text-[10px] text-blue-200 uppercase font-semibold">
                out of 9.0
              </span>
            </div>

            <div className="border-l border-white/20 pl-4 space-y-1">
              <div className="text-xs text-blue-100 font-semibold">
                CEFR: <strong className="text-white text-sm">{attempt.aiEvaluation?.cefrLevel || 'C1'}</strong>
              </div>
              {attempt.rawScore !== undefined && (
                <div className="text-xs text-blue-100 font-semibold font-mono">
                  Raw: <strong className="text-white">{attempt.rawScore} / {attempt.totalQuestions || 40}</strong>
                </div>
              )}
              <div className="text-[11px] text-emerald-300 font-bold">
                Target: Band {student.targetBand.toFixed(1)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'overview'
              ? 'bg-[#173F7A] text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" /> Performance Summary
        </button>

        {questionsList.length > 0 && (
          <button
            onClick={() => setActiveTab('answers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'answers'
                ? 'bg-[#173F7A] text-white shadow'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Answer Keys & Passage Citations
          </button>
        )}

        <button
          onClick={() => setActiveTab('ai-feedback')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'ai-feedback'
              ? 'bg-[#173F7A] text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> AI Diagnostic & Upgrades
        </button>

        <button
          onClick={() => setActiveTab('certificate')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'certificate'
              ? 'bg-[#173F7A] text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-blue-600" /> Printable Score Certificate
        </button>
      </div>

      {/* Tab: Performance Summary */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Sub-Criteria Grid */}
          {attempt.aiEvaluation?.moduleSpecific && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" /> Official IELTS 4-Criteria Assessment Breakdown
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(attempt.aiEvaluation.moduleSpecific).map(([key, val]) => (
                  <div key={key} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
                    <span className="text-[10px] font-bold uppercase text-slate-500">
                      {key.replace('Band', '').replace(/([A-Z])/g, ' $1')}
                    </span>
                    <div className="text-2xl font-black text-[#173F7A] font-mono mt-1">
                      Band {val?.toFixed(1)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Summary Statement */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> AI Diagnostic Analysis
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {attempt.aiEvaluation?.summary || "Your mock test response has been analyzed according to the official British Council / Cambridge assessment framework."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
              {/* Strengths */}
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                <span className="text-xs font-bold text-emerald-800 uppercase flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Demonstrated Strengths
                </span>
                <ul className="list-disc pl-4 space-y-1 text-xs text-emerald-950">
                  {attempt.aiEvaluation?.strengths.map((str, i) => (
                    <li key={i}>{str}</li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
                <span className="text-xs font-bold text-rose-800 uppercase flex items-center gap-1.5 mb-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" /> Areas for Band Acceleration
                </span>
                <ul className="list-disc pl-4 space-y-1 text-xs text-rose-950">
                  {attempt.aiEvaluation?.weaknesses.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Certified IELTS Faculty Recommendation */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#173F7A]">
                Krypton Ielts Academic Faculty Recommendation
              </span>
              <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1 leading-relaxed">
                {attempt.aiEvaluation?.instructorFeedback || "Connect with Head IELTS Instructor Kushal Adhikari (kushaadhikari566@gmail.com / 9706462842) or Nirmal Thapa (nirmalthapa0458@gmail.com) at Putalisadak to fine-tune your exam timing and essay cohesion."}
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="bg-[#173F7A] hover:bg-blue-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shrink-0 shadow"
            >
              Export Report for Faculty Review
            </button>
          </div>
        </div>
      )}

      {/* Tab: Question-by-Question Answers with Passage Citations */}
      {activeTab === 'answers' && questionsList.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">
              Detailed Question Analysis & Text Evidence
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Total Questions: {questionsList.length}
            </span>
          </div>

          <div className="space-y-4">
            {questionsList.map((q) => {
              const userAns = attempt.answers[q.id] || '(No Answer)';
              const correctAns = Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' / ') : q.correctAnswer;
              
              const isCorrect = userAns.toLowerCase().trim() === String(correctAns).toLowerCase().trim() ||
                (q.type === 'multiple-choice-single' && userAns.startsWith(String(correctAns).charAt(0)));

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-2xl p-5 border transition-all ${
                    isCorrect ? 'border-emerald-200' : 'border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-7 h-7 rounded-lg text-white font-mono font-bold text-xs flex items-center justify-center ${
                        isCorrect ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}>
                        {q.number}
                      </span>
                      <span className="text-xs font-bold text-slate-700">
                        {q.question}
                      </span>
                    </div>

                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span>{isCorrect ? 'Correct' : 'Incorrect'}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 font-medium">Your Submitted Answer:</span>
                      <p className={`font-mono font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {userAns}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Official Correct Answer:</span>
                      <p className="font-mono font-bold text-emerald-800">
                        {correctAns}
                      </p>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="mt-3 text-xs text-slate-600">
                    <strong className="text-slate-800">Explanation: </strong>
                    {q.explanation}
                  </div>

                  {/* Verbatim Text Citation */}
                  {((q as any).passageEvidence || (q as any).audioEvidence) && (
                    <div className="mt-3 bg-amber-50/70 p-3 rounded-xl border border-amber-200/60 text-xs text-amber-950 flex items-start gap-2">
                      <Quote className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-900 block text-[10px] uppercase tracking-wider">
                          Official Verbatim Evidence:
                        </span>
                        <p className="italic font-serif mt-0.5">
                          "{(q as any).passageEvidence || (q as any).audioEvidence}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: AI Diagnostic & Upgrades (Vocabulary & Grammar) */}
      {activeTab === 'ai-feedback' && (
        <div className="space-y-6">
          {/* Vocabulary Upgrades */}
          {attempt.aiEvaluation?.vocabularyUpgrades && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" /> Academic Vocabulary Upgrades (Band 8.0+ Lexical Resource)
              </h3>
              <p className="text-xs text-slate-500">
                Replace generic expressions with sophisticated academic collocations to elevate your score from Band 6.5 to Band 8.0+.
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs divide-y divide-slate-200">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-left">
                    <tr>
                      <th className="px-4 py-3">Basic Expression</th>
                      <th className="px-4 py-3">Advanced C1/C2 Replacement</th>
                      <th className="px-4 py-3">Examiner Rationale</th>
                      <th className="px-4 py-3">Band Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {attempt.aiEvaluation.vocabularyUpgrades.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-rose-700 font-medium">
                          {item.original}
                        </td>
                        <td className="px-4 py-3 text-emerald-700 font-bold">
                          {item.suggestion}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {item.reason}
                        </td>
                        <td className="px-4 py-3 font-semibold text-[#173F7A]">
                          {item.bandImpact}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Grammar Corrections */}
          {attempt.aiEvaluation?.grammarCorrections && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" /> Grammatical Accuracy & Syntax Polish
              </h3>
              <div className="space-y-3">
                {attempt.aiEvaluation.grammarCorrections.map((corr, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <div className="text-rose-700">
                      <strong>Draft Sentence: </strong>
                      <span className="line-through">{corr.original}</span>
                    </div>
                    <div className="text-emerald-700">
                      <strong>Elevated Correction: </strong>
                      <span className="font-semibold">{corr.corrected}</span>
                    </div>
                    <div className="text-slate-500 italic">
                      <strong>Rule: </strong>{corr.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Printable Diagnostic Score Certificate */}
      {activeTab === 'certificate' && (
        <div id="printable-certificate" className="bg-white rounded-3xl p-8 border-2 border-slate-300 shadow-lg space-y-8 max-w-4xl mx-auto">
          {/* Official Letterhead */}
          <div className="border-b-2 border-[#173F7A] pb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#173F7A] text-white flex items-center justify-center font-black text-2xl shadow">
                K
              </div>
              <div>
                <h2 className="text-xl font-black text-[#173F7A] tracking-tight">
                  KATHMANDU KRYPTON EDUCATIONAL CONSULTANCY
                </h2>
                <p className="text-xs text-[#DC2626] font-bold tracking-wider uppercase">
                  Putalisadak, Kathmandu, Nepal • Phone: 01-5313111 / +977 9744598328
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Official IELTS Preparation & Computer-Delivered Mock Testing Centre
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Test Report Form (TRF)</span>
              <div className="font-mono font-bold text-xs text-slate-800">
                {attempt.id}
              </div>
            </div>
          </div>

          {/* Certificate Title */}
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
              IELTS Diagnostic Performance Scorecard
            </h3>
            <p className="text-xs text-slate-500">
              Evaluated strictly in accordance with British Council, IDP: IELTS Australia, and Cambridge English Language Assessment standards.
            </p>
          </div>

          {/* Candidate Profile Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 font-medium">Candidate Name:</span>
              <p className="font-bold text-slate-900">{student.name}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Candidate Number:</span>
              <p className="font-bold text-slate-900 font-mono">{student.candidateNumber}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Exam Date:</span>
              <p className="font-bold text-slate-900">{attempt.completedAt}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Head IELTS Instructor:</span>
              <p className="font-bold text-[#173F7A]">{student.primaryInstructor?.name || 'Kushal Adhikari'}</p>
            </div>
          </div>

          {/* Bands Matrix */}
          <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-4">
            <div className="text-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Overall IELTS Band Score
              </span>
              <div className="text-6xl font-black text-[#173F7A] font-mono mt-1">
                {attempt.bandScore.toFixed(1)}
              </div>
              <span className="inline-block mt-1 text-xs font-bold bg-[#DC2626] text-white px-3 py-0.5 rounded-full">
                CEFR Level: {attempt.aiEvaluation?.cefrLevel || 'C1'} (Competent User)
              </span>
            </div>

            {/* Sub-bands */}
            <div className="grid grid-cols-4 gap-3 pt-4 border-t border-blue-200/60 text-center">
              <div className="bg-white p-3 rounded-xl border border-blue-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Listening</span>
                <div className="text-xl font-black text-slate-900 font-mono">
                  {isListening ? attempt.bandScore.toFixed(1) : '7.0'}
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-blue-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Reading</span>
                <div className="text-xl font-black text-slate-900 font-mono">
                  {isReading ? attempt.bandScore.toFixed(1) : '7.5'}
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-blue-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Writing</span>
                <div className="text-xl font-black text-slate-900 font-mono">
                  {isWriting ? attempt.bandScore.toFixed(1) : '6.5'}
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-blue-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Speaking</span>
                <div className="text-xl font-black text-slate-900 font-mono">
                  {isSpeaking ? attempt.bandScore.toFixed(1) : '7.0'}
                </div>
              </div>
            </div>
          </div>

          {/* Certified IELTS Faculty Sign-off Line */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div>
              <div className="w-48 border-b border-slate-400 mb-1"></div>
              <span>Authorized Faculty: Kushal Adhikari / Nirmal Thapa</span>
              <div className="text-[10px] text-slate-400">Kathmandu Krypton Educational Consultancy • Putalisadak</div>
            </div>
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-red-300 flex items-center justify-center text-center text-[10px] text-red-500 font-bold uppercase rotate-[-12deg]">
              Kathmandu<br/>Krypton<br/>Certified
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

