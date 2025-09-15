// hooks/useAuth.ts
import { useState, useCallback } from "react";

// Types
export interface MediaItem {
  id: string;
  title: string;
  description: string;
}

export interface Review {
  movieId: string;
  review: string;
  rating: number;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  watchlist: MediaItem[];
  favorites: MediaItem[];
  reviews: Review[];
}

export interface TransformedReview {
  id: string;
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number;
  };
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
  isUserReview: true;
}

// Hook
export const useAuth = () => {
  const [user, setUser] = useState<User>({
    id: "user_123",
    name: "Jane Doe",
    email: "jane@example.com",
    watchlist: [],
    favorites: [],
    reviews: [],
  });

  const addToWatchlist = useCallback((item: MediaItem) => {
    setUser((prev) => ({
      ...prev,
      watchlist: [...prev.watchlist, item],
    }));
  }, []);

  const removeFromWatchlist = useCallback((itemId: string) => {
    setUser((prev) => ({
      ...prev,
      watchlist: prev.watchlist.filter((item) => item.id !== itemId),
    }));
  }, []);

  const addToFavorites = useCallback((item: MediaItem) => {
    setUser((prev) => ({
      ...prev,
      favorites: [...prev.favorites, item],
    }));
  }, []);

  const removeFromFavorites = useCallback((itemId: string) => {
    setUser((prev) => ({
      ...prev,
      favorites: prev.favorites.filter((item) => item.id !== itemId),
    }));
  }, []);

  const userHasReviewed = useCallback(
    (contentId: string): boolean =>
      user?.reviews.some((review) => review.movieId === contentId) || false,
    [user]
  );

  const getUserReviews = useCallback(
    (contentId: string): TransformedReview[] =>
      user?.reviews
        .filter((review) => review.movieId === contentId)
        .map((review) => ({
          id: `user-${review.movieId}`,
          author: user.name,
          author_details: {
            name: user.name,
            username: user.name.toLowerCase().replace(/\s+/g, ""),
            avatar_path: null,
            rating: review.rating,
          },
          content: review.review,
          created_at: review.date,
          updated_at: review.date,
          url: "",
          isUserReview: true,
        })) || [],
    [user]
  );

  return {
    user,
    addToWatchlist,
    removeFromWatchlist,
    addToFavorites,
    removeFromFavorites,
  };
};
