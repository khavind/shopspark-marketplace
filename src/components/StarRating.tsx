import { Star, StarHalf } from "lucide-react";

const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount?: number }) => {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.25 && rating - full < 0.75;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex text-amazon-star">
        {Array.from({ length: full }).map((_, i) => (
          <Star key={`f${i}`} size={16} fill="currentColor" strokeWidth={0} />
        ))}
        {hasHalf && <StarHalf size={16} fill="currentColor" strokeWidth={0} />}
        {Array.from({ length: empty }).map((_, i) => (
          <Star key={`e${i}`} size={16} className="text-border" strokeWidth={1} />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-amazon-link text-sm ml-1">{reviewCount.toLocaleString()}</span>
      )}
    </div>
  );
};

export default StarRating;
