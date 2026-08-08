// ============================================================
// SmartHire AI - Shared Type Definitions
// These mirror the FastAPI backend response contracts.
// ============================================================

export interface Resume {
  id: number;
  filename: string;
  language: string;
  experience_years: number;
  skills: string[];
  education: string[];
  languages: string[];
  certifications: string[];
  raw_text: string;
  database_id?: number;
  parsing_status?: string;
  parsed_at?: string;
}

export interface ResumeUploadResponse {
  success: boolean;
  message: string;
  resume: Resume;
}

export interface Job {
  id: number;
  job_id?: string | number;
  job_title: string;
  title?: string;
  filename?: string;
  company: string;
  language: string;
  experience_required: number;
  experience_years?: number;
  skills: string[];
  education: string[];
  languages: string[];
  certifications: string[];
  description: string;
  raw_text?: string;
  parsed_at?: string;
}

export interface JobUploadResponse {
  success: boolean;
  message: string;
  job: Job;
}

export interface JobListResponse {
  count: number;
  jobs: Job[];
}

export interface Prediction {
  job_id: number;
  job_title: string;
  company?: string;
  prediction: number;
  probability: number;
  score: number;
  rank?: number;
  recommendation?: string;
}

export interface PredictionResponse {
  success: boolean;
  resume_id: number;
  total_predictions: number;
  best_jobs: Prediction[];
}

export interface PreviousPredictionsResponse {
  success: boolean;
  resume_id: number;
  total_jobs: number;
  top_matches: Prediction[];
}

export interface CandidateSummary {
  id: number;
  filename: string;
  score: number;
  best_match?: string;
}

export interface DashboardCharts {
  monthly: { label: string; resumes: number; jobs: number }[];
  score_distribution: { name: string; value: number }[];
  languages_distribution: { name: string; value: number }[];
  skills_distribution: { name: string; value: number }[];
  prediction_distribution: { name: string; value: number }[];
}

export interface DashboardStats {
  total_resumes: number;
  total_jobs: number;
  total_predictions: number;
  average_score: number;
  best_candidates: CandidateSummary[];
  charts?: DashboardCharts;
}

export interface ApiListEnvelope<T> {
  count?: number;
  resumes?: T[];
  jobs?: T[];
  data?: T[];
}

// Utility to normalize any list response into a plain array.
export function normalizeList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (payload && typeof payload === 'object') {
    const obj = payload as Record<string, unknown>;
    if (Array.isArray(obj.jobs)) return obj.jobs as T[];
    if (Array.isArray(obj.resumes)) return obj.resumes as T[];
    if (Array.isArray(obj.data)) return obj.data as T[];
    if (Array.isArray(obj.best_jobs)) return obj.best_jobs as T[];
    if (Array.isArray(obj.top_matches)) return obj.top_matches as T[];
  }
  return [];
}
