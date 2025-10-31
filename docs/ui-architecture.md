# Omkar Jore - 3D Portfolio Frontend Architecture Document

**Project Name:** Omkar Jore - 3D Portfolio
**Document Version:** 1.0
**Date:** 2025-10-30
**Author:** Winston (Architect Agent)
**Status:** Complete

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-10-30 | 1.0 | Initial frontend architecture document | Winston (Architect Agent) |

---

## Template and Framework Selection

### Starter Template Decision

**Selected:** Vite React + TypeScript template

**Command:** `npm create vite@latest portfolio -- --template react-ts`

**Pre-configured Features:**
- ✅ React 18.2+ with TypeScript
- ✅ Vite 5.0+ build tool with HMR
- ✅ ESLint configuration
- ✅ Basic project structure (`src/`, `public/`)
- ✅ TypeScript configuration

**Rationale:**
- Aligns with PRD Story 1.1 requirements
- Fastest development server (instant startup)
- Minimal configuration needed
- Perfect for 2-hour MVP timeline
- Modern tooling with excellent TypeScript support

**Constraints:**
- Must follow Vite conventions
- Build output to `dist/` directory
- Static site generation only

---

## Frontend Tech Stack

### Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|-----------|---------|---------|-----------|
| Framework | React | 18.2+ | UI component framework | Component architecture, hooks-based patterns, ecosystem maturity |
| Build Tool | Vite | 5.0+ | Development server & bundler | Fast HMR, optimized builds, instant dev server start |
| Language | TypeScript | 5.0+ | Type safety | Catch errors early, better IDE support, self-documenting code |
| 3D Library | React Three Fiber | 8.15+ | Declarative 3D rendering | React integration for Three.js, declarative API, component-based 3D |
| 3D Helpers | drei | 9.92+ | Three.js utilities | Pre-built components (Text, ScrollControls), reduces boilerplate |
| 3D Engine | Three.js | 0.160+ | WebGL rendering engine | Industry standard, comprehensive 3D capabilities |
| Styling | Tailwind CSS | 3.4+ | Utility-first CSS framework | Rapid development, responsive design, minimal custom CSS |
| Animation | Framer Motion | 10.0+ | Animation library | React integration, declarative animations, loading screen effects |
| State Management | React Context + useState | Built-in | Minimal local state | Sufficient for simple state (menu open/closed, expanded card) |
| Routing | Conditional Rendering | Built-in | State-based view switching | Simpler than React Router for single-page portfolio |
| Form Handling | N/A - MVP | N/A | Contact links only | Using mailto:, no form validation needed in MVP |
| Testing | Manual Testing | N/A | Browser-based testing | Manual testing checklist per PRD Story 2.8 |
| Dev Tools | React DevTools | Latest | Component inspection | Debug React component tree and state |
| Linting | ESLint | 8.0+ | Code quality | Catch common errors, enforce code standards |
| Package Manager | npm | 9.0+ | Dependency management | Default with Node.js, manages dependencies |

### Key Technology Decisions

**No State Management Library:**
- Redux/Zustand/Recoil unnecessary for simple state needs
- React Context + useState sufficient for menu toggle and active card
- Reduces bundle size and complexity

**No React Router in MVP:**
- State-based conditional rendering adequate for portfolio
- Can upgrade to React Router post-MVP if URL-based routing needed
- Saves ~15 minutes of implementation time

**No Testing Framework in MVP:**
- 2-hour timeline constraint justifies manual testing only
- Comprehensive manual testing checklist covers critical paths
- Vitest + React Testing Library can be added post-MVP

**TypeScript Required:**
- Prevents errors especially in 3D coordinate math
- Essential for component prop validation
- Slight learning curve justified by error prevention

---

## Project Structure

