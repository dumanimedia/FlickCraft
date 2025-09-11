import { NextRequest, NextResponse } from "next/server";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!TMDB_API_KEY) {
  throw new Error("Missing TMDB_API_KEY environment variable");
}

async function fetchFromTMDB(endpoint: string) {
  const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok)
    throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // <-- params is a Promise
) {
  // await params BEFORE accessing its properties
  const { id } = await params;

  if (!id) return new NextResponse("Missing person ID", { status: 400 });

  try {
    const data = await fetchFromTMDB(`/person/${id}`);
    return NextResponse.json(data);
  } catch (error) {
    console.error("TMDB person fetch error:", error);
    return new NextResponse("Failed to fetch person", { status: 500 });
  }
}
