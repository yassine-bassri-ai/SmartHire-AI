import api from "./axios";

export interface AnalyticsData {
  total_resumes: number;
  total_jobs: number;
  total_predictions: number;
  average_score: number;
  successful_predictions: number;

  languages: {
    language: string;
    total: number;
  }[];

  top_jobs: {
    job_id: number;
    job_title: string | null;
    matches: number;
    average_score: number;
  }[];

  score_distribution: {
    score_range: string;
    total: number;
  }[];
}

export async function getAnalytics(): Promise<AnalyticsData> {

  const response = await api.get("/analytics");

  return response.data.analytics;
}