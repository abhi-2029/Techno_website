/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

const BLOGS_KEY = 'blogs';

export function useBlogs(params = {}) {
  return useQuery({
    queryKey: [BLOGS_KEY, params],
    queryFn: () => api.get('/blogs', { params }).then((res) => res.data),
  });
}

export function useBlog(slug) {
  return useQuery({
    queryKey: [BLOGS_KEY, slug],
    queryFn: () => api.get(`/blogs/${slug}`).then((res) => res.data),
    enabled: !!slug,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/blogs', data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BLOGS_KEY] }),
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/blogs/${id}`, data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BLOGS_KEY] }),
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/blogs/${id}`).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BLOGS_KEY] }),
  });
}
