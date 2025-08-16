import { create } from 'zustand';
import { mockReviews, Review } from '../data/mockData';

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  getReviewsByArtwork: (artworkId: string) => Review[];
  getAverageRating: (artworkId: string) => number;
  addReview: (review: Omit<Review, 'id'>) => void;
  deleteReview: (reviewId: string) => void;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: mockReviews,
  loading: false,
  
  getReviewsByArtwork: (artworkId: string) => {
    return get().reviews.filter(review => review.artworkId === artworkId);
  },
  
  getAverageRating: (artworkId: string) => {
    const artworkReviews = get().getReviewsByArtwork(artworkId);
    if (artworkReviews.length === 0) return 0;
    
    const totalRating = artworkReviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((totalRating / artworkReviews.length) * 10) / 10;
  },
  
  addReview: (newReview) => {
    const review: Review = {
      ...newReview,
      id: `review-${Date.now()}`,
    };
    set(state => ({
      reviews: [...state.reviews, review]
    }));
  },
  
  deleteReview: (reviewId) => {
    set(state => ({
      reviews: state.reviews.filter(review => review.id !== reviewId)
    }));
  },
}));