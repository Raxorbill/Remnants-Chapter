import * as THREE from 'three';
import { generateKaptonFoilTexture, generateSolarCellTexture, generateBrushedMetalNormal } from './SpaceTextures';

export function createAerospaceMaterials() {
  const foilTexture = generateKaptonFoilTexture();
  const solarTexture = generateSolarCellTexture();
  const metalNormal = generateBrushedMetalNormal();

  // Multi-layer Insulation (MLI) gold foil blanket with wrinkles
  const goldFoilMaterial = new THREE.MeshStandardMaterial({
    color: 0xEEBA38,
    metalness: 0.88,
    roughness: 0.28,
    bumpMap: foilTexture,
    bumpScale: 0.04
  });

  // Aerospace milled aluminum alloy (anisotropic brushed look)
  const milledAluminumMaterial = new THREE.MeshStandardMaterial({
    color: 0xD0D5DD,
    metalness: 0.85,
    roughness: 0.25,
    normalMap: metalNormal,
    normalScale: new THREE.Vector2(0.3, 0.3)
  });

  // Dark anodized aerospace titanium & graphite
  const darkTitaniumMaterial = new THREE.MeshStandardMaterial({
    color: 0x1E222D,
    metalness: 0.7,
    roughness: 0.45
  });

  // Fused-silica corner-cube quartz glass (real physical transmission)
  const quartzPrismMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xF0F9FF,
    metalness: 0.05,
    roughness: 0.02,
    transmission: 0.92,
    thickness: 1.2,
    ior: 1.54,
    reflectivity: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03
  });

  // Deep-space photovoltaic silicon solar array with busbars & grid
  const solarCellMaterial = new THREE.MeshStandardMaterial({
    map: solarTexture,
    metalness: 0.8,
    roughness: 0.18,
    bumpMap: solarTexture,
    bumpScale: 0.015
  });

  // The Golden Record (ultra-polished electroplated gold)
  const goldenRecordMaterial = new THREE.MeshStandardMaterial({
    color: 0xF5BA24,
    metalness: 0.96,
    roughness: 0.14
  });

  // Lightweight carbon-fiber composite
  const carbonFiberMaterial = new THREE.MeshStandardMaterial({
    color: 0x14171E,
    metalness: 0.35,
    roughness: 0.55
  });

  // White thermal ceramic / High-gain reflector dish
  const whiteCeramicMaterial = new THREE.MeshStandardMaterial({
    color: 0xF1F5F9,
    metalness: 0.12,
    roughness: 0.28
  });

  // Contact grounding plane
  const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x020408,
    transparent: true,
    opacity: 0.65
  });

  return {
    mylar: goldFoilMaterial,
    aluminum: milledAluminumMaterial,
    darkTitanium: darkTitaniumMaterial,
    quartz: quartzPrismMaterial,
    solarCell: solarCellMaterial,
    gold: goldenRecordMaterial,
    carbon: carbonFiberMaterial,
    whiteCeramic: whiteCeramicMaterial,
    shadow: shadowMaterial
  };
}

export interface ModelAnimationHooks {
  update?: (time: number, delta: number) => void;
  setSpeedMultiplier?: (mult: number) => void;
  triggerVibration?: (intensity: number) => void;
}

