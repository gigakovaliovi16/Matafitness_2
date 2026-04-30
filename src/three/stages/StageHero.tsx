import { useFrame, useLoader } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { useStageProgress } from '../useStageProgress';

export function StageHero({ windowRange }: { windowRange: [number, number] }) {
  const tex = useLoader(TextureLoader, '/mata-hero-gym.png');
  const groupRef = useRef<THREE.Group>(null);
  const planeRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const getStage = useStageProgress(windowRange);

  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
  }, [tex]);

  useFrame(() => {
    const { active, local } = getStage();
    if (groupRef.current) {
      groupRef.current.position.z = -2 + local * 0.5;
      groupRef.current.position.y = -local * 0.3;
      groupRef.current.scale.setScalar(1 + local * 0.18);
      groupRef.current.visible = active > 0.001;
    }
    if (matRef.current) {
      matRef.current.opacity = active * (1 - local * 0.45);
    }
    if (planeRef.current) {
      planeRef.current.rotation.x = -0.05 + local * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={planeRef} position={[0, 0, -2]}>
        <planeGeometry args={[14, 9, 64, 36]} />
        <meshBasicMaterial ref={matRef} map={tex} transparent opacity={0.9} toneMapped={false} />
      </mesh>
      {/* amber rim glow */}
      <mesh position={[0, 0, -2.6]}>
        <planeGeometry args={[20, 14]} />
        <meshBasicMaterial
          color="#f7931e"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
