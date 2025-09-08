// ─────────────────────────────
// 📦 Generic Types
// ─────────────────────────────

export interface TMDBPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// ─────────────────────────────
// 🎭 Base Item
// ─────────────────────────────

interface TMDBBaseItem {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
}

// ─────────────────────────────
// 🎬 Movie
// ─────────────────────────────

export interface TMDBMovie extends TMDBBaseItem {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
  media_type?: "movie"; // present in trending
}

// Movie details
export interface TMDBMovieDetails extends TMDBMovie {
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
  budget: number;
  genres: TMDBGenre[];
  homepage: string;
  imdb_id: string | null;
  production_companies: TMDBCompany[];
  production_countries: TMDBCountry[];
  revenue: number;
  runtime: number | null;
  spoken_languages: TMDBLanguage[];
  status: string;
  tagline: string | null;
}

// ─────────────────────────────
// 📺 TV Show
// ─────────────────────────────

export interface TMDBTVShow extends TMDBBaseItem {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
  media_type?: "tv"; // present in trending
}

// TV show details
export interface TMDBTVShowDetails extends TMDBTVShow {
  created_by: TMDBCreator[];
  episode_run_time: number[];
  genres: TMDBGenre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: TMDBEpisode | null;
  next_episode_to_air: TMDBEpisode | null;
  networks: TMDBNetwork[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: TMDBCompany[];
  production_countries: TMDBCountry[];
  seasons: TMDBSeason[];
  spoken_languages: TMDBLanguage[];
  status: string;
  tagline: string | null;
  type: string;
}

// ─────────────────────────────
// 👥 Credits
// ─────────────────────────────

export interface TMDBCredits {
  id: number;
  cast: TMDBCast[];
  crew: TMDBCrew[];
}

export interface TMDBCast {
  cast_id?: number;
  character: string;
  credit_id: string;
  gender: number | null;
  id: number;
  name: string;
  order?: number;
  profile_path: string | null;
}

export interface TMDBCrew {
  credit_id: string;
  department: string;
  gender: number | null;
  id: number;
  job: string;
  name: string;
  profile_path: string | null;
}

// ─────────────────────────────
// 🎭 Supporting Types
// ─────────────────────────────

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBLanguage {
  iso_639_1: string;
  name: string;
}

export interface TMDBCountry {
  iso_3166_1: string;
  name: string;
}

export interface TMDBCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface TMDBNetwork {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface TMDBCreator {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

export interface TMDBEpisode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface TMDBSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
}

// // A. Trending, Popular, Search — Movies & TV Shows
// export interface TMDBPaginatedResult<T> {
//   page: number;
//   results: T[];
//   total_pages: number;
//   total_results: number;
// }

// interface BaseItem {
//   adult: boolean;
//   backdrop_path: string | null;
//   genre_ids: number[];
//   id: number;
//   original_language: string;
//   overview: string;
//   popularity: number;
//   poster_path: string | null;
//   vote_average: number;
//   vote_count: number;
// }

// export interface TMDBMovie extends BaseItem {
//   media_type: "movie";
//   title: string;
//   original_title: string;
//   release_date: string;
//   video: boolean;
// }

// export interface TMDBTVShow extends BaseItem {
//   media_type: "tv";
//   name: string;
//   original_name: string;
//   first_air_date: string;
//   origin_country: string[];
// }

// // type TrendingMoviesResult = TMDBPaginatedResult<TMDBMovie>;
// // type TrendingTVResult = TMDBPaginatedResult<TMDBTVShow>;

// // B. Movie & TV Show Details
// interface TMDBGenre {
//   id: number;
//   name: string;
// }

// export interface TMDBMovieDetails extends TMDBMovie {
//   belongs_to_collection: null | {
//     id: number;
//     name: string;
//     poster_path: string;
//     backdrop_path: string;
//   };
//   budget: number;
//   genres: TMDBGenre[];
//   homepage: string;
//   imdb_id: string | null;
//   production_companies: {
//     id: number;
//     logo_path: string | null;
//     name: string;
//     origin_country: string;
//   }[];
//   production_countries: { iso_3166_1: string; name: string }[];
//   release_date: string;
//   revenue: number;
//   runtime: number | null;
//   spoken_languages: { iso_639_1: string; name: string }[];
//   status: string;
//   tagline: string | null;
// }

// export interface TMDBTVShowDetails extends TMDBTVShow {
//   created_by: {
//     id: number;
//     credit_id: string;
//     name: string;
//     gender: number;
//     profile_path: string | null;
//   }[];
//   episode_run_time: number[];
//   first_air_date: string;
//   genres: TMDBGenre[];
//   homepage: string;
//   languages: string[];
//   last_air_date: string;
//   networks: {
//     id: number;
//     name: string;
//     logo_path: string | null;
//     origin_country: string;
//   }[];
//   number_of_episodes: number;
//   number_of_seasons: number;
//   origin_country: string[];
//   original_name: string;
//   status: string;
//   tagline: string | null;
// }

// // C. Credits (Movie or TV Show)
// interface TMDBCast {
//   cast_id?: number;
//   character: string;
//   credit_id: string;
//   gender: number | null;
//   id: number;
//   name: string;
//   order?: number;
//   profile_path: string | null;
// }

// interface TMDBCrew {
//   credit_id: string;
//   department: string;
//   gender: number | null;
//   id: number;
//   job: string;
//   name: string;
//   profile_path: string | null;
// }

// interface TMDBCredits {
//   id: number;
//   cast: TMDBCast[];
//   crew: TMDBCrew[];
// }
