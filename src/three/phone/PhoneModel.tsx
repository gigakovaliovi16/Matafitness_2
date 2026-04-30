import { useMemo, type ReactNode } from 'react';
import * as THREE from 'three';

/**
 * Parametric phone bezel: a rounded-rect extrusion in dark navy with an
 * inset screen plane. Children are positioned as the screen content (a
 * mesh whose material we drive externally — the flipbook).
 */
export function PhoneModel({
  width = 1.4,
  height = 2.85,
  depth = 0.12,
  bezel = 0.06,
  radius = 0.18,
  children,
}: {
  width?: number;
  height?: number;
  depth?: number;
  bezel?: number;
  radius?: number;
  children?: ReactNode;
}) {
  const bodyGeom = useMemo(() => {
    const shape = roundedRectShape(width, height, radius);
    return new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 4,
    });
  }, [width, height, depth, radius]);

  const screenW = width - bezel * 2;
  const screenH = height - bezel * 2;

  return (
    <group>
      {/* Body */}
      <mesh geometry={bodyGeom} castShadow receiveShadow>
        <meshStandardMaterial color="#0b0b18" metalness={0.6} roughness={0.32} />
      </mesh>

      {/* Screen content (flipbook plane) sits clearly above the body face */}
      <group position={[0, 0, depth + 0.01]}>
        <mesh renderOrder={1}>
          <planeGeometry args={[screenW, screenH]} />
          <meshBasicMaterial color="#0b0b18" toneMapped={false} depthTest={false} />
        </mesh>
        <group position={[0, 0, 0.001]}>{children}</group>
      </group>

      {/* Notch */}
      <mesh position={[0, height / 2 - bezel - 0.06, depth + 0.02]} renderOrder={2}>
        <planeGeometry args={[0.34, 0.05]} />
        <meshBasicMaterial color="#0b0b18" depthTest={false} />
      </mesh>

      {/* Amber rim glow */}
      <mesh scale={[1.04, 1.02, 1]} position={[0, 0, -0.02]}>
        <planeGeometry args={[width * 1.5, height * 1.4]} />
        <meshBasicMaterial
          color="#f7931e"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function roundedRectShape(w: number, h: number, r: number) {
  const x = -w / 2;
  const y = -h / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}
