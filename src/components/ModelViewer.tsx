import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { ChapterData, Hotspot } from '../data/types';
import {
  createAerospaceMaterials,
  buildRetroreflectorModel,
  buildSeismometerModel,
  buildVikingLanderModel,
  buildMerRoverModel,
  buildIngenuityModel,
  buildVoyagerModel,
  ModelAnimationHooks
} from './3d/SpacecraftBuilder';
import { audioService } from '../utils/audio';
import { RotateCw, Zap, Activity } from 'lucide-react';

interface ModelViewerProps {
  chapter: ChapterData;
  activeHotspot: Hotspot | null;
  onSelectHotspot: (hotspot: Hotspot | null) => void;
  reducedMotion: boolean;
  roverSelection?: 'opportunity' | 'spirit';
  onRoverChange?: (rover: 'opportunity' | 'spirit') => void;
  laserTrigger?: number;
  onLaserComplete?: () => void;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({
  chapter,
  activeHotspot,
  onSelectHotspot,
  reducedMotion,
  roverSelection = 'opportunity',
  onRoverChange,
  laserTrigger,
  onLaserComplete
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [activeSpeedMode, setActiveSpeedMode] = useState<'mars' | 'earth'>('mars');
  const [isFiringLaser, setIsFiringLaser] = useState<boolean>(false);
  const [laserTimer, setLaserTimer] = useState<number>(0);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const hooksRef = useRef<ModelAnimationHooks>({});
  const animFrameRef = useRef<number>(0);
  const lastInteractionTimeRef = useRef<number>(Date.now());
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationAngles = useRef<{ yaw: number; pitch: number }>({ yaw: 0, pitch: 0.1 });
  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.35, 3.2));
  const currentCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.7, 5.0));

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!webglSupported || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Deep cosmic space atmosphere
    scene.background = new THREE.Color(0x020307);
    scene.fog = new THREE.FogExp2(0x020307, 0.04);

    // Multi-depth star particles
    const starCount = 500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 60;
      starPositions[i + 1] = (Math.random() - 0.5) * 40;
      starPositions[i + 2] = -12 - Math.random() * 40;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xF8FAFC,
      size: 0.09,
      transparent: true,
      opacity: 0.85
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Camera (Perspective 35 deg field of view)
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0.7, 5.0);
    cameraRef.current = camera;

    // High performance PBR renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // High-contrast Space Lighting Rig:
    // 1. Direct Sun Key Light
    const sunLight = new THREE.DirectionalLight(0xFFF3D6, 2.8);
    sunLight.position.set(5, 6, 4);
    scene.add(sunLight);

    // 2. Planet / Earthshine rim bounce (cool ice cyan / celestial blue)
    const planetBounce = new THREE.DirectionalLight(0x38BDF8, 1.6);
    planetBounce.position.set(-6, 3, -4);
    scene.add(planetBounce);

    // 3. Ambient soft cosmic fill
    const ambientCosmic = new THREE.HemisphereLight(0xF8FAFC, 0x090E1F, 0.65);
    scene.add(ambientCosmic);

    // Load Procedural Spacecraft Model
    const mats = createAerospaceMaterials();
    let built: { group: THREE.Group; hooks: ModelAnimationHooks };

    switch (chapter.modelType) {
      case 'retroreflector':
        built = buildRetroreflectorModel(mats);
        break;
      case 'seismometer':
        built = buildSeismometerModel(mats);
        break;
      case 'viking':
        built = buildVikingLanderModel(mats);
        break;
      case 'rover':
        built = buildMerRoverModel(mats);
        break;
      case 'ingenuity':
        built = buildIngenuityModel(mats);
        break;
      case 'voyager':
        built = buildVoyagerModel(mats);
        break;
      default:
        built = buildRetroreflectorModel(mats);
    }

    modelGroupRef.current = built.group;
    hooksRef.current = built.hooks;
    scene.add(built.group);

    // Camera initial arrival
    if (reducedMotion) {
      currentCameraPos.current.set(0, 0.35, 3.2);
      camera.position.copy(currentCameraPos.current);
    } else {
      currentCameraPos.current.set(0, 0.7, 5.2);
      targetCameraPos.current.set(0, 0.35, 3.2);
    }

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      currentCameraPos.current.lerp(targetCameraPos.current, reducedMotion ? 1.0 : 0.05);
      camera.position.copy(currentCameraPos.current);
      camera.lookAt(0, 0.15, 0);

      if (hooksRef.current.update) {
        hooksRef.current.update(elapsed, delta);
      }

      const isIdle = Date.now() - lastInteractionTimeRef.current > 2500;
      if (isIdle && !reducedMotion && !isDraggingRef.current && built.group) {
        built.group.rotation.y += delta * 0.12;
        rotationAngles.current.yaw = built.group.rotation.y;
      }

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameRef.current);
      if (modelGroupRef.current) scene.remove(modelGroupRef.current);
      renderer.dispose();
    };
  }, [chapter.id, chapter.modelType, webglSupported, reducedMotion]);

  useEffect(() => {
    if (!activeHotspot) {
      targetCameraPos.current.set(0, 0.35, 3.2);
    } else {
      const [hx, hy, hz] = activeHotspot.position;
      targetCameraPos.current.set(hx * 1.3, hy + 0.28, hz + 1.6);
    }
  }, [activeHotspot]);

  useEffect(() => {
    if (hooksRef.current.setSpeedMultiplier) {
      hooksRef.current.setSpeedMultiplier(activeSpeedMode === 'mars' ? 2.6 : 0.65);
    }
  }, [activeSpeedMode]);

  const handleVibrateSeismometer = useCallback(() => {
    if (hooksRef.current.triggerVibration) {
      hooksRef.current.triggerVibration(1.0);
    }
    audioService.playRumble(true);
    setTimeout(() => {
      audioService.playRumble(false);
    }, 2800);
  }, []);

  const fireLaserPulse = useCallback(() => {
    if (isFiringLaser) return;
    setIsFiringLaser(true);
    setLaserTimer(0);
    audioService.playLaserPing();

    const startTime = performance.now();
    const interval = window.setInterval(() => {
      const elapsedSec = (performance.now() - startTime) / 1000;
      setLaserTimer(Math.min(2.56, elapsedSec));
      if (elapsedSec >= 2.56) {
        clearInterval(interval);
        audioService.playLaserEcho();
        setIsFiringLaser(false);
        if (onLaserComplete) onLaserComplete();
      }
    }, 30);
  }, [isFiringLaser, onLaserComplete]);

  useEffect(() => {
    if (laserTrigger && laserTrigger > 0) {
      fireLaserPulse();
    }
  }, [laserTrigger, fireLaserPulse]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastInteractionTimeRef.current = Date.now();
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !modelGroupRef.current) return;
    lastInteractionTimeRef.current = Date.now();

    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    rotationAngles.current.yaw += deltaX * 0.008;
    rotationAngles.current.pitch = Math.max(-0.28, Math.min(0.28, rotationAngles.current.pitch + deltaY * 0.005));

    modelGroupRef.current.rotation.y = rotationAngles.current.yaw;
    modelGroupRef.current.rotation.x = rotationAngles.current.pitch;

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    lastInteractionTimeRef.current = Date.now();
  };

  const resetView = () => {
    lastInteractionTimeRef.current = Date.now();
    rotationAngles.current = { yaw: 0, pitch: 0.1 };
    targetCameraPos.current.set(0, 0.35, 3.2);
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.set(0.1, 0, 0);
    }
    onSelectHotspot(null);
  };

  const getHotspotScreenCoords = (pos: [number, number, number]): { left: string; top: string } => {
    if (!cameraRef.current || !rendererRef.current || !mountRef.current) {
      return { left: '50%', top: '50%' };
    }
    const [x, y, z] = pos;
    const vec = new THREE.Vector3(x, y, z);
    vec.project(cameraRef.current);

    const screenX = ((vec.x + 1) * 0.5) * 100;
    const screenY = ((-vec.y + 1) * 0.5) * 100;
    return {
      left: `${Math.max(12, Math.min(88, screenX))}%`,
      top: `${Math.max(12, Math.min(88, screenY))}%`
    };
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden rounded-3xl bg-[#020307]/90 border border-[#1B2540] shadow-2xl backdrop-blur-sm">
      {webglSupported ? (
        <div
          ref={mountRef}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          aria-label={`Interactive 3D model of ${chapter.machine}`}
          role="img"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#090E1F]">
          <img
            src={chapter.photo.src}
            alt={chapter.photo.alt}
            className="w-full max-w-md h-64 object-cover rounded-2xl border border-[#1B2540] mb-4"
          />
          <p className="text-sm text-[#94A3B8]">
            The 3D view could not load. Here is the picture and the list of parts instead.
          </p>
        </div>
      )}

      {/* Laser Pulse Beam Animation Overlay (Chapter 1) */}
      {chapter.modelType === 'retroreflector' && isFiringLaser && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          <svg className="w-full h-full">
            <line
              x1="5%"
              y1="5%"
              x2="50%"
              y2="52%"
              stroke="#38BDF8"
              strokeWidth="3.5"
              strokeDasharray="8,4"
              className="animate-pulse opacity-95"
            />
            {laserTimer > 1.28 && (
              <line
                x1="50%"
                y1="52%"
                x2="5%"
                y2="5%"
                stroke="#00E5FF"
                strokeWidth="3"
                strokeDasharray="6,4"
                className="opacity-95"
              />
            )}
          </svg>
          <div className="absolute top-6 left-6 bg-[#090E1F]/95 border border-[#38BDF8] px-4 py-2.5 rounded-2xl font-mono text-xs text-[#38BDF8] flex items-center gap-2.5 shadow-2xl backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] animate-ping" />
            <span>Earth Laser Pulse: {laserTimer.toFixed(2)}s / 2.56s (Real Speed of Light)</span>
          </div>
        </div>
      )}

      {/* Interactive 3D Hotspot Reticles */}
      {webglSupported && (
        <div className="absolute inset-0 pointer-events-none">
          {chapter.hotspots.map((hs) => {
            const coords = getHotspotScreenCoords(hs.position);
            const isSelected = activeHotspot?.id === hs.id;
            return (
              <div
                key={hs.id}
                style={{ left: coords.left, top: coords.top }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform duration-300"
              >
                <button
                  onClick={() => onSelectHotspot(isSelected ? null : hs)}
                  className={`group relative flex items-center justify-center w-8 h-8 rounded-full transition-transform focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
                    isSelected ? 'scale-125' : 'hover:scale-110'
                  }`}
                  aria-label={`${hs.label}, button`}
                  aria-expanded={isSelected}
                >
                  <span
                    className={`absolute inset-0 rounded-full border border-[#00E5FF] ${
                      reducedMotion ? '' : 'animate-ping opacity-60'
                    }`}
                  />
                  <span
                    className={`w-4 h-4 rounded-full border-2 transition-colors ${
                      isSelected
                        ? 'bg-[#00E5FF] border-white'
                        : 'bg-[#090E1F] border-[#00E5FF]'
                    }`}
                  />
                  <span className="absolute left-full ml-2 px-2.5 py-1 rounded-lg text-[11px] font-mono tracking-tight bg-[#090E1F]/95 text-[#F8FAFC] whitespace-nowrap border border-[#1B2540] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                    {hs.label}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Floating Control Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={resetView}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#94A3B8] bg-[#090E1F]/90 hover:text-[#F8FAFC] hover:bg-[#131A33] border border-[#1B2540] rounded-xl transition-colors shadow-lg"
            title="Reset view orientation"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset View</span>
          </button>

          {chapter.modelType === 'retroreflector' && (
            <button
              onClick={fireLaserPulse}
              disabled={isFiringLaser}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-xl border transition-all shadow-lg ${
                isFiringLaser
                  ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8]'
                  : 'bg-[#00E5FF] hover:bg-[#38BDF8] border-[#00E5FF] text-[#030712] font-head font-bold shadow-cyan-500/20'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#030712]" />
              <span>{isFiringLaser ? 'Pulsing (2.56s)...' : 'Fire Laser Pulse'}</span>
            </button>
          )}

          {chapter.modelType === 'seismometer' && (
            <button
              onClick={handleVibrateSeismometer}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#38BDF8] bg-[#090E1F]/90 hover:bg-[#131A33] border border-[#38BDF8]/50 rounded-xl transition-colors shadow-lg"
              title="Simulate lunar ground tremor"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Simulate Moon Tremor</span>
            </button>
          )}

          {chapter.modelType === 'ingenuity' && (
            <div className="flex items-center bg-[#090E1F]/90 border border-[#1B2540] p-1 rounded-xl text-xs font-mono shadow-lg">
              <button
                onClick={() => setActiveSpeedMode('mars')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  activeSpeedMode === 'mars'
                    ? 'bg-[#F97316] text-white font-semibold'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Mars (2,400 RPM)
              </button>
              <button
                onClick={() => setActiveSpeedMode('earth')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  activeSpeedMode === 'earth'
                    ? 'bg-[#131A33] text-[#38BDF8] font-semibold'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Earth Test (450 RPM)
              </button>
            </div>
          )}

          {chapter.modelType === 'rover' && onRoverChange && (
            <div className="flex items-center bg-[#090E1F]/90 border border-[#1B2540] p-1 rounded-xl text-xs font-mono shadow-lg">
              <button
                onClick={() => onRoverChange('opportunity')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  roverSelection === 'opportunity'
                    ? 'bg-[#38BDF8] text-[#020307] font-bold'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Opportunity
              </button>
              <button
                onClick={() => onRoverChange('spirit')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  roverSelection === 'spirit'
                    ? 'bg-[#F97316] text-white font-bold'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Spirit
              </button>
            </div>
          )}
        </div>

        <div className="hidden md:block text-[11px] font-mono text-[#94A3B8] bg-[#020307]/80 px-3 py-1 rounded-lg border border-[#1B2540]">
          PBR 3D Simulation · NASA JPL Telemetry
        </div>
      </div>
    </div>
  );
};
