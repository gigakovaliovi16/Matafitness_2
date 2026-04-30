import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useStageProgress } from '../useStageProgress';

/** Soft drifting particle field for the testimonials section. */
export function StageVoices({ windowRange }: { windowRange: [number, number] }) {
  const ptsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);
  const getStage = useStageProgress(windowRange);

  const geom = useMemo(() => {
    const count = 320;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((_, dt) => {
    const { active, local } = getStage();
    if (!ptsRef.current) return;
    ptsRef.current.visible = active > 0.001;
    ptsRef.current.position.x = (local - 0.5) * 0.6;
    ptsRef.current.rotation.y += dt * 0.02;
    if (matRef.current) {
      matRef.current.opacity = active * 0.7;
    }
  });

  return (
    <points ref={ptsRef} geometry={geom}>
      <pointsMaterial
        ref={matRef}
        color="#ffb04a"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}
