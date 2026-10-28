/**
 * Audio Synthesizer & Speech Service for IELTS Listening & Speaking
 * Uses Web Audio API for authentic exam chimes and Web Speech API for natural accent narration.
 */

// Play authentic IELTS exam chime using pure Web Audio oscillator
export function playExamChime(): Promise<void> {
  return new Promise((resolve) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) {
        resolve();
        return;
      }
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.85);

      setTimeout(() => {
        resolve();
      }, 850);
    } catch {
      resolve();
    }
  });
}

export interface SpeechPlaybackState {
  isPlaying: boolean;
  isPaused: boolean;
  progress: number;
  currentParagraph: number;
}

export class IELTSAudioNarrator {
  private utterance: SpeechSynthesisUtterance | null = null;
  private voice: SpeechSynthesisVoice | null = null;
  private onStatusChange?: (state: SpeechPlaybackState) => void;
  private isPaused: boolean = false;

  constructor(onStatusChange?: (state: SpeechPlaybackState) => void) {
    this.onStatusChange = onStatusChange;
    this.initVoice();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.initVoice();
      };
    }
  }

  private initVoice() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    // Prioritize natural English accents (British, Australian, American)
    const britishVoice = voices.find(v => v.lang.includes('en-GB') || v.name.toLowerCase().includes('british') || v.name.toLowerCase().includes('uk'));
    const aussieVoice = voices.find(v => v.lang.includes('en-AU'));
    const usVoice = voices.find(v => v.lang.includes('en-US'));
    const anyEn = voices.find(v => v.lang.startsWith('en'));

    this.voice = britishVoice || aussieVoice || usVoice || anyEn || null;
  }

  public async playText(text: string, rate: number = 0.95): Promise<void> {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    await playExamChime();

    return new Promise((resolve) => {
      this.utterance = new SpeechSynthesisUtterance(text);
      if (this.voice) {
        this.utterance.voice = this.voice;
      }
      this.utterance.rate = rate; // slightly measured for clear exam audio
      this.utterance.pitch = 1.0;

      this.utterance.onstart = () => {
        this.isPaused = false;
        this.onStatusChange?.({ isPlaying: true, isPaused: false, progress: 0, currentParagraph: 0 });
      };

      this.utterance.onend = () => {
        this.isPaused = false;
        this.onStatusChange?.({ isPlaying: false, isPaused: false, progress: 100, currentParagraph: 0 });
        resolve();
      };

      this.utterance.onerror = () => {
        this.isPaused = false;
        this.onStatusChange?.({ isPlaying: false, isPaused: false, progress: 0, currentParagraph: 0 });
        resolve();
      };

      window.speechSynthesis.speak(this.utterance);
    });
  }

  public pause() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      this.isPaused = true;
      this.onStatusChange?.({ isPlaying: false, isPaused: true, progress: 50, currentParagraph: 0 });
    }
  }

  public resume() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
      this.isPaused = false;
      this.onStatusChange?.({ isPlaying: true, isPaused: false, progress: 50, currentParagraph: 0 });
    }
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isPaused = false;
      this.onStatusChange?.({ isPlaying: false, isPaused: false, progress: 0, currentParagraph: 0 });
    }
  }
}

