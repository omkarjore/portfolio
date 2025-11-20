import React from 'react';
import { useAppContext } from '../../context/AppContext';

export const Awards: React.FC = () => {
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

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Awards & Activities</h1>

          <div className="space-y-8">
            {/* NSS Team Leader */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">NSS Team Leader</h2>
                <p className="text-gray-700">
                  Led the National Service Scheme (NSS) team, organizing community service activities and
                  coordinating volunteer efforts for social development initiatives.
                </p>
              </div>
            </div>

            {/* Rudragarjana Vadya Pathak */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Rudragarjana Vadya Pathak</h2>
                <p className="text-gray-700">
                  Participated in traditional Indian music and cultural activities, showcasing dedication to
                  preserving and performing classical arts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
