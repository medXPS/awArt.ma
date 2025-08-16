import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Artwork } from './artworkStore';

export interface WishlistItem {
  artwork: Artwork;
  addedAt: string;
}

interface WishlistState {
  items: WishlistItem[];
  isOpen: boolean;
  addItem: (artwork: Artwork) => void;
  removeItem: (artworkId: string) => void;
  isInWishlist: (artworkId: string) => boolean;
  toggleWishlist: () => void;
  clearWishlist: () => void;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (artwork) => {
        const items = get().items;
        const existingItem = items.find(item => item.artwork.id === artwork.id);
        
        if (!existingItem) {
          set({
            items: [...items, { artwork, addedAt: new Date().toISOString() }]
          });
        }
      },
      removeItem: (artworkId) => {
        set(state => ({
          items: state.items.filter(item => item.artwork.id !== artworkId)
        }));
      },
      isInWishlist: (artworkId) => {
        return get().items.some(item => item.artwork && item.artwork.id === artworkId);
      },
      toggleWishlist: () => {
        set(state => ({ isOpen: !state.isOpen }));
      },
      clearWishlist: () => {
        set({ items: [] });
      },
      getTotalItems: () => {
        return get().items.length;
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);