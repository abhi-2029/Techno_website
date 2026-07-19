/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../api/axios';

export function useSubscribe() {
  return useMutation({
    mutationFn: (data) => api.post('/newsletter/subscribe', data).then((res) => res.data),
  });
}

export function useNewsletterList(params = {}) {
  return useQuery({
    queryKey: ['newsletter', params],
    queryFn: () => api.get('/newsletter', { params }).then((res) => res.data),
  });
}
