/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

const TESTIMONIALS_KEY = 'testimonials';

export function useTestimonials(params = {}) {
  return useQuery({
    queryKey: [TESTIMONIALS_KEY, params],
    queryFn: () => api.get('/testimonials', { params }).then((res) => res.data),
  });
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/testimonials', data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [TESTIMONIALS_KEY] }),
  });
}

export function useUpdateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/testimonials/${id}`, data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [TESTIMONIALS_KEY] }),
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/testimonials/${id}`).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [TESTIMONIALS_KEY] }),
  });
}
