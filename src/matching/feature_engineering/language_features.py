from typing import List


def compute_language_features(

    resume_languages: List[str],

    job_languages: List[str]

) -> dict:

    resume = {

        language.lower().strip()

        for language in resume_languages

    }

    job = {

        language.lower().strip()

        for language in job_languages

    }

    common = resume & job

    if len(job) == 0:

        overlap = 1.0

    else:

        overlap = len(common) / len(job)

    return {

        "resume_language_count": len(resume),

        "required_language_count": len(job),

        "common_languages": len(common),

        "language_overlap": round(

            overlap,

            4

        )

    }