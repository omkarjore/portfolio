# 3D Portfolio Website - Product Requirements Document (PRD)

**Project Name:** Omkar Jore - 3D Portfolio
**Document Version:** 1.0
**Date:** 2025-10-30
**Author:** John (PM Agent)
**Status:** Draft - In Review

---

## Goals and Background Context

### Goals

- Secure CAD automation developer position or freelance contracts within 60 days
- Create memorable "next-level developer" impression through interactive 3D demonstrations
- Demonstrate real client impact (40% time reduction, 50+ drawings automated for THERMAX/L&T/PRAJ)
- Provide recruiters complete information (skills, education, contact) without external searches
- Achieve mobile-first experience functional on 90%+ of Android/iOS devices
- Complete MVP build in 2 hours or less with $0 hosting costs
- Differentiate from generic portfolios through portfolio-as-product-demo approach

### Background Context

Traditional CAD automation specialist portfolios fail to communicate technical sophistication effectively. Text-heavy descriptions and static screenshots don't convey the complexity of Autodesk API integration, P&ID automation, or Navisworks development. Non-technical recruiters struggle to understand the value proposition, leading to missed opportunities for qualified candidates. With 5-6 years of specialized experience and proven client impact, Omkar needs a portfolio that immediately demonstrates capabilities through interactive 3D visualizations rather than just describing them.

This 3D interactive portfolio addresses the problem by immersing visitors directly into working demonstrations of CAD automation projects. The centerpiece Thermax SmartPID automation project showcases quantified business impact, while traditional portfolio sections ensure recruiters have all necessary information for follow-up. Built with aggressive 2-hour timeline and zero-cost hosting constraints, the solution leverages React Three Fiber, Vercel, and mobile-first design principles.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-10-30 | 1.0 | Initial PRD creation from Project Brief | John (PM Agent) |

---

## Requirements

### Functional Requirements

**FR1:** The system shall display an impressive loading animation with progress indicator during initial load, transitioning smoothly into the 3D scene

**FR2:** The system shall render a 3D scene containing floating project cards representing major projects (minimum: Thermax SmartPID, Navisworks Integration, Console Applications)

**FR3:** The system shall support scroll-based navigation to move through the 3D space (no complex flight controls)

**FR4:** The system shall allow users to click on project cards to expand and display detailed project information

