import React from 'react';
import { ArrowDown, Compass } from 'lucide-react';

interface LandingPrologueProps {
  onBegin: () => void;
}

export const LandingPrologue: React.FC<LandingPrologueProps> = ({ onBegin }) => {
  return (
    <section
      id="landing"
      className="relative min-h-[85vh] flex flex-col justify-between items-center text-center px-4 sm:px-6 py-8 max-w-5xl mx-auto select-none"
    >
      <div className="w-full flex justify-between items-center text-xs font-mono text-[#94A3B8] pt-2 border-b border-[#1E293B] pb-3">
        <span className="text-[#00E5FF] font-semibold tracking-wider">
          MISSION REMNANTS
        </span>
        <span className="tracking-widest">BUILT FOR A QUESTION</span>
      </div>

      {/* Main Hero Statement */}
      <div className="my-auto space-y-6 max-w-3xl py-12">
        <div className="text-xs font-mono text-[#00E5FF] tracking-[0.25em] uppercase">
          The missions ended · Their stories remain
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-head text-[#FFFFFF] tracking-tight leading-[1.08] text-balance">
          Nothing out there was <span className="text-[#00E5FF]">abandoned.</span>
        </h1>

        <p className="text-lg sm:text-xl text-[#94A3B8] font-body leading-relaxed max-w-2xl mx-auto">
          Every machine NASA left on the Moon, on Mars, and in deep space was built to answer one question. Follow the questions.
        </p>

        <div className="pt-6 flex flex-col items-center justify-center gap-4">
          <button
            onClick={onBegin}
            className="px-9 py-4 rounded-2xl font-head font-bold text-base sm:text-lg bg-[#FFFFFF] hover:bg-[#F1F5F9] text-[#030712] transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-cyan-500/20 flex items-center gap-3"
          >
            <span>Begin the Journey</span>
            <ArrowDown className="w-4 h-4 text-[#030712]" />
          </button>

          <span className="text-[11px] font-mono text-[#64748B]">
            A student project for the NASA Space Apps Challenge. Not an official NASA website.
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex flex-col items-center gap-2 text-xs font-mono text-[#94A3B8]/80 pb-2 animate-bounce">
        <span>Scroll or tap to leave Earth</span>
        <ArrowDown className="w-3.5 h-3.5 text-[#38BDF8]" />
      </div>
    </section>
  );
};
