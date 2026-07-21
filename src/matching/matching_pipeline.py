import json
from pathlib import Path

from src.matching.skill_matcher import skill_score
from src.matching.education_matcher import education_score
from src.matching.experience_matcher import experience_score
from src.matching.language_matcher import language_score
from src.matching.certification_matcher import certification_score
from src.matching.score_calculator import (
    final_score,
    recommendation
)


BASE_DIR = Path(__file__).resolve().parents[2]

CV_FOLDER = BASE_DIR / "data" / "processed" / "parsed_CV"
JOB_FOLDER = BASE_DIR / "data" / "processed" / "parsed_jobs"

OUTPUT_FOLDER = BASE_DIR / "data" / "processed" / "matching_results"
OUTPUT_FOLDER.mkdir(parents=True, exist_ok=True)

OUTPUT_FILE = OUTPUT_FOLDER / "matching_results.json"


# ==========================================================
# LOAD JSON
# ==========================================================

def load_json(path: Path):

    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


# ==========================================================
# MATCH ONE CV WITH ONE JOB
# ==========================================================

def match(cv: dict, job: dict):

    scores = {}

    scores["skills"] = skill_score(
        cv.get("skills", []),
        job.get("skills", [])
    )

    scores["education"] = education_score(
        cv.get("education", ""),
        job.get("education", "")
    )

    scores["experience"] = experience_score(
        cv.get("experience_years", 0),
        job.get("experience_years", 0)
    )

    scores["languages"] = language_score(
        cv.get("languages", []),
        job.get("languages", [])
    )

    scores["certifications"] = certification_score(
        cv.get("certifications", []),
        job.get("certifications", [])
    )

    global_score = final_score(scores)

    return {
        "scores": scores,
        "final_score": global_score,
        "recommendation": recommendation(global_score)
    }


# ==========================================================
# PROCESS ALL CVS
# ==========================================================

def process_all():

    cv_files = sorted(CV_FOLDER.rglob("*.json"))
    job_files = sorted(JOB_FOLDER.glob("*.json"))

    print("=" * 70)
    print("SMARTHIRE AI - MATCHING ENGINE")
    print("=" * 70)

    print(f"CV Found      : {len(cv_files)}")
    print(f"Jobs Found    : {len(job_files)}")
    print(f"Total Matches : {len(cv_files) * len(job_files)}")
    print()

    results = []

    for i, cv_file in enumerate(cv_files, start=1):

        cv = load_json(cv_file)

        cv_language = cv_file.parent.name

        print(f"[{i}/{len(cv_files)}] Processing: {cv_file.name}")

        for job_file in job_files:

            job = load_json(job_file)

            result = match(cv, job)

            results.append({

                "candidate": cv.get("filename"),

                "cv_file": cv_file.name,

                "cv_language": cv_language,

                "job_title": job.get("job_title", "Unknown"),

                "job_file": job_file.name,

                "skills_score":
                    result["scores"]["skills"],

                "education_score":
                    result["scores"]["education"],

                "experience_score":
                    result["scores"]["experience"],

                "language_score":
                    result["scores"]["languages"],

                "certification_score":
                    result["scores"]["certifications"],

                "final_score":
                    result["final_score"],

                "recommendation":
                    result["recommendation"]

            })

    with open(
        OUTPUT_FILE,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            results,
            f,
            indent=4,
            ensure_ascii=False
        )

    print()
    print("=" * 70)
    print("MATCHING FINISHED")
    print("=" * 70)
    print(f"Results saved in:")
    print(OUTPUT_FILE)
    print(f"Total Results: {len(results)}")


if __name__ == "__main__":

    process_all()