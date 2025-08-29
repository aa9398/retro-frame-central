import { Star } from "lucide-react";

interface RatingBadgeProps {
  rating: number;
  className?: string;
}

export function RatingBadge({ rating, className = "" }: RatingBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-1 bg-rating-gold text-background font-pixel text-xs px-2 py-1 border border-rating-gold/30 ${className}`}>
      <Star className="w-3 h-3 fill-current" />
      <span>{rating.toFixed(1)}</span>
    </div>
  );
}