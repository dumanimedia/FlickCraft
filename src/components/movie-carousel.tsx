"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const movies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
  },
  {
    id: 2,
    title: "Avengers: Infinity War",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    id: 3,
    title: "Spider-Man: Homecoming",
    poster: "/placeholder.svg?height=400&width=280",
  },
  {
    id: 4,
    title: "Spider-Man: No Way Home",
    poster: "/placeholder.svg?height=400&width=280",
  },
  {
    id: 5,
    title: "X-Men: Apocalypse",
    poster: "/placeholder.svg?height=400&width=280",
  },
  {
    id: 6,
    title: "X-Men: Days of Future Past",
    poster: "/placeholder.svg?height=400&width=280",
  },
  {
    id: 7,
    title: "Captain Marvel",
    poster: "/placeholder.svg?height=400&width=280",
  },
  {
    id: 8,
    title: "Thor: Ragnarok",
    poster: "/placeholder.svg?height=400&width=280",
  },
];

export default function MovieCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 320; // Width of one movie card plus gap
    const newScrollLeft =
      scrollContainerRef.current.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  return (
    <div className="relative">
      {/* Left scroll button */}
      <Button
        variant="ghost"
        size="icon"
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white border border-white/20 ${
          !canScrollLeft ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      {/* Right scroll button */}
      <Button
        variant="ghost"
        size="icon"
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white border border-white/20 ${
          !canScrollRight ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Movie cards container */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide px-16 py-4"
        onScroll={handleScroll}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-72 group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
              <img
                src={movie.poster || "/placeholder.svg"}
                alt={movie.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-semibold text-sm line-clamp-2">
                  {movie.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
