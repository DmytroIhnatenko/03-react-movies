import axios from "axios";

import type { Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


interface MovieResponse {
  results: Movie[];
  total_results: number;
}

const BASE_URL = `https://api.themoviedb.org/3/search/movie?`;



export default async function fetchMovies(query: string, page = 1): Promise<Movie[]> {
   try {
    
    const { data } = await axios.get<MovieResponse>(BASE_URL, {
      params: {
        api_key: API_KEY,   
        query: query,       
        page: page,        
        include_adult: false,
        language: 'en-US',
      },
       headers: {
        Authorization: `Bearer ${API_KEY}`  
      }
    });
    return data.results;  
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; 
  }


}

