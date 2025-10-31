import React from 'react';
import { useAppContext } from '../../context/AppContext';

export const Education: React.FC = () => {
  const { setCurrentView } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Return to 3D Button */}
        <button
          onClick={() => setCurrentView('home')}
          className="mb-8 flex items-center text-cyan-600 hover:text-cyan-700 transition-colors font-semibold"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to 3D Experience
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Education & Certifications</h1>

          {/* Education Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Education</h2>

            {/* B.E Computer Engineering */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">B.E Computer Engineering</h3>
              <p className="text-lg text-gray-700 mb-2">Savitribai Phule Pune University (SPPU)</p>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-bold text-lg">
                  8.18 CGPA
                </span>
                <span>2021 - 2024</span>
              </div>
            </div>

            {/* HSC */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">HSC (Higher Secondary Certificate)</h3>
              <p className="text-lg text-gray-700 mb-2">Shri Ganesh Jr College, Korhale</p>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg font-semibold">
                  63.85%
                </span>
                <span>2019 - 2020</span>
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Certifications</h2>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Java FullStack Development</h3>
                <p className="text-gray-600">Professional Certification</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
