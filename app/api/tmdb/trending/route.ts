import { NextRequest } from "next/server";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY!;

export async function fetchFromTMDB(endpoint: string, query: string = "") {
  const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&${query}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.statusText}`);
  }

  return res.json();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const mediaType = searchParams.get("type") || "all"; // movie, tv, all
  const timeWindow = searchParams.get("time") || "day"; // day, week

  const validMediaTypes = ["all", "movie", "tv"];
  const validTimeWindows = ["day", "week"];

  if (
    !validMediaTypes.includes(mediaType) ||
    !validTimeWindows.includes(timeWindow)
  ) {
    return new Response("Invalid media_type or time_window", { status: 400 });
  }

  try {
    const data = await fetchFromTMDB(`/trending/${mediaType}/${timeWindow}`);
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch trending data", { status: 500 });
  }
}
