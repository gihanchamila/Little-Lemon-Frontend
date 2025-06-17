import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { errorResponse } from '../../utils/errorResponse';



// --- NEW HELPER FUNCTION ---
// Checks if a booking is more than 2 hours in the future.
const isBookingChangeable = (bookingDateTime) => {
    if (!bookingDateTime) return false;
    const now = new Date();
    const bookingTime = new Date(bookingDateTime);
    const hoursUntilBooking = (bookingTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntilBooking > 2;
};


const MyBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();

    const fetchBookings = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get("/api/bookings/");
            setBookings(response.data.results);
        } catch (err) {
            errorResponse(err);
            setError("We couldn't load your bookings. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleUpdate = (bookingId) => {
        navigate(`/update-booking/${bookingId}`);
    };

    const handleDelete = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel and delete this booking?")) {
            return;
        }
        setDeletingId(bookingId);
        try {
            await axiosInstance.delete(`/api/bookings/${bookingId}/`);
            setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
        } catch (err) {
            errorResponse(err);
            alert("Failed to delete the booking. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    const statusStyles = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        CONFIRMED: 'bg-green-100 text-green-800',
        CANCELLED: 'bg-red-100 text-red-800',
        COMPLETED: 'bg-blue-100 text-blue-800',
    };

    const paymentStatusStyles = {
        UNPAID: 'bg-gray-200 text-gray-800',
        PAID: 'bg-green-100 text-green-800',
        REFUNDED: 'bg-blue-100 text-blue-800',
    };

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return 'N/A';
        return new Date(dateTimeString).toLocaleString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true,
        });
    };

    if (isLoading) { /* ... loading state ... */ }
    if (error) { /* ... error state ... */ }

    return (
        <main className="font-karla">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {bookings.length === 0 ? (
                    <div className="text-center py-20"><p className="text-xl text-gray-500">You have no bookings yet.</p></div>
                ) : (
                    <figure className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <figcaption className="p-5 bg-white text-lg font-medium text-secondary-4 border-b border-gray-200 sm:px-6">
                            Your Recent Reservations
                        </figcaption>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    {/* Table headers */}
                                    <tr>
                                        <th scope="col" className="tableRow">Occasion</th>
                                        <th scope="col" className="tableRow">Date & Time</th>
                                        <th scope="col" className="tableRow">Guests</th>
                                        <th scope="col" className="tableRow">Status</th>
                                        <th scope="col" className="tableRow">Payment</th>
                                        <th scope="col" className="tableRow">Total Price</th>
                                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bookings.map((booking) => {
                                        const isBeingDeleted = deletingId === booking.id;
                                        // --- NEW LOGIC INTEGRATION ---
                                        const canBeChanged = isBookingChangeable(booking.booking_datetime);

                                        // Combine all conditions for disabling the buttons
                                        const isActionDisabled = !canBeChanged || booking.status === 'CANCELLED' || isBeingDeleted;
                                        
                                        // Create a tooltip message to explain why buttons are disabled
                                        const tooltipMessage = !canBeChanged
                                            ? "Cannot change a booking within 2 hours of the reservation time."
                                            : "";

                                        return (
                                            <tr key={booking.id} className={booking.status === 'CANCELLED' ? 'bg-gray-50  text-gray-500 ' : ''}>
                                                {/* Table data cells */}
                                                <td className="px-6 py-4 whitespace-nowrap"><div className={`text-sm font-medium ${booking.status === 'CANCELLED' ? 'line-through' : 'text-gray-900'}`}>{booking.occasion?.name || 'General'}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm">{formatDateTime(booking.booking_datetime)}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center"><div className="text-sm">{booking.number_of_guests}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap"><span className={`py-1 px-3 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${statusStyles[booking.status] || 'bg-gray-100 text-gray-800'}`}>{booking.status?.toLowerCase() || 'Unknown'}</span></td>
                                                <td className="px-6 py-4 whitespace-nowrap"><span className={`py-1 px-3 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${paymentStatusStyles[booking.payment_status] || 'bg-gray-100 text-gray-800'}`}>{booking.payment_status?.toLowerCase() || 'Unknown'}</span></td>
                                                <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${booking.status === 'CANCELLED' ? 'line-through' : ''}`}>${typeof booking.total_price === 'string' || typeof booking.total_price === 'number' ? parseFloat(booking.total_price).toFixed(2) : '0.00'}</td>
                                                
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex justify-end items-center space-x-4" title={tooltipMessage}>
                                                        <button
                                                            onClick={() => handleUpdate(booking.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:text-gray-400 disabled:cursor-not-allowed"
                                                            disabled={isActionDisabled}
                                                        >
                                                            Update
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(booking.id)}
                                                            className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:text-gray-400 disabled:cursor-not-allowed"
                                                            disabled={isActionDisabled}
                                                        >
                                                            {isBeingDeleted ? 'Deleting...' : 'Delete'}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </figure>
                )}
            </div>
        </main>
    );
};

export default MyBooking;