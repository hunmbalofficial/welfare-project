import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';

const GalleryImage = ({ image }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="relative group cursor-pointer rounded-xl overflow-hidden"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={image.image}
          alt={image.caption}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <p className="text-white text-lg font-semibold px-4 text-center">{image.caption}</p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-12 right-0 text-white hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                <HiX size={28} />
              </button>
              <img
                src={image.image}
                alt={image.caption}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
              {image.caption && (
                <p className="text-white text-center mt-4 text-lg">{image.caption}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryImage;
