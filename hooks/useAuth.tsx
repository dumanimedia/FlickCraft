// hooks/useAuth.ts
import { useState, useCallback } from "react";

// Types
export interface MediaItem {
  id: string;
  title: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  watchlist: MediaItem[];
  favorites: MediaItem[];
}

// Hook
export const useAuth = () => {
  const [user, setUser] = useState<User>({
    id: "user_123",
    name: "Jane Doe",
    email: "jane@example.com",
    watchlist: [],
    favorites: [],
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

  return {
    user,
    addToWatchlist,
    removeFromWatchlist,
    addToFavorites,
    removeFromFavorites,
  };
};
