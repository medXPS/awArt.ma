import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

const CartSidebar: React.FC = () => {
  const { t } = useTranslation();
  const { 
    items, 
    isOpen, 
    toggleCart, 
    updateQuantity, 
    removeItem, 
    getTotalPrice, 
    clearCart 
  } = useCartStore();

  const total = getTotalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{t('cart')}</h2>
                <button
                  onClick={toggleCart}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">{t('emptyCart')}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.filter(item => item.artwork).map((item) => (
                      <motion.div
                        key={item.artwork.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-gray-50 rounded-lg p-4"
                      >
                        <div className="flex items-start space-x-4">
                          <img
                            src={item.artwork.imageUrl}
                            alt={item.artwork.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {item.artwork.title}
                            </h3>
                            <p className="text-sm text-gray-500">{item.artwork.artistName}</p>
                            <p className="text-sm font-medium text-emerald-600 mt-1">
                              ${item.artwork.price}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.artwork.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.artwork.id, item.quantity - 1)}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-sm font-medium text-gray-900 min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.artwork.id, item.quantity + 1)}
                              disabled={item.quantity >= item.artwork.stock}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            ${(item.artwork.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-gray-200 p-6 space-y-4">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>{t('total')}:</span>
                    <span className="text-emerald-600">${total.toFixed(2)}</span>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        // Simulate checkout
                        alert('Checkout functionality would be implemented here!');
                        clearCart();
                        toggleCart();
                      }}
                      className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                    >
                      {t('checkout')}
                    </button>
                    <button
                      onClick={clearCart}
                      className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      Clear Cart
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

export default CartSidebar;