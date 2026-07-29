import pandas as pd

from sklearn.model_selection import train_test_split

from sklearn.preprocessing import StandardScaler

import joblib

from pathlib import Path

def load_training_dataset():

    path = Path(
        "data/processed/machine_learning/matching_dataset_train.csv"
    )

    df = pd.read_csv(path)

    print("=" * 60)
    print("TRAIN DATASET")
    print("=" * 60)

    print(df.shape)

    return df




def prepare_features(df):

    X = df.drop(
        columns=[
            "resume_id",
            "job_id",
            "final_score",
            "best_match"
        ]
    )

    y = df["best_match"]

    return X, y

def split_dataset(X, y):

    X_train, X_test, y_train, y_test = train_test_split(

        X,

        y,

        test_size=0.20,

        random_state=42,

        stratify=y

    )

    print()

    print("Train :", X_train.shape)

    print("Test  :", X_test.shape)

    return (

        X_train,

        X_test,

        y_train,

        y_test

    )


def scale_dataset(

    X_train,

    X_test

):

    scaler = StandardScaler()

    X_train = scaler.fit_transform(

        X_train

    )

    X_test = scaler.transform(

        X_test

    )

    model_dir = Path(

        "artifacts/models"

    )

    model_dir.mkdir(

        parents=True,

        exist_ok=True

    )

    joblib.dump(

        scaler,

        model_dir / "scaler.pkl"

    )

    print()

    print("Scaler sauvegardé.")

    return (

        X_train,

        X_test

    )