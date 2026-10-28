import React, { useState } from 'react';
import { 
  PenTool, 
  BarChart2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  HelpCircle,
  Eye,
  BookOpen
} from 'lucide-react';
import { WritingMockData, AIEvaluationResult } from '../../types/ielts';
import { evaluateWritingWithAI } from '../../services/aiEvaluator';

interface WritingExamProps {
  data: WritingMockData;
  task1Text: string;
  setTask1Text: (text: string) => void;
  task2Text: string;
  setTask2Text: (text: string) => void;
  onSubmitForEvaluation: (result: AIEvaluationResult) => void;
}

export const WritingExam: React.FC<WritingExamProps> = ({
  data,
  task1Text,
  setTask1Text,
  task2Text,
  setTask2Text,
  onSubmitForEvaluation,
}) => {
  const [activeTask, setActiveTask] = useState<'task1' | 'task2'>('task1');
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const t1WordCount = task1Text.trim().split(/\s+/).filter(Boolean).length;
  const t2WordCount = task2Text.trim().split(/\s+/).filter(Boolean).length;

  const handleEvaluate = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      const evaluation = evaluateWritingWithAI(task1Text, task2Text, data);
      setIsEvaluating(false);
      onSubmitForEvaluation(evaluation);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-65px)]">
      {/* Task Selector Tabs & Word Count Indicators */}
      <div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTask('task1')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTask === 'task1'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Task 1 (Report / Letter)</span>
            <span className={`text-[10px] px-2 py-0.2 rounded-full ${
              t1WordCount >= 150 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {t1WordCount} / 150 words
            </span>
          </button>

          <button
            onClick={() => setActiveTask('task2')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTask === 'task2'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Task 2 (Discursive Essay)</span>
            <span className={`text-[10px] px-2 py-0.2 rounded-full ${
              t2WordCount >= 250 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {t2WordCount} / 250 words
            </span>
          </button>
        </div>

        {/* AI Band Evaluator Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowModelAnswer(!showModelAnswer)}
            className="text-xs bg-white border border-slate-200 text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>{showModelAnswer ? 'Hide Band 9 Model' : 'View Band 9 Model'}</span>
          </button>

          <button
            onClick={handleEvaluate}
            disabled={isEvaluating || (t1WordCount === 0 && t2WordCount === 0)}
            className="bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-200 animate-spin" style={{ animationDuration: isEvaluating ? '1s' : '0s' }} />
            <span>{isEvaluating ? 'AI Scoring...' : 'Run Krypton AI Evaluator'}</span>
          </button>
        </div>
      </div>

      {/* Main Split Screen: Prompt on Left, Editor on Right */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Prompt & Visual Chart */}
        <div className="w-full md:w-1/2 h-full overflow-y-auto p-6 md:p-8 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="max-w-2xl mx-auto space-y-6">
            {activeTask === 'task1' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    IELTS Academic Writing Task 1 (20 Minutes)
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Min: 150 words</span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {data.task1.chartTitle || 'Renewable Electricity Generation by Source (2015 vs 2025)'}
                </h2>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200">
                  {data.task1.prompt}
                </p>

                {/* SVG Visual Chart Rendering */}
                <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center justify-between">
                    <span>Figure 1: Generation Volume (TWh)</span>
                    <span className="text-[10px] text-slate-500">Eurostat & IEA Official Data</span>
                  </div>

                  {/* SVG Bar Chart Visualization */}
                  <svg className="w-full h-48" viewBox="0 0 400 160">
                    {/* Grid lines */}
                    <line x1="40" y1="20" x2="380" y2="20" stroke="#E2E8F0" strokeDasharray="3 3" />
                    <line x1="40" y1="60" x2="380" y2="60" stroke="#E2E8F0" strokeDasharray="3 3" />
                    <line x1="40" y1="100" x2="380" y2="100" stroke="#E2E8F0" strokeDasharray="3 3" />
                    <line x1="40" y1="140" x2="380" y2="140" stroke="#94A3B8" />

                    {/* Y-axis labels */}
                    <text x="30" y="24" fontSize="9" textAnchor="end" fill="#64748B">150</text>
                    <text x="30" y="64" fontSize="9" textAnchor="end" fill="#64748B">100</text>
                    <text x="30" y="104" fontSize="9" textAnchor="end" fill="#64748B">50</text>
                    <text x="30" y="144" fontSize="9" textAnchor="end" fill="#64748B">0</text>

                    {/* Bars - Germany */}
                    <rect x="60" y="77" width="16" height="63" fill="#3B82F6" rx="2" />
                    <rect x="78" y="30" width="16" height="110" fill="#1D4ED8" rx="2" />
                    <text x="77" y="154" fontSize="9" textAnchor="middle" fill="#334155" fontWeight="bold">DE</text>

                    {/* Bars - UK */}
                    <rect x="130" y="108" width="16" height="32" fill="#3B82F6" rx="2" />
                    <rect x="148" y="74" width="16" height="66" fill="#1D4ED8" rx="2" />
                    <text x="147" y="154" fontSize="9" textAnchor="middle" fill="#334155" fontWeight="bold">UK</text>

                    {/* Bars - Denmark */}
                    <rect x="200" y="129" width="16" height="11" fill="#3B82F6" rx="2" />
                    <rect x="218" y="121" width="16" height="19" fill="#1D4ED8" rx="2" />
                    <text x="217" y="154" fontSize="9" textAnchor="middle" fill="#334155" fontWeight="bold">DK</text>

                    {/* Bars - Spain */}
                    <rect x="270" y="130" width="16" height="10" fill="#3B82F6" rx="2" />
                    <rect x="288" y="109" width="16" height="31" fill="#1D4ED8" rx="2" />
                    <text x="287" y="154" fontSize="9" textAnchor="middle" fill="#334155" fontWeight="bold">ES</text>

                    {/* Bars - Norway */}
                    <rect x="340" y="32" width="16" height="108" fill="#3B82F6" rx="2" />
                    <rect x="358" y="26" width="16" height="114" fill="#1D4ED8" rx="2" />
                    <text x="357" y="154" fontSize="9" textAnchor="middle" fill="#334155" fontWeight="bold">NO</text>
                  </svg>

                  {/* Legend */}
                  <div className="flex items-center justify-center gap-6 mt-2 text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-blue-500 rounded"></span> 2015 Generation
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-blue-700 rounded"></span> 2025 Generation
                    </span>
                  </div>
                </div>

                {/* Key Points Checklist */}
                <div className="text-xs text-slate-500 space-y-1">
                  <div className="font-bold text-slate-700">Examiner Criteria Reminders:</div>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {data.task1.keyPointsToCover.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                    IELTS Academic Writing Task 2 (40 Minutes)
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Min: 250 words</span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Topic: {data.task2.topic}
                </h2>

                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 whitespace-pre-line font-serif">
                  {data.task2.prompt}
                </div>

                {/* Suggested Essay Architecture */}
                <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-xl border border-blue-100 text-xs text-blue-950 space-y-2">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-blue-700">
                    Recommended 4-Paragraph Structure
                  </span>
                  <ol className="list-decimal pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                    <li><strong>Introduction:</strong> Paraphrase the prompt & state clear thesis position.</li>
                    <li><strong>Body Paragraph 1:</strong> Discuss the initial perspective with concrete evidence.</li>
                    <li><strong>Body Paragraph 2:</strong> Discuss the counter perspective or your favored rationale.</li>
                    <li><strong>Conclusion:</strong> Restate your position without introducing brand new facts.</li>
                  </ol>
                </div>
              </div>
            )}

            {/* Collapsible Model Answer */}
            {showModelAnswer && (
              <div className="mt-6 p-5 rounded-2xl bg-emerald-50 dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" /> Band 9.0 Official Benchmark Model
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                    Cambridge Examiner Verified
                  </span>
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-200 font-serif leading-relaxed whitespace-pre-line">
                  {activeTask === 'task1' ? data.task1.modelAnswerBand9 : data.task2.modelAnswerBand9}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Word Processor Textarea */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-between bg-slate-50 dark:bg-slate-950 p-6 md:p-8">
          <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {activeTask === 'task1' ? 'Task 1 Response Draft' : 'Task 2 Response Draft'}
              </span>
              <div className="flex items-center gap-3 font-mono font-bold">
                <span className={`px-2.5 py-0.5 rounded-full text-xs ${
                  (activeTask === 'task1' ? t1WordCount >= 150 : t2WordCount >= 250)
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  Words: {activeTask === 'task1' ? t1WordCount : t2WordCount}
                </span>
              </div>
            </div>

            {/* Rich Editor Textarea */}
            <textarea
              value={activeTask === 'task1' ? task1Text : task2Text}
              onChange={(e) => {
                if (activeTask === 'task1') setTask1Text(e.target.value);
                else setTask2Text(e.target.value);
              }}
              placeholder={
                activeTask === 'task1'
                  ? 'Summarize the chart data here... Ensure you include an overview, key trend comparisons, and specific figures (min 150 words)...'
                  : 'Compose your discursive essay here... Include an introduction, body paragraphs with topic sentences and supporting examples, and conclusion (min 250 words)...'
              }
              className="flex-1 w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
            />

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
              <span>Auto-saved to browser storage</span>
              <span>
                Paragraphs: {(activeTask === 'task1' ? task1Text : task2Text).split(/\n+/).filter(Boolean).length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

