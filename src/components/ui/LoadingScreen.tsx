import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  progress?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress = 0 }) => {
  const valveRotation = (progress / 100) * 90; // Rotate 0-90 degrees as progress increases
  const flowOpacity = progress > 30 ? 1 : 0; // Start flowing when valve opens enough

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Opening 3D Experience
          </h1>
          <p className="text-cyan-400 text-sm sm:text-base">
            Initializing P&ID Systems...
          </p>
        </motion.div>

        {/* Valve and Pipe System */}
        <div className="relative mb-8">
          <svg width="300" height="200" viewBox="0 0 300 200" className="overflow-visible">
            {/* Input Pipe */}
            <motion.rect
              x="10"
              y="85"
              width="80"
              height="30"
              fill="#374151"
              stroke="#06b6d4"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Valve Body */}
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Valve circle */}
              <circle
                cx="130"
                cy="100"
                r="35"
                fill="#1f2937"
                stroke="#06b6d4"
                strokeWidth="3"
              />

              {/* Valve handle - rotates with progress */}
              <motion.g
                animate={{ rotate: valveRotation }}
                transition={{ duration: 0.3 }}
                style={{ originX: '130px', originY: '100px' }}
              >
                <line
                  x1="130"
                  y1="65"
                  x2="130"
                  y2="100"
                  stroke="#06b6d4"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <rect
                  x="110"
                  y="57"
                  width="40"
                  height="10"
                  rx="5"
                  fill="#06b6d4"
                />
              </motion.g>

              {/* Valve tag */}
              <text x="130" y="150" textAnchor="middle" fill="#06b6d4" fontSize="12" fontWeight="bold">
                CV-101
              </text>
            </motion.g>

            {/* Output Pipe */}
            <motion.rect
              x="165"
              y="85"
              width="125"
              height="30"
              fill="#374151"
              stroke="#06b6d4"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />

            {/* Flow particles through input pipe */}
            <AnimatePresence>
              {flowOpacity > 0 && (
                <>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.circle
                      key={`flow-in-${i}`}
                      r="4"
                      fill="#10b981"
                      initial={{ cx: 10, cy: 100, opacity: 0 }}
                      animate={{
                        cx: [10, 90],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "linear"
                      }}
                    />
                  ))}
                  {/* Flow particles through output pipe */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.circle
                      key={`flow-out-${i}`}
                      r="4"
                      fill="#10b981"
                      initial={{ cx: 165, cy: 100, opacity: 0 }}
                      animate={{
                        cx: [165, 290],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "linear"
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Pressure Gauge */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <circle cx="240" cy="60" r="20" fill="#1f2937" stroke="#06b6d4" strokeWidth="2" />
              <motion.line
                x1="240"
                y1="60"
                x2="240"
                y2="45"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{ rotate: [0, progress * 1.8 - 90] }}
                transition={{ duration: 0.3 }}
                style={{ originX: '240px', originY: '60px' }}
              />
              <text x="240" y="90" textAnchor="middle" fill="#6b7280" fontSize="8">
                PSI
              </text>
            </motion.g>
          </svg>
        </div>

        {/* Project Cards Materializing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 50 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="flex gap-4 mb-8"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotateY: 180 }}
              animate={{
                opacity: progress > 50 + (i * 10) ? 1 : 0,
                scale: progress > 50 + (i * 10) ? 1 : 0,
                rotateY: progress > 50 + (i * 10) ? 0 : 180,
              }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="w-12 h-16 sm:w-16 sm:h-20 bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-lg shadow-lg flex items-center justify-center"
              style={{ perspective: '1000px' }}
            >
              <div className="text-white text-xl sm:text-2xl font-bold">{i + 1}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Bar with Pipe styling */}
        <div className="w-72 sm:w-96">
          <div className="relative h-8 bg-gray-800 rounded-lg border-2 border-gray-700 overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-cyan-600 via-cyan-500 to-green-400 relative"
            >
              {/* Flow animation inside progress bar */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 20px)',
                }}
                animate={{ x: [0, 20] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>

          {/* Status Text */}
          <div className="flex justify-between mt-3 text-sm">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400"
            >
              {progress < 30 && 'Opening valve...'}
              {progress >= 30 && progress < 60 && 'Flow initiated...'}
              {progress >= 60 && progress < 90 && 'Loading projects...'}
              {progress >= 90 && 'System ready!'}
            </motion.span>
            <span className="text-cyan-400 font-mono font-bold">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 flex items-center gap-2 text-xs sm:text-sm text-gray-500"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-2 bg-green-500 rounded-full"
          />
          <span>System Status: Initializing</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
