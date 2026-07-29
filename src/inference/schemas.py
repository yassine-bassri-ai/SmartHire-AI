REQUIRED_RESUME_FIELDS = [

    "skills",

    "education",

    "experience_years",

    "languages",

    "certifications"

]


REQUIRED_JOB_FIELDS = [

    "skills",

    "education",

    "experience_years",

    "languages",

    "certifications"

]


def validate_resume(resume):

    for field in REQUIRED_RESUME_FIELDS:

        if field not in resume:

            raise ValueError(

                f"Missing resume field: {field}"

            )


def validate_job(job):

    for field in REQUIRED_JOB_FIELDS:

        if field not in job:

            raise ValueError(

                f"Missing job field: {field}"

            )