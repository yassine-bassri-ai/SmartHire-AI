class ComparisonTable:

    def __init__(self):

        self.rows = []

    def add(

        self,

        model_name,

        metrics,

        training_time

    ):

        self.rows.append({

            "Model": model_name,

            "Accuracy": metrics["accuracy"],

            "Precision": metrics["precision"],

            "Recall": metrics["recall"],

            "F1": metrics["f1"],

            "ROC_AUC": metrics["roc_auc"],

            "Training Time (s)": round(training_time,2)

        })

    def dataframe(self):

        import pandas as pd

        return pd.DataFrame(self.rows)