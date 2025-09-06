export interface TMDBMovie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  adult: boolean
  original_language: string
  original_title: string
  popularity: number
  video: boolean
}

export interface TMDBTVShow {
  id: number
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  adult: boolean
  original_language: string
  original_name: string
  popularity: number
}

export interface TMDBGenre {
  id: number
  name: string
}

export interface TMDBMovieDetails extends TMDBMovie {
  runtime: number
  genres: TMDBGenre[]
  production_companies: Array<{
    id: number
    name: string
    logo_path: string | null
  }>
  production_countries: Array<{
    iso_3166_1: string
    name: string
  }>
  spoken_languages: Array<{
    english_name: string
    iso_639_1: string
    name: string
  }>
  status: string
  tagline: string
  budget: number
  revenue: number
  imdb_id: string | null
}

export interface TMDBTVDetails extends TMDBTVShow {
  created_by: Array<{
    id: number
    credit_id: string
    name: string
    gender: number
    profile_path: string | null
  }>
  episode_run_time: number[] // array since episodes can vary in runtime
  genres: TMDBGenre[]
  homepage: string
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: {
    air_date: string
    episode_number: number
    id: number
    name: string
    overview: string
    production_code: string
    season_number: number
    still_path: string | null
    vote_average: number
    vote_count: number
  } | null
  next_episode_to_air: {
    air_date: string
    episode_number: number
    id: number
    name: string
    overview: string
    production_code: string
    season_number: number
    still_path: string | null
    vote_average: number
    vote_count: number
  } | null
  networks: Array<{
    id: number
    name: string
    logo_path: string | null
    origin_country: string
  }>
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  production_companies: Array<{
    id: number
    name: string
    logo_path: string | null
    origin_country: string
  }>
  seasons: Array<{
    air_date: string | null
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string | null
    season_number: number
    vote_average: number
  }>
  spoken_languages: Array<{
    english_name: string
    iso_639_1: string
    name: string
  }>
  status: string
  tagline: string
  type: string
}

export interface TMDBCastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface TMDBCrewMember {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}

export interface TMDBCredits {
  cast: TMDBCastMember[]
  crew: TMDBCrewMember[]
}

// import { createFileRoute } from '@tanstack/react-router'

// import { useTrendingMovies } from '@/hooks/use-tmdb'

// export const Route = createFileRoute('/')({
//   component: HomePage,
// })

// function HomePage() {
//   const { data, isPending, error } = useTrendingMovies()

//   if (isPending) return <div>Loading...</div>
//   if (error) return <div>Error: {error.message}</div>

//   return (
//     <main className="min-h-screen">
//       <h1>Hello World</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </main>
//   )
// }
