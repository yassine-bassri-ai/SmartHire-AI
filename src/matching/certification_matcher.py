from typing import List

def certification_score(cv_certifications: List[str],
                        job_certifications: List[str]) -> float:

    cv = {cert.lower().strip() for cert in cv_certifications}
    job = {cert.lower().strip() for cert in job_certifications}

    if not job:
        return 100.0

    matched = cv.intersection(job)

    score = len(matched) / len(job) * 100

    return round(score, 2)