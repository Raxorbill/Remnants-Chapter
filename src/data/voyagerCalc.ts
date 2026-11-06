// Accurate calculation for Voyager 1 live distance and signal delay

const ONE_LIGHT_DAY_KM = 25902068371.488; // 299,792.458 km/s * 86,400 s
const TARGET_TIMESTAMP_MS = Date.parse("2026-11-18T10:16:07Z");
const SPEED_KM_S = 17.0; // ~38,000 mph relative to Sun
const SPEED_LIGHT_KM_S = 299792.458;

export interface VoyagerLiveMetrics {
  distanceKm: number;
  distanceBillionKm: string;
  oneWayHours: number;
  oneWayMinutes: number;
  oneWayDisplay: string;
  roundTripDisplay: string;
  speedDisplay: string;
  isPastTarget: boolean;
  countdownDisplay: string;
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  secondsRemaining: number;
}

export function computeVoyagerMetrics(nowMs: number = Date.now()): VoyagerLiveMetrics {
  const diffSeconds = (nowMs - TARGET_TIMESTAMP_MS) / 1000;
  // distance(t) = 25,902,068,371 km + 17.0 km/s * (t - target_t)
  const distanceKm = ONE_LIGHT_DAY_KM + SPEED_KM_S * diffSeconds;
  const distanceBillionKm = (distanceKm / 1e9).toFixed(2);

  const oneWayTotalSeconds = distanceKm / SPEED_LIGHT_KM_S;
  const oneWayHours = Math.floor(oneWayTotalSeconds / 3600);
  const oneWayMinutes = Math.floor((oneWayTotalSeconds % 3600) / 60);
  const oneWayDisplay = `${oneWayHours} h ${oneWayMinutes.toString().padStart(2, '0')} min`;

  const roundTripDays = (oneWayTotalSeconds * 2) / 86400;
  const roundTripDisplay = roundTripDays >= 1.95 && roundTripDays <= 2.05 ? "about 2 days" : `${(roundTripDays).toFixed(1)} days`;

  const speedDisplay = "about 17 km every second (38,000 mph)";

  const msRemaining = TARGET_TIMESTAMP_MS - nowMs;
  const isPastTarget = msRemaining <= 0;

  let countdownDisplay = "";
  let daysRemaining = 0;
  let hoursRemaining = 0;
  let minutesRemaining = 0;
  let secondsRemaining = 0;

  if (isPastTarget) {
    countdownDisplay = "Voyager 1 is now more than one light-day away.";
  } else {
    const totalSec = Math.floor(msRemaining / 1000);
    daysRemaining = Math.floor(totalSec / 86400);
    hoursRemaining = Math.floor((totalSec % 86400) / 3600);
    minutesRemaining = Math.floor((totalSec % 3600) / 60);
    secondsRemaining = totalSec % 60;
    countdownDisplay = `${daysRemaining}d ${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s to one light-day`;
  }

  return {
    distanceKm,
    distanceBillionKm,
    oneWayHours,
    oneWayMinutes,
    oneWayDisplay,
    roundTripDisplay,
    speedDisplay,
    isPastTarget,
    countdownDisplay,
    daysRemaining,
    hoursRemaining,
    minutesRemaining,
    secondsRemaining
  };
}
