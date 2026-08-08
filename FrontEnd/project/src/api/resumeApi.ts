import api from "./axios";
import {
    normalizeList,
    type Resume,
    type ResumeUploadResponse,
} from "@/utils/types";

/**
 * POST /resume/upload
 * Uploads a resume PDF and returns the parsed resume.
 */
export async function uploadResume(
    file: File,
    onProgress?: (progress: number) => void,
): Promise<ResumeUploadResponse> {
    const formData = new FormData();
    formData.append("file", file);
    console.log("Calling FastAPI...");
    const response = await api.post<ResumeUploadResponse>(
        "/resume/upload",
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
 * GET /resume
 * Returns the full list of resumes.
 */
export async function getResumes(): Promise<Resume[]> {
    const response = await api.get("/resume");
    return normalizeList<Resume>(response.data);
}

/**
 * GET /resume/{id}
 * Returns a single resume by id.
 */
export async function getResume(id: number): Promise<Resume> {
    const response = await api.get(`/resume/${id}`);
    return response.data;
}

/**
 * DELETE /resume/{id}
 * Deletes a resume by id.
 */
export async function deleteResume(id: number): Promise<void> {
    await api.delete(`/resume/${id}`);
}
