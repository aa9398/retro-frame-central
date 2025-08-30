import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import MovieDetail from "./pages/MovieDetail";
import TopMovies from "./pages/TopMovies";
import TopSeries from "./pages/TopSeries";
import Auth from "./pages/Auth";
import Watchlist from "./pages/Watchlist";
import Purchases from "./pages/Purchases";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catalog" element={<Index />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/top-movies" element={<TopMovies />} />
            <Route path="/top-series" element={<TopSeries />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
