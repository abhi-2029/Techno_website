/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Query hooks mapping for jobs and candidate recruitment profiles.
 * - Coordinates server state synchronization via React Query cache invalidations.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

const JOBS_KEY = 'jobs';
const APPLICATIONS_KEY = 'job_applications';

export function useCareers(params = {}) {
  return useQuery({
    queryKey: [JOBS_KEY, params],
    queryFn: () => api.get('/careers/jobs', { params }).then((res) => res.data),
  });
}

export function useSubmitApplication() {
  return useMutation({
    mutationFn: (data) => api.post('/careers/apply', data).then((res) => res.data),
  });
}

export function useApplications(params = {}) {
  return useQuery({
    queryKey: [APPLICATIONS_KEY, params],
    queryFn: () => api.get('/careers/applications', { params }).then((res) => res.data),
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) =>
      api.patch(`/careers/applications/${id}`, { status }).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [APPLICATIONS_KEY] }),
  });
}

export function useDeleteApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/careers/applications/${id}`).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [APPLICATIONS_KEY] }),
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/careers/jobs', data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [JOBS_KEY] }),
  });
}

export function useUpdateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => api.put(`/careers/jobs/${id}`, data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [JOBS_KEY] }),
  });
}

export function useDeleteJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/careers/jobs/${id}`).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [JOBS_KEY] }),
  });
}
