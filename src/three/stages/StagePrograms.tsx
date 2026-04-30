import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useStageProgress } from '../useStageProgress';

/**
 * Six floating slabs (the "Six Rooms"), orbiting slowly with amber rim light.
 */
export function StagePrograms({ windowRange }: { windowRange: [number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const matsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const getStage = useStageProgress(windowRange);

  const slabs = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return {
          radius: 3.2,
          angle,
          y: ((i % 3) - 1) * 0.4,
          tilt: (i - 3) * 0.06,
        };
      }),
    []
  );

  useFrame((_, dt) => {
    const { active, local } = getStage();
    if (!groupRef.current) return;
    groupRef.current.visible = active > 0.001;
    groupRef.current.rotation.y += dt * 0.06;
    groupRef.current.position.z = -2 + local * 1.4;
    matsRef.current.forEach((m, i) => {
      if (!m) return;
      m.opacity = active * (0.55 + 0.45 * Math.sin(local * Math.PI + i));
    });
  });

  return (
    <group ref={groupRef}>
      {slabs.map((s, i) => {
        const x = Math.cos(s.angle) * s.radius;
        const z = Math.sin(s.angle) * s.radius;
        return (
          <mesh
            key={i}
            position={[x, s.y, z]}
            rotation={[s.tilt, -s.angle + Math.PI / 2, 0]}
          >
            <boxGeometry args={[1.4, 2.0, 0.04]} />
            <meshStandardMaterial
              ref={(m) => {
                if (m) matsRef.current[i] = m;
              }}
              color="#1c1c36"
              emissive="#f7931e"
              emissiveIntensity={0.18}
              roughness={0.55}
              metalness={0.1}
              transparent
              opacity={0.85}
            />
          </mesh>
        );
      })}
    </group>
  );
}
