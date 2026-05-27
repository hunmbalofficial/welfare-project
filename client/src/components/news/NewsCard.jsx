import { Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';
import { truncateText } from '../../utils/truncateText';

const NewsCard = ({ news }) => {
  return (
    <div className="card group">
      <div className="relative overflow-hidden h-52">
        <img
          src={news.image || 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center text-gray-400 text-sm mb-3">
          <FaCalendarAlt className="mr-2" />
          {formatDate(news.createdAt)}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
          {news.title}
        </h3>
        <p className="text-gray-600 mb-4">{truncateText(news.content, 120)}</p>
        <Link
          to={`/news/${news._id}`}
          className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
