import {
  TMDBMovie,
  TMDBTVShow,
  TMDBMovieDetails,
  TMDBTVShowDetails,
  TMDBCredits,
  TMDBPaginatedResponse,
} from "@/types/tmdb";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY!;

// export async function fetchFromTMDB(endpoint: string, query: string = "") {
//   const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&${query}`;
//   const res = await fetch(url, { cache: "no-store" });

//   if (!res.ok) {
//     throw new Error(`TMDB API error: ${res.statusText}`);
//   }

//   return res.json();
// }

async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
  const url = `${TMDB_BASE_URL}${endpoint}${
    endpoint.includes("?") ? "&" : "?"
  }api_key=${TMDB_API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    console.error("TMDB API error", res.status);
    throw new Error(`TMDB API error: ${res.status}`);
  }

  return res.json();
}

export async function getTrendingMovies(timeWindow: "day" | "week" = "week") {
  const data = await fetchFromTMDB<TMDBPaginatedResponse<TMDBMovie>>(
    `/trending/movie/${timeWindow}`
  );
  return data.results;
}

export async function getTrendingTVShows(timeWindow: "day" | "week" = "week") {
  const data = await fetchFromTMDB<TMDBPaginatedResponse<TMDBTVShow>>(
    `/trending/tv/${timeWindow}`
  );
  return data.results;
}

export async function getTopRatedMovies(page = 1) {
  const data = await fetchFromTMDB<TMDBPaginatedResponse<TMDBMovie>>(
    `/movie/top_rated?page=${page}`
  );
  return data.results;
}

export async function getTopRatedTVShows(page = 1) {
  const data = await fetchFromTMDB<TMDBPaginatedResponse<TMDBTVShow>>(
    `/tv/top_rated?page=${page}`
  );
  return data.results;
}

export async function fetchMovieDetails(id: number) {
  return fetchFromTMDB<TMDBMovieDetails>(`/movie/${id}`);
}

export async function fetchTVShowDetails(id: number) {
  return fetchFromTMDB<TMDBTVShowDetails>(`/tv/${id}`);
}

export async function fetchMovieCredits(id: number) {
  return fetchFromTMDB<TMDBCredits>(`/movie/${id}/credits`);
}

export async function fetchTVShowCredits(id: number) {
  return fetchFromTMDB<TMDBCredits>(`/tv/${id}/credits`);
}
