"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

export default function MediaLists({
  endpoint,
  queryKey,
}: {
  endpoint: string;
  queryKey: string[];
}) {
  const { data } = useSuspenseQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetch(endpoint);

      return response.json();
    },
  });

  return (
    <main>
      <h1>MediaLists</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
