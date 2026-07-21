"""
Education Matching Module
"""

education_rank = {
    "bac": 1,
    "bachelor": 2,
    "licence": 2,
    "license": 2,
    "master": 3,
    "msc": 3,
    "engineer": 3,
    "ingénieur": 3,
    "ingenieur": 3,
    "phd": 4,
    "doctorate": 4
}


def get_highest_level(degrees):

    if not degrees:
        return 0

    highest = 0

    for degree in degrees:

        degree = degree.lower().strip()

        highest = max(
            highest,
            education_rank.get(degree, 0)
        )

    return highest


def education_score(cv_education, job_education):

    cv_level = get_highest_level(cv_education)

    job_level = get_highest_level(job_education)

    # aucune exigence dans l'offre
    if job_level == 0:
        return 100.0

    if cv_level >= job_level:
        return 100.0

    return round(cv_level / job_level * 100, 2)