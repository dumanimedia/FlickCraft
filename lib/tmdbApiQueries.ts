import {
  TMDBMovie,
  TMDBTVShow,
  TMDBMovieDetails,
  TMDBTVShowDetails,
  TMDBCredits,
  TMDBGenre,
  TMDBPaginatedResponse,
} from "@/types/tmdb";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY || "";

async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
  const url = `${TMDB_BASE_URL}${endpoint}${
    endpoint.includes("?") ? "&" : "?"
  }api_key=${TMDB_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status}`);
  }
  return res.json();
}

// Trending Movies
export async function fetchTrendingMovies(
  timeWindow: "day" | "week" = "week"
): Promise<TMDBMovie[]> {
  const data = await fetchFromTMDB<TMDBPaginatedResponse<TMDBMovie>>(
    `/trending/movie/${timeWindow}`
  );
  return data.results;
}

// Trending TV Shows
export async function fetchTrendingTVShows(
  timeWindow: "day" | "week" = "week"
): Promise<TMDBTVShow[]> {
  const data = await fetchFromTMDB<TMDBPaginatedResponse<TMDBTVShow>>(
    `/trending/tv/${timeWindow}`
  );
  return data.results;
}

// Top Rated Movies
export async function fetchTopRatedMovies(page = 1): Promise<TMDBMovie[]> {
  const data = await fetchFromTMDB<TMDBPaginatedResponse<TMDBMovie>>(
    `/movie/top_rated?page=${page}`
  );
  return data.results;
}

// Top Rated TV Shows
export async function fetchTopRatedTVShows(page = 1): Promise<TMDBTVShow[]> {
  const data = await fetchFromTMDB<TMDBPaginatedResponse<TMDBTVShow>>(
    `/tv/top_rated?page=${page}`
  );
  return data.results;
}

// Movie Details
export async function fetchMovieDetails(
  movieId: number
): Promise<TMDBMovieDetails> {
  return fetchFromTMDB<TMDBMovieDetails>(`/movie/${movieId}`);
}

// TV Show Details
export async function fetchTVShowDetails(
  tvId: number
): Promise<TMDBTVShowDetails> {
  return fetchFromTMDB<TMDBTVShowDetails>(`/tv/${tvId}`);
}

// Movie Credits
export async function fetchMovieCredits(movieId: number): Promise<TMDBCredits> {
  return fetchFromTMDB<TMDBCredits>(`/movie/${movieId}/credits`);
}

// TV Show Credits
export async function fetchTVShowCredits(tvId: number): Promise<TMDBCredits> {
  return fetchFromTMDB<TMDBCredits>(`/tv/${tvId}/credits`);
}

// Movie Genres
export async function fetchMovieGenres(): Promise<TMDBGenre[]> {
  const data = await fetchFromTMDB<{ genres: TMDBGenre[] }>(
    "/genre/movie/list"
  );
  return data.genres;
}

// TV Genres
export async function fetchTVGenres(): Promise<TMDBGenre[]> {
  const data = await fetchFromTMDB<{ genres: TMDBGenre[] }>("/genre/tv/list");
  return data.genres;
}
