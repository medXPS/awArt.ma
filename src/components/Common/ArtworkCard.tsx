import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Heart, Eye, Star, User, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { Artwork } from '../../stores/artworkStore';
import { useCartStore } from '../../stores/cartStore';
import { useWishlistStore } from '../../stores/wishlistStore';

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, index = 0 }) => {
  const { t } = useTranslation();
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const isLiked = isInWishlist(artwork.id);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (artwork.stock > 0) {
      addItem(artwork);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      removeFromWishlist(artwork.id);
    } else {
      addToWishlist(artwork);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.4 }}
      className="group h-full"
    >
      <Link to={`/artwork/${artwork.id}`} className="block h-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 h-full flex flex-col group-hover:scale-[1.02] group-hover:-translate-y-2">
          
          {/* Image Container - Perfect Square with 4:3 ratio for better presentation */}
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
            {/* Loading Skeleton */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
            )}
            
            {!imageError ? (
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                } group-hover:scale-110`}
                loading="lazy"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                <Palette className="h-16 w-16 text-gray-400 dark:text-gray-500" />
              </div>
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-lg transition-all duration-300 ${
                artwork.category === 'physical' 
                  ? 'bg-blue-500/95 text-white border border-blue-400/30' 
                  : 'bg-purple-500/95 text-white border border-purple-400/30'
              }`}>
                {artwork.category === 'physical' ? '🎨' : '💻'} {t(artwork.category)}
              </span>
              
              {artwork.featured && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg backdrop-blur-md border border-yellow-300/30">
                  ⭐ Featured
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className={`p-2.5 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500/95 text-white border border-red-400/30' 
                    : 'bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-300 border border-white/30 dark:border-gray-700/30 hover:bg-red-50 dark:hover:bg-red-900/20'
                }`}
                title="Add to favorites"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                disabled={artwork.stock === 0}
                className="p-2.5 rounded-full backdrop-blur-md shadow-lg bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-300 border border-white/30 dark:border-gray-700/30 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                title={artwork.stock === 0 ? t('outOfStock') : t('addToCart')}
              >
                <ShoppingCart className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Stock Status Overlay */}
            {artwork.stock === 0 && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-20">
                <div className="bg-red-500 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-2xl border border-red-400">
                  {t('outOfStock')}
                </div>
              </div>
            )}

            {/* View Count */}
            <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <Eye className="h-3 w-3" />
              <span>{Math.floor(Math.random() * 1000) + 100} views</span>
            </div>
          </div>

          {/* Content Section - Optimized spacing and typography */}
          <div className="p-5 flex-1 flex flex-col space-y-3">
            {/* Title and Price */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 flex-1 leading-tight">
                {artwork.title}
              </h3>
              <div className="text-right flex-shrink-0">
                <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ${artwork.price}
                </p>
                {artwork.stock > 0 && artwork.stock <= 5 && (
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold mt-0.5">
                    Only {artwork.stock} left
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
              {artwork.description}
            </p>

            {/* Artist Info */}
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  {artwork.artistName}
                </p>
                <div className="flex items-center space-x-2 mt-0.5">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {(4.5 + Math.random() * 0.5).toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {artwork.year}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {artwork.tags && artwork.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {artwork.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-lg font-semibold border border-purple-200/50 dark:border-purple-700/50"
                  >
                    #{tag}
                  </span>
                ))}
                {artwork.tags.length > 3 && (
                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-lg font-semibold border border-gray-200 dark:border-gray-600">
                    +{artwork.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Bottom Section */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
              <div className="flex items-center space-x-2">
                {artwork.dimensions && (
                  <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-lg font-medium border border-gray-200 dark:border-gray-600">
                    📏 {artwork.dimensions}
                  </span>
                )}
                {artwork.medium && (
                  <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-lg font-medium border border-gray-200 dark:border-gray-600">
                    🎨 {artwork.medium}
                  </span>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={artwork.stock === 0}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {artwork.stock === 0 ? '❌ Sold Out' : '🛒 Add to Cart'}
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArtworkCard;