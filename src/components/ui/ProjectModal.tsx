import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjectContext } from '../../context/ProjectContext';
import { useAppContext } from '../../context/AppContext';
import { projects } from '../../data/projects';

export const ProjectModal: React.FC = () => {
  const { expandedProjectId, closeProject } = useProjectContext();
  const { returnToWelcome } = useAppContext();

  const project = projects.find(p => p.id === expandedProjectId);
  const isHero = project?.isHero || false;

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProject();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeProject]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {expandedProjectId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={closeProject}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full mx-2 sm:mx-4 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - bigger and more visible */}
            <button
              onClick={closeProject}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 hover:text-gray-900 transition-all shadow-md"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Project title */}
            <h2 className={`font-bold mb-4 text-gray-900 pr-8 ${isHero ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-xl sm:text-2xl md:text-3xl'}`}>
              {project.title}
            </h2>

            {/* Description */}
            <p className={`text-gray-700 mb-6 leading-relaxed text-sm sm:text-base ${isHero ? 'md:text-lg' : ''}`}>
              {project.fullDescription}
            </p>

            {/* Client names (hero only) */}
            {isHero && (
              <div className="mb-6 p-4 bg-cyan-50 rounded-lg border-2 border-cyan-200">
                <h3 className="text-lg font-semibold mb-2 text-cyan-900">Clients</h3>
                <p className="text-cyan-800 font-bold text-xl">THERMAX • L&T • PRAJ</p>
              </div>
            )}

            {/* Tech stack */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isHero
                        ? 'bg-cyan-100 text-cyan-700 font-semibold'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics (if available) */}
            {project.metrics && (
              <div className={`mb-6 rounded-lg ${
                isHero
                  ? 'p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300'
                  : 'p-4 bg-green-50 border border-green-100'
              }`}>
                <h3 className={`font-semibold mb-3 ${
                  isHero ? 'text-2xl text-green-900' : 'text-lg text-green-900'
                }`}>
                  {isHero ? 'Impact & Results' : 'Impact'}
                </h3>
                <p className={`font-bold ${
                  isHero ? 'text-2xl text-green-700' : 'text-lg text-green-700'
                }`}>
                  {project.metrics}
                </p>
              </div>
            )}

            {/* Action buttons - always visible at bottom */}
            <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-gray-200">
              {/* Top row: Back to 3D and GitHub */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Back to 3D button - ALWAYS FIRST for visibility */}
                <button
                  onClick={closeProject}
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-lg transition-colors font-semibold border-2 ${
                    isHero
                      ? 'border-cyan-600 text-cyan-600 hover:bg-cyan-50 text-lg'
                      : 'border-gray-900 text-gray-900 hover:bg-gray-100'
                  } ${!project.githubUrl ? 'w-full' : 'flex-1'}`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to 3D Experience
                </button>

                {/* GitHub link */}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center px-6 py-3 rounded-lg transition-colors font-medium flex-1 ${
                      isHero
                        ? 'bg-cyan-600 text-white hover:bg-cyan-700 text-lg font-semibold'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    {isHero ? 'View Code on GitHub →' : 'View on GitHub'}
                  </a>
                )}
              </div>

              {/* Bottom row: Return to Welcome button - Full width and prominent */}
              <button
                onClick={returnToWelcome}
                className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg transition-colors font-bold ${
                  isHero
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 text-lg shadow-lg'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Return to Welcome
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
