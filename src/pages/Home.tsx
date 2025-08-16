import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Palette, Award, Users, Star, Play, Sparkles, TrendingUp, Heart, Eye, Zap, Shield, Globe, Search } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useArtworkStore } from '../stores/artworkStore';
import ArtworkCard from '../components/Common/ArtworkCard';
import SearchBar from '../components/Common/SearchBar';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { getFeaturedArtworks, setFilters } = useArtworkStore();
  const navigate = useNavigate();
  const featuredArtworks = getFeaturedArtworks();
  
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const artworksRef = useRef(null);
  const statsRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const artworksInView = useInView(artworksRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const handleSearch = (query: string) => {
    setFilters({ search: query });
    navigate('/artworks');
  };

  const stats = [
    { number: "15K+", label: "Artworks", icon: Palette, color: "from-purple-500 to-pink-500" },
    { number: "2.5K+", label: "Artists", icon: Users, color: "from-blue-500 to-cyan-500" },
    { number: "98%", label: "Satisfaction", icon: Star, color: "from-yellow-500 to-orange-500" },
    { number: "50+", label: "Countries", icon: Globe, color: "from-green-500 to-emerald-500" },
  ];

  const features = [
    {
      icon: Palette,
      title: "Curated Moroccan Art",
      description: "Discover authentic Moroccan artworks handpicked by our expert curators for exceptional quality and cultural significance.",
      gradient: "from-purple-500 via-pink-500 to-red-500",
      delay: 0
    },
    {
      icon: Shield,
      title: "Verified Artists",
      description: "Work directly with authenticated Moroccan artists who have been verified through our comprehensive KYC process.",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      delay: 0.2
    },
    {
      icon: Zap,
      title: "Instant Digital Delivery",
      description: "Get digital artworks delivered instantly to your inbox, or enjoy secure shipping for physical pieces across Morocco.",
      gradient: "from-yellow-500 via-orange-500 to-red-500",
      delay: 0.4
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ y, opacity }}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-400/30 to-yellow-400/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300 mb-6 border border-purple-200/50 dark:border-purple-700/50"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Discover Authentic Moroccan Art
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold leading-tight mb-8"
              >
                <span className="bg-gradient-to-r from-gray-900 via-purple-600 to-pink-600 dark:from-white dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Discover
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  Moroccan Art
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-2xl"
              >
                Explore authentic handcrafted and digital masterpieces from talented Moroccan artists. 
                Find the perfect piece that celebrates our rich cultural heritage.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/artworks"
                    className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-purple-500/25"
                  >
                    {t('shopNow')}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button className="group inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 font-semibold text-lg backdrop-blur-sm bg-white/50 dark:bg-gray-800/50">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </button>
                </motion.div>
              </motion.div>

              {/* Hero Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="max-w-2xl mx-auto lg:mx-0"
              >
                <SearchBar 
                  onSearch={handleSearch}
                  placeholder="Search for Moroccan art, artists, or styles..."
                  className="w-full"
                />
              </motion.div>

              {/* Stats Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="flex items-center justify-center lg:justify-start space-x-8 mt-12"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">15K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Artworks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">2.5K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Artists</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Cities</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Artwork Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-6">
                {/* Large Featured Artwork */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="col-span-2 relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-2 rounded-3xl shadow-2xl">
                    <img
                      src="https://images.pexels.com/photos/1070527/pexels-photo-1070527.jpeg?w=600&h=400&fit=crop"
                      alt="Featured artwork"
                      className="w-full h-64 object-cover rounded-2xl"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-purple-600 dark:text-purple-400">
                      Featured
                    </div>
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full">
                        <Heart className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full">
                        <Eye className="h-4 w-4 text-blue-500" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Smaller Artworks */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-xl">
                    <img
                      src="https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?w=300&h=300&fit=crop"
                      alt="Artwork"
                      className="w-full h-32 object-cover rounded-xl"
                    />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-xl">
                    <img
                      src="https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?w=300&h=300&fit=crop"
                      alt="Artwork"
                      className="w-full h-32 object-cover rounded-xl"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-2xl shadow-2xl"
              >
                <Palette className="h-6 w-6" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-orange-600 to-yellow-600 text-white p-3 rounded-2xl shadow-2xl"
              >
                <Star className="h-6 w-6" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        ref={statsRef}
        className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="text-center text-white"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`bg-gradient-to-r ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl`}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={statsInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  className="text-4xl font-bold mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-purple-100 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        className="py-24 bg-gray-50 dark:bg-gray-800 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">awArt.ma</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the finest Moroccan art marketplace with cutting-edge features designed for art lovers and creators.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: feature.delay, duration: 0.8 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300"></div>
                <div className="relative p-8 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`bg-gradient-to-r ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Artworks */}
      <motion.section
        ref={artworksRef}
        className="py-24 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={artworksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Featured
              </span> Masterpieces
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover our handpicked selection of exceptional Moroccan artworks from talented artists across the kingdom.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtworks.slice(0, 6).map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 50 }}
                animate={artworksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <ArtworkCard artwork={artwork} index={index} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={artworksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center mt-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/artworks"
                className="group inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-purple-500/25"
              >
                Explore All Artworks
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={artworksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Start Your
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Art Journey?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Join thousands of art enthusiasts and discover your next favorite piece from Morocco's finest artists. 
              Whether you're collecting or creating, your artistic adventure starts here.
            </p>
            
            {/* CTA Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="What kind of Moroccan art are you looking for?"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/artworks"
                  className="inline-flex items-center justify-center px-10 py-4 bg-white text-gray-900 rounded-2xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-white/25"
                >
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-10 py-4 border-2 border-white text-white rounded-2xl hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold text-lg"
                >
                  Join as Artist
                  <Palette className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;