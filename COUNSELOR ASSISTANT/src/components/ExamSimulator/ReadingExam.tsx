import React, { useState, useRef } from 'react';
import { 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  Highlighter, 
  Trash2, 
  BookOpen, 
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { ReadingMockData, ReadingQuestion } from '../../types/ielts';

interface ReadingExamProps {
  data: ReadingMockData;
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, answer: string) => void;
  flaggedQuestions: number[];
  onToggleFlag: (questionNumber: number) => void;
  fontSize: 'standard' | 'large' | 'xlarge';
  contrastMode: 'normal' | 'dark' | 'yellow-blue';
}

export const ReadingExam: React.FC<ReadingExamProps> = ({
  data,
  answers,
  onAnswerChange,
  flaggedQuestions,
  onToggleFlag,
  fontSize,
  contrastMode,
}) => {
  const [activePassageIndex, setActivePassageIndex] = useState(0);
  const [activeQuestionId, setActiveQuestionId] = useState<string>(data.questions[0]?.id || 'r_q1');
  const [highlightColor, setHighlightColor] = useState<'yellow' | 'green' | 'pink'>('yellow');
  const [highlights, setHighlights] = useState<{ id: string; text: string; color: string }[]>([]);

  const passage = data.passages[activePassageIndex] || data.passages[0];
  const passageQuestions = data.questions.filter(q => q.passageIndex === activePassageIndex);

  // Text size classes
  const textSizeClass = fontSize === 'xlarge' ? 'text-lg leading-relaxed' : fontSize === 'large' ? 'text-base leading-relaxed' : 'text-sm leading-relaxed';

  // Floating highlight handler
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;
    const selectedText = selection.toString().trim();
    if (selectedText.length > 2) {
      const newHl = {
        id: String(Date.now()),
        text: selectedText,
        color: highlightColor,
      };
      setHighlights(prev => [...prev.slice(-20), newHl]);
    }
  };

  const currentQuestionIndex = data.questions.findIndex(q => q.id === activeQuestionId);
  const currentQuestion = data.questions[currentQuestionIndex] || data.questions[0];

  const goToNext = () => {
    if (currentQuestionIndex < data.questions.length - 1) {
      const nextQ = data.questions[currentQuestionIndex + 1];
      setActiveQuestionId(nextQ.id);
      if (nextQ.passageIndex !== activePassageIndex) {
        setActivePassageIndex(nextQ.passageIndex);
      }
    }
  };

  const goToPrev = () => {
    if (currentQuestionIndex > 0) {
      const prevQ = data.questions[currentQuestionIndex - 1];
      setActiveQuestionId(prevQ.id);
      if (prevQ.passageIndex !== activePassageIndex) {
        setActivePassageIndex(prevQ.passageIndex);
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-65px)]">
      {/* Passage Selector Tabs */}
      <div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {data.passages.map((p, idx) => {
            const isActive = activePassageIndex === idx;
            const qCount = data.questions.filter(q => q.passageIndex === idx).length;
            const answeredInPassage = data.questions
              .filter(q => q.passageIndex === idx && answers[q.id])
              .length;

            return (
              <button
                key={idx}
                onClick={() => {
                  setActivePassageIndex(idx);
                  const firstQ = data.questions.find(q => q.passageIndex === idx);
                  if (firstQ) setActiveQuestionId(firstQ.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#173F7A] text-white shadow-sm'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 border border-slate-200 dark:border-slate-600'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Passage {idx + 1}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {answeredInPassage}/{qCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Highlight Color Picker */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold hidden sm:inline flex items-center gap-1">
            <Highlighter className="w-3.5 h-3.5" /> Highlight:
          </span>
          <button
            onClick={() => setHighlightColor('yellow')}
            className={`w-5 h-5 rounded-full bg-yellow-300 border-2 ${highlightColor === 'yellow' ? 'border-blue-600 scale-110' : 'border-transparent'}`}
            title="Yellow Highlight"
          />
          <button
            onClick={() => setHighlightColor('green')}
            className={`w-5 h-5 rounded-full bg-emerald-300 border-2 ${highlightColor === 'green' ? 'border-blue-600 scale-110' : 'border-transparent'}`}
            title="Green Highlight"
          />
          <button
            onClick={() => setHighlightColor('pink')}
            className={`w-5 h-5 rounded-full bg-pink-300 border-2 ${highlightColor === 'pink' ? 'border-blue-600 scale-110' : 'border-transparent'}`}
            title="Pink Highlight"
          />
          {highlights.length > 0 && (
            <button
              onClick={() => setHighlights([])}
              className="p-1 text-slate-400 hover:text-red-500 ml-1"
              title="Clear Highlights"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Split Screen Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Pane: Reading Passage */}
        <div 
          onMouseUp={handleTextSelection}
          className="w-full md:w-1/2 h-full overflow-y-auto p-6 md:p-8 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 select-text"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
              <span className="text-xs font-bold text-[#173F7A] uppercase tracking-wider">
                IELTS Academic Reading Test
              </span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-1">
                {passage.title}
              </h2>
              {passage.subheading && (
                <p className="text-xs sm:text-sm text-slate-500 italic mt-2">
                  {passage.subheading}
                </p>
              )}
            </div>

            {/* Paragraphs with labels [A], [B], [C] */}
            <div className="space-y-5">
              {passage.paragraphs.map((p, idx) => (
                <div key={idx} className="relative pl-7">
                  <span className="absolute left-0 top-0.5 w-5 h-5 rounded bg-blue-100 dark:bg-slate-800 text-[#173F7A] dark:text-blue-300 font-black text-xs flex items-center justify-center font-mono">
                    {p.label}
                  </span>
                  <p className={`${textSizeClass} text-slate-800 dark:text-slate-200 font-serif`}>
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane: Questions */}
        <div className="w-full md:w-1/2 h-full overflow-y-auto p-6 md:p-8 bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
          <div className="max-w-2xl mx-auto w-full space-y-6">
            {/* Question Filter / Counter */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase">
                Questions for Passage {activePassageIndex + 1}
              </span>
              <button
                onClick={() => onToggleFlag(currentQuestion.number)}
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition flex items-center gap-1.5 ${
                  flaggedQuestions.includes(currentQuestion.number)
                    ? 'bg-amber-100 border-amber-300 text-amber-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flaggedQuestions.includes(currentQuestion.number) ? 'Flagged for Review' : 'Flag Question'}</span>
              </button>
            </div>

            {/* Current Question Body */}
            <div className="space-y-6">
              {passageQuestions.map((q) => {
                const isSelected = activeQuestionId === q.id;
                const userAns = answers[q.id] || '';

                return (
                  <div
                    key={q.id}
                    id={`question-box-${q.number}`}
                    onClick={() => setActiveQuestionId(q.id)}
                    className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border transition-all ${
                      isSelected
                        ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-7 h-7 rounded-lg bg-[#173F7A] text-white font-mono font-bold text-xs flex items-center justify-center">
                        {q.number}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {q.type.replace(/-/g, ' ')}
                      </span>
                    </div>

                    {/* Instruction */}
                    <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-slate-800 p-2.5 rounded-xl mb-3">
                      {q.instruction}
                    </p>

                    {/* Question text */}
                    <p className={`font-semibold text-slate-800 dark:text-slate-100 mb-4 ${textSizeClass}`}>
                      {q.question}
                    </p>

                    {/* True / False / Not Given & Yes / No / Not Given */}
                    {(q.type === 'true-false-not-given' || q.type === 'yes-no-not-given') && (
                      <div className="flex flex-wrap gap-2">
                        {q.options?.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => onAnswerChange(q.id, opt)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                              userAns === opt
                                ? 'bg-[#173F7A] text-white shadow'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                            }`}
                          >
                            <span>{opt}</span>
                            {userAns === opt && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Multiple Choice Single */}
                    {q.type === 'multiple-choice-single' && (
                      <div className="space-y-2">
                        {q.options?.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => onAnswerChange(q.id, opt)}
                            className={`w-full text-left p-3 rounded-xl text-xs font-medium transition flex items-center gap-3 border ${
                              userAns === opt
                                ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-semibold'
                                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              userAns === opt ? 'border-blue-600 bg-blue-600' : 'border-slate-400'
                            }`}>
                              {userAns === opt && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                            </span>
                            <span>{opt}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Matching Headings */}
                    {q.type === 'matching-headings' && (
                      <div className="space-y-2">
                        <select
                          value={userAns}
                          onChange={(e) => onAnswerChange(q.id, e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">-- Select Heading for {q.question} --</option>
                          {q.options?.map((head, i) => (
                            <option key={i} value={head}>{head}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Sentence & Summary Completion */}
                    {(q.type === 'sentence-completion' || q.type === 'summary-completion' || q.type === 'short-answer') && (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={userAns}
                          onChange={(e) => onAnswerChange(q.id, e.target.value)}
                          placeholder="Type your answer here..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Rule: Check word limit from instructions</span>
                          <span className="font-mono">
                            Words: {userAns.trim().split(/\s+/).filter(Boolean).length}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Previous / Next Navigator */}
          <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={goToPrev}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 hover:bg-slate-100 disabled:opacity-40 transition flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Question
            </button>
            <span className="text-xs text-slate-500 font-mono">
              Question {currentQuestion.number} of {data.questions.length}
            </span>
            <button
              onClick={goToNext}
              disabled={currentQuestionIndex === data.questions.length - 1}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#173F7A] text-white hover:bg-blue-900 disabled:opacity-40 transition flex items-center gap-1.5"
            >
              Next Question <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom IELTS 1-40 Question Palette */}
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-2.5 select-none overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {data.questions.map((q) => {
              const isAnswered = Boolean(answers[q.id]);
              const isFlagged = flaggedQuestions.includes(q.number);
              const isActive = activeQuestionId === q.id;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setActiveQuestionId(q.id);
                    if (q.passageIndex !== activePassageIndex) {
                      setActivePassageIndex(q.passageIndex);
                    }
                    const elem = document.getElementById(`question-box-${q.number}`);
                    if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`w-7 h-7 shrink-0 rounded-lg text-xs font-bold font-mono transition relative flex items-center justify-center ${
                    isActive
                      ? 'ring-2 ring-blue-600 scale-105'
                      : ''
                  } ${
                    isAnswered
                      ? 'bg-[#173F7A] text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                  title={`Question ${q.number}: ${isAnswered ? 'Answered' : 'Unanswered'}`}
                >
                  <span>{q.number}</span>
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Palette Legend */}
          <div className="hidden lg:flex items-center gap-3 text-[11px] text-slate-500 font-semibold shrink-0">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-[#173F7A]"></span> Answered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-slate-200 border"></span> Unanswered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Flagged
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

