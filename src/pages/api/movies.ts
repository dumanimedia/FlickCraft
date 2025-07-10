import type { APIRoute } from "astro";

const TMDB_API_KEY = import.meta.env.TMDB_API_KEY;

export const get: APIRoute = async ({ url }) => {
  const lang = url.searchParams.get("lang") || "en";

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=${lang}&api_key=${TMDB_API_KEY}`
  );

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch movies" }), {
      status: 500,
    });
  }

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};
