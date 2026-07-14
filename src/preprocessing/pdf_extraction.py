from pathlib import Path
import fitz
import sys
from src.preprocessing.language_detectee import detect_language

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))

def extract_text_from_pdf(pdf_path: Path) -> str:
    if not pdf_path.exists():
        raise FileNotFoundError(f"Le fichier {pdf_path} est introuvable.")

    text = ""

    with fitz.open(pdf_path) as document:
        for page in document:
            text += page.get_text()

    return text


def save_text(text: str, output_path: Path):
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, "w", encoding="utf-8") as file:
        file.write(text)


def process_folder(input_folder: Path, output_folder: Path):
    pdf_files = list(input_folder.glob("*.pdf"))

    if len(pdf_files) == 0:
        print("Aucun PDF trouvé.")
        return

    print(f"\n{len(pdf_files)} PDF trouvés.\n")

    success = 0

    for pdf in pdf_files:

        try:

            text = extract_text_from_pdf(pdf)
            language = detect_language(text)
            output_file = output_folder / f"{pdf.stem}.txt"

            save_text(text, output_file)

            print(
                f"✓ {pdf.name} | Langue : {language} | {len(text.split())} mots"
            )

            success += 1

        except Exception as e:

            print(f"✗ {pdf.name}")

            print(e)

    print("\n------------------------------")
    print(f"PDF traités : {success}/{len(pdf_files)}")