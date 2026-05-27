import { motion } from 'framer-motion';
import { UserPlus, ClipboardCheck, Handshake, Heart } from 'lucide-react';

const steps = [
  {
    step: 1,
    icon: UserPlus,
    title: 'Register',
    description: 'Sign up as a beneficiary or volunteer through our simple registration process.',
  },
  {
    step: 2,
    icon: ClipboardCheck,
    title: 'Assessment',
    description: 'We assess your needs or interests to match you with the right program.',
  },
  {
    step: 3,
    icon: Handshake,
    title: 'Connect',
    description: 'We connect you with the appropriate program and support network.',
  },
  {
    step: 4,
    icon: Heart,
    title: 'Support',
    description: 'Ongoing support and follow-up to ensure lasting positive impact.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const HowItWorks = () => {
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
            How It Works
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg">
            A simple four-step process to get started with our programs
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden lg:flex items-start justify-between"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            return (
              <div key={step.step} className="flex items-start flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="mt-4 text-center max-w-[200px]">
                    <h3 className="font-display text-xl text-primary-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                {!isLast && (
                  <div className="flex-1 border-t-2 border-dashed border-primary-300 mt-6 mx-4 min-w-[60px]" />
                )}
              </div>
            );
          })}
        </motion.div>

        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex gap-5"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                    <Icon size={20} />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-primary-300 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-display text-xl text-primary-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
