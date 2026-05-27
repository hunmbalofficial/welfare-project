import { motion } from 'framer-motion';
import GalleryImage from './GalleryImage';

const GalleryGrid = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <motion.div
          key={image._id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
        >
          <GalleryImage image={image} />
        </motion.div>
      ))}
    </div>
  );
};

export default GalleryGrid;
