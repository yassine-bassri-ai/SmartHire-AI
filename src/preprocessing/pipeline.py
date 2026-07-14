from pathlib import Path
import fitz
from src.preprocessing.pdf_extraction import extract_text_from_pdf
from src.preprocessing.pdf_extraction import save_text
from src.preprocessing.language_detectee import detect_language
from src.preprocessing.metadata_manager import (
    create_metadata,
    add_metadata,
    save_metadata
)


def process_folder(input_folder: Path, output_folder: Path):

    pdf_files = list(input_folder.glob("*.pdf"))
    metadata_file = Path("data/processed/resumes_metadata.csv")
    metadata = create_metadata(metadata_file)

    if not pdf_files:
        print("Aucun PDF trouvé.")
        return

    print(f"\n{len(pdf_files)} PDF trouvés.\n")

    success = 0

    for pdf in pdf_files:

        try:

            # -------------------------
            # Extraction du texte
            # -------------------------

            text = extract_text_from_pdf(pdf)

            # -------------------------
            # Langue
            # -------------------------

            language = detect_language(text)

            # -------------------------
            # Statistiques
            # -------------------------

            words = len(text.split())

            characters = len(text)

            with fitz.open(pdf) as document:
                pages = len(document)

            # -------------------------
            # Sauvegarde du texte
            # -------------------------

            output_txt = output_folder / f"{pdf.stem}.txt"

            save_text(text, output_txt)

            # -------------------------
            # Métadonnées
            # -------------------------

            metadata = add_metadata(
                dataframe=metadata,
                filename=pdf.name,
                language=language,
                pages=pages,
                words=words,
                characters=characters,
                text_file=output_txt.name,
                status="Success"
            )

            print(
                f"✓ {pdf.name} | {language} | {pages} pages | {words} mots"
            )

            success += 1

        except Exception as e:

            metadata = add_metadata(
                dataframe=metadata,
                filename=pdf.name,
                language="unknown",
                pages=0,
                words=0,
                characters=0,
                text_file="",
                status="Failed"
            )

            print(f"✗ {pdf.name}")

            print(e)


    save_metadata(
        metadata,
        metadata_file
    )

    print("\n----------------------------------------")
    print(f"PDF traités : {success}/{len(pdf_files)}")
    print("Métadonnées sauvegardées.")