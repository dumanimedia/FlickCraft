import type { APIRoute } from "astro";

// const TMDB_API_KEY = import.meta.env.SECRET_TMDB_API_KEY;

// export const get: APIRoute = async ({ url }) => {
//   const lang = url.searchParams.get("lang") || "en";

//   const res = await fetch(
//     `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=${lang}&page=1`
//   );

//   if (!res.ok) {
//     return new Response(JSON.stringify({ error: "Failed to fetch movies" }), {
//       status: 500,
//     });
//   }

//   const data = await res.json();

//   return new Response(JSON.stringify(data), {
//     headers: { "Content-Type": "application/json" },
//   });
// };

export const GET: APIRoute = ({ params, request }) => {
  return new Response(
    JSON.stringify({
      message: "This was a GET!",
    })
  );
};

export const POST: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      message: "This was a POST!",
    })
  );
};

export const DELETE: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      message: "This was a DELETE!",
    })
  );
};

export const ALL: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      message: `This was a ${request.method}!`,
    })
  );
};
