// This page is for the movie/tv details, trending, popular, upcoming etc

import { notFound } from "next/navigation";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { BASE_URL } from "@/lib/utils";
import MediaLists from "@/components/media-lists";
import MediaDetails from "@/components/media-details";
import { getQueryClient } from "@/lib/get-query-client";

export default async function DetailsAndListsPage({
  params,
}: {
  params: Promise<{ slug: string; type: string }>;
}) {
  const { slug, type } = await params;
  const queryClient = getQueryClient();

  const validTypes = ["movie", "tv"] as const;
  type ValidType = (typeof validTypes)[number];

  function isValidType(type: string): type is ValidType {
    return validTypes.includes(type as ValidType);
  }

  const validLists: Record<(typeof validTypes)[number], string[]> = {
    movie: ["popular", "top_rated", "upcoming", "now_playing"],
    tv: ["popular", "top_rated", "airing_today", "on_the_air"],
  };

  if (!isValidType(type)) {
    return notFound();
  }

  const isDetail = /^\d+$/.test(slug);
  const isList = validLists[type as (typeof validTypes)[number]].includes(slug);

  if (!isList && !isDetail) {
    return notFound();
  }

  const queryKey: (string | number)[] = [`${type}-${slug}`];
  const creditsQueryKey: (string | number)[] = ["media-cast", Number(slug)];
  const endpoint: string = `${BASE_URL}/api/tmdb/${type}/${slug}`;
  const creditsEndpoint: string = `${BASE_URL}/api/tmdb/${type}/${slug}/credits`;

  console.log({ endpoint });

  void queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetch(endpoint);

      return response.json();
    },
  });

  if (isDetail) {
    void queryClient.prefetchQuery({
      queryKey: creditsQueryKey,
      queryFn: async () => {
        const response = await fetch(creditsEndpoint);

        return response.json();
      },
    });
  }

  if (isList) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MediaLists queryKey={queryKey} endpoint={endpoint} />
      </HydrationBoundary>
    );
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MediaDetails
        type={type}
        queryKey={queryKey}
        creditsQueryKey={creditsQueryKey}
        endpoint={endpoint}
        creditsEndpoint={creditsEndpoint}
      />
    </HydrationBoundary>
  );
}
