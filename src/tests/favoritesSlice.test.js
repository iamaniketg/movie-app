import { describe, it, expect } from 'vitest';
import favoritesReducer, {
  toggleFavorite,
  removeFavorite,
  clearFavorites,
  selectFavorites,
  selectIsFavorite,
} from '../store/favoritesSlice';

const mockMovie1 = { imdbID: 'tt0001', Title: 'Movie One', Year: '2020', Poster: 'N/A' };
const mockMovie2 = { imdbID: 'tt0002', Title: 'Movie Two', Year: '2021', Poster: 'N/A' };

describe('favoritesSlice', () => {
  describe('reducer', () => {
    it('returns the initial state', () => {
      const state = favoritesReducer(undefined, { type: 'unknown' });
      expect(state).toEqual({ movies: [] });
    });

    it('toggleFavorite adds a movie when not in favorites', () => {
      const state = favoritesReducer({ movies: [] }, toggleFavorite(mockMovie1));
      expect(state.movies).toHaveLength(1);
      expect(state.movies[0].imdbID).toBe('tt0001');
    });

    it('toggleFavorite removes a movie when already in favorites', () => {
      const state = favoritesReducer(
        { movies: [mockMovie1] },
        toggleFavorite(mockMovie1)
      );
      expect(state.movies).toHaveLength(0);
    });

    it('toggleFavorite handles multiple movies correctly', () => {
      let state = favoritesReducer({ movies: [] }, toggleFavorite(mockMovie1));
      state = favoritesReducer(state, toggleFavorite(mockMovie2));
      expect(state.movies).toHaveLength(2);

      state = favoritesReducer(state, toggleFavorite(mockMovie1));
      expect(state.movies).toHaveLength(1);
      expect(state.movies[0].imdbID).toBe('tt0002');
    });

    it('removeFavorite removes a movie by imdbID', () => {
      const state = favoritesReducer(
        { movies: [mockMovie1, mockMovie2] },
        removeFavorite('tt0001')
      );
      expect(state.movies).toHaveLength(1);
      expect(state.movies[0].imdbID).toBe('tt0002');
    });

    it('removeFavorite does nothing if movie not found', () => {
      const state = favoritesReducer(
        { movies: [mockMovie1] },
        removeFavorite('tt9999')
      );
      expect(state.movies).toHaveLength(1);
    });

    it('clearFavorites removes all movies', () => {
      const state = favoritesReducer(
        { movies: [mockMovie1, mockMovie2] },
        clearFavorites()
      );
      expect(state.movies).toHaveLength(0);
    });

    it('clearFavorites works on empty array', () => {
      const state = favoritesReducer({ movies: [] }, clearFavorites());
      expect(state.movies).toHaveLength(0);
    });
  });

  describe('selectors', () => {
    const rootState = { favorites: { movies: [mockMovie1, mockMovie2] } };

    it('selectFavorites returns the favorites list', () => {
      expect(selectFavorites(rootState)).toEqual([mockMovie1, mockMovie2]);
    });

    it('selectIsFavorite returns true for a favorited movie', () => {
      expect(selectIsFavorite('tt0001')(rootState)).toBe(true);
    });

    it('selectIsFavorite returns false for a non-favorited movie', () => {
      expect(selectIsFavorite('tt9999')(rootState)).toBe(false);
    });
  });
});
