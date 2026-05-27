import { HiPencil, HiTrash } from 'react-icons/hi';
import { formatDate } from '../../utils/formatDate';
import showToast from '../../utils/toast';

const ProjectTable = ({ projects, onEdit, onDelete }) => {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Image</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Title</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Raised</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Goal</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((project) => (
              <tr key={project._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img src={project.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{project.title}</td>
                <td className="px-6 py-4">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">${project.collectedAmount?.toLocaleString() || 0}</td>
                <td className="px-6 py-4 text-gray-600">${project.targetAmount?.toLocaleString() || 0}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{formatDate(project.createdAt)}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => onEdit(project)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-2">
                    <HiPencil size={18} />
                  </button>
                  <button onClick={() => handleDelete(project._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <HiTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {projects.length === 0 && (
        <div className="text-center py-12 text-gray-500">No projects found</div>
      )}
    </div>
  );
};

export default ProjectTable;
