import { describe, it, expect } from 'vitest';
import movieDetailReducer, {
  fetchMovieDetail,
  clearMovieDetail,
  selectMovieDetail,
  selectMovieDetailLoading,
  selectMovieDetailError,
} from '../store/movieDetailSlice';

const initialState = {
  movie: null,
  loading: false,
  error: null,
};

const mockMovie = {
  imdbID: 'tt1375666',
  Title: 'Inception',
  Year: '2010',
  Genre: 'Action, Adventure, Sci-Fi',
  imdbRating: '8.8',
  Plot: 'A thief who steals corporate secrets...',
};

describe('movieDetailSlice', () => {
  describe('reducer', () => {
    it('returns the initial state', () => {
      const state = movieDetailReducer(undefined, { type: 'unknown' });
      expect(state).toEqual(initialState);
    });

    it('clearMovieDetail resets state', () => {
      const prevState = { movie: mockMovie, loading: false, error: null };
      const state = movieDetailReducer(prevState, clearMovieDetail());
      expect(state).toEqual(initialState);
    });

    it('sets loading on fetchMovieDetail.pending', () => {
      const action = { type: fetchMovieDetail.pending.type };
      const state = movieDetailReducer(
        { movie: mockMovie, loading: false, error: 'old' },
        action
      );
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.movie).toBeNull();
    });

    it('stores movie on fetchMovieDetail.fulfilled', () => {
      const action = {
        type: fetchMovieDetail.fulfilled.type,
        payload: mockMovie,
      };
      const state = movieDetailReducer(
        { ...initialState, loading: true },
        action
      );
      expect(state.loading).toBe(false);
      expect(state.movie).toEqual(mockMovie);
      expect(state.error).toBeNull();
    });

    it('stores error on fetchMovieDetail.rejected', () => {
      const action = {
        type: fetchMovieDetail.rejected.type,
        payload: 'Movie not found',
      };
      const state = movieDetailReducer(
        { ...initialState, loading: true },
        action
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Movie not found');
      expect(state.movie).toBeNull();
    });

    it('clears previous movie on pending', () => {
      const prevState = { movie: mockMovie, loading: false, error: null };
      const action = { type: fetchMovieDetail.pending.type };
      const state = movieDetailReducer(prevState, action);
      expect(state.movie).toBeNull();
    });
  });

  describe('selectors', () => {
    const rootState = {
      movieDetail: { movie: mockMovie, loading: false, error: null },
    };

    it('selectMovieDetail returns the movie', () => {
      expect(selectMovieDetail(rootState)).toEqual(mockMovie);
    });

    it('selectMovieDetailLoading returns loading flag', () => {
      expect(selectMovieDetailLoading(rootState)).toBe(false);
    });

    it('selectMovieDetailError returns error', () => {
      expect(selectMovieDetailError(rootState)).toBeNull();
    });

    it('returns null movie when state is initial', () => {
      const emptyState = { movieDetail: initialState };
      expect(selectMovieDetail(emptyState)).toBeNull();
    });
  });
});
