from pathlib import Path
import shutil

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends

from src.services.resume_service import ResumeService

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

service = ResumeService()

UPLOAD_FOLDER = Path("uploads/resumes")
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...)
):
    print("=== UPLOAD ENDPOINT CALLED ===")

    if not file.filename.lower().endswith(".pdf"):

        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    file_path = UPLOAD_FOLDER / file.filename

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    result = service.parse_resume(
        str(file_path)
    )

    return {
        "success": True,
        "message": "Resume uploaded successfully.",
        "resume": result
    }


@router.get("")
def get_resumes():
    """List all resumes from the database."""

    rows = service.repository.get_all()

    resumes = []

    for row in rows:

        resumes.append({
            "id": row["id"],
            "filename": row.get("resume_name", row.get("filename")),
            "language": row.get("language"),
            "experience_years": row.get("experience_years", row.get("experience", 0)),
            "skills": row.get("skills", []),
            "education": row.get("education", []),
            "languages": row.get("languages", []),
            "certifications": row.get("certifications", []),
            "raw_text": row.get("raw_text", "")
        })

    return {
        "count": len(resumes),
        "resumes": resumes
    }


@router.get("/{resume_id}")
def get_resume(resume_id: int):

    resume = service.get_resume_by_id(resume_id)

    if resume is None:

        raise HTTPException(
            status_code=404,
            detail="Resume not found."
        )

    return resume


@router.delete("/{resume_id}")
def delete_resume(resume_id: int):

    deleted = service.repository.delete(resume_id)

    if not deleted:

        raise HTTPException(
            status_code=404,
            detail="Resume not found."
        )

    return {
        "success": True,
        "message": "Resume deleted successfully.",
        "resume_id": resume_id
    }


@router.post("/uploads")
def upload_all_resumes():

    folder = "data/raw/resumes"

    total = service.parse_all_resumes(folder)

    return {
        "success": True,
        "message": "All resumes uploaded successfully.",
        "total_resumes": total
    }
