import { useEffect, useState } from 'react';
import api from '@/services/api';
import type { ParsedResume, ParsedJob } from '@/services/endpoints';

export function useApi<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetcher();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, refetch: run, setData };
}

export function useResumes() {
  return useApi<ParsedResume[]>(async () => {
    try {
      const { data } = await api.get('/resume');
      return Array.isArray(data) ? data : data?.resumes ?? [];
    } catch {
      return [];
    }
  }, []);
}

export function useJobs() {
  return useApi<ParsedJob[]>(async () => {
    try {
      const { data } = await api.get('/job');
      return Array.isArray(data) ? data : data?.jobs ?? [];
    } catch {
      return [];
    }
  }, []);
}
