import { NextRequest } from "next/server";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY!;

async function fetchFromTMDB(endpoint: string) {
  const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) throw new Error(`TMDB API error: ${res.statusText}`);
  return res.json();
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) return new Response("Missing person ID", { status: 400 });

  try {
    const data = await fetchFromTMDB(`/person/${id}`);
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch person", { status: 500 });
  }
}
