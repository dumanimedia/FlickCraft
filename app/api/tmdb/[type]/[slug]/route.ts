import { NextRequest, NextResponse } from "next/server";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!TMDB_API_KEY) {
  throw new Error("Missing TMDB_API_KEY environment variable");
}

const validTypes = ["movie", "tv"] as const;

const validLists: Record<(typeof validTypes)[number], string[]> = {
  movie: ["popular", "top_rated", "upcoming", "now_playing"],
  tv: ["popular", "top_rated", "airing_today", "on_the_air"],
};

async function fetchFromTMDB(endpoint: string) {
  const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok)
    throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    // params is a Promise in newer Next versions — mark it as such
    params: Promise<{ type: string; slug: string }>;
  }
) {
  // <- IMPORTANT: await params before accessing its properties
  const { type, slug } = await params;

  if (!validTypes.includes(type as any)) {
    return new NextResponse("Invalid type. Must be 'movie' or 'tv'", {
      status: 400,
    });
  }

  // Check if it's a known list (e.g. popular, top_rated)
  const isList = validLists[type as (typeof validTypes)[number]].includes(slug);

  // Check if it's a numeric ID (e.g. '550')
  const isDetail = /^\d+$/.test(slug);

  if (!isList && !isDetail) {
    return new NextResponse(
      `Invalid slug: '${slug}' is not a valid list or ID`,
      { status: 400 }
    );
  }

  const endpoint = `/${type}/${slug}`;

  try {
    const data = await fetchFromTMDB(endpoint);
    return NextResponse.json(data);
  } catch (error) {
    console.error("TMDB fetch error:", error);
    return new NextResponse("Failed to fetch TMDB data", { status: 500 });
  }
}
