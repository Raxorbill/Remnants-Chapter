import React, { useEffect, useState } from 'react';
import { computeVoyagerMetrics, VoyagerLiveMetrics } from '../data/voyagerCalc';
import { Radio, Clock, Gauge, Compass } from 'lucide-react';

export const VoyagerLivePanel: React.FC = () => {
  const [metrics, setMetrics] = useState<VoyagerLiveMetrics>(computeVoyagerMetrics());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMetrics(computeVoyagerMetrics());
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0B1120] border border-[#00E5FF]/30 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center justify-between border-b border-[#1E293B] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
          <h4 className="font-head font-bold text-sm text-[#FFFFFF] tracking-wide uppercase">
            Voyager 1 Live Telemetry
          </h4>
        </div>
        <span className="text-[10px] font-mono text-[#00E5FF] tracking-wider uppercase">
          NASA DSN Ephemeris
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Distance from Earth */}
        <div className="bg-[#030712] p-4 rounded-xl border border-[#1E293B]">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] mb-1">
            <Compass className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>DISTANCE FROM EARTH</span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-[#FFFFFF] tracking-tight">
            ~{metrics.distanceBillionKm} <span className="text-sm font-normal text-[#94A3B8]">billion km</span>
          </div>
          <div className="text-[11px] font-mono text-[#94A3B8] mt-0.5">
            {Math.round(metrics.distanceKm).toLocaleString()} km
          </div>
        </div>

        {/* One-Way Light Travel Time */}
        <div className="bg-[#030712] p-4 rounded-xl border border-[#1E293B]">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] mb-1">
            <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>ONE-WAY SIGNAL TIME</span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-[#FFFFFF] tracking-tight">
            {metrics.oneWayDisplay}
          </div>
          <div className="text-[11px] font-mono text-[#94A3B8] mt-0.5">
            Round-trip: <span className="text-[#00E5FF] font-semibold">{metrics.roundTripDisplay}</span>
          </div>
        </div>

        {/* Heliocentric Speed */}
        <div className="bg-[#030712] p-4 rounded-xl border border-[#1E293B]">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] mb-1">
            <Gauge className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>CRUISING SPEED</span>
          </div>
          <div className="text-lg sm:text-xl font-mono font-semibold text-[#FFFFFF]">
            ~17.0 <span className="text-xs text-[#94A3B8]">km / second</span>
          </div>
          <div className="text-[11px] font-mono text-[#94A3B8] mt-0.5">
            approx 38,000 mph
          </div>
        </div>

        {/* Milestone: One Light-Day Threshold */}
        <div className="bg-[#030712] p-4 rounded-xl border border-[#1E293B]">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] mb-1">
            <Radio className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>1 LIGHT-DAY MILESTONE</span>
          </div>
          <div className="text-sm sm:text-base font-mono font-semibold text-[#00E5FF]">
            {metrics.countdownDisplay}
          </div>
          <div className="text-[11px] font-mono text-[#94A3B8] mt-0.5">
            Target: Nov 18, 2026, 10:16 UTC
          </div>
        </div>
      </div>

      <p className="text-xs text-[#94A3B8] leading-relaxed italic border-t border-[#1E293B] pt-3">
        "A command sent on Monday morning gets an answer on Wednesday morning."
      </p>

      <p className="text-[11px] font-mono text-[#64748B] mt-1.5">
        Distance calculated using NASA Horizons ephemeris data.
      </p>
    </div>
  );
};
