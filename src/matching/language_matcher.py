from typing import List

def language_score(cv_languages: List[str], job_languages: List[str]) -> float:

    cv = {lang.lower().strip() for lang in cv_languages}
    job = {lang.lower().strip() for lang in job_languages}

    if not job:
        return 100.0

    matched = cv.intersection(job)

    score = len(matched) / len(job) * 100

    return round(score, 2)