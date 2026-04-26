'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import '../../styles/admin-components.css';

interface Project {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  demo_link?: string;
  image_url?: string;
  status: 'active' | 'archived';
}

interface ProjectFormProps {
  project?: Project | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProjectForm({ project, onClose, onSuccess }: ProjectFormProps) {
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    technologies: [],
    link: '',
    demo_link: '',
    image_url: '',
    status: 'active',
  });
  const [techInput, setTechInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (project) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(project);
    } else {
      setFormData({
        title: '',
        description: '',
        technologies: [],
        link: '',
        demo_link: '',
        image_url: '',
        status: 'active',
      });
    }
  }, [project]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTech = () => {
    if (techInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const handleRemoveTech = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      const filename = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from('project-images')
        .upload(filename, file);

      if (error) throw error;

      const { data: publicUrl } = supabase.storage
        .from('project-images')
        .getPublicUrl(filename);

      return publicUrl.publicUrl;
    } catch {
      throw new Error('Failed to upload image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let imageUrl = formData.image_url;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const dataToSave = {
        ...formData,
        image_url: imageUrl,
      };

      if (project?.id) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update(dataToSave)
          .eq('id', project.id);

        if (error) throw error;
      } else {
        // Create new project
        const { error } = await supabase
          .from('projects')
          .insert([dataToSave]);

        if (error) throw error;
      }

      onSuccess();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminFormOverlay">
      <div className="adminFormModal">
        <div className="adminFormHeader">
          <h2>{project ? 'Edit Project' : 'Add New Project'}</h2>
          <button onClick={onClose} className="adminFormCloseButton">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="adminForm">
          <div className="adminFormGroup">
            <label>Project Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter project title"
              required
            />
          </div>

          <div className="adminFormGroup">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter project description"
              rows={4}
              required
            />
          </div>

          <div className="adminFormGroup">
            <label>Technologies</label>
            <div className="adminTechInput">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add technology (e.g., React, Node.js)"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="adminAddTechButton"
              >
                Add
              </button>
            </div>
            <div className="adminTechTags">
              {formData.technologies.map((tech, index) => (
                <span key={index} className="adminTechTag">
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(index)}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="adminFormRow">
            <div className="adminFormGroup">
              <label>Project Link</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                placeholder="https://github.com/..."
              />
            </div>

            <div className="adminFormGroup">
              <label>Demo Link</label>
              <input
                type="url"
                name="demo_link"
                value={formData.demo_link}
                onChange={handleInputChange}
                placeholder="https://demo.example.com"
              />
            </div>
          </div>

          <div className="adminFormGroup">
            <label>Project Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.image_url && (
              <p className="adminImagePreview">Current: {formData.image_url}</p>
            )}
          </div>

          <div className="adminFormGroup">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {error && <div className="adminError">{error}</div>}

          <div className="adminFormActions">
            <button
              type="button"
              onClick={onClose}
              className="adminCancelButton"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="adminSubmitButton"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
