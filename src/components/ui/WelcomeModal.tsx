import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeModalProps {
  onSelect3D: () => void;
  onSelectMenu: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onSelect3D, onSelectMenu }) => {
  const [show, setShow] = useState(false);
  const [valveOpen, setValveOpen] = useState(false);

  useEffect(() => {
    // Show modal after initial render
    const timer = setTimeout(() => {
      setShow(true);
      // Start valve animation shortly after modal appears
      setTimeout(() => setValveOpen(true), 500);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSelect3D = () => {
    setShow(false);
    setTimeout(() => onSelect3D(), 300);
  };

  const handleSelectMenu = () => {
    setShow(false);
    setTimeout(() => onSelectMenu(), 300);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-y-auto safe-area-padding"
          style={{
            minHeight: '100vh',
          }}
        >
          {/* Animated Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'grid-move 20s linear infinite'
            }} />
          </div>

          {/* Content Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="relative z-10 max-w-2xl w-full mx-4 my-auto py-8"
          >
            {/* Valve Animation Container */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="relative scale-75 sm:scale-100">
                {/* Instrumentation Circle - Pulsing */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-full bg-cyan-500 blur-xl"
                />

                {/* Valve SVG */}
                <svg width="120" height="120" viewBox="0 0 120 120" className="relative z-10">
                  {/* Valve Body */}
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="40"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />

                  {/* Valve Stem (rotating when opening) */}
                  <motion.line
                    x1="60"
                    y1="20"
                    x2="60"
                    y2="60"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    animate={valveOpen ? {
                      rotate: 90,
                    } : {}}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ originX: '60px', originY: '60px' }}
                  />

                  {/* Valve Handle */}
                  <motion.rect
                    x="40"
                    y="12"
                    width="40"
                    height="8"
                    rx="4"
                    fill="#06b6d4"
                    animate={valveOpen ? {
                      rotate: 90,
                    } : {}}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ originX: '60px', originY: '16px' }}
                  />

                  {/* Flow Indicators (animated when valve opens) */}
                  <AnimatePresence>
                    {valveOpen && (
                      <>
                        {[0, 1, 2].map((i) => (
                          <motion.circle
                            key={i}
                            cx="60"
                            cy="60"
                            r="5"
                            fill="#10b981"
                            initial={{ cy: 60, opacity: 0 }}
                            animate={{
                              cy: [60, 100],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.5,
                              ease: "easeOut"
                            }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>

                  {/* Instrumentation Tag */}
                  <motion.text
                    x="60"
                    y="115"
                    textAnchor="middle"
                    fill="#06b6d4"
                    fontSize="10"
                    fontWeight="bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    CV-101
                  </motion.text>
                </svg>
              </div>
            </div>

            {/* Title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-6 sm:mb-8"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
                Welcome to
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 mb-3 sm:mb-4">
                Omkar Jore Portfolio
              </h2>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg px-4">
                CAD Automation • P&ID Systems • Autodesk API Integration
              </p>
            </motion.div>

            {/* Choice Prompt */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mb-6 sm:mb-8 px-4"
            >
              <p className="text-lg sm:text-xl text-gray-300 mb-3">
                What would you like to explore?
              </p>
              <div className="text-sm sm:text-base text-gray-400 space-y-2">
                <p>💡 Want to see my <span className="text-cyan-400 font-semibold">projects</span>? Click 3D Experience</p>
                <p>👤 Want to know <span className="text-cyan-400 font-semibold">about me</span>? Click Main Menu</p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* 3D Experience Button */}
              <motion.button
                onClick={handleSelect3D}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden bg-gradient-to-r from-cyan-600 to-cyan-500 text-white px-6 sm:px-8 py-5 sm:py-6 rounded-xl font-bold text-base sm:text-lg shadow-2xl transition-all min-h-[140px] sm:min-h-auto"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative flex flex-col items-center gap-2 sm:gap-3">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="text-base sm:text-lg">3D Experience</span>
                  <span className="text-xs font-normal opacity-80">Explore My Projects</span>
                </div>
              </motion.button>

              {/* Main Menu Button */}
              <motion.button
                onClick={handleSelectMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden bg-gradient-to-r from-gray-700 to-gray-600 text-white px-6 sm:px-8 py-5 sm:py-6 rounded-xl font-bold text-base sm:text-lg shadow-2xl transition-all border-2 border-gray-500 min-h-[140px] sm:min-h-auto"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="relative flex flex-col items-center gap-2 sm:gap-3">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-base sm:text-lg">Main Menu</span>
                  <span className="text-xs font-normal opacity-80">Learn About Me</span>
                </div>
              </motion.button>
            </motion.div>

            {/* Instrumentation Info Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>System Ready</span>
                <span className="mx-2">•</span>
                <span>Status: Online</span>
              </div>
            </motion.div>
          </motion.div>

          {/* CSS Keyframes for grid animation */}
          <style>{`
            @keyframes grid-move {
              0% {
                transform: translate(0, 0);
              }
              100% {
                transform: translate(50px, 50px);
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