```plaintext
portfolio/
├── public/                          # Static assets served directly
│   ├── resume.pdf                   # Omkar_Jore_Resume.pdf
│   ├── headshot.jpg                 # Professional photo (optional in MVP)
│   └── vite.svg                     # Default Vite icon (can replace)
│
├── src/
│   ├── components/                  # All React components
│   │   ├── 3d/                     # Three.js/R3F components
│   │   │   ├── Scene.tsx           # Main Canvas wrapper (Story 1.2)
│   │   │   ├── ProjectCard.tsx     # 3D card component (Story 1.3)
│   │   │   ├── CameraController.tsx # Scroll controls (Story 1.4)
│   │   │   └── Lights.tsx          # Lighting setup (Story 1.2)
│   │   │
│   │   ├── ui/                     # Traditional UI components (Epic 2)
│   │   │   ├── LoadingScreen.tsx   # Loading animation (Story 1.7)
│   │   │   ├── About.tsx           # About Me section (Story 2.1)
│   │   │   ├── Skills.tsx          # Skills section (Story 2.2)
│   │   │   ├── Education.tsx       # Education section (Story 2.3)
│   │   │   ├── Awards.tsx          # Awards section (Story 2.4)
│   │   │   ├── Contact.tsx         # Contact section (Story 2.5)
│   │   │   └── ProjectModal.tsx    # Expanded card view (Story 1.5)
│   │   │
│   │   └── layout/                 # Layout components
│   │       └── Navigation.tsx      # Menu component (Story 1.8)
│   │
│   ├── context/                    # React Context providers
│   │   ├── AppContext.tsx         # Global app state (menu, view)
│   │   └── ProjectContext.tsx     # 3D project state (expanded card)
│   │
│   ├── hooks/                      # Custom React hooks
│   │   └── useMediaQuery.ts        # Detect mobile/desktop (Story 2.6)
│   │
│   ├── data/                       # Hardcoded content
│   │   ├── projects.ts             # Project card data
│   │   ├── skills.ts               # Skills list
│   │   ├── content.ts              # Bio, education, awards content
│   │   └── externalLinks.ts        # GitHub, LinkedIn, email URLs
│   │
│   ├── types/                      # TypeScript type definitions
│   │   ├── project.types.ts        # Project card interfaces
│   │   └── common.types.ts         # Shared types
│   │
│   ├── config/                     # Configuration files
│   │   ├── env.ts                  # Environment variables
│   │   └── constants.ts            # Application constants
│   │
│   ├── utils/                      # Helper functions
│   │   ├── animations.ts           # Framer Motion configs
│   │   └── math.ts                 # Math utilities (clamp, lerp)
│   │
│   ├── styles/                     # Global styles
│   │   └── index.css               # Tailwind imports + global styles
│   │
│   ├── App.tsx                     # Root component (routing logic)
│   ├── main.tsx                    # Entry point (Vite default)
│   └── vite-env.d.ts              # Vite type definitions
│
├── docs/                           # Project documentation
│   ├── brainstorming-session-results.md
│   ├── brief.md
│   ├── prd.md
│   └── ui-architecture.md          # This document
│
├── .env.example                    # Environment variables template
├── .eslintrc.cjs                   # ESLint configuration
├── .gitignore                      # Git ignore patterns
├── index.html                      # HTML entry point (Vite convention)
├── package.json                    # Dependencies and scripts
├── postcss.config.js               # PostCSS for Tailwind
├── tailwind.config.js              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.node.json              # TypeScript for Vite config
├── vite.config.ts                  # Vite build configuration
└── README.md                       # Project readme
```

### File Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Components | PascalCase.tsx | `ProjectCard.tsx`, `LoadingScreen.tsx` |
| Hooks | camelCase.ts with 'use' prefix | `useMediaQuery.ts`, `useScrollPosition.ts` |
| Utilities | camelCase.ts | `formatDate.ts`, `clampValue.ts` |
| Constants | UPPER_SNAKE_CASE | `MAX_CARDS`, `DEFAULT_CAMERA_POSITION` |
| Data Files | camelCase.ts plural | `projects.ts`, `skills.ts` |
| Types/Interfaces | PascalCase | `interface ProjectData { ... }` |
| Type Files | camelCase.types.ts | `project.types.ts`, `common.types.ts` |
| CSS Classes | Tailwind utilities | `className="flex items-center gap-4"` |

