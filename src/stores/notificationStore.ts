import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

interface NotificationState {
  notifications: Notification[];
  isOpen: boolean;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  removeNotification: (notificationId: string) => void;
  clearAll: () => void;
  toggleNotifications: () => void;
  getUnreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [
        {
          id: '1',
          title: 'Welcome to awArt.ma!',
          message: 'Discover amazing Moroccan artworks from talented artists.',
          type: 'info',
          read: false,
          createdAt: new Date().toISOString(),
          actionUrl: '/artworks'
        },
        {
          id: '2',
          title: 'New Featured Artwork',
          message: 'Check out "Geometric Harmony" by Youssef Benali.',
          type: 'success',
          read: false,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          actionUrl: '/artwork/1'
        },
        {
          id: '3',
          title: 'Artist Spotlight',
          message: 'Discover the beautiful works of Aicha Mansouri.',
          type: 'info',
          read: true,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          actionUrl: '/artists'
        }
      ],
      isOpen: false,
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          read: false,
        };
        set(state => ({
          notifications: [newNotification, ...state.notifications]
        }));
      },
      markAsRead: (notificationId) => {
        set(state => ({
          notifications: state.notifications.map(notification =>
            notification.id === notificationId
              ? { ...notification, read: true }
              : notification
          )
        }));
      },
      markAllAsRead: () => {
        set(state => ({
          notifications: state.notifications.map(notification => ({
            ...notification,
            read: true
          }))
        }));
      },
      removeNotification: (notificationId) => {
        set(state => ({
          notifications: state.notifications.filter(notification => notification.id !== notificationId)
        }));
      },
      clearAll: () => {
        set({ notifications: [] });
      },
      toggleNotifications: () => {
        set(state => ({ isOpen: !state.isOpen }));
      },
      getUnreadCount: () => {
        return get().notifications.filter(notification => !notification.read).length;
      },
    }),
    {
      name: 'notifications-storage',
    }
  )
);