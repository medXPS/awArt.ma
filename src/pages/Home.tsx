import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Palette, Award, Users, Star, Play, Sparkles, TrendingUp, Heart, Eye, Zap, Shield, Globe, Search, ChevronDown } from 'lucide-react';
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
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
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
    { number: "15K+", label: "Artworks", icon: Palette, color: "from-amber-500 to-orange-500" },
    { number: "2.5K+", label: "Artists", icon: Users, color: "from-blue-500 to-cyan-500" },
    { number: "98%", label: "Satisfaction", icon: Star, color: "from-yellow-500 to-orange-500" },
    { number: "50+", label: "Countries", icon: Globe, color: "from-green-500 to-emerald-500" },
  ];

  const features = [
    {
      icon: Palette,
      title: "Authentic Moroccan Art",
      description: "Discover genuine Moroccan artworks handpicked by our expert curators, celebrating the rich cultural heritage of Morocco.",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      delay: 0
    },
    {
      icon: Shield,
      title: "Verified Artists",
      description: "Work directly with authenticated Moroccan artists who have been verified through our comprehensive KYC process.",
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
      delay: 0.2
    },
    {
      icon: Zap,
      title: "Instant Digital Delivery",
      description: "Get digital artworks delivered instantly, or enjoy secure shipping for physical pieces across Morocco and beyond.",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      delay: 0.4
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ y, opacity }}
        className="relative min-h-screen flex items-center justify-center"
      >
        {/* Moroccan Pattern Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern id=%22moroccan%22 x=%220%22 y=%220%22 width=%22100%22 height=%22100%22 patternUnits=%22userSpaceOnUse%22%3E%3Cpath d=%22M50 10 L90 50 L50 90 L10 50 Z%22 fill=%22none%22 stroke=%22%23f59e0b%22 stroke-width=%220.5%22 opacity=%220.1%22/%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2215%22 fill=%22none%22 stroke=%22%23dc2626%22 stroke-width=%220.5%22 opacity=%220.1%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23moroccan)%22/%3E%3C/svg%3E')] opacity-20" />
          
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-400/30 to-orange-400/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-red-400/30 to-pink-400/30 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full text-sm font-medium text-amber-700 dark:text-amber-300 mb-8 border border-amber-200/50 dark:border-amber-700/50 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              <span>🇲🇦 Authentic Moroccan Art Marketplace</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold leading-tight mb-8"
            >
              <motion.span 
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6, duration: 1 }}
                className="block bg-gradient-to-r from-slate-900 via-amber-600 to-red-600 dark:from-white dark:via-amber-400 dark:to-red-400 bg-clip-text text-transparent"
              >
                Discover
              </motion.span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8, duration: 1 }}
                className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent"
              >
                Moroccan Art
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed max-w-4xl mx-auto"
            >
              Experience the beauty of authentic Moroccan artistry from Fez to Marrakech. 
              <br />
              <span className="text-amber-600 dark:text-amber-400 font-semibold">
                Where ancient traditions meet modern creativity.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/artworks"
                  className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white rounded-2xl hover:from-amber-700 hover:via-orange-700 hover:to-red-700 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-amber-500/25 border border-amber-400/50"
                >
                  🎨 Explore the Gallery
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <button className="group inline-flex items-center justify-center px-10 py-5 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-2xl hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 font-semibold text-lg backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 shadow-xl">
                  <Play className="mr-3 h-6 w-6" />
                  Watch Our Story
                </button>
              </motion.div>
            </motion.div>

            {/* Hero Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="max-w-2xl mx-auto mb-16"
            >
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search for Moroccan art, artists, or styles..."
                className="w-full"
              />
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center text-slate-500 dark:text-slate-400"
              >
                <span className="text-sm mb-2">Discover More</span>
                <ChevronDown className="h-6 w-6" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        ref={statsRef}
        className="py-20 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern id=%22moroccan-stats%22 x=%220%22 y=%220%22 width=%2280%22 height=%2280%22 patternUnits=%22userSpaceOnUse%22%3E%3Cpath d=%22M40 5 L75 40 L40 75 L5 40 Z%22 fill=%22none%22 stroke=%22%23ffffff%22 stroke-width=%220.5%22 opacity=%220.1%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23moroccan-stats)%22/%3E%3C/svg%3E')] opacity-20" />
        
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
                  whileHover={{ scale: 1.1 }}
                  className={`bg-gradient-to-r ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl backdrop-blur-sm border border-white/20`}
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
                <div className="text-amber-100 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        className="py-24 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">awArt.ma</span>?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Experience Morocco's finest art marketplace with cutting-edge features designed for art lovers and creators.
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
                <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-800 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-slate-200/50 dark:border-slate-600/50"></div>
                <div className="relative p-8 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`bg-gradient-to-r ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/20`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Artworks */}
      <motion.section
        ref={artworksRef}
        className="py-24 bg-white dark:bg-slate-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={artworksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Featured
              </span> Masterpieces
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Discover our handpicked selection of exceptional Moroccan artworks from talented artists across the kingdom.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredArtworks.slice(0, 8).map((artwork, index) => (
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
                className="group inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white rounded-2xl hover:from-amber-700 hover:via-orange-700 hover:to-red-700 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-amber-500/25 border border-amber-400/50"
              >
                Explore All Artworks
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-amber-900 to-red-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern id=%22moroccan-cta%22 x=%220%22 y=%220%22 width=%22120%22 height=%22120%22 patternUnits=%22userSpaceOnUse%22%3E%3Cpath d=%22M60 10 L110 60 L60 110 L10 60 Z%22 fill=%22none%22 stroke=%22%23f59e0b%22 stroke-width=%220.5%22 opacity=%220.1%22/%3E%3Ccircle cx=%2260%22 cy=%2260%22 r=%2220%22 fill=%22none%22 stroke=%22%23dc2626%22 stroke-width=%220.5%22 opacity=%220.1%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23moroccan-cta)%22/%3E%3C/svg%3E')] opacity-20" />
          
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={artworksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Discover
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Moroccan Art?
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
              Join thousands of art enthusiasts and discover your next favorite piece from Morocco's finest artists. 
              Experience the beauty and culture of authentic Moroccan creativity.
            </p>
            
            {/* CTA Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="What kind of Moroccan art speaks to you?"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/artworks"
                  className="inline-flex items-center justify-center px-10 py-4 bg-white text-slate-900 rounded-2xl hover:bg-slate-100 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-white/25"
                >
                  🎨 Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-10 py-4 border-2 border-white text-white rounded-2xl hover:bg-white hover:text-slate-900 transition-all duration-300 font-semibold text-lg"
                >
                  👨‍🎨 Join as Artist
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