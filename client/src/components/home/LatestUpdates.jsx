import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import NewsCard from '../news/NewsCard';
import { getNews } from '../../services/newsService';
import Loader from '../common/Loader';

const LatestUpdates = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await getNews();
        setNews(data.slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle
          title="Latest Updates"
          subtitle="Stay informed about our recent activities and impact"
        />

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NewsCard news={item} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link to="/news" className="btn-outline inline-flex items-center space-x-2">
                <span>View All Updates</span>
                <FaArrowRight />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default LatestUpdates;
