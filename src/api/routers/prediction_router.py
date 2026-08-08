from fastapi import APIRouter, HTTPException, Depends


from src.services.resume_service import ResumeService
from src.services.prediction_service import PredictionService

router = APIRouter(
    prefix="/predictions",
    tags=["Predictions"]
)

resume_service = ResumeService()
prediction_service = PredictionService()


@router.post("/{resume_id}")
def predict_resume(resume_id: int):

    resume = resume_service.get_resume_by_id(resume_id)

    if resume is None:

        raise HTTPException(
            status_code=404,
            detail="Resume not found."
        )

    predictions = prediction_service.predict(resume)

    return {

        "success": True,

        "resume_id": resume_id,

        "total_predictions": len(predictions),

        "best_jobs": predictions

    }


@router.get("/{resume_id}")
def get_predictions(resume_id: int):

    predictions = prediction_service.prediction_repository.get_by_resume(
        resume_id
    )

    return {

        "success": True,

        "resume_id": resume_id,

        "total_jobs": len(predictions),

        "top_matches": predictions

    }

@router.get("/rank/{resume_id}")
def rank_candidate(
    resume_id: int,
    limit: int = 10
):

    predictions = prediction_service.rank_candidate(
        resume_id,
        limit
    )

    return {
        "success": True,
        "resume_id": resume_id,
        "total": len(predictions),
        "ranking": predictions
    }