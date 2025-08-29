import { Layout } from "@/components/Layout";
import { MovieCard } from "@/components/MovieCard";
import { getTopSeries } from "@/data/movies";
import { Trophy, Tv } from "lucide-react";

export default function TopSeries() {
  const topSeries = getTopSeries(100);

  const handleAddToWatchlist = (movieId: string) => {
    // TODO: Add to watchlist logic (requires Supabase)
    console.log("Add to watchlist:", movieId);
  };

  const handlePurchase = (movieId: string) => {
    // TODO: Stripe purchase logic (requires Supabase)
    console.log("Purchase series:", movieId);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="text-center py-8 mb-12 bg-gradient-retro rounded-sm border-2 border-pixel-border">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Tv className="w-8 h-8 text-retro-blue" />
          <h1 className="font-pixel text-2xl md:text-3xl text-primary tracking-wider">
            TOP 100 SERIES
          </h1>
          <Trophy className="w-8 h-8 text-rating-gold" />
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The most critically acclaimed series, ranked by IMDb score. From epic dramas 
          to mind-bending sci-fi, discover your next binge-watch.
        </p>
      </section>

      {/* Series Grid */}
      <section>
        <div className="mb-6">
          <h2 className="font-pixel text-xl text-primary tracking-wider">
            RANKED BY RATING ({topSeries.length} SERIES)
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {topSeries.map((series, index) => (
            <div key={series.id} className="relative">
              {/* Rank Badge */}
              <div className="absolute -top-2 -left-2 z-10 bg-retro-blue text-background font-pixel text-xs w-8 h-8 flex items-center justify-center border border-retro-blue/30">
                #{index + 1}
              </div>
              <MovieCard
                movie={series}
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