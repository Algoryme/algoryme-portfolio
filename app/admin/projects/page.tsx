'use client';

import { useEffect, useState, useCallback } from 'react';
import { ProjectForm, ProjectList } from '@/components/admin';
import '@/styles/admin-projects.css';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: 'active' | 'archived';
  image_url?: string;
  link?: string;
  demo_link?: string;
  created_at: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Failed to load projects');
      }

      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error instanceof Error ? error.message : error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // This is safe - fetchProjects is memoized with useCallback
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProjects();
  }, [fetchProjects]);

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleFormSuccess = () => {
    fetchProjects();
    handleFormClose();
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/projects?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Failed to delete project');
      }

      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error instanceof Error ? error.message : error);
      alert('Failed to delete project');
    }
  };

  return (
    <div className="adminProjects">
      <div className="adminProjectsHeader">
        <div>
          <h1>Projects Management</h1>
          <p>Add, edit, or delete your projects</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="adminAddButton"
        >
          + Add Project
        </button>
      </div>

      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {loading ? (
        <div className="adminLoading">Loading projects...</div>
      ) : (
        <ProjectList
          projects={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
