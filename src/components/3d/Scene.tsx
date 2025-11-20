import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Lights } from './Lights';
import { ProjectCard } from './ProjectCard';
import { CameraController } from './CameraController';
import { projects } from '../../data/projects';

export const Scene: React.FC = () => {
  // Detect mobile device
  const isMobile = useMemo(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  // Mobile-optimized camera settings
  const cameraPosition: [number, number, number] = isMobile ? [0, 0, 8] : [0, 0, 5];
  const cameraFov = isMobile ? 60 : 75;

  return (
    <Canvas
      camera={{ position: cameraPosition, fov: cameraFov }}
      className="w-full h-full"
      dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower pixel ratio on mobile for better performance
      performance={{ min: 0.5 }} // Allow performance throttling
      gl={{
        powerPreference: 'high-performance',
        antialias: !isMobile, // Disable antialiasing on mobile for performance
        stencil: false,
        depth: true,
      }}
    >
      <color attach="background" args={['#111827']} />
      <CameraController isMobile={isMobile} />
      <Lights />
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          position={project.position}
          title={project.title}
          description={project.description}
          isHero={project.isHero}
        />
      ))}
    </Canvas>
  );
};
