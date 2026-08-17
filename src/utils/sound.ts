// Web Audio API Synthesizer for rich interactive sound & Happy Birthday BGM

class SoundEffects {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  public isBgmPlaying: boolean = false;
  private bgmTimer: number | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Short pop click sound
  playPop() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  // Sparkling Chime Sound Effect
  playSparkle() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + idx * 0.06);
      osc.stop(this.ctx.currentTime + idx * 0.06 + 0.35);
    });
  }

  // Candle Blow Effect
  playBlow() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(700, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start();
  }

  // Fanfare Celebration Motif
  playFanfare() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [
      { f: 261.63, d: 0.2, delay: 0 },
      { f: 261.63, d: 0.2, delay: 0.22 },
      { f: 293.66, d: 0.35, delay: 0.45 },
      { f: 261.63, d: 0.35, delay: 0.85 },
      { f: 349.23, d: 0.35, delay: 1.25 },
      { f: 329.63, d: 0.7, delay: 1.65 },
    ];

    notes.forEach((n) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, this.ctx.currentTime + n.delay);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime + n.delay);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + n.delay + n.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + n.delay);
      osc.stop(this.ctx.currentTime + n.delay + n.d);
    });
  }

  // FULL Polyphonic Music Box BGM - Happy Birthday To You
  toggleBgm() {
    this.initCtx();
    if (!this.ctx) return;

    if (this.isBgmPlaying) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
    window.dispatchEvent(new Event('bgmStateChange'));
  }

  startBgm() {
    if (this.isBgmPlaying || !this.ctx) return;
    this.isBgmPlaying = true;
    window.dispatchEvent(new Event('bgmStateChange'));

    // Full Happy Birthday Melody Frequencies & Timings (Music Box Chime Tone)
    // Line 1: Happy Birthday to You (C4 C4 D4 C4 F4 E4)
    // Line 2: Happy Birthday to You (C4 C4 D4 C4 G4 F4)
    // Line 3: Happy Birthday Dear Finda (C4 C4 C5 A4 F4 E4 D4)
    // Line 4: Happy Birthday to You (A#4 A#4 A4 F4 G4 F4)
    const birthdaySong = [
      { f: 261.63, duration: 0.3, rest: 0.38 }, // C4
      { f: 261.63, duration: 0.3, rest: 0.38 }, // C4
      { f: 293.66, duration: 0.5, rest: 0.55 }, // D4
      { f: 261.63, duration: 0.5, rest: 0.55 }, // C4
      { f: 349.23, duration: 0.5, rest: 0.55 }, // F4
      { f: 329.63, duration: 0.9, rest: 1.05 }, // E4

      { f: 261.63, duration: 0.3, rest: 0.38 }, // C4
      { f: 261.63, duration: 0.3, rest: 0.38 }, // C4
      { f: 293.66, duration: 0.5, rest: 0.55 }, // D4
      { f: 261.63, duration: 0.5, rest: 0.55 }, // C4
      { f: 392.00, duration: 0.5, rest: 0.55 }, // G4
      { f: 349.23, duration: 0.9, rest: 1.05 }, // F4

      { f: 261.63, duration: 0.3, rest: 0.38 }, // C4
      { f: 261.63, duration: 0.3, rest: 0.38 }, // C4
      { f: 523.25, duration: 0.5, rest: 0.55 }, // C5
      { f: 440.00, duration: 0.5, rest: 0.55 }, // A4
      { f: 349.23, duration: 0.5, rest: 0.55 }, // F4
      { f: 329.63, duration: 0.5, rest: 0.55 }, // E4
      { f: 293.66, duration: 0.9, rest: 1.05 }, // D4

      { f: 466.16, duration: 0.3, rest: 0.38 }, // A#4
      { f: 466.16, duration: 0.3, rest: 0.38 }, // A#4
      { f: 440.00, duration: 0.5, rest: 0.55 }, // A4
      { f: 349.23, duration: 0.5, rest: 0.55 }, // F4
      { f: 392.00, duration: 0.5, rest: 0.55 }, // G4
      { f: 349.23, duration: 1.2, rest: 1.60 }, // F4
    ];

    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.isBgmPlaying || !this.ctx || this.isMuted) return;

      const currentNote = birthdaySong[noteIndex % birthdaySong.length];

      // Primary Music Box Oscillator
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle'; // Sweet chime tone
      osc.frequency.setValueAtTime(currentNote.f, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + currentNote.duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + currentNote.duration);

      // Soft Harmony Octave Layer
      const oscHarmony = this.ctx.createOscillator();
      const gainHarmony = this.ctx.createGain();

      oscHarmony.type = 'sine';
      oscHarmony.frequency.setValueAtTime(currentNote.f * 2, this.ctx.currentTime);

      gainHarmony.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gainHarmony.gain.exponentialRampToValueAtTime(0.0005, this.ctx.currentTime + currentNote.duration * 0.8);

      oscHarmony.connect(gainHarmony);
      gainHarmony.connect(this.ctx.destination);

      oscHarmony.start();
      oscHarmony.stop(this.ctx.currentTime + currentNote.duration);

      noteIndex++;
      this.bgmTimer = window.setTimeout(playNextNote, currentNote.rest * 1000);
    };

    playNextNote();
  }

  stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimer !== null) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
    window.dispatchEvent(new Event('bgmStateChange'));
  }
}

export const sound = new SoundEffects();
