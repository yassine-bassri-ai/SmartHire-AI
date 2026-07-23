from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[1]

sys.path.insert(0, str(PROJECT_ROOT))

from src.machine_learning.data_loader import load_dataset
from src.machine_learning.dataset_validator import validate_dataset
from src.machine_learning.data_splitter import split_dataset
from src.machine_learning.feature_scaler import scale_features
from src.machine_learning.label_encoder import encode_labels


dataset = load_dataset(

    PROJECT_ROOT /
    "data/processed/machine_learning/matching_dataset.csv"

)

validate_dataset(dataset)

X_train, X_test, y_train, y_test = split_dataset(dataset)

scaler, X_train, X_test = scale_features(

    X_train,
    X_test

)

print()

print("Train :", X_train.shape)

print("Test :", X_test.shape)

print()

print("Préparation terminée.")