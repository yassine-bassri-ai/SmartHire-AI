from typing import List

EDUCATION_LEVELS = {
    "high school": 1,
    "bachelor": 2,
    "licence": 2,
    "master": 3,
    "engineering": 3,
    "phd": 4,
    "doctorate": 4
}


def _highest_level(degrees: List[str]) -> int:

    level = 0

    for degree in degrees:

        value = EDUCATION_LEVELS.get(

            degree.lower().strip(),

            0

        )

        level = max(level, value)

    return level


def compute_education_features(

    resume_degrees: List[str],

    job_degrees: List[str]

) -> dict:

    resume_level = _highest_level(

        resume_degrees

    )

    job_level = _highest_level(

        job_degrees

    )

    gap = resume_level - job_level

    return {

        "resume_degree_level": resume_level,

        "required_degree_level": job_level,

        "education_gap": gap,

        "education_match": int(gap >= 0)

    }