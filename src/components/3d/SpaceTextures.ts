import * as THREE from 'three';

// Generates procedural canvas textures for hyper-realistic space materials
// (Zero 404 dependencies, 100% generated in client memory)

export function generateKaptonFoilTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Base gold foil color
  ctx.fillStyle = '#E5A932';
  ctx.fillRect(0, 0, 512, 512);

  // Procedural foil wrinkles & crinkles
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const len = 15 + Math.random() * 45;
    const angle = Math.random() * Math.PI * 2;

    ctx.strokeStyle = Math.random() > 0.5 ? 'rgba(255, 230, 150, 0.25)' : 'rgba(90, 50, 10, 0.22)';
    ctx.lineWidth = 1 + Math.random() * 2.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
    ctx.stroke();
  }

  // Crinkle noise
  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 22;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise * 0.8));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise * 0.4));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function generateSolarCellTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Deep space-grade gallium arsenide purple-blue
  ctx.fillStyle = '#0F1A34';
  ctx.fillRect(0, 0, 512, 512);

  // Solar grid lines (busbars and fingers)
  const cellSize = 64;
  ctx.strokeStyle = '#253E75';
  ctx.lineWidth = 2;

  for (let x = 0; x <= 512; x += cellSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }
  for (let y = 0; y <= 512; y += cellSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  // Fine silver conductor fingers
  ctx.strokeStyle = 'rgba(200, 225, 255, 0.4)';
  ctx.lineWidth = 0.8;
  for (let y = 0; y <= 512; y += 8) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function generateBrushedMetalNormal(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = 'rgb(128, 128, 255)'; // Neutral normal
  ctx.fillRect(0, 0, 256, 256);

  // Fine streaks for anisotropic lathe/brush look
  for (let i = 0; i < 300; i++) {
    const y = Math.random() * 256;
    const variation = (Math.random() - 0.5) * 40;
    ctx.strokeStyle = `rgb(${128 + variation}, 128, 255)`;
    ctx.lineWidth = 1 + Math.random();
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}
