import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar } from "lucide-react";

interface SimilarContentProps {
  currentContent: {
    id: string;
    type: "movie" | "tv";
    title: string;
  };
  similarContent?: Array<{
    id: string;
    type: "movie" | "tv";
    title: string;
    image: string;
    rating: number;
    year: string;
  }>;
}

export function SimilarContent({
  currentContent,
  similarContent = [],
}: SimilarContentProps) {
  if (!similarContent || similarContent.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>More Like This</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {similarContent.map((item) => (
            <Link
              key={item.id}
              href={`/${item.type}/${item.id.split("-")[1]}`}
              className="group"
            >
              <div className="space-y-2">
                <div className="aspect-[2/3] relative rounded-lg overflow-hidden bg-muted group-hover:scale-105 transition-transform duration-200">
                  {item.image && item.image !== "/placeholder.svg" ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <div className="text-center p-2">
                        <div className="text-2xl mb-2">🎬</div>
                        <p className="text-xs text-muted-foreground line-clamp-3">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Overlay with rating */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="flex items-center justify-between text-white text-xs">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{item.rating.toFixed(1)}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {item.type === "tv" ? "TV" : "Movie"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.year).getFullYear()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {similarContent.length >= 12 && (
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Showing {similarContent.length} similar{" "}
              {currentContent.type === "tv" ? "shows" : "movies"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
