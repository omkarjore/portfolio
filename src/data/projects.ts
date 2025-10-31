export interface ProjectData {
  id: string;
  title: string;
  description: string;
  position: [number, number, number];
}

export const projects: ProjectData[] = [
  {
    id: 'thermax',
    title: 'Thermax SmartPID',
    description: 'Automated P&ID generation for THERMAX, L&T, PRAJ',
    position: [-3, 0, 0],
  },
  {
    id: 'navisworks',
    title: 'Navisworks Integration',
    description: 'Custom Navisworks plugin development',
    position: [0, 0, 0],
  },
  {
    id: 'console',
    title: 'Console Applications',
    description: 'C# automation tools and utilities',
    position: [3, 0, 0],
  },
];
