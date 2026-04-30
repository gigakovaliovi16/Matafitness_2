import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useStageProgress } from '../useStageProgress';

/** Subtle low-poly displaced terrain plane with two amber pins. */
export function StageLocations({ windowRange }: { windowRange: [number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const getStage = useStageProgress(windowRange);

  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(14, 8, 64, 36);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const h = Math.sin(x * 0.6) * 0.18 + Math.cos(y * 0.8) * 0.14 + (Math.random() - 0.5) * 0.05;
      pos.setZ(i, h);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  useFrame(() => {
    const { active, local } = getStage();
    if (!groupRef.current) return;
    groupRef.current.visible = active > 0.001;
    groupRef.current.rotation.x = -1.0 + local * 0.05;
    groupRef.current.position.y = -2 + local * 0.4;
    groupRef.current.position.z = -1;
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geom}>
        <meshStandardMaterial
          color="#141428"
          emissive="#f7931e"
          emissiveIntensity={0.08}
          roughness={0.9}
          metalness={0.0}
          wireframe={false}
        />
      </mesh>
      <mesh geometry={geom}>
        <meshBasicMaterial color="#f7931e" wireframe transparent opacity={0.18} />
      </mesh>
      {/* Two amber pins */}
      {[
        [-2.4, 0.6, 0.4],
        [2.0, -0.4, 0.4],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color="#ffb04a" toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}
