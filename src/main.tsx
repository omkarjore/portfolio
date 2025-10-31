import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { App } from './App'
import { AppProvider } from './context/AppContext'
import { ProjectProvider } from './context/ProjectContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <ProjectProvider>
        <App />
      </ProjectProvider>
    </AppProvider>
  </StrictMode>,
)
