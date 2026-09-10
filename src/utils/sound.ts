// Web Audio API Synthesizer for rich interactive sound & MP3 BGM (lagu-ultah.mp3)

class SoundEffects {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  public isBgmPlaying: boolean = false;
  private bgmAudio: HTMLAudioElement | null = null;
  private autoPlayInitialized: boolean = false;

  constructor() {
    this.initAudioElement();
  }

  private initAudioElement() {
    if (typeof window !== 'undefined' && !this.bgmAudio) {
      this.bgmAudio = new Audio('/lagu-ultah.mp3');
      this.bgmAudio.loop = true;
      this.bgmAudio.preload = 'auto';

      this.bgmAudio.addEventListener('play', () => {
        this.isBgmPlaying = true;
        window.dispatchEvent(new Event('bgmStateChange'));
      });

      this.bgmAudio.addEventListener('pause', () => {
        this.isBgmPlaying = false;
        window.dispatchEvent(new Event('bgmStateChange'));
      });

      this.bgmAudio.addEventListener('ended', () => {
        this.isBgmPlaying = false;
        window.dispatchEvent(new Event('bgmStateChange'));
      });
    }
  }

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

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
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

  // Toggle BGM playback (lagu-ultah.mp3)
  toggleBgm() {
    if (this.isBgmPlaying) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
  }

  startBgm() {
    if (!this.bgmAudio) {
      this.initAudioElement();
    }
    if (!this.bgmAudio) return;

    if (this.isMuted) {
      this.bgmAudio.muted = true;
    } else {
      this.bgmAudio.muted = false;
    }

    const promise = this.bgmAudio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          this.isBgmPlaying = true;
          window.dispatchEvent(new Event('bgmStateChange'));
        })
        .catch((err) => {
          console.log('Autoplay deferred until user interaction:', err);
          this.isBgmPlaying = false;
          window.dispatchEvent(new Event('bgmStateChange'));
        });
    }
  }

  stopBgm() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
    this.isBgmPlaying = false;
    window.dispatchEvent(new Event('bgmStateChange'));
  }

  setupAutoPlayOnUserGesture() {
    if (this.autoPlayInitialized || typeof window === 'undefined') return;
    this.autoPlayInitialized = true;

    // Immediately attempt playback
    this.startBgm();

    const handleGesture = () => {
      if (!this.isBgmPlaying && !this.isMuted) {
        this.startBgm();
      }
      if (this.isBgmPlaying) {
        window.removeEventListener('click', handleGesture);
        window.removeEventListener('touchstart', handleGesture);
        window.removeEventListener('pointerdown', handleGesture);
        window.removeEventListener('scroll', handleGesture);
        window.removeEventListener('keydown', handleGesture);
      }
    };

    window.addEventListener('click', handleGesture, { passive: true });
    window.addEventListener('touchstart', handleGesture, { passive: true });
    window.addEventListener('pointerdown', handleGesture, { passive: true });
    window.addEventListener('scroll', handleGesture, { passive: true });
    window.addEventListener('keydown', handleGesture, { passive: true });
  }
}

export const sound = new SoundEffects();