// 1. Apollo 11 Lunar Laser Retroreflector (LRRR)
export function buildRetroreflectorModel(mats: ReturnType<typeof createAerospaceMaterials>): { group: THREE.Group; hooks: ModelAnimationHooks } {
  const group = new THREE.Group();
  group.name = 'retroreflector_model';

  // Base tray: 45-degree angled mounting frame with support hinges
  const baseFrame = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.14, 1.4), mats.aluminum);
  baseFrame.position.set(0, 0.1, 0);
  baseFrame.rotation.x = 0.38; // Angled precisely toward Earth
  group.add(baseFrame);

  // Teflon/Mylar insulated bed
  const palletSurface = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 1.3), mats.mylar);
  palletSurface.position.set(0, 0.14, 0);
  palletSurface.rotation.x = 0.38;
  group.add(palletSurface);

  // 10x10 array of corner-cube silica prisms
  const prismGroup = new THREE.Group();
  prismGroup.rotation.x = 0.38;
  prismGroup.position.set(0, 0.18, 0);

  const rows = 10;
  const cols = 10;
  const spacingX = 0.13;
  const spacingZ = 0.11;
  const startX = -((cols - 1) * spacingX) / 2;
  const startZ = -((rows - 1) * spacingZ) / 2;

  const prismGeom = new THREE.CylinderGeometry(0.048, 0.042, 0.06, 6);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const prism = new THREE.Mesh(prismGeom, mats.quartz);
      prism.position.set(startX + c * spacingX, 0, startZ + r * spacingZ);
      prismGroup.add(prism);
    }
  }
  group.add(prismGroup);

  // Sun alignment gnomon mast
  const gnomonMast = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.5, 12), mats.aluminum);
  gnomonMast.position.set(-0.6, 0.4, 0.1);
  group.add(gnomonMast);

  const gnomonDial = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.02, 16), mats.darkTitanium);
  gnomonDial.position.set(-0.6, 0.16, 0.1);
  group.add(gnomonDial);

  // Tubular aluminum deployment struts
  const legGeom = new THREE.CylinderGeometry(0.028, 0.035, 0.7, 12);
  const leg1 = new THREE.Mesh(legGeom, mats.aluminum);
  leg1.position.set(-0.7, -0.18, -0.5);
  leg1.rotation.z = 0.22;
  const leg2 = new THREE.Mesh(legGeom, mats.aluminum);
  leg2.position.set(0.7, -0.18, -0.5);
  leg2.rotation.z = -0.22;
  const leg3 = new THREE.Mesh(legGeom, mats.aluminum);
  leg3.position.set(0, -0.18, 0.6);
  leg3.rotation.x = -0.35;
  group.add(leg1, leg2, leg3);

  // Ground contact shadow
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(1.2, 32), mats.shadow);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.52;
  group.add(shadow);

  return { group, hooks: {} };
}

// 2. Apollo ALSEP Seismometer Station (PSE)
export function buildSeismometerModel(mats: ReturnType<typeof createAerospaceMaterials>): { group: THREE.Group; hooks: ModelAnimationHooks } {
  const group = new THREE.Group();
  group.name = 'seismometer_model';

  // Central Station box wrapped in wrinkled gold thermal foil
  const centralBox = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.55, 0.8), mats.mylar);
  centralBox.position.set(-0.2, 0.08, -0.1);
  group.add(centralBox);

  // White thermal radiator top plate
  const radiatorTop = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.05, 0.88), mats.whiteCeramic);
  radiatorTop.position.set(-0.2, 0.38, -0.1);
  group.add(radiatorTop);

  // High-gain Helical Antenna Mast
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.9, 12), mats.aluminum);
  mast.position.set(-0.2, 0.82, -0.1);
  group.add(mast);

  // Helical spiral antenna coil
  const helixCoil = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.45, 16, 1, true), mats.gold);
  helixCoil.position.set(-0.2, 1.25, -0.1);
  group.add(helixCoil);

  // SNAP-27 RTG Nuclear Power Generator (Graphite cask + 8 radial cooling fins)
  const rtgCylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.52, 24), mats.darkTitanium);
  rtgCylinder.position.set(-0.85, 0.04, 0.2);
  group.add(rtgCylinder);

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.48, 0.14), mats.aluminum);
    fin.position.set(-0.85 + Math.cos(angle) * 0.22, 0.04, 0.2 + Math.sin(angle) * 0.22);
    fin.rotation.y = -angle;
    group.add(fin);
  }

  // Thick braided power cable from RTG to Central Station
  const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.65, 8), mats.darkTitanium);
  cable.position.set(-0.52, -0.15, 0.05);
  cable.rotation.z = Math.PI / 2 + 0.18;
  group.add(cable);

  // Seismometer unit (Cylindrical sensor drum with gold Mylar shroud & leveling bubble)
  const seismometerGroup = new THREE.Group();
  seismometerGroup.position.set(0.75, -0.05, 0.3);

  const seismoBase = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.3, 0.14, 24), mats.mylar);
  seismometerGroup.add(seismoBase);

  const seismoDome = new THREE.Mesh(new THREE.SphereGeometry(0.23, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), mats.aluminum);
  seismoDome.position.y = 0.07;
  seismometerGroup.add(seismoDome);

  const sensorMast = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.28, 8), mats.darkTitanium);
  sensorMast.position.y = 0.28;
  seismometerGroup.add(sensorMast);

  group.add(seismometerGroup);

  // Ribbon cable to seismometer
  const cable2 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.75, 8), mats.darkTitanium);
  cable2.position.set(0.3, -0.16, 0.15);
  cable2.rotation.z = Math.PI / 2 - 0.25;
  group.add(cable2);

  // Ground shadow
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(1.4, 32), mats.shadow);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.24;
  group.add(shadow);

  let vibrateTime = 0;
  let vibrateIntensity = 0;

  const hooks: ModelAnimationHooks = {
    triggerVibration: (intensity: number) => {
      vibrateIntensity = intensity;
      vibrateTime = 0;
    },
    update: (_time: number, delta: number) => {
      if (vibrateIntensity > 0.001) {
        vibrateTime += delta * 45;
        const offset = Math.sin(vibrateTime) * 0.025 * vibrateIntensity;
        seismometerGroup.position.x = 0.75 + offset;
        seismometerGroup.position.y = -0.05 + Math.cos(vibrateTime * 1.5) * 0.012 * vibrateIntensity;
        vibrateIntensity = Math.max(0, vibrateIntensity - delta * 0.85);
      }
    }
  };

  return { group, hooks };
}

