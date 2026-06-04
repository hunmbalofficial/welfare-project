import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../utils/constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img src="/images/yaqeenlogo.png" alt="Yaqeen Welfare" className="h-10 w-auto" />
              <span className="font-display text-xl font-bold text-primary-700 tracking-tight">
                YAQEEN WELFARE
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary-100 text-primary-800'
                      : 'text-gray-600 hover:bg-primary-100 hover:text-primary-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/donate"
                className="bg-primary-600 text-white rounded-full px-6 py-2 text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
              >
                Donate Now
              </Link>
            </div>

            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white z-50 flex flex-col justify-center items-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-4"
            >
              {NAV_LINKS.map((link) => (
                <motion.div key={link.path} variants={itemVariants}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-display font-bold transition-colors ${
                      isActive(link.path)
                        ? 'text-primary-600'
                        : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="mt-6">
                <Link
                  to="/donate"
                  onClick={() => setIsOpen(false)}
                  className="bg-primary-600 text-white rounded-full px-8 py-3 text-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Donate Now
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
