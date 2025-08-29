import { Layout } from "@/components/Layout";
import { RatingBadge } from "@/components/RatingBadge";
import { StreamingBadge } from "@/components/StreamingBadge";
import { Button } from "@/components/ui/button";
import { mockMovies } from "@/data/movies";
import { useParams, Link } from "react-router-dom";
import { Heart, Play, ShoppingCart, Clock, Calendar, User, ArrowLeft } from "lucide-react";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const movie = mockMovies.find(m => m.id === id);

  if (!movie) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="font-pixel text-xl text-primary mb-4">MOVIE NOT FOUND</h1>
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Catalog
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToWatchlist = () => {
    // TODO: Add to watchlist logic (requires Supabase)
    console.log("Add to watchlist:", movie.id);
  };

  const handlePurchase = () => {
    // TODO: Stripe purchase logic (requires Supabase)
    console.log("Purchase movie:", movie.id);
  };

  return (
    <Layout>
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Poster */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="aspect-[2/3] overflow-hidden border-2 border-pixel-border shadow-card-retro">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <Button 
                variant="purchase" 
                size="lg" 
                className="w-full"
                onClick={handlePurchase}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy for ${movie.price_usd}
              </Button>
              <Button 
                variant="watchlist" 
                size="lg" 
                className="w-full"
                onClick={handleAddToWatchlist}
              >
                <Heart className="w-4 h-4 mr-2" />
                Add to Watchlist
              </Button>
            </div>
          </div>
        </div>

        {/* Movie Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title and Rating */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div>
                <h1 className="font-pixel text-2xl md:text-3xl text-primary tracking-wider mb-2">
                  {movie.title.toUpperCase()}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {movie.release_year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {movie.duration} min
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {movie.director}
                  </span>
                </div>
              </div>
              <RatingBadge rating={movie.imdb_rating} className="self-start" />
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genre.map((genre) => (
                <span
                  key={genre}
                  className="bg-accent text-accent-foreground px-3 py-1 text-sm font-medium border border-pixel-border"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="font-pixel text-lg text-primary mb-4 tracking-wider">
              OVERVIEW
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {movie.description}
            </p>
          </div>

          {/* Cast */}
          <div>
            <h2 className="font-pixel text-lg text-primary mb-4 tracking-wider">
              CAST
            </h2>
            <div className="flex flex-wrap gap-2">
              {movie.cast.map((actor) => (
                <span
                  key={actor}
                  className="bg-secondary text-secondary-foreground px-3 py-2 text-sm border border-pixel-border"
                >
                  {actor}
                </span>
              ))}
            </div>
          </div>

          {/* Streaming Availability */}
          <div>
            <h2 className="font-pixel text-lg text-primary mb-4 tracking-wider">
              AVAILABLE ON
            </h2>
            <div className="flex flex-wrap gap-2">
              {movie.available_on.map((platform) => (
                <StreamingBadge key={platform} platform={platform} />
              ))}
            </div>
          </div>

          {/* Trailer */}
          <div>
            <h2 className="font-pixel text-lg text-primary mb-4 tracking-wider">
              TRAILER
            </h2>
            <div className="aspect-video border-2 border-pixel-border overflow-hidden shadow-card-retro">
              <iframe
                src={movie.trailer_url}
                title={`${movie.title} Trailer`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}