import { NextRequest, NextResponse } from "next/server";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!TMDB_API_KEY) {
  throw new Error("Missing TMDB_API_KEY environment variable");
}

const validTypes = ["movie", "tv"] as const;

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

  const isDetail = /^\d+$/.test(slug);

  if (!isDetail) {
    return new NextResponse(`Invalid slug: '${slug}' is not a ID`, {
      status: 400,
    });
  }

  const endpoint = `/${type}/${slug}/credits`;

  try {
    const data = await fetchFromTMDB(endpoint);
    return NextResponse.json(data);
  } catch (error) {
    console.error("TMDB fetch error:", error);
    return new NextResponse("Failed to fetch TMDB data", { status: 500 });
  }
}
