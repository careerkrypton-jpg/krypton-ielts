import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Square, 
  Play, 
  RotateCcw, 
  Volume2, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  AlertCircle,
  HelpCircle,
  Layers
} from 'lucide-react';
import { SpeakingMockData, AIEvaluationResult } from '../../types/ielts';
import { evaluateSpeakingWithAI } from '../../services/aiEvaluator';
import { IELTSAudioNarrator, playExamChime } from '../../services/audioSynthesizer';

interface SpeakingExamProps {
  data: SpeakingMockData;
  onSubmitForEvaluation: (result: AIEvaluationResult) => void;
}

export const SpeakingExam: React.FC<SpeakingExamProps> = ({
  data,
  onSubmitForEvaluation,
}) => {
  const [activePart, setActivePart] = useState<1 | 2 | 3>(1);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [prepTimeRemaining, setPrepTimeRemaining] = useState(60);
  const [isPrepActive, setIsPrepActive] = useState(false);
  const [speechTimeRemaining, setSpeechTimeRemaining] = useState(120);
  const [scratchNotes, setScratchNotes] = useState('');
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showSampleTranscript, setShowSampleTranscript] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const narratorRef = useRef<IELTSAudioNarrator | null>(null);

  useEffect(() => {
    narratorRef.current = new IELTSAudioNarrator();
    return () => {
      narratorRef.current?.stop();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // 1-minute prep countdown timer
  useEffect(() => {
    if (!isPrepActive) return;
    const timer = setInterval(() => {
      setPrepTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPrepActive(false);
          playExamChime();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPrepActive]);

  // Microphone recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Start live visualizer
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyserRef.current = analyser;
      analyser.fftSize = 64;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const drawVisualizer = () => {
        if (!canvasRef.current || !analyserRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = (canvas.width / bufferLength) * 2;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height;
          ctx.fillStyle = '#E11D48';
          ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
          x += barWidth;
        }

        animationFrameRef.current = requestAnimationFrame(drawVisualizer);
      };

      drawVisualizer();

      // Start speech recognition if supported
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = 'en-US';
          recognition.onresult = (event: any) => {
            let current = '';
            for (let i = 0; i < event.results.length; i++) {
              current += event.results[i][0].transcript + ' ';
            }
            setSpokenTranscript(current);
          };
          recognition.start();
        } catch {
          // ignore
        }
      }
    } catch (err) {
      alert("Microphone permission was not granted or microphone is unavailable. You can type your spoken thoughts directly in the transcript box below.");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    }
  };

  const playExaminerQuestion = (text: string) => {
    narratorRef.current?.playText(text, 0.95);
  };

  const handleEvaluate = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      const evaluation = evaluateSpeakingWithAI(
        { part1Transcript: spokenTranscript, part2Transcript: scratchNotes },
        data
      );
      setIsEvaluating(false);
      onSubmitForEvaluation(evaluation);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-65px)] overflow-y-auto p-6 md:p-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Header Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {[
              { id: 1, label: 'Part 1: Interview', time: '4–5 mins' },
              { id: 2, label: 'Part 2: Cue Card', time: '3–4 mins' },
              { id: 3, label: 'Part 3: Discussion', time: '4–5 mins' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePart(p.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activePart === p.id
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <span>{p.label}</span>
                <span className="text-[10px] opacity-75 hidden md:inline">({p.time})</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowSampleTranscript(!showSampleTranscript)}
            className="text-xs bg-white border border-slate-200 text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-rose-600" />
            <span>{showSampleTranscript ? 'Hide Band 9 Transcript' : 'Sample Band 9 Audio Transcript'}</span>
          </button>
        </div>

        {/* Part 1 Content */}
        {activePart === 1 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  Part 1: General Interview
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  Topic: {data.part1.topic}
                </h2>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Click the audio icon to hear the virtual IELTS examiner speak the question aloud. Respond naturally into your microphone.
            </p>

            <div className="space-y-3">
              {data.part1.questions.map((q, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {q}
                    </p>
                  </div>
                  <button
                    onClick={() => playExaminerQuestion(q)}
                    className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition shrink-0"
                    title="Listen to Examiner"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Part 2 Content (Cue Card) */}
        {activePart === 2 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  Part 2: Long Turn (Cue Card)
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {data.part2.topic}
                </h2>
              </div>

              {/* 1-Minute Prep Countdown Timer */}
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-mono font-bold text-xs flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Prep Timer: {prepTimeRemaining}s</span>
                </div>
                {!isPrepActive ? (
                  <button
                    onClick={() => {
                      setPrepTimeRemaining(60);
                      setIsPrepActive(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition"
                  >
                    Start 1-Min Prep
                  </button>
                ) : (
                  <button
                    onClick={() => setIsPrepActive(false)}
                    className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold transition"
                  >
                    Pause
                  </button>
                )}
              </div>
            </div>

            {/* Official Cue Card Presentation */}
            <div className="bg-amber-50/60 dark:bg-slate-800 p-5 rounded-2xl border-2 border-amber-200 dark:border-amber-800 space-y-3 font-serif">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                {data.part2.cueCard}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-semibold">
                You should say:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-800 dark:text-slate-200">
                {data.part2.bulletPoints.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            {/* Preparation Notepad */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase flex items-center justify-between">
                <span>1-Minute Scratch Notepad (Keywords & Collocations)</span>
                <span className="text-[10px] text-slate-400 font-normal">Candidate Notes</span>
              </label>
              <textarea
                value={scratchNotes}
                onChange={(e) => setScratchNotes(e.target.value)}
                placeholder="Type key vocabulary, connectors, and sequence of events while your 1-minute prep timer runs..."
                className="w-full h-24 p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>
        )}

        {/* Part 3 Content */}
        {activePart === 3 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="border-b pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                Part 3: Two-Way Analytical Discussion
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                Topic: {data.part3.topic}
              </h2>
            </div>

            <div className="space-y-3">
              {data.part3.questions.map((q, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {q}
                    </p>
                  </div>
                  <button
                    onClick={() => playExaminerQuestion(q)}
                    className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition shrink-0"
                    title="Hear Question"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Audio Microphone Recorder Panel */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Mic className="w-4 h-4 text-rose-600" /> Live Audio Recording & Speech Analyzer
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {isRecording ? 'STATUS: RECORDING...' : 'STATUS: READY'}
            </span>
          </div>

          {/* Visualizer Canvas & Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <canvas ref={canvasRef} width="220" height="40" className="w-full sm:w-56 h-10 bg-slate-900 rounded-lg" />

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="w-full sm:w-auto bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow"
                >
                  <Mic className="w-4 h-4" /> Start Recording Speech
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="w-full sm:w-auto bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow animate-pulse"
                >
                  <Square className="w-4 h-4 fill-white" /> Stop Recording
                </button>
              )}

              {recordedAudioUrl && (
                <audio controls src={recordedAudioUrl} className="h-8 max-w-[200px]" />
              )}
            </div>
          </div>

          {/* Speech-to-Text Transcript Output */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
              <span>Speech-to-Text Transcription / Spoken Text:</span>
              <span>Words: {spokenTranscript.trim().split(/\s+/).filter(Boolean).length}</span>
            </div>
            <textarea
              value={spokenTranscript}
              onChange={(e) => setSpokenTranscript(e.target.value)}
              placeholder="Your spoken words will appear here automatically via speech recognition, or you may type your response summary to be evaluated..."
              className="w-full h-24 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Evaluate Action Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleEvaluate}
              disabled={isEvaluating || (!spokenTranscript && !recordedAudioUrl)}
              className="bg-gradient-to-r from-rose-600 to-[#173F7A] hover:from-rose-700 hover:to-blue-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{isEvaluating ? 'Evaluating Spoken Fluency...' : 'Evaluate Speaking with AI'}</span>
            </button>
          </div>
        </div>

        {/* Sample Band 9 Transcript Modal/Drawer */}
        {showSampleTranscript && (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-slate-800 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" /> Band 9.0 Official Examiner Spoken Model
              </span>
              <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                Cambridge English Verified
              </span>
            </div>
            <div className="text-xs text-slate-700 dark:text-slate-200 font-serif leading-relaxed whitespace-pre-line">
              {data.sampleBand9Transcript}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

