import pandas as pd

from src.inference.model_loader import (
    ModelLoader
)


class Predictor:

    def __init__(self):

        self.model = ModelLoader.load_model()

        self.scaler = ModelLoader.load_scaler()

    def predict(self, features: dict):

        X = pd.DataFrame([features])

        X_scaled = self.scaler.transform(X)

        prediction = int(

            self.model.predict(X_scaled)[0]

        )

        probability = float(

            self.model.predict_proba(

                X_scaled

            )[0][1]

        )

        return {

            "prediction": prediction,

            "probability": round(

                probability,

                4

            )

        }