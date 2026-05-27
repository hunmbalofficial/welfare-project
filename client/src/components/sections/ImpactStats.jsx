import { motion } from 'framer-motion';
import useCountUp from '../../hooks/useCountUp';

const CountUpNumber = ({ end, suffix = '' }) => {
  const count = useCountUp(end, 2000);
  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const ImpactStats = () => {
  const stats = [
    { value: 50000, label: 'People Helped', suffix: '+' },
    { value: 200, label: 'Programs Delivered', suffix: '+' },
    { value: 15, label: 'Years of Service', suffix: '+' },
  ];

  return (
    <section className="section-padding bg-primary-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl text-white">
            Our Impact in Numbers
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="font-display text-5xl text-white mb-2">
                <CountUpNumber end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-primary-200 text-lg font-body">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
