import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Heart, Eye, Star, User, Calendar, Package, Ruler, Palette } from 'lucide-react';
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

  // Generate mock rating for display
  const rating = (4.2 + Math.random() * 0.8).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group w-full"
    >
      <Link to={`/artwork/${artwork.id}`} className="block w-full">
        {/* Perfect Square Container */}
        <div className="aspect-square w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group-hover:scale-[1.02] flex flex-col">
          
          {/* Top Section - Image (60% of square) */}
          <div className="relative w-full h-[60%] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
            {/* Loading Skeleton */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
            )}
            
            {!imageError ? (
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } group-hover:scale-105`}
                loading="lazy"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                <Package className="h-12 w-12 text-gray-400 dark:text-gray-500" />
              </div>
            )}
            
            {/* Top Badges */}
            <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
              <span className={`px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm shadow-sm ${
                artwork.category === 'physical' 
                  ? 'bg-blue-500/90 text-white' 
                  : 'bg-purple-500/90 text-white'
              }`}>
                {artwork.category === 'physical' ? 'Physical' : 'Digital'}
              </span>
              
              {artwork.featured && (
                <span className="px-2 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-sm backdrop-blur-sm">
                  ⭐ Featured
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className={`p-2 rounded-full backdrop-blur-sm shadow-lg transition-all duration-200 ${
                  isLiked 
                    ? 'bg-red-500/90 text-white' 
                    : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20'
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </motion.button>
            </div>

            {/* Stock Status Overlay */}
            {artwork.stock === 0 && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-lg">
                  Out of Stock
                </div>
              </div>
            )}

            {/* View Count */}
            <div className="absolute bottom-2 left-2 flex items-center space-x-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Eye className="h-3 w-3" />
              <span>{Math.floor(Math.random() * 500) + 50}</span>
            </div>
          </div>

          {/* Bottom Section - Content (40% of square) */}
          <div className="flex-1 p-3 flex flex-col overflow-hidden">
            
            {/* Title + Price + Stock (Top Priority) */}
            <div className="mb-2">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-tight line-clamp-2 mb-1">
                {artwork.title}
              </h3>
              
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ${artwork.price.toLocaleString()}
                </p>
                {artwork.stock > 0 && artwork.stock <= 5 && (
                  <p className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">
                    Only {artwork.stock} left
                  </p>
                )}
              </div>
            </div>

            {/* Artist Info (Horizontal Layout) */}
            <div className="mb-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1 flex-1 min-w-0">
                  <User className="h-3 w-3 text-purple-500 flex-shrink-0" />
                  <span className="font-medium text-gray-900 dark:text-white truncate" title={artwork.artistName}>
                    {artwork.artistName}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <div className="flex items-center space-x-0.5">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {rating}
                    </span>
                  </div>
                  <div className="flex items-center space-x-0.5">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {artwork.year}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags (Compact) */}
            {artwork.tags && artwork.tags.length > 0 && (
              <div className="mb-2">
                <div className="flex flex-wrap gap-1">
                  {artwork.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded font-medium truncate max-w-[60px]"
                      title={`#${tag}`}
                    >
                      #{tag}
                    </span>
                  ))}
                  {artwork.tags.length > 3 && (
                    <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded font-medium">
                      +{artwork.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Dimensions/Medium (Compact) */}
            {(artwork.dimensions || artwork.medium) && (
              <div className="mb-2">
                <div className="flex flex-wrap gap-1">
                  {artwork.dimensions && (
                    <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded font-medium flex items-center">
                      <Ruler className="h-3 w-3 mr-1" />
                      <span className="truncate max-w-[80px]" title={artwork.dimensions}>
                        {artwork.dimensions}
                      </span>
                    </span>
                  )}
                  {artwork.medium && (
                    <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded font-medium flex items-center">
                      <Palette className="h-3 w-3 mr-1" />
                      <span className="truncate max-w-[60px]" title={artwork.medium}>
                        {artwork.medium}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Action Button (Bottom Aligned) */}
            <div className="mt-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={artwork.stock === 0}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-2 px-3 rounded-lg font-bold transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center space-x-1 text-sm"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>{artwork.stock === 0 ? 'Sold Out' : 'Add to Cart'}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArtworkCard;