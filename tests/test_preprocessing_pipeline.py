from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))

from src.preprocessing.text_cleaner import clean_text


def process_folder(input_folder: Path, output_folder: Path):

    output_folder.mkdir(parents=True, exist_ok=True)

    txt_files = list(input_folder.glob("*.txt"))

    if not txt_files:
        print(f"Aucun fichier trouvé dans : {input_folder}")
        return

    print(f"{len(txt_files)} fichiers trouvés.\n")

    for txt_file in txt_files:

        print(f"Traitement : {txt_file.name}")

        # Lire le texte
        text = txt_file.read_text(encoding="utf-8")

        # Nettoyage
        cleaned_text = clean_text(text)

        # Sauvegarde
        output_file = output_folder / txt_file.name

        output_file.write_text(
            cleaned_text,
            encoding="utf-8"
        )

    print("\nTous les fichiers ont été traités.")


# ===============================
# CV anglais
# ===============================

process_folder(
    PROJECT_ROOT / "data/processed/extracted_text/english",
    PROJECT_ROOT / "data/processed/cleaned_text/english"
)

# ===============================
# CV français
# ===============================

process_folder(
    PROJECT_ROOT / "data/processed/extracted_text/french",
    PROJECT_ROOT / "data/processed/cleaned_text/french"
)