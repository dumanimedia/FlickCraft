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
    params: Promise<{ type: string; slug: string }>;
  }
) {
  const { type, slug } = await params;

  const validTypes = ["movie", "tv"] as const;
  type ValidType = (typeof validTypes)[number];

  function isValidType(type: string): type is ValidType {
    return validTypes.includes(type as ValidType);
  }

  if (!isValidType(type)) {
    return new NextResponse("Invalid type. Must be 'movie' or 'tv'", {
      status: 400,
    });
  }

  const isList = validLists[type as (typeof validTypes)[number]].includes(slug);

  const isDetail = /^\d+$/.test(slug);

  if (!isList && !isDetail) {
    return new NextResponse(
      `Invalid slug: '${slug}' is not a valid list or ID`,
      { status: 400 }
    );
  }

  const endpoint: string = `/${type}/${slug}`;

  try {
    const data = await fetchFromTMDB(endpoint);
    return NextResponse.json(data);
  } catch (error) {
    console.error("TMDB fetch error:", error);
    return new NextResponse("Failed to fetch TMDB data", { status: 500 });
  }
}
