from typing import List


def compute_certification_features(

    resume_certifications: List[str],

    job_certifications: List[str]

):

    resume = {

        certification.lower().strip()

        for certification in resume_certifications

    }

    job = {

        certification.lower().strip()

        for certification in job_certifications

    }

    common = resume & job

    if len(job) == 0:

        overlap = 1.0

    else:

        overlap = len(common) / len(job)

    return {

        "resume_certification_count": len(resume),

        "required_certification_count": len(job),

        "common_certifications": len(common),

        "certification_overlap": round(

            overlap,

            4

        )

    }