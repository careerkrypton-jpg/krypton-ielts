import React, { useState } from 'react';
import { X, Calculator, HelpCircle, CheckCircle2 } from 'lucide-react';
import { calculateReadingBand, calculateListeningBand, calculateOverallBand, getCEFRLevel } from '../services/scoringEngine';

interface BandCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BandCalculatorModal: React.FC<BandCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [readingRaw, setReadingRaw] = useState(33);
  const [listeningRaw, setListeningRaw] = useState(32);
  const [writingBand, setWritingBand] = useState(6.5);
  const [speakingBand, setSpeakingBand] = useState(7.0);
  const [format, setFormat] = useState<'Academic' | 'General Training'>('Academic');

  if (!isOpen) return null;

  const rBand = calculateReadingBand(readingRaw, format);
  const lBand = calculateListeningBand(listeningRaw);
  const overallBand = calculateOverallBand([rBand, lBand, writingBand, speakingBand]);
  const cefr = getCEFRLevel(overallBand);

  const rawAverage = ((rBand + lBand + writingBand + speakingBand) / 4).toFixed(3);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 border border-slate-200">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#173F7A] flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">
                Official IELTS Band Calculator
              </h3>
              <p className="text-xs text-slate-500">
                Calculated using British Council & IDP official rounding rules.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setFormat('Academic')}
            className={`flex-1 py-1.5 rounded-lg transition ${
              format === 'Academic' ? 'bg-[#173F7A] text-white shadow' : 'text-slate-600'
            }`}
          >
            Academic Module
          </button>
          <button
            onClick={() => setFormat('General Training')}
            className={`flex-1 py-1.5 rounded-lg transition ${
              format === 'General Training' ? 'bg-[#173F7A] text-white shadow' : 'text-slate-600'
            }`}
          >
            General Training
          </button>
        </div>

        {/* Sliders for the 4 modules */}
        <div className="space-y-4">
          {/* Reading */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Reading: {readingRaw} / 40 correct</span>
              <span className="text-emerald-700 font-bold font-mono">Band {rBand.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={readingRaw}
              onChange={(e) => setReadingRaw(parseInt(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Listening */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Listening: {listeningRaw} / 40 correct</span>
              <span className="text-indigo-700 font-bold font-mono">Band {lBand.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={listeningRaw}
              onChange={(e) => setListeningRaw(parseInt(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* Writing */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Writing Band (Evaluated by AI)</span>
              <span className="text-amber-700 font-bold font-mono">Band {writingBand.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="9.0"
              step="0.5"
              value={writingBand}
              onChange={(e) => setWritingBand(parseFloat(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Speaking */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Speaking Band (Evaluated by AI)</span>
              <span className="text-rose-700 font-bold font-mono">Band {speakingBand.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="9.0"
              step="0.5"
              value={speakingBand}
              onChange={(e) => setSpeakingBand(parseFloat(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Calculated Result Display */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200 text-center space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Overall Predicted IELTS Band Score
          </span>
          <div className="text-5xl font-black text-[#173F7A] font-mono">
            {overallBand.toFixed(1)}
          </div>
          <div className="text-xs text-slate-600 font-medium">
            Raw Average: <strong className="font-mono">{rawAverage}</strong> • CEFR Level: <strong className="text-emerald-700">{cefr}</strong>
          </div>
          <div className="text-[11px] text-slate-500 bg-white/70 p-2 rounded-lg mt-2 border border-blue-100">
            *IELTS Rounding Rule: If raw average ends in .25, it rounds UP to .5. If it ends in .75, it rounds UP to the next integer band.
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#173F7A] hover:bg-blue-900 text-white font-bold text-xs py-3 rounded-xl transition"
        >
          Close Calculator
        </button>
      </div>
    </div>
  );
};

