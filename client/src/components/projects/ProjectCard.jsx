import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { truncateText } from '../../utils/truncateText';

const ProjectCard = ({ project }) => {
  const progress = project.targetAmount > 0
    ? Math.min((project.collectedAmount / project.targetAmount) * 100, 100)
    : 0;

  return (
    <div className="card group">
      <div className="relative overflow-hidden h-56">
        <img
          src={project.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <span className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {project.category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
        <p className="text-gray-600 mb-4">{truncateText(project.description, 120)}</p>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Raised: ${project.collectedAmount?.toLocaleString() || 0}</span>
            <span>Goal: ${project.targetAmount?.toLocaleString() || 0}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-right text-sm text-primary-600 font-medium mt-1">{Math.round(progress)}%</div>
        </div>
        <Link
          to={`/projects`}
          className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
        >
          Learn More <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
