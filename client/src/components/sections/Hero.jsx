import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Shield, Users } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50 pt-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary-300/20 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-primary-100/40 blur-2xl" />
      </div>

      <div className="container-custom relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center"
        >
          <div className="flex flex-col gap-8">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-5 py-2 rounded-full text-sm font-medium w-fit border border-primary-200"
            >
              <Heart size={16} className="fill-primary-500 text-primary-500" />
              Making a Difference Since 2014
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.08] text-primary-900"
            >
              Together We{' '}
              <span className="text-primary-500">Build Better</span>{' '}
              Communities
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-neutral-600 max-w-lg font-body leading-relaxed"
            >
              Empowering lives through sustainable welfare programs, education,
              healthcare, and community development initiatives across the region.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/donate"
                className="group inline-flex items-center gap-2 bg-primary-600 text-white rounded-full px-8 py-4 font-semibold hover:bg-primary-700 transition-all duration-300 shadow-green hover:shadow-xl hover:-translate-y-0.5"
              >
                Donate Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 border-2 border-primary-200 text-primary-700 rounded-full px-8 py-4 font-semibold hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-300"
              >
                Our Programs
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-8 pt-4 border-t border-primary-100"
            >
              {[
                { icon: Users, value: '1,200+', label: 'Families Helped' },
                { icon: Shield, value: '45', label: 'Active Programs' },
                { icon: Heart, value: '12+', label: 'Years of Service' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                    <stat.icon size={18} className="text-primary-600" />
                  </div>
                  <div>
                    <span className="block font-bold text-primary-900 leading-tight">{stat.value}</span>
                    <span className="block text-xs text-neutral-500 leading-tight">{stat.label}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              <div className="relative rounded-2xl overflow-hidden min-h-[500px] shadow-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-primary-900/10" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Users size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">1,200+ Families</p>
                        <p className="text-white/70 text-sm">Received support this year</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-sm border border-white/10">Education</span>
                      <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-sm border border-white/10">Healthcare</span>
                      <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-sm border border-white/10">Community</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-6 right-6 float-anim">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20">
                    <p className="text-white font-bold text-sm">45 Active Programs</p>
                  </div>
                </div>
                <div className="absolute top-24 left-6 float-delayed">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20">
                    <p className="text-white font-bold text-sm">12+ Years of Service</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
