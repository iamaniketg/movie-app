import { describe, it, expect } from 'vitest';
import featuredReducer, {
  fetchFeaturedMovies,
  selectFeaturedCategories,
  selectFeaturedLoading,
  selectFeaturedError,
} from '../store/featuredSlice';

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const mockCategories = [
  {
    title: '🦸 Superhero',
    query: 'superhero',
    movies: [{ imdbID: 'tt001', Title: 'Superhero Movie' }],
  },
  {
    title: '🦇 Batman',
    query: 'batman',
    movies: [{ imdbID: 'tt002', Title: 'Batman Begins' }],
  },
];

describe('featuredSlice', () => {
  describe('reducer', () => {
    it('returns the initial state', () => {
      const state = featuredReducer(undefined, { type: 'unknown' });
      expect(state).toEqual(initialState);
    });

    it('sets loading on fetchFeaturedMovies.pending', () => {
      const action = { type: fetchFeaturedMovies.pending.type };
      const state = featuredReducer({ ...initialState, error: 'old' }, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('stores categories on fetchFeaturedMovies.fulfilled', () => {
      const action = {
        type: fetchFeaturedMovies.fulfilled.type,
        payload: mockCategories,
      };
      const state = featuredReducer({ ...initialState, loading: true }, action);
      expect(state.loading).toBe(false);
      expect(state.categories).toHaveLength(2);
      expect(state.categories[0].title).toBe('🦸 Superhero');
    });

    it('stores error on fetchFeaturedMovies.rejected', () => {
      const action = {
        type: fetchFeaturedMovies.rejected.type,
        payload: 'API failure',
      };
      const state = featuredReducer({ ...initialState, loading: true }, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('API failure');
    });

    it('preserves existing categories when new fetch starts', () => {
      const prevState = { categories: mockCategories, loading: false, error: null };
      const action = { type: fetchFeaturedMovies.pending.type };
      const state = featuredReducer(prevState, action);
      // Categories stay until fulfilled replaces them
      expect(state.categories).toHaveLength(2);
      expect(state.loading).toBe(true);
    });
  });

  describe('selectors', () => {
    const rootState = {
      featured: { categories: mockCategories, loading: false, error: null },
    };

    it('selectFeaturedCategories returns categories', () => {
      expect(selectFeaturedCategories(rootState)).toEqual(mockCategories);
    });

    it('selectFeaturedLoading returns loading flag', () => {
      expect(selectFeaturedLoading(rootState)).toBe(false);
    });

    it('selectFeaturedError returns error', () => {
      expect(selectFeaturedError(rootState)).toBeNull();
    });
  });
});
