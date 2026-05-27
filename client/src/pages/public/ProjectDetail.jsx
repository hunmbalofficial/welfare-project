import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import useFetch from '../../hooks/useFetch';
import * as projectService from '../../services/projectService';
import ProjectDetails from '../../components/projects/ProjectDetails';
import Loader from '../../components/ui/Loader';

const ProjectDetail = () => {
  const { id } = useParams();
  const { data: project, loading, error } = useFetch(() => projectService.getProject(id), [id]);

  return (
    <>
      <Helmet>
        <title>{project ? `${project.title} - WelfareOrg` : 'Loading... - WelfareOrg'}</title>
        <meta name="description" content={project?.description || 'View project details'} />
      </Helmet>

      <div className="min-h-screen bg-primary-50/50">
        <div className="bg-white border-b border-primary-100">
          <div className="container-custom py-4">
            <Link to="/projects" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors group">
              <span className="rounded-full bg-primary-50 p-1.5 group-hover:bg-primary-100 transition-colors">
                <ArrowLeft size={16} />
              </span>
              Back to Projects
            </Link>
          </div>
        </div>

        <section className="py-10 md:py-14">
          <div className="container-custom">
            {loading && (
              <div className="flex flex-col items-center justify-center py-24">
                <Loader size="lg" text="Loading project..." />
              </div>
            )}

            {error && (
              <div className="max-w-lg mx-auto text-center py-24">
                <div className="rounded-full bg-red-50 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="font-display text-2xl text-gray-800 mb-2">Failed to Load Project</h2>
                <p className="text-gray-500 mb-8">{error}</p>
                <Link to="/projects" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium">
                  <ArrowLeft size={16} /> Back to Projects
                </Link>
              </div>
            )}

            {!loading && !error && !project && (
              <div className="max-w-lg mx-auto text-center py-24">
                <h2 className="font-display text-2xl text-gray-800 mb-2">Project Not Found</h2>
                <p className="text-gray-500 mb-8">This project may have been removed or doesn't exist.</p>
                <Link to="/projects" className="text-primary-600 hover:text-primary-700 font-medium">← Back to Projects</Link>
              </div>
            )}

            {!loading && !error && project && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <ProjectDetails project={project} />
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectDetail;
