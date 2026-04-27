import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import searchReducer from './searchSlice';
import movieDetailReducer from './movieDetailSlice';
import featuredReducer from './featuredSlice';

// Load persisted favorites from localStorage
const loadFavorites = () => {
  try {
    const data = localStorage.getItem('movieSearchFavorites');
    if (data) return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load favorites:', err);
  }
  return { movies: [] };
};

// Save favorites to localStorage on every change
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith('favorites/')) {
    const { favorites } = store.getState();
    try {
      localStorage.setItem('movieSearchFavorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to save favorites:', err);
    }
  }
  return result;
};

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    search: searchReducer,
    movieDetail: movieDetailReducer,
    featured: featuredReducer,
  },
  preloadedState: {
    favorites: loadFavorites(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
