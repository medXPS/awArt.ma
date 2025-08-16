import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, Heart, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAuthStore } from '../../stores/authStore';
import { useSalesStore } from '../../stores/salesStore';

const CustomerDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { getSalesByCustomer } = useSalesStore();

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const customerOrders = user ? getSalesByCustomer(user.id) : [];
  const totalSpent = customerOrders
    .filter(order => order.status === 'completed')
    .reduce((total, order) => total + order.price, 0);

  // Mock data for demonstration
  const stats = [
    { name: 'Total Orders', value: customerOrders.length.toString(), icon: ShoppingBag, color: 'bg-blue-500' },
    { name: 'Favorites', value: '28', icon: Heart, color: 'bg-red-500' },
    { name: 'Reviews Given', value: '8', icon: Star, color: 'bg-yellow-500' },
    { name: 'Amount Spent', value: `$${totalSpent.toLocaleString()}`, icon: TrendingUp, color: 'bg-green-500' },
  ];

  const recentOrders = customerOrders.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
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
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
              <p className="text-gray-600 mt-2">Manage your orders and discover new artworks.</p>
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
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {order.artworkTitle}
                        </h3>
                        <p className="text-sm text-gray-600">by {order.artistName}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">${order.price}</p>
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {recentOrders.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No orders yet</p>
                  </div>
                )}
                <div className="mt-6">
                  <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
                    View All Orders
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Recommended for You */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?w=60&h=60&fit=crop"
                    alt="Recommended artwork"
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Ethereal Bloom</p>
                    <p className="text-sm text-gray-600">$680</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.pexels.com/photos/1109354/pexels-photo-1109354.jpeg?w=60&h=60&fit=crop"
                    alt="Recommended artwork"
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Geometric Fusion</p>
                    <p className="text-sm text-gray-600">$920</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                Explore More
              </button>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
              <div className="space-y-3">
                <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  Edit Profile
                </button>
                <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  Shipping Address
                </button>
                <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  Payment Methods
                </button>
                <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  Notifications
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;