import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { getTestimonials } from '../../services/testimonialService';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getTestimonials();
        setTestimonials(res.data);
      } catch {
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <section className="section-padding bg-primary-50">
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
            What People Say
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg">
            Hear from the people whose lives have been touched by our work
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-neutral-400 py-12">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center text-neutral-400 py-12">No testimonials yet.</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial._id}
                variants={itemVariants}
                className="relative bg-white rounded-xl p-6 border-l-4 border-primary-400 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <span
                  className="absolute top-3 right-6 leading-none text-primary-100 select-none"
                  style={{ fontSize: '4rem', fontFamily: 'Playfair Display, serif', lineHeight: 1 }}
                >
                  &ldquo;
                </span>

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}
                    />
                  ))}
                </div>

                <p className="text-neutral-700 text-base italic leading-relaxed mb-6">
                  {testimonial.quote}
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {testimonial.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-primary-900 text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-neutral-500 text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
