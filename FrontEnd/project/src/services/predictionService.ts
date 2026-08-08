const API_URL = "http://127.0.0.1:8000";

export interface RankingItem {
  rank: number;
  resume_id: number;
  job_id: number;
  job_title: string;
  prediction: number;
  probability: number;
  score: number;
}

export interface RankingResponse {
  success: boolean;
  resume_id: number;
  total: number;
  ranking: RankingItem[];
}

export async function getCandidateRanking(
  resumeId: number
): Promise<RankingResponse> {

  const response = await fetch(
    `${API_URL}/predictions/rank/${resumeId}`
  );

  if (!response.ok) {
    throw new Error(
      `Erreur HTTP ${response.status}`
    );
  }

  return response.json();
}