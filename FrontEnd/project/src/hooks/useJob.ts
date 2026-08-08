import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getJobs, getJob, uploadJob, deleteJob } from '@/api/jobApi';
import type { Job } from '@/utils/types';

export const jobKeys = {
  all: ['jobs'] as const,
  detail: (id: number) => ['jobs', 'detail', id] as const,
};

export function useJobs() {
  return useQuery({
    queryKey: jobKeys.all,
    queryFn: getJobs,
    staleTime: 30_000,
  });
}

export function useJob(id: number | undefined) {
  return useQuery({
    queryKey: jobKeys.detail(id ?? -1),
    queryFn: () => getJob(id!),
    enabled: id !== undefined && id > 0,
  });
}

export function useUploadJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ file, onProgress }: { file: File; onProgress?: (pct: number) => void }) =>
      uploadJob(file, onProgress),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
}

export function useDeleteJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteJob(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
}

export type { Job };
