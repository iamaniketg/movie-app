import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchMovies as searchMoviesApi } from '../services/omdbApi';

/**
 * Async thunk — searches movies via OMDb API.
 * Dispatches pending / fulfilled / rejected lifecycle actions automatically.
 */
export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      const data = await searchMoviesApi(query, page);
      return { ...data, query, page };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to search movies.');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    page: 1,
    movies: [],
    totalResults: 0,
    loading: false,
    error: null,
  },
  reducers: {
    /** Reset search state (e.g. when leaving the page) */
    clearSearch: (state) => {
      state.query = '';
      state.page = 1;
      state.movies = [];
      state.totalResults = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.totalResults = action.payload.totalResults;
        state.query = action.payload.query;
        state.page = action.payload.page;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong.';
        state.movies = [];
      });
  },
});

export const { clearSearch } = searchSlice.actions;

// Selectors
export const selectSearchMovies = (state) => state.search.movies;
export const selectSearchLoading = (state) => state.search.loading;
export const selectSearchError = (state) => state.search.error;
export const selectSearchQuery = (state) => state.search.query;
export const selectSearchPage = (state) => state.search.page;
export const selectSearchTotalResults = (state) => state.search.totalResults;

export default searchSlice.reducer;
