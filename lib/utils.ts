import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Image URL builder
export function getImageUrl(
  path: string | null,
  size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original" = "w500"
): string {
  if (!path) return "/abstract-movie-poster.png";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

// Backdrop URL builder
export function getBackdropUrl(
  path: string | null,
  size: "w300" | "w780" | "w1280" | "original" = "w1280"
): string {
  if (!path) return "/movie-backdrop.png";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

// Format runtime (e.g., 135 => "2h 15m")
export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

// Format rating (e.g., 8.245 => "8.2")
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

// Extract year from date (e.g., "2025-09-01" => "2025")
export function getYear(dateString: string): string {
  return new Date(dateString).getFullYear().toString();
}
