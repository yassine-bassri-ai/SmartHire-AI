from pathlib import Path

from src.machine_learning.label_generator import (
    generate_labels
)

PROJECT_ROOT = Path(__file__).resolve().parents[1]

generate_labels(

    PROJECT_ROOT /

    "data/processed/machine_learning/matching_dataset_v2.csv",

    PROJECT_ROOT /

    "data/processed/machine_learning/matching_dataset_labeled.csv"

)