import { notFound } from "next/navigation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import ItemDetailsContent from "./itemDetailsContent";
import { tmdbQueries } from "@/lib/queries/tmdbQueries";

export default async function MediaDetailsPage({
  params,
}: {
  params: { type: "movie" | "tv"; slug: string };
}) {
  const { type, slug } = params;

  if (type !== "movie" && type !== "tv") return notFound();

  const parts = slug.split("-");
  const id = parts[parts.length - 1];

  const itemId = Number(id);
  if (isNaN(itemId)) return notFound();

  const queryClient = new QueryClient();

  if (type === "movie")
    await queryClient.prefetchQuery(tmdbQueries.movieDetails(itemId));
  else if (type === "tv")
    await queryClient.prefetchQuery(tmdbQueries.tvShowDetails(itemId));

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      {/* <h1>Hello World, What's good!</h1> */}
      <ItemDetailsContent mediaId={itemId} mediaType={type} />
    </HydrationBoundary>
  );
}
