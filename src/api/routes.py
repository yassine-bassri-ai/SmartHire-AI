from fastapi import APIRouter

from src.api.schemas import (
    PredictionRequest,
    PredictionResponse
)

from src.inference.prediction_pipeline import (
    PredictionPipeline
)

from src.api.schemas import BatchPredictionRequest

from src.inference.batch_predictor import BatchPredictor

router = APIRouter()

batch = BatchPredictor()

@router.post("/batch-predict")

def batch_predict(

    request: BatchPredictionRequest

):

    dataframe = batch.predict_all(

        [

            r.model_dump()

            for r in request.resumes

        ],

        [

            j.model_dump()

            for j in request.jobs

        ]

    )

    return dataframe.to_dict(

        orient="records"

    )




@router.get("/")
def home():

    return {

        "application": "SmartHire AI",

        "version": "1.0.0",

        "status": "running"

    }


@router.get("/health")
def health():

    return {

        "status": "healthy",

        "model": "loaded",

        "api": "online"

    }

pipeline = PredictionPipeline()

@router.post(

    "/predict",

    response_model=PredictionResponse

)

def predict(

    request: PredictionRequest

):

    result = pipeline.predict(

        request.resume.model_dump(),

        request.job.model_dump()

    )

    return {

        "prediction":

        result["prediction"],

        "probability":

        result["probability"],

        "match_score":

        result["match_score"],

        "confidence":

        result["confidence"],

        "recommendation":

        result["recommendation"]

    }