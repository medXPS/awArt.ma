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
        <div className="aspect-square w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 group-hover:scale-[1.02] group-hover:border-amber-200/50 dark:group-hover:border-amber-700/50 flex flex-col backdrop-blur-sm">
          
          {/* Top Section - Image (55% of square) */}
          <div className="relative w-full h-[55%] overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800">
            {/* Loading Skeleton */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-pulse" />
            )}
            
            {!imageError ? (
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } group-hover:scale-110`}
                loading="lazy"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800">
                <Package className="h-12 w-12 text-slate-400 dark:text-slate-500" />
              </div>
            )}
            
            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-lg border ${
                artwork.category === 'physical' 
                  ? 'bg-blue-500/90 text-white border-blue-400/50' 
                  : 'bg-purple-500/90 text-white border-purple-400/50'
              }`}>
                {artwork.category === 'physical' ? '🎨 Physical' : '💻 Digital'}
              </span>
              
              {artwork.featured && (
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg backdrop-blur-md border border-amber-300/50">
                  ⭐ Featured
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className={`p-2.5 rounded-full backdrop-blur-md shadow-lg transition-all duration-200 border ${
                  isLiked 
                    ? 'bg-red-500/90 text-white border-red-400/50' 
                    : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 border-white/50 dark:border-slate-700/50'
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </motion.button>
            </div>

            {/* Stock Status Overlay */}
            {artwork.stock === 0 && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg border border-red-400/50">
                  Sold Out
                </div>
              </div>
            )}

            {/* View Count */}
            <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20">
              <Eye className="h-3 w-3" />
              <span>{Math.floor(Math.random() * 500) + 50}</span>
            </div>
          </div>

          {/* Bottom Section - Content (45% of square) */}
          <div className="flex-1 p-4 flex flex-col overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
            
            {/* Title + Price + Stock (Priority Content) */}
            <div className="mb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight line-clamp-2 min-h-[2.5rem] mb-2">
                {artwork.title}
              </h3>
              
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  ${artwork.price.toLocaleString()}
                </p>
                {artwork.stock > 0 && artwork.stock <= 5 && (
                  <p className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full border border-red-200 dark:border-red-800/50">
                    Only {artwork.stock} left
                  </p>
                )}
              </div>
            </div>

            {/* Artist Info (Horizontal Layout) */}
            <div className="mb-3 p-3 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700/50 dark:to-slate-800/50 rounded-xl border border-slate-200/50 dark:border-slate-600/50">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-3 w-3 text-white" />
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white truncate" title={artwork.artistName}>
                    {artwork.artistName}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 flex-shrink-0">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-amber-400 fill-current" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {rating}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3 text-slate-400" />
                    <span className="text-slate-600 dark:text-slate-400 font-medium">
                      {artwork.year}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags (Compact Wrapping) */}
            {artwork.tags && artwork.tags.length > 0 && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-1.5">
                  {artwork.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-lg font-medium truncate max-w-[70px] border border-blue-200/50 dark:border-blue-800/50"
                      title={`#${tag}`}
                    >
                      #{tag}
                    </span>
                  ))}
                  {artwork.tags.length > 4 && (
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs rounded-lg font-medium border border-slate-200 dark:border-slate-600">
                      +{artwork.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Dimensions/Medium (Compact) */}
            {(artwork.dimensions || artwork.medium) && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-1.5">
                  {artwork.dimensions && (
                    <span className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-lg font-medium flex items-center border border-slate-200 dark:border-slate-600">
                      <Ruler className="h-3 w-3 mr-1 text-slate-500" />
                      <span className="truncate max-w-[80px]" title={artwork.dimensions}>
                        {artwork.dimensions}
                      </span>
                    </span>
                  )}
                  {artwork.medium && (
                    <span className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-lg font-medium flex items-center border border-slate-200 dark:border-slate-600">
                      <Palette className="h-3 w-3 mr-1 text-slate-500" />
                      <span className="truncate max-w-[60px]" title={artwork.medium}>
                        {artwork.medium}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Action Button (Bottom Aligned) */}
            <div className="mt-auto pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={artwork.stock === 0}
                className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 disabled:from-slate-400 disabled:to-slate-500 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm shadow-lg hover:shadow-xl border border-amber-400/50 hover:border-amber-300/50"
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