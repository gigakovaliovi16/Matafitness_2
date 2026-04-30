import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useScrollProgress } from '../scroll/LenisProvider';
import { StageHero } from './stages/StageHero';
import { StageManifesto } from './stages/StageManifesto';
import { StagePrograms } from './stages/StagePrograms';
import { StagePortal } from './stages/StagePortal';
import { StageLocations } from './stages/StageLocations';
import { StageVoices } from './stages/StageVoices';

/**
 * Maps a global scroll progress (0..1) to camera position and per-stage opacity.
 * Each stage owns a window of progress space; outside that window it fades out.
 */
export function SceneDirector() {
  const progressRef = useScrollProgress();
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 6));
  const lookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, dt) => {
    const p = progressRef.current;

    // Camera path through the scene: dolly in slightly through hero, drift
    // sideways for manifesto/programs, push toward phone for portal,
    // pull back for the closing.
    const camX = THREE.MathUtils.lerp(0, 0.6, easeInOut(p)) * Math.sin(p * Math.PI * 1.2);
    const camY = THREE.MathUtils.lerp(0, -0.4, p);
    const camZ = 6 - 1.6 * heroEase(p) + 0.8 * Math.sin(p * Math.PI);

    target.current.set(camX, camY, camZ);
    lookAt.current.set(0, camY * 0.5, 0);

    const k = Math.min(1, dt * 4);
    camera.position.lerp(target.current, k);
    camera.lookAt(lookAt.current);
    camera.updateProjectionMatrix();
  });

  return (
    <>
      <StageHero windowRange={[0.0, 0.12]} />
      <StageManifesto windowRange={[0.1, 0.26]} />
      <StagePrograms windowRange={[0.24, 0.42]} />
      <StageVoices windowRange={[0.4, 0.56]} />
      <StagePortal windowRange={[0.55, 0.72]} />
      <StageLocations windowRange={[0.72, 0.9]} />
    </>
  );
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function heroEase(t: number) {
  return t < 0.15 ? t / 0.15 : 1;
}
