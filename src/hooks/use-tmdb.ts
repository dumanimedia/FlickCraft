import { useQuery } from '@tanstack/react-query'

import { fetchTrendingMovies } from '@/lib/tmdb-client'

export const useTrendingMovies = () =>
  useQuery({
    queryKey: ['trending-movies'],
    queryFn: fetchTrendingMovies,
  })
