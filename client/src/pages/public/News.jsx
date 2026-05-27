import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import useFetch from '../../hooks/useFetch';
import * as newsService from '../../services/newsService';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Loader from '../../components/ui/Loader';
import { truncateText } from '../../utils/truncateText';
import { ImageOff, Calendar, ArrowRight } from 'lucide-react';

const News = () => {
  const { data: news, loading, error } = useFetch(() => newsService.getNews(), []);

  return (
    <>
      <Helmet>
        <title>Latest News - WelfareOrg</title>
        <meta name="description" content="Stay updated with the latest news, stories, and updates from WelfareOrg." />
      </Helmet>

      <section className="bg-primary-50 pt-28 pb-16">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl text-primary-900 mb-4"
          >
            Latest News
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-neutral-500 max-w-2xl mx-auto"
          >
            Stay informed about our latest activities and impact stories.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="animate-pulse">
                  <div className="bg-gray-200 rounded-xl h-48 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-1" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-1" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          {!loading && !error && (!news || news.length === 0) && (
            <div className="text-center py-16">
              <p className="text-neutral-500 text-lg">No news articles yet.</p>
            </div>
          )}

          {!loading && !error && news && news.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item, i) => (
                <motion.div
                  key={item._id || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link to={`/news/${item._id}`} className="block group">
                    <Card hover className="overflow-hidden p-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                          <ImageOff size={40} className="text-primary-300" />
                        </div>
                      )}
                      <div className="p-6">
                        {item.category && (
                          <div className="mb-3">
                            <Badge variant="info" size="sm">
                              {item.category}
                            </Badge>
                          </div>
                        )}
                        <h3 className="font-display text-lg text-primary-800 mb-2 group-hover:text-primary-600 transition-colors">
                          {item.title}
                        </h3>
                        {item.createdAt && (
                          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-3">
                            <Calendar size={14} />
                            {format(new Date(item.createdAt), 'MMMM dd, yyyy')}
                          </div>
                        )}
                        <p className="text-sm text-neutral-500 leading-relaxed">
                          {truncateText(item.content || item.excerpt || '', 120)}
                        </p>
                        <div className="mt-4 flex items-center gap-1 text-primary-600 text-sm font-medium">
                          Read More <ArrowRight size={14} />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default News;
