import pandas as pd
from pathlib import Path
from src.inference.prediction_pipeline import (
    PredictionPipeline
)


class BatchPredictor:

    def __init__(self):

        self.pipeline = PredictionPipeline()

    def predict_all(

        self,

        resumes,

        jobs

    ):

        rows = []

        for resume in resumes:

            for job in jobs:

                result = self.pipeline.predict(

                    resume,

                    job

                )

                rows.append({

                    "resume": resume.get("filename"),

                    "language": resume.get("language"),

                    "job": job.get("job_title"),

                    "prediction": result["prediction"],

                    "probability": result["probability"],

                    "match_score": result["match_score"],

                    "confidence": result["confidence"],

                    "recommendation": result["recommendation"]

                })

        return pd.DataFrame(rows)

    def save(self, dataframe, path):

        dataframe.to_csv(

            path,

            index=False

        )

        print(f"Résultats sauvegardés : {path}")