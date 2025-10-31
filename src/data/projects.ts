export interface ProjectData {
  id: string;
  title: string;
  description: string;
  position: [number, number, number];
  fullDescription: string;
  techStack: string[];
  metrics?: string;
  githubUrl?: string;
}

export const projects: ProjectData[] = [
  {
    id: 'thermax',
    title: 'Thermax SmartPID',
    description: 'Automated P&ID generation for THERMAX, L&T, PRAJ',
    position: [-3, 0, 0],
    fullDescription: 'Automated P&ID (Piping and Instrumentation Diagram) generation system for major industrial clients. Reduced manual drafting time by 40% and automated over 50 technical drawings for THERMAX, L&T, and PRAJ projects.',
    techStack: ['C# .NET 8', 'Autodesk API', 'AI Integration', 'AutoCAD'],
    metrics: '40% time reduction, 50+ drawings automated',
    githubUrl: 'https://github.com/omkarjore/SmartPIDAutomation',
  },
  {
    id: 'navisworks',
    title: 'Navisworks Integration',
    description: 'Custom Navisworks plugin development',
    position: [0, 0, 0],
    fullDescription: 'Custom Navisworks plugin development for enhanced 3D model coordination and clash detection. Integrated with project workflows to streamline construction documentation and model review processes.',
    techStack: ['C#', 'Navisworks API', '.NET Framework', 'BIM'],
    githubUrl: 'https://github.com/omkarjore/navisworks-integration',
  },
  {
    id: 'console',
    title: 'Console Applications',
    description: 'C# automation tools and utilities',
    position: [3, 0, 0],
    fullDescription: 'Suite of C# console applications for CAD automation, file processing, and workflow optimization. Built custom tools for batch processing drawings, data extraction, and report generation.',
    techStack: ['C#', '.NET 8', 'File I/O', 'Automation'],
    githubUrl: 'https://github.com/omkarjore/console-apps',
  },
];
