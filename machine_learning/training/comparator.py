class ModelComparator:

    def __init__(self):

        self.results = []

    def add_result(

        self,

        result

    ):

        self.results.append(result)

    def best_model(self):

        return max(

            self.results,

            key=lambda x: x.f1_score

        )

    def summary(self):

        print("\n")

        print("=" * 70)

        print("MODEL COMPARISON")

        print("=" * 70)

        print()

        print(
            f"{'Model':25}"
            f"{'Accuracy':>12}"
            f"{'Precision':>12}"
            f"{'Recall':>12}"
            f"{'F1':>12}"
        )

        print("-" * 70)

        for r in self.results:

            print(

                f"{r.model_name:25}"

                f"{r.accuracy:>12.4f}"

                f"{r.precision:>12.4f}"

                f"{r.recall:>12.4f}"

                f"{r.f1_score:>12.4f}"

            )

        print("-" * 70)

        best = self.best_model()

        print()

        print(f"Best Model : {best.model_name}")

        print(f"F1 Score  : {best.f1_score:.4f}")

        return best