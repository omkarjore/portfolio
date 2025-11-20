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

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  position,
  title,
  isHero = false,
}) => {
  const { expandProject } = useProjectContext();
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const clickTime = useRef(0);

  // Hero-specific styling
  const cardSize: [number, number, number] = isHero ? [2.4, 3, 0.1] : [2, 2.5, 0.1];
  const baseColor = isHero ? '#06b6d4' : '#3b82f6';
  const hoverColor = isHero ? '#0891b2' : '#2563eb';
  const hoverScale = isHero ? 1.15 : 1.1;

  // Create particle burst on click
  const createParticleBurst = () => {
    const newParticles: Particle[] = [];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = 2 + Math.random() * 2;
      newParticles.push({
        position: new THREE.Vector3(position[0], position[1], position[2]),
        velocity: new THREE.Vector3(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          (Math.random() - 0.5) * 2
        ),
        life: 1.0,
      });
    }
    setParticles(newParticles);
  };

  // Handle click with animation
  const handleClick = () => {
    setClicked(true);
    clickTime.current = Date.now();
    createParticleBurst();

    // Reset click animation after delay
    setTimeout(() => {
      setClicked(false);
      expandProject(id);
    }, 300);
  };

  // Floating animation + click animation + particle updates
  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      const floatY = position[1] + Math.sin(state.clock.elapsedTime) * 0.15;
      meshRef.current.position.y = floatY;

      // Click pulse animation
      if (clicked) {
        const elapsed = (Date.now() - clickTime.current) / 300;
        const pulse = Math.sin(elapsed * Math.PI);
        meshRef.current.scale.setScalar((hovered ? hoverScale : 1) + pulse * 0.3);
        meshRef.current.rotation.z = pulse * 0.2;
      } else {
        meshRef.current.rotation.z = 0;
      }
    }

    // Ripple ring animation on hover
    if (ringRef.current && hovered) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      ringRef.current.scale.setScalar(scale);
      ringRef.current.rotation.z += 0.02;
    }

    // Pulsing glow on hover
    if (glowRef.current && hovered) {
      const glowIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glowIntensity;
    }

    // Update particles
    setParticles((prevParticles) =>
      prevParticles
        .map((particle) => ({
          ...particle,
          position: particle.position.clone().add(particle.velocity.clone().multiplyScalar(0.016)),
          velocity: particle.velocity.clone().multiplyScalar(0.95),
          life: particle.life - 0.016,
        }))
        .filter((particle) => particle.life > 0)
    );
  });

  return (
    <group>
      {/* Main Card */}
      <mesh
        ref={meshRef}
        position={position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={handleClick}
        scale={hovered ? hoverScale : 1}
      >
        <boxGeometry args={cardSize} />
        <meshStandardMaterial
          color={hovered ? hoverColor : baseColor}
          emissive={isHero ? '#06b6d4' : '#000000'}
          emissiveIntensity={isHero ? (hovered ? 0.4 : 0.2) : 0}
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

      {/* Glow effect on hover */}
      {hovered && (
        <mesh ref={glowRef} position={position}>
          <boxGeometry args={[cardSize[0] * 1.1, cardSize[1] * 1.1, cardSize[2]]} />
          <meshBasicMaterial
            color={isHero ? '#06b6d4' : '#3b82f6'}
            transparent
            opacity={0.3}
          />
        </mesh>
      )}

      {/* Ripple ring on hover */}
      {hovered && (
        <mesh ref={ringRef} position={[position[0], position[1], position[2] - 0.1]} rotation={[0, 0, 0]}>
          <ringGeometry args={[cardSize[0] * 0.6, cardSize[0] * 0.7, 32]} />
          <meshBasicMaterial
            color={isHero ? '#06b6d4' : '#3b82f6'}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Particle burst on click */}
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial
            color={isHero ? '#06b6d4' : '#3b82f6'}
            transparent
            opacity={particle.life}
          />
        </mesh>
      ))}
    </group>
  );
};
