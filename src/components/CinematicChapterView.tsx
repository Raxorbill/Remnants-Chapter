import React, { useState } from 'react';
import { ChapterData, Hotspot } from '../data/types';
import { ModelViewer } from './ModelViewer';
import { VoyagerLivePanel } from './VoyagerLivePanel';
import {
  ChevronRight,
  ExternalLink,
  BookOpen,
  Camera,
  ArrowRight,
  ZoomIn,
  X
} from 'lucide-react';

interface CinematicChapterViewProps {
  chapter: ChapterData;
  activeHotspot: Hotspot | null;
  onSelectHotspot: (hotspot: Hotspot | null) => void;
  onOpenSources: () => void;
  onNextChapter: () => void;
  onPrevChapter?: () => void;
  isLastChapter: boolean;
  reducedMotion: boolean;
  roverSelection: 'opportunity' | 'spirit';
  onRoverChange: (rover: 'opportunity' | 'spirit') => void;
  laserTrigger: number;
}

export const CinematicChapterView: React.FC<CinematicChapterViewProps> = ({
  chapter,
  activeHotspot,
  onSelectHotspot,
  onOpenSources,
  onNextChapter,
  isLastChapter,
  reducedMotion,
  roverSelection,
  onRoverChange,
  laserTrigger
}) => {
  // 0: The Question & Hardware Photos
  // 1: 3D Hardware Anatomy
  // 2: The Discovery & Proof
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const [selectedPhoto, setSelectedPhoto] = useState<{
    src: string;
    alt: string;
    caption: string;
    credit: string;
    sourceUrl: string;
  } | null>(null);

  const hardwarePhotos = chapter.hardwarePhotos || [chapter.photo];

  return (
    <div className="w-full flex flex-col justify-between min-h-[82vh] py-2 relative text-[#FFFFFF]">
      {/* Top Telemetry Header - Clean Unboxed Typography */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-[#1E293B]">
        <div className="flex items-center gap-3 text-xs font-mono text-[#94A3B8]">
          <span className="flex items-center gap-1.5 text-[#00E5FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
            <span>{chapter.status.chip}</span>
          </span>
          <span>·</span>
          <span>{chapter.distanceLabel}</span>
          <span>·</span>
          <span className="hidden sm:inline">{chapter.whereItIs.split('(')[0].trim()}</span>
        </div>

        {/* Minimal Beat Selector */}
        <div className="flex items-center gap-1 bg-[#0B1120] p-1 rounded-xl border border-[#1E293B]">
          <button
            onClick={() => setCurrentBeat(0)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              currentBeat === 0
                ? 'bg-[#151F3D] text-[#FFFFFF] font-semibold text-[#00E5FF]'
                : 'text-[#94A3B8] hover:text-[#FFFFFF]'
            }`}
          >
            01. The Question
          </button>
          <button
            onClick={() => setCurrentBeat(1)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              currentBeat === 1
                ? 'bg-[#151F3D] text-[#FFFFFF] font-semibold text-[#00E5FF]'
                : 'text-[#94A3B8] hover:text-[#FFFFFF]'
            }`}
          >
            02. 3D Anatomy
          </button>
          <button
            onClick={() => setCurrentBeat(2)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              currentBeat === 2
                ? 'bg-[#151F3D] text-[#FFFFFF] font-semibold text-[#00E5FF]'
                : 'text-[#94A3B8] hover:text-[#FFFFFF]'
            }`}
          >
            03. The Discovery
          </button>
        </div>

        <button
          onClick={onOpenSources}
          className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] hover:text-[#00E5FF] transition-colors py-1 px-2.5 rounded-lg hover:bg-[#0B1120]"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Sources</span>
        </button>
      </div>

      {/* BEAT 1: THE QUESTION & HARDWARE PHOTOGRAPHY (NO 3D, NO HARDWARE DETAILS) */}
      {currentBeat === 0 && (
        <div className="flex-1 flex flex-col justify-between py-2 animate-in fade-in duration-300 space-y-6">
          {/* Question Header */}
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#00E5FF] tracking-[0.2em] uppercase">
              Chapter 0{chapter.chapter} · {chapter.machine}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-head text-[#FFFFFF] tracking-tight leading-[1.12] text-balance">
              "{chapter.bannerIn}"
            </h1>
          </div>

          {/* Curated Hardware Photos Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch flex-1 my-3 max-w-5xl mx-auto w-full">
            {hardwarePhotos.slice(0, 2).map((photo, index) => (
              <div
                key={index}
                className="bg-[#0B1120] border border-[#1E293B] rounded-2xl p-3.5 shadow-xl flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between pb-2 text-[11px] font-mono text-[#94A3B8]">
                  <span className="flex items-center gap-1.5 text-[#00E5FF]">
                    <Camera className="w-3.5 h-3.5" />
                    <span>NASA ARCHIVE</span>
                  </span>
                  <button
                    onClick={() => setSelectedPhoto(photo)}
                    className="hover:text-[#FFFFFF] flex items-center gap-1 transition-colors"
                  >
                    <ZoomIn className="w-3 h-3" />
                    <span>Expand</span>
                  </button>
                </div>

                <div
                  onClick={() => setSelectedPhoto(photo)}
                  className="relative flex-1 rounded-xl overflow-hidden my-2 border border-[#1E293B] cursor-pointer min-h-[220px] sm:min-h-[260px] bg-[#030712]"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="pt-1.5 space-y-1">
                  <p className="text-xs text-[#FFFFFF] leading-snug line-clamp-2">
                    {photo.caption}
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#94A3B8] pt-1">
                    <span className="truncate max-w-[200px]">Credit: {photo.credit}</span>
                    <a
                      href={photo.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#00E5FF] hover:underline flex items-center gap-1 shrink-0"
                    >
                      <span>Record</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Simple CTA to proceed to Hardware Anatomy */}
          <div className="text-center pt-2">
            <button
              onClick={() => setCurrentBeat(1)}
              className="px-7 py-3 rounded-xl font-head font-bold text-sm bg-[#FFFFFF] hover:bg-[#F1F5F9] text-[#030712] transition-transform active:scale-95 shadow-xl shadow-cyan-500/10 inline-flex items-center gap-2"
            >
              <span>Inspect 3D Hardware Anatomy</span>
              <ChevronRight className="w-4 h-4 text-[#030712]" />
            </button>
          </div>
        </div>
      )}

      {/* BEAT 2: 3D HARDWARE ANATOMY & COMPONENT INSPECTION */}
      {currentBeat === 1 && (
        <div className="flex-1 flex flex-col lg:flex-row gap-6 items-center py-2 animate-in fade-in duration-300">
          {/* Main 3D Viewport on Left */}
          <div className="w-full lg:w-7/12 h-[420px] sm:h-[480px]">
            <ModelViewer
              chapter={chapter}
              activeHotspot={activeHotspot}
              onSelectHotspot={onSelectHotspot}
              reducedMotion={reducedMotion}
              roverSelection={roverSelection}
              onRoverChange={onRoverChange}
              laserTrigger={laserTrigger}
            />
          </div>

          {/* Component Details on Right */}
          <div className="w-full lg:w-5/12 flex flex-col justify-between space-y-5">
            <div className="bg-[#0B1120] border border-[#1E293B] rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-2 text-xs font-mono">
                <span className="text-[#00E5FF] font-semibold uppercase tracking-wider">
                  Hardware Anatomy
                </span>
                <span className="text-[#94A3B8]">
                  {chapter.hotspots.length} target parts
                </span>
              </div>

              {activeHotspot ? (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <h3 className="font-head font-bold text-lg text-[#FFFFFF]">
                    {activeHotspot.label}
                  </h3>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#00E5FF] uppercase block">
                      Function:
                    </span>
                    <p className="text-sm text-[#F8FAFC] leading-relaxed">
                      {activeHotspot.job}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#1E293B] space-y-1">
                    <span className="text-[10px] font-mono text-[#38BDF8] uppercase block">
                      Result:
                    </span>
                    <p className="text-sm text-[#F8FAFC] leading-relaxed">
                      {activeHotspot.learned}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-[#F8FAFC]">
                    {chapter.steps[1].text}
                  </p>
                  <p className="text-xs font-mono text-[#94A3B8]">
                    Click any marker on the 3D model or select a component below to inspect.
                  </p>
                </div>
              )}

              {/* Part Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1E293B]">
                {chapter.hotspots.map((hs) => (
                  <button
                    key={hs.id}
                    onClick={() => onSelectHotspot(activeHotspot?.id === hs.id ? null : hs)}
                    className={`px-3 py-2 rounded-lg text-xs font-mono truncate text-left transition-colors border ${
                      activeHotspot?.id === hs.id
                        ? 'bg-[#151F3D] text-[#00E5FF] border-[#00E5FF]'
                        : 'bg-[#030712] text-[#94A3B8] hover:text-[#FFFFFF] border-[#1E293B]'
                    }`}
                  >
                    {hs.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setCurrentBeat(0)}
                className="px-4 py-2 rounded-lg text-xs font-mono text-[#94A3B8] hover:text-[#FFFFFF] border border-[#1E293B] transition-colors"
              >
                ← The Question
              </button>

              <button
                onClick={() => setCurrentBeat(2)}
                className="px-6 py-2.5 rounded-xl font-head font-bold text-xs sm:text-sm bg-[#FFFFFF] hover:bg-[#F1F5F9] text-[#030712] shadow-xl shadow-cyan-500/10 transition-transform active:scale-95 inline-flex items-center gap-1.5"
              >
                <span>View Scientific Discovery</span>
                <ChevronRight className="w-4 h-4 text-[#030712]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BEAT 3: THE DISCOVERY (UNIQUE DISCOVERY IMAGE & BREAKTHROUGH NUMBER) */}
      {currentBeat === 2 && (
        <div className="flex-1 flex flex-col justify-between py-2 animate-in fade-in duration-300 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto w-full">
            {/* Unique Discovery Image or Live Telemetry */}
            <div className="lg:col-span-6 space-y-2">
              {chapter.modelType === 'voyager' ? (
                <VoyagerLivePanel />
              ) : (
                <div className="bg-[#0B1120] border border-[#1E293B] rounded-2xl p-3 shadow-xl space-y-2">
                  <div
                    onClick={() => setSelectedPhoto(chapter.discoveryPhoto)}
                    className="relative rounded-xl overflow-hidden border border-[#1E293B] cursor-pointer min-h-[240px] sm:min-h-[280px] bg-[#030712] flex items-center justify-center group"
                  >
                    <img
                      src={chapter.discoveryPhoto.src}
                      alt={chapter.discoveryPhoto.alt}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 rounded text-[10px] font-mono text-[#00E5FF] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-3 h-3" />
                      <span>Expand</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#FFFFFF] leading-snug">
                    {chapter.discoveryPhoto.caption}
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                    <span>Credit: {chapter.discoveryPhoto.credit}</span>
                    <a
                      href={chapter.discoveryPhoto.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#00E5FF] hover:underline flex items-center gap-1"
                    >
                      <span>Archive</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Discovery Breakthrough Box */}
            <div className="lg:col-span-6 space-y-5">
              <div className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider">
                Scientific Breakthrough
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-head text-[#FFFFFF] tracking-tight leading-snug">
                {chapter.discovery.title}
              </h2>

              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {chapter.discovery.finding}
              </p>

              {/* Number Card */}
              <div className="bg-[#0B1120] border border-[#00E5FF]/30 rounded-2xl p-5 shadow-xl space-y-1">
                <div className="text-[11px] font-mono text-[#94A3B8] uppercase">
                  {chapter.discovery.numberLabel}
                </div>
                <div className="text-3xl sm:text-4xl font-mono font-bold text-[#FFFFFF] tracking-tight">
                  {chapter.discovery.keyNumber}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Relay Controls */}
          <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between mt-4">
            <button
              onClick={() => setCurrentBeat(1)}
              className="px-4 py-2 rounded-lg text-xs font-mono text-[#94A3B8] hover:text-[#FFFFFF] border border-[#1E293B] transition-colors"
            >
              ← 3D Anatomy
            </button>

            <button
              onClick={onNextChapter}
              className="px-7 py-3 rounded-xl font-head font-bold text-sm bg-[#FFFFFF] hover:bg-[#F1F5F9] text-[#030712] shadow-xl shadow-cyan-500/10 transition-transform active:scale-95 inline-flex items-center gap-2"
            >
              <span>{isLastChapter ? 'Add Your Question' : 'Next Mission Question'}</span>
              <ArrowRight className="w-4 h-4 text-[#030712]" />
            </button>
          </div>
        </div>
      )}

      {/* High-Resolution Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#0B1120] border border-[#1E293B] rounded-2xl p-5 shadow-2xl space-y-3 max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#1E293B]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF]">
                <Camera className="w-4 h-4" />
                <span>NASA ARCHIVAL DOCUMENT</span>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1 rounded-lg text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-[#151F3D]"
                aria-label="Close photo view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden rounded-xl border border-[#1E293B] bg-black flex items-center justify-center min-h-[300px]">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-h-[60vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-[#FFFFFF] leading-relaxed">
                {selectedPhoto.caption}
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] pt-1">
                <span>Credit: {selectedPhoto.credit}</span>
                <a
                  href={selectedPhoto.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#00E5FF] hover:underline flex items-center gap-1"
                >
                  <span>NASA Record</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
