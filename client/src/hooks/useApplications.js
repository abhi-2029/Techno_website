/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Query hooks mapping for applicant registration requests.
 * - Manages server-state synchronization via React Query invalidations.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

const APPLICATIONS_KEY = 'applications';

export function useApplications(params = {}) {
  return useQuery({
    queryKey: [APPLICATIONS_KEY, params],
    queryFn: () => api.get('/applications', { params }).then((res) => res.data),
  });
}

export function useCreateApplication() {
  return useMutation({
    mutationFn: (data) => api.post('/applications', data).then((res) => res.data),
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, notes }) => 
      api.patch(`/applications/${id}`, { status, notes }).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [APPLICATIONS_KEY] }),
  });
}

export function useDeleteApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/applications/${id}`).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [APPLICATIONS_KEY] }),
  });
}

export function useTrackApplication(query) {
  return useQuery({
    queryKey: [APPLICATIONS_KEY, 'track', query],
    queryFn: () => api.get(`/applications/track/${query}`).then((res) => res.data),
    enabled: !!query,
    retry: false,
  });
}
