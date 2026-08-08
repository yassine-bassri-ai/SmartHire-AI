import api from './api';

export interface ParsedResume {
  id?: string;
  filename?: string;
  name?: string;
  email?: string;
  phone?: string;
  language?: string;
  experience?: string | number;
  experience_years?: number;
  skills?: string[];
  education?: string[];
  languages?: string[];
  certifications?: string[];
  raw?: unknown;
}

export interface ParsedJob {
  id?: string;
  filename?: string;
  job_title?: string;
  title?: string;
  company?: string;
  language?: string;
  experience?: string | number;
  experience_years?: number;
  skills?: string[];
  description?: string;
  raw?: unknown;
}

export interface Prediction {
  rank: number;
  job_title: string;
  company: string;
  probability: number;
  prediction: string;
  matching_score?: number;
  job_id?: string;
}

export interface CandidateAnalysis {
  semantic_similarity?: number;
  skill_matching?: number;
  language_matching?: number;
  education_matching?: number;
  experience_matching?: number;
  overall_score?: number;
  recommendations?: string[];
  missing_skills?: string[];
  strengths?: string[];
  weaknesses?: string[];
  suitable_positions?: string[];
  profile?: ParsedResume;
}

// POST /resume/upload
export async function uploadResume(file: File, onProgress?: (pct: number) => void): Promise<ParsedResume> {
  const form = new FormData();
  form.append('file', file);
  const { data } = await api.post('/resume/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (e.total && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    },
  });
  return data;
}

// POST /job/upload
export async function uploadJob(file: File, onProgress?: (pct: number) => void): Promise<ParsedJob> {
  const form = new FormData();
  form.append('file', file);
  const { data } = await api.post('/job/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (e.total && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    },
  });
  return data;
}

// POST /predictions/{resume_id}
export async function getPredictions(resumeId: string): Promise<Prediction[]> {
  const { data } = await api.post(`/predictions/${resumeId}`, {});
  return Array.isArray(data) ? data : data?.predictions ?? [];
}

// GET /resume
export async function getResumes(): Promise<ParsedResume[]> {
  const { data } = await api.get('/resume');
  return Array.isArray(data) ? data : data?.resumes ?? [];
}

// GET /job
export async function getJobs(): Promise<ParsedJob[]> {
  const { data } = await api.get('/job');
  return Array.isArray(data) ? data : data?.jobs ?? [];
}

// GET /resume/{id}
export async function getResume(id: string): Promise<ParsedResume> {
  const { data } = await api.get(`/resume/${id}`);
  return data;
}

// DELETE /resume/{id}
export async function deleteResume(id: string): Promise<void> {
  await api.delete(`/resume/${id}`);
}

// GET /analysis/{resume_id}/{job_id} — candidate analysis
export async function getCandidateAnalysis(resumeId: string, jobId: string): Promise<CandidateAnalysis> {
  const { data } = await api.get(`/analysis/${resumeId}/${jobId}`);
  return data;
}
