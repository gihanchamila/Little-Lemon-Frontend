import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import BookingPage from './BookingPage';
import '@testing-library/jest-dom';

// Mocking the fetchAvailableTimes function properly
vi.mock('./fetchAPI', () => ({
  fetchAPI: vi.fn().mockResolvedValue(['18:00', '19:00', '20:00']),
}));

describe('BookingPage', () => {
  const mockFetchAPI = vi.fn();

  beforeEach(() => {
    render(<BookingPage />);
  });

  it('renders the booking form with available times', async () => {
    // Wait for the times to be available and check that the times are in the document
    await waitFor(() => expect(mockFetchAPI).toHaveBeenCalledTimes(1));  // Ensures the fetch was called
    expect(screen.getByText('18:00')).toBeInTheDocument();
    expect(screen.getByText('19:00')).toBeInTheDocument();
    expect(screen.getByText('20:00')).toBeInTheDocument();
  });

  it('calls fetchAvailableTimes on mount', async () => {
    // Ensures that fetchAvailableTimes was called
    await waitFor(() => expect(mockFetchAPI).toHaveBeenCalledTimes(1)); 
  });
});
