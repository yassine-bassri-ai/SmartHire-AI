"""
SmartHire AI - Candidate & Job analysis routes.

Provides aggregate analysis endpoints used by the frontend candidate/job
pages. Reuses the existing repositories and services without modifying the
ML or matching engine.

Endpoints:
  GET /candidates                     -> list candidates with best match info
  GET /candidates/{resume_id}         -> candidate details
  GET /candidates/{resume_id}/matches -> candidate matches per job
  GET /jobs                           -> job analysis list
  GET /jobs/{job_id}/candidates       -> candidates ranked for a job
  GET /predictions                    -> all predictions (aggregate)
  GET /predictions/{prediction_id}    -> single prediction
"""

from fastapi import APIRouter, Depends, HTTPException, status


from src.database.prediction_repository import PredictionRepository
from src.database.resume_repository import ResumeRepository
from src.database.job_repository import JobRepository
from src.services.resume_service import ResumeService

router = APIRouter(
    prefix="",
    tags=["Analysis"]
)

resume_repository = ResumeRepository()
job_repository = JobRepository()
prediction_repository = PredictionRepository()
resume_service = ResumeService()

# A prediction is considered a "Best Match" when prediction == 1.
BEST_MATCH_THRESHOLD = 1


def _load_resume_meta(resume_id: int) -> dict:
    """Return basic resume metadata (from DB) or None."""
    try:
        for row in resume_repository.get_all():
            if row["id"] == resume_id:
                return row
    except Exception:
        return None
    return None


def _load_job_title(job_id: int) -> str:
    """Return the job_title for a job database id, or a fallback."""
    try:
        job = job_repository.get_by_id(job_id)
        if job:
            return job.get("job_title") or f"Job #{job_id}"
    except Exception:
        pass
    return f"Job #{job_id}"


# ---------------------------------------------------------------------------
# Candidates
# ---------------------------------------------------------------------------

def _candidate_summary(resume_row: dict, best_prediction: dict | None) -> dict:
    """Build a candidate summary dict from a resumes row + best prediction."""
    filename = resume_row.get("resume_name") or f"Resume #{resume_row['id']}"
    score = None
    probability = None
    prediction = None
    best_match = None

    if best_prediction is not None:
        probability = float(best_prediction["probability"])
        score = round(probability * 100, 2)
        prediction = int(best_prediction["prediction"])
        best_match = _load_job_title(best_prediction["job_id"])

    return {
        "id": resume_row["id"],
        "filename": filename,
        "language": resume_row.get("language"),
        "experience_years": resume_row.get("experience_years", 0),
        "best_match": best_match,
        "score": score,
        "probability": probability,
        "prediction": prediction,
    }


@router.get("/candidates")
def list_candidates():
    """List all candidates with their best match (highest probability)."""
    rows = resume_repository.get_all()
    predictions = prediction_repository.get_all()

    # Group predictions by resume_id, keep the highest probability.
    best_by_resume = {}
    for p in predictions:
        rid = p["resume_id"]
        if rid not in best_by_resume or p["probability"] > best_by_resume[rid]["probability"]:
            best_by_resume[rid] = p

    candidates = [
        _candidate_summary(row, best_by_resume.get(row["id"]))
        for row in rows
    ]

    return {
        "count": len(candidates),
        "candidates": candidates,
    }


@router.get("/candidates/{resume_id}")
def get_candidate(resume_id: int):
    """Return full candidate details (parsed resume JSON + summary)."""
    resume = resume_service.get_resume_by_id(resume_id)
    if resume is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate not found.",
        )

    # Best match from predictions.
    predictions = prediction_repository.get_by_resume(resume_id)
    best = predictions[0] if predictions else None

    return {
        "id": resume_id,
        "filename": resume.get("filename"),
        "language": resume.get("language"),
        "experience_years": resume.get("experience_years", 0),
        "skills": resume.get("skills", []),
        "education": resume.get("education", []),
        "languages": resume.get("languages", []),
        "certifications": resume.get("certifications", []),
        "best_match": _load_job_title(best["job_id"]) if best else None,
        "score": round(float(best["probability"]) * 100, 2) if best else None,
        "probability": float(best["probability"]) if best else None,
        "prediction": int(best["prediction"]) if best else None,
    }


