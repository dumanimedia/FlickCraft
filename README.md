# FlickCraft

Discover the best movies and TV shows tailored to your taste with personalized recommendations, trending content, and reviews.

<!-- A. When to Use Server Components vs. TanStack Query

Server Components (RSC): Great for SEO-critical or static data fetched at build/server render time—like trending/popular lists.

TanStack Query (Client-side): Ideal for dynamic, interactive, or user-driven data flows—like infinite scroll, filters, pagination, or live updates.
Next.js
MakeUseOf

Reddit insights echo this:

Use cases like pagination, applying filters in search, user click data fetching like tabs... TanStack Query helps with caching, clean code, and client‑side state.
Reddit
+1

B. Hybrid Approach: Prefetch + Hydrate

Next.js + TanStack Query shine when you prefetch data on the server, dehydrate it, and hydrate on the client. This gives you the best of both worlds: fast initial render + intelligent caching.

For example, in a page component:

// app/page.tsx (Server Component)
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchTrendingMovies } from '@/lib/api';

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['trendingMovies'], fetchTrendingMovies);

  return (
    <ClientComponent
      dehydratedState={dehydrate(queryClient)}
    />
  );
}


Then in your client component:

"use client";

import { QueryClient, Hydrate, useQuery } from "@tanstack/react-query";
import { fetchTrendingMovies } from '@/lib/api';

export default function ClientComponent({ dehydratedState }) {
  const queryClient = new QueryClient();

  return (
    <Hydrate state={dehydratedState}>
      <MoviesList />
    </Hydrate>
  );
}

function MoviesList() {
  const { data } = useQuery(['trendingMovies'], fetchTrendingMovies);
  // render data...
}


This approach avoids waterfalls, enables caching and revalidation, and integrates cleanly with Suspense and streaming.
TanStack
+2
TanStack
+2

C. Performance Tips

Use fetch() in Server Components to take advantage of built-in memoization and avoid unnecessary client-server round trips.
Next.js

Avoid unnecessary duplication of data-fetching logic—centralize your fetcher functions (e.g., fetchTrendingMovies) and reuse them consistently.

Use getQueryClient() via React’s cache() for shared, per-request QueryClient.
TanStack

Use Suspense and loading.tsx to stream content and avoid layout shifts. -->

<!-- | Scenario              | Strategy                                            | Outcome                                   |
| --------------------- | --------------------------------------------------- | ----------------------------------------- |
| Static/SEO Content    | Fetch with Server Components                        | Fast, SEO‑friendly initial renders        |
| Interactive Client UI | Use `useQuery` + TanStack Query in client component | Instant caching, pagination, live updates |
| Combined Flow         | Server prefetch → dehydrate → hydrate in client     | Hydrated state, smooth UX, minimal flash  |
| API Clients           | Build custom TS fetchers or use typed wrappers      | Strong typing, reuse across layers        | -->

<!-- [🔎 Search...]  [Genre ▼] [Year ▼] [Sort By ▼] [Media Type ▼] -->


<!-- 1. **Hero Section**
2. **Search & Filter Bar**
3. **Trending Now**
4. **New Releases**
5. **Top Rated**
6. **Browse by Genre**
7. **Recommended for You**
8. **Featured Collections**
9. **Cast & Crew Spotlight**
10. **Trailers & Previews**
11. **Infinite Scroll / Load More**
12. **Newsletter / Watchlist CTA**
13. **Footer** -->
