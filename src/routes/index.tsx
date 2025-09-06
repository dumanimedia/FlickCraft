import { createFileRoute } from '@tanstack/react-router'

import { useTrendingMovies } from '@/hooks/use-tmdb'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const { data, isPending, error } = useTrendingMovies()

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <main className="min-h-screen">
      <h1>Hello World</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}
