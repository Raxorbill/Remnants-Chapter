import React from 'react';
import { sourcesList } from '../data/sources';
import { chaptersData } from '../data/chapters';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';

interface SourcesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeChapterId?: string;
}

export const SourcesDrawer: React.FC<SourcesDrawerProps> = ({
  isOpen,
  onClose,
  activeChapterId
}) => {
  if (!isOpen) return null;

  const currentChapter = chaptersData.find((c) => c.id === activeChapterId);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sources-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-[#0D1326] border-l border-[#151F3D] w-full max-w-lg h-full overflow-y-auto p-6 lg:p-8 flex flex-col justify-between shadow-2xl">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#151F3D] mb-6">
            <div>
              <span className="text-[10px] font-mono text-[#06B6D4] uppercase tracking-wider">
                Transparency & Truth
              </span>
              <h3 id="sources-drawer-title" className="font-head font-bold text-xl text-[#F8FAFC]">
                Scientific Sources & Credits
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-[#94A3B8] hover:text-[#F8FAFC] p-2 rounded-xl hover:bg-[#151F3D]"
              aria-label="Close sources drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {currentChapter && (
            <div className="mb-8">
              <h4 className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-wide mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
                <span>Verified Claims: {currentChapter.machine}</span>
              </h4>
              <div className="space-y-3">
                {currentChapter.facts.map((fact, i) => (
                  <div
                    key={i}
                    className="bg-[#050814] border border-[#151F3D] rounded-2xl p-4 text-xs space-y-1.5 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#00E5FF] tracking-wider uppercase">
                        NASA Science Archive
                      </span>
                      <span className="text-[10px] font-mono text-[#94A3B8]">
                        Checked {fact.checkedOn}
                      </span>
                    </div>
                    <p className="text-[#F8FAFC]">{fact.claim}</p>
                    <p className="text-[11px] font-mono text-[#94A3B8]">
                      Source: {fact.source}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-wide mb-3">
              Official NASA Datasets & Archives
            </h4>
            <div className="space-y-3">
              {sourcesList.map((src, idx) => (
                <div
                  key={idx}
                  className="bg-[#050814]/80 border border-[#151F3D] rounded-2xl p-4 text-xs hover:border-[#00E5FF]/40 transition-colors shadow-md"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#F8FAFC]">{src.name}</span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">NASA Official</span>
                  </div>
                  <p className="text-[#94A3B8] mb-2 leading-relaxed">
                    {src.description}
                  </p>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-[#00E5FF] hover:underline"
                  >
                    <span>Visit Reference Archive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#151F3D] mt-8 text-center text-xs text-[#94A3B8] font-mono leading-relaxed">
          <p className="mb-2">
            "Dramatized voice, facts from NASA. This is a student project for the NASA Space Apps Challenge 2026. It is not an official NASA website and is not endorsed by NASA."
          </p>
          <p className="text-[11px] text-[#64748B]">
            3D models created as faithful procedural engineering illustrations based on NASA JPL archives.
          </p>
        </div>
      </div>
    </div>
  );
};
