import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Target, Binoculars, Heart } from 'lucide-react';
import Card from '../../components/ui/Card';

const missionItems = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To empower underserved communities through sustainable welfare programs that provide access to education, healthcare, and economic opportunities.',
  },
  {
    icon: Binoculars,
    title: 'Our Vision',
    description: 'A world where every individual has the opportunity to thrive in a just, equitable, and compassionate society.',
  },
  {
    icon: Heart,
    title: 'Our Values',
    description: 'Compassion, integrity, transparency, and community partnership guide every decision we make and every program we deliver.',
  },
];

const team = [
  { name: 'Aisha Khan', role: 'Founder & CEO', initials: 'AK' },
  { name: 'Omar Hassan', role: 'Director of Programs', initials: 'OH' },
  { name: 'Fatima Ali', role: 'Head of Operations', initials: 'FA' },
  { name: 'Zayd Ahmed', role: 'Community Outreach Lead', initials: 'ZA' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
};

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - WelfareOrg</title>
        <meta name="description" content="Learn about WelfareOrg's mission, vision, values, and the team dedicated to building better communities." />
      </Helmet>

      <section className="bg-primary-50 pt-28 pb-16">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl text-primary-900 mb-4"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-neutral-500 max-w-2xl mx-auto"
          >
            Dedicated to creating lasting change through compassion, innovation, and community partnership.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {missionItems.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <item.icon size={40} className="text-primary-600 mx-auto mb-4" />
                  <h3 className="font-display text-xl text-primary-800 mb-3">{item.title}</h3>
                  <p className="text-neutral-500 leading-relaxed">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-primary-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  WelfareOrg was founded in 2014 with a simple yet powerful belief: that every
                  community has the strength to transform itself when given the right support.
                </p>
                <p>
                  What began as a small group of volunteers distributing food packages has grown
                  into a structured organization running 45+ programs across education, healthcare,
                  livelihood development, and emergency relief.
                </p>
                <p>
                  Over the past decade, we have reached over 10,000 families, built 12 community
                  schools, provided medical camps in 30+ remote villages, and trained hundreds of
                  local leaders to sustain these efforts long after our initial intervention.
                </p>
                <p>
                  Our approach is rooted in listening first, then acting — working alongside
                  communities rather than prescribing solutions from afar.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="rounded-xl bg-gradient-to-br from-primary-200 via-primary-100 to-primary-50 min-h-[360px] flex items-center justify-center border border-primary-200 shadow-lg">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-600/20 flex items-center justify-center">
                    <Target size={40} className="text-primary-600" />
                  </div>
                  <p className="font-display text-primary-700 text-lg">12+ Years of Service</p>
                  <p className="text-primary-600 text-sm mt-1">1,200+ Families Impacted</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl text-primary-900 mb-3">Meet Our Team</h2>
            <p className="text-neutral-500 max-w-xl mx-auto">
              Passionate individuals committed to making a difference every day.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-600 flex items-center justify-center">
                    <span className="text-white font-display text-2xl font-bold">{member.initials}</span>
                  </div>
                  <h3 className="font-display text-lg text-primary-800">{member.name}</h3>
                  <p className="text-sm text-neutral-500 mt-1">{member.role}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
