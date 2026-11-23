import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  /** Desactiva la inclinación reactiva en pantallas táctiles / móviles. */
  interactive: boolean;
}

function buildGlobeLines(radius = 1.015) {
  const lines: THREE.Vector3[][] = [];

  [-60, -30, 0, 30, 60].forEach((latitude) => {
    const lat = (latitude * Math.PI) / 180;
    const ringRadius = Math.cos(lat) * radius;
    const y = Math.sin(lat) * radius;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 72; i += 1) {
      const angle = (i / 72) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * ringRadius,
          y,
          Math.sin(angle) * ringRadius,
        ),
      );
    }
    lines.push(points);
  });

  for (let meridian = 0; meridian < 12; meridian += 1) {
    const longitude = (meridian / 12) * Math.PI * 2;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 48; i += 1) {
      const latitude = -Math.PI / 2 + (i / 48) * Math.PI;
      points.push(
        new THREE.Vector3(
          Math.cos(latitude) * Math.cos(longitude) * radius,
          Math.sin(latitude) * radius,
          Math.cos(latitude) * Math.sin(longitude) * radius,
        ),
      );
    }
    lines.push(points);
  }

  return lines;
}

function GlobeMesh({ interactive }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const lines = useMemo(() => buildGlobeLines(), []);

  useFrame((state, delta) => {
    const mesh = group.current;
    if (!mesh) return;
    mesh.rotation.y += delta * 0.26;
    if (interactive) {
      mesh.rotation.x = THREE.MathUtils.lerp(
        mesh.rotation.x,
        -state.pointer.y * 0.18,
        0.05,
      );
      mesh.rotation.z = THREE.MathUtils.lerp(
        mesh.rotation.z,
        -state.pointer.x * 0.1,
        0.05,
      );
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1, 48, 32]} />
        <meshStandardMaterial color="#38b2f6" roughness={0.42} metalness={0.08} />
      </mesh>

      {lines.map((points, index) => (
        <Line
          key={index}
          points={points}
          color="#f3d800"
          lineWidth={2.2}
          transparent
          opacity={0.96}
        />
      ))}

      <mesh rotation={[Math.PI / 2.7, 0.2, 0]}>
        <torusGeometry args={[1.42, 0.012, 8, 120]} />
        <meshBasicMaterial color="#00a3e0" transparent opacity={0.72} />
      </mesh>
      <mesh rotation={[Math.PI / 1.9, -0.4, 0.3]}>
        <torusGeometry args={[1.55, 0.008, 8, 120]} />
        <meshBasicMaterial color="#f3d800" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function GlobalGlobe3DScene({ interactive }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.6], fov: 40 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={1.15} />
      <directionalLight position={[3, 4, 5]} intensity={2.1} color="#ffffff" />
      <GlobeMesh interactive={interactive} />
    </Canvas>
  );
}
