/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { chaptersData } from './data/chapters';
import { Hotspot, ChapterData } from './data/types';
import { SpaceAtmosphere } from './components/SpaceAtmosphere';
import { QuestionBanner } from './components/QuestionBanner';
import { DistanceRuler } from './components/DistanceRuler';
import { CinematicChapterView } from './components/CinematicChapterView';
import { CinematicTransition } from './components/CinematicTransition';
import { LandingPrologue } from './components/LandingPrologue';
import { ConstellationFinale } from './components/ConstellationFinale';
import { AskEngineerModal } from './components/AskEngineerModal';
import { SourcesDrawer } from './components/SourcesDrawer';
import { SettingsDrawer } from './components/SettingsDrawer';
import { AudioCaptionBanner } from './components/AudioCaptionBanner';
import { audioService } from './utils/audio';
import {
  Menu,
  BookOpen,
  Radio
} from 'lucide-react';

export default function App() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [inPrologue, setInPrologue] = useState<boolean>(true);
  const [inFinale, setInFinale] = useState<boolean>(false);
  const [visitedChapters, setVisitedChapters] = useState<Set<number>>(new Set([0]));
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  // Transition state between chapters
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [pendingChapterIndex, setPendingChapterIndex] = useState<number>(0);

  // Rover selection for Chapter 4 (Spirit vs Opportunity)
  const [roverSelection, setRoverSelection] = useState<'opportunity' | 'spirit'>('opportunity');
  const [laserTrigger, setLaserTrigger] = useState<number>(0);

  // Accessibility & Display Settings
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Modals & Drawers
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isSourcesOpen, setIsSourcesOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const currentChapter: ChapterData = chaptersData[Math.min(currentChapterIndex, chaptersData.length - 1)];

  // Update HTML title dynamically
  useEffect(() => {
    if (inPrologue) {
      document.title = "Built for a Question — Mission Remnants";
    } else if (inFinale) {
      document.title = "Your Question — Built for a Question";
    } else {
      document.title = `Ch ${currentChapter.chapter}: ${currentChapter.machine} — Built for a Question`;
    }
  }, [inPrologue, inFinale, currentChapter]);

  // Keep track of visited chapters
  useEffect(() => {
    if (!inPrologue && !inFinale) {
      setVisitedChapters((prev) => new Set([...prev, currentChapterIndex]));
    }
  }, [currentChapterIndex, inPrologue, inFinale]);

  // Handle Hash Deep Links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#ch')) {
        const num = parseInt(hash.replace('#ch', ''), 10);
        if (num >= 1 && num <= 6) {
          setInPrologue(false);
          setInFinale(false);
          setCurrentChapterIndex(num - 1);
          setActiveHotspot(null);
        }
      } else if (hash === '#finale') {
        setInPrologue(false);
        setInFinale(true);
      } else if (hash === '#sources') {
        setIsSourcesOpen(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const updateHash = (hash: string) => {
    window.location.hash = hash;
  };

  const startJourney = () => {
    setInPrologue(false);
    setInFinale(false);
    setCurrentChapterIndex(0);
    setActiveHotspot(null);
    updateHash('#ch1');
  };

  const triggerChapterTransition = (nextIndex: number) => {
    setActiveHotspot(null);
    setPendingChapterIndex(nextIndex);
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    if (pendingChapterIndex >= chaptersData.length) {
      setInFinale(true);
      updateHash('#finale');
    } else {
      setCurrentChapterIndex(pendingChapterIndex);
      updateHash(`#ch${pendingChapterIndex + 1}`);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
      setActiveHotspot(null);
      updateHash(`#ch${currentChapterIndex}`);
    } else {
      setInPrologue(true);
      window.location.hash = '';
    }
  };

  const handleSelectChapter = (index: number) => {
    if (index === currentChapterIndex && !inPrologue && !inFinale) return;
    triggerChapterTransition(index);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    audioService.setSoundEnabled(next);
    if (next) {
      audioService.toggleAmbient(true);
    } else {
      audioService.toggleAmbient(false);
    }
  };

  const textSizeClass =
    textSize === 'large'
      ? 'text-[1.08rem]'
      : textSize === 'xlarge'
      ? 'text-[1.18rem]'
      : 'text-base';

  const pendingChapter = pendingChapterIndex < chaptersData.length ? chaptersData[pendingChapterIndex] : null;

  return (
    <div
      className={`min-h-screen bg-[#03050C] text-[#F8FAFC] flex flex-col font-body relative overflow-x-hidden ${
        reducedMotion ? 'reduced-motion' : ''
      } ${highContrast ? 'high-contrast' : ''} ${textSizeClass}`}
    >
      {/* 0. Living Space Atmosphere Canvas (Stars, Nebula Depth) */}
      <SpaceAtmosphere />

      {/* 1. Global Question Banner */}
      <QuestionBanner
        question={
          inPrologue
            ? "How far away is the Moon, exactly?"
            : inFinale
            ? ""
            : currentChapter.bannerIn
        }
        handOffLine={
          !inPrologue && !inFinale ? currentChapter.handOffLine : undefined
        }
        reducedMotion={reducedMotion}
        isFinale={inFinale}
      />

      {/* Top Controls */}
      <nav
        aria-label="Global application controls"
        className="fixed top-3 right-4 md:right-8 z-40 flex items-center gap-2 pointer-events-auto"
      >
        <button
          onClick={() => setIsSourcesOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-[#090E1F]/90 hover:bg-[#131A33] text-[#94A3B8] hover:text-[#38BDF8] border border-[#1B2540] transition-colors shadow-xl backdrop-blur-md"
          title="Open scientific sources drawer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Sources</span>
        </button>

        <button
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono bg-[#090E1F]/90 hover:bg-[#131A33] text-[#94A3B8] hover:text-[#00E5FF] border border-[#1B2540] transition-colors shadow-xl backdrop-blur-md"
          title="Open settings and chapter navigation"
          aria-label="Menu and settings"
        >
          <Menu className="w-4 h-4" />
          <span className="hidden md:inline">Menu</span>
        </button>
      </nav>

      {/* 2. Global Distance Ruler */}
      <DistanceRuler
        currentDistanceKm={
          inPrologue
            ? 384400
            : inFinale
            ? 25902068371
            : currentChapter.distanceKm
        }
        currentDistanceLabel={
          inPrologue
            ? "Earth & Moon"
            : inFinale
            ? "Interstellar space"
            : currentChapter.distanceLabel
        }
        onSelectChapter={handleSelectChapter}
      />

      {/* 3. Main Stage Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 relative z-10 flex flex-col justify-center">
        {inPrologue ? (
          <LandingPrologue onBegin={startJourney} />
        ) : inFinale ? (
          <ConstellationFinale
            onRestart={() => {
              setInFinale(false);
              setInPrologue(false);
              setCurrentChapterIndex(0);
              updateHash('#ch1');
            }}
            reducedMotion={reducedMotion}
          />
        ) : (
          <CinematicChapterView
            key={currentChapter.id}
            chapter={currentChapter}
            activeHotspot={activeHotspot}
            onSelectHotspot={setActiveHotspot}
            onOpenSources={() => setIsSourcesOpen(true)}
            onNextChapter={() => triggerChapterTransition(currentChapterIndex + 1)}
            onPrevChapter={currentChapterIndex > 0 ? handlePrevChapter : undefined}
            isLastChapter={currentChapterIndex === chaptersData.length - 1}
            reducedMotion={reducedMotion}
            roverSelection={roverSelection}
            onRoverChange={setRoverSelection}
            laserTrigger={laserTrigger}
          />
        )}
      </main>

      {/* 4. Cinematic Chapter-to-Chapter Warp Transition */}
      <CinematicTransition
        isActive={isTransitioning}
        handOffLine={currentChapter.handOffLine}
        nextQuestion={
          pendingChapter
            ? pendingChapter.bannerIn
            : "What will you ask next?"
        }
        nextMachine={
          pendingChapter
            ? pendingChapter.machine
            : "Your Question"
        }
        onComplete={handleTransitionComplete}
        reducedMotion={reducedMotion}
      />

      {/* 5. Bottom Navigation & Relay Indicators */}
      <footer className="w-full bg-[#03050C]/95 border-t border-[#1B2540] px-4 py-3 z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2" role="navigation" aria-label="Chapter progress">
            <span className="text-[11px] font-mono text-[#94A3B8] mr-1 hidden md:inline">
              Mission Relay:
            </span>
            {chaptersData.map((ch, idx) => {
              const isCurrent = !inPrologue && !inFinale && currentChapterIndex === idx;
              const isVisited = visitedChapters.has(idx);
              return (
                <button
                  key={ch.id}
                  onClick={() => handleSelectChapter(idx)}
                  className={`group relative flex items-center justify-center p-1.5 transition-transform ${
                    isCurrent ? 'scale-125' : ''
                  }`}
                  aria-label={`Chapter ${idx + 1}: ${ch.title}`}
                  title={`Chapter ${idx + 1}: ${ch.title}`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      isCurrent
                        ? 'bg-[#00E5FF] shadow-[0_0_12px_#00E5FF]'
                        : isVisited
                        ? 'bg-[#38BDF8] hover:bg-[#7DD3FC]'
                        : 'bg-[#1B2540] hover:bg-[#94A3B8]/40'
                    }`}
                  />
                </button>
              );
            })}

            <button
              onClick={() => handleSelectChapter(6)}
              className={`p-1.5 transition-transform ${
                inFinale ? 'scale-125' : ''
              }`}
              title="Finale: Your Question for the Next Machine"
              aria-label="Finale: Your Question for the Next Machine"
            >
              <Radio
                className={`w-3.5 h-3.5 transition-colors ${
                  inFinale
                    ? 'text-[#00E5FF]'
                    : 'text-[#94A3B8]/60 hover:text-[#00E5FF]'
                }`}
              />
            </button>
          </div>

          <div className="text-[11px] font-mono text-[#64748B] text-center sm:text-right">
            Dramatized voice, facts from NASA. Not an official NASA website; not endorsed by NASA.
          </div>
        </div>
      </footer>

      {/* 7. Drawers & Modals */}
      <AskEngineerModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        activeChapterId={currentChapter.id}
      />

      <SourcesDrawer
        isOpen={isSourcesOpen}
        onClose={() => setIsSourcesOpen(false)}
        activeChapterId={!inPrologue && !inFinale ? currentChapter.id : undefined}
      />

      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        textSize={textSize}
        onTextSizeChange={setTextSize}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onSelectChapter={handleSelectChapter}
        currentChapterIndex={inFinale ? 6 : inPrologue ? -1 : currentChapterIndex}
      />

      <AudioCaptionBanner />
    </div>
  );
}
