// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";

const defaultLocale = "en";
const locales = {
  en: "en-US",
  es: "es-ES",
  hi: "hi-IN",
  pt: "pt-BR",
  fr: "fr-FR",
  ko: "ko-KR",
  de: "de-DE",
};

export default defineConfig({
  site: "https://flick-craft.vercel.app",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  server: {
    port: 3049,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    i18n({
      locales,
      defaultLocale,
    }),
    react(),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
  ],
});
