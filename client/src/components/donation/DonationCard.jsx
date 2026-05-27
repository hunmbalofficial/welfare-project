import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const DonationCard = ({ amount, title, description, popular }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative bg-white rounded-2xl p-8 shadow-sm border-2 text-center
        ${popular ? 'border-primary-500 shadow-lg' : 'border-gray-100'}`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </span>
      )}
      <FaHeart className={`text-3xl mx-auto mb-4 ${popular ? 'text-primary-600' : 'text-gray-300'}`} />
      <div className="text-4xl font-bold text-gray-900 mb-2">${amount}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      <button className={`w-full py-3 rounded-lg font-semibold transition-all
        ${popular 
          ? 'bg-primary-600 text-white hover:bg-primary-700' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
      >
        Donate ${amount}
      </button>
    </motion.div>
  );
};

export default DonationCard;
