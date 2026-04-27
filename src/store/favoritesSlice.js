import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    movies: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const index = state.movies.findIndex((m) => m.imdbID === movie.imdbID);
      if (index >= 0) {
        state.movies.splice(index, 1);
      } else {
        state.movies.push(movie);
      }
    },
    removeFavorite: (state, action) => {
      const imdbID = action.payload;
      state.movies = state.movies.filter((m) => m.imdbID !== imdbID);
    },
    clearFavorites: (state) => {
      state.movies = [];
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites.movies;
export const selectIsFavorite = (imdbID) => (state) =>
  state.favorites.movies.some((m) => m.imdbID === imdbID);

export default favoritesSlice.reducer;
