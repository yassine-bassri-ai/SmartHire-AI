from pathlib import Path
import shutil

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends

from src.services.job_service import JobService

router = APIRouter(
    prefix="/job",
    tags=["Job"]
)

service = JobService()

UPLOAD_FOLDER = Path("uploads/jobs")

UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)


@router.post("/upload")
async def upload_job(
    file: UploadFile = File(...)
):

    if not file.filename.lower().endswith(".json"):

        raise HTTPException(
            status_code=400,
            detail="Only JSON files are accepted."
        )

    destination = UPLOAD_FOLDER / file.filename

    with open(destination, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    job = service.parse_job(
        str(destination)
    )

    return {
        "success": True,
        "message": "Job uploaded successfully.",
        "job": job
    }


@router.get("")
def get_jobs():

    repository = service.repository

    jobs = repository.get_all()

    return {
        "count": len(jobs),
        "jobs": jobs
    }


@router.get("/all")
def get_all_jobs():

    repository = service.repository

    jobs = repository.get_all()

    return {
        "count": len(jobs),
        "jobs": jobs
    }


@router.get("/{job_id}")
def get_job(
    job_id: int
):

    job = service.repository.get_by_id(job_id)

    if job is None:
        raise HTTPException(
            status_code=404,
            detail="Job not found."
        )

    return {
        "success": True,
        "job": job
    }


@router.delete("/{job_id}")
def delete_job(
    job_id: str
):

    try:

        job_db_id = int(job_id)

    except ValueError:

        raise HTTPException(
            status_code=400,
            detail="Invalid job id."
        )

    deleted = service.repository.delete(
        job_db_id
    )

    if not deleted:

        raise HTTPException(
            status_code=404,
            detail="Job not found."
        )

    return {
        "success": True,
        "message": "Job deleted successfully.",
        "job_id": job_db_id
    }


@router.post("/uploads")
def upload_all_jobs():

    folder = "data/processed/parsed_jobs"

    total = service.parse_all_jobs(folder)

    return {
        "success": True,
        "message": "All jobs imported successfully.",
        "total_jobs": total
    }
