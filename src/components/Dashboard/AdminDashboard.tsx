import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Palette, DollarSign, TrendingUp, Package, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuthStore } from '../../stores/authStore';
import { useArtworkStore } from '../../stores/artworkStore';
import { useSalesStore } from '../../stores/salesStore';
import KYCManagement from '../Admin/KYCManagement';
import { mockUsers } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { artworks } = useArtworkStore();
  const { sales, getTotalRevenue, getMonthlySales } = useSalesStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'kyc'>('overview');

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const totalRevenue = getTotalRevenue();
  const monthlySales = getMonthlySales();
  const totalUsers = mockUsers.length;
  const monthlyOrders = sales.length;

  // Mock data for demonstration
  const stats = [
    { name: 'Total Users', value: totalUsers.toString(), icon: Users, color: 'bg-blue-500', change: '+12%' },
    { name: 'Total Artworks', value: artworks.length.toString(), icon: Palette, color: 'bg-purple-500', change: '+8%' },
    { name: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500', change: '+23%' },
    { name: 'Total Orders', value: monthlyOrders.toString(), icon: Package, color: 'bg-orange-500', change: '+15%' },
  ];

  // Mock sales data by category
  const categoryData = [
    { name: 'Physical Art', value: 65, color: '#3B82F6' },
    { name: 'Digital Art', value: 35, color: '#8B5CF6' },
  ];

  const recentOrders = sales.slice(0, 5);

  // Calculate top artists from sales data
  const artistStats = mockUsers
    .filter(user => user.role === 'artist')
    .map(artist => {
      const artistSales = sales.filter(sale => sale.artistId === artist.id);
      const revenue = artistSales
        .filter(sale => sale.status === 'completed')
        .reduce((total, sale) => total + sale.price, 0);
      return {
        name: artist.name,
        sales: artistSales.length,
        revenue: `$${revenue.toLocaleString()}`,
        rating: 4.8 + Math.random() * 0.2, // Mock rating
      };
    })
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
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
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.name}! Here's what's happening with ArtVault.</p>
            </div>
            <div className="flex items-center space-x-2">
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

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'overview'
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('kyc')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'kyc'
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                KYC Management
              </button>
            </nav>
          </div>
        </motion.div>

        {activeTab === 'kyc' ? (
          <KYCManagement />
        ) : (
          <>
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
                  <p className="text-xs text-green-600 font-medium">{stat.change} from last month</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Monthly Sales Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Monthly Sales by Category</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlySales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#059669" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Sales by Category</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{order.artworkTitle}</h3>
                          <p className="text-sm text-gray-600">by {order.artistName}</p>
                          <p className="text-xs text-gray-500">Customer: {order.customerName}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-emerald-600">${order.price}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {recentOrders.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No orders yet</p>
                  </div>
                )}
                <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                  View All Orders
                </button>
              </div>
            </div>
          </motion.div>

          {/* Top Artists */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Top Performing Artists</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {artistStats.map((artist, index) => (
                    <div key={artist.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-emerald-600">#{index + 1}</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{artist.name}</h3>
                          <p className="text-xs text-gray-600">{artist.sales} sales • {artist.revenue}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600 ml-1">{artist.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {artistStats.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No artist data available</p>
                  </div>
                )}
                <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                  View All Artists
                </button>
              </div>
            </div>
          </motion.div>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;