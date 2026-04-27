import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from './testUtils';
import Navbar from '../components/Navbar';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

describe('Navbar', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the MovieSearch logo text', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('MovieSearch')).toBeInTheDocument();
  });

  it('renders the search input in the navbar', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByPlaceholderText('Search movies…')).toBeInTheDocument();
  });

  it('renders the favorites link', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole('link', { name: /favorites/i })).toBeInTheDocument();
  });

  it('favorites link points to /favorites', () => {
    renderWithProviders(<Navbar />);
    const link = screen.getByRole('link', { name: /favorites/i });
    expect(link).toHaveAttribute('href', '/favorites');
  });

  it('allows typing in the navbar search', () => {
    renderWithProviders(<Navbar />);
    const input = screen.getByPlaceholderText('Search movies…');
    fireEvent.change(input, { target: { value: 'Avengers' } });
    expect(input).toHaveValue('Avengers');
  });

  it('navigates to search on form submit', () => {
    renderWithProviders(<Navbar />);
    const input = screen.getByPlaceholderText('Search movies…');
    fireEvent.change(input, { target: { value: 'Matrix' } });
    const form = input.closest('form');
    fireEvent.submit(form);
    expect(mockNavigate).toHaveBeenCalledWith('/search?q=Matrix');
  });

  it('clears input after successful search', () => {
    renderWithProviders(<Navbar />);
    const input = screen.getByPlaceholderText('Search movies…');
    fireEvent.change(input, { target: { value: 'Matrix' } });
    fireEvent.submit(input.closest('form'));
    expect(input).toHaveValue('');
  });

  it('does not navigate on empty search', () => {
    renderWithProviders(<Navbar />);
    const input = screen.getByPlaceholderText('Search movies…');
    fireEvent.submit(input.closest('form'));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('does not navigate on whitespace-only search', () => {
    renderWithProviders(<Navbar />);
    const input = screen.getByPlaceholderText('Search movies…');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(input.closest('form'));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('shows favorites badge count', () => {
    const preloadedState = {
      favorites: {
        movies: [
          { imdbID: 'tt001', Title: 'M1', Year: '2020', Poster: 'N/A' },
          { imdbID: 'tt002', Title: 'M2', Year: '2021', Poster: 'N/A' },
        ],
      },
    };
    renderWithProviders(<Navbar />, { preloadedState });
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('has a logo link to the home page', () => {
    renderWithProviders(<Navbar />);
    const logoLink = screen.getByText('MovieSearch').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });
});