**FR5:** The Thermax SmartPID card (hero feature) shall display enhanced interactivity with key metrics (40% time reduction, 50+ drawings automated), technology stack (C# .NET 8, Autodesk API, AI integration), and link to GitHub repository

**FR6:** The system shall provide an always-accessible navigation menu (hamburger or floating nav) with links to all traditional portfolio sections

**FR7:** The system shall include an About Me section with professional bio, headshot photo, and specialization statement

**FR8:** The system shall include a Skills & Tech Stack section listing: C# .NET 8, Autodesk APIs, Navisworks, AutoCAD, and other relevant technologies

**FR9:** The system shall include an Education section displaying B.E Computer (SPPU, 8.18 CGPA), HSC details, and Java FullStack Development certification

**FR10:** The system shall include an Awards & Activities section featuring NSS Team Leader and Rudragarjana Vadya Pathak

**FR11:** The system shall include a Contact section with email link, LinkedIn profile link, and GitHub profile link

**FR12:** The system shall provide one-click PDF resume download functionality

**FR13:** The system shall support touch controls for 3D navigation on mobile devices (tap, swipe gestures)

**FR14:** The system shall provide a "Return to 3D Experience" navigation option from traditional sections

**FR15:** Project cards shall display project title, brief description, and visual indicator for interactivity

### Non-Functional Requirements

**NFR1:** The 3D scene shall render at 60 FPS on desktop browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

**NFR2:** The 3D scene shall render at minimum 30 FPS on mobile devices (iOS Safari 14+, Android Chrome 90+)

**NFR3:** The initial page load shall complete in under 3 seconds on desktop with broadband connection

**NFR4:** The initial page load shall complete in under 5 seconds on mobile with 4G connection

**NFR5:** The system shall be responsive and functional at all viewport sizes from 320px (mobile) to 4K displays

**NFR6:** The system shall use semantic HTML for basic screen reader accessibility

**NFR7:** The system shall maintain WCAG AA minimum color contrast standards

**NFR8:** The system shall be deployed to Vercel or Netlify with zero hosting costs (free tier)

**NFR9:** The system shall use only open-source libraries and frameworks (React 18+, React Three Fiber, Tailwind CSS)

**NFR10:** The MVP implementation shall be completable within 2 hours of focused development time

**NFR11:** The system shall optimize 3D performance using reduced polygon counts and efficient rendering techniques

**NFR12:** The system shall function correctly across target browsers without requiring plugins or additional software

**NFR13:** The system shall serve all static assets (resume PDF, images) from the hosting platform's CDN

**NFR14:** The system shall implement React's built-in XSS protection for all user-visible content

**NFR15:** The system shall achieve Lighthouse performance score >80 across all categories

---

## User Interface Design Goals

### Overall UX Vision

**Immediate Immersion Experience:** Visitors land directly into the 3D scene without a traditional landing page, establishing an immediate "next-level developer" impression. The experience prioritizes demonstration over explanation—recruiters explore interactive project cards in a unified 3D space rather than reading static descriptions.

**Frictionless Navigation:** The interface minimizes cognitive load through intuitive scroll-based 3D navigation (no complex controls to learn) and an always-accessible menu for traditional sections. The 3D experience serves as the "hub" with clear pathways to detailed information.

**Progressive Disclosure:** Project cards present high-level information at a glance, expanding on interaction to reveal detailed metrics, technology stacks, and links. Traditional portfolio sections are accessible but non-intrusive, ensuring visitors can find necessary information without overwhelming the initial experience.

**Performance-First Mobile Design:** The mobile experience is not a degraded desktop version but a thoughtfully optimized experience with touch-friendly interactions, reduced visual complexity where needed, and acceptable performance (30+ FPS) on modern smartphones.

### Key Interaction Paradigms

**Scroll-Based 3D Navigation:**
- Natural scrolling moves camera through 3D space (familiar web interaction applied to 3D)
- No keyboard controls or complex joystick metaphors required
- Mouse wheel on desktop, swipe gesture on mobile

**Click/Tap to Expand:**
- Project cards respond to hover states (desktop) showing interactivity cues
- Click/tap expands card to reveal detailed project information
- Close button or click outside returns to gallery view

**Touch Gestures (Mobile-Specific):**
- Single-finger swipe: Navigate through 3D space
- Tap: Select/expand project card
- Pinch-to-zoom: Optional enhancement (not MVP)

**Menu-Driven Traditional Navigation:**
- Hamburger menu or floating button always visible
- Clicking menu overlays or transitions to traditional sections
- "Return to 3D" button prominently placed in traditional sections

**Loading State with Feedback:**
- Animated loading sequence establishes quality expectation
- Progress indicator provides feedback (not indefinite spinner)
- Smooth transition from load to 3D scene (no jarring flash)

### Core Screens and Views

1. **3D Project Gallery (Landing/Home):**
   - Primary experience, where visitors land immediately
   - Contains 3 floating project cards: Thermax SmartPID (hero), Navisworks Integration, Console Apps
   - Camera positioned to show all cards with depth
   - Subtle ambient animation (floating, rotation) for visual interest

2. **Expanded Project Card Modal/Overlay:**
   - Triggered by clicking project card
   - Displays: Project title, description, key metrics, technology stack, GitHub link
   - Thermax card has enhanced content (40% time reduction, 50+ drawings, AI integration details)
   - Close/back functionality to return to 3D gallery

3. **About Me Page/Section:**
   - Professional bio (150-200 words)
   - Headshot photo
   - Specialization statement: "C# .NET Developer specializing in CAD Automation & Autodesk API Integration"

4. **Skills & Tech Stack Page/Section:**
   - Organized list or grid of technical skills
   - Primary: C# .NET 8, Autodesk APIs (Navisworks, AutoCAD), Object-Oriented Programming
   - Secondary: HTML, CSS, Java, ETL AB-INITIO
   - Simple list format (no skill bars)

5. **Education & Certifications Page/Section:**
   - B.E Computer, Savitribai Phule Pune University (8.18 CGPA, 2021-2024)
   - HSC, Shri Ganesh Jr College (63.85%, 2019-2020)
   - Java FullStack Development certification

6. **Awards & Activities Page/Section:**
   - NSS Team Leader
   - Rudragarjana Vadya Pathak

7. **Contact Page/Section:**
   - Email: omkarjore731@gmail.com
   - LinkedIn profile link
   - GitHub profile link
   - Resume download button (one-click PDF download)

8. **Loading Screen:**
   - Displays during initial asset loading
   - Progress indicator
   - Particle effect or fade-in animation

### Accessibility: WCAG AA

- Minimum WCAG AA color contrast standards (NFR7)
- Semantic HTML structure for screen readers (NFR6)
- Keyboard navigation support marked as "future enhancement" (not MVP)
- 3D experience fallback considerations deferred to Phase 2

### Branding

**Professional Engineering Aesthetic:**
- Clean, technical, precision-oriented design
- Modern tech vibe (contemporary web design, not corporate/stuffy)
- Visual hierarchy with bold typography for metrics
- **Suggested Color Palette:**
  - Primary: Deep blues or slate grays (technical professionalism)
  - Accent: Bright cyan or orange (highlights, CTAs, interactive elements)
  - Background: Dark or light optimized for 3D scene visibility
- **Typography:** Sans-serif, clean, modern (Tailwind CSS defaults)

### Target Device and Platforms: Web Responsive (Desktop + Mobile iOS/Android)

**Desktop Primary Use Case:**
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- 1920x1080 typical resolution, scales to 4K
- 60 FPS 3D performance target

**Mobile Essential Use Case:**
- iOS Safari 14+ (iPhone)
- Android Chrome 90+ (Android devices)
- 320px minimum width to 4K
- 30 FPS 3D performance target

---

## Technical Assumptions

### Repository Structure: Monorepo

**Decision:** Single repository containing all portfolio code, assets, and documentation.

**Rationale:**
- Simplicity for solo developer (no coordination across multiple repos)
- Faster development (all code in one place supports 2-hour timeline)
- Easy deployment (single repo deploys directly to Vercel/Netlify)
- Documentation co-location (docs alongside code)

**Structure:**
```
portfolio/
├── public/              # Static assets (resume PDF, images, headshot)
├── src/
│   ├── components/
│   │   ├── 3d/         # Three.js components (Scene, ProjectCard, Camera)
│   │   ├── ui/         # Traditional UI (About, Skills, Contact, etc.)
│   │   └── layout/     # Navigation, Layout wrappers
│   ├── pages/          # Route components (if using routing)
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Helper functions
│   └── App.jsx         # Main app component
├── docs/               # Project documentation
└── package.json
```

### Service Architecture: Static Site (JAMstack) - Monolith Frontend

**Decision:** Client-side rendered React application with static asset serving. No backend, no microservices, no server-side rendering.

**Rationale:**
- **Zero Cost Hosting:** Static sites deploy free on Vercel/Netlify
- **Maximum Performance:** Pre-built assets served from global CDN
- **MVP Simplicity:** No backend eliminates authentication, database, API complexity
- **Fast Build Time:** Entire portfolio builds in seconds, deploys automatically
- **No Server Management:** Fully managed hosting, no infrastructure concerns

**Architecture Details:**
- **Client-Side Only:** All logic runs in browser (React + Three.js)
- **Static Asset Serving:** Resume PDF, images served directly from CDN
- **External Links:** GitHub, LinkedIn, email handled via external URLs
- **Future Consideration:** Serverless functions for contact form submission if needed post-MVP

### Testing Requirements: Manual Testing Only (MVP)

**Decision:** No automated test suite for MVP. Manual testing on desktop Chrome/Firefox/Safari and mobile iOS/Android devices only.

**Rationale:**
- **2-Hour Constraint:** Writing tests would consume 30-50% of timeline
- **Simple Codebase:** Portfolio logic is straightforward, low bug risk
- **Visual Validation:** 3D effects require manual visual inspection anyway
- **Post-MVP Enhancement:** Unit tests can be added in Phase 2

**Manual Testing Checklist (MVP Launch):**
- [ ] 3D scene renders correctly on desktop (Chrome, Firefox, Safari)
- [ ] 3D scene renders correctly on mobile (iOS Safari, Android Chrome)
- [ ] Project cards expand/collapse correctly
- [ ] Navigation menu functions on desktop and mobile
- [ ] All traditional sections display correct content
- [ ] Resume PDF downloads successfully
- [ ] External links (GitHub, LinkedIn, email) work correctly
- [ ] Touch gestures work on mobile devices
- [ ] No console errors or broken functionality
- [ ] Performance: Desktop 60 FPS, Mobile 30+ FPS

**Future Testing (Phase 2):**
- Unit tests with Jest/Vitest
- Component tests with React Testing Library
- Visual regression tests (Percy, Chromatic)
- E2E tests with Playwright or Cypress
- Performance monitoring with Lighthouse CI

### Additional Technical Assumptions and Requests

**Frontend Framework & Libraries:**

1. **React 18+**
   - Component architecture, ecosystem maturity, developer familiarity with HTML/CSS translates well
   - Alternative Considered: Vanilla JS (faster setup but worse maintainability)

2. **React Three Fiber (@react-three/fiber) + drei (@react-three/drei)**
   - Declarative 3D in React, excellent documentation, active community
   - Alternative Considered: Vanilla Three.js (steeper learning curve, doesn't fit 2-hour timeline)
   - **Critical Assumption:** Developer can learn R3F basics within 1 hour using tutorials

3. **Tailwind CSS**
   - Rapid styling, utility-first approach, responsive design out-of-box
   - Alternative Considered: Styled-components or vanilla CSS (slower development)

4. **Framer Motion or GSAP**
   - Loading animation and transitions
   - Decision Point: Choose based on simpler API (lean toward Framer Motion for React integration)

5. **React Hook Form (Optional - post-MVP if contact form added)**
   - Lightweight, performant form validation
   - MVP Note: Contact section uses simple mailto: links

**Build Tool & Development Environment:**

6. **Vite**
   - Fast dev server, instant HMR, optimized production builds
   - Alternative: Create React App (deprecated/slower) or Next.js (overkill for static site)
   - **Critical for Timeline:** Vite setup is ~5 minutes

**Hosting & Deployment:**

7. **Vercel (Primary) or Netlify (Backup)**
   - Free tier generous (100GB bandwidth/month)
   - Automatic deployments from GitHub
   - Built-in CDN, zero config
   - Automatic HTTPS via Let's Encrypt
   - Custom domain optional ($12/year)

**Version Control:**

8. **GitHub**
   - Industry standard, integrates with Vercel/Netlify
   - Public repo (showcases code quality to recruiters)
   - Simple main branch (solo developer)

**Browser & Device Support:**

9. **Modern Browsers Only (WebGL Required)**
   - Desktop: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ (95%+ coverage)
   - Mobile: iOS Safari 14+, Android Chrome 90+
   - Fallback: Display message for unsupported browsers

10. **No Polyfills or Legacy Browser Support**
    - Modern browser requirement eliminates need for polyfills
    - Reduces bundle size, faster load times

**Performance Optimization:**

11. **Code Splitting & Lazy Loading (Built-in to Vite)**
    - Automatic code splitting by Vite
    - Lazy load routes/sections if needed

12. **Asset Optimization**
    - Images: WebP format where supported, fallback to PNG/JPG
    - 3D Models: Low-polygon geometric primitives (boxes, spheres)
    - Bundle Size Target: <500KB initial JS bundle

13. **No State Management Library (Redux, Zustand)**
    - React useState/useContext sufficient for minimal state needs
    - Avoids learning curve and additional dependencies

**Content Management:**

14. **Hardcoded Content (No CMS)**
    - Portfolio content is static, rarely changes
    - Content stored in React components or separate JSON file
    - Future: Could migrate to headless CMS if content updates frequent

**Analytics & Monitoring (Post-MVP):**

15. **No Analytics in MVP**
    - GDPR-friendly by default
    - Phase 2: Add privacy-friendly analytics (Plausible, Simple Analytics)

**Accessibility:**

16. **Basic Semantic HTML Only (MVP)**
    - Meets NFR6/NFR7
    - 3D experience may not be fully keyboard-navigable in MVP
    - Phase 2: Enhanced keyboard navigation, ARIA labels

**Security:**

17. **React XSS Protection (Built-in)**
    - React escapes all content by default

18. **No Sensitive Data Storage**
    - All content is public, no cookies, no localStorage with sensitive info

19. **HTTPS Only**
    - Vercel/Netlify provide automatic SSL

**Critical Dependencies:**

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "three": "^0.160.0",
    "framer-motion": "^10.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

**Development Timeline Breakdown (2 Hours):**
- **Setup (20 min):** Vite + React + R3F + Tailwind scaffold
- **3D Scene (60 min):** Canvas, lights, camera, 3 project cards, interactions
- **Traditional Sections (30 min):** About, Skills, Education, Contact components
- **Navigation (5 min):** Menu component, routing
- **Polish (5 min):** Loading animation, responsive tweaks, testing

---

## Epic List

### Epic 1: Foundation & Interactive 3D Experience
**Goal:** Establish project infrastructure and deliver working 3D scene with interactive project cards that demonstrate CAD automation expertise

### Epic 2: Professional Portfolio Content & Mobile Launch
**Goal:** Complete all traditional portfolio sections, ensure mobile functionality, and deploy to production

---

## Epic 1: Foundation & Interactive 3D Experience

**Epic Goal:** Establish the React application infrastructure with Vite, implement the core 3D scene using React Three Fiber, and deliver an interactive project card gallery that showcases CAD automation projects. This epic delivers the primary differentiation factor—an immersive 3D demonstration that immediately establishes "next-level developer" perception. Upon completion, the 3D experience is functional and shareable, providing proof-of-concept value even before traditional sections are added.

---

### Story 1.1: Project Setup and Development Environment

**As a** developer,
**I want** to initialize a React project with Vite, install core dependencies, and verify the development server runs,
**so that** I have a working foundation to build the portfolio application.

#### Acceptance Criteria

1. Vite project initialized with React 18+ template using `npm create vite@latest`
2. Dependencies installed: react, react-dom, @react-three/fiber, @react-three/drei, three, framer-motion
3. Tailwind CSS configured with PostCSS and Autoprefixer
4. Development server starts successfully on `npm run dev` without errors
5. Git repository initialized with initial commit
6. GitHub repository created and linked as remote origin
7. Basic folder structure created: `src/components/3d/`, `src/components/ui/`, `src/components/layout/`
8. `public/` folder contains placeholder for resume PDF and images
9. Browser opens to localhost with default Vite + React welcome page rendering
10. Hot module replacement (HMR) verified working by making a test change

---

### Story 1.2: Basic 3D Scene with Camera and Lighting

**As a** visitor,
**I want** to see a functional 3D scene when the portfolio loads,
**so that** I immediately understand this is an interactive 3D experience.

#### Acceptance Criteria

1. `src/components/3d/Scene.jsx` component created using React Three Fiber `<Canvas>`
2. Scene renders without console errors or warnings
3. Default camera positioned at `[0, 0, 5]` looking at origin
4. Ambient light added with intensity 0.5 for base illumination
5. Directional light added at `[10, 10, 5]` with intensity 0.8 for shadows/depth
6. Simple test geometry (sphere or box) rendered at origin to verify 3D rendering works
7. Background color set to appropriate theme color (dark or light)
8. Scene fills entire viewport (100vw x 100vh)
9. Canvas configured with `camera={{ position: [0, 0, 5], fov: 75 }}`
10. 3D scene renders at 60 FPS on desktop Chrome (verified with browser performance tools)

---

### Story 1.3: Project Card Components in 3D Space

**As a** visitor,
**I want** to see three floating project cards arranged in 3D space,
**so that** I can identify the major projects at a glance.

#### Acceptance Criteria

1. `src/components/3d/ProjectCard.jsx` component created accepting props: `position`, `title`, `description`
2. Three project cards instantiated in scene:
   - Thermax SmartPID at position `[-3, 0, 0]`
   - Navisworks Integration at position `[0, 0, 0]`
   - Console Applications at position `[3, 0, 0]`
3. Each card renders as 3D mesh with `<Box>` geometry (dimensions: 2 x 2.5 x 0.1)
4. Card meshes use `<meshStandardMaterial>` with appropriate color/texture
5. Text rendered on card faces using drei's `<Text>` component showing project title
6. Cards have subtle hover effect (scale up 1.1x) when mouse enters (desktop only)
7. Cards have subtle floating animation (gentle up/down oscillation using sine wave)
8. All three cards visible in viewport without camera movement
9. Cards maintain readable text from default camera position
10. 3D scene maintains 60 FPS with all three cards rendered

---

### Story 1.4: Scroll-Based Camera Navigation

**As a** visitor,
**I want** to navigate through the 3D space by scrolling,
**so that** I can explore the project cards using familiar web interactions.

#### Acceptance Criteria

1. `src/components/3d/CameraController.jsx` component created managing camera position
2. Scroll events captured using React event handlers or drei's `<ScrollControls>`
3. Scrolling down moves camera forward (decreasing Z position), scrolling up moves backward
4. Camera movement smoothly interpolated (lerp) to avoid jarring jumps
5. Scroll range bounded: camera cannot move behind cards or infinitely far away
6. Camera maintains focus on card area (Y position remains centered)
7. Scroll behavior feels natural and responsive (16ms frame time target)
8. Mouse wheel scroll on desktop works correctly
9. Scroll navigation tested on Chrome, Firefox, Safari without issues
10. No scroll jank or dropped frames during camera movement

---

### Story 1.5: Click Interaction to Expand Project Cards

**As a** visitor,
**I want** to click on a project card to see detailed information,
**so that** I can learn about specific projects without leaving the 3D experience.

#### Acceptance Criteria

1. Click events registered on ProjectCard meshes using `onClick` handler
2. Clicking card triggers state change to "expanded" mode
3. Expanded card displays modal/overlay with detailed content:
   - Full project title
   - Project description (2-3 sentences)
   - Technology stack used
   - Key metrics (for Thermax: "40% time reduction, 50+ drawings automated")
   - GitHub repository link (if applicable)
4. Expanded view has close button (X icon) or click-outside-to-close functionality
5. Only one card can be expanded at a time (expanding new card closes previous)
6. Expanded view rendered using HTML overlay (not 3D text for readability)
7. Expanded view styled with Tailwind CSS for consistent design
8. Close interaction returns to 3D gallery view smoothly
9. Expanded view is responsive and readable on desktop viewport
10. Click interaction works on all three project cards

---

### Story 1.6: Hero Feature - Enhanced Thermax SmartPID Card

**As a** technical recruiter,
**I want** the Thermax SmartPID card to display more detailed information and visual prominence,
**so that** I immediately see the most impactful project with quantified results.

#### Acceptance Criteria

1. Thermax card has distinct visual treatment (larger size, different color, or glow effect)
2. Thermax card hover effect more pronounced than other cards (scale 1.15x vs 1.1x)
3. Thermax expanded view includes all standard content PLUS:
   - Prominent metrics display: "40% reduction in drafting time"
   - Specific client names: "THERMAX, L&T, PRAJ"
   - "50+ technical drawings automated" statistic
   - Technology details: "C# .NET 8, Autodesk API, AI Integration"
4. Thermax expanded view has "View Code" button linking to GitHub repository
5. Thermax card positioned prominently (leftmost or center) in 3D gallery
6. Optional: Thermax card has subtle particle effect or animated border to draw attention
7. Thermax expanded content formatted for maximum readability (larger text, clear hierarchy)
8. Metrics displayed with visual emphasis (bold, colored, or iconography)
9. GitHub link opens in new tab when clicked
10. Thermax card content is fully populated with real project information (no placeholders)

---

### Story 1.7: Loading Animation and Smooth Entry

**As a** visitor,
**I want** to see an engaging loading animation while the portfolio assets load,
**so that** the wait feels intentional and establishes quality expectations.

#### Acceptance Criteria

1. `src/components/ui/LoadingScreen.jsx` component created
2. Loading screen displayed immediately when app mounts
3. Loading animation implemented using Framer Motion or GSAP (particle effect, fade-in, or spinner)
4. Loading progress indicator shows percentage or visual progress
5. Loading screen monitors asset loading state (3D models, fonts, etc.) using Suspense or loading events
6. Loading screen minimum display time: 1 second (even if assets load faster, to show animation)
7. Smooth transition from loading screen to 3D scene (fade out loading, fade in 3D)
8. Loading screen styled consistently with overall portfolio aesthetic
9. No "flash of unstyled content" (FOUC) - loading screen appears immediately
10. 3D scene only renders after loading screen completes transition

---

### Story 1.8: Basic Navigation Menu Structure

**As a** visitor,
**I want** to access a navigation menu to find additional portfolio information,
**so that** I can view traditional portfolio sections (About, Skills, Contact, etc.).

#### Acceptance Criteria

1. `src/components/layout/Navigation.jsx` component created
2. Hamburger menu icon or floating navigation button visible in top-right corner
3. Clicking navigation button opens menu overlay or sidebar
4. Menu displays links to traditional sections: About Me, Skills, Education, Awards, Contact
5. Menu has "Return to 3D Experience" link (closes menu, returns to 3D scene)
6. Menu styled with Tailwind CSS, visually distinct from 3D scene
7. Menu is always accessible (fixed position, high z-index)
8. Menu links are placeholder/non-functional in this story (routing implemented in Epic 2)
9. Close menu button (X icon) or click-outside-to-close functionality implemented
10. Menu open/close transitions smoothly (slide or fade animation)

---

## Epic 2: Professional Portfolio Content & Mobile Launch

**Epic Goal:** Complete all traditional portfolio sections with real content (About Me, Skills, Education, Certifications, Awards, Contact), implement mobile-responsive design with touch interactions, and deploy the production-ready portfolio to Vercel/Netlify. This epic transforms the 3D demo into a complete professional portfolio that meets recruiter needs for credibility, contact information, and comprehensive skill assessment. Upon completion, the portfolio is fully functional across desktop and mobile devices and accessible via public URL.

---

### Story 2.1: About Me Section with Professional Bio

**As a** recruiter,
**I want** to read a concise professional bio with specialization details,
**so that** I can quickly understand the candidate's background and expertise.

#### Acceptance Criteria

1. `src/components/ui/About.jsx` component created
2. About section includes professionally written bio (150-200 words):
   - Name: Omkar Jore
   - Current role: C# .NET Developer at Inventive Business Solutions
   - Specialization: CAD Automation & Autodesk API Integration
   - Experience: 5-6 years
   - Key achievements mentioned (THERMAX/L&T/PRAJ projects)
3. Headshot photo displayed (if available) or placeholder with note to add later
4. Specialization statement prominent: "C# .NET Developer specializing in CAD Automation, Autodesk API Integration (Navisworks, AutoCAD), and intelligent P&ID automation"
5. Section styled with Tailwind CSS for readability (proper spacing, typography)
6. Bio text is authentic and error-free (grammar, spelling checked)
7. Photo (if included) is professional quality, appropriately sized and positioned
8. Section accessible via navigation menu link
9. "Return to 3D Experience" button visible and functional
10. About section responsive on desktop viewports (1920px, 1440px, 1024px)

---

### Story 2.2: Skills & Tech Stack Section

**As a** technical recruiter,
**I want** to see a comprehensive list of technical skills and technologies,
**so that** I can quickly assess if the candidate matches our technical requirements.

#### Acceptance Criteria

1. `src/components/ui/Skills.jsx` component created
2. Skills organized in categories:
   - **Primary Expertise:** C# .NET 8, .NET Framework, Autodesk APIs (Navisworks, AutoCAD), Object-Oriented Programming
   - **Languages:** C#, Java, HTML, CSS
   - **Tools & Platforms:** Visual Studio 2022, Cursor IDE, ETL AB-INITIO, Git/GitHub
   - **Specializations:** CAD Plugin Development, API Integration, Automation Solutions
3. Skills displayed in clean, scannable format (list, grid, or tags)
4. Visual distinction between primary and secondary skills (typography, color, or grouping)
5. No skill bars or percentage indicators (avoid subjective self-assessment)
6. Section includes link to GitHub profile: "View code samples on GitHub"
7. Skills list matches resume content (no discrepancies)
8. Section styled with Tailwind CSS for visual hierarchy
9. Section accessible via navigation menu link
10. Skills section responsive on desktop viewports

---

### Story 2.3: Education & Certifications Section

**As a** recruiter,
**I want** to verify the candidate's educational background and certifications,
**so that** I can confirm qualifications for the position.

#### Acceptance Criteria

1. `src/components/ui/Education.jsx` component created
2. Education section displays:
   - **B.E Computer Engineering** - Savitribai Phule Pune University (SPPU) - 8.18 CGPA - 2021-2024
   - **HSC** - Shri Ganesh Jr College, Korhale - 63.85% - 2019-2020
3. Certifications section displays:
   - Java FullStack Development
4. Information formatted for clarity (degree, institution, GPA/percentage, years)
5. Certifications include issuing organization if available
6. Strong GPA (8.18 CGPA) visually emphasized as achievement
7. Section styled professionally with Tailwind CSS
8. Section accessible via navigation menu link
9. "Return to 3D Experience" button visible and functional
10. Education section responsive on desktop viewports

---

### Story 2.4: Awards & Activities Section

**As a** recruiter,
**I want** to learn about the candidate's extracurricular activities and recognition,
**so that** I can assess leadership, teamwork, and well-roundedness.

#### Acceptance Criteria

1. `src/components/ui/Awards.jsx` component created
2. Awards & Activities section displays:
   - NSS Team Leader
   - Rudragarjana Vadya Pathak
3. Each item includes brief context or description if relevant
4. Section styled consistently with other traditional sections
5. Section accessible via navigation menu link
6. "Return to 3D Experience" button visible and functional
7. Awards section responsive on desktop viewports
8. Optional: Icons or badges to enhance visual appeal (if time permits)
9. Content is concise (bullet points or short paragraphs)
10. Section integrates seamlessly with navigation flow

---

### Story 2.5: Contact Section with Links and Resume Download

**As a** recruiter,
**I want** to easily contact the candidate and download their resume,
**so that** I can proceed with the hiring process.

#### Acceptance Criteria

1. `src/components/ui/Contact.jsx` component created
2. Contact section displays:
   - **Email:** omkarjore731@gmail.com (as mailto: link)
   - **LinkedIn:** Profile link opening in new tab
   - **GitHub:** Profile link opening in new tab
3. Resume download button prominent: "Download Resume (PDF)"
4. Resume PDF file placed in `public/` folder (e.g., `public/Omkar_Jore_Resume.pdf`)
5. Resume download triggers file download (not opening in browser)
6. All links tested and functional (mailto opens email client, external links open correctly)
7. Contact section includes call-to-action text: "Let's connect!" or similar
8. Section styled with clear button/link styling (Tailwind CSS)
9. Section accessible via navigation menu link
10. Contact section responsive on desktop viewports

---

### Story 2.6: Mobile-Responsive Layout and Touch Controls

**As a** mobile visitor,
**I want** the portfolio to function smoothly on my smartphone with touch gestures,
**so that** I can explore the 3D experience and read content on any device.

#### Acceptance Criteria

1. 3D scene renders correctly on mobile viewports (tested on iOS Safari 14+, Android Chrome 90+)
2. Touch gestures implemented for 3D navigation:
   - Single-finger swipe up/down: Navigate through 3D space (equivalent to scroll)
   - Tap on project card: Expand card detail view
3. 3D scene maintains minimum 30 FPS on modern smartphones (iPhone 12+, recent Android flagships)
4. Project card expanded view readable on mobile (text not too small, buttons tappable)
5. Navigation menu accessible on mobile (hamburger icon tappable, menu slides in)
6. All traditional sections (About, Skills, Education, Awards, Contact) responsive on mobile:
   - Text reflows correctly (no horizontal scroll)
   - Images scale appropriately
   - Buttons and links are touch-friendly (minimum 44x44px tap targets)
7. Resume download works on mobile devices
8. External links (LinkedIn, GitHub, mailto) work correctly on mobile
9. "Return to 3D Experience" button visible and functional on mobile
10. Mobile viewport meta tag configured correctly: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

---

### Story 2.7: Production Deployment to Vercel/Netlify

**As a** developer,
**I want** to deploy the portfolio to production hosting,
**so that** it's accessible via public URL and can be shared with recruiters.

#### Acceptance Criteria

1. GitHub repository pushed with all code and assets
2. Vercel or Netlify account created (free tier)
3. Portfolio connected to hosting platform (linked to GitHub repo)
4. Build configuration verified (Vite build command: `npm run build`, output directory: `dist`)
5. Initial deployment successful, site accessible via provided URL (e.g., `omkarjore.vercel.app`)
6. Automatic deployments configured: pushing to `main` branch triggers new deployment
7. HTTPS enabled automatically (SSL certificate active)
8. Build logs reviewed, no errors or critical warnings
9. Production site tested:
   - 3D scene loads and renders correctly
   - All navigation links work
   - All traditional sections display correctly
   - Resume downloads successfully
   - External links (LinkedIn, GitHub, email) functional
10. Production URL shared and verified accessible from external network

---

### Story 2.8: Final Testing and Launch Readiness

**As a** developer,
**I want** to conduct comprehensive testing across devices and browsers,
**so that** I can confidently share the portfolio with recruiters knowing it works correctly.

#### Acceptance Criteria

1. **Desktop Browser Testing** - Portfolio tested on:
   - Chrome 90+ (Windows/Mac)
   - Firefox 88+ (Windows/Mac)
   - Safari 14+ (Mac)
   - Edge 90+ (Windows)
2. **Mobile Device Testing** - Portfolio tested on:
   - iOS Safari (iPhone)
   - Android Chrome (Android device)
3. **Performance Validation:**
   - Desktop: 3D scene renders at 60 FPS (measured with DevTools)
   - Mobile: 3D scene renders at 30+ FPS
   - Desktop load time: <3 seconds (measured with Lighthouse)
   - Mobile load time: <5 seconds on 4G (throttled connection)
4. **Functionality Testing:**
   - All project cards clickable and expand correctly
   - Scroll/touch navigation works smoothly
   - All navigation menu links functional
   - Resume downloads successfully
   - External links open correctly
   - Loading animation displays and transitions smoothly
5. **Content Validation:**
   - No "Lorem ipsum" placeholder text
   - No broken images or missing assets
   - All text content is error-free (spelling, grammar)
   - Resume PDF is current version
6. **Lighthouse Audit:** Portfolio achieves score >80 in all categories (Performance, Accessibility, Best Practices, SEO)
7. **Console Errors:** No JavaScript errors in browser console (desktop or mobile)
8. **Responsive Testing:** Portfolio tested at breakpoints: 320px, 375px, 768px, 1024px, 1920px
9. **Launch Checklist Completed:** All MVP Launch Readiness items verified
10. **Portfolio URL Documented:** Public URL recorded and ready to share

---

## Checklist Results Report

*This section will be populated after running the PM checklist to validate PRD quality and completeness.*

---

## Next Steps

### UX Expert Prompt

*This PRD is ready for UX design review. Please create wireframes and visual design mockups based on the UI Design Goals section, paying special attention to the 3D scene layout, project card design, and mobile touch interactions.*

### Architect Prompt

*This PRD is ready for technical architecture. Please review the Technical Assumptions section and create a detailed architecture document covering component structure, state management, 3D scene optimization, and deployment configuration for Vercel/Netlify.*

---

**End of PRD Document**
