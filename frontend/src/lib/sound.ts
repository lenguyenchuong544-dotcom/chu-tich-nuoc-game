// ============================================================================
// HỆ THỐNG ÂM THANH: PASTEL SITUATION ROOM WEB AUDIO SYNTHESIZER
// Brighter, rounder timbres (sine & triangle, major-pentatonic phrases),
// soft attack, short tails, gentle alert chimes, persistent mute & volume memory.
// ============================================================================

class SoundManager {
  private audioCtx: AudioContext | null = null;
  private victoryAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.5;

  constructor() {
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('president_sound_muted');
      if (savedMute !== null) {
        this.isMuted = savedMute === 'true';
      }
      const savedVol = localStorage.getItem('president_sound_volume');
      if (savedVol !== null) {
        this.volume = parseFloat(savedVol) || 0.5;
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
      const now = this.audioCtx.currentTime;
      const notes = [523.25, 659.25, 783.99, 880.0, 1046.5]; // Pentatonic C Major

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        const startTime = now + idx * 0.05;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.14 * this.volume, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.65);
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('president_sound_volume', String(this.volume));
    }
    if (this.victoryAudio) {
      this.victoryAudio.volume = 0.35 * this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  // Tiếng vuốt giấy nhẹ nhàng (Airy stationery paper swish)
  public playCardSwipe() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.1);

      gain.gain.setValueAtTime(0.12 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  // Tiếng đóng dấu quyết định (Tactile rubber stamp imprint landing)
  public playDecisionClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      // Resonant lower thud (Stamp impact)
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(220, now);
      osc1.frequency.exponentialRampToValueAtTime(60, now + 0.12);

      gain1.gain.setValueAtTime(0.22 * this.volume, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);

      // Crisper tactile papery snap
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(800, now);
      osc2.frequency.exponentialRampToValueAtTime(320, now + 0.06);

      gain2.gain.setValueAtTime(0.15 * this.volume, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);
      osc2.start(now);
      osc2.stop(now + 0.06);
    } catch (e) {}
  }

  // Tiếng trả lời đúng câu hỏi lý luận (Sparkling upward chime: C5 -> G5 -> C6)
  public playCorrect() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        const noteStart = now + idx * 0.07;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.15 * this.volume, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.22);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.22);
      });
    } catch (e) {}
  }

  // Tiếng trả lời chưa chính xác (Soft warm coral descending phrase)
  public playIncorrect() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const notes = [440, 392, 349.23]; // A4, G4, F4
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        const noteStart = now + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.12 * this.volume, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.18);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.18);
      });
    } catch (e) {}
  }

  // Tiếng cảnh báo khủng hoảng (Gentle double bell alert, not a siren)
  public playCrisis() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const bells = [659.25, 523.25]; // E5, C5

      bells.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        const startTime = now + idx * 0.14;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.18 * this.volume, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.38);
      });
    } catch (e) {}
  }
}

export const sound = new SoundManager();
