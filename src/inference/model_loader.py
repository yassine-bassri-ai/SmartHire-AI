from pathlib import Path
import joblib


class ModelLoader:

    _model = None
    _scaler = None

    @classmethod
    def load_model(cls):

        if cls._model is None:

            model_path = Path(
                "artifacts/models/best_model.pkl"
            )

            cls._model = joblib.load(model_path)

            print("Best model loaded.")

        return cls._model

    @classmethod
    def load_scaler(cls):

        if cls._scaler is None:

            scaler_path = Path(
                "artifacts/models/scaler.pkl"
            )

            cls._scaler = joblib.load(
                scaler_path
            )

            print("Scaler loaded.")

        return cls._scaler