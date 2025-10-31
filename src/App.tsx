import React from 'react';
import { Scene } from './components/3d/Scene';

export const App: React.FC = () => {
  return (
    <div className="h-screen w-screen">
      <Scene />
    </div>
  );
};
