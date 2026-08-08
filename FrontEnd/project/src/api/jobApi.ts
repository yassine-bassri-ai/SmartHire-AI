import api from "./axios";
import {
    normalizeList,
    type Job,
    type JobUploadResponse,
} from "@/utils/types";

/**
 * POST /job/upload
 * Uploads a job description file and returns the parsed job.
 */
export async function uploadJob(
    file: File,
    onProgress?: (progress: number) => void,
): Promise<JobUploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post<JobUploadResponse>(
        "/job/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (event) => {
                if (!event.total) return;
                const progress = Math.round(
                    (event.loaded * 100) / event.total
                );
                onProgress?.(progress);
            },
        }
    );

    return response.data;
}

/**
 * GET /job
 * Returns the full list of jobs. Falls back to /job/all for older backends.
 */
export async function getJobs(): Promise<Job[]> {
    try {
        const response = await api.get("/job");
        return normalizeList<Job>(response.data);
    } catch {
        const response = await api.get("/job/all");
        return normalizeList<Job>(response.data);
    }
}

/**
 * GET /job/{id}
 * Returns a single job by id.
 */
export async function getJob(id: number): Promise<Job> {
  const response = await api.get(`/job/${id}`);

  console.log("========== GET JOB ==========");
  console.log("ID demandé :", id);
  console.log("Status :", response.status);
  console.log("Response :", response.data);
  console.log("=============================");

  return response.data.job;
}

/**
 * DELETE /job/{id}
 * Deletes a job by id.
 */
export async function deleteJob(id: number): Promise<void> {
    await api.delete(`/job/${id}`);
}
