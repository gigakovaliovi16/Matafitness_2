import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useLenis } from '../scroll/LenisProvider';
import { SceneDirector } from './SceneDirector';

export function SceneRoot() {
  const { reducedMotion } = useLenis();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at center, #11111c 0%, #0b0b18 70%)' }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42, near: 0.1, far: 100 }}
        dpr={reducedMotion ? [1, 1] : [1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reducedMotion ? 'demand' : 'always'}
      >
        <color attach="background" args={['#0b0b18']} />
        <fog attach="fog" args={['#0b0b18', 8, 28]} />
        <ambientLight intensity={0.18} />
        <directionalLight position={[3, 4, 5]} intensity={0.6} color="#ffd9a8" />
        <pointLight position={[-4, 2, 3]} intensity={0.9} color="#f7931e" distance={20} decay={2} />
        <Suspense fallback={null}>
          <SceneDirector />
        </Suspense>
      </Canvas>
    </div>
  );
}
