/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

const CONTACTS_KEY = 'contacts';

export function useContacts(params = {}) {
  return useQuery({
    queryKey: [CONTACTS_KEY, params],
    queryFn: () => api.get('/contacts', { params }).then((res) => res.data),
  });
}

export function useCreateContact() {
  return useMutation({
    mutationFn: (data) => api.post('/contacts', data).then((res) => res.data),
  });
}

export function useMarkRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.put(`/contacts/${id}/read`).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [CONTACTS_KEY] }),
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/contacts/${id}`).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [CONTACTS_KEY] }),
  });
}
