from src.machine_learning.training.trainer import Trainer
from src.machine_learning.training.evaluator import Evaluator

from src.machine_learning.training.comparaison_table import ComparisonTable
from src.machine_learning.training.leaderboard import LeaderBoard

from src.machine_learning.training.result_saver import ResultSaver

class ModelSelector:

    def __init__(self):

        self.table = ComparisonTable()

        self.board = LeaderBoard()

    def evaluate(

        self,

        model,

        model_name,

        X_train,

        y_train,

        X_test,

        y_test

    ):

        trainer = Trainer(

            model,

            model_name

        )

        trained_model, training_time = trainer.train(

            X_train,

            y_train

        )

        evaluator = Evaluator(

            trained_model,

            model_name

        )

        metrics = evaluator.evaluate(

            X_test,

            y_test

        )


        saver = ResultSaver()

        saver.save_report(
            model_name,
            metrics["report"]
        )

        saver.save_confusion_matrix(
            model_name,
            metrics["confusion_matrix"]
        )

        self.table.add(

            model_name,

            metrics,

            training_time

        )

        self.board.update(

            trained_model,

            model_name,

            metrics

        )

    def summary(self):

        df = self.table.dataframe()

        print()

        print("=" * 80)

        print("MODEL COMPARISON")

        print("=" * 80)

        print(df)

        print()

        print("Best Model :", self.board.best_name)

        print("Best F1    :", round(

            self.board.best_metrics["f1"],

            4

        ))

        return (

            self.board.best_model,

            self.board.best_name,

            self.board.best_metrics

        )