import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Artwork } from '../../stores/artworkStore';
import { useCartStore } from '../../stores/cartStore';

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, index = 0 }) => {
  const { t } = useTranslation();
  const { addItem } = useCartStore();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (artwork.stock > 0) {
      addItem(artwork);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group"
    >
      <Link to={`/artwork/${artwork.id}`} className="block">
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            
            {/* Overlay Actions */}
            <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleAddToCart}
                disabled={artwork.stock === 0}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-full shadow-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={artwork.stock === 0 ? t('outOfStock') : t('addToCart')}
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
              <button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-full shadow-lg hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                artwork.category === 'physical' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {t(artwork.category)}
              </span>
            </div>

            {/* Stock Status */}
            {artwork.stock === 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
                  {t('outOfStock')}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                {artwork.title}
              </h3>
              <div className="text-right">
                <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  ${artwork.price}
                </p>
                {artwork.stock > 0 && artwork.stock <= 5 && (
                  <p className="text-xs text-orange-600">
                    Only {artwork.stock} left
                  </p>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {artwork.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">by</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {artwork.artistName}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {artwork.year}
              </span>
            </div>

            {/* Tags */}
            {artwork.tags && artwork.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {artwork.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArtworkCard;