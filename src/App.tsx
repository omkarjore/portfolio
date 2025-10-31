import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { Scene } from './components/3d/Scene';
import { ProjectModal } from './components/ui/ProjectModal';
import { Navigation } from './components/layout/Navigation';
import { About } from './components/ui/About';
import { Skills } from './components/ui/Skills';
import { useAppContext } from './context/AppContext';

export const App: React.FC = () => {
  const { currentView } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds total
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / steps) * 100;
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setLoading(false);
        }, 200); // Small delay for smooth transition
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <AnimatePresence>
        {loading && <LoadingScreen progress={progress} />}
      </AnimatePresence>

      {!loading && (
        <>
          {currentView === 'home' ? (
            <>
              <Scene />
              <ProjectModal />
            </>
          ) : currentView === 'about' ? (
            <div className="w-full h-full overflow-y-auto">
              <About />
            </div>
          ) : currentView === 'skills' ? (
            <div className="w-full h-full overflow-y-auto">
              <Skills />
            </div>
          ) : null}
          <Navigation />
        </>
      )}
    </div>
  );
};