// 3. Viking Lander (Mars 1976)
export function buildVikingLanderModel(mats: ReturnType<typeof createAerospaceMaterials>): { group: THREE.Group; hooks: ModelAnimationHooks } {
  const group = new THREE.Group();
  group.name = 'viking_lander_model';

  // Hexagonal chassis with aerospace aluminum and white thermal blankets
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.82, 0.48, 6), mats.aluminum);
  body.position.set(0, 0.28, 0);
  group.add(body);

  const deck = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 0.08, 6), mats.mylar);
  deck.position.set(0, 0.54, 0);
  group.add(deck);

  // 3 Articulated Landing Legs with inverted dish footpads
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    const legGroup = new THREE.Group();
    legGroup.position.set(Math.cos(angle) * 0.65, 0.18, Math.sin(angle) * 0.65);
    legGroup.rotation.y = -angle;

    const footpad = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.16, 0.07, 16), mats.aluminum);
    footpad.position.set(0.75, -0.48, 0);
    legGroup.add(footpad);

    const shockStrut = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.95, 12), mats.darkTitanium);
    shockStrut.position.set(0.38, -0.16, 0);
    shockStrut.rotation.z = -0.85;
    legGroup.add(shockStrut);

    group.add(legGroup);
  }

  // 3-meter Surface Sampler Boom & Scoop Bucket
  const boomBase = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.22), mats.darkTitanium);
  boomBase.position.set(0.6, 0.38, 0.32);
  group.add(boomBase);

  const samplerArm = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.95, 12), mats.aluminum);
  samplerArm.position.set(0.95, 0.12, 0.5);
  samplerArm.rotation.x = 0.42;
  samplerArm.rotation.z = -0.58;
  group.add(samplerArm);

  const scoopBucket = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.07, 0.14), mats.aluminum);
  scoopBucket.position.set(1.3, -0.2, 0.68);
  group.add(scoopBucket);

  // Stereo Facsimile Scanning Cameras
  const cam1 = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.4, 16), mats.darkTitanium);
  cam1.position.set(-0.38, 0.74, 0.22);
  const cam2 = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.4, 16), mats.darkTitanium);
  cam2.position.set(0.18, 0.74, -0.38);
  group.add(cam1, cam2);

  // Parabolic High-Gain Dish Antenna
  const dish = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2.3), mats.whiteCeramic);
  dish.position.set(-0.16, 0.78, -0.16);
  dish.rotation.x = -0.55;
  dish.rotation.y = 0.45;
  group.add(dish);

  // Ground shadow
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(1.5, 32), mats.shadow);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.35;
  group.add(shadow);

  return { group, hooks: {} };
}

