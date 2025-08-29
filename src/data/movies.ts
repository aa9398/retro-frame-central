import { Movie } from "@/types/movie";

// Import movie posters
import bladeRunnerPoster from "@/assets/blade-runner-2049-poster.jpg";
import matrixPoster from "@/assets/matrix-poster.jpg";
import strangerThingsPoster from "@/assets/stranger-things-poster.jpg";
import dunePoster from "@/assets/dune-poster.jpg";
import breakingBadPoster from "@/assets/breaking-bad-poster.jpg";
import pulpFictionPoster from "@/assets/pulp-fiction-poster.jpg";

export const mockMovies: Movie[] = [
  {
    id: "1",
    title: "Blade Runner 2049",
    description: "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.",
    release_year: 2017,
    genre: ["Sci-Fi", "Thriller", "Drama"],
    poster: bladeRunnerPoster,
    trailer_url: "https://www.youtube.com/embed/gCcx85zbxz4",
    available_on: ["Netflix", "Prime Video"],
    price_usd: 14.99,
    imdb_rating: 8.0,
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
    duration: 164,
    director: "Denis Villeneuve",
    type: "movie"
  },
  {
    id: "2",
    title: "The Matrix",
    description: "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
    release_year: 1999,
    genre: ["Sci-Fi", "Action"],
    poster: matrixPoster,
    trailer_url: "https://www.youtube.com/embed/vKQi3bBA1y8",
    available_on: ["HBO Max", "Prime Video"],
    price_usd: 12.99,
    imdb_rating: 8.7,
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    duration: 136,
    director: "The Wachowskis",
    type: "movie"
  },
  {
    id: "3",
    title: "Stranger Things",
    description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    release_year: 2016,
    genre: ["Drama", "Fantasy", "Horror"],
    poster: strangerThingsPoster,
    trailer_url: "https://www.youtube.com/embed/b9EkMc79ZSU",
    available_on: ["Netflix"],
    price_usd: 19.99,
    imdb_rating: 8.7,
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
    duration: 50,
    director: "The Duffer Brothers",
    type: "series"
  },
  {
    id: "4",
    title: "Dune",
    description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
    release_year: 2021,
    genre: ["Sci-Fi", "Adventure", "Drama"],
    poster: dunePoster,
    trailer_url: "https://www.youtube.com/embed/n9xhJrPXop4",
    available_on: ["HBO Max", "Apple TV"],
    price_usd: 16.99,
    imdb_rating: 8.0,
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac"],
    duration: 155,
    director: "Denis Villeneuve",
    type: "movie"
  },
  {
    id: "5",
    title: "Breaking Bad",
    description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family's future.",
    release_year: 2008,
    genre: ["Crime", "Drama", "Thriller"],
    poster: breakingBadPoster,
    trailer_url: "https://www.youtube.com/embed/HhesaQXLuRY",
    available_on: ["Netflix", "Prime Video"],
    price_usd: 24.99,
    imdb_rating: 9.5,
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
    duration: 47,
    director: "Vince Gilligan",
    type: "series"
  },
  {
    id: "6",
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    release_year: 1994,
    genre: ["Crime", "Drama"],
    poster: pulpFictionPoster,
    trailer_url: "https://www.youtube.com/embed/s7EdQ4FqbhY",
    available_on: ["Prime Video", "Apple TV"],
    price_usd: 9.99,
    imdb_rating: 8.9,
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    duration: 154,
    director: "Quentin Tarantino",
    type: "movie"
  }
];

export const getTopMovies = (limit: number = 100): Movie[] => {
  return mockMovies
    .filter(movie => movie.type === 'movie')
    .sort((a, b) => b.imdb_rating - a.imdb_rating)
    .slice(0, limit);
};

export const getTopSeries = (limit: number = 100): Movie[] => {
  return mockMovies
    .filter(movie => movie.type === 'series')
    .sort((a, b) => b.imdb_rating - a.imdb_rating)
    .slice(0, limit);
};