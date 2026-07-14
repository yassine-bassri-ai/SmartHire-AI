from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))

from src.preprocessing.pdf_extraction import extract_text_from_pdf
from src.preprocessing.language_detectee import detect_language

pdf = PROJECT_ROOT / "data/raw/resumes/english/Alix_Lamotte.pdf"

text = extract_text_from_pdf(pdf)

language = detect_language(text)

print("=" * 50)
print("Langue détectée :", language)
print("=" * 50)