// 4. Mars Exploration Rovers (Spirit & Opportunity)
export function buildMerRoverModel(mats: ReturnType<typeof createAerospaceMaterials>): { group: THREE.Group; hooks: ModelAnimationHooks } {
  const group = new THREE.Group();
  group.name = 'mer_rover_model';

  // Triangular chassis wrapped in gold thermal foil
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.32, 0.8), mats.mylar);
  chassis.position.set(0, 0.16, 0);
  group.add(chassis);

  // Bat-wing Photovoltaic Solar Array deck
  const solarDeck = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.035, 1.3), mats.solarCell);
  solarDeck.position.set(0, 0.34, 0);
  group.add(solarDeck);

  // Pancam Mast Assembly (PMA)
  const pmaMast = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.8, 12), mats.aluminum);
  pmaMast.position.set(0.22, 0.74, 0.32);
  group.add(pmaMast);

  const pancamHead = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.09, 0.12), mats.darkTitanium);
  pancamHead.position.set(0.22, 1.15, 0.32);
  group.add(pancamHead);

  // Dual stereo camera optics
  const lens1 = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.045, 12), mats.quartz);
  lens1.position.set(0.15, 1.15, 0.38);
  lens1.rotation.x = Math.PI / 2;
  const lens2 = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.045, 12), mats.quartz);
  lens2.position.set(0.29, 1.15, 0.38);
  lens2.rotation.x = Math.PI / 2;
  group.add(lens1, lens2);

  // Robotic Arm (IDD) with Rock Abrasion Tool (RAT)
  const armJoint1 = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.4, 12), mats.aluminum);
  armJoint1.position.set(0.46, 0.12, 0.38);
  armJoint1.rotation.x = 0.52;
  armJoint1.rotation.z = -0.42;
  group.add(armJoint1);

  const armJoint2 = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.35, 12), mats.aluminum);
  armJoint2.position.set(0.6, -0.04, 0.52);
  armJoint2.rotation.x = 0.85;
  group.add(armJoint2);

  const ratTool = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.09, 16), mats.darkTitanium);
  ratTool.position.set(0.68, -0.16, 0.64);
  ratTool.rotation.x = Math.PI / 2;
  group.add(ratTool);

  // Rocker-Bogie 6-Wheel articulated drive with grooved treads
  const wheelGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.09, 20);
  const wheelPositions = [
    [-0.65, -0.16, -0.48],
    [-0.7, -0.16, 0.0],
    [-0.65, -0.16, 0.48],
    [0.65, -0.16, -0.48],
    [0.7, -0.16, 0.0],
    [0.65, -0.16, 0.48]
  ];

  wheelPositions.forEach(([x, y, z]) => {
    const wheel = new THREE.Mesh(wheelGeom, mats.aluminum);
    wheel.position.set(x, y, z);
    wheel.rotation.z = Math.PI / 2;
    group.add(wheel);

    const bogieStrut = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.38, 8), mats.darkTitanium);
    bogieStrut.position.set(x * 0.78, y + 0.14, z);
    group.add(bogieStrut);
  });

  // Ground shadow
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(1.3, 32), mats.shadow);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.29;
  group.add(shadow);

  return { group, hooks: {} };
}

