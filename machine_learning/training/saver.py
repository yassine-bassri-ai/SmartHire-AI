from pathlib import Path
import joblib

class ModelSaver:

    def __init__(

        self,

        model_dir="models"

    ):

        self.model_dir = Path(model_dir)

        self.model_dir.mkdir(

            exist_ok=True

        )

    def save_model(

        self,

        model,

        filename

    ):

        path = self.model_dir / filename

        joblib.dump(

            model,

            path

        )

        print(f"Model saved : {path}")

    def save_scaler(

        self,

        scaler

    ):

        path = self.model_dir / "scaler.pkl"

        joblib.dump(

            scaler,

            path

        )

        print(f"Scaler saved : {path}")