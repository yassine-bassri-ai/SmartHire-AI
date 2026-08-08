from pydantic import BaseModel

from typing import List


class PredictionRequest(BaseModel):

    resume_id: str

    job_id: str


class PredictionResponse(BaseModel):

    prediction: int

    probability: float

    recommendation: str


class HealthResponse(BaseModel):

    status: str

    project: str


class ResumeResponse(BaseModel):

    id: int

    filename: str

    language: str

    experience_years: int


class JobResponse(BaseModel):

    id: int

    title: str

    company: str