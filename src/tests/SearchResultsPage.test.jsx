import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from './testUtils';
import SearchResultsPage from '../pages/SearchResultsPage';

// Mock the API service so useEffect dispatches don't make real calls
vi.mock('../services/omdbApi', () => ({
  searchMovies: vi.fn().mockResolvedValue({ movies: [], totalResults: 0 }),
  getMovieDetails: vi.fn(),
  getFeaturedMovies: vi.fn().mockResolvedValue([]),
}));

import { searchMovies } from '../services/omdbApi';

describe('SearchResultsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows empty state when no query is provided', () => {
    renderWithProviders(<SearchResultsPage />, { route: '/search' });
    expect(screen.getByText('Start searching')).toBeInTheDocument();
  });

  it('shows the search prompt subtitle when no query', () => {
    renderWithProviders(<SearchResultsPage />, { route: '/search' });
    expect(
      screen.getByText(/enter a movie title in the search bar/i)
    ).toBeInTheDocument();
  });

  it('shows loading state initially when query is present', () => {
    searchMovies.mockReturnValue(new Promise(() => {})); // never resolves
    renderWithProviders(<SearchResultsPage />, {
      route: '/search?q=batman',
    });
    expect(screen.getByText('Searching movies…')).toBeInTheDocument();
  });

  it('shows results heading with query after data loads', async () => {
    searchMovies.mockResolvedValue({
      movies: [{ imdbID: 'tt001', Title: 'Batman Begins', Year: '2005', Poster: 'N/A' }],
      totalResults: 1,
    });
    renderWithProviders(<SearchResultsPage />, {
      route: '/search?q=batman',
    });
    await waitFor(() => {
      expect(screen.getByText(/Results for "batman"/)).toBeInTheDocument();
    });
  });

  it('shows result count chip after data loads', async () => {
    searchMovies.mockResolvedValue({
      movies: [{ imdbID: 'tt001', Title: 'Batman', Year: '2005', Poster: 'N/A' }],
      totalResults: 42,
    });
    renderWithProviders(<SearchResultsPage />, {
      route: '/search?q=batman',
    });
    await waitFor(() => {
      expect(screen.getByText('42 found')).toBeInTheDocument();
    });
  });

  it('renders movie cards from API results', async () => {
    searchMovies.mockResolvedValue({
      movies: [
        { imdbID: 'tt001', Title: 'Batman Begins', Year: '2005', Poster: 'N/A' },
        { imdbID: 'tt002', Title: 'The Dark Knight', Year: '2008', Poster: 'N/A' },
      ],
      totalResults: 2,
    });
    renderWithProviders(<SearchResultsPage />, {
      route: '/search?q=batman',
    });
    await waitFor(() => {
      expect(screen.getByText('Batman Begins')).toBeInTheDocument();
      expect(screen.getByText('The Dark Knight')).toBeInTheDocument();
    });
  });

  it('shows empty state when search returns no results', async () => {
    searchMovies.mockResolvedValue({ movies: [], totalResults: 0 });
    renderWithProviders(<SearchResultsPage />, {
      route: '/search?q=xyznonexistent',
    });
    await waitFor(() => {
      expect(
        screen.getByText(/no movies found/i)
      ).toBeInTheDocument();
    });
  });

  it('shows error message when API call fails', async () => {
    searchMovies.mockRejectedValue(new Error('Network error'));
    renderWithProviders(<SearchResultsPage />, {
      route: '/search?q=batman',
    });
    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  it('shows retry button on error', async () => {
    searchMovies.mockRejectedValue(new Error('API failed'));
    renderWithProviders(<SearchResultsPage />, {
      route: '/search?q=batman',
    });
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });
  });

  it('calls searchMovies API with correct query', () => {
    searchMovies.mockResolvedValue({ movies: [], totalResults: 0 });
    renderWithProviders(<SearchResultsPage />, {
      route: '/search?q=inception',
    });
    expect(searchMovies).toHaveBeenCalledWith('inception', 1);
  });

  it('calls searchMovies API with page parameter', () => {
    searchMovies.mockResolvedValue({ movies: [], totalResults: 0 });
    renderWithProviders(<SearchResultsPage />, {
      route: '/search?q=inception&page=3',
    });
    expect(searchMovies).toHaveBeenCalledWith('inception', 3);
  });
});
