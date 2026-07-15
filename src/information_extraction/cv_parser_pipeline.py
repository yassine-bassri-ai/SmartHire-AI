from pathlib import Path
import json
import pandas as pd

from src.information_extraction.parser import parse_cv


def parse_folder(input_folder: Path, output_folder: Path):

    output_folder.mkdir(parents=True, exist_ok=True)

    txt_files = list(input_folder.glob("*.txt"))

    if not txt_files:
        print(f"Aucun fichier trouvé dans : {input_folder}")
        return

    metadata = pd.read_csv("data/processed/resumes_metadata.csv")

    print(f"\n{len(txt_files)} CV trouvés.\n")

    success = 0

    for txt_file in txt_files:

        try:

            # -----------------------------
            # Recherche de la langue
            # -----------------------------

            row = metadata.loc[
                metadata["filename"] == txt_file.stem + ".pdf"
            ]

            if row.empty:

                print(f"{txt_file.name} absent de resumes_metadata.csv")

                continue

            language = row.iloc[0]["language"]

            # -----------------------------
            # Lecture du texte
            # -----------------------------

            text = txt_file.read_text(
                encoding="utf-8",
                errors="ignore"
            )

            # -----------------------------
            # Parsing
            # -----------------------------

            result = parse_cv(
                text=text,
                filename=txt_file.stem,
                language=language
            )

            # -----------------------------
            # Sauvegarde JSON
            # -----------------------------

            output_file = output_folder / f"{txt_file.stem}.json"

            with open(output_file, "w", encoding="utf-8") as f:

                json.dump(
                    result,
                    f,
                    indent=4,
                    ensure_ascii=False
                )

            print(f"✓ {txt_file.name}")

            success += 1

        except Exception as e:

            print(f"✗ {txt_file.name}")

            print(e)

    print("\n--------------------------")
    print(f"CV analysés : {success}/{len(txt_files)}")