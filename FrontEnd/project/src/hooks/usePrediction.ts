import { useMutation, useQuery } from '@tanstack/react-query';
import { runPrediction, getPredictions } from '@/api/predictionApi';
import type { Prediction } from '@/utils/types';

export const predictionKeys = {
  all: ['predictions'] as const,
  byResume: (resumeId: number) => ['predictions', resumeId] as const,
};

export function useRunPrediction() {
  return useMutation({
    mutationFn: (resumeId: number) => runPrediction(resumeId),
    onSuccess: (_data, resumeId) => {
      // Invalidate previous predictions so lists refresh.
      // (Using a functional refresh via queryClient is handled by the page.)
      void resumeId;
    },
  });
}

export function usePredictions(resumeId: number | undefined) {
  return useQuery({
    queryKey: predictionKeys.byResume(resumeId ?? -1),
    queryFn: () => getPredictions(resumeId!),
    enabled: resumeId !== undefined && resumeId > 0,
    staleTime: 0,
  });
}

export type { Prediction };
