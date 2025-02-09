import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import BookingForm from './BookingForm';
import { submitAPI, fetchAPI } from '../../api/api';

// Mock the imported API functions
vi.mock('../../api/api', () => ({
  submitAPI: vi.fn(),
  fetchAPI: vi.fn()
}));

describe('BookingForm', () => {
  const mockDispatch = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the form with inputs', () => {
    render(
      <Router>
        <BookingForm availableTimes={['18:00', '19:00']} dispatch={mockDispatch} />
      </Router>
    );
    
    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Make Your Reservation/i })).toBeInTheDocument();
  });

  test('shows validation errors when the form is submitted without filling required fields', async () => {
    render(
      <Router>
        <BookingForm availableTimes={['18:00', '19:00']} dispatch={mockDispatch} />
      </Router>
    );
    
    fireEvent.click(screen.getByRole('button', { name: /Make Your Reservation/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Date is required')).toBeInTheDocument();
      expect(screen.getByText('Time is required')).toBeInTheDocument();
      expect(screen.getByText('Guests must be between 1 and 10')).toBeInTheDocument();
      expect(screen.getByText('Please select an occasion')).toBeInTheDocument();
    });
  });

  test('submits the form successfully when all fields are valid', async () => {
    render(
      <Router>
        <BookingForm availableTimes={['18:00', '19:00']} dispatch={mockDispatch} />
      </Router>
    );
    
    fireEvent.change(screen.getByLabelText(/Choose date/i), { target: { value: '2025-02-09' } });
    fireEvent.change(screen.getByLabelText(/Choose time/i), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText(/Number of guests/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/Occasion/i), { target: { value: 'Birthday' } });
    
    submitAPI.mockReturnValue(true);  // Mock successful API submission
    
    fireEvent.click(screen.getByRole('button', { name: /Make Your Reservation/i }));

    await waitFor(() => {
      expect(submitAPI).toHaveBeenCalledWith({
        date: '2025-02-09',
        time: '18:00',
        guests: '2',
        occasion: 'Birthday'
      });
    });
  });

  test('shows the updated available times when a date is selected', async () => {
    fetchAPI.mockReturnValue(['18:00', '19:00']);  // Mock available times from API
    render(
      <Router>
        <BookingForm availableTimes={[]} dispatch={mockDispatch} />
      </Router>
    );
    
    fireEvent.change(screen.getByLabelText(/Choose date/i), { target: { value: '2025-02-09' } });
    
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'UPDATE_TIMES',
        payload: ['18:00', '19:00']
      });
    });
  });

  test('displays error messages for invalid guests input', async () => {
    render(
      <Router>
        <BookingForm availableTimes={['18:00', '19:00']} dispatch={mockDispatch} />
      </Router>
    );
    
    fireEvent.change(screen.getByLabelText(/Number of guests/i), { target: { value: '0' } });
    fireEvent.click(screen.getByRole('button', { name: /Make Your Reservation/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Guests must be between 1 and 10')).toBeInTheDocument();
    });
  });
});
