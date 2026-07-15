from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[1]

sys.path.insert(0, str(PROJECT_ROOT))

from src.information_extraction.cv_parser_pipeline import parse_folder

# CV anglais
parse_folder(
    PROJECT_ROOT / "data/processed/cleaned_text/english",
    PROJECT_ROOT / "data/processed/parsed_CV/english"
)

# CV français
parse_folder(
    PROJECT_ROOT / "data/processed/cleaned_text/french",
    PROJECT_ROOT / "data/processed/parsed_CV/french"
)