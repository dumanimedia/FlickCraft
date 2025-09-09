import {
  getTrendingMovies,
  getTrendingTVShows,
  getTopRatedMovies,
  getTopRatedTVShows,
  fetchMovieDetails,
  fetchTVShowDetails,
} from "@/lib/api/tmdb";

export const tmdbKeys = {
  trendingMovies: ["trending-movies"],
  trendingTVShows: ["trending-tv-shows"],
  topRatedMovies: ["top-rated-movies"],
  topRatedTVShows: ["top-rated-tv-shows"],
  movieDetails: ["movie-details"],
  tvShowDetails: ["tv-show-details"],
};

export const tmdbQueries = {
  trendingMovies: () => ({
    queryKey: tmdbKeys.trendingMovies,
    queryFn: () => getTrendingMovies("week"),
  }),
  trendingTVShows: () => ({
    queryKey: tmdbKeys.trendingTVShows,
    queryFn: () => getTrendingTVShows("week"),
  }),
  topRatedMovies: () => ({
    queryKey: tmdbKeys.topRatedMovies,
    queryFn: () => getTopRatedMovies(),
  }),
  topRatedTVShows: () => ({
    queryKey: tmdbKeys.topRatedTVShows,
    queryFn: () => getTopRatedTVShows(),
  }),
  movieDetails: (id: number) => ({
    queryKey: tmdbKeys.movieDetails,
    queryFn: () => fetchMovieDetails(id),
  }),
  tvShowDetails: (id: number) => ({
    queryKey: tmdbKeys.tvShowDetails,
    queryFn: () => fetchTVShowDetails(id),
  }),
};
