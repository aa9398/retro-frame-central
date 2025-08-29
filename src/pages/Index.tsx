import { Layout } from "@/components/Layout";
import { MovieCard } from "@/components/MovieCard";
import { mockMovies } from "@/data/movies";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");

  // Get all unique genres
  const allGenres = Array.from(
    new Set(mockMovies.flatMap(movie => movie.genre))
  ).sort();

  // Filter movies based on search and genre
  const filteredMovies = mockMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "all" || movie.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

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
      {/* Hero Section */}
      <section className="text-center py-12 mb-12 bg-gradient-retro rounded-sm border-2 border-pixel-border">
        <h1 className="font-pixel text-2xl md:text-4xl text-primary mb-4 tracking-wider">
          WELCOME TO CINEHUB
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
          Your retro-minimal hub for discovering, tracking, and purchasing movies and series.
          Clean design meets nostalgic aesthetics.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="pixel" size="lg">
            BROWSE CATALOG
          </Button>
          <Button variant="outline" size="lg">
            TOP 100 MOVIES
          </Button>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search movies and series..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-2 border-pixel-border"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-background border-2 border-pixel-border rounded-sm px-3 py-2 text-sm"
            >
              <option value="all">All Genres</option>
              {allGenres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Movie Grid */}
      <section>
        <h2 className="font-pixel text-xl text-primary mb-6 tracking-wider">
          CATALOG ({filteredMovies.length})
        </h2>
        
        {filteredMovies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No movies found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onAddToWatchlist={handleAddToWatchlist}
                onPurchase={handlePurchase}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Index;
