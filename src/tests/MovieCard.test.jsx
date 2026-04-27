import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from './testUtils';
import MovieCard from '../components/MovieCard';

const mockMovie = {
  imdbID: 'tt1234567',
  Title: 'Test Movie',
  Year: '2024',
  Poster: 'https://example.com/poster.jpg',
};

describe('MovieCard', () => {
  it('renders the movie title', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });

  it('renders the release year', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('renders the poster image', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);
    const img = screen.getByAltText('Test Movie poster');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/poster.jpg');
  });

  it('renders a fallback poster when Poster is N/A', () => {
    const movieNoPoser = { ...mockMovie, Poster: 'N/A' };
    renderWithProviders(<MovieCard movie={movieNoPoser} />);
    const img = screen.getByAltText('Test Movie poster');
    expect(img.getAttribute('src')).toContain('placeholder');
  });

  it('has a link to the movie detail page', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);
    const links = screen.getAllByRole('link');
    const detailLink = links.find((l) => l.getAttribute('href') === '/movie/tt1234567');
    expect(detailLink).toBeTruthy();
  });

  it('renders the favorite toggle button', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);
    expect(
      screen.getByRole('button', { name: /add to favorites/i })
    ).toBeInTheDocument();
  });

  it('toggles favorite state when button is clicked', () => {
    const { store } = renderWithProviders(<MovieCard movie={mockMovie} />);
    const btn = screen.getByRole('button', { name: /add to favorites/i });
    fireEvent.click(btn);
    const state = store.getState();
    expect(state.favorites.movies).toHaveLength(1);
    expect(state.favorites.movies[0].imdbID).toBe('tt1234567');
  });
});
