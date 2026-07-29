from src.api.schemas import (
    PredictionRequest
)

request = PredictionRequest(

    resume={

        "filename":"cv.pdf",

        "language":"en",

        "skills":["python"],

        "education":["bachelor"],

        "experience_years":3,

        "languages":["english"],

        "certifications":["aws"]

    },

    job={

        "job_title":"AI Engineer",

        "skills":["python"],

        "education":["bachelor"],

        "experience_years":2,

        "languages":["english"],

        "certifications":["aws"]

    }

)

print(request)