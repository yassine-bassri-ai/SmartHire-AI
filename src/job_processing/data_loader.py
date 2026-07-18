import pandas as pd
from pathlib import Path


def load_dataset(path: Path):

    if not path.exists():
        raise FileNotFoundError(f"{path} introuvable.")

    df = pd.read_csv(path)

    return df