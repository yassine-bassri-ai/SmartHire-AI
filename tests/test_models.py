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

from  machine_learning.training.trainer import Trainer
from  machine_learning.training.saver import ModelSaver


# ------------------------------------------------------------------
# Chargement Dataset
# ------------------------------------------------------------------

print("=" * 60)
print("SMARTHIRE AI - MACHINE LEARNING")
print("=" * 60)

dataset = load_dataset(
    PROJECT_ROOT /
    "data/processed/machine_learning/matching_dataset.csv"
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

print("\nScaling terminé.")


# ------------------------------------------------------------------
# Entraînement
# ------------------------------------------------------------------

trainer = Trainer()

best_result = trainer.train_all(

    X_train=X_train,

    y_train=y_train,

    X_test=X_test,

    y_test=y_test

)


# ------------------------------------------------------------------
# Sauvegarde
# ------------------------------------------------------------------

saver = ModelSaver(

    PROJECT_ROOT /

    "artifacts/models"

)

saver.save_model(

    best_result.trained_model,

    "best_model.pkl"

)

saver.save_scaler(

    scaler

)


# ------------------------------------------------------------------
# Résumé
# ------------------------------------------------------------------

print("\n")

print("=" * 60)

print("TRAINING FINISHED")

print("=" * 60)

print()

print("Best Model :", best_result.model_name)

print(f"Accuracy   : {best_result.accuracy:.4f}")

print(f"Precision  : {best_result.precision:.4f}")

print(f"Recall     : {best_result.recall:.4f}")

print(f"F1 Score   : {best_result.f1_score:.4f}")

print(f"ROC AUC    : {best_result.roc_auc:.4f}")

print()

print("Model saved inside :")

print("artifacts/models/")