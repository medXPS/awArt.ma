import { create } from 'zustand';
import { mockArtworks } from '../data/mockData';

export interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'physical' | 'digital';
  imageUrl: string;
  artistId: string;
  artistName: string;
  stock: number;
  tags: string[];
  dimensions?: string;
  medium?: string;
  year: number;
  featured: boolean;
}

interface ArtworkState {
  artworks: Artwork[];
  loading: boolean;
  filters: {
    category: string;
    priceRange: [number, number];
    artist: string;
    search: string;
  };
  setFilters: (filters: Partial<ArtworkState['filters']>) => void;
  getFilteredArtworks: () => Artwork[];
  getFeaturedArtworks: () => Artwork[];
  getArtworkById: (id: string) => Artwork | undefined;
  getArtworksByArtist: (artistId: string) => Artwork[];
  addArtwork: (artwork: Omit<Artwork, 'id'>) => void;
  updateArtwork: (id: string, updates: Partial<Artwork>) => void;
  deleteArtwork: (id: string) => void;
}

export const useArtworkStore = create<ArtworkState>((set, get) => ({
  artworks: mockArtworks,
  loading: false,
  filters: {
    category: '',
    priceRange: [0, 2000],
    artist: '',
    search: '',
  },
  setFilters: (newFilters) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters }
    }));
  },
  getFilteredArtworks: () => {
    const { artworks, filters } = get();
    return artworks.filter(artwork => {
      const matchesCategory = !filters.category || artwork.category === filters.category;
      const matchesPrice = artwork.price >= filters.priceRange[0] && artwork.price <= filters.priceRange[1];
      const matchesArtist = !filters.artist || artwork.artistId === filters.artist;
      const matchesSearch = !filters.search || 
        artwork.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        artwork.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        artwork.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
      
      return matchesCategory && matchesPrice && matchesArtist && matchesSearch;
    });
  },
  getFeaturedArtworks: () => {
    return get().artworks.filter(artwork => artwork.featured);
  },
  getArtworkById: (id) => {
    return get().artworks.find(artwork => artwork.id === id);
  },
  getArtworksByArtist: (artistId) => {
    return get().artworks.filter(artwork => artwork.artistId === artistId);
  },
  addArtwork: (newArtwork) => {
    const artwork: Artwork = {
      ...newArtwork,
      id: Date.now().toString(),
    };
    set(state => ({
      artworks: [...state.artworks, artwork]
    }));
  },
  updateArtwork: (id, updates) => {
    set(state => ({
      artworks: state.artworks.map(artwork => 
        artwork.id === id ? { ...artwork, ...updates } : artwork
      )
    }));
  },
  deleteArtwork: (id) => {
    set(state => ({
      artworks: state.artworks.filter(artwork => artwork.id !== id)
    }));
  },
}));