import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import useFetch from '../../hooks/useFetch';
import * as newsService from '../../services/newsService';
import Badge from '../../components/ui/Badge';
import Loader from '../../components/ui/Loader';
import { ArrowLeft, Calendar, Globe, MessageCircle, ImageOff, Share2, Send } from 'lucide-react';

const NewsDetail = () => {
  const { id } = useParams();
  const { data: item, loading, error } = useFetch(() => newsService.getNewsItem(id), [id]);

  if (loading) return <Loader fullScreen text="Loading article..." />;

  if (error || !item) {
    return (
      <>
        <Helmet>
          <title>Article Not Found - WelfareOrg</title>
        </Helmet>
        <section className="section-padding">
          <div className="container-custom text-center py-16">
            <p className="text-neutral-500 text-lg">News article not found.</p>
            <Link to="/news" className="inline-flex items-center gap-2 text-primary-600 font-medium mt-4 hover:text-primary-700">
              <ArrowLeft size={18} /> Back to News
            </Link>
          </div>
        </section>
      </>
    );
  }

  const shareUrl = window.location.href;
  const shareText = `Check out: ${item.title}`;

  return (
    <>
      <Helmet>
        <title>{item.title} - WelfareOrg</title>
        <meta name="description" content={(item.content || item.excerpt || '').substring(0, 160)} />
      </Helmet>

      <section className="section-padding">
        <div className="container-custom max-w-4xl mx-auto">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-primary-600 font-medium mb-8 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft size={18} /> Back to News
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {item.category && (
              <div className="mb-4">
                <Badge variant="info" size="sm">{item.category}</Badge>
              </div>
            )}

            <h1 className="font-display text-3xl md:text-4xl text-primary-900 mb-4">
              {item.title}
            </h1>

            {item.createdAt && (
              <div className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
                <Calendar size={16} />
                {format(new Date(item.createdAt), 'MMMM dd, yyyy')}
              </div>
            )}

            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-72 md:h-96 object-cover rounded-xl mb-8 shadow-md"
              />
            ) : (
              <div className="w-full h-72 md:h-96 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mb-8">
                <ImageOff size={60} className="text-primary-300" />
              </div>
            )}

            <div className="prose prose-green max-w-none text-neutral-700 leading-relaxed">
              {item.content ? (
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              ) : (
                item.excerpt && <p className="text-lg">{item.excerpt}</p>
              )}
            </div>

            <div className="mt-12 pt-8 border-t border-primary-100">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 text-sm font-medium text-primary-700">
                  <Share2 size={16} /> Share this article
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Globe size={18} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Send size={18} />
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors"
                    aria-label="Share on WhatsApp"
                  >
                    <MessageCircle size={18} />
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>
    </>
  );
};

export default NewsDetail;