// 5. Ingenuity Mars Helicopter ("Ginny")
export function buildIngenuityModel(mats: ReturnType<typeof createAerospaceMaterials>): { group: THREE.Group; hooks: ModelAnimationHooks } {
  const group = new THREE.Group();
  group.name = 'ingenuity_model';

  // Fuselage cube (gold Mylar insulation)
  const fuselage = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.4, 0.38), mats.mylar);
  fuselage.position.set(0, 0.12, 0);
  group.add(fuselage);

  // Mast pole
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.019, 0.019, 0.8, 12), mats.aluminum);
  mast.position.set(0, 0.55, 0);
  group.add(mast);

  // Solar panel slab atop mast
  const solarPanel = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.022, 0.32), mats.solarCell);
  solarPanel.position.set(0, 0.94, 0);
  group.add(solarPanel);

  // Antenna wire atop solar panel
  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.28, 6), mats.aluminum);
  antenna.position.set(0, 1.1, 0);
  group.add(antenna);

  // Counter-rotating coaxial rotors
  const rotorGroupLower = new THREE.Group();
  rotorGroupLower.position.set(0, 0.45, 0);

  const rotorGroupUpper = new THREE.Group();
  rotorGroupUpper.position.set(0, 0.68, 0);

  // Airfoil shaped carbon-fiber blades (1.2m scale)
  const bladeGeom = new THREE.BoxGeometry(1.35, 0.016, 0.09);

  const bladeLower = new THREE.Mesh(bladeGeom, mats.carbon);
  rotorGroupLower.add(bladeLower);

  const bladeUpper = new THREE.Mesh(bladeGeom, mats.carbon);
  rotorGroupUpper.add(bladeUpper);

  group.add(rotorGroupLower);
  group.add(rotorGroupUpper);

  // 4 Carbon-fiber landing legs with compliance footpads
  const legGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.6, 8);
  const legAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];

  legAngles.forEach((ang) => {
    const leg = new THREE.Mesh(legGeom, mats.carbon);
    leg.position.set(Math.cos(ang) * 0.28, -0.16, Math.sin(ang) * 0.28);
    leg.rotation.x = Math.sin(ang) * 0.68;
    leg.rotation.z = -Math.cos(ang) * 0.68;
    group.add(leg);

    const foot = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 8), mats.darkTitanium);
    foot.position.set(Math.cos(ang) * 0.46, -0.42, Math.sin(ang) * 0.46);
    group.add(foot);
  });

  // Downward-facing navigation camera
  const navCam = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.045, 16), mats.quartz);
  navCam.position.set(0, -0.09, 0.09);
  group.add(navCam);

  // Ground shadow
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.75, 32), mats.shadow);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.44;
  group.add(shadow);

  let speedMultiplier = 1.0;

  const hooks: ModelAnimationHooks = {
    setSpeedMultiplier: (mult: number) => {
      speedMultiplier = mult;
    },
    update: (_time: number, delta: number) => {
      const speed = delta * 14.0 * speedMultiplier;
      rotorGroupLower.rotation.y += speed;
      rotorGroupUpper.rotation.y -= speed;
    }
  };

  return { group, hooks };
}

// 6. Voyager 1 Interstellar Spacecraft
export function buildVoyagerModel(mats: ReturnType<typeof createAerospaceMaterials>): { group: THREE.Group; hooks: ModelAnimationHooks } {
  const group = new THREE.Group();
  group.name = 'voyager_model';

  // 10-sided bus equipment bay
  const bus = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.38, 10), mats.mylar);
  bus.position.set(0, -0.12, 0);
  group.add(bus);

  // 3.7m Parabolic High-Gain Antenna (HGA) Dish
  const dish = new THREE.Mesh(new THREE.SphereGeometry(1.45, 36, 20, 0, Math.PI * 2, 0, Math.PI / 2.7), mats.whiteCeramic);
  dish.position.set(0, 0.38, 0);
  dish.rotation.x = Math.PI; // Bowl facing forward toward Earth
  group.add(dish);

  // Sub-reflector feed tripod and horn
  const feedTripod = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.6, 8), mats.aluminum);
  feedTripod.position.set(0, 0.72, 0);
  group.add(feedTripod);

  const subReflector = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), mats.darkTitanium);
  subReflector.position.set(0, 1.05, 0);
  group.add(subReflector);

  // The Golden Record (Gold-plated copper phonograph record)
  const goldenRecord = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.022, 36), mats.gold);
  goldenRecord.position.set(0.38, -0.12, 0.46);
  goldenRecord.rotation.x = Math.PI / 2;
  goldenRecord.rotation.y = 0.35;
  group.add(goldenRecord);

  // RTG nuclear power boom (3 radioactive plutonium canisters)
  const rtgBoom = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.95, 8), mats.aluminum);
  rtgBoom.position.set(-0.7, -0.16, -0.38);
  rtgBoom.rotation.z = Math.PI / 3;
  group.add(rtgBoom);

  for (let i = 0; i < 3; i++) {
    const canister = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.24, 16), mats.darkTitanium);
    canister.position.set(-1.02 - i * 0.13, -0.38 - i * 0.08, -0.55);
    group.add(canister);
  }

  // 13-meter Magnetometer boom extending far into space
  const magBoom = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.016, 2.0, 8), mats.aluminum);
  magBoom.position.set(0.95, -0.22, -0.65);
  magBoom.rotation.z = -Math.PI / 4;
  magBoom.rotation.y = 0.32;
  group.add(magBoom);

  const magSensor = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.16), mats.mylar);
  magSensor.position.set(1.65, -0.92, -0.95);
  group.add(magSensor);

  return { group, hooks: {} };
}
