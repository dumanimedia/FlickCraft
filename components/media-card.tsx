import { TMDBMovie, TMDBTVShow } from "@/types/tmdb";

export default function MediaCard({
  tmdbItem,
}: {
  tmdbItem: TMDBMovie | TMDBTVShow;
}) {
  const { poster_path, vote_average, media_type } = tmdbItem;

  let title =
    media_type === "movie"
      ? tmdbItem.title
      : media_type === "tv"
      ? tmdbItem.name
      : "";

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w342${poster_path}`
    : "/placeholder.svg";

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
