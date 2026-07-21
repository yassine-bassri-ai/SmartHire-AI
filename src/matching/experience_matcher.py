def experience_score(cv_years: float, job_years: float) -> float:
    if job_years <= 0:
        return 100.0

    if cv_years >= job_years:
        return 100.0

    score = cv_years / job_years * 100

    return round(score, 2)