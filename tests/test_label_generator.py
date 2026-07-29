from pathlib import Path

import pandas as pd

from src.machine_learning.label_generator import (
    build_training_dataset
)

dataset = pd.read_csv(

    Path(
        "data/processed/machine_learning/matching_dataset_v2.csv"
    )

)

dataset = build_training_dataset(dataset)

output = Path(

    "data/processed/machine_learning/matching_dataset_train.csv"

)

dataset.to_csv(

    output,

    index=False

)

print()

print(dataset.head())

print()

print(dataset.shape)
print("\nDistribution des labels")

print(

    dataset["best_match"]

    .value_counts()

)

print()

print(

    dataset["best_match"]

    .value_counts(normalize=True)

)