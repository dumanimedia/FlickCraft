"use client";

import Image from "next/image";
import {
  Play,
  Plus,
  Share,
  Star,
  Clock,
  Calendar,
  Heart,
  Check,
  Tv,
  Film,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { getBackdropUrl } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

interface MovieDetailHeroProps {
  content: {
    id: string;
    type: "movie" | "tv";
    title: string;
    year: string;
    rating: number;
    genre: string;
    image: string;
    backdropImage: string;
    isNew: boolean;
    runtime: string;
    director?: string;
    creator?: string;
    writers?: string[];
    seasons?: number;
    episodes?: number;
    synopsis: string;
    status?: string;
  };
}

export function MovieDetailHero({ content }: MovieDetailHeroProps) {
  const {
    user,
    addToWatchlist,
    removeFromWatchlist,
    addToFavorites,
    removeFromFavorites,
  } = useAuth();
  const router = useRouter();

  const mediaItem = {
    id: content.id,
    title: content.title,
    description: content.title,
  };

  const isInWatchlist = user?.watchlist.includes(mediaItem) || false;
  const isInFavorites = user?.favorites.includes(mediaItem) || false;

  const isMovie = content.type === "movie";
  const isTVShow = content.type === "tv";

  const handleWatchlistToggle = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (isInWatchlist) {
      removeFromWatchlist(content.id);
    } else {
      addToWatchlist(mediaItem);
    }
  };

  const handleFavoritesToggle = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (isInFavorites) {
      removeFromFavorites(content.id);
    } else {
      addToFavorites(mediaItem);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: content.title,
          text: content.synopsis,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Helper function to get status badge variant
  const getStatusBadgeVariant = (status?: string) => {
    if (!status) return "outline";

    switch (status.toLowerCase()) {
      case "ended":
      case "canceled":
        return "destructive";
      case "returning series":
      case "continuing":
        return "default";
      case "in production":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <section className="relative h-[80vh] flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={
            getBackdropUrl(content.backdropImage) ||
            getBackdropUrl(content.image)
          }
          alt={content.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          {/* Poster */}
          <div className="hidden md:block">
            <div className="aspect-[2/3] w-full max-w-sm relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={content.image}
                alt={content.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                {content.isNew && (
                  <Badge className="bg-primary text-primary-foreground">
                    New Release
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className="capitalize flex items-center gap-1"
                >
                  {isMovie ? (
                    <>
                      <Film className="w-3 h-3" />
                      Movie
                    </>
                  ) : (
                    <>
                      <Tv className="w-3 h-3" />
                      TV Series
                    </>
                  )}
                </Badge>
                <Badge variant="outline">{content.genre}</Badge>
                {isTVShow && content.status && (
                  <Badge variant={getStatusBadgeVariant(content.status)}>
                    {content.status}
                  </Badge>
                )}
              </div>

              <h1 className="font-heading font-bold text-4xl md:text-6xl text-balance">
                {content.title}
              </h1>

              <div className="flex items-center gap-6 text-muted-foreground flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">
                    {content.rating}
                  </span>
                  <span>/10</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{content.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{content.runtime}</span>
                </div>
                {isTVShow && content.seasons && (
                  <span className="flex items-center gap-1">
                    <Tv className="w-4 h-4" />
                    {content.seasons} Season{content.seasons > 1 ? "s" : ""}
                  </span>
                )}
                {isTVShow && content.episodes && (
                  <span>{content.episodes} Episodes</span>
                )}
              </div>

              <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
                {content.synopsis}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Play className="w-5 h-5 mr-2 fill-current" />
                {isMovie ? "Watch Movie" : "Watch Series"}
              </Button>

              <Button
                size="lg"
                variant={isInWatchlist ? "default" : "secondary"}
                onClick={handleWatchlistToggle}
                className={
                  isInWatchlist ? "bg-green-600 hover:bg-green-700" : ""
                }
              >
                {isInWatchlist ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    In Watchlist
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Add to Watchlist
                  </>
                )}
              </Button>

              <Button
                size="lg"
                variant={isInFavorites ? "default" : "outline"}
                onClick={handleFavoritesToggle}
                className={isInFavorites ? "bg-red-600 hover:bg-red-700" : ""}
              >
                <Heart
                  className={`w-5 h-5 mr-2 ${
                    isInFavorites ? "fill-current" : ""
                  }`}
                />
                {isInFavorites ? "Favorited" : "Add to Favorites"}
              </Button>

              <Button size="lg" variant="outline" onClick={handleShare}>
                <Share className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>

            {/* Credits */}
            <div className="text-sm text-muted-foreground space-y-1">
              {isMovie && content.director && (
                <p>
                  <span className="font-medium">Director:</span>{" "}
                  {content.director}
                </p>
              )}
              {isTVShow && content.creator && (
                <p>
                  <span className="font-medium">Created by:</span>{" "}
                  {content.creator}
                </p>
              )}
              {isMovie && content.writers && content.writers.length > 0 && (
                <p>
                  <span className="font-medium">
                    {content.writers.length > 1 ? "Writers:" : "Writer:"}
                  </span>{" "}
                  {content.writers.join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
