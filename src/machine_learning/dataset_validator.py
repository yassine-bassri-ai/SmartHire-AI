import pandas as pd


REQUIRED_COLUMNS = [

    "skill_score",
    "education_score",
    "experience_score",
    "language_score",
    "certification_score",
    "final_score",
    "best_match"

]


def validate_dataset(df: pd.DataFrame):

    print("=" * 50)
    print("Validation")
    print("=" * 50)

    for column in REQUIRED_COLUMNS:

        if column not in df.columns:

            raise ValueError(
                f"Colonne absente : {column}"
            )

    print("Toutes les colonnes existent.")

    print()

    print("Valeurs manquantes")

    print(df.isnull().sum())

    print()

    print("Doublons :", df.duplicated().sum())

    print()

    print(df.dtypes)

    return True