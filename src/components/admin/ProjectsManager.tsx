import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projectsAPI } from '../../services/api';

interface Project {
  _id?: string;
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  techStack: string[];
  githubUrl?: string;
  metrics?: string;
  isHero: boolean;
  position: [number, number, number];
  order: number;
}

export const ProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyProject: Project = {
    id: '',
    title: '',
    description: '',
    fullDescription: '',
    techStack: [],
    githubUrl: '',
    metrics: '',
    isHero: false,
    position: [0, 0, 0],
    order: 0,
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error: any) {
      alert('Failed to fetch projects: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (project: Project) => {
    try {
      if (editing && editing._id) {
        await projectsAPI.update(project.id, project);
        alert('Project updated successfully!');
      } else {
        await projectsAPI.create(project);
        alert('Project created successfully!');
      }
      fetchProjects();
      setShowForm(false);
      setEditing(null);
    } catch (error: any) {
      alert('Failed to save project: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsAPI.delete(id);
      alert('Project deleted successfully!');
      fetchProjects();
    } catch (error: any) {
      alert('Failed to delete project: ' + error.message);
    }
  };

  const handleEdit = (project: Project) => {
    setEditing(project);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditing(emptyProject);
    setShowForm(true);
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
          <h3 className="text-lg font-semibold text-gray-900">Total Projects: {projects.length}</h3>
          <p className="text-sm text-gray-500">Manage your portfolio projects</p>
        </div>
        <button
          onClick={handleNew}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Project
        </button>
      </div>

      {/* Form Modal */}
      {showForm && editing && (
        <ProjectForm
          project={editing}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project._id || project.id}
            project={project}
            onEdit={() => handleEdit(project)}
            onDelete={() => handleDelete(project.id)}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ project, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
    >
      {project.isHero && (
        <span className="inline-block px-2 py-1 bg-cyan-100 text-cyan-700 text-xs font-semibold rounded mb-2">
          HERO PROJECT
        </span>
      )}
      <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">{project.title}</h4>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {project.techStack.slice(0, 3).map((tech, i) => (
          <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
            {tech}
          </span>
        ))}
        {project.techStack.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
            +{project.techStack.length - 3}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors text-sm font-medium"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

const ProjectForm: React.FC<{
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}> = ({ project: initialProject, onSave, onCancel }) => {
  const [project, setProject] = useState(initialProject);
  const [techInput, setTechInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(project);
  };

  const addTech = () => {
    if (techInput.trim()) {
      setProject({ ...project, techStack: [...project.techStack, techInput.trim()] });
      setTechInput('');
    }
  };

  const removeTech = (index: number) => {
    setProject({ ...project, techStack: project.techStack.filter((_, i) => i !== index) });
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
          {initialProject._id ? 'Edit Project' : 'Add New Project'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project ID *</label>
              <input
                type="text"
                required
                value={project.id}
                onChange={(e) => setProject({ ...project, id: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="e.g., thermax-smartpid"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Order</label>
              <input
                type="number"
                value={project.order}
                onChange={(e) => setProject({ ...project, order: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              required
              value={project.title}
              onChange={(e) => setProject({ ...project, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Short Description *</label>
            <input
              type="text"
              required
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Full Description *</label>
            <textarea
              required
              rows={4}
              value={project.fullDescription}
              onChange={(e) => setProject({ ...project, fullDescription: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tech Stack *</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                className="flex-1 px-3 py-2 border rounded-lg"
                placeholder="Add technology..."
              />
              <button
                type="button"
                onClick={addTech}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2">
                  {tech}
                  <button type="button" onClick={() => removeTech(i)} className="hover:text-red-600">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">GitHub URL</label>
            <input
              type="url"
              value={project.githubUrl}
              onChange={(e) => setProject({ ...project, githubUrl: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Metrics/Impact</label>
            <input
              type="text"
              value={project.metrics}
              onChange={(e) => setProject({ ...project, metrics: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isHero"
              checked={project.isHero}
              onChange={(e) => setProject({ ...project, isHero: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="isHero" className="text-sm font-medium">Mark as Hero Project</label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
            >
              Save Project
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
