import api from "./axios";
import { normalizeList } from "@/utils/types";
import type {
    Prediction,
    PredictionResponse,
    PreviousPredictionsResponse,
} from "@/utils/types";

/**
 * POST /predictions/{resume_id}
 */
export async function runPrediction(
    resumeId: number
): Promise<Prediction[]> {

    const response = await api.post<PredictionResponse>(
        `/predictions/${resumeId}`
    );

    return normalizeList<Prediction>(
        response.data.best_jobs
    );
}

/**
 * GET /predictions/{resume_id}
 */
export async function getPredictions(
    resumeId: number
): Promise<Prediction[]> {

    const response = await api.get<PreviousPredictionsResponse>(
        `/predictions/${resumeId}`
    );

    return normalizeList<Prediction>(
        response.data.top_matches
    );
}