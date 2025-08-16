import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Check, CheckCheck, Trash2, ExternalLink } from 'lucide-react';
import { useNotificationStore } from '../../stores/notificationStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotificationDropdown: React.FC = () => {
  const { t } = useTranslation();
  const { 
    notifications, 
    isOpen, 
    toggleNotifications, 
    markAsRead, 
    markAllAsRead,
    removeNotification,
    clearAll 
  } = useNotificationStore();

  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return 'ℹ️';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleNotifications}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          />

          {/* Dropdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadNotifications.length > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="p-1.5 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    title="Mark all as read"
                  >
                    <CheckCheck className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={toggleNotifications}
                  className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 dark:text-gray-500 mb-2">
                    <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-5 5-5-5h5v-12h5v12z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Unread Notifications */}
                  {unreadNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors relative"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 text-lg">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                {getTimeAgo(notification.createdAt)}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1 ml-2">
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                                title="Mark as read"
                              >
                                <Check className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => removeNotification(notification.id)}
                                className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                title="Remove"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                          {notification.actionUrl && (
                            <Link
                              to={notification.actionUrl}
                              onClick={toggleNotifications}
                              className="inline-flex items-center text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mt-2"
                            >
                              View <ExternalLink className="h-3 w-3 ml-1" />
                            </Link>
                          )}
                        </div>
                      </div>
                      {/* Unread indicator */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-purple-500 rounded-full"></div>
                    </motion.div>
                  ))}

                  {/* Read Notifications */}
                  {readNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors opacity-75"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 text-lg opacity-60">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">
                                {getTimeAgo(notification.createdAt)}
                              </p>
                            </div>
                            <button
                              onClick={() => removeNotification(notification.id)}
                              className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors ml-2"
                              title="Remove"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                          {notification.actionUrl && (
                            <Link
                              to={notification.actionUrl}
                              onClick={toggleNotifications}
                              className="inline-flex items-center text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mt-2"
                            >
                              View <ExternalLink className="h-3 w-3 ml-1" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <button
                  onClick={clearAll}
                  className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  Clear All Notifications
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationDropdown;