import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { educationAPI } from '../../services/api';

interface Education {
  _id?: string;
  degree: string;
  institution: string;
  field?: string;
  grade?: string;
  startYear: number;
  endYear?: number;
  isCurrent: boolean;
  description?: string;
  certifications: string[];
  awards: string[];
  order: number;
}

export const EducationManager: React.FC = () => {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Education | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyEducation: Education = {
    degree: '',
    institution: '',
    field: '',
    grade: '',
    startYear: new Date().getFullYear(),
    endYear: undefined,
    isCurrent: false,
    description: '',
    certifications: [],
    awards: [],
    order: 0,
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await educationAPI.getAll();
      setEducation(response.data);
    } catch (error: any) {
      alert('Failed to fetch education: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (edu: Education) => {
    try {
      if (editing && editing._id) {
        await educationAPI.update(editing._id, edu);
        alert('Education updated successfully!');
      } else {
        await educationAPI.create(edu);
        alert('Education created successfully!');
      }
      fetchEducation();
      setShowForm(false);
      setEditing(null);
    } catch (error: any) {
      alert('Failed to save education: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return;

    try {
      await educationAPI.delete(id);
      alert('Education deleted successfully!');
      fetchEducation();
    } catch (error: any) {
      alert('Failed to delete education: ' + error.message);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Total Entries: {education.length}</h3>
          <p className="text-sm text-gray-500">Manage your education & certifications</p>
        </div>
        <button
          onClick={() => {
            setEditing(emptyEducation);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Education
        </button>
      </div>

      {/* Form Modal */}
      {showForm && editing && (
        <EducationForm
          education={editing}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      {/* Education List */}
      <div className="space-y-4">
        {education.map((edu) => (
          <motion.div
            key={edu._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-lg font-bold text-gray-900">{edu.degree}</h4>
                  {edu.isCurrent && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                      CURRENT
                    </span>
                  )}
                </div>
                <p className="text-gray-700 font-medium mb-1">{edu.institution}</p>
                {edu.field && <p className="text-sm text-gray-600 mb-2">{edu.field}</p>}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>
                    {edu.startYear} - {edu.isCurrent ? 'Present' : edu.endYear}
                  </span>
                  {edu.grade && <span>• Grade: {edu.grade}</span>}
                </div>
                {edu.description && (
                  <p className="text-sm text-gray-600 mb-3">{edu.description}</p>
                )}
                {edu.certifications.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-500 font-semibold mb-1">Certifications:</p>
                    <div className="flex flex-wrap gap-1">
                      {edu.certifications.map((cert, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {edu.awards.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">Awards:</p>
                    <div className="flex flex-wrap gap-1">
                      {edu.awards.map((award, i) => (
                        <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded">
                          {award}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => {
                    setEditing(edu);
                    setShowForm(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => edu._id && handleDelete(edu._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const EducationForm: React.FC<{
  education: Education;
  onSave: (education: Education) => void;
  onCancel: () => void;
}> = ({ education: initialEducation, onSave, onCancel }) => {
  const [education, setEducation] = useState(initialEducation);
  const [certInput, setCertInput] = useState('');
  const [awardInput, setAwardInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(education);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold mb-6">
          {initialEducation._id ? 'Edit Education' : 'Add Education'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Degree/Course *</label>
              <input
                type="text"
                required
                value={education.degree}
                onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="e.g., B.E Computer Engineering"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Institution *</label>
              <input
                type="text"
                required
                value={education.institution}
                onChange={(e) => setEducation({ ...education, institution: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Field of Study</label>
              <input
                type="text"
                value={education.field}
                onChange={(e) => setEducation({ ...education, field: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Grade/CGPA</label>
              <input
                type="text"
                value={education.grade}
                onChange={(e) => setEducation({ ...education, grade: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="e.g., 8.18 CGPA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Start Year *</label>
              <input
                type="number"
                required
                value={education.startYear}
                onChange={(e) => setEducation({ ...education, startYear: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Year</label>
              <input
                type="number"
                value={education.endYear || ''}
                onChange={(e) => setEducation({ ...education, endYear: Number(e.target.value) || undefined })}
                className="w-full px-3 py-2 border rounded-lg"
                disabled={education.isCurrent}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isCurrent"
              checked={education.isCurrent}
              onChange={(e) => setEducation({ ...education, isCurrent: e.target.checked, endYear: e.target.checked ? undefined : education.endYear })}
              className="w-4 h-4"
            />
            <label htmlFor="isCurrent" className="text-sm font-medium">Currently pursuing</label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              rows={3}
              value={education.description}
              onChange={(e) => setEducation({ ...education, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
            >
              Save Education
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
