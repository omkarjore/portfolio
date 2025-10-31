import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useProjectContext } from '../../context/ProjectContext';

interface ProjectCardProps {
  id: string;
  position: [number, number, number];
  title: string;
  description: string;
  isHero?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  position,
  title,
  isHero = false,
}) => {
  const { expandProject } = useProjectContext();
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Hero-specific styling
  const cardSize: [number, number, number] = isHero ? [2.4, 3, 0.1] : [2, 2.5, 0.1];
  const baseColor = isHero ? '#06b6d4' : '#3b82f6';
  const hoverColor = isHero ? '#0891b2' : '#2563eb';
  const hoverScale = isHero ? 1.15 : 1.1;

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
      onClick={() => expandProject(id)}
      scale={hovered ? hoverScale : 1}
    >
      <boxGeometry args={cardSize} />
      <meshStandardMaterial
        color={hovered ? hoverColor : baseColor}
        emissive={isHero ? '#06b6d4' : '#000000'}
        emissiveIntensity={isHero ? 0.2 : 0}
      />

      <Text
        position={[0, 0, 0.06]}
        fontSize={isHero ? 0.35 : 0.3}
        color="#ffffff"
        maxWidth={isHero ? 2.2 : 1.8}
        textAlign="center"
      >
        {title}
      </Text>
    </mesh>
  );
};
