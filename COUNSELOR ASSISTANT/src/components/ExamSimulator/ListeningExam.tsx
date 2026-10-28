import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  RotateCcw, 
  Headphones, 
  Flag, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  FileText,
  Sparkles
} from 'lucide-react';
import { ListeningMockData, ListeningQuestion } from '../../types/ielts';
import { IELTSAudioNarrator, SpeechPlaybackState } from '../../services/audioSynthesizer';

interface ListeningExamProps {
  data: ListeningMockData;
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, answer: string) => void;
  flaggedQuestions: number[];
  onToggleFlag: (questionNumber: number) => void;
  fontSize: 'standard' | 'large' | 'xlarge';
  contrastMode: 'normal' | 'dark' | 'yellow-blue';
}

export const ListeningExam: React.FC<ListeningExamProps> = ({
  data,
  answers,
  onAnswerChange,
  flaggedQuestions,
  onToggleFlag,
  fontSize,
  contrastMode,
}) => {
  const [activeSectionNum, setActiveSectionNum] = useState<1 | 2 | 3 | 4>(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.95);
  const [activeQuestionId, setActiveQuestionId] = useState<string>('l_q1');

  const narratorRef = useRef<IELTSAudioNarrator | null>(null);

  useEffect(() => {
    narratorRef.current = new IELTSAudioNarrator((state: SpeechPlaybackState) => {
      setIsPlaying(state.isPlaying);
      setIsPaused(state.isPaused);
    });

    return () => {
      narratorRef.current?.stop();
    };
  }, []);

  const activeSection = data.sections.find(s => s.sectionNumber === activeSectionNum) || data.sections[0];
  const allQuestions = data.sections.flatMap(s => s.questions);
  const sectionQuestions = activeSection.questions;

  const currentQIndex = allQuestions.findIndex(q => q.id === activeQuestionId);
  const currentQ = allQuestions[currentQIndex] || allQuestions[0];

  const handlePlayAudio = () => {
    if (isPaused) {
      narratorRef.current?.resume();
    } else {
      narratorRef.current?.playText(activeSection.audioTranscript, playbackSpeed);
    }
  };

  const handlePauseAudio = () => {
    narratorRef.current?.pause();
  };

  const handleStopAudio = () => {
    narratorRef.current?.stop();
  };

  const goToNext = () => {
    if (currentQIndex < allQuestions.length - 1) {
      const nextQ = allQuestions[currentQIndex + 1];
      setActiveQuestionId(nextQ.id);
      if (nextQ.sectionNumber !== activeSectionNum) {
        setActiveSectionNum(nextQ.sectionNumber);
      }
    }
  };

  const goToPrev = () => {
    if (currentQIndex > 0) {
      const prevQ = allQuestions[currentQIndex - 1];
      setActiveQuestionId(prevQ.id);
      if (prevQ.sectionNumber !== activeSectionNum) {
        setActiveSectionNum(prevQ.sectionNumber);
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-65px)]">
      {/* Top Audio Player Bar (Authentic CD-IELTS listening controls) */}
      <div className="bg-[#173F7A] text-white px-4 py-3 border-b border-blue-900 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Audio Controls */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5 text-indigo-300" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-amber-300">
                  Section {activeSectionNum} Audio Stream
                </span>
                <span className="text-[10px] bg-white/20 px-2 py-0.2 rounded font-semibold">
                  Native British / Aussie Accent
                </span>
              </div>
              <p className="text-xs text-blue-100 line-clamp-1 mt-0.5">
                {activeSection.title}
              </p>
            </div>

            {/* Play / Pause Button */}
            <div className="ml-2 flex items-center gap-2">
              {!isPlaying ? (
                <button
                  onClick={handlePlayAudio}
                  className="bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{isPaused ? 'Resume' : 'Play Audio'}</span>
                </button>
              ) : (
                <button
                  onClick={handlePauseAudio}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow"
                >
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause</span>
                </button>
              )}

              <button
                onClick={handleStopAudio}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition"
                title="Stop Audio"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sound Visualizer & Options */}
          <div className="flex items-center gap-4">
            {/* Animated Equalizer Waveform */}
            <div className="flex items-end gap-1 h-6">
              {[12, 18, 24, 14, 20, 16, 22, 10].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all ${
                    isPlaying
                      ? 'bg-amber-400 animate-pulse'
                      : 'bg-white/30'
                  }`}
                  style={{ height: isPlaying ? `${Math.max(6, (h * (i % 2 === 0 ? 1.2 : 0.8)))}px` : '4px' }}
                />
              ))}
            </div>

            {/* Speed Control */}
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
              className="bg-white/10 text-white text-xs px-2 py-1.5 rounded-lg border border-white/20 focus:outline-none"
            >
              <option value="0.85" className="text-slate-800">0.85x Speed</option>
              <option value="0.95" className="text-slate-800">1.0x Normal</option>
              <option value="1.1" className="text-slate-800">1.1x Fast</option>
            </select>

            {/* Practice Transcript Toggle */}
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="text-xs bg-white/10 hover:bg-white/20 text-blue-200 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/15 transition flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showTranscript ? 'Hide Transcript' : 'Script (Practice)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section Selector Tabs */}
      <div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-2 flex items-center gap-2 overflow-x-auto">
        {data.sections.map((sec) => {
          const isActive = activeSectionNum === sec.sectionNumber;
          const answeredInSec = sec.questions.filter(q => answers[q.id]).length;

          return (
            <button
              key={sec.sectionNumber}
              onClick={() => {
                narratorRef.current?.stop();
                setActiveSectionNum(sec.sectionNumber);
                if (sec.questions[0]) setActiveQuestionId(sec.questions[0].id);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                isActive
                  ? 'bg-[#173F7A] text-white shadow-sm'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <span>Section {sec.sectionNumber}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {answeredInSec}/{sec.questions.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Section Context Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#173F7A] bg-blue-50 px-2 py-0.5 rounded">
              Context & Instructions
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              {activeSection.title}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {activeSection.context}
            </p>

            {/* Collapsible Transcript (For self-study/practice) */}
            {showTranscript && (
              <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-serif leading-relaxed whitespace-pre-line">
                <div className="font-bold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> Official Audio Transcript
                </div>
                {activeSection.audioTranscript}
              </div>
            )}
          </div>

          {/* Section Questions */}
          <div className="space-y-5">
            {sectionQuestions.map((q) => {
              const isSelected = activeQuestionId === q.id;
              const userAns = answers[q.id] || '';

              return (
                <div
                  key={q.id}
                  id={`listening-q-${q.number}`}
                  onClick={() => setActiveQuestionId(q.id)}
                  className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border transition-all ${
                    isSelected
                      ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-md'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-lg bg-indigo-700 text-white font-mono font-bold text-xs flex items-center justify-center">
                      {q.number}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFlag(q.number);
                      }}
                      className={`text-xs p-1 rounded hover:bg-slate-100 ${
                        flaggedQuestions.includes(q.number) ? 'text-amber-500 font-bold' : 'text-slate-400'
                      }`}
                    >
                      <Flag className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-slate-800 p-2.5 rounded-xl mb-3">
                    {q.instruction}
                  </p>

                  <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-4">
                    {q.question}
                  </p>

                  {/* Multiple Choice Single */}
                  {q.type === 'multiple-choice-single' && (
                    <div className="space-y-2">
                      {q.options?.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => onAnswerChange(q.id, opt)}
                          className={`w-full text-left p-3 rounded-xl text-xs font-medium transition flex items-center gap-3 border ${
                            userAns === opt
                              ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-semibold'
                              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            userAns === opt ? 'border-indigo-600 bg-indigo-600' : 'border-slate-400'
                          }`}>
                            {userAns === opt && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                          </span>
                          <span>{opt}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Sentence Completion / Note completion */}
                  {q.type === 'sentence-completion' && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={userAns}
                        onChange={(e) => onAnswerChange(q.id, e.target.value)}
                        placeholder="Type exact words heard in audio..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Previous / Next Navigator */}
          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={goToPrev}
              disabled={currentQIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 hover:bg-slate-100 disabled:opacity-40 transition flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Question
            </button>
            <span className="text-xs text-slate-500 font-mono">
              Question {currentQ.number} of {allQuestions.length}
            </span>
            <button
              onClick={goToNext}
              disabled={currentQIndex === allQuestions.length - 1}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#173F7A] text-white hover:bg-blue-900 disabled:opacity-40 transition flex items-center gap-1.5"
            >
              Next Question <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom 1-40 Question Palette */}
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-2.5 select-none overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {allQuestions.map((q) => {
              const isAnswered = Boolean(answers[q.id]);
              const isFlagged = flaggedQuestions.includes(q.number);
              const isActive = activeQuestionId === q.id;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setActiveQuestionId(q.id);
                    if (q.sectionNumber !== activeSectionNum) {
                      setActiveSectionNum(q.sectionNumber);
                    }
                    const elem = document.getElementById(`listening-q-${q.number}`);
                    if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`w-7 h-7 shrink-0 rounded-lg text-xs font-bold font-mono transition relative flex items-center justify-center ${
                    isActive ? 'ring-2 ring-indigo-600 scale-105' : ''
                  } ${
                    isAnswered
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <span>{q.number}</span>
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white"></span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[11px] text-slate-500 font-semibold shrink-0">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-indigo-600"></span> Answered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-slate-200 border"></span> Unanswered
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

