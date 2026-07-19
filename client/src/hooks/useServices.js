/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

const SERVICES_KEY = 'services';

export function useServices(params = {}) {
  return useQuery({
    queryKey: [SERVICES_KEY, params],
    queryFn: () => api.get('/services', { params }).then((res) => res.data),
  });
}

export function useService(slug) {
  return useQuery({
    queryKey: [SERVICES_KEY, slug],
    queryFn: () => api.get(`/services/${slug}`).then((res) => res.data),
    enabled: !!slug,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/services', data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [SERVICES_KEY] }),
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/services/${id}`, data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [SERVICES_KEY] }),
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/services/${id}`).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [SERVICES_KEY] }),
  });
}
