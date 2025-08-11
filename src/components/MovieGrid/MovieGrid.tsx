import React, { use } from 'react';
import css from './MovieGrid.module.css';
import fetchMovies from '../../services/movieService';
import App from '../App/App';
import type { Movie } from '../../types/movie';
import { useState } from 'react';
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from 'react';

interface MovieGridProps {
   movies: Movie[];   
  onSelect: (movie: Movie) => void;
    searchPerformed: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelect, searchPerformed }) => {
    useEffect(() => {
     
    if (searchPerformed && movies.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [searchPerformed, movies.length]);  



  return (
    
    <ul className={css.grid}>
        <ToastContainer position="top-center" autoClose={3000} />
      {movies.map((movie) => (
        <li key={movie.id} className={css.card} onClick={() => onSelect(movie)}>
          <img 
            className={css.image} 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
            loading="lazy" 
          />
          <h2 className={css.title}>{movie.title}</h2>
        </li>
      ))}
    </ul>
  );

};
export default MovieGrid;
