import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import { Loader } from "../Loader/Loader";
import { MovieModal } from "../MovieModal/MovieModal";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const selectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null); 
  };

  
  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setMovies([]); 
    setLoading(true);

    try {
      const result = await fetchMovies(searchQuery);

      if (result.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(result);
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast.error("Error fetching movies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSearch} />

      {query && <h3>Search Results for: "{query}"</h3>}

      {loading ? (
        <Loader />
      ) : (
        <MovieGrid movies={movies} onSelect={selectMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </>
  );
}