@router.get("/candidates/{resume_id}/matches")
def get_candidate_matches(resume_id: int):
    """Return all job matches for a candidate, ranked by score desc."""
    resume = resume_service.get_resume_by_id(resume_id)
    if resume is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate not found.",
        )

    predictions = prediction_repository.get_by_resume(resume_id)

    matches = []
    for rank, p in enumerate(predictions, start=1):
        job = job_repository.get_by_id(p["job_id"])
        probability = float(p["probability"])
        score = round(probability * 100, 2)
        matches.append({
            "rank": rank,
            "job_id": p["job_id"],
            "job_title": job.get("job_title") if job else f"Job #{p['job_id']}",
            "company": job.get("company") if job else None,
            "score": score,
            "probability": probability,
            "prediction": int(p["prediction"]),
            "status": "Best Match" if p["prediction"] == BEST_MATCH_THRESHOLD else "Not Match",
        })

    return {
        "resume_id": resume_id,
        "count": len(matches),
        "matches": matches,
    }


# ---------------------------------------------------------------------------
# Jobs
# ---------------------------------------------------------------------------

@router.get("/jobs")
def list_jobs_analysis():
    """Job analysis list with candidate counts and average score."""
    jobs = job_repository.get_all()
    predictions = prediction_repository.get_all()

    # Group predictions by job_id.
    preds_by_job = {}
    for p in predictions:
        jid = p["job_id"]
        preds_by_job.setdefault(jid, []).append(p)

    output = []
    for job in jobs:
        job_db_id = job["id"]
        job_preds = preds_by_job.get(job_db_id, [])
        avg_score = None
        best = None
        if job_preds:
            avg_score = round(
                sum(float(p["probability"]) * 100 for p in job_preds) / len(job_preds),
                2,
            )
            top = max(job_preds, key=lambda p: p["probability"])
            best = _load_resume_meta(top["resume_id"])
        output.append({
            "id": job_db_id,
            "job_id": job.get("job_id"),
            "job_title": job.get("job_title"),
            "company": job.get("company"),
            "language": job.get("language"),
            "experience_required": job.get("experience_required"),
            "candidates_count": len(job_preds),
            "average_score": avg_score,
            "best_candidate": best.get("resume_name") if best else None,
        })

    return {
        "count": len(output),
        "jobs": output,
    }


@router.get("/jobs/{job_id}/candidates")
def get_job_candidates(job_id: int):
    """Return candidates ranked for a single job, by score desc."""
    job = job_repository.get_by_id(job_id)
    if job is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found.",
        )

    predictions = prediction_repository.get_all()
    job_preds = [p for p in predictions if p["job_id"] == job_id]
    job_preds.sort(key=lambda p: p["probability"], reverse=True)

    candidates = []
    for rank, p in enumerate(job_preds, start=1):
        resume = _load_resume_meta(p["resume_id"])
        probability = float(p["probability"])
        candidates.append({
            "rank": rank,
            "resume_id": p["resume_id"],
            "filename": resume.get("resume_name") if resume else f"Resume #{p['resume_id']}",
            "score": round(probability * 100, 2),
            "probability": probability,
            "prediction": int(p["prediction"]),
            "status": "Best Match" if p["prediction"] == BEST_MATCH_THRESHOLD else "Not Match",
        })

    return {
        "job_id": job_id,
        "job_title": job.get("job_title"),
        "count": len(candidates),
        "candidates": candidates,
    }


# ---------------------------------------------------------------------------
# Predictions
# ---------------------------------------------------------------------------

@router.get("/predictions")
def list_predictions():
    """Return all predictions with candidate/job info, ranked by probability."""
    predictions = prediction_repository.get_all()

    output = []
    for p in predictions:
        resume = _load_resume_meta(p["resume_id"])
        probability = float(p["probability"])
        output.append({
            "id": p["id"],
            "resume_id": p["resume_id"],
            "candidate": resume.get("resume_name") if resume else f"Resume #{p['resume_id']}",
            "job_id": p["job_id"],
            "job_title": _load_job_title(p["job_id"]),
            "prediction": int(p["prediction"]),
            "probability": probability,
            "score": round(probability * 100, 2),
            "status": "Best Match" if p["prediction"] == BEST_MATCH_THRESHOLD else "Not Match",
            "created_at": str(p.get("created_at")),
        })

    return {
        "count": len(output),
        "predictions": output,
    }


@router.get("/predictions/{prediction_id}")
def get_prediction(prediction_id: int):
    """Return a single prediction by its id."""
    for p in prediction_repository.get_all():
        if p["id"] == prediction_id:
            resume = _load_resume_meta(p["resume_id"])
            probability = float(p["probability"])
            return {
                "id": p["id"],
                "resume_id": p["resume_id"],
                "candidate": resume.get("resume_name") if resume else f"Resume #{p['resume_id']}",
                "job_id": p["job_id"],
                "job_title": _load_job_title(p["job_id"]),
                "prediction": int(p["prediction"]),
                "probability": probability,
                "score": round(probability * 100, 2),
                "status": "Best Match" if p["prediction"] == BEST_MATCH_THRESHOLD else "Not Match",
                "created_at": str(p.get("created_at")),
            }

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Prediction not found.",
    )
