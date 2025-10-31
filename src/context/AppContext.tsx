/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AppState {
  menuOpen: boolean;
  currentView: 'home' | 'about' | 'skills' | 'education' | 'awards' | 'contact';
}

interface AppContextValue extends AppState {
  setMenuOpen: (open: boolean) => void;
  setCurrentView: (view: AppState['currentView']) => void;
  toggleMenu: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<AppState['currentView']>('home');

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const value: AppContextValue = {
    menuOpen,
    currentView,
    setMenuOpen,
    setCurrentView,
    toggleMenu,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
