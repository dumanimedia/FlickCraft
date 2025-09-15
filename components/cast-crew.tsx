import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "lucide-react";

interface CastCrewProps {
  cast: Array<{
    name: string;
    character: string;
    image: string;
  }>;
  crew: Array<{
    name: string;
    role: string;
  }>;
}

export function CastCrew({ cast, crew }: CastCrewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cast & Crew</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cast" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cast">Cast ({cast.length})</TabsTrigger>
            <TabsTrigger value="crew">Crew ({crew.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="cast" className="mt-6 overflow-x-auto">
            {cast.length === 0 ? (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No cast information available
                </p>
              </div>
            ) : (
              // className="grid grid-cols-2 md:grid-cols-4 gap-4"
              <div className="flex gap-4 w-max">
                {cast.map((actor, index) => (
                  <div
                    key={`${actor.name}-${index}`}
                    className="group w-1/2 md:w-1/4 shrink-0 relative text-center space-y-2"
                  >
                    <a href="#" className="absolute inset-0 z-1"></a>
                    <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-muted">
                      {actor.image && actor.image !== "/placeholder.svg" ? (
                        <Image
                          src={actor.image}
                          alt={actor.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-all duration-300"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <User className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{actor.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {actor.character || "Character not specified"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="crew" className="mt-6">
            {crew.length === 0 ? (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No crew information available
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {crew.map((member, index) => (
                  <div
                    key={`${member.name}-${index}`}
                    className="flex justify-between items-center py-2 border-b border-border last:border-0"
                  >
                    <span className="font-medium">{member.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
