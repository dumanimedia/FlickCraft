import { createServerFn } from '@tanstack/react-start'

const API_KEY = process.env.TMDB_API_KEY ?? ''

const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchTrendingShows = createServerFn({
  method: 'GET',
}).handler(async () => {
  const url = `${BASE_URL}/trending/all/week?api_key=${API_KEY}`
  const res = await fetch(url)

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(
      errorData.status_message || 'Failed to fetch trending shows',
    )
  }

  const data = await res.json()
  return data.results
})

export const fetchTrendingMovies = createServerFn({
  method: 'GET',
}).handler(async () => {
  const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  const res = await fetch(url)

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(
      errorData.status_message || 'Failed to fetch trending movies',
    )
  }

  const data = await res.json()
  return data.results
})

export const fetchTrendingTVShows = createServerFn({
  method: 'GET',
}).handler(async () => {
  const url = `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`
  const res = await fetch(url)

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(
      errorData.status_message || 'Failed to fetch trending TV shows',
    )
  }

  const data = await res.json()
  return data.results
})

// export const fetchMovieDetails = createServerFn({
//   method: 'GET',
// }).handler(async ({data}) => {

//   const url = `${BASE_URL}/movie/${data}?api_key=${API_KEY}&append_to_response=credits`
//   const res = await fetch(url)

//   if (!res.ok) {
//     const errorData = await res.json()
//     throw new Error(errorData.status_message || 'Movie not found')
//   }

//   const data = await res.json()
//   return data
// })

// export const fetchTVDetails = createServerFn({
//   method: 'GET',
// }).handler(async (id: string) => {
//   const url = `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=credits`
//   const res = await fetch(url)

//   if (!res.ok) {
//     const errorData = await res.json()
//     throw new Error(errorData.status_message || 'TV show not found')
//   }

//   const data = await res.json()
//   return data
// })

// export const searchTMDB = createServerFn({
//   method: 'GET',
// }).handler(async (query: string, page = 1) => {
//   const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
//   const res = await fetch(url)

//   if (!res.ok) {
//     const errorData = await res.json()
//     throw new Error(errorData.status_message || 'Search failed')
//   }

//   const data = await res.json()
//   return data
// })

// export const getMovieById = createServerFn({
//   method: "GET",
// }).handler(async (movieId: string) => {
//   const url = `${TMDB_API_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`;
//   const res = await fetch(url);

//   if (!res.ok) {
//     const errorData = await res.json();
//     throw new Error(errorData.status_message || "Failed to fetch movie details");
//   }

//   const data = await res.json();
//   return data;
// });
