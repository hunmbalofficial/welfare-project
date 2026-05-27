import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getProjects } from '../../services/projectService';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Programs = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProjects();
        setProjects(res.data);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block w-16 h-1 bg-primary-500 rounded-full mb-3"></span>
          <span className="inline-block w-8 h-1 bg-primary-500 rounded-full mb-3 ml-1"></span>
          <h2 className="font-display text-4xl text-primary-900 mt-4 mb-4">
            Our Programs
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg">
            Comprehensive welfare programs designed to uplift communities and create lasting change
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-neutral-400 py-12">Loading programs...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-neutral-400 py-12">No programs available yet.</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                className="bg-white rounded-xl border border-primary-200 overflow-hidden hover:border-primary-400 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="h-44 bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-white/60 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-600">{project.title.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-lg font-semibold text-primary-900 mb-2">{project.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed flex-1 line-clamp-3">{project.description}</p>
                  <a
                    href={`/projects/${project._id}`}
                    className="inline-flex items-center gap-1 text-primary-600 font-semibold hover:text-primary-700 transition-colors text-sm mt-4"
                  >
                    Learn More <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Programs;
