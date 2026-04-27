import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './testUtils';
import EmptyState from '../components/EmptyState';

describe('EmptyState', () => {
  it('renders the default title', () => {
    renderWithProviders(<EmptyState />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('renders a custom title', () => {
    renderWithProviders(<EmptyState title="Nothing here" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('renders a subtitle when provided', () => {
    renderWithProviders(<EmptyState subtitle="Try a different search term." />);
    expect(screen.getByText('Try a different search term.')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    renderWithProviders(<EmptyState />);
    // Only title should exist, no extra text
    expect(screen.queryByText('Try a different search term.')).not.toBeInTheDocument();
  });
});
