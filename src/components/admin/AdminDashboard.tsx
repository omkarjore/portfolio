import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminContext } from '../../context/AdminContext';
import { ProjectsManager } from './ProjectsManager';
import { SkillsManager } from './SkillsManager';
import { AboutManager } from './AboutManager';
import { EducationManager } from './EducationManager';

type Tab = 'projects' | 'skills' | 'about' | 'education';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAdminContext();
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tabs = [
    { id: 'projects' as Tab, name: 'Projects', icon: '📦', description: 'Manage project cards' },
    { id: 'skills' as Tab, name: 'Skills', icon: '🛠️', description: 'Manage technical skills' },
    { id: 'about' as Tab, name: 'About & Experience', icon: '👤', description: 'Update profile info' },
    { id: 'education' as Tab, name: 'Education', icon: '🎓', description: 'Manage education & certs' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsManager />;
      case 'skills':
        return <SkillsManager />;
      case 'about':
        return <AboutManager />;
      case 'education':
        return <EducationManager />;
      default:
        return <ProjectsManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex-shrink-0 shadow-2xl"
          >
            <div className="p-6">
              {/* Logo/Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-cyan-600 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold">Admin Portal</h1>
                  <p className="text-xs text-gray-400">Portfolio Manager</p>
                </div>
              </div>

              {/* User Info */}
              <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Logged in as</p>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-cyan-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tab.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{tab.name}</p>
                        <p className="text-xs opacity-75 truncate">{tab.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </nav>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="w-full mt-6 px-4 py-3 bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white rounded-lg transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {tabs.find(t => t.id === activeTab)?.name}
              </h2>
              <p className="text-sm text-gray-500">
                {tabs.find(t => t.id === activeTab)?.description}
              </p>
            </div>
          </div>

          <a
            href="/"
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portfolio
          </a>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};
