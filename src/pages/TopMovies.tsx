import { Layout } from "@/components/Layout";
import { MovieCard } from "@/components/MovieCard";
import { getTopMovies } from "@/data/movies";
import { Trophy } from "lucide-react";

export default function TopMovies() {
  const topMovies = getTopMovies(100);

  const handleAddToWatchlist = (movieId: string) => {
    // TODO: Add to watchlist logic (requires Supabase)
    console.log("Add to watchlist:", movieId);
  };

  const handlePurchase = (movieId: string) => {
    // TODO: Stripe purchase logic (requires Supabase)
    console.log("Purchase movie:", movieId);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="text-center py-8 mb-12 bg-gradient-retro rounded-sm border-2 border-pixel-border">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="w-8 h-8 text-rating-gold" />
          <h1 className="font-pixel text-2xl md:text-3xl text-primary tracking-wider">
            TOP 100 MOVIES
          </h1>
          <Trophy className="w-8 h-8 text-rating-gold" />
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The highest-rated movies, ranked by IMDb score. Discover cinematic masterpieces 
          in our retro-styled collection.
        </p>
      </section>

      {/* Movies Grid */}
      <section>
        <div className="mb-6">
          <h2 className="font-pixel text-xl text-primary tracking-wider">
            RANKED BY RATING ({topMovies.length} MOVIES)
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {topMovies.map((movie, index) => (
            <div key={movie.id} className="relative">
              {/* Rank Badge */}
              <div className="absolute -top-2 -left-2 z-10 bg-rating-gold text-background font-pixel text-xs w-8 h-8 flex items-center justify-center border border-rating-gold/30">
                #{index + 1}
              </div>
              <MovieCard
                movie={movie}
                onAddToWatchlist={handleAddToWatchlist}
                onPurchase={handlePurchase}
              />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}