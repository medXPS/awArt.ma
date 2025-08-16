import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useCartStore } from '../../stores/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const WishlistSidebar: React.FC = () => {
  const { t } = useTranslation();
  const { 
    items, 
    isOpen, 
    toggleWishlist, 
    removeItem, 
    clearWishlist 
  } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const handleAddToCart = (artwork: any) => {
    if (artwork.stock > 0) {
      addToCart(artwork);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleWishlist}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Wishlist</h2>
                <button
                  onClick={toggleWishlist}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Wishlist Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 dark:text-gray-500 mb-4">
                      <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">Your wishlist is empty</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Add artworks you love to save them for later</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.filter(item => item && item.artwork).map((item) => (
                      <motion.div
                        key={item.artwork.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                      >
                        <div className="flex items-start space-x-4">
                          <Link to={`/artwork/${item.artwork.id}`} onClick={toggleWishlist}>
                            <img
                              src={item.artwork.imageUrl}
                              alt={item.artwork.title}
                              className="w-16 h-16 object-cover rounded-lg hover:scale-105 transition-transform"
                            />
                          </Link>
                          <div className="flex-1 min-w-0">
                            <Link 
                              to={`/artwork/${item.artwork.id}`} 
                              onClick={toggleWishlist}
                              className="block"
                            >
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                {item.artwork.title}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.artwork.artistName}</p>
                            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-1">
                              ${item.artwork.price}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              Added {new Date(item.addedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <button
                              onClick={() => handleAddToCart(item.artwork)}
                              disabled={item.artwork.stock === 0}
                              className="p-2 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Add to cart"
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => removeItem(item.artwork.id)}
                              className="p-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                              title="Remove from wishlist"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{items.length} {items.length === 1 ? 'item' : 'items'} in wishlist</span>
                  </div>
                  <div className="space-y-2">
                    <Link
                      to="/artworks"
                      onClick={toggleWishlist}
                      className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium text-center block"
                    >
                      Continue Shopping
                    </Link>
                    <button
                      onClick={clearWishlist}
                      className="w-full bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors text-sm"
                    >
                      Clear Wishlist
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistSidebar;