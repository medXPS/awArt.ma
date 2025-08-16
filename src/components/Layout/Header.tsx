import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Palette, ShoppingCart, User, Globe, LogOut, Menu, X, Sun, Moon, Settings, Bell, Search, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import { useCartStore } from '../../stores/cartStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useNotificationStore } from '../../stores/notificationStore';
import { useThemeStore } from '../../stores/themeStore';
import SearchBar from '../Common/SearchBar';
import NotificationDropdown from '../Notifications/NotificationDropdown';
import { useArtworkStore } from '../../stores/artworkStore';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { toggleCart, getTotalItems } = useCartStore();
  const { toggleWishlist, getTotalItems: getWishlistItems } = useWishlistStore();
  const { toggleNotifications, getUnreadCount } = useNotificationStore();
  const { isDark, toggleTheme } = useThemeStore();
  const { setFilters } = useArtworkStore();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const isRTL = i18n.language === 'ar';

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    setShowLangMenu(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const totalItems = getTotalItems();
  const wishlistItems = getWishlistItems();
  const unreadNotifications = getUnreadCount();

  const handleSearch = (query: string) => {
    setFilters({ search: query });
    if (query && window.location.pathname !== '/artworks') {
      navigate('/artworks');
    }
    setShowSearch(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowUserMenu(false);
      setShowLangMenu(false);
      setShowNotifications(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navItems = [
    { to: '/', label: t('home'), icon: '🏠' },
    { to: '/artworks', label: t('artworks'), icon: '🎨' },
    { to: '/artists', label: t('artists'), icon: '👨‍🎨' },
    { to: '/about', label: t('about'), icon: 'ℹ️' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 dark:border-gray-700/50' 
            : 'bg-transparent'
        }`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center ${isRTL ? 'order-3' : 'order-1'}`}
            >
              <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
                <div className="relative">
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 p-3 rounded-2xl shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-300">
                    <Palette className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                    awArt.ma
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1 font-medium">
                    {isRTL ? 'سوق الفن المغربي' : 'Moroccan Art Marketplace'}
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className={`hidden lg:flex items-center space-x-8 rtl:space-x-reverse ${isRTL ? 'order-1' : 'order-2'}`}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    to={item.to}
                    className="relative text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 font-semibold group px-4 py-2 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  >
                    <span className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm">{item.icon}</span>
                      <span>{item.label}</span>
                    </span>
                    <motion.span 
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"
                      whileHover={{ width: "100%" }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Search Bar - Desktop */}
            <div className={`hidden xl:block flex-1 max-w-md mx-8 ${isRTL ? 'order-2' : 'order-2'}`}>
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Right Side Actions */}
            <div className={`flex items-center space-x-2 rtl:space-x-reverse ${isRTL ? 'order-2' : 'order-3'}`}>
              
              {/* Mobile Search Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSearch(!showSearch)}
                className="xl:hidden p-2.5 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                <Search className="h-5 w-5" />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2.5 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Language Selector */}
              <div className="relative">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLangMenu(!showLangMenu);
                  }}
                  className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors px-3 py-2.5 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-semibold hidden sm:block">
                    {languages.find(lang => lang.code === i18n.language)?.flag} {i18n.language.toUpperCase()}
                  </span>
                </motion.button>
                
                <AnimatePresence>
                  {showLangMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden`}
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`block w-full text-left px-4 py-3 text-sm transition-colors hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 ${
                            i18n.language === lang.code ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <span className="flex items-center space-x-3 rtl:space-x-reverse">
                            <span className="text-lg">{lang.flag}</span>
                            <span className="font-medium">{lang.name}</span>
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notifications (for authenticated users) */}
              {isAuthenticated && (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleNotifications();
                    }}
                    className="relative p-2.5 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg"
                      >
                        {unreadNotifications > 9 ? '9+' : unreadNotifications}
                      </motion.span>
                    )}
                  </motion.button>
                  <NotificationDropdown />
                </div>
              )}

              {/* Wishlist */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleWishlist}
                className="relative p-2.5 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Heart className="h-5 w-5" />
                {wishlistItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg"
                  >
                    {wishlistItems > 9 ? '9+' : wishlistItems}
                  </motion.span>
                )}
              </motion.button>

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleCart}
                className="relative p-2.5 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg"
                  >
                    {totalItems > 99 ? '99+' : totalItems}
                  </motion.span>
                )}
              </motion.button>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserMenu(!showUserMenu);
                    }}
                    className="flex items-center space-x-3 rtl:space-x-reverse text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors px-3 py-2 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  >
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-purple-200 dark:ring-purple-800 shadow-lg" 
                      />
                    ) : (
                      <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <div className="hidden sm:block text-left rtl:text-right">
                      <p className="text-sm font-semibold">{user?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
                    </div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden`}
                      >
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                          <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                          <div className="flex items-center mt-2">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              user?.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                              user?.role === 'artist' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                              'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            }`}>
                              {user?.role}
                            </span>
                          </div>
                        </div>
                        
                        <Link
                          to="/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          <User className="h-4 w-4 mr-3 rtl:ml-3 rtl:mr-0" />
                          {t('dashboard')}
                        </Link>
                        
                        <Link
                          to="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          <Settings className="h-4 w-4 mr-3 rtl:ml-3 rtl:mr-0" />
                          Profile Settings
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors border-t border-gray-100 dark:border-gray-700"
                        >
                          <LogOut className="h-4 w-4 mr-3 rtl:ml-3 rtl:mr-0" />
                          {t('logout')}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3 rtl:space-x-reverse">
                  <Link
                    to="/login"
                    className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-semibold px-4 py-2 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  >
                    {t('login')}
                  </Link>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/register"
                      className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white px-6 py-2.5 rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                    >
                      {t('register')}
                    </Link>
                  </motion.div>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="px-4 py-4">
                <SearchBar onSearch={handleSearch} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 rtl:space-x-reverse text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-semibold py-3 px-4 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
                
                {!isAuthenticated && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-semibold py-3 px-4 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    >
                      {t('login')}
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white px-6 py-3 rounded-xl text-center font-semibold shadow-lg"
                    >
                      {t('register')}
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;