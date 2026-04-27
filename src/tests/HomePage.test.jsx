import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from './testUtils';
import HomePage from '../pages/HomePage';

// Mock the API service
vi.mock('../services/omdbApi', () => ({
  searchMovies: vi.fn().mockResolvedValue({ movies: [], totalResults: 0 }),
  getMovieDetails: vi.fn(),
  getFeaturedMovies: vi.fn().mockResolvedValue([]),
}));

import { getFeaturedMovies } from '../services/omdbApi';

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getFeaturedMovies.mockResolvedValue([]);
  });

  it('renders the hero heading', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText('Discover Your Favorite Films')).toBeInTheDocument();
  });

  it('renders the hero subtitle', () => {
    renderWithProviders(<HomePage />);
    expect(
      screen.getByText(/search thousands of movies/i)
    ).toBeInTheDocument();
  });

  it('renders the search bar', () => {
    renderWithProviders(<HomePage />);
    expect(
      screen.getByRole('textbox', { name: /search movies/i })
    ).toBeInTheDocument();
  });

  it('renders the search button', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('shows category titles when featured data is loaded', () => {
    const preloadedState = {
      featured: {
        categories: [
          {
            title: '🦸 Superhero',
            query: 'superhero',
            movies: [
              { imdbID: 'tt001', Title: 'Superhero Movie', Year: '2008', Poster: 'N/A' },
            ],
          },
          {
            title: '🦇 Batman',
            query: 'batman',
            movies: [
              { imdbID: 'tt002', Title: 'Batman Begins', Year: '2005', Poster: 'N/A' },
            ],
          },
        ],
        loading: false,
        error: null,
      },
    };
    renderWithProviders(<HomePage />, { preloadedState });
    expect(screen.getByText('🦸 Superhero')).toBeInTheDocument();
    expect(screen.getByText('🦇 Batman')).toBeInTheDocument();
  });

  it('shows movie cards from featured categories', () => {
    const preloadedState = {
      featured: {
        categories: [
          {
            title: '🦸 Superhero',
            query: 'superhero',
            movies: [
              { imdbID: 'tt001', Title: 'Superhero Movie', Year: '2008', Poster: 'N/A' },
            ],
          },
        ],
        loading: false,
        error: null,
      },
    };
    renderWithProviders(<HomePage />, { preloadedState });
    expect(screen.getByText('Superhero Movie')).toBeInTheDocument();
  });

  it('shows error message when featured fetch fails', () => {
    const preloadedState = {
      featured: {
        categories: [],
        loading: false,
        error: 'API limit exceeded',
      },
    };
    renderWithProviders(<HomePage />, { preloadedState });
    expect(screen.getByText('API limit exceeded')).toBeInTheDocument();
  });

  it('shows retry button when there is an error', () => {
    const preloadedState = {
      featured: {
        categories: [],
        loading: false,
        error: 'Failed to load',
      },
    };
    renderWithProviders(<HomePage />, { preloadedState });
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('calls getFeaturedMovies on mount when categories are empty', () => {
    renderWithProviders(<HomePage />);
    expect(getFeaturedMovies).toHaveBeenCalled();
  });

  it('does not re-fetch when categories already exist', () => {
    const preloadedState = {
      featured: {
        categories: [
          {
            title: '🦸 Superhero',
            query: 'superhero',
            movies: [{ imdbID: 'tt001', Title: 'Movie', Year: '2020', Poster: 'N/A' }],
          },
        ],
        loading: false,
        error: null,
      },
    };
    renderWithProviders(<HomePage />, { preloadedState });
    expect(getFeaturedMovies).not.toHaveBeenCalled();
  });
});
