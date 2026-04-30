import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { PhoneModel } from '../phone/PhoneModel';
import { ScreenFlipbook } from '../phone/ScreenFlipbook';
import { useStageProgress } from '../useStageProgress';

const PHONE_W = 1.0;
const PHONE_H = 2.05;
const BEZEL = 0.05;

export function StagePortal({ windowRange }: { windowRange: [number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const getStage = useStageProgress(windowRange);

  useFrame(() => {
    const { active, local } = getStage();
    if (!groupRef.current) return;
    groupRef.current.visible = active > 0.001;
    // Tilt: -14° → +14° across the section
    const yaw = THREE.MathUtils.degToRad(-14 + local * 28);
    const pitch = THREE.MathUtils.degToRad(6 - local * 4);
    groupRef.current.rotation.set(pitch, yaw, 0);
    // Sit on the right column of the layout, gently floating
    const z = -3.4 + Math.sin(local * Math.PI) * 0.3;
    const x = 1.6 + (local - 0.5) * 0.2;
    const y = -0.1 + (local - 0.5) * 0.2;
    groupRef.current.position.set(x, y, z);
    groupRef.current.scale.setScalar(0.85 + active * 0.1);
  });

  return (
    <group ref={groupRef}>
      <PhoneModel width={PHONE_W} height={PHONE_H} bezel={BEZEL}>
        <ScreenFlipbook size={[PHONE_W - BEZEL * 2, PHONE_H - BEZEL * 2]} />
      </PhoneModel>
    </group>
  );
}
