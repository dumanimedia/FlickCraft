import { NextRequest } from "next/server";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY!;

async function fetchFromTMDB(endpoint: string, query: string = "") {
  const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&${query}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) throw new Error(`TMDB API error: ${res.statusText}`);
  return res.json();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const type = searchParams.get("type") || "movie"; // movie, tv, person

  if (!query) {
    return new Response("Missing search query", { status: 400 });
  }

  const validTypes = ["movie", "tv", "person"];
  if (!validTypes.includes(type)) {
    return new Response("Invalid search type", { status: 400 });
  }

  try {
    const data = await fetchFromTMDB(
      `/search/${type}`,
      `query=${encodeURIComponent(query)}`
    );
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return new Response("Failed to search TMDB", { status: 500 });
  }
}
