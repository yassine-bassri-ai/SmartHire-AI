from pydantic import BaseModel

from typing import List


class ResumeSchema(BaseModel):

    filename: str

    language: str

    skills: List[str]

    education: List[str]

    experience_years: int

    languages: List[str]

    certifications: List[str]


class JobSchema(BaseModel):

    job_title: str

    skills: List[str]

    education: List[str]

    experience_years: int

    languages: List[str]

    certifications: List[str]


class PredictionRequest(BaseModel):

    resume: ResumeSchema

    job: JobSchema


class PredictionResponse(BaseModel):

    prediction: int

    probability: float

    match_score: float

    confidence: str

    recommendation: str

from typing import List


class BatchPredictionRequest(BaseModel):

    resumes: List[ResumeSchema]

    jobs: List[JobSchema]