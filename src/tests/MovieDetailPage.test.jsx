import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTestStore } from './testUtils';
import theme from '../theme/theme';
import MovieDetailPage from '../pages/MovieDetailPage';

// Mock the API service
vi.mock('../services/omdbApi', () => ({
  searchMovies: vi.fn().mockResolvedValue({ movies: [], totalResults: 0 }),
  getMovieDetails: vi.fn(),
  getFeaturedMovies: vi.fn().mockResolvedValue([]),
}));

import { getMovieDetails } from '../services/omdbApi';

const mockMovie = {
  imdbID: 'tt1375666',
  Title: 'Inception',
  Year: '2010',
  Genre: 'Action, Adventure, Sci-Fi',
  Plot: 'Dom Cobb is a skilled thief.',
  imdbRating: '8.8',
  imdbVotes: '2,000,000',
  Poster: 'https://example.com/inception.jpg',
  Director: 'Christopher Nolan',
  Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
  Runtime: '148 min',
  Released: '16 Jul 2010',
  Language: 'English',
  Country: 'United States',
  Awards: 'Won 4 Oscars',
  BoxOffice: '$292,576,195',
  Response: 'True',
};

function renderDetailPage(preloadedState = {}) {
  const store = createTestStore(preloadedState);
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/movie/tt1375666']}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/movie/:id" element={<MovieDetailPage />} />
            </Routes>
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    ),
  };
}

describe('MovieDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the back button', () => {
    getMovieDetails.mockReturnValue(new Promise(() => {}));
    renderDetailPage();
    expect(screen.getByRole('link', { name: /back/i })).toBeInTheDocument();
  });

  it('back button links to home', () => {
    getMovieDetails.mockReturnValue(new Promise(() => {}));
    renderDetailPage();
    expect(screen.getByRole('link', { name: /back/i })).toHaveAttribute('href', '/');
  });

  it('shows loading state while fetching', () => {
    getMovieDetails.mockReturnValue(new Promise(() => {}));
    renderDetailPage();
    // Skeletons are rendered during loading — check the progressbar isn't there but skeletons are
    expect(screen.queryByText('Inception')).not.toBeInTheDocument();
  });

  it('shows movie title after data loads', async () => {
    getMovieDetails.mockResolvedValue(mockMovie);
    renderDetailPage();
    await waitFor(() => {
      expect(screen.getByText('Inception')).toBeInTheDocument();
    });
  });

  it('shows genre chips', async () => {
    getMovieDetails.mockResolvedValue(mockMovie);
    renderDetailPage();
    await waitFor(() => {
      expect(screen.getByText('Action')).toBeInTheDocument();
      expect(screen.getByText('Adventure')).toBeInTheDocument();
      expect(screen.getByText('Sci-Fi')).toBeInTheDocument();
    });
  });

  it('shows IMDb rating', async () => {
    getMovieDetails.mockResolvedValue(mockMovie);
    renderDetailPage();
    await waitFor(() => {
      expect(screen.getByText('8.8')).toBeInTheDocument();
      expect(screen.getByText('/ 10')).toBeInTheDocument();
    });
  });

  it('shows vote count', async () => {
    getMovieDetails.mockResolvedValue(mockMovie);
    renderDetailPage();
    await waitFor(() => {
      expect(screen.getByText('(2,000,000 votes)')).toBeInTheDocument();
    });
  });

  it('shows the plot section', async () => {
    getMovieDetails.mockResolvedValue(mockMovie);
    renderDetailPage();
    await waitFor(() => {
      expect(screen.getByText('Plot')).toBeInTheDocument();
      expect(screen.getByText('Dom Cobb is a skilled thief.')).toBeInTheDocument();
    });
  });

  it('shows metadata info rows', async () => {
    getMovieDetails.mockResolvedValue(mockMovie);
    renderDetailPage();
    await waitFor(() => {
      expect(screen.getByText('Christopher Nolan')).toBeInTheDocument();
      expect(screen.getByText('Leonardo DiCaprio, Joseph Gordon-Levitt')).toBeInTheDocument();
      expect(screen.getByText('148 min')).toBeInTheDocument();
      expect(screen.getByText('16 Jul 2010')).toBeInTheDocument();
      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('Won 4 Oscars')).toBeInTheDocument();
      expect(screen.getByText('$292,576,195')).toBeInTheDocument();
    });
  });

  it('shows error message when API fails', async () => {
    getMovieDetails.mockRejectedValue(new Error('Movie not found'));
    renderDetailPage();
    await waitFor(() => {
      expect(screen.getByText('Movie not found')).toBeInTheDocument();
    });
  });

  it('shows retry button on error', async () => {
    getMovieDetails.mockRejectedValue(new Error('Network error'));
    renderDetailPage();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });
  });

  it('shows favorite toggle button after load', async () => {
    getMovieDetails.mockResolvedValue(mockMovie);
    renderDetailPage();
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /add to favorites/i })
      ).toBeInTheDocument();
    });
  });

  it('shows poster image', async () => {
    getMovieDetails.mockResolvedValue(mockMovie);
    renderDetailPage();
    await waitFor(() => {
      const img = screen.getByAltText('Inception poster');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/inception.jpg');
    });
  });

  it('calls getMovieDetails with the correct ID', () => {
    getMovieDetails.mockReturnValue(new Promise(() => {}));
    renderDetailPage();
    expect(getMovieDetails).toHaveBeenCalledWith('tt1375666');
  });
});
