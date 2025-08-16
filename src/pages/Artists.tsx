import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Star, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { mockArtists } from '../data/mockData';
import { useArtworkStore } from '../stores/artworkStore';

const Artists: React.FC = () => {
  const { t } = useTranslation();
  const { getArtworksByArtist } = useArtworkStore();

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Transform mock artists data to include artwork counts and ratings
  const artists = mockArtists.map(artist => {
    const artworks = getArtworksByArtist(artist.id);
    return {
      ...artist,
      artworksCount: artworks.length,
      rating: 4.6 + Math.random() * 0.4, // Mock rating between 4.6-5.0
      specialties: artworks.length > 0 ? artworks[0].tags.slice(0, 3) : ['Art'],
      featured: Math.random() > 0.5, // Randomly assign featured status
    };
  });

  const featuredArtists = artists.filter(artist => artist.featured);
  const allArtists = artists;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our {t('artists')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the talented artists behind the beautiful artworks in our marketplace. 
              Each artist brings their unique style and perspective to create exceptional pieces.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Artists */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Artists</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most popular and highly-rated artists creating exceptional artworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Artist Image */}
                <div className="relative h-64 bg-gradient-to-br from-emerald-400 to-blue-400 overflow-hidden">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium text-emerald-600">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Artist Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {artist.name}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {artist.location}
                      </div>
                    </div>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium text-yellow-700">{artist.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {artist.bio}
                  </p>

                  {/* Specialties */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {artist.specialties.slice(0, 3).map((specialty) => (
                        <span
                          key={specialty}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-gray-600">
                      <Palette className="h-4 w-4 mr-1" />
                      <span className="text-sm">{artist.artworksCount} artworks</span>
                    </div>
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* All Artists */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Artists</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the complete collection of talented artists in our community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.05 * index, duration: 0.6 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="h-16 w-16 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate group-hover:text-emerald-600 transition-colors">
                      {artist.name}
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">{artist.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {artist.bio}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Palette className="h-4 w-4 mr-1" />
                    <span>{artist.artworksCount}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium text-gray-700">{artist.rating.toFixed(1)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Artists;