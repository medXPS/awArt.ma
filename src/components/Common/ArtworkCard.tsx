import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Heart, Eye, Star, User, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
    <div className="group h-full w-full">
      <Link to={`/artwork/${artwork.id}`} className="block h-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full flex flex-col group-hover:scale-[1.02] group-hover:-translate-y-1">
          
          {/* Image Container - Perfect Square */}
          <div className="relative w-full aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
            {/* Loading Skeleton */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
            )}
            
            {!imageError ? (
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                } group-hover:scale-105`}
                loading="lazy"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <Palette className="h-16 w-16 text-gray-400 dark:text-gray-500" />
              </div>
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border ${
                artwork.category === 'physical' 
                  ? 'bg-blue-500/90 text-white border-blue-400/50' 
                  : 'bg-purple-500/90 text-white border-purple-400/50'
              }`}>
                {t(artwork.category)}
              </span>
              
              {artwork.featured && (
                <span className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-white border border-yellow-300/50 backdrop-blur-md">
                  ⭐ Featured
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500/90 text-white border-red-400/50' 
                    : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 border-white/50 dark:border-gray-700/50 hover:bg-red-50 dark:hover:bg-red-900/20'
                }`}
                title="Add to favorites"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                disabled={artwork.stock === 0}
                className="p-3 rounded-full backdrop-blur-md border bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 border-white/50 dark:border-gray-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                title={artwork.stock === 0 ? t('outOfStock') : t('addToCart')}
              >
                <ShoppingCart className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Stock Status Overlay */}
            {artwork.stock === 0 && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-red-500 text-white px-6 py-3 rounded-2xl font-semibold text-sm shadow-2xl">
                  {t('outOfStock')}
                </div>
              </div>
            )}

            {/* View Count */}
            <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Eye className="h-3 w-3" />
              <span>{Math.floor(Math.random() * 1000) + 100}</span>
            </div>
          </div>

          {/* Content Section - Flexible Height */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Title and Price */}
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 flex-1 mr-2 leading-tight">
                {artwork.title}
              </h3>
              <div className="text-right flex-shrink-0">
                <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ${artwork.price}
                </p>
                {artwork.stock > 0 && artwork.stock <= 5 && (
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                    Only {artwork.stock} left
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
              {artwork.description}
            </p>

            {/* Artist Info */}
            <div className="flex items-center space-x-2 mb-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {artwork.artistName}
                </p>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {(4.5 + Math.random() * 0.5).toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {artwork.year}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {artwork.tags && artwork.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {artwork.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md font-medium"
                  >
                    #{tag}
                  </span>
                ))}
                {artwork.tags.length > 3 && (
                  <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-md font-medium">
                    +{artwork.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700 mt-auto">
              <div className="flex items-center space-x-2">
                {artwork.dimensions && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                    {artwork.dimensions}
                  </span>
                )}
                {artwork.medium && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                    {artwork.medium}
                  </span>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={artwork.stock === 0}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {artwork.stock === 0 ? 'Sold Out' : 'Add to Cart'}
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArtworkCard;