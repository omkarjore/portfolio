import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface ProjectCardProps {
  position: [number, number, number];
  title: string;
  description: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  position,
  title,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.15;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <boxGeometry args={[2, 2.5, 0.1]} />
      <meshStandardMaterial color={hovered ? '#2563eb' : '#3b82f6'} />

      <Text
        position={[0, 0, 0.06]}
        fontSize={0.3}
        color="#ffffff"
        maxWidth={1.8}
        textAlign="center"
      >
        {title}
      </Text>
    </mesh>
  );
};
