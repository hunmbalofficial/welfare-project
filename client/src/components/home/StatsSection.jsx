import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaGraduationCap, FaHome, FaWater } from 'react-icons/fa';

const stats = [
  { icon: FaHandHoldingHeart, value: '10,000+', label: 'Lives Impacted', color: 'text-primary-600' },
  { icon: FaGraduationCap, value: '2,500+', label: 'Children Educated', color: 'text-blue-600' },
  { icon: FaHome, value: '500+', label: 'Homes Built', color: 'text-secondary-600' },
  { icon: FaWater, value: '50+', label: 'Clean Water Projects', color: 'text-cyan-600' },
];

const StatsSection = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <stat.icon className={`text-4xl ${stat.color} mx-auto mb-4`} />
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
