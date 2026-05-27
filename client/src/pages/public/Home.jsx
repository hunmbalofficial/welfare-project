import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Hero from '../../components/sections/Hero';
import Programs from '../../components/sections/Programs';
import ImpactStats from '../../components/sections/ImpactStats';
import HowItWorks from '../../components/sections/HowItWorks';
import DonateBanner from '../../components/sections/DonateBanner';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const sections = [
  Hero, Programs, ImpactStats, HowItWorks,
  DonateBanner,
];

const Home = () => {
  return (
    <>
      <Helmet>
        <title>WelfareOrg - Together We Build Better Communities</title>
        <meta name="description" content="WelfareOrg is dedicated to transforming lives through sustainable welfare programs, education, healthcare, and community development initiatives." />
      </Helmet>
      <div>
        {sections.map((Section, i) => (
          <motion.div
            key={i}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <Section />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Home;
