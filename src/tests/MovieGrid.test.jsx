import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './testUtils';
import MovieGrid from '../components/MovieGrid';

const mockMovies = [
  { imdbID: 'tt001', Title: 'Movie One', Year: '2020', Poster: 'N/A' },
  { imdbID: 'tt002', Title: 'Movie Two', Year: '2021', Poster: 'N/A' },
  { imdbID: 'tt003', Title: 'Movie Three', Year: '2022', Poster: 'N/A' },
];

describe('MovieGrid', () => {
  it('renders all movie cards', () => {
    renderWithProviders(<MovieGrid movies={mockMovies} />);
    expect(screen.getByText('Movie One')).toBeInTheDocument();
    expect(screen.getByText('Movie Two')).toBeInTheDocument();
    expect(screen.getByText('Movie Three')).toBeInTheDocument();
  });

  it('renders the correct number of cards', () => {
    renderWithProviders(<MovieGrid movies={mockMovies} />);
    const cards = screen.getAllByText(/Movie (One|Two|Three)/);
    expect(cards).toHaveLength(3);
  });

  it('renders nothing when movies array is empty', () => {
    const { container } = renderWithProviders(<MovieGrid movies={[]} />);
    // Grid should exist but have no card children
    const cards = container.querySelectorAll('.MuiCard-root');
    expect(cards).toHaveLength(0);
  });

  it('each movie has a link to its detail page', () => {
    renderWithProviders(<MovieGrid movies={mockMovies} />);
    const links = screen.getAllByRole('link');
    const detailLinks = links.filter((l) =>
      l.getAttribute('href')?.startsWith('/movie/')
    );
    expect(detailLinks.length).toBeGreaterThanOrEqual(3);
  });
});
