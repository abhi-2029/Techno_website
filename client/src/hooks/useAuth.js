/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export function useLogin() {
  const { login } = useAuth();
  return useMutation({
    mutationFn: (credentials) => login(credentials),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data) => api.post('/auth/register', data).then((res) => res.data),
  });
}

export function useLogout() {
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        await api.post('/auth/logout');
      } catch {
        /* swallow */
      }
      logout();
      queryClient.clear();
    },
  });
}

export function useMe() {
  const { token } = useAuth();
  return useQuery({
    queryKey: ['me'],
    queryFn: () => api.get('/auth/me').then((res) => res.data.data || res.data),
    enabled: !!token,
  });
}
