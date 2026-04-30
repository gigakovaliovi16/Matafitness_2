import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { PhoneModel } from '../phone/PhoneModel';
import { ScreenFlipbook } from '../phone/ScreenFlipbook';
import { useStageProgress } from '../useStageProgress';

const PHONE_W = 1.4;
const PHONE_H = 2.85;
const BEZEL = 0.06;

export function StagePortal({ windowRange }: { windowRange: [number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const getStage = useStageProgress(windowRange);

  useFrame(() => {
    const { active, local } = getStage();
    if (!groupRef.current) return;
    groupRef.current.visible = active > 0.001;
    // Tilt: -18° → +18° across the section
    const yaw = THREE.MathUtils.degToRad(-18 + local * 36);
    const pitch = THREE.MathUtils.degToRad(8 - local * 4);
    groupRef.current.rotation.set(pitch, yaw, 0);
    // Push toward camera at center, drift back at edges
    const z = -1.2 + Math.sin(local * Math.PI) * 0.6;
    groupRef.current.position.set(0, -0.1 + (local - 0.5) * 0.4, z);
    groupRef.current.scale.setScalar(0.9 + active * 0.2);
  });

  return (
    <group ref={groupRef}>
      <PhoneModel width={PHONE_W} height={PHONE_H} bezel={BEZEL}>
        <ScreenFlipbook size={[PHONE_W - BEZEL * 2, PHONE_H - BEZEL * 2]} />
      </PhoneModel>
    </group>
  );
}
