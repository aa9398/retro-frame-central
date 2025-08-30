import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Calendar, Trophy, Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Layout } from '@/components/Layout';

interface Stats {
  watchlistCount: number;
  purchasesCount: number;
  totalSpent: number;
}

export default function Profile() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    watchlistCount: 0,
    purchasesCount: 0,
    totalSpent: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      fetchStats();
    }
  }, [user, loading, navigate]);

  const fetchStats = async () => {
    try {
      // Fetch watchlist count
      const { count: watchlistCount } = await supabase
        .from('watchlist')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id);

      // Fetch purchases count and total spent
      const { data: purchases } = await supabase
        .from('purchased_movies')
        .select('amount_paid')
        .eq('user_id', user?.id);

      const purchasesCount = purchases?.length || 0;
      const totalSpent = purchases?.reduce((sum, purchase) => sum + (purchase.amount_paid || 0), 0) || 0;

      setStats({
        watchlistCount: watchlistCount || 0,
        purchasesCount,
        totalSpent
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Info */}
            <Card className="lg:col-span-2 bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Member Since</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    variant="destructive" 
                    onClick={handleSignOut}
                    className="w-full sm:w-auto"
                  >
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Your Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-primary" />
                      <span className="text-sm">Watchlist</span>
                    </div>
                    <span className="font-semibold">{stats.watchlistCount}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4 text-primary" />
                      <span className="text-sm">Purchases</span>
                    </div>
                    <span className="font-semibold">{stats.purchasesCount}</span>
                  </div>
                  
                  <div className="border-t pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Spent</span>
                      <span className="font-semibold text-primary">
                        ${stats.totalSpent.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/watchlist')}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    View Watchlist
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/purchases')}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    View Purchases
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/catalog')}
                  >
                    Browse Catalog
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}