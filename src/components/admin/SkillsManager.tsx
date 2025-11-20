import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { skillsAPI } from '../../services/api';

interface Skill {
  _id?: string;
  category: string;
  name: string;
  level: string;
  icon?: string;
  order: number;
}

export const SkillsManager: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [showForm, setShowForm] = useState(false);

  const categories = ['Languages', 'Frameworks & Libraries', 'Tools & Technologies', 'Databases', 'Other'];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const emptySkill: Skill = {
    category: 'Languages',
    name: '',
    level: 'Intermediate',
    icon: '',
    order: 0,
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await skillsAPI.getAll();
      setSkills(response.data);
    } catch (error: any) {
      alert('Failed to fetch skills: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (skill: Skill) => {
    try {
      if (editing && editing._id) {
        await skillsAPI.update(editing._id, skill);
        alert('Skill updated successfully!');
      } else {
        await skillsAPI.create(skill);
        alert('Skill created successfully!');
      }
      fetchSkills();
      setShowForm(false);
      setEditing(null);
    } catch (error: any) {
      alert('Failed to save skill: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      await skillsAPI.delete(id);
      alert('Skill deleted successfully!');
      fetchSkills();
    } catch (error: any) {
      alert('Failed to delete skill: ' + error.message);
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

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
          <h3 className="text-lg font-semibold text-gray-900">Total Skills: {skills.length}</h3>
          <p className="text-sm text-gray-500">Manage your technical skills</p>
        </div>
        <button
          onClick={() => {
            setEditing(emptySkill);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Skill
        </button>
      </div>

      {/* Form Modal */}
      {showForm && editing && (
        <SkillForm
          skill={editing}
          categories={categories}
          levels={levels}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      {/* Skills by Category */}
      {categories.map((category) => (
        <div key={category} className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">{category}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {(groupedSkills[category] || []).map((skill) => (
              <div
                key={skill._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{skill.name}</p>
                  <p className="text-xs text-gray-500">{skill.level}</p>
                </div>
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={() => {
                      setEditing(skill);
                      setShowForm(true);
                    }}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => skill._id && handleDelete(skill._id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {(!groupedSkills[category] || groupedSkills[category].length === 0) && (
            <p className="text-gray-400 italic">No skills in this category yet</p>
          )}
        </div>
      ))}
    </div>
  );
};

const SkillForm: React.FC<{
  skill: Skill;
  categories: string[];
  levels: string[];
  onSave: (skill: Skill) => void;
  onCancel: () => void;
}> = ({ skill: initialSkill, categories, levels, onSave, onCancel }) => {
  const [skill, setSkill] = useState(initialSkill);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(skill);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold mb-6">
          {initialSkill._id ? 'Edit Skill' : 'Add New Skill'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Skill Name *</label>
            <input
              type="text"
              required
              value={skill.name}
              onChange={(e) => setSkill({ ...skill, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="e.g., React.js"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              required
              value={skill.category}
              onChange={(e) => setSkill({ ...skill, category: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Proficiency Level *</label>
            <select
              required
              value={skill.level}
              onChange={(e) => setSkill({ ...skill, level: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            >
              {levels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Order</label>
            <input
              type="number"
              value={skill.order}
              onChange={(e) => setSkill({ ...skill, order: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
            >
              Save Skill
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