---

## Component Standards

### Component Template

**Standard React Component:**

```typescript
// src/components/ui/Example.tsx

import React from 'react';

// Define props interface
interface ExampleProps {
  title: string;
  description?: string;
  onAction?: () => void;
  className?: string; // For Tailwind class overrides
}

/**
 * Example component description
 *
 * @param title - Required title text
 * @param description - Optional description text
 * @param onAction - Optional click handler
 * @param className - Additional Tailwind classes
 */
export const Example: React.FC<ExampleProps> = ({
  title,
  description,
  onAction,
  className = ''
}) => {
  // Local state (if needed)
  const [isActive, setIsActive] = React.useState(false);

  // Event handlers
  const handleClick = () => {
    setIsActive(!isActive);
    onAction?.();
  };

  return (
    <div className={`p-4 bg-white rounded-lg shadow ${className}`}>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {description && (
        <p className="text-gray-600 mb-4">{description}</p>
      )}
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {isActive ? 'Active' : 'Inactive'}
      </button>
    </div>
  );
};
```

**3D Component Template (React Three Fiber):**

```typescript
// src/components/3d/Example3D.tsx

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Example3DProps {
  position?: [number, number, number];
  color?: string;
  onClick?: () => void;
}

/**
 * 3D component using React Three Fiber
 *
 * @param position - 3D position [x, y, z]
 * @param color - Hex color string
 * @param onClick - Click handler for mesh
 */
export const Example3D: React.FC<Example3DProps> = ({
  position = [0, 0, 0],
  color = '#00ff00',
  onClick
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Animation loop (if needed)
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} onClick={onClick}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
```

### Component Organization Rules

**1. Component Structure Order:**
```typescript
// 1. Imports
import React from 'react';
import { externalLib } from 'library';

// 2. Type definitions
interface ComponentProps { ... }

// 3. Component function
export const Component: React.FC<ComponentProps> = (props) => {
  // 4. Hooks (in this order)
  const [state, setState] = useState();
  const ref = useRef();
  const customHook = useCustomHook();

  // 5. Derived values
  const computedValue = useMemo(() => ..., [deps]);

  // 6. Event handlers
  const handleClick = () => { ... };

  // 7. Effects
  useEffect(() => { ... }, [deps]);

  // 8. Return JSX
  return ( ... );
};
```

**2. Props Interface:**
- Always define before component
- Mark optional props with `?`
- Include JSDoc comments for complex props

**3. Exports:**
- Use named exports: `export const ComponentName`
- Avoid default exports for consistency

**4. File Organization:**
- One component per file
- Co-locate types if only used by that component
- Extract to `src/types/` if shared across components

### Critical Component Rules

**MUST DO:**
- ✅ Always define TypeScript interfaces for props
- ✅ Use functional components with hooks (no class components)
- ✅ Import React: `import React from 'react'` (needed for TSX)
- ✅ Use Tailwind classes, never inline styles
- ✅ Export with named exports: `export const ComponentName`
- ✅ Keep 3D components in `src/components/3d/`, UI in `src/components/ui/`

**MUST NOT DO:**
- ❌ Never use default exports
- ❌ Never mix 3D and UI logic in same component
- ❌ Never use inline styles (`style={{}}`)
- ❌ Never create CSS files (except global `index.css`)
- ❌ Never mutate refs directly in render
- ❌ Never use class components

---

## State Management

### State Management Approach

**Decision:** React Context API + useState (no external library)

**Rationale:**
- Portfolio has minimal global state needs (menu, view, expanded card)
- Context API sufficient for simple state sharing
- Avoids Redux/Zustand overhead for 2-hour timeline
- Component-local state (`useState`) for isolated UI state

