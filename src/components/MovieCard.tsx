import { Movie } from "@/types/movie";
import { Button } from "@/components/ui/button";
import { RatingBadge } from "@/components/RatingBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Play, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
  showAddToWatchlist?: boolean;
  onAddToWatchlist?: (movieId: string) => void;
  onPurchase?: (movieId: string) => void;
}

export function MovieCard({ 
  movie, 
  showAddToWatchlist = true, 
  onAddToWatchlist,
  onPurchase 
}: MovieCardProps) {
  return (
    <Card className="group relative overflow-hidden border-2 border-pixel-border hover:border-primary transition-all duration-300 bg-gradient-card shadow-card-retro">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="pixel" size="pixel" asChild>
            <Link to={`/movie/${movie.id}`}>
              <Play className="w-3 h-3 mr-1" />
              VIEW
            </Link>
          </Button>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2">
          <RatingBadge rating={movie.imdb_rating} />
        </div>

        {/* Type Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-primary text-primary-foreground font-pixel text-xs px-2 py-1 uppercase tracking-wider">
            {movie.type}
          </span>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <Link 
            to={`/movie/${movie.id}`}
            className="font-semibold text-sm hover:text-primary transition-colors line-clamp-2"
          >
            {movie.title}
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <span>{movie.release_year}</span>
            <span>•</span>
            <span>{movie.genre.slice(0, 2).join(", ")}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-primary">
            ${movie.price_usd}
          </div>
          <div className="flex items-center gap-1">
            {showAddToWatchlist && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onAddToWatchlist?.(movie.id)}
                className="h-8 w-8"
              >
                <Heart className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="purchase"
              size="sm"
              onClick={() => onPurchase?.(movie.id)}
              className="text-xs"
            >
              <ShoppingCart className="w-3 h-3 mr-1" />
              BUY
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}