import { motion } from 'framer-motion';
import { FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';
import { Link } from 'react-router-dom';

const NewsDetails = ({ news }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden"
    >
      <div className="h-80 overflow-hidden">
        <img
          src={news.image || 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}
          alt={news.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-8">
        <Link to="/news" className="inline-flex items-center text-primary-600 font-medium mb-6 hover:text-primary-700">
          <FaArrowLeft className="mr-2" /> Back to News
        </Link>
        <div className="flex items-center text-gray-400 text-sm mb-4">
          <FaCalendarAlt className="mr-2" />
          {formatDate(news.createdAt)}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{news.title}</h1>
        <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
          {news.content}
        </div>
      </div>
    </motion.article>
  );
};

export default NewsDetails;
