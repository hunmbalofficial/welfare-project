import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import useFetch from '../../hooks/useFetch';
import * as projectService from '../../services/projectService';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Loader from '../../components/ui/Loader';
import Pagination from '../../components/ui/Pagination';
import { truncateText } from '../../utils/truncateText';
import { ArrowRight, ImageOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 6;

const statusVariant = {
  active: 'success',
  completed: 'info',
  upcoming: 'warning',
  onhold: 'danger',
};

const Projects = () => {
  const { data: projects, loading, error } = useFetch(() => projectService.getProjects(), []);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    if (!projects) return 0;
    return Math.ceil(projects.length / ITEMS_PER_PAGE);
  }, [projects]);

  const currentItems = useMemo(() => {
    if (!projects) return [];
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return projects.slice(start, start + ITEMS_PER_PAGE);
  }, [projects, currentPage]);

  return (
    <>
      <Helmet>
        <title>Our Projects - WelfareOrg</title>
        <meta name="description" content="Explore WelfareOrg's projects and initiatives making a difference in communities worldwide." />
      </Helmet>

      <section className="bg-primary-50 pt-28 pb-16">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl text-primary-900 mb-4"
          >
            Our Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-neutral-500 max-w-2xl mx-auto"
          >
            Making a real difference through carefully planned initiatives.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {loading && (
            <div className="flex justify-center py-16">
              <Loader size="lg" text="Loading projects..." />
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          {!loading && !error && projects && projects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-neutral-500 text-lg">No projects available at the moment.</p>
            </div>
          )}

          {!loading && !error && currentItems.length > 0 && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentItems.map((project, i) => (
                  <motion.div
                    key={project._id || i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card hover className="overflow-hidden p-0">
                      {project.image ? (
                        <img
                          src={project.image.startsWith('http') ? project.image : `http://localhost:5000${project.image}`}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                          <ImageOff size={40} className="text-primary-300" />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant={statusVariant[project.status] || 'neutral'}>
                            {project.status || 'Active'}
                          </Badge>
                        </div>
                        <h3 className="font-display text-xl text-primary-800 mb-2">{project.title}</h3>
                        <p className="text-neutral-500 text-sm mb-4">
                          {truncateText(project.description, 120)}
                        </p>
                        <Link
                          to={`/projects/${project._id}`}
                          className="inline-flex items-center gap-1 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors"
                        >
                          Read More <ArrowRight size={16} />
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Projects;
