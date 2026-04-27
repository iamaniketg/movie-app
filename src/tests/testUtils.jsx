import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import favoritesReducer from '../store/favoritesSlice';
import searchReducer from '../store/searchSlice';
import movieDetailReducer from '../store/movieDetailSlice';
import featuredReducer from '../store/featuredSlice';
import theme from '../theme/theme';

/**
 * Creates a fresh Redux store with all reducers.
 * Useful for unit-testing slices directly.
 */
export function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
      search: searchReducer,
      movieDetail: movieDetailReducer,
      featured: featuredReducer,
    },
    preloadedState,
  });
}

/**
 * Custom render function that wraps component in all required providers.
 * Accepts optional preloadedState to set up Redux store state.
 */
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    route = '/',
    ...renderOptions
  } = {}
) {
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
