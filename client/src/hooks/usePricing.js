/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

const PRICING_KEY = 'pricing';

export function usePricing(params = {}) {
  return useQuery({
    queryKey: [PRICING_KEY, params],
    queryFn: () => api.get('/pricing', { params }).then((res) => res.data),
  });
}

export function useCreatePricing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/pricing', data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [PRICING_KEY] }),
  });
}

export function useUpdatePricing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/pricing/${id}`, data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [PRICING_KEY] }),
  });
}

export function useDeletePricing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/pricing/${id}`).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [PRICING_KEY] }),
  });
}
