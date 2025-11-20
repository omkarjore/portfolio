import React from 'react';
import { useAppContext } from '../../context/AppContext';

export const About: React.FC = () => {
  const { returnToWelcome } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Return to 3D Button */}
        <button
          onClick={returnToWelcome}
          className="mb-8 flex items-center text-cyan-600 hover:text-cyan-700 transition-colors font-semibold"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Welcome
        </button>

        {/* About Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Professional Photo */}
            <div className="flex-shrink-0">
              <img
                src="/profile-photo.jpg"
                alt="Omkar Jore - CAD Automation Developer"
                className="w-48 h-48 rounded-full object-cover object-top shadow-lg border-4 border-gray-100"
                style={{ objectPosition: '50% 20%' }}
              />
            </div>

            {/* Bio Content */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Omkar Jore</h1>

              {/* Specialization Statement */}
              <p className="text-xl text-cyan-600 font-semibold mb-6">
                C# .NET Developer specializing in CAD Automation, Autodesk API Integration (Navisworks, AutoCAD), and intelligent P&ID automation
              </p>

              {/* Professional Bio */}
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  I'm a C# .NET Developer at Inventive Business Solutions with 2 years of experience
                  specializing in CAD automation and Autodesk API integration. My expertise lies in
                  developing custom solutions that streamline engineering workflows and significantly
                  reduce manual drafting time.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  In my time at Inventive Business Solutions, I've delivered high-impact automation projects for major
                  industrial clients including THERMAX, L&T, and PRAJ. My flagship project, the
                  SmartPID automation system, reduced drafting time by 40% and automated over 50
                  technical drawings, demonstrating the transformative power of intelligent automation
                  in engineering design.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  I specialize in working with Autodesk APIs (Navisworks, AutoCAD), .NET 8, and
                  integrating AI technologies to create sophisticated automation tools. My focus is on
                  building solutions that not only solve immediate technical challenges but also
                  establish scalable frameworks for future innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
