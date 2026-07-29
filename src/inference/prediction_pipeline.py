from src.matching.feature_engineering.feature_builder import build_features

from src.inference.predictor import Predictor

from src.inference.postprocessing import PostProcessor

from src.inference.schemas import (
    validate_resume,
    validate_job
)

from src.utils.logger import logger

class PredictionPipeline:

    def __init__(self):

        self.predictor = Predictor()

    def predict(self, resume, job):

        validate_resume(resume)

        validate_job(job)

        features = build_features(
            resume,
            job
        )

        prediction = self.predictor.predict(
            features
        )

        probability = prediction["probability"]

        logger.info(

            f"Prediction={prediction['prediction']} "

            f"Probability={probability:.4f}"

        )

        return {

            "prediction": prediction["prediction"],

            "probability": probability,

            "match_score":
                PostProcessor.score(probability),

            "confidence":
                PostProcessor.confidence(probability),

            "recommendation":
                PostProcessor.recommendation(probability),

            "features": features

        }