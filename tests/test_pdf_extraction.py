import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))

from src.preprocessing.pdf_extraction import extract_text_from_pdf

pdf_path = Path("data/raw/resumes/english/Alix_Lamotte.pdf")
text = extract_text_from_pdf(pdf_path)
print("=" * 50)
print(text[:3000])      # Affiche les 3000 premiers caractères
print("=" * 50)