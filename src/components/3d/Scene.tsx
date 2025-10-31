import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Lights } from './Lights';
import { ProjectCard } from './ProjectCard';
import { CameraController } from './CameraController';
import { projects } from '../../data/projects';

export const Scene: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      className="w-full h-full"
    >
      <color attach="background" args={['#111827']} />
      <CameraController />
      <Lights />
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          position={project.position}
          title={project.title}
          description={project.description}
        />
      ))}
    </Canvas>
  );
};
