import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Artwork } from './artworkStore';

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (artwork: Artwork) => void;
  removeItem: (artworkId: string) => void;
  updateQuantity: (artworkId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (artwork) => {
        const items = get().items;
        const existingItem = items.find(item => item.artwork?.id === artwork.id);
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.artwork?.id === artwork.id
                ? { ...item, quantity: Math.min(item.quantity + 1, artwork?.stock ?? 0) }
                : item
            )
          });
        } else {
          set({ items: [...items, { artwork, quantity: 1 }] });
        }
      },
      removeItem: (artworkId) => {
        set(state => ({
          items: state.items.filter(item => item.artwork?.id !== artworkId)
        }));
      },
      updateQuantity: (artworkId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(artworkId);
          return;
        }
        
        set(state => ({
          items: state.items.map(item =>
            item.artwork?.id === artworkId
              ? { ...item, quantity: Math.min(quantity, item.artwork?.stock ?? 0) }
              : item
          )
        }));
      },
      clearCart: () => {
        set({ items: [] });
      },
      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }));
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + ((item.artwork?.price || 0) * item.quantity), 0);
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);