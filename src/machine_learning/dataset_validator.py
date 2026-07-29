import pandas as pd


def validate_dataset(df: pd.DataFrame):

    print("\n" + "=" * 60)
    print("VALIDATION")
    print("=" * 60)

    print("\nColumns")
    print(df.columns.tolist())

    print("\nMissing values")
    print(df.isnull().sum())

    print("\nDuplicates :", df.duplicated().sum())

    print("\nData types")
    print(df.dtypes)