import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BASE_URL =
  process.env.VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL;
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export function getImageUrl(
  path: string | null,
  size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original" = "w500"
): string {
  if (!path) return "/placeholder.svg";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

// Helper method to get backdrop URL
export function getBackdropUrl(
  path: string | null,
  size: "w300" | "w780" | "w1280" | "original" = "w1280"
): string {
  if (!path) return "/placeholder.svg";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

// Helper method to format runtime
export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

// Helper method to format rating
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

// Helper method to get year from date
export function getYear(dateString: string): string {
  return new Date(dateString).getFullYear().toString();
}
