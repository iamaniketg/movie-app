import axios from 'axios';
import { OMDB_BASE_URL } from '../utils/constants';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const omdbClient = axios.create({
  baseURL: OMDB_BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

/**
 * Search movies by title
 * @param {string} query - Search query string
 * @param {number} page - Page number (1-100)
 * @returns {Promise<{movies: Array, totalResults: number}>}
 */
export const searchMovies = async (query, page = 1) => {
  const response = await omdbClient.get('/', {
    params: { s: query, page, type: 'movie' },
  });

  if (response.data.Response === 'False') {
    return { movies: [], totalResults: 0 };
  }

  return {
    movies: response.data.Search || [],
    totalResults: parseInt(response.data.totalResults, 10) || 0,
  };
};

/**
 * Get detailed movie info by IMDb ID
 * @param {string} imdbId - IMDb ID (e.g., 'tt3896198')
 * @returns {Promise<object>}
 */
export const getMovieDetails = async (imdbId) => {
  const response = await omdbClient.get('/', {
    params: { i: imdbId, plot: 'full' },
  });

  if (response.data.Response === 'False') {
    throw new Error(response.data.Error || 'Movie not found');
  }

  return response.data;
};

/**
 * Fetch featured movies for the home page using curated searches
 * @param {string} query - The category search query
 * @returns {Promise<Array>}
 */
export const getFeaturedMovies = async (query) => {
  const response = await omdbClient.get('/', {
    params: { s: query, type: 'movie' },
  });

  if (response.data.Response === 'False') {
    return [];
  }

  return response.data.Search || [];
};
