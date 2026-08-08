from pathlib import Path
import sys

# ------------------------------------------------------------------
# Ajouter la racine du projet au PYTHONPATH
# ------------------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[1]

sys.path.insert(0, str(PROJECT_ROOT))


# ------------------------------------------------------------------
# Machine Learning
# ------------------------------------------------------------------

from  src.machine_learning.data_loader import load_dataset
from  src.machine_learning.data_splitter import split_dataset
from  src.machine_learning.feature_scaler import scale_features

from  src.machine_learning.training.trainer import Trainer
from  src.machine_learning.training.model_saver import ModelSaver


# ------------------------------------------------------------------
# Chargement Dataset
# ------------------------------------------------------------------

print("=" * 60)
print("SMARTHIRE AI - MACHINE LEARNING")
print("=" * 60)

dataset = load_dataset(
    PROJECT_ROOT /
    "data/processed/machine_learning/matching_dataset_labeled.csv"
)

print(f"\nDataset chargé : {dataset.shape}")


# ------------------------------------------------------------------
# Train / Test Split
# ------------------------------------------------------------------

X_train, X_test, y_train, y_test = split_dataset(dataset)

print("\nTrain :", X_train.shape)
print("Test  :", X_test.shape)


# ------------------------------------------------------------------
# StandardScaler
# ------------------------------------------------------------------

scaler, X_train, X_test = scale_features(
    X_train,
    X_test
)

import joblib
from pathlib import Path

models_dir = Path("artifacts/models")
models_dir.mkdir(parents=True, exist_ok=True)

joblib.dump(scaler, models_dir / "scaler.pkl")

print("✅ Scaler sauvegardé :", models_dir / "scaler.pkl")

from src.machine_learning.training.model_selector import ModelSelector

from src.machine_learning.models.logistic_regression import LogisticRegression
from src.machine_learning.models.decision_tree import DecisionTreeClassifier
from src.machine_learning.models.random_forest import RandomForestClassifier
from src.machine_learning.models.svm_model import SVC
from src.machine_learning.models.xgboost_model import XGBClassifier


selector = ModelSelector()

selector.evaluate(
    LogisticRegression(),
    "Logistic Regression",
    X_train,
    y_train,
    X_test,
    y_test
)

selector.evaluate(
    DecisionTreeClassifier(),
    "Decision Tree",
    X_train,
    y_train,
    X_test,
    y_test
)

selector.evaluate(
    RandomForestClassifier(),
    "Random Forest",
    X_train,
    y_train,
    X_test,
    y_test
)

selector.evaluate(
    SVC(),
    "SVM",
    X_train,
    y_train,
    X_test,
    y_test
)

selector.evaluate(
    XGBClassifier(),
    "XGBoost",
    X_train,
    y_train,
    X_test,
    y_test
)

best_model, best_name, best_metrics = selector.summary()

# ============================
# FORCER RANDOM FOREST
# ============================

best_model = selector.models["Random Forest"]
best_name = "Random Forest"

print("\nScaling terminé.")


# ------------------------------------------------------------------
# Sauvegarde
# ------------------------------------------------------------------

saver = ModelSaver()

saver.save(

    best_model,

    best_name

)

from src.database.model_repository import ModelRepository

repository = ModelRepository()

repository.insert(

    model_name=best_name,

    accuracy=best_metrics["accuracy"],

    precision=best_metrics["precision"],

    recall=best_metrics["recall"],

    f1=best_metrics["f1"],

    roc_auc=best_metrics["roc_auc"]

)

print("Model history saved to MySQL.")


# ------------------------------------------------------------------
# Résumé
# ------------------------------------------------------------------

print()

print("=" * 60)
print("TRAINING FINISHED")
print("=" * 60)

print()

print("Best Model :", best_name)

print("Accuracy   :", round(best_metrics["accuracy"], 4))
print("Precision  :", round(best_metrics["precision"], 4))
print("Recall     :", round(best_metrics["recall"], 4))
print("F1 Score   :", round(best_metrics["f1"], 4))

if "roc_auc" in best_metrics:
    print("ROC AUC    :", round(best_metrics["roc_auc"], 4))

print()

print("Model saved inside artifacts/models/")