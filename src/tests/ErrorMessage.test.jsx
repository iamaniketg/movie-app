import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from './testUtils';
import ErrorMessage from '../components/ErrorMessage';

describe('ErrorMessage', () => {
  it('renders the default error message', () => {
    renderWithProviders(<ErrorMessage />);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('renders a custom error message', () => {
    renderWithProviders(<ErrorMessage message="Network error" />);
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('renders the error title', () => {
    renderWithProviders(<ErrorMessage />);
    expect(screen.getByText('Oops!')).toBeInTheDocument();
  });

  it('renders a retry button when onRetry is provided', () => {
    const onRetry = vi.fn();
    renderWithProviders(<ErrorMessage onRetry={onRetry} />);
    const btn = screen.getByRole('button', { name: /try again/i });
    expect(btn).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', () => {
    const onRetry = vi.fn();
    renderWithProviders(<ErrorMessage onRetry={onRetry} />);
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('does not render a retry button when onRetry is not provided', () => {
    renderWithProviders(<ErrorMessage />);
    expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();
  });
});
