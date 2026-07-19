/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Query hooks mapping for travel bookings (Flights/Trains).
 * - Manages server-state synchronization via React Query invalidations.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

const BOOKINGS_KEY = 'bookings';

export function useBookings(params = {}) {
  return useQuery({
    queryKey: [BOOKINGS_KEY, params],
    queryFn: () => api.get('/bookings', { params }).then((res) => res.data),
  });
}

export function useCreateBooking() {
  return useMutation({
    mutationFn: (data) => api.post('/bookings', data).then((res) => res.data),
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, ticketUrl }) => 
      api.patch(`/bookings/${id}`, { status, ticketUrl }).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BOOKINGS_KEY] }),
  });
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/bookings/${id}`).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BOOKINGS_KEY] }),
  });
}
