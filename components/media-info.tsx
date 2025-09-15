import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MovieInfoProps {
  content: {
    type: "movie" | "tv";
    plot: string;
    status?: string;
    technicalSpecs: {
      language: string;
      country: string;
      budget?: string;
      boxOffice?: string;
      network?: string;
      aspectRatio: string;
      sound: string;
    };
  };
}

export function MovieInfo({ content }: MovieInfoProps) {
  return (
    <div className="space-y-6">
      {/* Plot */}
      <Card>
        <CardHeader>
          <CardTitle>Plot</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {content.plot || "Plot information not available."}
          </p>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
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
                  {content.technicalSpecs.language}
                </p>
              </div>
              <div>
                <span className="font-medium text-sm">Country:</span>
                <p className="text-muted-foreground">
                  {content.technicalSpecs.country}
                </p>
              </div>
              {content.type === "movie" && content.technicalSpecs.budget && (
                <div>
                  <span className="font-medium text-sm">Budget:</span>
                  <p className="text-muted-foreground">
                    {content.technicalSpecs.budget}
                  </p>
                </div>
              )}
              {content.type === "tv" && content.technicalSpecs.network && (
                <div>
                  <span className="font-medium text-sm">Network:</span>
                  <p className="text-muted-foreground">
                    {content.technicalSpecs.network}
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-3">
              {content.type === "movie" && content.technicalSpecs.boxOffice && (
                <div>
                  <span className="font-medium text-sm">Box Office:</span>
                  <p className="text-muted-foreground">
                    {content.technicalSpecs.boxOffice}
                  </p>
                </div>
              )}
              <div>
                <span className="font-medium text-sm">Aspect Ratio:</span>
                <p className="text-muted-foreground">
                  {content.technicalSpecs.aspectRatio}
                </p>
              </div>
              <div>
                <span className="font-medium text-sm">Sound:</span>
                <p className="text-muted-foreground">
                  {content.technicalSpecs.sound}
                </p>
              </div>
              {content.type === "tv" && content.status && (
                <div>
                  <span className="font-medium text-sm">Status:</span>
                  <Badge
                    variant="outline"
                    className={`ml-2 ${
                      content.status.toLowerCase() === "ended"
                        ? "border-red-200 text-red-700 bg-red-50"
                        : content.status.toLowerCase() === "returning series"
                        ? "border-green-200 text-green-700 bg-green-50"
                        : "border-blue-200 text-blue-700 bg-blue-50"
                    }`}
                  >
                    {content.status}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
