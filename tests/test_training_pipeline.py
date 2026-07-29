from src.machine_learning.training.train_pipeline import (
    load_training_dataset,
    prepare_features,
    split_dataset,
    scale_dataset
)

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

print()

print("=" * 60)

print("PIPELINE VALIDÉ")

print("=" * 60)

print(X_train.shape)

print(X_test.shape)