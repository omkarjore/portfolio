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
  const { menuOpen, toggleMenu, setCurrentView, returnToWelcome } = useAppContext();

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

  const handleMenuItemClick = (value: typeof menuItems[number]['value'] | 'admin') => {
    setCurrentView(value as any);
    toggleMenu();
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-3 sm:p-3 bg-gray-900/80 backdrop-blur-sm rounded-lg hover:bg-gray-800 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
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
              className="fixed top-0 right-0 h-full w-full sm:w-80 max-w-sm z-50 bg-gray-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full p-8">
                {/* Close button - higher z-index to stay visible */}
                <button
                  onClick={toggleMenu}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-gray-400 hover:text-white transition-colors z-[60] bg-gray-800/80 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Return to Welcome link */}
                <button
                  onClick={returnToWelcome}
                  className="text-left text-cyan-400 hover:text-cyan-300 font-semibold mb-8 transition-colors mt-2"
                >
                  ← Return to Welcome
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

                  {/* Admin Portal link - separated with visual distinction */}
                  <div className="pt-6 mt-6 border-t border-gray-700">
                    <button
                      onClick={() => handleMenuItemClick('admin')}
                      className="text-left text-lg text-cyan-400 hover:text-cyan-300 transition-colors py-2 flex items-center gap-2 font-semibold"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Admin Portal
                    </button>
                  </div>
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
