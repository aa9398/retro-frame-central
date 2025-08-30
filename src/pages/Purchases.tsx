import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Movie } from '@/types/movie';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Layout } from '@/components/Layout';

interface Purchase {
  id: string;
  movie_id: string;
  amount_paid: number;
  purchased_at: string;
  movies: Movie;
}

export default function Purchases() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      fetchPurchases();
    }
  }, [user, loading, navigate]);

  const fetchPurchases = async () => {
    try {
      const { data, error } = await supabase
        .from('purchased_movies')
        .select(`
          id,
          movie_id,
          amount_paid,
          purchased_at,
          movies (*)
        `)
        .eq('user_id', user?.id)
        .order('purchased_at', { ascending: false });

      if (error) throw error;

      setPurchases(data as any || []);
    } catch (error) {
      console.error('Error fetching purchases:', error);
      toast.error('Failed to load purchases');
    } finally {
      setIsLoading(false);
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
        <h1 className="text-3xl font-bold mb-8">My Purchases</h1>
        
        {purchases.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">You haven't purchased any movies yet</p>
            <Link to="/catalog">
              <Button>Browse Movies</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {purchases.map((purchase) => (
              <Card key={purchase.id} className="group overflow-hidden bg-card border-border">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={(purchase.movies as any).poster_url || '/placeholder.svg'}
                    alt={purchase.movies.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Link to={`/movie/${purchase.movies.id}`}>
                      <Button size="sm" variant="secondary">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button size="sm" variant="default">
                      <Download className="h-4 w-4 mr-1" />
                      Watch
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-foreground">{purchase.movies.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {purchase.movies.release_year} • {purchase.movies.genre}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-primary font-medium">
                      Paid: ${purchase.amount_paid}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(purchase.purchased_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}