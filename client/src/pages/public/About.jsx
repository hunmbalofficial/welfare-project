import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Target, Binoculars, Heart, Users, MapPin, Award, ArrowRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
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

const stats = [
  { value: '12+', label: 'Years of Service', icon: Award },
  { value: '1,200+', label: 'Families Helped', icon: Users },
  { value: '45+', label: 'Active Programs', icon: Target },
  { value: '30+', label: 'Remote Villages', icon: MapPin },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
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
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-5 py-2 rounded-full text-sm font-medium border border-primary-200 mb-6"
          >
            <Heart size={14} className="text-primary-500" /> Get to Know Us
          </motion.span>
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

      <section className="section-padding -mt-16 relative z-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {missionItems.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="text-center h-full group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={32} className="text-primary-600" />
                    </div>
                    <h3 className="font-display text-xl text-primary-800 mb-3">{item.title}</h3>
                    <p className="text-neutral-500 leading-relaxed text-sm">{item.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary-600 font-semibold text-sm tracking-wider uppercase">Our Journey</span>
              <h2 className="font-display text-4xl text-primary-900 mt-3 mb-6 leading-tight">
                A Decade of{' '}
                <span className="text-primary-600">Service & Growth</span>
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-3 h-3 rounded-full bg-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-800">2014 — The Beginning</p>
                    <p className="text-sm mt-1">A small group of volunteers distributing food packages grew into a vision for structured change.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-3 h-3 rounded-full bg-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-800">2018 — Expansion</p>
                    <p className="text-sm mt-1">Launched education and healthcare programs, reaching 500+ families across 15 villages.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-3 h-3 rounded-full bg-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-800">2024 & Beyond</p>
                    <p className="text-sm mt-1">45+ active programs, 1,200+ families impacted, 30+ remote villages reached with sustainable support.</p>
                  </div>
                </div>
              </div>
              <Link to="/projects" className="inline-flex items-center gap-2 text-primary-600 font-semibold mt-6 hover:gap-3 transition-all">
                View Our Programs <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary-200/50">
                <div className="min-h-[400px] bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 relative flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/60 backdrop-blur flex items-center justify-center">
                      <Quote size={44} className="text-primary-600" />
                    </div>
                    <p className="text-primary-800 text-lg italic font-medium max-w-sm mx-auto leading-relaxed">
                      "Our approach is rooted in listening first, then acting — working alongside communities rather than prescribing solutions from afar."
                    </p>
                    <div className="mt-6 pt-4 border-t border-primary-400/30">
                      <p className="font-semibold text-primary-900">— Aisha Khan</p>
                      <p className="text-primary-700 text-sm">Founder & CEO</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')]" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-5 py-2 rounded-full text-sm font-medium border border-white/20 backdrop-blur-sm mb-4">
              <Award size={14} /> Our Impact in Numbers
            </span>
            <h2 className="font-display text-4xl text-white mt-2">Making a Difference</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-colors"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center">
                  <s.icon size={28} className="text-primary-300" />
                </div>
                <p className="font-display text-4xl font-bold text-white mb-1">{s.value}</p>
                <p className="text-primary-200 text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-5 py-2 rounded-full text-sm font-medium border border-primary-200 mb-4">
              <Users size={14} /> The People Behind the Mission
            </span>
            <h2 className="font-display text-4xl text-primary-900 mb-3">Meet Our Team</h2>
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
                <Card className="text-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-200 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-display text-3xl font-bold">{member.initials}</span>
                  </div>
                  <h3 className="font-display text-lg text-primary-800">{member.name}</h3>
                  <p className="text-sm text-neutral-500 mt-1">{member.role}</p>
                  <div className="mt-4 pt-4 border-t border-primary-100 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xs font-medium">in</div>
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xs font-medium">@</div>
                    </div>
                  </div>
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
