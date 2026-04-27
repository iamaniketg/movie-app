import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from './testUtils';
import SearchBar from '../components/SearchBar';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

describe('SearchBar', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the search input', () => {
    renderWithProviders(<SearchBar />);
    expect(screen.getByRole('textbox', { name: /search movies/i })).toBeInTheDocument();
  });

  it('renders the search button', () => {
    renderWithProviders(<SearchBar />);
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('allows the user to type in the search input', () => {
    renderWithProviders(<SearchBar />);
    const input = screen.getByRole('textbox', { name: /search movies/i });
    fireEvent.change(input, { target: { value: 'Batman' } });
    expect(input).toHaveValue('Batman');
  });

  it('navigates to search results on form submit', () => {
    renderWithProviders(<SearchBar />);
    const input = screen.getByRole('textbox', { name: /search movies/i });
    fireEvent.change(input, { target: { value: 'Inception' } });
    fireEvent.submit(input.closest('form'));
    expect(mockNavigate).toHaveBeenCalledWith('/search?q=Inception');
  });

  it('does not navigate if input is empty', () => {
    renderWithProviders(<SearchBar />);
    const input = screen.getByRole('textbox', { name: /search movies/i });
    fireEvent.submit(input.closest('form'));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('renders with an initial query value', () => {
    renderWithProviders(<SearchBar initialQuery="Marvel" />);
    const input = screen.getByRole('textbox', { name: /search movies/i });
    expect(input).toHaveValue('Marvel');
  });
});
