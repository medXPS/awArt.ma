import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ShoppingCart, Heart, Share2, User, Calendar, Ruler, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useArtworkStore } from '../stores/artworkStore';
import { useCartStore } from '../stores/cartStore';
import ArtworkCard from '../components/Common/ArtworkCard';

const ArtworkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { getArtworkById, getArtworksByArtist } = useArtworkStore();
  const { addItem } = useCartStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const artwork = id ? getArtworkById(id) : null;
  const relatedArtworks = artwork ? getArtworksByArtist(artwork.artistId).filter(a => a.id !== artwork.id) : [];

  if (!artwork) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Artwork not found</h2>
          <Link
            to="/artworks"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Artworks
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (artwork.stock > 0) {
      addItem(artwork);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: artwork.title,
          text: artwork.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        <Link
          to="/artworks"
          className="inline-flex items-center text-gray-600 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Artworks
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-4"
          >
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Additional images placeholder - in real app, artwork would have multiple images */}
            <div className="grid grid-cols-4 gap-2">
              {[artwork.imageUrl].map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-emerald-500' : 'border-transparent'
                  } hover:border-emerald-300 transition-colors`}
                >
                  <img
                    src={image}
                    alt={`${artwork.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              artwork.category === 'physical' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-purple-100 text-purple-800'
            }`}>
              {t(artwork.category)}
            </span>

            {/* Title and Price */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {artwork.title}
              </h1>
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-emerald-600">
                  ${artwork.price}
                </span>
                {artwork.stock > 0 && artwork.stock <= 5 && (
                  <span className="text-sm text-orange-600 font-medium">
                    Only {artwork.stock} left in stock
                  </span>
                )}
              </div>
            </div>

            {/* Artist Info */}
            <div className="flex items-center space-x-3 py-4 border-y border-gray-200">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Created by</p>
                <Link
                  to={`/artist/${artwork.artistId}`}
                  className="font-medium text-gray-900 hover:text-emerald-600 transition-colors"
                >
                  {artwork.artistName}
                </Link>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {artwork.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              {artwork.dimensions && (
                <div className="flex items-center space-x-2">
                  <Ruler className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">{t('dimensions')}</p>
                    <p className="font-medium text-gray-900">{artwork.dimensions}</p>
                  </div>
                </div>
              )}
              
              {artwork.medium && (
                <div className="flex items-center space-x-2">
                  <Palette className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">{t('medium')}</p>
                    <p className="font-medium text-gray-900">{artwork.medium}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">{t('year')}</p>
                  <p className="font-medium text-gray-900">{artwork.year}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Stock</p>
                  <p className="font-medium text-gray-900">
                    {artwork.stock > 0 ? `${artwork.stock} available` : 'Out of stock'}
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            {artwork.tags && artwork.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('tags')}</h3>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={handleAddToCart}
                disabled={artwork.stock === 0}
                className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-xl hover:bg-emerald-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>{artwork.stock === 0 ? t('outOfStock') : t('addToCart')}</span>
              </button>
              
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-xl border-2 transition-colors ${
                  isLiked 
                    ? 'bg-red-50 border-red-200 text-red-600' 
                    : 'bg-white border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-600'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={handleShare}
                className="p-3 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-emerald-200 hover:text-emerald-600 transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related Artworks */}
        {relatedArtworks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              More from {artwork.artistName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArtworks.slice(0, 3).map((relatedArtwork, index) => (
                <ArtworkCard 
                  key={relatedArtwork.id} 
                  artwork={relatedArtwork} 
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ArtworkDetail;