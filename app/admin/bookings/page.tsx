'use client';

import { useCallback, useEffect, useState } from 'react';
import '@/styles/admin-bookings.css';

interface Booking {
    id: string;
    full_name: string;
    email: string;
    company?: string;
    phone?: string;
    service_type: string;
    preferred_date?: string;
    notes?: string;
    status: string;
    created_at: string;
}

const statusOptions = ['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const;

type BookingStatus = (typeof statusOptions)[number];

export default function AdminBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<BookingStatus>('all');

    const fetchBookings = useCallback(async () => {
        try {
            setLoading(true);
            const url = new URL('/api/admin/bookings', window.location.origin);
            if (filter !== 'all') {
                url.searchParams.set('status', filter);
            }

            const response = await fetch(url.toString());
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch bookings');
            }

            setBookings(result.bookings || []);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        const loadBookings = async () => {
            await fetchBookings();
        };

        loadBookings();
    }, [fetchBookings]);

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            const response = await fetch(`/api/admin/bookings?id=${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || 'Failed to update status');
            }

            fetchBookings();
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update booking status.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this booking?')) return;
        try {
            const response = await fetch(`/api/admin/bookings?id=${id}`, {
                method: 'DELETE',
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || 'Failed to delete booking');
            }

            fetchBookings();
        } catch (err) {
            console.error('Error deleting booking:', err);
            alert('Failed to delete booking.');
        }
    };

    const handleExportCSV = () => {
        if (bookings.length === 0) {
            alert('No bookings to export');
            return;
        }

        const headers = ['Name', 'Email', 'Company', 'Phone', 'Service', 'Preferred Date', 'Notes', 'Status', 'Created At'];
        const rows = bookings.map((booking) => [
            booking.full_name,
            booking.email,
            booking.company || '',
            booking.phone || '',
            booking.service_type,
            booking.preferred_date ? new Date(booking.preferred_date).toLocaleString() : '',
            `"${(booking.notes || '').replace(/"/g, '""')}"`,
            booking.status,
            new Date(booking.created_at).toLocaleString(),
        ]);

        const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <div className="adminBookings">
            <div className="adminBookingsHeader">
                <div>
                    <h1>Bookings</h1>
                    <p>Track all scheduled calls and manage booking status from the admin panel.</p>
                </div>
                <button onClick={handleExportCSV} className="adminExportButton">
                    📥 Export CSV
                </button>
            </div>

            <div className="adminFilterButtons">
                {statusOptions.map((option) => (
                    <button
                        key={option}
                        className={`adminFilterButton ${filter === option ? 'active' : ''}`}
                        onClick={() => setFilter(option)}
                    >
                        {option === 'all' ? 'All Bookings' : option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="adminLoading">Loading bookings...</div>
            ) : bookings.length === 0 ? (
                <div className="adminEmpty">No bookings found.</div>
            ) : (
                <div className="adminBookingsGrid">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="adminBookingCard">
                            <div className="adminBookingMeta">
                                <div>
                                    <p className="adminBookingLabel">Name</p>
                                    <h2>{booking.full_name}</h2>
                                </div>
                                <span className={`adminBookingStatus status-${booking.status}`}>
                                    {booking.status}
                                </span>
                            </div>

                            <div className="adminBookingDetails">
                                <p><strong>Email:</strong> {booking.email}</p>
                                {booking.company && <p><strong>Company:</strong> {booking.company}</p>}
                                {booking.phone && <p><strong>Phone:</strong> {booking.phone}</p>}
                                <p><strong>Service:</strong> {booking.service_type}</p>
                                <p><strong>Preferred:</strong> {booking.preferred_date ? new Date(booking.preferred_date).toLocaleString() : 'Not specified'}</p>
                                {booking.notes && <p><strong>Notes:</strong> {booking.notes}</p>}
                            </div>

                            <div className="adminBookingActions">
                                {['pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => handleUpdateStatus(booking.id, status)}
                                        className={`adminStatusButton ${booking.status === status ? 'active' : ''}`}
                                    >
                                        {status === booking.status ? `✓ ${status}` : status}
                                    </button>
                                ))}
                                <button onClick={() => handleDelete(booking.id)} className="adminActionButton delete">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
