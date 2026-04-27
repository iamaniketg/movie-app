import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeaturedMovies } from '../services/omdbApi';
import { FEATURED_CATEGORIES } from '../utils/constants';

/**
 * Async thunk — fetches all featured movie categories in parallel.
 */
export const fetchFeaturedMovies = createAsyncThunk(
  'featured/fetchFeaturedMovies',
  async (_, { rejectWithValue }) => {
    try {
      const results = await Promise.all(
        FEATURED_CATEGORIES.map(async (cat) => {
          const movies = await getFeaturedMovies(cat.query);
          return { ...cat, movies };
        })
      );
      return results.filter((c) => c.movies.length > 0);
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load featured movies.');
    }
  }
);

const featuredSlice = createSlice({
  name: 'featured',
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchFeaturedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong.';
      });
  },
});

// Selectors
export const selectFeaturedCategories = (state) => state.featured.categories;
export const selectFeaturedLoading = (state) => state.featured.loading;
export const selectFeaturedError = (state) => state.featured.error;

export default featuredSlice.reducer;
