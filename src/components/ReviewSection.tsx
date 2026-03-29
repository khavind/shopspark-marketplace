import { useState, useEffect } from "react";
import { getProductReviews, addReview } from "@/lib/api";
import StarRating from "./StarRating";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Review {
  id: string;
  product_id: string;
  user_email: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewSectionProps {
  productId: string;
  userEmail?: string;
}

const ReviewSection = ({ productId, userEmail }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await getProductReviews(productId);
      setReviews(data);
    } catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userEmail) {
      toast.error("Please sign in to leave a review");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      setSubmitting(true);
      await addReview(productId, userEmail, rating, comment);
      toast.success("Review added successfully!");
      setComment("");
      setRating(5);
      await loadReviews();
    } catch (error: any) {
      if (error.code === "23505") {
        toast.error("You have already reviewed this product");
      } else {
        toast.error("Error adding review");
      }
      console.error("Error adding review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  return (
    <div className="mt-8 border-t border-border pt-8">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {/* Review Summary */}
      <div className="mb-8 pb-8 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-3xl font-bold">{avgRating}</div>
          <div>
            <div className="flex gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(parseFloat(avgRating as string)) ? "text-amazon-orange" : "text-muted-foreground"}`}
                >
                  ★
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{reviews.length} reviews</p>
          </div>
        </div>
      </div>

      {/* Add Review Form */}
      {userEmail && (
        <form onSubmit={handleSubmitReview} className="mb-8 pb-8 border-b border-border">
          <h3 className="text-lg font-semibold mb-4">Share your feedback</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl transition-colors ${rating >= star ? "text-amazon-orange" : "text-muted-foreground"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Your review</label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product..."
                className="min-h-24"
              />
            </div>
            <Button type="submit" disabled={submitting} className="amazon-btn-primary">
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      )}

      {!userEmail && (
        <div className="mb-8 pb-8 border-b border-border p-4 bg-secondary rounded-lg">
          <p className="text-sm">Sign in to write a review</p>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {loading ? (
          <p className="text-muted-foreground">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="pb-6 border-b border-border last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-sm">{review.user_email.split("@")[0]}</p>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < review.rating ? "text-amazon-orange" : "text-muted-foreground"}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-foreground mt-2">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
