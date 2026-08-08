import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getResumes, getResume, uploadResume, deleteResume } from '@/api/resumeApi';
import type { Resume } from '@/utils/types';

export const resumeKeys = {
  all: ['resumes'] as const,
  detail: (id: number) => ['resumes', 'detail', id] as const,
};

export function useResumes() {
  return useQuery({
    queryKey: resumeKeys.all,
    queryFn: getResumes,
    staleTime: 30_000,
  });
}

export function useResume(id: number | undefined) {
  return useQuery({
    queryKey: resumeKeys.detail(id ?? -1),
    queryFn: () => getResume(id!),
    enabled: id !== undefined && id > 0,
  });
}

export function useUploadResume() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ file, onProgress }: { file: File; onProgress?: (pct: number) => void }) =>
      uploadResume(file, onProgress),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: resumeKeys.all });
    },
  });
}

export function useDeleteResume() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteResume(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: resumeKeys.all });
    },
  });
}

export type { Resume };
