import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

const menuItems = [
  { label: 'About Me', value: 'about' as const },
  { label: 'Skills', value: 'skills' as const },
  { label: 'Education', value: 'education' as const },
  { label: 'Awards', value: 'awards' as const },
  { label: 'Contact', value: 'contact' as const },
];

export const Navigation: React.FC = () => {
  const { menuOpen, toggleMenu, setCurrentView } = useAppContext();

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        toggleMenu();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [menuOpen, toggleMenu]);

  const handleMenuItemClick = (value: typeof menuItems[number]['value']) => {
    console.log(`Navigate to: ${value}`);
    setCurrentView(value);
    toggleMenu();
  };

  const handleReturn3D = () => {
    console.log('Return to 3D Experience');
    setCurrentView('home');
    toggleMenu();
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-50 p-3 bg-gray-900/80 backdrop-blur-sm rounded-lg hover:bg-gray-800 transition-colors"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className="w-full h-0.5 bg-white rounded"></span>
          <span className="w-full h-0.5 bg-white rounded"></span>
          <span className="w-full h-0.5 bg-white rounded"></span>
        </div>
      </button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={toggleMenu}
            />

            {/* Menu sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 z-50 bg-gray-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full p-8">
                {/* Close button */}
                <button
                  onClick={toggleMenu}
                  className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Return to 3D link */}
                <button
                  onClick={handleReturn3D}
                  className="text-left text-cyan-400 hover:text-cyan-300 font-semibold mb-8 transition-colors"
                >
                  ← Return to 3D Experience
                </button>

                {/* Menu links */}
                <nav className="flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => handleMenuItemClick(item.value)}
                      className="text-left text-2xl text-white hover:text-cyan-400 transition-colors py-2"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>

                {/* Footer */}
                <div className="mt-auto pt-8 border-t border-gray-800">
                  <p className="text-gray-500 text-sm">
                    © 2025 Omkar Jore
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
