// import React from "react";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie"; 

import MovieGrid from "../MovieGrid/MovieGrid";
import {Loader} from "../Loader/Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MovieModal } from "../MovieModal/MovieModal"; 


function App() {
  //* State for Modal
 const [isModalOpen, setIsModalOpen] = useState(false);

  //* State for Selected Movie
 const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);  

 //* Open Close Modal 
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //* State for Error, Movies, Query and Loading
   const [error, setError] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]); 
  const [query, setQuery] = useState("");
 const [loading, setLoading] = useState<boolean>(false); 
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

//* Select Movie Function
const selectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    openModal();
  };

//* Handle Search Function
  const handleSearch = async (query: string) => {

//  setSearchQuery(query);
    setSearchPerformed(true);
setError('');
  setLoading(true);
    try {
      
    const movies = await fetchMovies(query);  
      
    setMovies(movies);                       
  } catch (error) {
    console.error("Error fetching movies:", error);
  toast.error('Error fetching movies');  
  console.log('Error set:', 'Error fetching movies');
    
  }finally {
    setLoading(false);
  }

    setQuery(query);
    console.log("Search query submitted:", query);
    
  };
  
  return (
    <>
    <ToastContainer position="top-center" autoClose={5000} />
      <SearchBar onSubmit={handleSearch} />
   <h3>Search Results for: "{query}"</h3>
   {loading ? (
        <Loader /> 
      ) : error ? (
        <ErrorMessage /> 
      ) : (
        <MovieGrid movies={movies} onSelect={selectMovie} searchPerformed={searchPerformed} />  
      )}
     {selectedMovie && isModalOpen && (
  <MovieModal movie={selectedMovie} onClose={closeModal} />
)}


    </>
  
  );
}

export default App;
