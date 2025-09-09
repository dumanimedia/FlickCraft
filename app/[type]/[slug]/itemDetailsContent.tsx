"use client";

import { tmdbQueries } from "@/lib/queries/tmdbQueries";
import { TMDBMovieDetails, TMDBTVShowDetails } from "@/types/tmdb";
import { useQuery } from "@tanstack/react-query";

export default function ItemDetailsContent({
  mediaId,
  mediaType,
}: {
  mediaId: number;
  mediaType: "movie" | "tv";
}) {
  let theDetails;
  if (mediaType === "movie") {
    const { data: details } = useQuery(tmdbQueries.movieDetails(mediaId));
    theDetails = details as TMDBMovieDetails;
  } else {
    const { data: details } = useQuery(tmdbQueries.tvShowDetails(mediaId));
    theDetails = details as TMDBTVShowDetails;
  }

  if (theDetails === undefined) {
    return <div>Loading...</div>;
  }

  let title =
    theDetails.media_type === "movie"
      ? theDetails.title
      : theDetails.media_type === "tv"
      ? theDetails.name
      : "";

  console.log({ title });

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-gray-600">{theDetails.overview}</p>
      {/* more media details here */}
    </main>
  );
}
