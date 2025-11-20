import React, { useState, useEffect } from 'react';
import { aboutAPI } from '../../services/api';

interface AboutData {
  name: string;
  title: string;
  yearsOfExperience: number;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export const AboutManager: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [about, setAbout] = useState<AboutData>({
    name: '',
    title: '',
    yearsOfExperience: 0,
    bio: '',
    email: '',
    phone: '',
    location: '',
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: '',
    },
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await aboutAPI.get();
      if (response.data) {
        setAbout(response.data);
      }
    } catch (error: any) {
      console.error('Failed to fetch about data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await aboutAPI.update(about);
      alert('Profile updated successfully!');
    } catch (error: any) {
      alert('Failed to update profile: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-6">Profile Information</h3>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={about.name}
                onChange={(e) => setAbout({ ...about, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Professional Title *</label>
              <input
                type="text"
                required
                value={about.title}
                onChange={(e) => setAbout({ ...about, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="e.g., CAD Automation Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Years of Experience *</label>
              <input
                type="number"
                required
                min="0"
                value={about.yearsOfExperience}
                onChange={(e) => setAbout({ ...about, yearsOfExperience: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={about.location}
                onChange={(e) => setAbout({ ...about, location: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="e.g., Pune, India"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-1">Bio *</label>
            <textarea
              required
              rows={6}
              value={about.bio}
              onChange={(e) => setAbout({ ...about, bio: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                required
                value={about.email}
                onChange={(e) => setAbout({ ...about, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={about.phone}
                onChange={(e) => setAbout({ ...about, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-md font-semibold mb-3">Social Links</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  value={about.socialLinks?.linkedin}
                  onChange={(e) => setAbout({
                    ...about,
                    socialLinks: { ...about.socialLinks, linkedin: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={about.socialLinks?.github}
                  onChange={(e) => setAbout({
                    ...about,
                    socialLinks: { ...about.socialLinks, github: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="https://github.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Twitter URL</label>
                <input
                  type="url"
                  value={about.socialLinks?.twitter}
                  onChange={(e) => setAbout({
                    ...about,
                    socialLinks: { ...about.socialLinks, twitter: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="https://twitter.com/..."
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};
