import { motion } from 'framer-motion';
import { HeartPulse, BookOpen, HeartHandshake, UtensilsCrossed, Scale, Building2, ArrowRight } from 'lucide-react';

const programs = [
  {
    icon: HeartPulse,
    title: 'Health Care',
    description: 'Accessible medical services and health awareness programs for underserved communities.',
    featured: false,
  },
  {
    icon: BookOpen,
    title: 'Education',
    description: 'Quality education initiatives including scholarships, school supplies, and adult literacy programs that empower individuals to build a better future.',
    featured: true,
  },
  {
    icon: HeartHandshake,
    title: 'Women Empowerment',
    description: 'Skill development and support programs for women to achieve financial independence.',
    featured: false,
  },
  {
    icon: UtensilsCrossed,
    title: 'Food Aid',
    description: 'Nutritional support and food distribution to families facing food insecurity.',
    featured: false,
  },
  {
    icon: Scale,
    title: 'Legal Help',
    description: 'Free legal aid and awareness camps for marginalized groups.',
    featured: false,
  },
  {
    icon: Building2,
    title: 'Community Development',
    description: 'Infrastructure projects and community-driven development initiatives.',
    featured: false,
  },
];

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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {programs.map((program, index) => {
            const Icon = program.icon;

            if (program.featured) {
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="lg:col-span-2 lg:row-span-1 bg-white rounded-xl border border-primary-200 overflow-hidden hover:border-primary-400 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                    <Icon size={56} className="text-white drop-shadow-md" />
                  </div>
                  <div className="p-8">
                    <h3 className="font-display text-2xl text-primary-900 mb-3">
                      {program.title}
                    </h3>
                    <p className="text-neutral-500 text-sm mb-4 leading-relaxed">
                      {program.description}
                    </p>
                    <a
                      href="/programs"
                      className="inline-flex items-center gap-1 text-primary-600 font-semibold hover:text-primary-700 transition-colors text-sm"
                    >
                      Learn More <ArrowRight size={16} />
                    </a>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl border border-primary-200 p-6 hover:border-primary-400 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-5">
                  <Icon size={28} className="text-primary-600" />
                </div>
                <h3 className="font-display text-xl text-primary-900 mb-2">
                  {program.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {program.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Programs;
