import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMovieDetails as getMovieDetailsApi } from '../services/omdbApi';

/**
 * Async thunk — fetches full movie details by IMDb ID.
 */
export const fetchMovieDetail = createAsyncThunk(
  'movieDetail/fetchMovieDetail',
  async (imdbId, { rejectWithValue }) => {
    try {
      const data = await getMovieDetailsApi(imdbId);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load movie details.');
    }
  }
);

const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState: {
    movie: null,
    loading: false,
    error: null,
  },
  reducers: {
    /** Reset detail state (e.g. when navigating away) */
    clearMovieDetail: (state) => {
      state.movie = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.movie = null;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong.';
        state.movie = null;
      });
  },
});

export const { clearMovieDetail } = movieDetailSlice.actions;

// Selectors
export const selectMovieDetail = (state) => state.movieDetail.movie;
export const selectMovieDetailLoading = (state) => state.movieDetail.loading;
export const selectMovieDetailError = (state) => state.movieDetail.error;

export default movieDetailSlice.reducer;
