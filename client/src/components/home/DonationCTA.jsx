import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const DonationCTA = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <FaHeart className="text-5xl text-secondary-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Your Donation Can Change a Life
          </h2>
          <p className="text-xl text-gray-200 mb-10">
            Every contribution, no matter how small, brings hope and creates lasting change 
            in communities that need it most.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/donate"
              className="bg-secondary-500 text-gray-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-secondary-400 transition-all transform hover:scale-105"
            >
              Donate Now
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
            >
              Become a Volunteer
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DonationCTA;
