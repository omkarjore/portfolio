import React from 'react';
import { Scene } from './components/3d/Scene';
import { ProjectModal } from './components/ui/ProjectModal';

export const App: React.FC = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Scene />
      <ProjectModal />
    </div>
  );
};
