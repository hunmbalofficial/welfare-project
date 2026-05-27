import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const news = [
  {
    category: 'Event',
    title: 'Annual Health Camp Serves Over 2,000 Patients in Rural Areas',
    date: 'March 15, 2026',
    excerpt:
      'Our mobile health initiative organized a week-long camp providing free medical checkups, medicines, and health awareness sessions across 12 remote villages.',
    featured: true,
  },
  {
    category: 'Update',
    title: 'New Education Scholarship Program Launched for 2026',
    date: 'February 28, 2026',
    excerpt:
      'Applications are now open for our merit-based scholarship program supporting underprivileged students.',
    featured: false,
  },
  {
    category: 'Update',
    title: 'Women Empowerment Workshop Series Reaches 500 Participants',
    date: 'February 10, 2026',
    excerpt:
      'Our skill development workshops continue to empower women with vocational training and entrepreneurial skills.',
    featured: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const NewsSection = () => {
  const featured = news.find((n) => n.featured);
  const sideNews = news.filter((n) => !n.featured);

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
            Latest News
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg">
            Stay updated with our latest activities and impact stories
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-6"
        >
          {featured && (
            <motion.div
              key="featured"
              variants={itemVariants}
              className="lg:col-span-2 bg-white rounded-xl border border-primary-100 overflow-hidden hover:shadow-card-hover transition-shadow"
            >
              <div className="h-64 bg-gradient-to-br from-primary-200 to-primary-400" />
              <div className="p-6">
                <span className="inline-block bg-primary-100 text-primary-700 text-xs px-3 py-1 rounded-full font-medium mb-3">
                  {featured.category}
                </span>
                <h3 className="font-display text-2xl text-primary-900 mb-3">
                  {featured.title}
                </h3>
                <p className="text-neutral-500 text-sm mb-2">
                  {featured.date}
                </p>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {featured.excerpt}
                </p>
              </div>
            </motion.div>
          )}

          <div className="flex flex-col gap-6">
            {sideNews.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl border border-primary-100 overflow-hidden hover:shadow-card-hover transition-shadow"
              >
                <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-300" />
                <div className="p-5">
                  <span className="inline-block bg-primary-100 text-primary-700 text-xs px-3 py-1 rounded-full font-medium mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-display text-lg text-primary-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 text-xs">{item.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-right mt-8"
        >
          <Link
            to="/news"
            className="inline-flex items-center gap-1 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            View All News <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
