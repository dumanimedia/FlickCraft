// "use client";

// import { useQuery } from "@tanstack/react-query";

// import {
//   fetchTrendingMovies,
//   fetchTrendingTVShows,
//   fetchTopRatedMovies,
//   fetchTopRatedTVShows,
// } from "@/lib/tmdbApiQueries";
// import { TMDBMovie, TMDBTVShow } from "@/types/tmdb";

// function SectionTitle({ children }: { children: React.ReactNode }) {
//   return <h2 className="text-2xl font-semibold mb-4">{children}</h2>;
// }

// function MediaCard({ tmdbItem }: { tmdbItem: TMDBMovie | TMDBTVShow }) {
//   const { poster_path, vote_average, media_type } = tmdbItem;

//   let title =
//     media_type === "movie"
//       ? tmdbItem.title
//       : media_type === "tv"
//       ? tmdbItem.name
//       : "";

//   const posterUrl = poster_path
//     ? `https://image.tmdb.org/t/p/w342${poster_path}`
//     : "/abstract-movie-poster.png";

//   return (
//     <div className="w-40 flex-shrink-0 rounded overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform">
//       <img
//         src={posterUrl}
//         alt={title || (title as string)}
//         className="w-full h-60 object-cover"
//       />
//       <div className="p-2">
//         <h3 className="text-sm font-medium truncate">
//           {title || (title as string)}
//         </h3>
//         <p className="text-xs text-yellow-500 font-semibold">
//           ⭐ {vote_average.toFixed(1)}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default function HomePage() {
//   // Trending movies
//   const { data: trendingMovies, isLoading: loadingTrendingMovies } = useQuery<
//     TMDBMovie[]
//   >({
//     queryKey: ["trending-movies"],
//     queryFn: () => fetchTrendingMovies("week"),
//   });

//   // Trending TV shows
//   const { data: trendingTVShows, isLoading: loadingTrendingTVShows } = useQuery<
//     TMDBTVShow[]
//   >({
//     queryKey: ["trendingTVShows"],
//     queryFn: () => fetchTrendingTVShows("week"),
//   });

//   // Top Rated movies
//   const { data: topRatedMovies, isLoading: loadingTopRatedMovies } = useQuery<
//     TMDBMovie[]
//   >({
//     queryKey: ["topRatedMovies"],
//     queryFn: () => fetchTopRatedMovies(),
//   });

//   // Top Rated TV shows
//   const { data: topRatedTVShows, isLoading: loadingTopRatedTVShows } = useQuery<
//     TMDBTVShow[]
//   >({
//     queryKey: ["topRatedTVShows"],
//     queryFn: () => fetchTopRatedTVShows(),
//   });

//   return (
//     <main className="p-6 space-y-10">
//       {/* Trending Movies */}
//       <section>
//         <SectionTitle>Trending Movies</SectionTitle>
//         {loadingTrendingMovies && <p>Loading...</p>}
//         <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
//           {trendingMovies?.map((movie) => (
//             <MediaCard key={movie.id} tmdbItem={movie} />
//           ))}
//         </div>
//       </section>

//       {/* Trending TV Shows */}
//       <section>
//         <SectionTitle>Trending TV Shows</SectionTitle>
//         {loadingTrendingTVShows && <p>Loading...</p>}
//         <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
//           {trendingTVShows?.map((show) => (
//             <MediaCard key={show.id} tmdbItem={show} />
//           ))}
//         </div>
//       </section>

//       {/* Top Rated Movies */}
//       <section>
//         <SectionTitle>Top Rated Movies</SectionTitle>
//         {loadingTopRatedMovies && <p>Loading...</p>}
//         <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
//           {topRatedMovies?.map((movie) => (
//             <MediaCard key={movie.id} tmdbItem={movie} />
//           ))}
//         </div>
//       </section>

//       {/* Top Rated TV Shows */}
//       <section>
//         <SectionTitle>Top Rated TV Shows</SectionTitle>
//         {loadingTopRatedTVShows && <p>Loading...</p>}
//         <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
//           {topRatedTVShows?.map((show) => (
//             <MediaCard key={show.id} tmdbItem={show} />
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }

// import {
//   fetchTrendingMovies,
//   fetchTrendingTVShows,
//   fetchTopRatedMovies,
//   fetchTopRatedTVShows,
// } from "@/lib/tmdbApiQueries";
// import { TMDBMovie, TMDBTVShow } from "@/types/tmdb";

// function SectionTitle({ children }: { children: React.ReactNode }) {
//   return <h2 className="text-2xl font-semibold mb-4">{children}</h2>;
// }

// function MediaCard({ tmdbItem }: { tmdbItem: TMDBMovie | TMDBTVShow }) {
//   const { poster_path, vote_average, media_type } = tmdbItem;

//   let title =
//     media_type === "movie"
//       ? tmdbItem.title
//       : media_type === "tv"
//       ? tmdbItem.name
//       : "";

//   const posterUrl = poster_path
//     ? `https://image.tmdb.org/t/p/w342${poster_path}`
//     : "/abstract-movie-poster.png";

//   return (
//     <div className="w-40 flex-shrink-0 rounded overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform">
//       <img
//         src={posterUrl}
//         alt={title || ""}
//         className="w-full h-60 object-cover"
//       />
//       <div className="p-2">
//         <h3 className="text-sm font-medium truncate">{title}</h3>
//         <p className="text-xs text-yellow-500 font-semibold">
//           ⭐ {vote_average.toFixed(1)}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default async function HomePage() {
//   const [trendingMovies, trendingTVShows, topRatedMovies, topRatedTVShows] =
//     await Promise.all([
//       fetchTrendingMovies("week"),
//       fetchTrendingTVShows("week"),
//       fetchTopRatedMovies(),
//       fetchTopRatedTVShows(),
//     ]);

//   return (
//     <main className="p-6 space-y-10">
//       {/* Trending Movies */}
//       <section>
//         <SectionTitle>Trending Movies</SectionTitle>
//         <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
//           {trendingMovies.map((movie) => (
//             <MediaCard key={movie.id} tmdbItem={movie} />
//           ))}
//         </div>
//       </section>

//       {/* Trending TV Shows */}
//       <section>
//         <SectionTitle>Trending TV Shows</SectionTitle>
//         <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
//           {trendingTVShows.map((show) => (
//             <MediaCard key={show.id} tmdbItem={show} />
//           ))}
//         </div>
//       </section>

//       {/* Top Rated Movies */}
//       <section>
//         <SectionTitle>Top Rated Movies</SectionTitle>
//         <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
//           {topRatedMovies.map((movie) => (
//             <MediaCard key={movie.id} tmdbItem={movie} />
//           ))}
//         </div>
//       </section>

//       {/* Top Rated TV Shows */}
//       <section>
//         <SectionTitle>Top Rated TV Shows</SectionTitle>
//         <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
//           {topRatedTVShows.map((show) => (
//             <MediaCard key={show.id} tmdbItem={show} />
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { tmdbQueries } from "@/lib/queries/tmdbQueries";
import HomePageContent from "./HomePageContent";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(tmdbQueries.trendingMovies()),
    queryClient.prefetchQuery(tmdbQueries.trendingTVShows()),
    queryClient.prefetchQuery(tmdbQueries.topRatedMovies()),
    queryClient.prefetchQuery(tmdbQueries.topRatedTVShows()),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomePageContent />
    </HydrationBoundary>
  );
}
