from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))

from src.preprocessing.pdf_extraction import process_folder

input_folder = PROJECT_ROOT / "data/raw/resumes/english"

output_folder = PROJECT_ROOT / "data/processed/extracted_text/english"

process_folder(input_folder, output_folder)