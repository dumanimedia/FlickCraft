"use client";

import Image from "next/image";
import { useSuspenseQuery } from "@tanstack/react-query";

import {
  getImageUrl,
  getBackdropUrl,
  formatRuntime,
  BASE_URL,
} from "@/lib/utils";
import { TMDBCredits, TMDBMovieDetails } from "@/types/tmdb";
import {
  Calendar,
  Check,
  Clock,
  Heart,
  Play,
  Plus,
  Share,
  Star,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Link from "next/link";

export default function MediaDetails({
  creditsEndpoint,
  endpoint,
  queryKey,
  type,
}: {
  creditsEndpoint: string;
  endpoint: string;
  queryKey: string[];
  type: string;
}) {
  const { data } = useSuspenseQuery<TMDBMovieDetails>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(endpoint);

      return response.json();
    },
  });

  const { data: credits } = useSuspenseQuery<TMDBCredits>({
    queryKey: ["media-cast", data.id],
    queryFn: async () => {
      const response = await fetch(creditsEndpoint);

      return response.json();
    },
  });

  console.log({ credits });

  return (
    <main>
      <section className="relative h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={getBackdropUrl(data.backdrop_path) || ""}
            alt={data.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            <div className="hidden md:block">
              <div className="aspect-[2/3] w-full max-w-sm relative rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={getImageUrl(data.poster_path) || "/placeholder.svg"}
                  alt={data.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  {data.genres.map((genre) => (
                    <Badge
                      key={`${genre.name}-${genre.id}`}
                      variant="secondary"
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>

                <h1 className="font-heading font-bold text-4xl md:text-6xl text-balance">
                  {data.title}
                </h1>

                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">
                      {data.vote_average.toFixed(1)}
                    </span>
                    <span>/10</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{data.release_date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="size-4" />
                    <span>{formatRuntime(data.runtime ?? 0)}</span>
                  </div>
                  {/* {content.type === "tv" && (
                  <span>
                    {content.seasons} Season{content.seasons > 1 ? "s" : ""}
                  </span>
                )} */}
                </div>

                <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
                  {data.overview}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Watch Now
                </Button>

                <Button size="lg">
                  <Heart className={`w-5 h-5 mr-2`} />
                  Add to Favorites
                </Button>

                <Button size="lg" variant="outline">
                  <Share className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>

              {/* <div className="text-sm text-muted-foreground space-y-1">
              {content.director && (
                <p>
                  <span className="font-medium">Director:</span> {content.director}
                </p>
              )}
              {content.creator && (
                <p>
                  <span className="font-medium">Creator:</span> {content.creator}
                </p>
              )}
              {content.writers && (
                <p>
                  <span className="font-medium">Writers:</span> {content.writers.join(", ")}
                </p>
              )}
            </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 py-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Plot</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {data.overview}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-sm">Language:</span>
                        <p className="text-muted-foreground">
                          {data.spoken_languages[0].name}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-sm">Status:</span>
                        <p className="text-muted-foreground">{data.status}</p>
                      </div>
                      <div>
                        <span className="font-medium text-sm">Budget:</span>
                        <p className="text-muted-foreground">{data.budget}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-sm">Revenue:</span>
                        <p className="text-muted-foreground">{data.revenue}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cast Crew */}
            <Card>
              <CardHeader>
                <CardTitle>Cast & Crew</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="cast" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="cast">Cast</TabsTrigger>
                    <TabsTrigger value="crew">Crew</TabsTrigger>
                  </TabsList>

                  <TabsContent value="cast" className="mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {credits.cast.map((actor, index) => (
                        <div
                          key={index}
                          className="relative text-center space-y-2"
                        >
                          <Link
                            className="absolute inset-0 z-1"
                            href={`/person/${actor.id}`}
                          ></Link>
                          <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={
                                getImageUrl(actor.profile_path, "w185") ||
                                "/placeholder.svg"
                              }
                              alt={actor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{actor.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {actor.character}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="crew" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {credits.crew.map((member, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b border-border last:border-0"
                        >
                          <span className="font-medium">{member.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {member.job}
                          </span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            {/* <ReviewsSection reviews={content.reviews} contentId={content.id} /> */}
          </div>

          {/* <div className="space-y-6">
              <StreamingLinks links={content.streamingLinks} />
              {content.trailerUrl && (
                <div className="bg-card rounded-lg p-4">
                  <h3 className="font-heading font-semibold text-lg mb-4">Watch Trailer</h3>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe src={content.trailerUrl} title="Trailer" className="w-full h-full" allowFullScreen />
                  </div>
                </div>
              )}
            </div> */}
        </div>
      </section>
    </main>
  );
}
