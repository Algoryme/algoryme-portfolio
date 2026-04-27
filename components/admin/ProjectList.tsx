'use client';

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

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export default function ProjectList({ projects, onEdit, onDelete }: ProjectListProps) {
  if (projects.length === 0) {
    return <div className="adminEmpty">No projects yet. Create one to get started!</div>;
  }

  return (
    <div className="adminProjectsTable">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Technologies</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <div>
                  <strong>{project.title}</strong>
                  <p className="adminTableSmall">{project.description.substring(0, 50)}...</p>
                </div>
              </td>
              <td>
                <div className="adminTechList">
                  {project.technologies?.slice(0, 2).map((tech, i) => (
                    <span key={i} className="adminTechBadge">{tech}</span>
                  ))}
                  {project.technologies?.length > 2 && (
                    <span className="adminTechBadge">+{project.technologies.length - 2}</span>
                  )}
                </div>
              </td>
              <td>
                <span className={`adminStatusBadge ${project.status}`}>
                  {project.status === 'active' ? '✓ Active' : '◯ Archived'}
                </span>
              </td>
              <td className="adminTableSmall">
                {new Date(project.created_at).toLocaleDateString()}
              </td>
              <td>
                <div className="adminTableActions">
                  <button
                    onClick={() => onEdit(project)}
                    className="adminActionButton edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(project.id)}
                    className="adminActionButton delete"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
