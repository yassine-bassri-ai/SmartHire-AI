import api from './axios';
import { normalizeList, type DashboardStats, type CandidateSummary } from '@/utils/types';

// GET /dashboard  (aggregate stats + charts)
export async function getDashboard(): Promise<DashboardStats> {
  const { data } = await api.get('/dashboard');
  return data;
}

// Helper to derive candidate ranking from the dashboard payload.
export function extractBestCandidates(data: DashboardStats | unknown): CandidateSummary[] {
  if (data && typeof data === 'object' && Array.isArray((data as DashboardStats).best_candidates)) {
    return (data as DashboardStats).best_candidates;
  }
  return normalizeList<CandidateSummary>(data);
}
