/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

const GALLERY_KEY = 'gallery';

export function useGallery(params = {}) {
  return useQuery({
    queryKey: [GALLERY_KEY, params],
    queryFn: () => api.get('/gallery', { params }).then((res) => res.data),
  });
}

export function useCreateGallery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/gallery', data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [GALLERY_KEY] }),
  });
}

export function useUpdateGallery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/gallery/${id}`, data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [GALLERY_KEY] }),
  });
}

export function useDeleteGallery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/gallery/${id}`).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [GALLERY_KEY] }),
  });
}
