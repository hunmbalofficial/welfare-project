import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, align = 'center' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <div className={`inline-block mb-3 ${align === 'center' ? 'mx-auto' : ''}`}>
        <span className="inline-block w-16 h-1 bg-primary-500 rounded-full"></span>
        <span className="inline-block w-8 h-1 bg-secondary-500 rounded-full ml-1"></span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      {subtitle && (
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
