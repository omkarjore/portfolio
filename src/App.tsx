import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { WelcomeModal } from './components/ui/WelcomeModal';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { MobileHint } from './components/ui/MobileHint';
import { Scene } from './components/3d/Scene';
import { ProjectModal } from './components/ui/ProjectModal';
import { Navigation } from './components/layout/Navigation';
import { About } from './components/ui/About';
import { Skills } from './components/ui/Skills';
import { Education } from './components/ui/Education';
import { Awards } from './components/ui/Awards';
import { Contact } from './components/ui/Contact';
import { Admin } from './components/admin/Admin';
import { useAppContext } from './context/AppContext';

export const App: React.FC = () => {
  const { currentView, setCurrentView, toggleMenu, shouldReturnToWelcome } = useAppContext();
  const [showWelcome, setShowWelcome] = useState(true);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Listen for return to welcome signal
  React.useEffect(() => {
    if (shouldReturnToWelcome) {
      setShowWelcome(true);
      setLoading(false);
      setProgress(0);
    }
  }, [shouldReturnToWelcome]);

  // Handle 3D Experience selection
  const handleSelect3D = () => {
    setShowWelcome(false);
    setLoading(true);

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
        }, 200);
      }
    }, interval);
  };

  // Handle Main Menu selection
  const handleSelectMenu = () => {
    setShowWelcome(false);
    setCurrentView('about'); // Start at About page
    toggleMenu(); // Open the navigation menu
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Welcome Modal - Shows first */}
      {showWelcome && (
        <WelcomeModal
          onSelect3D={handleSelect3D}
          onSelectMenu={handleSelectMenu}
        />
      )}

      {/* Loading Screen - Shows after 3D Experience selected */}
      <AnimatePresence>
        {loading && <LoadingScreen progress={progress} />}
      </AnimatePresence>

      {/* Main Content - Shows after loading or menu selection */}
      {!showWelcome && !loading && (
        <>
          {currentView === 'admin' ? (
            <Admin />
          ) : (
            <>
              <MobileHint />
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
              ) : currentView === 'education' ? (
                <div className="w-full h-full overflow-y-auto">
                  <Education />
                </div>
              ) : currentView === 'awards' ? (
                <div className="w-full h-full overflow-y-auto">
                  <Awards />
                </div>
              ) : currentView === 'contact' ? (
                <div className="w-full h-full overflow-y-auto">
                  <Contact />
                </div>
              ) : null}
              <Navigation />
            </>
          )}
        </>
      )}
    </div>
  );
};
