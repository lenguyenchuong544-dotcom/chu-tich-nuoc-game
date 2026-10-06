// ============================================================================
// HỆ THỐNG ÂM THANH: WEB AUDIO SYNTHESIZER (PASTEL HARMONIC TIMBRES)
// ============================================================================

class SoundManager {
  private audioCtx: AudioContext | null = null;
  private victoryAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private bgmStarted: boolean = false;
  private volume: number = 0.5;

  constructor() {
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('president_sound_muted');
      if (savedMute !== null) {
        this.isMuted = savedMute === 'true';
      }
    }
  }

  private initContext() {
    if (typeof window === 'undefined') return;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Âm thanh khởi đầu game: Hợp âm ngũ cung trong trẻo, vui tươi, trang trọng (C5, E5, G5, A5, C6)
  public playGameStart() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      if (!this.bgmAudio) {
        this.bgmAudio = new Audio('/audio/bgm.mp3');
        this.bgmAudio.loop = true;
        this.bgmAudio.volume = 0.22 * this.volume;
      }
      this.bgmAudio.play().then(() => {
        this.bgmStarted = true;
      }).catch(() => {
        // Autoplay may be restricted until first user interaction
      });
    } catch (e) {}
  }

  public playBGM() {}

  public pauseBGM() {}

  public playVictoryBGM() {
    if (typeof window === 'undefined' || this.isMuted) return;
    try {
      if (!this.victoryAudio) {
        this.victoryAudio = new Audio('/audio/victory.mp3');
        this.victoryAudio.volume = 0.4 * this.volume;
      }
      this.victoryAudio.volume = 0.35 * this.volume;
      this.victoryAudio.currentTime = 0;
      this.victoryAudio.play().catch(() => {});
    } catch (e) {}
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('president_sound_muted', String(this.isMuted));
    }
    if (this.bgmAudio) {
      this.bgmAudio.muted = this.isMuted;
    }
    if (this.victoryAudio) {
      this.victoryAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.bgmAudio) {
      this.bgmAudio.volume = 0.22 * this.volume;
    }
    if (this.victoryAudio) {
      this.victoryAudio.volume = 0.4 * this.volume;
    }
  }

  // Soft Paper Swipe (Round Sine wave, soft attack, 80ms tail)
  public playCardSwipe() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);

      gain.gain.setValueAtTime(0.12 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  // Tactile Rubber Stamp Press (Warm round pop, 90ms)
  public playDecisionClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.09);

      gain.gain.setValueAtTime(0.2 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  // Major Pentatonic Chime (C5, E5, G5, A5, C6) - Bright & Round
  public playCorrect() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 880.0, 1046.5];
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        const noteStart = now + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.12 * this.volume, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.22);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.22);
      });
    } catch (e) {}
  }

  // Soft Descending Tone (F4, D4, C4)
  public playIncorrect() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const notes = [349.23, 293.66, 261.63];
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        const noteStart = now + idx * 0.07;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.1 * this.volume, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.18);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.18);
      });
    } catch (e) {}
  }

  // Gentle Warm Coral Alert (Two-tone friendly attention chime, not a harsh siren)
  public playCrisis() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const notes = [440, 370, 440]; // A4, F#4, A4

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        const noteStart = now + idx * 0.12;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.15 * this.volume, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.28);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.28);
      });
    } catch (e) {}
  }
}

export const sound = new SoundManager();
