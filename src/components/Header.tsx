import { Button } from "@/components/ui/button";
import { Film, User, Heart, ShoppingBag, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b-2 border-pixel-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <Film className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="font-pixel text-lg text-primary tracking-wider">
            CINEHUB
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/catalog" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Catalog
          </Link>
          <Link 
            to="/top-movies" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Top Movies
          </Link>
          <Link 
            to="/top-series" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Top Series
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/watchlist">
                  <Heart className="w-4 h-4" />
                  <span className="sr-only">Watchlist</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/purchases">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="sr-only">Purchases</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-4 h-4" />
                <span className="sr-only">Profile</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={signOut}
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="sr-only">Logout</span>
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link to="/auth">
                <User className="w-4 h-4 mr-2" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}