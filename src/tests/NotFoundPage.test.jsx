import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './testUtils';
import NotFoundPage from '../pages/NotFoundPage';

describe('NotFoundPage', () => {
  it('renders 404 text', () => {
    renderWithProviders(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders the page not found message', () => {
    renderWithProviders(<NotFoundPage />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('renders a link back to home', () => {
    renderWithProviders(<NotFoundPage />);
    const homeLink = screen.getByRole('link', { name: /go home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
