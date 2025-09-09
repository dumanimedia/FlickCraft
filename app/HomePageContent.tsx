"use client";

import { useQuery } from "@tanstack/react-query";
import { TMDBMovie, TMDBTVShow } from "@/types/tmdb";
import { tmdbQueries } from "@/lib/queries/tmdbQueries";

function MediaCard({ tmdbItem }: { tmdbItem: TMDBMovie | TMDBTVShow }) {
  const { poster_path, vote_average, media_type } = tmdbItem;

  let title =
    media_type === "movie"
      ? tmdbItem.title
      : media_type === "tv"
      ? tmdbItem.name
      : "";

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w342${poster_path}`
    : "/abstract-movie-poster.png";

  return (
    <div className="w-40 flex-shrink-0 rounded overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform">
      <img
        src={posterUrl}
        alt={title || ""}
        className="w-full h-60 object-cover"
      />
      <div className="p-2">
        <h3 className="text-sm font-medium truncate">{title}</h3>
        <p className="text-xs text-yellow-500 font-semibold">
          ⭐ {vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
}

export default function HomePageContent() {
  const { data: trendingMovies } = useQuery(tmdbQueries.trendingMovies());
  const { data: trendingTVShows } = useQuery(tmdbQueries.trendingTVShows());
  const { data: topRatedMovies } = useQuery(tmdbQueries.topRatedMovies());
  const { data: topRatedTVShows } = useQuery(tmdbQueries.topRatedTVShows());

  return (
    <main className="p-6 space-y-10">
      <section>
        <h1>Trending Movies</h1>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {trendingMovies?.map((movie) => (
            <MediaCard key={movie.id} tmdbItem={movie} />
          ))}
        </div>
      </section>

      <section>
        <h1>Trending TV Shows</h1>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {trendingTVShows?.map((show) => (
            <MediaCard key={show.id} tmdbItem={show} />
          ))}
        </div>
      </section>

      <section>
        <h1>Top Rated Movies</h1>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {topRatedMovies?.map((movie) => (
            <MediaCard key={movie.id} tmdbItem={movie} />
          ))}
        </div>
      </section>

      <section>
        <h1>Top Rated TV Shows</h1>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {topRatedTVShows?.map((show) => (
            <MediaCard key={show.id} tmdbItem={show} />
          ))}
        </div>
      </section>
    </main>
  );
}
