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
  {
    params,
  }: {
    params: Promise<{ endpoint: string; slug: string; type: string }>;
  }
) {
  const { endpoint, slug, type } = await params;

  const validTypes = ["movie", "tv"] as const;
  type ValidType = (typeof validTypes)[number];

  const validEndpoints = [
    "reviews",
    "similar",
    "videos",
    "credits",
    "watch_providers",
    "recommendations",
    "images",
    "keywords",
    "external_ids",
  ] as const;

  type ValidEndpoint = (typeof validEndpoints)[number];

  function isValidType(type: string): type is ValidType {
    return validTypes.includes(type as ValidType);
  }

  function isValidEndpoint(endpoint: string): endpoint is ValidEndpoint {
    return validEndpoints.includes(endpoint as ValidEndpoint);
  }

  if (!isValidType(type)) {
    return new NextResponse("Invalid type. Must be 'movie' or 'tv'", {
      status: 400,
    });
  }

  if (!isValidEndpoint(endpoint)) {
    return new NextResponse(
      `Invalid endpoint: '${endpoint}' is not a valid endpoint`,
      {
        status: 400,
      }
    );
  }

  const endpointPath: string = `/${type}/${slug}/${
    endpoint === "watch_providers" ? "watch/providers" : endpoint
  }`;

  try {
    const data = await fetchFromTMDB(endpointPath);
    return NextResponse.json(data);
  } catch (error) {
    console.error("TMDB fetch error:", error);
    return new NextResponse("Failed to fetch TMDB data", { status: 500 });
  }
}
