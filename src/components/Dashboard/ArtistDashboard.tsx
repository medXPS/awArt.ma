import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Palette, TrendingUp, DollarSign, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuthStore } from '../../stores/authStore';
import { useArtworkStore } from '../../stores/artworkStore';
import { useSalesStore } from '../../stores/salesStore';
import AddArtworkModal from './AddArtworkModal';

const ArtistDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { getArtworksByArtist } = useArtworkStore();
  const { getSalesByArtist, getRevenueByArtist, getMonthlySales } = useSalesStore();
  const [showAddModal, setShowAddModal] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const artistArtworks = user ? getArtworksByArtist(user.id) : [];
  const artistSales = user ? getSalesByArtist(user.id) : [];
  const artistRevenue = user ? getRevenueByArtist(user.id) : 0;
  const monthlySales = getMonthlySales();

  // Mock data for demonstration
  const stats = [
    { name: 'Total Artworks', value: artistArtworks.length.toString(), icon: Palette, color: 'bg-purple-500' },
    { name: 'Total Sales', value: artistSales.length.toString(), icon: TrendingUp, color: 'bg-green-500' },
    { name: 'Revenue', value: `$${artistRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-blue-500' },
    { name: 'In Stock', value: artistArtworks.filter(a => a.stock > 0).length.toString(), icon: Package, color: 'bg-orange-500' },
  ];

  const recentSales = artistSales.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Artist Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.name}! Manage your artworks and track your sales.</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>{t('addArtwork')}</span>
              </button>
              {user?.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Sales Overview</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlySales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#059669" 
                      strokeWidth={2}
                      dot={{ fill: '#059669' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Recent Sales */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Sales</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm font-medium text-gray-900">
                          {sale.artworkTitle}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(sale.status)}`}>
                          {sale.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Buyer: {sale.customerName}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm font-medium text-emerald-600">${sale.price}</p>
                        <p className="text-xs text-gray-500">{sale.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {recentSales.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No sales yet</p>
                  </div>
                )}
                <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                  View All Sales
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* My Artworks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8"
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">{t('myArtworks')}</h2>
                <span className="text-sm text-gray-600">{artistArtworks.length} artworks</span>
              </div>
            </div>
            <div className="p-6">
              {artistArtworks.length === 0 ? (
                <div className="text-center py-8">
                  <Palette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">You haven't uploaded any artworks yet.</p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Upload Your First Artwork
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {artistArtworks.slice(0, 8).map((artwork) => (
                    <div key={artwork.id} className="group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                        <img
                          src={artwork.imageUrl}
                          alt={artwork.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-medium text-gray-900 text-sm truncate">{artwork.title}</h3>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-emerald-600 font-medium">${artwork.price}</p>
                        <p className="text-xs text-gray-500">Stock: {artwork.stock}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add Artwork Modal */}
      {showAddModal && (
        <AddArtworkModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default ArtistDashboard;