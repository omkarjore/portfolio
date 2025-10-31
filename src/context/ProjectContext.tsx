/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ProjectState {
  expandedProjectId: string | null;
}

interface ProjectContextValue extends ProjectState {
  setExpandedProjectId: (id: string | null) => void;
  expandProject: (id: string) => void;
  closeProject: () => void;
}

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const expandProject = (id: string) => setExpandedProjectId(id);
  const closeProject = () => setExpandedProjectId(null);

  const value: ProjectContextValue = {
    expandedProjectId,
    setExpandedProjectId,
    expandProject,
    closeProject,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjectContext = (): ProjectContextValue => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within ProjectProvider');
  }
  return context;
};
