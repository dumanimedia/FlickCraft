import { NextRequest } from "next/server";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY!;

const validTypes = ["movie", "tv"];

const validLists: Record<string, string[]> = {
  movie: ["popular", "top_rated", "upcoming", "now_playing"],
  tv: ["popular", "top_rated", "airing_today", "on_the_air"],
};

async function fetchFromTMDB(endpoint: string) {
  const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) throw new Error(`TMDB API error: ${res.statusText}`);
  return res.json();
}

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { type: string; slug: string };
  }
) {
  const { type, slug } = params;

  if (!validTypes.includes(type)) {
    return new Response("Invalid type. Must be 'movie' or 'tv'", {
      status: 400,
    });
  }

  // Check if it's a known list (e.g. popular, top_rated)
  const isList = validLists[type].includes(slug);

  // Check if it's a numeric ID (e.g. '550')
  const isDetail = /^\d+$/.test(slug);

  if (!isList && !isDetail) {
    return new Response(`Invalid slug: '${slug}' is not a valid list or ID`, {
      status: 400,
    });
  }

  const endpoint = isList ? `/${type}/${slug}` : `/${type}/${slug}`;

  try {
    const data = await fetchFromTMDB(endpoint);
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch TMDB data", { status: 500 });
  }
}
