from pathlib import Path
import pandas as pd


class ResultSaver:

    def __init__(self):

        self.output = Path("results")

        self.output.mkdir(

            parents=True,

            exist_ok=True

        )

    def save_comparison(

        self,

        dataframe

    ):

        dataframe.to_csv(

            self.output /

            "model_comparison.csv",

            index=False

        )

        print()

        print("Comparison saved.")

    def save_report(

        self,

        model_name,

        report

    ):

        reports = self.output / "classification_reports"

        reports.mkdir(

            exist_ok=True

        )

        with open(

            reports /

            f"{model_name}.txt",

            "w",

            encoding="utf-8"

        ) as f:

            f.write(report)

    def save_confusion_matrix(

        self,

        model_name,

        matrix

    ):

        matrices = self.output / "confusion_matrices"

        matrices.mkdir(

            exist_ok=True

        )

        df = pd.DataFrame(matrix)

        df.to_csv(

            matrices /

            f"{model_name}.csv",

            index=False

        )