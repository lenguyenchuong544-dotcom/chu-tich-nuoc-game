// ============================================================================
// HỆ THỐNG ÂM THANH: WEB AUDIO SYNTHESIZER & MP3 PLAYER
// ============================================================================

class SoundManager {
  private audioCtx: AudioContext | null = null;
  private victoryAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;

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

  // Âm thanh khởi đầu game: Nhẹ nhàng, trang trọng, đơn giản (Đã bỏ toàn bộ giọng thuyết minh)
  public playGameStart() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      // Hợp âm vang nhẹ trang nghiêm (C4, G4, C5, E5)
      const chord = [261.63, 392.0, 523.25, 659.25];

      chord.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        const startTime = now + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.9);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.95);
      });
    } catch (e) {}
  }

  // Không phát giọng thuyết minh (Giữ trống hoặc chỉ hỗ trợ nhạc nền nhẹ nếu cần)
  public playBGM() {
    // Đã bỏ hoàn toàn giọng người dẫn truyện khi bắt đầu
  }

  public pauseBGM() {}

  public playVictoryBGM() {
    if (typeof window === 'undefined' || this.isMuted) return;
    try {
      if (!this.victoryAudio) {
        this.victoryAudio = new Audio('/audio/victory.mp3');
        this.victoryAudio.volume = 0.4;
      }
      this.victoryAudio.currentTime = 0;
      this.victoryAudio.play().catch(() => {});
    } catch (e) {}
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.victoryAudio) {
      this.victoryAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Tiếng vuốt thẻ sang trái / phải
  public playCardSwipe() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  // Tiếng chọn quyết định (Gõ búa pháp đình / đóng dấu)
  public playDecisionClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {}
  }

  // Tiếng trả lời đúng câu hỏi lý luận (+10 điểm)
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
        const noteStart = now + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.18, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.25);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.25);
      });
    } catch (e) {}
  }

  // Tiếng trả lời sai (-5 điểm)
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
        const noteStart = now + idx * 0.09;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.15, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.2);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.2);
      });
    } catch (e) {}
  }

  // Tiếng còi báo động khủng hoảng khẩn cấp
  public playCrisis() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(700, now + 0.2);
      osc.frequency.linearRampToValueAtTime(400, now + 0.4);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {}
  }
}

export const sound = new SoundManager();
