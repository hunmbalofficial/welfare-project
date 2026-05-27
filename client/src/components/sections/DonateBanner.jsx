import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DonateBanner = () => {
  return (
    <section className="relative py-16 bg-primary-600 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08]" preserveAspectRatio="none">
        <defs>
          <pattern id="stripes" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="20" height="40" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stripes)" />
      </svg>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl text-white mb-8 max-w-2xl mx-auto">
            Help Someone Today. Every Rupee Counts.
          </h2>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 bg-white text-primary-700 rounded-full px-8 py-4 font-semibold hover:bg-primary-50 transition-colors"
          >
            Donate Now <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DonateBanner;
