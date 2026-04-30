import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useStageProgress } from '../useStageProgress';

/**
 * A neon yoga-light path that draws across the scene as the manifesto scrolls.
 * Uses a TubeGeometry along a curved path with additive emissive material.
 */
export function StageManifesto({ windowRange }: { windowRange: [number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const tubeRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const getStage = useStageProgress(windowRange);

  const { tube, drawCount } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 80; i++) {
      const t = i / 80;
      const x = Math.cos(t * Math.PI * 2.4) * (1.6 + t * 0.6);
      const y = Math.sin(t * Math.PI * 1.8) * 1.6 - 0.2 + t * 0.4;
      const z = -1 + Math.sin(t * Math.PI * 3) * 0.4;
      points.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
    const tube = new THREE.TubeGeometry(curve, 240, 0.022, 8, false);
    return { tube, drawCount: tube.index ? tube.index.count : 0 };
  }, []);

  useFrame(() => {
    const { active, local } = getStage();
    if (groupRef.current) {
      groupRef.current.visible = active > 0.001;
      groupRef.current.rotation.z = local * 0.2;
      groupRef.current.position.x = (1 - local) * -0.6;
    }
    if (tube && tube.index) {
      const draw = Math.floor(local * drawCount);
      tube.setDrawRange(0, draw);
    }
    if (matRef.current) {
      matRef.current.opacity = active;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={tubeRef} geometry={tube}>
        <meshBasicMaterial
          ref={matRef}
          color="#f7931e"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      {/* glow halo */}
      <mesh geometry={tube} scale={[1.06, 1.06, 1.06]}>
        <meshBasicMaterial
          color="#ffb04a"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
