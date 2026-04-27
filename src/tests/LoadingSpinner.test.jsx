import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './testUtils';
import LoadingSpinner from '../components/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders the default loading message', () => {
    renderWithProviders(<LoadingSpinner />);
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('renders a custom loading message', () => {
    renderWithProviders(<LoadingSpinner message="Fetching movies…" />);
    expect(screen.getByText('Fetching movies…')).toBeInTheDocument();
  });

  it('renders the progress indicator', () => {
    renderWithProviders(<LoadingSpinner />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