### Store Structure

```plaintext
src/
├── context/
│   ├── AppContext.tsx        # Global app state (menu, view)
│   └── ProjectContext.tsx    # 3D project state (expanded card)
└── hooks/
    ├── useAppContext.ts      # Hook to consume AppContext
    └── useProjectContext.ts  # Hook to consume ProjectContext
```

### Context Implementation

**App Context (Navigation & View State):**

```typescript
// src/context/AppContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define state shape
interface AppState {
  menuOpen: boolean;
  currentView: 'home' | 'about' | 'skills' | 'education' | 'awards' | 'contact';
}

// Define context value (state + updaters)
interface AppContextValue extends AppState {
  setMenuOpen: (open: boolean) => void;
  setCurrentView: (view: AppState['currentView']) => void;
  toggleMenu: () => void;
}

// Create context
const AppContext = createContext<AppContextValue | undefined>(undefined);

// Provider component
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

// Custom hook for consuming context
export const useAppContext = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
```

**Project Context (Expanded Card State):**

```typescript
// src/context/ProjectContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

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
```

**Setup in main.tsx:**

```typescript
// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AppProvider } from './context/AppContext.tsx';
import { ProjectProvider } from './context/ProjectContext.tsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <ProjectProvider>
        <App />
      </ProjectProvider>
    </AppProvider>
  </React.StrictMode>
);
```

### State Management Patterns

**Component-Local State:**
- Use `useState` for UI state that doesn't need sharing
- Examples: hover state, loading indicators, form inputs

**Global State (Context):**
- Use for state shared across multiple components
- Only 2 contexts needed: AppContext and ProjectContext

**Derived State:**
- Compute from existing state, don't store separately
- Use `useMemo` for expensive computations

**No Prop Drilling:**
- Use Context to avoid passing props through many layers

### Critical State Management Rules

**MUST DO:**
- ✅ Use Context for global state
- ✅ Use `useState` for component-local state
- ✅ Always create custom hook to consume context
- ✅ Throw error in custom hook if used outside provider
- ✅ Keep state shape simple and flat

**MUST NOT DO:**
- ❌ Never mutate state directly
- ❌ Never store derived values in state
- ❌ Never use Context for frequently changing values
- ❌ Never add Redux/Zustand/Recoil

---

## API Integration

### API Strategy

**Decision:** No backend API (static site with external links only)

**Rationale:**
- Zero hosting costs
- Faster load times
- Simpler architecture
- All content is public
- Resume PDF served statically

### External Link Handling

**Links Used:**
1. **Resume Download:** `/resume.pdf` (public folder)
2. **GitHub Profile:** External link
3. **LinkedIn Profile:** External link
4. **Email Contact:** `mailto:` link
5. **Project Repos:** Direct GitHub links

**Centralized Links Configuration:**

```typescript
// src/data/externalLinks.ts

export const externalLinks = {
  // Social profiles
  github: 'https://github.com/omkarjore',
  linkedin: 'https://www.linkedin.com/in/omkar-jore',
  email: 'omkarjore731@gmail.com',

  // Resume
  resume: '/resume.pdf',

  // Project repositories
  projects: {
    thermax: 'https://github.com/omkarjore/SmartPIDAutomation',
    navisworks: 'https://github.com/omkarjore/navisworks-integration',
    console: 'https://github.com/omkarjore/console-apps',
  },
} as const;

export const createMailtoLink = (email: string, subject?: string): string => {
  const subjectParam = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${email}${subjectParam}`;
};

