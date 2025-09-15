"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Star,
  ThumbsUp,
  MessageCircle,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { TMDBReview } from "@/types/tmdb";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReviewsSectionProps {
  contentId: number;
  reviews: TMDBReview[];
  contentType: "movie" | "tv";
}

export function ReviewsSection({
  reviews,
  contentId,
  contentType,
}: ReviewsSectionProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(
    new Set()
  );

  const userHasReviewed = false;

  const handleSubmitReview = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!userRating || !newReview.trim()) return;

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("userRating", userRating);

    setShowReviewForm(false);
    setNewReview("");
    setUserRating(0);
    setIsSubmitting(false);
  };

  const handleWriteReview = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setShowReviewForm(!showReviewForm);
  };

  const toggleExpandReview = (reviewId: string) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  // Format review content
  const formatReviewContent = (
    content: string,
    reviewId: string,
    maxLength: number = 300
  ) => {
    const isExpanded = expandedReviews.has(reviewId);
    if (content.length <= maxLength) return content;

    if (isExpanded) {
      return content;
    }

    return content.substring(0, maxLength) + "...";
  };

  // Calculate review statistics
  const reviewStats = {
    totalReviews: reviews.length,
    averageRating:
      reviews.length > 0
        ? reviews
            .filter((review) => review.author_details.rating !== null)
            .reduce(
              (sum, review) => sum + (review.author_details.rating || 0),
              0
            ) /
          reviews.filter((review) => review.author_details.rating !== null)
            .length
        : 0,
    ratedReviews: reviews.filter(
      (review) => review.author_details.rating !== null
    ).length,
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Reviews ({reviewStats.totalReviews})
          {reviewStats.ratedReviews > 0 && (
            <span className="text-sm font-normal text-muted-foreground ml-2">
              • Avg {reviewStats.averageRating.toFixed(1)}/10
            </span>
          )}
        </CardTitle>
        {!userHasReviewed && (
          <Button variant="outline" size="sm" onClick={handleWriteReview}>
            <MessageCircle className="w-4 h-4 mr-2" />
            Write Review
          </Button>
        )}
        {userHasReviewed && (
          <Badge variant="secondary" className="text-xs">
            You've reviewed this
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Review Form */}
        {showReviewForm && (
          <div className="p-4 border rounded-lg space-y-4 bg-muted/20">
            <div>
              <label className="text-sm font-medium mb-3 block">
                Your Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        star <= (hoveredRating || userRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground hover:text-yellow-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {userRating > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Rating: {userRating}/10{" "}
                  {userRating >= 8
                    ? "🎉"
                    : userRating >= 6
                    ? "👍"
                    : userRating >= 4
                    ? "👌"
                    : "👎"}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Your Review
              </label>
              <Textarea
                placeholder={`Share your thoughts about this ${
                  contentType === "movie" ? "movie" : "TV show"
                }... What did you like? What could be better?`}
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {newReview.length}/500 characters
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleSubmitReview}
                disabled={
                  !userRating ||
                  !newReview.trim() ||
                  isSubmitting ||
                  newReview.length > 500
                }
                className="min-w-[120px]"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowReviewForm(false);
                  setNewReview("");
                  setUserRating(0);
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to share your thoughts about this{" "}
                {contentType === "movie" ? "movie" : "TV show"}!
              </p>
              {!user && (
                <Button onClick={() => router.push("/login")}>
                  Sign in to write a review
                </Button>
              )}
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 border rounded-lg space-y-3 hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium flex-shrink-0">
                      {(review.author_details.name ||
                        review.author)[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-sm">
                          {review.author_details.name || review.author}
                        </p>
                        {/* {(review as any).isUserReview && (
                          <Badge variant="outline" className="text-xs">
                            You
                          </Badge>
                        )} */}
                        {review.author_details.rating && (
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 text-xs"
                          >
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {review.author_details.rating}/10
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                  {review.url && (
                    <Button size="sm" variant="ghost" asChild>
                      <a
                        href={review.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>

                <div className="pl-13">
                  <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                    {formatReviewContent(review.content, review.id)}
                  </p>

                  {review.content.length > 300 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpandReview(review.id)}
                      className="mt-2 h-auto p-0 text-primary hover:text-primary/80"
                    >
                      {expandedReviews.has(review.id)
                        ? "Show less"
                        : "Read more"}
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground pl-13">
                  <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                    Helpful
                  </button>
                  {(review as any).isUserReview && (
                    <>
                      <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                        <Edit className="w-3 h-3" />
                        Edit
                      </button>
                      <button className="flex items-center gap-1 hover:text-destructive transition-colors">
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Review Stats */}
        {reviews.length > 0 && (
          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {reviewStats.averageRating > 0
                    ? reviewStats.averageRating.toFixed(1)
                    : "N/A"}
                </p>
                <p className="text-xs text-muted-foreground">Average Rating</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {
                    reviews.filter((r) => (r.author_details.rating || 0) >= 7)
                      .length
                  }
                </p>
                <p className="text-xs text-muted-foreground">
                  Positive Reviews
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {
                    reviews.filter((r) => {
                      const rating = r.author_details.rating || 0;
                      return rating >= 5 && rating < 7;
                    }).length
                  }
                </p>
                <p className="text-xs text-muted-foreground">Mixed Reviews</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {
                    reviews.filter((r) => (r.author_details.rating || 0) < 5)
                      .length
                  }
                </p>
                <p className="text-xs text-muted-foreground">
                  Negative Reviews
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
