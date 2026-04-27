import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './testUtils';
import FavoritesPage from '../pages/FavoritesPage';

describe('FavoritesPage', () => {
  it('renders the page title', () => {
    renderWithProviders(<FavoritesPage />);
    expect(screen.getByText(/my favorites/i)).toBeInTheDocument();
  });

  it('shows empty state when no favorites exist', () => {
    renderWithProviders(<FavoritesPage />);
    expect(screen.getByText('No favorites yet')).toBeInTheDocument();
  });

  it('renders favorite movies when they exist', () => {
    const preloadedState = {
      favorites: {
        movies: [
          { imdbID: 'tt0001', Title: 'Fav Movie', Year: '2023', Poster: 'N/A' },
        ],
      },
    };
    renderWithProviders(<FavoritesPage />, { preloadedState });
    expect(screen.getByText('Fav Movie')).toBeInTheDocument();
  });

  it('renders clear all button when favorites exist', () => {
    const preloadedState = {
      favorites: {
        movies: [
          { imdbID: 'tt0001', Title: 'Fav Movie', Year: '2023', Poster: 'N/A' },
        ],
      },
    };
    renderWithProviders(<FavoritesPage />, { preloadedState });
    expect(screen.getByRole('button', { name: /clear all/i })).toBeInTheDocument();
  });
});
