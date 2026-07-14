from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[1]

sys.path.insert(0, str(PROJECT_ROOT))

from src.preprocessing.pipeline import process_folder

input_folder = PROJECT_ROOT / "data/raw/resumes/french"

output_folder = PROJECT_ROOT / "data/processed/extracted_text/french"

process_folder(input_folder, output_folder)