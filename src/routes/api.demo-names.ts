import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/demo-names").methods({
  GET: () => {
    const names = ["Alice", "Bob", "Charlie"];
    return new Response(JSON.stringify({ names }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
});
