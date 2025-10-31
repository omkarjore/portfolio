import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Lights } from './Lights';
import { TestBox } from './TestBox';

export const Scene: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      className="w-full h-full"
    >
      <color attach="background" args={['#111827']} />
      <Lights />
      <TestBox />
    </Canvas>
  );
};
