import { motion } from 'framer-motion';
import { Calendar, Target, HandCoins, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE = 'http://localhost:5000';

const ProjectDetails = ({ project }) => {
  const progress = project.targetAmount > 0
    ? Math.min((project.collectedAmount / project.targetAmount) * 100, 100)
    : 0;

  const imageSrc = project.image && !project.image.startsWith('http')
    ? `${API_BASE}${project.image}`
    : project.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="relative h-[420px] md:h-[520px] rounded-2xl overflow-hidden mb-10 group">
        <img src={imageSrc} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          {project.category && (
            <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              {project.category}
            </span>
          )}
          <h1 className="font-display text-3xl md:text-5xl text-white leading-tight max-w-3xl">
            {project.title}
          </h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-primary-100">
            <h2 className="font-display text-2xl text-primary-800 mb-4">About This Project</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{project.description}</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-primary-100">
            <h2 className="font-display text-2xl text-primary-800 mb-6">Project Timeline</h2>
            <div className="space-y-6">
              {[
                { icon: Calendar, label: 'Started', value: project.createdAt ? new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A' },
                { icon: Clock, label: 'Last Updated', value: project.updatedAt ? new Date(project.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A' },
                { icon: Target, label: 'Status', value: project.status ? project.status.charAt(0).toUpperCase() + project.status.slice(1) : 'Active' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="rounded-full bg-primary-50 p-3"><item.icon className="w-5 h-5 text-primary-600" /></div>
                  <div><p className="text-sm text-gray-500">{item.label}</p><p className="font-medium text-gray-800">{item.value}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-primary-100 sticky top-28">
            <h3 className="font-display text-xl text-primary-800 mb-6">Funding Progress</h3>

            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm text-gray-500">Raised</span>
                <span className="font-display text-3xl font-bold text-primary-600">
                  Rs. {(project.collectedAmount || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-end mb-4">
                <span className="text-sm text-gray-500">Target</span>
                <span className="text-gray-700 font-semibold">
                  Rs. {(project.targetAmount || 0).toLocaleString()}
                </span>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-3 mb-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary-600 font-bold">{Math.round(progress)}% Complete</span>
                <span className="text-gray-400">Rs. {Math.max(0, (project.targetAmount || 0) - (project.collectedAmount || 0)).toLocaleString()} remaining</span>
              </div>
            </div>

            <Link
              to="/donate"
              className="block w-full text-center bg-primary-600 text-white rounded-full py-4 font-semibold hover:bg-primary-700 transition-colors"
            >
              <HandCoins className="inline w-5 h-5 mr-2" />Donate Now
            </Link>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
              <TrendingUp className="w-4 h-4" />
              <span>100% of donations go directly to this project</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
