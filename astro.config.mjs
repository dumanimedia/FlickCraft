// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "http://localhost:3049",
  server: {
    port: 3049,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react({
      include: ["**/react/*"],
      experimentalReactChildren: true,
    }),
  ],
});
