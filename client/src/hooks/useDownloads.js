/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

const DOWNLOADS_KEY = 'downloads';

export function useDownloads(params = {}) {
  return useQuery({
    queryKey: [DOWNLOADS_KEY, params],
    queryFn: () => api.get('/downloads', { params }).then((res) => res.data),
  });
}

export function useCreateDownload() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/downloads', data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [DOWNLOADS_KEY] }),
  });
}

export function useUpdateDownload() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/downloads/${id}`, data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [DOWNLOADS_KEY] }),
  });
}

export function useDeleteDownload() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/downloads/${id}`).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [DOWNLOADS_KEY] }),
  });
}

export function useIncrementDownload() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.put(`/downloads/${id}/increment`).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [DOWNLOADS_KEY] }),
  });
}
