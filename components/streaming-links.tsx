import Image from "next/image";
import { ExternalLink, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StreamingLinksProps {
  links: Array<{
    platform: string;
    url: string;
    price: string;
    logo: string;
  }>;
}

export function StreamingLinks({ links }: StreamingLinksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Watch Now</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {links.length === 0 ? (
          <div className="text-center py-8">
            <Tv className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No streaming options available
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Check back later or search other platforms
            </p>
          </div>
        ) : (
          links.map((link, index) => (
            <div
              key={`${link.platform}-${index}`}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 relative bg-muted rounded overflow-hidden">
                  {link.logo && link.logo !== "/placeholder.svg" ? (
                    <Image
                      src={link.logo}
                      alt={link.platform}
                      fill
                      className="object-contain p-1"
                      sizes="48px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <Tv className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{link.platform}</p>
                  <p className="text-xs text-muted-foreground">
                    {link.price === "Included" ? "Subscription" : link.price}
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline" asChild>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  {link.price === "Included" ? "Watch" : "Rent"}
                </a>
              </Button>
            </div>
          ))
        )}

        {links.length > 0 && (
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Streaming availability may vary by region
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
