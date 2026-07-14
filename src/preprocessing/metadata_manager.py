from pathlib import Path
import pandas as pd
from pandas.errors import EmptyDataError

def create_metadata(metadata_file):
    """
    Charge les métadonnées existantes.
    Si le fichier n'existe pas ou est vide,
    crée un DataFrame vide.
    """

    metadata_file = Path(metadata_file)

    columns = [
        "filename",
        "language",
        "pages",
        "words",
        "characters",
        "text_file",
        "status"
    ]

    if metadata_file.exists():

        try:
            return pd.read_csv(metadata_file)

        except EmptyDataError:
            print("Le fichier metadata est vide. Création d'un nouveau DataFrame.")
            return pd.DataFrame(columns=columns)

    return pd.DataFrame(columns=columns)


def add_metadata(
    dataframe: pd.DataFrame,
    filename: str,
    language: str,
    pages: int,
    words: int,
    characters: int,
    text_file: str,
    status: str
):

    new_row = {
        "filename": filename,
        "language": language,
        "pages": pages,
        "words": words,
        "characters": characters,
        "text_file": text_file,
        "status": status
    }

    dataframe.loc[len(dataframe)] = new_row

    return dataframe


def save_metadata(dataframe: pd.DataFrame, output_file: Path):
    output_file.parent.mkdir(parents=True, exist_ok=True)

    dataframe.to_csv(
        output_file,
        index=False,
        encoding="utf-8-sig"
    )