import { useQuery } from '@tanstack/react-query';
import { getDashboard } from '@/api/dashboardApi';
import type { DashboardStats } from '@/utils/types';

export const dashboardKeys = {
  all: ['dashboard'] as const,
};

export function useDashboard() {
  return useQuery({
    queryKey: dashboardKeys.all,
    queryFn: getDashboard,
    staleTime: 60_000,
  });
}

export type { DashboardStats };
