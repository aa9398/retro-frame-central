import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Movie } from '@/types/movie';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Layout } from '@/components/Layout';

export default function Watchlist() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      fetchWatchlist();
    }
  }, [user, loading, navigate]);

  const fetchWatchlist = async () => {
    try {
      const { data, error } = await supabase
        .from('watchlist')
        .select(`
          movie_id,
          movies (*)
        `)
        .eq('user_id', user?.id);

      if (error) throw error;

      const movies = data?.map(item => item.movies).filter(Boolean) as any[];
      setWatchlistMovies(movies);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      toast.error('Failed to load watchlist');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWatchlist = async (movieId: string) => {
    try {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('user_id', user?.id)
        .eq('movie_id', movieId);

      if (error) throw error;

      setWatchlistMovies(prev => prev.filter(movie => movie.id !== movieId));
      toast.success('Removed from watchlist');
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      toast.error('Failed to remove from watchlist');
    }
  };

  if (loading || isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>
        
        {watchlistMovies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Your watchlist is empty</p>
            <Link to="/catalog">
              <Button>Browse Movies</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {watchlistMovies.map((movie) => (
              <Card key={movie.id} className="group overflow-hidden bg-card border-border">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={(movie as any).poster_url || '/placeholder.svg'}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Link to={`/movie/${movie.id}`}>
                      <Button size="sm" variant="secondary">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeFromWatchlist(movie.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-foreground">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {movie.release_year} • {movie.genre}
                  </p>
                  <p className="text-sm text-primary font-medium">
                    ${(movie as any).price}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}