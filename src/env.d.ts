/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly SECRET_PORT: string;
  readonly SECRET_BASE_URL: string;
  readonly SECRET_TMDB_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
