import React, { useEffect, useState } from 'react';
import { audioService } from '../utils/audio';
import { Volume2 } from 'lucide-react';

export const AudioCaptionBanner: React.FC = () => {
  const [caption, setCaption] = useState<string | null>(null);

  useEffect(() => {
    audioService.onCaptionChange = (text) => {
      setCaption(text);
    };
    return () => {
      audioService.onCaptionChange = null;
    };
  }, []);

  if (!caption) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <div className="bg-[#090E1F]/95 border border-[#38BDF8] text-[#38BDF8] px-4 py-2 rounded-full font-mono text-xs flex items-center gap-2.5 shadow-2xl backdrop-blur-md">
        <Volume2 className="w-3.5 h-3.5" />
        <span>{caption}</span>
      </div>
    </div>
  );
};
