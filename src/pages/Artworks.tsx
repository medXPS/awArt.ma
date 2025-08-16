import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useArtworkStore } from '../stores/artworkStore';
import ArtworkCard from '../components/Common/ArtworkCard';
import SearchBar from '../components/Common/SearchBar';

const Artworks: React.FC = () => {
  const { t } = useTranslation();
  const { getFilteredArtworks, filters, setFilters } = useArtworkStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'price' | 'title' | 'year'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredArtworks = getFilteredArtworks();
  
  const sortedArtworks = useMemo(() => {
    return [...filteredArtworks].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'year':
          comparison = a.year - b.year;
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [filteredArtworks, sortBy, sortOrder]);

  const handleSearchChange = (value: string) => {
    setFilters({ search: value });
  };

  const handleCategoryChange = (category: string) => {
    setFilters({ category });
  };

  const handlePriceChange = (range: [number, number]) => {
    setFilters({ priceRange: range });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('artworks')}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Discover unique artworks from talented artists worldwide
              </p>
            </div>
            
            {/* Search */}
            <div className="relative max-w-md w-full">
              <SearchBar 
                onSearch={handleSearchChange}
                placeholder="Search artworks..."
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`xl:w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden xl:block'}`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('category')}
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={filters.category === ''}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="text-purple-600 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{t('allCategories')}</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="physical"
                      checked={filters.category === 'physical'}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="text-purple-600 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{t('physical')}</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="digital"
                      checked={filters.category === 'digital'}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="text-purple-600 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{t('digital')}</span>
                  </label>
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('priceRange')}
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange[0]}
                      onChange={(e) => handlePriceChange([parseInt(e.target.value) || 0, filters.priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceChange([filters.priceRange[0], parseInt(e.target.value) || 2000])}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>$0</span>
                    <span>$5000+</span>
                  </div>
                </div>
              </div>

              {/* Quick Price Filters */}
              <div className="space-y-2">
                <button
                  onClick={() => handlePriceChange([0, 500])}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  Under $500
                </button>
                <button
                  onClick={() => handlePriceChange([500, 1000])}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  $500 - $1000
                </button>
                <button
                  onClick={() => handlePriceChange([1000, 5000])}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  $1000+
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
            >
              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="xl:hidden flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="text-sm font-medium">Filters</span>
                </button>
                
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {sortedArtworks.length} {sortedArtworks.length === 1 ? 'artwork' : 'artworks'} found
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [sort, order] = e.target.value.split('-');
                    setSortBy(sort as any);
                    setSortOrder(order as any);
                  }}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                >
                  <option value="title-asc">Title: A to Z</option>
                  <option value="title-desc">Title: Z to A</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="year-desc">Newest First</option>
                  <option value="year-asc">Oldest First</option>
                </select>

                {/* View Mode */}
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400'} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-l-lg`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400'} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-r-lg`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Artworks Grid */}
            {sortedArtworks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <Filter className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No artworks found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or search terms.</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className={`grid gap-8 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
                    : 'grid-cols-1'
                }`}
              >
                {sortedArtworks.map((artwork, index) => (
                  <div
                    key={artwork.id}
                    className="w-full"
                  >
                    <ArtworkCard 
                      artwork={artwork} 
                      index={index}
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artworks;