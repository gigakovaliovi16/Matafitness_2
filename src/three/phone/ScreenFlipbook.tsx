import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';

/**
 * A flipbook screen: cycles through an array of textures with a smooth
 * cross-fade. Falls back to a procedural app-like texture if the asset
 * sequence isn't present yet (initial scaffold ships without PNGs).
 */
export function ScreenFlipbook({
  size,
  paused,
  intervalMs = 1800,
}: {
  size: [number, number];
  paused?: boolean;
  intervalMs?: number;
}) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const [texs, setTexs] = useState<THREE.Texture[]>([]);
  const idxRef = useRef(0);
  const timerRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const loader = new TextureLoader();
    const load = (path: string) =>
      new Promise<THREE.Texture | null>((resolve) => {
        loader.load(
          path,
          (t) => {
            t.colorSpace = THREE.SRGBColorSpace;
            resolve(t);
          },
          undefined,
          () => resolve(null)
        );
      });
    (async () => {
      const candidates = [
        '/portal-frames/01.png',
        '/portal-frames/02.png',
        '/portal-frames/03.png',
        '/portal-frames/04.png',
        '/portal-frames/05.png',
      ];
      const results = await Promise.all(candidates.map(load));
      const real = results.filter((t): t is THREE.Texture => !!t);
      if (cancelled) return;
      if (real.length > 0) {
        setTexs(real);
      } else {
        // Procedural fallback so the screen isn't empty in the dev loop.
        setTexs([proceduralTexture(0), proceduralTexture(1), proceduralTexture(2)]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useFrame((_, dt) => {
    if (paused || texs.length === 0) return;
    timerRef.current += dt * 1000;
    if (timerRef.current > intervalMs) {
      timerRef.current = 0;
      idxRef.current = (idxRef.current + 1) % texs.length;
      if (matRef.current) matRef.current.map = texs[idxRef.current];
    }
  });

  useEffect(() => {
    if (matRef.current && texs[0]) {
      matRef.current.map = texs[0];
      matRef.current.needsUpdate = true;
    }
  }, [texs]);

  return (
    <mesh>
      <planeGeometry args={size} />
      <meshBasicMaterial ref={matRef} toneMapped={false} />
    </mesh>
  );
}

/** Procedural amber-on-navy "app screen" — used until the PNG sequence ships. */
function proceduralTexture(seed: number): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = 360;
  c.height = 740;
  const ctx = c.getContext('2d')!;
  // bg
  ctx.fillStyle = '#0b0b18';
  ctx.fillRect(0, 0, c.width, c.height);
  // header
  ctx.fillStyle = '#f7931e';
  ctx.font = '600 22px "JetBrains Mono", monospace';
  ctx.fillText('MATA', 28, 60);
  ctx.fillStyle = '#f3ede0';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText(['HOME', 'WORKOUT', 'MEALS'][seed % 3], 28, 86);
  // hero card
  ctx.fillStyle = '#141428';
  roundRect(ctx, 24, 110, 312, 200, 18);
  ctx.fill();
  ctx.fillStyle = '#f3ede0';
  ctx.font = '600 26px Georgia, serif';
  ctx.fillText(['Today’s Lift', 'Class @ 19:00', 'Meal Plan'][seed % 3], 44, 158);
  ctx.fillStyle = '#9a9aa8';
  ctx.font = '500 13px "JetBrains Mono", monospace';
  ctx.fillText('45 MIN · STRENGTH', 44, 184);
  // amber chip
  ctx.fillStyle = '#f7931e';
  roundRect(ctx, 44, 250, 110, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#0b0b18';
  ctx.font = '700 13px "JetBrains Mono", monospace';
  ctx.fillText('START', 70, 273);
  // list rows
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = '#141428';
    roundRect(ctx, 24, 340 + i * 70, 312, 60, 14);
    ctx.fill();
    ctx.fillStyle = '#f3ede0';
    ctx.font = '500 14px "JetBrains Mono", monospace';
    ctx.fillText(`SESSION ${(seed + i) * 11 + 1}`, 44, 374 + i * 70);
    ctx.fillStyle = '#9a9aa8';
    ctx.font = '500 12px "JetBrains Mono", monospace';
    ctx.fillText(`${30 + i * 5} MIN`, 44, 392 + i * 70);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
