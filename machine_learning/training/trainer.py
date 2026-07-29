from  machine_learning.models.logistic_regression_model import LogisticRegressionModel
from  machine_learning.models.decision_tree_model import DecisionTreeModel
from  machine_learning.models.random_forest_model import RandomForestModel
from  machine_learning.models.svm_model import SVMModel
from  machine_learning.models.xgboost_model import XGBoostModel

from  machine_learning.training.evaluator import Evaluator
from  machine_learning.training.comparator import ModelComparator


class Trainer:

    def __init__(self):

        self.models = [

            LogisticRegressionModel(),

            DecisionTreeModel(),

            RandomForestModel(),

            SVMModel(),

            XGBoostModel()

        ]

        self.comparator = ModelComparator()

    def train_all(

        self,

        X_train,

        y_train,

        X_test,

        y_test

    ):

        for model in self.models:

            print()

            print("=" * 70)

            print(model.__class__.__name__)

            print("=" * 70)

            print()

            model.train(

                X_train,

                y_train

            )

            result = Evaluator.evaluate(

                model,

                X_test,

                y_test

            )

            self.comparator.add_result(

                result

            )

        return self.comparator.summary()