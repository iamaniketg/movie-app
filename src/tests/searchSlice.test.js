import { describe, it, expect } from 'vitest';
import searchReducer, {
  fetchSearchResults,
  clearSearch,
  selectSearchMovies,
  selectSearchLoading,
  selectSearchError,
  selectSearchTotalResults,
  selectSearchQuery,
  selectSearchPage,
} from '../store/searchSlice';

const initialState = {
  query: '',
  page: 1,
  movies: [],
  totalResults: 0,
  loading: false,
  error: null,
};

describe('searchSlice', () => {
  describe('reducer', () => {
    it('returns the initial state', () => {
      const state = searchReducer(undefined, { type: 'unknown' });
      expect(state).toEqual(initialState);
    });

    it('clearSearch resets all state', () => {
      const dirtyState = {
        query: 'batman',
        page: 3,
        movies: [{ imdbID: 'tt001' }],
        totalResults: 50,
        loading: false,
        error: null,
      };
      const state = searchReducer(dirtyState, clearSearch());
      expect(state).toEqual(initialState);
    });

    it('sets loading to true on fetchSearchResults.pending', () => {
      const action = { type: fetchSearchResults.pending.type };
      const state = searchReducer({ ...initialState, error: 'old error' }, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('stores results on fetchSearchResults.fulfilled', () => {
      const action = {
        type: fetchSearchResults.fulfilled.type,
        payload: {
          movies: [{ imdbID: 'tt001', Title: 'Batman' }],
          totalResults: 42,
          query: 'batman',
          page: 1,
        },
      };
      const state = searchReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.movies).toHaveLength(1);
      expect(state.movies[0].Title).toBe('Batman');
      expect(state.totalResults).toBe(42);
      expect(state.query).toBe('batman');
      expect(state.page).toBe(1);
    });

    it('stores error on fetchSearchResults.rejected', () => {
      const action = {
        type: fetchSearchResults.rejected.type,
        payload: 'Network error',
      };
      const state = searchReducer(
        { ...initialState, movies: [{ imdbID: 'tt001' }] },
        action
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Network error');
      expect(state.movies).toEqual([]);
    });

    it('clears movies on rejected even if they existed before', () => {
      const prevState = {
        ...initialState,
        movies: [{ imdbID: 'tt001' }, { imdbID: 'tt002' }],
        totalResults: 20,
      };
      const action = {
        type: fetchSearchResults.rejected.type,
        payload: 'API error',
      };
      const state = searchReducer(prevState, action);
      expect(state.movies).toEqual([]);
    });
  });

  describe('selectors', () => {
    const rootState = {
      search: {
        query: 'inception',
        page: 2,
        movies: [{ imdbID: 'tt001' }],
        totalResults: 38,
        loading: true,
        error: null,
      },
    };

    it('selectSearchMovies returns movies array', () => {
      expect(selectSearchMovies(rootState)).toEqual([{ imdbID: 'tt001' }]);
    });

    it('selectSearchLoading returns loading flag', () => {
      expect(selectSearchLoading(rootState)).toBe(true);
    });

    it('selectSearchError returns error', () => {
      expect(selectSearchError(rootState)).toBeNull();
    });

    it('selectSearchTotalResults returns total', () => {
      expect(selectSearchTotalResults(rootState)).toBe(38);
    });

    it('selectSearchQuery returns query string', () => {
      expect(selectSearchQuery(rootState)).toBe('inception');
    });

    it('selectSearchPage returns page number', () => {
      expect(selectSearchPage(rootState)).toBe(2);
    });
  });
});
