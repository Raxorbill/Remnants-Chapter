// Procedural Web Audio API sound generator (Zero external MP3 dependencies)
// Strictly opt-in. Autoplay is forbidden. Captions provided.

class AudioManager {
  private ctx: AudioContext | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private rumbleOsc: OscillatorNode | null = null;
  private rumbleGain: GainNode | null = null;
  public isSoundEnabled: boolean = false;
  public onCaptionChange: ((caption: string | null) => void) | null = null;
  private captionTimeout: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.isSoundEnabled = enabled;
    if (!enabled) {
      this.stopAmbient();
      this.stopRumble();
      this.showCaption(null);
    }
  }

  private showCaption(text: string | null, durationMs = 2500) {
    if (this.captionTimeout) {
      window.clearTimeout(this.captionTimeout);
      this.captionTimeout = null;
    }
    if (this.onCaptionChange) {
      this.onCaptionChange(text);
    }
    if (text && durationMs > 0) {
      this.captionTimeout = window.setTimeout(() => {
        if (this.onCaptionChange) this.onCaptionChange(null);
      }, durationMs);
    }
  }

  public playLaserPing() {
    if (!this.isSoundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.22);
      this.showCaption("[laser pulse emitted]");
    } catch {
      // Audio context error fallback
    }
  }

  public playLaserEcho() {
    if (!this.isSoundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1760, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.45);
      this.showCaption("[laser echo received at Earth station]");
    } catch {
      // Audio fallback
    }
  }

  public playRumble(active: boolean) {
    if (!this.isSoundEnabled && active) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (active) {
        if (!this.rumbleOsc) {
          this.rumbleOsc = this.ctx.createOscillator();
          this.rumbleGain = this.ctx.createGain();
          this.rumbleOsc.type = 'sine';
          this.rumbleOsc.frequency.setValueAtTime(42, this.ctx.currentTime);
          this.rumbleGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
          this.rumbleGain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.3);
          this.rumbleOsc.connect(this.rumbleGain);
          this.rumbleGain.connect(this.ctx.destination);
          this.rumbleOsc.start();
          this.showCaption("[low rumble - lunar ground vibration detected]", 4000);
        }
      } else {
        this.stopRumble();
      }
    } catch {
      // audio fallback
    }
  }

  public stopRumble() {
    if (this.rumbleOsc && this.rumbleGain && this.ctx) {
      try {
        this.rumbleGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
        const osc = this.rumbleOsc;
        setTimeout(() => {
          try { osc.stop(); osc.disconnect(); } catch {}
        }, 350);
      } catch {}
      this.rumbleOsc = null;
      this.rumbleGain = null;
    }
  }

  public toggleAmbient(active: boolean) {
    if (!this.isSoundEnabled && active) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (active) {
        if (!this.ambientOsc) {
          this.ambientOsc = this.ctx.createOscillator();
          this.ambientGain = this.ctx.createGain();
          this.ambientOsc.type = 'sine';
          this.ambientOsc.frequency.setValueAtTime(55, this.ctx.currentTime);
          this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
          this.ambientGain.gain.linearRampToValueAtTime(0.025, this.ctx.currentTime + 1.5);
          this.ambientOsc.connect(this.ambientGain);
          this.ambientGain.connect(this.ctx.destination);
          this.ambientOsc.start();
          this.showCaption("[deep space ambient tone]");
        }
      } else {
        this.stopAmbient();
      }
    } catch {}
  }

  public stopAmbient() {
    if (this.ambientOsc && this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
        const osc = this.ambientOsc;
        setTimeout(() => {
          try { osc.stop(); osc.disconnect(); } catch {}
        }, 850);
      } catch {}
      this.ambientOsc = null;
      this.ambientGain = null;
    }
  }
}

export const audioService = new AudioManager();
