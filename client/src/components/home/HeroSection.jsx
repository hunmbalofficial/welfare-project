import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-gray-900">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-primary-800/80"></div>

      <div className="container-custom relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm mb-6">
              <FaHeart className="mr-2 text-secondary-400" />
              Making a Difference Together
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Bringing Hope to{' '}
              <span className="text-secondary-400">Those in Need</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-xl">
              We are dedicated to transforming lives through sustainable welfare programs, 
              education, healthcare, and community development initiatives.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/donate" className="bg-secondary-500 text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-secondary-400 transition-all transform hover:scale-105">
                Donate Now
              </Link>
              <Link to="/about" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all">
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              { number: '10K+', label: 'Lives Impacted', color: 'from-primary-400 to-primary-600' },
              { number: '50+', label: 'Active Projects', color: 'from-secondary-400 to-secondary-600' },
              { number: '200+', label: 'Volunteers', color: 'from-accent-400 to-accent-600' },
              { number: '15+', label: 'Years of Service', color: 'from-green-400 to-emerald-600' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl backdrop-blur-sm`}
              >
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
