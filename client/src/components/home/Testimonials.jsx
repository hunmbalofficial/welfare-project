import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Sarah Ahmed',
    role: 'Community Member',
    content: 'Hope Foundation transformed our village with clean water and education. We are forever grateful for their support.',
    rating: 5,
  },
  {
    name: 'John Martinez',
    role: 'Volunteer',
    content: 'Volunteering with Hope Foundation has been the most rewarding experience of my life. They truly care about the communities they serve.',
    rating: 5,
  },
  {
    name: 'Aisha Khan',
    role: 'Beneficiary',
    content: 'The education program helped my children get quality learning. Now they have a bright future ahead, all thanks to Hope Foundation.',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block w-16 h-1 bg-primary-500 rounded-full mb-3"></span>
          <span className="inline-block w-8 h-1 bg-secondary-500 rounded-full mb-3 ml-1"></span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What People Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Hear from the people whose lives have been touched by our work
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm relative"
            >
              <FaQuoteLeft className="text-primary-200 text-3xl mb-4" />
              <p className="text-gray-600 mb-6 leading-relaxed">{testimonial.content}</p>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-secondary-400" />
                ))}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
