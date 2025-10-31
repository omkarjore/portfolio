import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';

const MIN_Z = 2;
const MAX_Z = 8;
const MIN_X = -4;
const MAX_X = 4;
const SCROLL_SENSITIVITY = 0.01;
const TOUCH_SENSITIVITY = 0.02;
const ARROW_SPEED = 0.1;
const LERP_FACTOR = 0.1;

export const CameraController: React.FC = () => {
  const { camera } = useThree();
  const targetZ = useRef(5); // Initial camera Z position (forward/backward)
  const targetX = useRef(0); // Initial camera X position (left/right)
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    // Desktop: Mouse wheel scroll (vertical - forward/backward)
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      // Vertical scroll: forward/backward movement
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        targetZ.current += event.deltaY * SCROLL_SENSITIVITY;
        targetZ.current = Math.max(MIN_Z, Math.min(MAX_Z, targetZ.current));
      }
      // Horizontal scroll: left/right movement
      else {
        targetX.current += event.deltaX * SCROLL_SENSITIVITY;
        targetX.current = Math.max(MIN_X, Math.min(MAX_X, targetX.current));
      }
    };

    // Desktop: Arrow keys for left/right movement
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        targetX.current -= ARROW_SPEED;
        targetX.current = Math.max(MIN_X, targetX.current);
      } else if (event.key === 'ArrowRight') {
        targetX.current += ARROW_SPEED;
        targetX.current = Math.min(MAX_X, targetX.current);
      } else if (event.key === 'ArrowUp') {
        targetZ.current -= ARROW_SPEED;
        targetZ.current = Math.max(MIN_Z, targetZ.current);
      } else if (event.key === 'ArrowDown') {
        targetZ.current += ARROW_SPEED;
        targetZ.current = Math.min(MAX_Z, targetZ.current);
      }
    };

    // Mobile: Touch events for swipe up/down/left/right
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0].clientY;
      touchStartX.current = event.touches[0].clientX;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchStartY.current === null || touchStartX.current === null) return;

      const touchCurrentY = event.touches[0].clientY;
      const touchCurrentX = event.touches[0].clientX;
      const deltaY = touchStartY.current - touchCurrentY;
      const deltaX = touchStartX.current - touchCurrentX;

      // Update target Z based on vertical touch movement (up/down)
      targetZ.current += deltaY * TOUCH_SENSITIVITY;
      targetZ.current = Math.max(MIN_Z, Math.min(MAX_Z, targetZ.current));

      // Update target X based on horizontal touch movement (left/right)
      targetX.current += deltaX * TOUCH_SENSITIVITY;
      targetX.current = Math.max(MIN_X, Math.min(MAX_X, targetX.current));

      // Update start position for continuous movement
      touchStartY.current = touchCurrentY;
      touchStartX.current = touchCurrentX;

      // Prevent default scroll behavior
      event.preventDefault();
    };

    const handleTouchEnd = () => {
      touchStartY.current = null;
      touchStartX.current = null;
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useFrame(() => {
    // Smooth interpolation (lerp) for both X and Z
    camera.position.z += (targetZ.current - camera.position.z) * LERP_FACTOR;
    camera.position.x += (targetX.current - camera.position.x) * LERP_FACTOR;
  });

  return null; // This component doesn't render anything
};
