import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';
import Modal from '../../components/ui/Modal';
import Loader from '../../components/ui/Loader';
import { ImageOff, Maximize2 } from 'lucide-react';

const Gallery = () => {
  const { data: images, loading, error } = useFetch(() => api.get('/gallery'), []);
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = Array.isArray(images) ? images : [];

  return (
    <>
      <Helmet>
        <title>Our Gallery - WelfareOrg</title>
        <meta name="description" content="Browse through our gallery showcasing the impact of our welfare projects and community work." />
      </Helmet>

      <section className="bg-primary-50 pt-28 pb-16">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl text-primary-900 mb-4"
          >
            Our Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-neutral-500 max-w-2xl mx-auto"
          >
            Moments that capture the impact of our work.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-gray-200 animate-pulse" />
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          {!loading && !error && galleryItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-neutral-500 text-lg">No gallery images available.</p>
            </div>
          )}

          {!loading && !error && galleryItems.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryItems.map((item, i) => (
                <motion.div
                  key={item._id || i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative group cursor-pointer aspect-square rounded-lg overflow-hidden"
                  onClick={() => setSelectedImage(item)}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title || 'Gallery image'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <ImageOff size={36} className="text-primary-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-primary-900/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="text-center text-white p-4">
                      <Maximize2 size={24} className="mx-auto mb-2" />
                      {item.title && (
                        <p className="text-sm font-medium">{item.title}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        title={selectedImage?.title || 'Gallery Image'}
        size="xl"
      >
        {selectedImage && (
          <div className="flex flex-col items-center">
            {selectedImage.image ? (
              <img
                src={selectedImage.image}
                alt={selectedImage.title || 'Gallery image'}
                className="w-full max-h-[70vh] object-contain rounded-lg"
              />
            ) : (
              <div className="w-full h-64 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center rounded-lg">
                <ImageOff size={48} className="text-primary-300" />
              </div>
            )}
            {selectedImage.description && (
              <p className="text-neutral-600 text-sm mt-4 text-center max-w-lg">
                {selectedImage.description}
              </p>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default Gallery;
