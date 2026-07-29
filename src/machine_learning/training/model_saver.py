import joblib

from pathlib import Path


class ModelSaver:

    def __init__(self):

        self.output = Path(

            "artifacts/models"

        )

        self.output.mkdir(

            parents=True,

            exist_ok=True

        )

    def save(

        self,

        model,

        model_name

    ):

        path = self.output / "best_model.pkl"

        joblib.dump(

            model,

            path

        )

        print()

        print("=" * 60)

        print("BEST MODEL SAVED")

        print("=" * 60)

        print(model_name)

        print(path)