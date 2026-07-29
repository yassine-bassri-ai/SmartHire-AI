from src.machine_learning.training.train_pipeline import (
    load_training_dataset,
    prepare_features,
    split_dataset,
    scale_dataset
)

from src.machine_learning.training.model_selector import ModelSelector
from src.machine_learning.training.result_saver import ResultSaver
from src.machine_learning.training.model_saver import ModelSaver

from src.machine_learning.models.logistic_regression import build_model as logistic
from src.machine_learning.models.decision_tree import build_model as tree
from src.machine_learning.models.random_forest import build_model as forest
from src.machine_learning.models.svm_model import build_model as svm
from src.machine_learning.models.xgboost_model import build_model as xgb


def main():

    # =====================================================
    # Chargement
    # =====================================================

    dataset = load_training_dataset()

    X, y = prepare_features(dataset)

    X_train, X_test, y_train, y_test = split_dataset(
        X,
        y
    )

    X_train, X_test = scale_dataset(
        X_train,
        X_test
    )

    # =====================================================
    # Modèles
    # =====================================================

    models = [

        ("Logistic Regression", logistic()),

        ("Decision Tree", tree()),

        ("Random Forest", forest()),

        ("SVM", svm()),

        ("XGBoost", xgb())

    ]

    selector = ModelSelector()

    saver = ResultSaver()

    # =====================================================
    # Entraînement
    # =====================================================

    for name, model in models:

        selector.evaluate(

            model,

            name,

            X_train,

            y_train,

            X_test,

            y_test

        )

    # =====================================================
    # Résultats
    # =====================================================

    best_model, best_name, best_metrics = selector.summary()

    comparison = selector.table.dataframe()

    saver.save_comparison(comparison)

    # =====================================================
    # Sauvegarde meilleur modèle
    # =====================================================

    ModelSaver().save(

        best_model,

        best_name

    )


if __name__ == "__main__":

    main()