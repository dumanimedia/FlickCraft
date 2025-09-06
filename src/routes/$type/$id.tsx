// import { createFileRoute } from '@tanstack/react-router'

// export const Route = createFileRoute('/$type/$id')({
//   component: RouteComponent,
// })

// function RouteComponent() {
//   return <div>Hello "/$type/$id"!</div>
// }

import NotFound from '@/components/not-found'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$type/$id')({
  component: DetailPage,
})

function DetailPage() {
  const { type, id } = Route.useParams()

  if (type !== 'movie' && type !== 'tv') {
    return <NotFound />
  }

  console.log({ type, id })

  // const isMovie = type === 'movie'
  // const query = isMovie ? useMovieDetails(id) : useTVDetails(id)

  // console.log({ query })
  // if (query.isLoading) return <div>Loading...</div>
  // if (query.isError) return <div>Error: {(query.error as Error).message}</div>

  // const item = query.data

  return <div>This is the movie/tv details page</div>
}
