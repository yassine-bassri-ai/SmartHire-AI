from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
    classification_report
)


class Evaluator:

    def __init__(self, model, name):

        self.model = model
        self.name = name

    def evaluate(self, X_test, y_test):

        print()
        print("=" * 70)
        print(self.name)
        print("=" * 70)

        # --------------------------
        # Predictions
        # --------------------------

        y_pred = self.model.predict(X_test)

        # --------------------------
        # Probabilities
        # --------------------------

        if hasattr(self.model, "predict_proba"):

            y_prob = self.model.predict_proba(X_test)[:, 1]

        else:

            y_prob = None

        # --------------------------
        # Metrics
        # --------------------------

        accuracy = accuracy_score(y_test, y_pred)

        precision = precision_score(
            y_test,
            y_pred,
            zero_division=0
        )

        recall = recall_score(
            y_test,
            y_pred,
            zero_division=0
        )

        f1 = f1_score(
            y_test,
            y_pred,
            zero_division=0
        )

        roc_auc = None

        if y_prob is not None:

            roc_auc = roc_auc_score(
                y_test,
                y_prob
            )

        # --------------------------
        # Confusion Matrix
        # --------------------------

        cm = confusion_matrix(
            y_test,
            y_pred
        )

        # --------------------------
        # Classification Report
        # --------------------------

        report = classification_report(
            y_test,
            y_pred
        )

        # --------------------------
        # Display
        # --------------------------

        print(f"Accuracy  : {accuracy:.4f}")
        print(f"Precision : {precision:.4f}")
        print(f"Recall    : {recall:.4f}")
        print(f"F1 Score  : {f1:.4f}")

        if roc_auc is not None:

            print(f"ROC AUC   : {roc_auc:.4f}")

        print()

        print("Confusion Matrix")

        print(cm)

        print()

        print("Classification Report")

        print(report)

        return {

            "accuracy": accuracy,

            "precision": precision,

            "recall": recall,

            "f1": f1,

            "roc_auc": roc_auc,

            "confusion_matrix": cm,

            "report": report

        }