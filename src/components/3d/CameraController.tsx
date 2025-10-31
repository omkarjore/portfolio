import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';

const MIN_Z = 2;
const MAX_Z = 8;
const SCROLL_SENSITIVITY = 0.01;
const LERP_FACTOR = 0.1;

export const CameraController: React.FC = () => {
  const { camera } = useThree();
  const targetZ = useRef(5); // Initial camera Z position

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      // Update target Z based on scroll delta
      targetZ.current += event.deltaY * SCROLL_SENSITIVITY;

      // Clamp within bounds
      targetZ.current = Math.max(MIN_Z, Math.min(MAX_Z, targetZ.current));
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useFrame(() => {
    // Smooth interpolation (lerp)
    camera.position.z += (targetZ.current - camera.position.z) * LERP_FACTOR;
  });

  return null; // This component doesn't render anything
};
