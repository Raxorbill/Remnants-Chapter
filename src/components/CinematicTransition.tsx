import React, { useEffect, useState } from 'react';
import { audioService } from '../utils/audio';

interface CinematicTransitionProps {
  isActive: boolean;
  handOffLine: string;
  nextQuestion: string;
  nextMachine: string;
  onComplete: () => void;
  reducedMotion: boolean;
}

export const CinematicTransition: React.FC<CinematicTransitionProps> = ({
  isActive,
  handOffLine,
  nextQuestion,
  nextMachine,
  onComplete,
  reducedMotion
}) => {
  const [phase, setPhase] = useState<'shutter-in' | 'reveal' | 'shutter-out'>('shutter-in');

  useEffect(() => {
    if (!isActive) return;

    if (reducedMotion) {
      const timer = setTimeout(() => {
        onComplete();
      }, 300);
      return () => clearTimeout(timer);
    }

    audioService.toggleAmbient(true);

    setPhase('shutter-in');
    const t1 = setTimeout(() => setPhase('reveal'), 350);
    const t2 = setTimeout(() => setPhase('shutter-out'), 1300);
    const t3 = setTimeout(() => {
      onComplete();
    }, 1700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isActive, reducedMotion, onComplete]);

  if (!isActive) return null;

  if (reducedMotion) {
    return (
      <div className="fixed inset-0 z-50 bg-[#030712] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
        <p className="text-xs font-mono text-[#00E5FF] mb-2 uppercase tracking-widest">{handOffLine}</p>
        <h2 className="text-2xl sm:text-3xl font-bold font-head text-[#FFFFFF] max-w-2xl">"{nextQuestion}"</h2>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#030712] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-300 ${
        phase === 'shutter-out' ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Subtle deep-space ambient gradient lens */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.06)_0%,transparent_65%)] pointer-events-none" />

      {/* Reticle alignment lines */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-full max-w-2xl border-t border-[#1E293B]/60" />
        <div className="absolute h-full max-h-[300px] border-l border-[#1E293B]/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-3xl px-6 text-center space-y-5">
        <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#00E5FF] tracking-[0.25em] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
          <span>MISSION RELAY</span>
          <span>·</span>
          <span>{nextMachine}</span>
        </div>

        <p className="text-sm font-mono text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
          {handOffLine}
        </p>

        <h2
          className={`text-2xl sm:text-4xl lg:text-5xl font-bold font-head text-[#FFFFFF] tracking-tight leading-tight text-balance transition-all duration-500 ${
            phase === 'reveal' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-98'
          }`}
        >
          "{nextQuestion}"
        </h2>

        {/* Minimal Progress Line */}
        <div className="w-32 h-[2px] bg-[#1E293B] mx-auto rounded-full overflow-hidden mt-6">
          <div
            className={`h-full bg-[#00E5FF] transition-all duration-1000 ease-out ${
              phase === 'reveal' ? 'w-full' : 'w-0'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
