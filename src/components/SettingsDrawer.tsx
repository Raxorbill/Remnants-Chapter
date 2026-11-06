import React from 'react';
import { X, Volume2, VolumeX, Navigation } from 'lucide-react';
import { chaptersData } from '../data/chapters';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  textSize: 'normal' | 'large' | 'xlarge';
  onTextSizeChange: (size: 'normal' | 'large' | 'xlarge') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onSelectChapter: (index: number) => void;
  currentChapterIndex: number;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  reducedMotion,
  onToggleReducedMotion,
  highContrast,
  onToggleHighContrast,
  textSize,
  onTextSizeChange,
  soundEnabled,
  onToggleSound,
  onSelectChapter,
  currentChapterIndex
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-[#0D1326] border-l border-[#151F3D] w-full max-w-md h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#151F3D] mb-6">
            <h3 id="settings-drawer-title" className="font-head font-bold text-xl text-[#F8FAFC]">
              Menu & Settings
            </h3>
            <button
              onClick={onClose}
              className="text-[#94A3B8] hover:text-[#F8FAFC] p-2 rounded-xl hover:bg-[#151F3D]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Chapter Navigation */}
          <div className="mb-8">
            <h4 className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Navigation className="w-3.5 h-3.5" />
              <span>Chapter Journey</span>
            </h4>
            <div className="space-y-1.5">
              {chaptersData.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    onSelectChapter(idx);
                    onClose();
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-mono flex items-center justify-between transition-colors ${
                    currentChapterIndex === idx
                      ? 'bg-[#151F3D] text-[#00E5FF] font-semibold border border-[#00E5FF]/40 shadow-sm'
                      : 'text-[#94A3B8] hover:bg-[#151F3D]/60 hover:text-[#FFFFFF]'
                  }`}
                >
                  <span className="truncate">
                    0{idx + 1}. {ch.machine}
                  </span>
                  <span className="text-[10px] text-[#38BDF8] shrink-0 ml-2">
                    {ch.distanceLabel.split('~')[0]}
                  </span>
                </button>
              ))}
              <button
                onClick={() => {
                  onSelectChapter(6);
                  onClose();
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-mono flex items-center justify-between transition-colors ${
                  currentChapterIndex === 6
                    ? 'bg-[#151F3D] text-[#00E5FF] font-semibold border border-[#00E5FF]/40 shadow-sm'
                    : 'text-[#94A3B8] hover:bg-[#151F3D]/60 hover:text-[#FFFFFF]'
                }`}
              >
                <span>07. Your Question</span>
                <span className="text-[10px] text-[#00E5FF] shrink-0 ml-2">Constellation</span>
              </button>
            </div>
          </div>

          {/* Accessibility Settings */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-wider">
              Accessibility & Display
            </h4>

            {/* Reduced Motion Toggle */}
            <div className="flex items-center justify-between bg-[#050814] p-3.5 rounded-2xl border border-[#151F3D]">
              <div>
                <div className="text-sm font-medium text-[#FFFFFF]">Reduced Motion</div>
                <div className="text-xs text-[#94A3B8]">Replaces 3D sweeps with instant crossfades</div>
              </div>
              <button
                onClick={onToggleReducedMotion}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  reducedMotion ? 'bg-[#00E5FF]' : 'bg-[#151F3D]'
                }`}
                aria-pressed={reducedMotion}
                aria-label="Toggle reduced motion"
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    reducedMotion ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* High Contrast Mode */}
            <div className="flex items-center justify-between bg-[#050814] p-3.5 rounded-2xl border border-[#151F3D]">
              <div>
                <div className="text-sm font-medium text-[#FFFFFF]">High Contrast</div>
                <div className="text-xs text-[#94A3B8]">Boosts text & border contrast ratios</div>
              </div>
              <button
                onClick={onToggleHighContrast}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  highContrast ? 'bg-[#00E5FF]' : 'bg-[#151F3D]'
                }`}
                aria-pressed={highContrast}
                aria-label="Toggle high contrast"
              >
                <div
                  className={`bg-[#050814] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    highContrast ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Text Size */}
            <div className="bg-[#050814] p-3.5 rounded-2xl border border-[#151F3D] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#F8FAFC]">Text Size</span>
                <span className="text-xs font-mono text-[#94A3B8] capitalize">{textSize}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onTextSizeChange('normal')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-mono border transition-colors ${
                    textSize === 'normal'
                      ? 'bg-[#00E5FF] text-[#030712] font-bold border-[#00E5FF]'
                      : 'border-[#151F3D] text-[#94A3B8] hover:text-[#FFFFFF]'
                  }`}
                >
                  A (Normal)
                </button>
                <button
                  onClick={() => onTextSizeChange('large')}
                  className={`flex-1 py-1.5 rounded-xl text-sm font-mono border transition-colors ${
                    textSize === 'large'
                      ? 'bg-[#00E5FF] text-[#030712] font-bold border-[#00E5FF]'
                      : 'border-[#151F3D] text-[#94A3B8] hover:text-[#FFFFFF]'
                  }`}
                >
                  A+ (Large)
                </button>
                <button
                  onClick={() => onTextSizeChange('xlarge')}
                  className={`flex-1 py-1.5 rounded-xl text-base font-mono border transition-colors ${
                    textSize === 'xlarge'
                      ? 'bg-[#00E5FF] text-[#030712] font-bold border-[#00E5FF]'
                      : 'border-[#151F3D] text-[#94A3B8] hover:text-[#FFFFFF]'
                  }`}
                >
                  A++
                </button>
              </div>
            </div>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between bg-[#050814] p-3.5 rounded-2xl border border-[#151F3D]">
              <div>
                <div className="text-sm font-medium text-[#FFFFFF]">Audio & Rumble</div>
                <div className="text-xs text-[#94A3B8]">Opt-in sound effects with subtitles</div>
              </div>
              <button
                onClick={onToggleSound}
                className={`p-2.5 rounded-xl transition-colors border ${
                  soundEnabled
                    ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF]'
                    : 'bg-[#151F3D] border-transparent text-[#94A3B8]'
                }`}
                aria-pressed={soundEnabled}
                aria-label="Toggle sound effects"
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#151F3D] mt-6 text-center text-xs text-[#64748B] font-mono">
          NASA Space Apps Challenge 2026 · Mission Remnants
        </div>
      </div>
    </div>
  );
};
