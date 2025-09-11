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
  { params }: { params: { type: string } }
) {
  const { searchParams } = new URL(req.url);
  const type = params.type;
  const list = searchParams.get("list") || "popular"; // Default to popular

  const validTypes = ["movie", "tv"];
  const validLists: Record<string, string[]> = {
    movie: ["popular", "top_rated", "upcoming", "now_playing"],
    tv: ["popular", "top_rated", "airing_today", "on_the_air"],
  };

  if (!validTypes.includes(type)) {
    return new Response("Invalid type. Must be 'movie' or 'tv'", {
      status: 400,
    });
  }

  if (!validLists[type].includes(list)) {
    return new Response(`Invalid list for type '${type}'`, {
      status: 400,
    });
  }

  try {
    const data = await fetchFromTMDB(`/${type}/${list}`);
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch list", { status: 500 });
  }
}

// [list]/route.ts
// import { NextRequest } from "next/server";

// const TMDB_BASE_URL = "https://api.themoviedb.org/3";
// const TMDB_API_KEY = process.env.TMDB_API_KEY!;

// async function fetchFromTMDB(endpoint: string) {
//   const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`;
//   const res = await fetch(url, { cache: "no-store" });

//   if (!res.ok) throw new Error(`TMDB API error: ${res.statusText}`);
//   return res.json();
// }

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { type: string; list: string } }
// ) {
//   const { type, list } = params;

//   const validTypes = ["movie", "tv"];
//   const validLists: Record<string, string[]> = {
//     movie: ["popular", "top_rated", "upcoming", "now_playing"],
//     tv: ["popular", "top_rated", "airing_today", "on_the_air"],
//   };

//   if (!validTypes.includes(type)) {
//     return new Response("Invalid type. Must be 'movie' or 'tv'", {
//       status: 400,
//     });
//   }

//   if (!validLists[type].includes(list)) {
//     return new Response(`Invalid list '${list}' for type '${type}'`, {
//       status: 400,
//     });
//   }

//   try {
//     const data = await fetchFromTMDB(`/${type}/${list}`);
//     return Response.json(data);
//   } catch (error) {
//     console.error(error);
//     return new Response("Failed to fetch list", { status: 500 });
//   }
// }

// [id]/route.ts
// import { NextRequest } from "next/server";

// const TMDB_BASE_URL = "https://api.themoviedb.org/3";
// const TMDB_API_KEY = process.env.TMDB_API_KEY!;

// async function fetchFromTMDB(endpoint: string) {
//   const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`;
//   const res = await fetch(url, { cache: "no-store" });

//   if (!res.ok) {
//     throw new Error(`TMDB API error: ${res.statusText}`);
//   }

//   return res.json();
// }

// export async function GET(
//   req: NextRequest,
//   {
//     params,
//   }: {
//     params: { type: string; id: string };
//   }
// ) {
//   const { type, id } = params;

//   const validTypes = ["movie", "tv"];
//   if (!validTypes.includes(type)) {
//     return new Response("Invalid type. Only 'movie' or 'tv' are allowed.", {
//       status: 400,
//     });
//   }

//   if (!id || isNaN(Number(id))) {
//     return new Response("Invalid or missing ID", { status: 400 });
//   }

//   try {
//     const data = await fetchFromTMDB(`/${type}/${id}`);
//     return Response.json(data);
//   } catch (error) {
//     console.error(error);
//     return new Response("Failed to fetch details", { status: 500 });
//   }
// }