export const openExternalLink = (url: string): void => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
```

### Critical API/Link Rules

**MUST DO:**
- ✅ Centralize all external links in `externalLinks.ts`
- ✅ Use `target="_blank"` and `rel="noopener noreferrer"`
- ✅ Test all links manually
- ✅ Update placeholder URLs with actual profiles

**MUST NOT DO:**
- ❌ Never hardcode URLs in components
- ❌ Never use API calls for static content
- ❌ Never open external links in same tab
- ❌ Never forget `noopener noreferrer` (security risk)

---

## Routing

### Routing Strategy

**Decision:** Conditional rendering with state (no React Router)

**Rationale:**
- Simpler implementation (saves ~15 minutes)
- No additional dependency
- State-based view switching via AppContext
- Adequate for single-page portfolio
- Can upgrade to React Router post-MVP

**Trade-offs:**
- No URL-based navigation (`/about`, `/skills`)
- No browser back/forward support
- Can't share direct links to sections
- But: All views accessible via menu

### Route Configuration

```typescript
// src/App.tsx

import React from 'react';
import { useAppContext } from './context/AppContext';
import { Navigation } from './components/layout/Navigation';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { Scene } from './components/3d/Scene';
import { About } from './components/ui/About';
import { Skills } from './components/ui/Skills';
import { Education } from './components/ui/Education';
import { Awards } from './components/ui/Awards';
import { Contact } from './components/ui/Contact';
import { ProjectModal } from './components/ui/ProjectModal';

export const App: React.FC = () => {
  const { currentView } = useAppContext();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Navigation />

      {currentView === 'home' && (
        <div className="w-full h-full">
          <Scene />
          <ProjectModal />
        </div>
      )}

      {currentView === 'about' && (
        <div className="w-full h-full overflow-y-auto bg-gray-50">
          <About />
        </div>
      )}

      {currentView === 'skills' && (
        <div className="w-full h-full overflow-y-auto bg-gray-50">
          <Skills />
        </div>
      )}

      {currentView === 'education' && (
        <div className="w-full h-full overflow-y-auto bg-gray-50">
          <Education />
        </div>
      )}

      {currentView === 'awards' && (
        <div className="w-full h-full overflow-y-auto bg-gray-50">
          <Awards />
        </div>
      )}

      {currentView === 'contact' && (
        <div className="w-full h-full overflow-y-auto bg-gray-50">
          <Contact />
        </div>
      )}
    </div>
  );
};

