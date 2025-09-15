"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { getImageUrl, getBackdropUrl, formatRuntime } from "@/lib/utils";
import {
  TMDBCredits,
  TMDBMediaReviews,
  TMDBMovieDetails,
  TMDBTVShowDetails,
  TMDBWatchProviders,
} from "@/types/tmdb";
import { CastCrew } from "./cast-crew";
import { MovieInfo } from "./media-info";
import { ReviewsSection } from "./review-section";
import { StreamingLinks } from "./streaming-links";
import { MovieDetailHero } from "./media-detail-hero";
import { SimilarContent } from "./similar-content";

interface TMDBSimilar {
  results: Array<{
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
  }>;
}

export default function MediaDetails({
  type,
  endpoint,
  queryKey,
  similarQueryKey,
  similarEndpoint,
  creditsEndpoint,
  creditsQueryKey,
  reviewsQueryKey,
  watchProvidersQueryKey,
  watchProvidersEndpoint,
}: {
  type: string;
  endpoint: string;
  similarEndpoint: string;
  creditsEndpoint: string;
  queryKey: (string | number)[];
  similarQueryKey: (string | number)[];
  watchProvidersEndpoint: string;
  creditsQueryKey: (string | number)[];
  reviewsQueryKey: (string | number)[];
  watchProvidersQueryKey: (string | number)[];
}) {
  const { data } = useSuspenseQuery<TMDBMovieDetails | TMDBTVShowDetails>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(endpoint);

      return response.json();
    },
  });

  const { data: credits } = useSuspenseQuery<TMDBCredits>({
    queryKey: creditsQueryKey,
    queryFn: async () => {
      const response = await fetch(creditsEndpoint);

      return response.json();
    },
  });

  const { data: reviews } = useSuspenseQuery<TMDBMediaReviews>({
    queryKey: reviewsQueryKey,
    queryFn: async () => {
      const response = await fetch(creditsEndpoint);

      return response.json();
    },
  });

  const { data: watchProviders } = useSuspenseQuery<TMDBWatchProviders>({
    queryKey: watchProvidersQueryKey,
    queryFn: async () => {
      const response = await fetch(watchProvidersEndpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch watch providers");
      }
      return response.json();
    },
  });

  const { data: similar } = useSuspenseQuery<TMDBSimilar>({
    queryKey: similarQueryKey,
    queryFn: async () => {
      const response = await fetch(similarEndpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch watch providers");
      }
      return response.json();
    },
  });

  function transformTMDBData(
    data: TMDBMovieDetails | TMDBTVShowDetails,
    contentType: "movie" | "tv",
    creditsData: TMDBCredits
  ) {
    const isMovie = contentType === "movie";
    const movieData = data as TMDBMovieDetails;
    const tvData = data as TMDBTVShowDetails;

    // Get director and writers from credits
    let director = "";
    let writers: string[] = [];
    let creator = "";

    if (creditsData) {
      if (isMovie) {
        director =
          creditsData.crew.filter((person) => person.job === "Director")[0]
            ?.name || "";
        writers = creditsData.crew
          .filter(
            (person) => person.job === "Writer" || person.job === "Screenplay"
          )
          .map((person) => person.name);
      } else {
        creator = tvData.created_by?.[0]?.name || "";
      }
    }

    return {
      id: `${contentType}-${data.id}`,
      type: contentType,
      title: isMovie ? movieData.title : tvData.name,
      year: isMovie
        ? new Date(movieData.release_date || "").getFullYear().toString()
        : new Date(tvData.first_air_date || "").getFullYear().toString(),
      rating: Math.round(data.vote_average * 10) / 10,
      genre: data.genres[0]?.name || "Unknown",
      image: getImageUrl(data.poster_path),
      backdropImage: getBackdropUrl(data.backdrop_path),
      isNew: isMovie
        ? new Date(movieData.release_date || "") >
          new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
        : new Date(tvData.first_air_date || "") >
          new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      runtime: isMovie
        ? formatRuntime(movieData.runtime || 0)
        : `${formatRuntime(tvData.episode_run_time[0] || 45)} per episode`,
      director: isMovie ? director : undefined,
      creator: !isMovie ? creator : undefined,
      writers: isMovie && writers.length > 0 ? writers : undefined,
      seasons: !isMovie ? tvData.number_of_seasons : undefined,
      episodes: !isMovie ? tvData.number_of_episodes : undefined,
      status: data.status,
      synopsis: data.overview,
      plot: data.overview, // Using same content for both
      cast: creditsData.cast.slice(0, 8).map((actor) => ({
        name: actor.name,
        character: actor.character,
        image: getImageUrl(actor.profile_path, "w185"),
      })),
      crew: creditsData.crew
        .filter((person) =>
          [
            "Director",
            "Producer",
            "Writer",
            "Screenplay",
            "Cinematographer",
          ].includes(person.job)
        )
        .slice(0, 8)
        .map((person) => ({
          name: person.name,
          role: person.job,
        })),
      technicalSpecs: {
        language: isMovie
          ? movieData.spoken_languages[0]?.name || "English"
          : tvData.languages[0] || "en",
        country: isMovie
          ? movieData.production_countries[0]?.name || "USA"
          : tvData.origin_country[0] || "US",
        budget:
          isMovie && movieData.budget
            ? `$${(movieData.budget / 1000000).toFixed(0)}M`
            : undefined,
        boxOffice:
          isMovie && movieData.revenue
            ? `$${(movieData.revenue / 1000000).toFixed(0)}M`
            : undefined,
        network: !isMovie ? tvData.networks[0]?.name : undefined,
        aspectRatio: "2.39:1", // Default value as TMDB doesn't provide this
        sound: "Dolby Atmos", // Default value as TMDB doesn't provide this
      },
    };
  }

  const transformedContent = transformTMDBData(
    data,
    type as "movie" | "tv",
    credits
  );

  const transformedStreamingLinks = () => {
    if (!watchProviders.results?.US) return [];

    const providers = [];
    const usProviders = watchProviders.results.US;

    // Add flatrate (subscription) providers
    if (usProviders.flatrate) {
      providers.push(
        ...usProviders.flatrate.map((provider) => ({
          platform: provider.provider_name,
          url: "#", // TMDB doesn't provide direct links
          price: "Included",
          logo: getImageUrl(provider.logo_path, "w92"),
        }))
      );
    }

    // Add rent providers
    if (usProviders.rent) {
      providers.push(
        ...usProviders.rent.slice(0, 3).map((provider) => ({
          platform: provider.provider_name,
          url: "#",
          price: "$4.99",
          logo: getImageUrl(provider.logo_path, "w92"),
        }))
      );
    }

    return providers.slice(0, 5); // Limit to 5 providers
  };

  return (
    <main>
      <MovieDetailHero content={transformedContent} />

      <div className="container mx-auto max-w-7xl px-4 py-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <MovieInfo content={transformedContent} />
            <CastCrew
              cast={transformedContent.cast}
              crew={transformedContent.crew}
            />
            <ReviewsSection
              contentId={reviews.id}
              reviews={reviews?.results || []}
              contentType={type as "movie" | "tv"}
            />
          </div>

          <div className="space-y-6">
            <StreamingLinks links={transformedStreamingLinks()} />
            {/* Trailer section can be added if TMDB videos endpoint is implemented */}
          </div>
        </div>

        {similar.results.length > 0 && (
          <SimilarContent
            currentContent={transformedContent}
            similarContent={similar.results.slice(0, 12).map((item) => ({
              id: `${type}-${item.id}`,
              type: type as "movie" | "tv",
              title: item.title || item.name || "Unknown",
              image: getImageUrl(item.poster_path),
              rating: Math.round(item.vote_average * 10) / 10,
              year: item.release_date || item.first_air_date || "1999",
            }))}
          />
        )}
      </div>
    </main>
  );
}
