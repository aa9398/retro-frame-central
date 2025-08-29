export interface Movie {
  id: string;
  title: string;
  description: string;
  release_year: number;
  genre: string[];
  poster: string;
  trailer_url: string;
  available_on: string[];
  price_usd: number;
  imdb_rating: number;
  cast: string[];
  duration: number; // in minutes
  director: string;
  type: 'movie' | 'series';
}

export interface UserWatchlist {
  id: string;
  user_id: string;
  movie_id: string;
  added_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  movie_id: string;
  price_paid: number;
  purchased_at: string;
  stripe_session_id?: string;
}