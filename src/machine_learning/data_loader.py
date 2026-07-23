from pathlib import Path
import pandas as pd


def load_dataset(dataset_path: Path):

    if not dataset_path.exists():
        raise FileNotFoundError(
            f"{dataset_path} introuvable."
        )

    df = pd.read_csv(dataset_path)

    print("=" * 50)
    print("Dataset chargé")
    print("=" * 50)
    print(df.shape)

    return df