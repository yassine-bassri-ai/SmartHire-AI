from typing import List
from src.utils.skill_normalizer import normalize_skill

def skill_score(cv_skills: List[str], job_skills: List[str]) -> float:

    cv = {
    normalize_skill(skill)
    for skill in cv_skills
}

    job = {
    normalize_skill(skill)
    for skill in job_skills
}

    if not job:
        return 0.0

    matched = cv.intersection(job)

    score = len(matched) / len(job) * 100

    return round(score, 2)