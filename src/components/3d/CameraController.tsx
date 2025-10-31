import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';

const MIN_Z = 2;
const MAX_Z = 8;
const SCROLL_SENSITIVITY = 0.01;
const TOUCH_SENSITIVITY = 0.02;
const LERP_FACTOR = 0.1;

export const CameraController: React.FC = () => {
  const { camera } = useThree();
  const targetZ = useRef(5); // Initial camera Z position
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    // Desktop: Mouse wheel scroll
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      // Update target Z based on scroll delta
      targetZ.current += event.deltaY * SCROLL_SENSITIVITY;

      // Clamp within bounds
      targetZ.current = Math.max(MIN_Z, Math.min(MAX_Z, targetZ.current));
    };

    // Mobile: Touch events for swipe up/down
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchStartY.current === null) return;

      const touchCurrentY = event.touches[0].clientY;
      const deltaY = touchStartY.current - touchCurrentY;

      // Update target Z based on touch movement
      targetZ.current += deltaY * TOUCH_SENSITIVITY;

      // Clamp within bounds
      targetZ.current = Math.max(MIN_Z, Math.min(MAX_Z, targetZ.current));

      // Update start position for continuous movement
      touchStartY.current = touchCurrentY;

      // Prevent default scroll behavior
      event.preventDefault();
    };

    const handleTouchEnd = () => {
      touchStartY.current = null;
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useFrame(() => {
    // Smooth interpolation (lerp)
    camera.position.z += (targetZ.current - camera.position.z) * LERP_FACTOR;
  });

  return null; // This component doesn't render anything
};