export default App;
```

### Critical Routing Rules

**MUST DO:**
- ✅ Use `currentView` state from AppContext
- ✅ Include "Return to 3D Experience" button in traditional sections
- ✅ Close menu after navigation selection
- ✅ Render only active view (don't mount all and hide)

**MUST NOT DO:**
- ❌ Never mount all views simultaneously
- ❌ Never forget to close menu after navigation
- ❌ Never use `<a>` tags for internal navigation

---

## Styling Guidelines

### Styling Approach

**Decision:** Tailwind CSS utility-first (no CSS modules, no styled-components)

**Rationale:**
- Rapid development (2-hour timeline)
- Responsive design built-in
- Consistent design tokens
- No custom CSS to maintain
- Purges unused styles in production

### Tailwind Configuration

```javascript
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        accent: {
          500: '#06b6d4',
          600: '#0891b2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-in': 'slideIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
```

### Global Styles

```css
/* src/styles/index.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-gray-50 text-gray-900 antialiased;
  }

  html, body, #root {
    @apply h-full w-full overflow-hidden;
  }
}

@layer utilities {
  .glass {
    @apply bg-white/10 backdrop-blur-md border border-white/20;
  }

  .text-gradient {
    @apply bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent;
  }

  .card-shadow {
    @apply shadow-lg hover:shadow-xl transition-shadow duration-300;
  }
}
```

### Critical Styling Rules

**MUST DO:**
- ✅ Always use Tailwind utility classes
- ✅ Use responsive prefixes (sm:, md:, lg:)
- ✅ Use transition classes for interactivity
- ✅ Use theme colors (bg-primary-500) not raw hex

**MUST NOT DO:**
- ❌ Never use inline styles (`style={{}}`)
- ❌ Never create custom CSS files
- ❌ Never use CSS Modules or styled-components
- ❌ Never use `!important`

---

## Testing Requirements

### Testing Strategy

**Decision:** Manual testing only for MVP (no automated tests)

**Rationale:**
- 2-hour timeline constraint
- Simple codebase with low bug risk
- Visual 3D effects require manual inspection
- Comprehensive manual testing checklist in PRD Story 2.8
- Automated tests can be added post-MVP

### Manual Testing Checklist

**Desktop Browser Testing:**
- [ ] Chrome 90+ (Windows/Mac)
- [ ] Firefox 88+ (Windows/Mac)
- [ ] Safari 14+ (Mac)
- [ ] Edge 90+ (Windows)

**Mobile Device Testing:**
- [ ] iOS Safari (iPhone 12+)
- [ ] Android Chrome (Recent device)

**Performance Validation:**
- [ ] Desktop load time <3 seconds
- [ ] Mobile load time <5 seconds
- [ ] Desktop 3D rendering at 60 FPS
- [ ] Mobile 3D rendering at 30+ FPS

**Functionality Testing:**
- [ ] 3D scene renders correctly
- [ ] Project cards clickable and expandable
- [ ] Scroll/touch navigation works
- [ ] Navigation menu functional
- [ ] All traditional sections display correctly
- [ ] Resume downloads successfully
- [ ] External links work (GitHub, LinkedIn, email)

**Content Validation:**
- [ ] No placeholder text
- [ ] No broken images
- [ ] All text error-free
- [ ] Resume PDF is current version

**Lighthouse Audit:**
- [ ] Performance >80
- [ ] Accessibility >80
- [ ] Best Practices >80
- [ ] SEO >80

### Critical Testing Rules

**MUST DO:**
- ✅ Execute full manual testing checklist before deployment
- ✅ Test on real mobile devices
- ✅ Check console for errors in every browser
- ✅ Run Lighthouse audit
- ✅ Verify all external links work

**MUST NOT DO:**
- ❌ Never skip mobile testing
- ❌ Never deploy without testing all browsers
- ❌ Never ignore console warnings
- ❌ Never assume emulator = real device

---

## Environment Configuration

### Environment Variables

**Development (.env.development):**

```bash
VITE_APP_TITLE="Omkar Jore - 3D Portfolio"
VITE_APP_VERSION="1.0.0"
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
VITE_GITHUB_URL="https://github.com/omkarjore"
VITE_LINKEDIN_URL="https://www.linkedin.com/in/omkar-jore"
VITE_EMAIL="omkarjore731@gmail.com"
```

**Production (.env.production):**

```bash
VITE_APP_TITLE="Omkar Jore - 3D Portfolio"
VITE_APP_VERSION="1.0.0"
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false
VITE_GITHUB_URL="https://github.com/omkarjore"
VITE_LINKEDIN_URL="https://www.linkedin.com/in/omkar-jore"
VITE_EMAIL="omkarjore731@gmail.com"
```

### Config File

```typescript
// src/config/env.ts

export const env = {
  appTitle: import.meta.env.VITE_APP_TITLE || 'Omkar Jore - Portfolio',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  githubUrl: import.meta.env.VITE_GITHUB_URL || 'https://github.com/omkarjore',
  linkedinUrl: import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/omkar-jore',
  email: import.meta.env.VITE_EMAIL || 'omkarjore731@gmail.com',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;
```

### Critical Environment Rules

**MUST DO:**
- ✅ Use `VITE_` prefix for client-side env vars
- ✅ Access env vars through `src/config/env.ts`
- ✅ Provide fallback values
- ✅ Commit `.env.example` (not `.env`)

**MUST NOT DO:**
- ❌ Never access `import.meta.env` directly in components
- ❌ Never commit `.env` files to Git
- ❌ Never put secrets in `VITE_*` variables
- ❌ Never use `process.env` (Node.js only)

---

## Frontend Developer Standards

### Critical Coding Rules

**Component Creation:**
- ✅ Always use named exports
- ✅ One component per file
- ✅ File name matches component name
- ✅ Always define TypeScript props interface
- ❌ Never use default exports

**3D Component Rules:**
- ✅ Keep 3D logic in `src/components/3d/`
- ✅ Always use `useRef` for mesh references
- ✅ Use `useFrame` for animations
- ❌ Never mix 3D and UI logic
- ❌ Never mutate refs in render

**State Management:**
- ✅ Use Context for global state
- ✅ Use `useState` for local state
- ✅ Consume context via custom hooks
- ❌ Never mutate state directly
- ❌ Never store derived values in state

**Styling:**
- ✅ Always use Tailwind utility classes
- ✅ Use `className` prop for composition
- ❌ Never use inline styles
- ❌ Never create custom CSS files
- ❌ Never use `!important`

**External Links:**
- ✅ Centralize links in `externalLinks.ts`
- ✅ Use `target="_blank"` and `rel="noopener noreferrer"`
- ❌ Never hardcode URLs in components

**Environment Variables:**
- ✅ Access via `src/config/env.ts`
- ✅ Use `VITE_` prefix
- ❌ Never access `import.meta.env` directly in components
- ❌ Never use `process.env`

**TypeScript:**
- ✅ Define interfaces for all props
- ✅ Use `React.FC<PropsType>`
- ✅ Mark optional props with `?`
- ❌ Never use `any` type
- ❌ Never use `@ts-ignore`

### Quick Reference

**Common Commands:**
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

**Key Imports:**
```typescript
import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box } from '@react-three/drei';
import { useAppContext } from './context/AppContext';
import { env } from './config/env';
import { motion } from 'framer-motion';
```

**File Naming:**
- Components: `ProjectCard.tsx`
- Hooks: `useMediaQuery.ts`
- Data: `projects.ts`
- Types: `project.types.ts`

### Troubleshooting

**3D scene not rendering:**
- Check Canvas has height: `h-full` or `h-screen`
- Verify lights are in scene
- Check browser console for errors

**TypeScript errors:**
- Install types: `npm install -D @types/three`
- Import types: `import * as THREE from 'three'`

**Tailwind not applying:**
- Check import in `index.css`
- Verify content paths in `tailwind.config.js`
- Restart dev server

**Environment variables not working:**
- Check `VITE_` prefix
- Restart dev server after `.env` changes
- Use `import.meta.env` not `process.env`

---

## Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod

# Or connect GitHub repo for auto-deploy
# Push to main branch triggers deployment
```

**Environment Variables:**
Set in Vercel dashboard: Project Settings → Environment Variables

### Netlify Deployment

```toml
# netlify.toml

[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Deployment Checklist

- [ ] All manual tests passed
- [ ] No console errors
- [ ] Lighthouse scores >80
- [ ] Resume PDF in public/
- [ ] Environment variables set
- [ ] Git pushed to GitHub
- [ ] .env files NOT committed
- [ ] External links tested
- [ ] Mobile tested on real devices
- [ ] Production build tested locally

---

## Summary

This architecture document defines a **frontend-focused static portfolio** built with:

- **React 18 + TypeScript** for type-safe component development
- **Vite** for blazing-fast development and optimized builds
- **React Three Fiber** for declarative 3D rendering
- **Tailwind CSS** for rapid utility-first styling
- **React Context** for minimal state management
- **Conditional rendering** for view routing
- **Manual testing** for MVP with option to add automated tests later
- **Zero backend** with all content hardcoded and external link integration

**Total estimated development time:** 2-2.5 hours for MVP

**Next steps:**
1. Set up Vite React project
2. Install dependencies
3. Implement Epic 1 stories (3D scene)
4. Implement Epic 2 stories (traditional sections)
5. Test across browsers and devices
6. Deploy to Vercel/Netlify

---

**End of Frontend Architecture Document**
