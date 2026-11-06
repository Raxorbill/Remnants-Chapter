import React, { useState } from 'react';

interface DistanceRulerProps {
  currentDistanceKm: number;
  currentDistanceLabel: string;
  onSelectChapter?: (index: number) => void;
}

interface Milestone {
  log: number;
  km: number;
  label: string;
  sublabel: string;
  lightTime: string;
  chapterIndex?: number;
}

export const DistanceRuler: React.FC<DistanceRulerProps> = ({
  currentDistanceKm,
  currentDistanceLabel,
  onSelectChapter
}) => {
  const [hoveredMilestone, setHoveredMilestone] = useState<Milestone | null>(null);

  // Logarithmic scale: 10^5 (100,000 km) to 10^10.5 (~31.6 billion km)
  const minLog = 5.0;
  const maxLog = 10.5;
  const clampedDistance = Math.max(100000, Math.min(30000000000, currentDistanceKm));
  const currentLog = Math.log10(clampedDistance);
  const positionPercent = Math.max(4, Math.min(96, ((currentLog - minLog) / (maxLog - minLog)) * 100));

  const milestones: Milestone[] = [
    {
      log: 5.58,
      km: 384400,
      label: 'Moon',
      sublabel: 'Apollo 11 & 12',
      lightTime: '1.28s',
      chapterIndex: 0
    },
    {
      log: 8.35,
      km: 225000000,
      label: 'Mars',
      sublabel: 'Viking · MER · Ingenuity',
      lightTime: '12.5 min',
      chapterIndex: 2
    },
    {
      log: 8.89,
      km: 778000000,
      label: 'Jupiter',
      sublabel: 'Voyager Flyby',
      lightTime: '43.2 min'
    },
    {
      log: 9.15,
      km: 1400000000,
      label: 'Saturn',
      sublabel: 'Titan Gravity Assist',
      lightTime: '1.3 hours'
    },
    {
      log: 10.26,
      km: 18100000000,
      label: 'Heliopause',
      sublabel: 'Solar Boundary Crossed',
      lightTime: '16.7 hours'
    },
    {
      log: 10.41,
      km: 25902068371,
      label: 'Interstellar',
      sublabel: 'Voyager 1 · 1 Light-Day',
      lightTime: '24.0 hours',
      chapterIndex: 5
    }
  ];

  // Compute live one-way light speed time
  const lightSpeedKmPerSec = 299792.458;
  const lightSeconds = currentDistanceKm / lightSpeedKmPerSec;
  const formatLightTime = (sec: number) => {
    if (sec < 60) return `${sec.toFixed(2)}s`;
    if (sec < 3600) return `${(sec / 60).toFixed(1)}m`;
    return `${(sec / 3600).toFixed(2)}h`;
  };

  return (
    <>
      {/* Desktop Vertical Astronomical Depth Gauge on Left Edge */}
      <aside
        className="hidden xl:flex fixed left-5 top-24 bottom-14 w-16 flex-col items-center justify-between z-30 select-none pointer-events-auto"
        aria-label="Celestial Distance & Signal Delay Depth Gauge"
      >
        {/* Top Header Label */}
        <div className="flex flex-col items-center gap-1 text-[9px] font-mono text-[#94A3B8] tracking-widest uppercase">
          <span className="text-[#00E5FF] font-semibold">DEEP SPACE</span>
          <span className="opacity-60">26B KM</span>
        </div>

        {/* Central Astronomical Rail */}
        <div className="relative w-12 h-full my-4 flex justify-center">
          {/* Background Rail Line */}
          <div className="absolute top-0 bottom-0 w-[1.5px] bg-[#1E293B]" />

          {/* Illuminated Trajectory Beam from Earth to Spacecraft */}
          <div
            style={{ height: `${positionPercent}%` }}
            className="absolute bottom-0 w-[2px] bg-gradient-to-t from-[#00E5FF]/20 via-[#00E5FF]/60 to-[#00E5FF] transition-all duration-700 ease-out shadow-[0_0_8px_#00E5FF]"
          />

          {/* Fine Precision Tick Marks */}
          {Array.from({ length: 28 }).map((_, i) => {
            const pct = (i / 27) * 100;
            const isMajor = i % 4 === 0;
            return (
              <div
                key={i}
                style={{ bottom: `${pct}%` }}
                className={`absolute left-1/2 -translate-x-1/2 rounded-full transition-colors ${
                  isMajor
                    ? 'w-3 h-[1px] bg-[#94A3B8]/40'
                    : 'w-1.5 h-[1px] bg-[#94A3B8]/20'
                }`}
              />
            );
          })}

          {/* Interactive Celestial Waypoints */}
          {milestones.map((m) => {
            const pct = ((m.log - minLog) / (maxLog - minLog)) * 100;
            const isNear = Math.abs(currentLog - m.log) < 0.45;

            return (
              <div
                key={m.label}
                style={{ bottom: `${pct}%` }}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 group"
                onMouseEnter={() => setHoveredMilestone(m)}
                onMouseLeave={() => setHoveredMilestone(null)}
              >
                <button
                  onClick={() => m.chapterIndex !== undefined && onSelectChapter?.(m.chapterIndex)}
                  disabled={m.chapterIndex === undefined}
                  className={`relative flex items-center justify-center transition-all p-1.5 ${
                    m.chapterIndex !== undefined ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  aria-label={`${m.label}: ${m.sublabel}`}
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isNear
                        ? 'w-2.5 h-2.5 bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]'
                        : 'w-1.5 h-1.5 bg-[#334155] group-hover:bg-[#94A3B8]'
                    }`}
                  />
                </button>

                {/* Quiet Right-Side Waypoint Tag */}
                <div
                  className={`absolute left-7 top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap text-[10px] font-mono transition-all duration-300 ${
                    isNear
                      ? 'text-[#00E5FF] font-semibold opacity-100 translate-x-0'
                      : 'text-[#64748B] opacity-0 group-hover:opacity-100 group-hover:text-[#94A3B8] translate-x-1'
                  }`}
                >
                  {m.label}
                </div>
              </div>
            );
          })}

          {/* The Active Spacecraft Beacon (Smooth Gliding Cursor) */}
          <div
            style={{ bottom: `${positionPercent}%` }}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-700 ease-out flex items-center justify-center"
          >
            {/* Outer Pulse Ring */}
            <div className="absolute w-6 h-6 rounded-full border border-[#00E5FF]/40 animate-ping opacity-60" />
            {/* Middle Glass Bezel */}
            <div className="w-4 h-4 rounded-full bg-[#0B1120] border-2 border-[#00E5FF] shadow-[0_0_12px_#00E5FF] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF]" />
            </div>
          </div>
        </div>

        {/* Live Distance & Signal Travel Readout at Bottom */}
        <div className="flex flex-col items-center gap-1 text-[9px] font-mono text-[#94A3B8] tracking-widest uppercase">
          <div className="text-[10px] text-[#00E5FF] font-mono font-semibold">
            {formatLightTime(lightSeconds)}
          </div>
          <span className="opacity-60">LIGHT DELAY</span>
        </div>

        {/* Hover / Active Telemetry Card */}
        {hoveredMilestone && (
          <div
            style={{
              bottom: `${((hoveredMilestone.log - minLog) / (maxLog - minLog)) * 100}%`
            }}
            className="absolute left-16 -translate-y-1/2 pointer-events-none whitespace-nowrap bg-[#0B1120]/95 border border-[#00E5FF]/60 px-3.5 py-2 rounded-xl shadow-2xl text-xs font-mono text-[#FFFFFF] z-50 backdrop-blur-md space-y-0.5 animate-in fade-in duration-150"
          >
            <div className="flex items-center justify-between gap-3 text-[10px] text-[#00E5FF]">
              <span className="font-bold uppercase tracking-wider">{hoveredMilestone.label}</span>
              <span>Delay: {hoveredMilestone.lightTime}</span>
            </div>
            <div className="text-[11px] text-[#94A3B8]">{hoveredMilestone.sublabel}</div>
            <div className="text-[10px] text-[#64748B] pt-0.5 border-t border-[#1E293B]">
              ~{hoveredMilestone.km.toLocaleString()} km
              {hoveredMilestone.chapterIndex !== undefined && ' · Click to view mission'}
            </div>
          </div>
        )}
      </aside>

      {/* Mobile / Tablet Horizontal Orbital Rail under header */}
      <div className="xl:hidden w-full bg-[#030712]/95 px-4 py-2 border-b border-[#1E293B] z-30">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#94A3B8] mb-1.5">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
            <span className="text-[#00E5FF] font-semibold">{currentDistanceLabel}</span>
          </span>
          <span className="text-[#64748B]">
            Speed of light delay: <span className="text-[#00E5FF] font-medium">{formatLightTime(lightSeconds)}</span>
          </span>
        </div>

        {/* Segmented Track */}
        <div className="relative w-full h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
          <div
            style={{ width: `${positionPercent}%` }}
            className="h-full bg-gradient-to-r from-[#00E5FF]/30 to-[#00E5FF] transition-all duration-700 ease-out"
          />
        </div>
      </div>
    </>
  );
};
