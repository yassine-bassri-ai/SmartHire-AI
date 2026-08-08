from src.machine_learning.training.train_pipeline import (
    load_training_dataset,
    prepare_features,
    split_dataset,
    scale_dataset
)

from src.machine_learning.training.model_selector import (
    ModelSelector
)

from src.machine_learning.models.logistic_regression import LogisticRegressionModel
from src.machine_learning.models.decision_tree import DecisionTreeModel
from src.machine_learning.models.random_forest import RandomForestModel
from src.machine_learning.models.svm_model import SVMModel
from src.machine_learning.models.xgboost_model import XGBoostModel

print("=" * 70)
print("SMARTHIRE AI - TRAINING PIPELINE")
print("=" * 70)

df = load_training_dataset()

X, y = prepare_features(df)

X_train, X_test, y_train, y_test = split_dataset(
    X,
    y
)

X_train, X_test = scale_dataset(
    X_train,
    X_test
)

selector = ModelSelector()

selector.evaluate(
    LogisticRegressionModel(),
    "Logistic Regression",
    X_train,
    y_train,
    X_test,
    y_test
)

selector.evaluate(
    DecisionTreeModel(),
    "Decision Tree",
    X_train,
    y_train,
    X_test,
    y_test
)

selector.evaluate(
    RandomForestModel(),
    "Random Forest",
    X_train,
    y_train,
    X_test,
    y_test
)

selector.evaluate(
    SVMModel(),
    "SVM",
    X_train,
    y_train,
    X_test,
    y_test
)

selector.evaluate(
    XGBoostModel(),
    "XGBoost",
    X_train,
    y_train,
    X_test,
    y_test
)

selector.summary()